const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      minlength: [1, 'First name must be at least 1 character'],
      maxlength: [50, 'First name must be less than 50 characters'],
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
      minlength: [1, 'Last name must be at least 1 character'],
      maxlength: [50, 'Last name must be less than 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email address',
      ],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters'],
    },
    credits: {
      leadsFinderCredits: {
        type: Number,
        default: parseInt(process.env.DEFAULT_LEADS_FINDER_CREDITS) || 0,
        min: [0, 'Credits cannot be negative'],
      },
      dataScraperCredits: {
        type: Number,
        default: parseInt(process.env.DEFAULT_DATA_SCRAPER_CREDITS) || 0,
        min: [0, 'Credits cannot be negative'],
      },
    },
    agreeToTerms: {
      type: Boolean,
      required: [true, 'You must agree to the terms and conditions'],
      validate: {
        validator: function (value) {
          return value === true;
        },
        message: 'You must agree to the terms and conditions',
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Index for faster email lookups
 */
userSchema.index({ email: 1 });

/**
 * Pre-save middleware to hash password
 */
userSchema.pre('save', async function (next) {
  // Only hash if password is modified
  if (!this.isModified('password')) {
    return next();
  }

  try {
    // Generate salt and hash password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

/**
 * Method to compare password for login
 */
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

/**
 * Method to get user object without sensitive data
 */
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  delete user.__v;
  return user;
};

/**
 * Static method to add credits
 */
userSchema.statics.addCredits = async function (userId, leadsCredits = 0, scraperCredits = 0) {
  return await this.findByIdAndUpdate(
    userId,
    {
      $inc: {
        'credits.leadsFinderCredits': leadsCredits,
        'credits.dataScraperCredits': scraperCredits,
      },
    },
    { new: true }
  ).select('-password');
};

/**
 * Static method to deduct credits
 */
userSchema.statics.deductCredits = async function (userId, leadsCredits = 0, scraperCredits = 0) {
  return await this.findByIdAndUpdate(
    userId,
    {
      $inc: {
        'credits.leadsFinderCredits': -leadsCredits,
        'credits.dataScraperCredits': -scraperCredits,
      },
    },
    { new: true }
  ).select('-password');
};

const User = mongoose.model('User', userSchema);

module.exports = User;
