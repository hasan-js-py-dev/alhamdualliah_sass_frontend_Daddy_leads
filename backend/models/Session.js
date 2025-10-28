const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    token: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * TTL index to automatically delete expired sessions
 * MongoDB will automatically remove documents where expiresAt < current time
 */
sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

/**
 * Static method to create a new session
 */
sessionSchema.statics.createSession = async function (userId, token, expiresIn) {
  const expiresAt = new Date(Date.now() + expiresIn);

  return await this.create({
    userId,
    token,
    expiresAt,
  });
};

/**
 * Static method to find valid session
 */
sessionSchema.statics.findValidSession = async function (token) {
  return await this.findOne({
    token,
    expiresAt: { $gt: new Date() },
  }).populate('userId', '-password');
};

/**
 * Static method to delete session (logout)
 */
sessionSchema.statics.deleteSession = async function (token) {
  return await this.deleteOne({ token });
};

/**
 * Static method to delete all sessions for a user
 */
sessionSchema.statics.deleteUserSessions = async function (userId) {
  return await this.deleteMany({ userId });
};

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;
