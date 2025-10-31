const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * PendingUser Schema - Temporary storage for unverified signups
 */
const pendingUserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      minlength: [2, 'First name must be at least 2 characters'],
      maxlength: [50, 'First name cannot exceed 50 characters'],
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
      minlength: [2, 'Last name must be at least 2 characters'],
      maxlength: [50, 'Last name cannot exceed 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
        'Please provide a valid email address',
      ],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters'],
    },
    agreeToTerms: {
      type: Boolean,
      required: [true, 'You must agree to the terms and conditions'],
      validate: {
        validator: function (v) {
          return v === true;
        },
        message: 'You must agree to the terms and conditions',
      },
    },
    verificationToken: {
      type: String,
      required: true,
    },
    verificationTokenExpiry: {
      type: Date,
      required: true,
    },
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      index: { expires: 0 }, // TTL index - MongoDB will auto-delete after expiresAt
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Pre-save Hook - Hash password before saving
 */
pendingUserSchema.pre('save', async function (next) {
  // Only hash if password is modified or new
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

/**
 * Remove sensitive fields from JSON output
 */
pendingUserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.__v;
  delete obj.verificationToken;
  return obj;
};

const PendingUser = mongoose.model('PendingUser', pendingUserSchema);

module.exports = PendingUser;
