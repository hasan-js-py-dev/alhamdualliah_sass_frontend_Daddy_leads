const mongoose = require('mongoose');
const crypto = require('crypto');

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
 * Hash token using HMAC-SHA256
 */
sessionSchema.statics.hashToken = function (token) {
  return crypto
    .createHmac('sha256', process.env.SESSION_SECRET)
    .update(token)
    .digest('hex');
};

/**
 * Static method to create a new session with hashed token
 */
sessionSchema.statics.createSession = async function (userId, token, expiresIn) {
  const expiresAt = new Date(Date.now() + expiresIn);
  const hashedToken = this.hashToken(token);

  return await this.create({
    userId,
    token: hashedToken,
    expiresAt,
  });
};

/**
 * Static method to find valid session with hashed token
 */
sessionSchema.statics.findValidSession = async function (token) {
  const hashedToken = this.hashToken(token);
  return await this.findOne({
    token: hashedToken,
    expiresAt: { $gt: new Date() },
  }).populate('userId', '-password');
};

/**
 * Static method to delete session (logout) with hashed token
 */
sessionSchema.statics.deleteSession = async function (token) {
  const hashedToken = this.hashToken(token);
  return await this.deleteOne({ token: hashedToken });
};

/**
 * Static method to delete all sessions for a user
 */
sessionSchema.statics.deleteUserSessions = async function (userId) {
  return await this.deleteMany({ userId });
};

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;
