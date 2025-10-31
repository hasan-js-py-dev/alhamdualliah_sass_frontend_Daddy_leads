const User = require('../models/User');
const PendingUser = require('../models/PendingUser');
const Session = require('../models/Session');
const { generateToken, getTokenExpirationMs } = require('../utils/tokenUtils');
const { successResponse, errorResponse } = require('../utils/responseUtils');
const logger = require('../utils/logger');
const crypto = require('crypto');
const emailService = require('../services/emailService');

/**
 * User Signup Controller
 * POST /v1/auth/signup
 */
const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, agreeToTerms } = req.body;

    // Check if user already exists (verified)
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json(errorResponse('Email already exists'));
    }

    // Check if pending signup exists
    const existingPending = await PendingUser.findOne({ email: email.toLowerCase() });
    if (existingPending) {
      // Delete old pending signup
      await PendingUser.deleteOne({ email: email.toLowerCase() });
    }

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Create pending user (NOT in main users collection yet)
    const pendingUser = new PendingUser({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password,
      agreeToTerms,
      verificationToken,
      verificationTokenExpiry,
    });
    // Save pending user with robust error handling
    try {
      await pendingUser.save();
    } catch (err) {
      if (err && err.code === 11000) {
        // Duplicate key (email)
        return res.status(409).json(
          errorResponse('Signup already started. Please check your email or resend verification.')
        );
      }
      if (err && err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map((e) => ({ field: e.path, message: e.message }));
        return res.status(400).json(errorResponse('Validation failed', errors));
      }
      throw err; // Unknown error -> handled by outer catch
    }

    // Send verification email
    try {
      await emailService.sendVerificationEmail(pendingUser.email, pendingUser.firstName, verificationToken);
    } catch (emailError) {
      logger.error('Failed to send verification email', emailError);
      // Don't fail the signup if email fails
    }

    // Return success without token (user needs to verify email first)
    res.status(201).json(
      successResponse('Account created successfully! Please check your email to verify your account.', {
        email: pendingUser.email,
      })
    );
  } catch (error) {
    logger.error('Signup error', error);
    res.status(500).json(errorResponse('An error occurred during signup. Please try again.'));
  }
};

/**
 * User Login Controller
 * POST /v1/auth/login
 */
const login = async (req, res) => {
  try {
    // User is already authenticated by passport local strategy
    const user = req.user;

    // Check if email is verified
    if (!user.emailVerified) {
      return res.status(403).json(
        errorResponse('Email not verified. Please verify your email to continue.', null)
      );
    }

    // Generate JWT token
    const token = generateToken({
      id: user._id,
      email: user.email,
    });

    // Create session
    const expiresIn = getTokenExpirationMs();
    await Session.createSession(user._id, token, expiresIn);

    // Return success with token and minimal user data
    res.status(200).json(
      successResponse('Login successful', {
        token,
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          credits: user.credits,
        },
      })
    );
  } catch (error) {
    logger.error('Login error', error);
    res.status(500).json(errorResponse('An error occurred during login. Please try again.'));
  }
};

/**
 * Verify Token Controller
 * GET /v1/auth/verify
 */
const verify = async (req, res) => {
  try {
    // User is already authenticated by JWT middleware
    const user = req.user;

    // Return minimal user data
    res.status(200).json(
      successResponse('Token verified', {
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      })
    );
  } catch (error) {
    logger.error('Verify error', error);
    res.status(500).json(errorResponse('An error occurred during verification. Please try again.'));
  }
};

/**
 * Logout Controller
 * POST /v1/auth/logout
 */
const logout = async (req, res) => {
  try {
    // req.user is guaranteed to exist because authenticateJWT middleware runs first
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(400).json(errorResponse('No token provided'));
    }

    // Delete session for authenticated user only
    await Session.deleteSession(token);

    res.status(200).json(successResponse('Logout successful'));
  } catch (error) {
    // Log error without exposing sensitive details
    logger.error('Logout error', error);
    res.status(500).json(errorResponse('Logout failed'));
  }
};

/**
 * Verify Email Controller
 * POST /v1/auth/verify-email
 */
const verifyEmail = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json(errorResponse('Verification token is required'));
    }

    // Find pending user with valid token
    const pendingUser = await PendingUser.findOne({
      verificationToken: token,
      verificationTokenExpiry: { $gt: new Date() },
    });

    if (!pendingUser) {
      return res.status(400).json(errorResponse('Invalid or expired verification token'));
    }

    // Create actual user in main collection
    const user = new User({
      firstName: pendingUser.firstName,
      lastName: pendingUser.lastName,
      email: pendingUser.email,
      password: pendingUser.password, // Already hashed in PendingUser
      agreeToTerms: pendingUser.agreeToTerms,
      emailVerified: true, // Mark as verified
      credits: {
        leadsFinderCredits: 0,
        dataScraperCredits: 0,
      },
    });

    // Mark password as not modified to skip hashing in pre-save hook
    user.markModified('password');
    user.$isNew = true;
    
    // Save user - password won't be re-hashed because we mark it as unmodified
    const savedUser = await User.collection.insertOne({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password, // Already hashed
      agreeToTerms: user.agreeToTerms,
      emailVerified: true,
      credits: user.credits,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Get the inserted user ID
    const userId = savedUser.insertedId;

    // Delete pending user
    await PendingUser.deleteOne({ _id: pendingUser._id });

    // Generate JWT token for auto-login
    const authToken = generateToken({
      id: userId,
      email: pendingUser.email,
    });

    // Create session
    const expiresIn = getTokenExpirationMs();
    await Session.createSession(userId, authToken, expiresIn);

    logger.info('Email verified successfully', { userId: userId });

    res.status(200).json(
      successResponse('Email verified successfully!', {
        token: authToken,
        user: {
          id: userId,
          firstName: pendingUser.firstName,
          lastName: pendingUser.lastName,
          email: pendingUser.email,
          credits: {
            leadsFinderCredits: 0,
            dataScraperCredits: 0,
          },
        },
      })
    );
  } catch (error) {
    logger.error('Email verification error', error);
    res.status(500).json(errorResponse('An error occurred during email verification.'));
  }
};

/**
 * Resend Verification Email Controller
 * POST /v1/auth/resend-verification
 */
const resendVerification = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json(errorResponse('Email is required'));
    }

    // Check if already verified user exists
    const user = await User.findOne({ email: email.toLowerCase() });
    if (user && user.emailVerified) {
      return res.status(400).json(errorResponse('Email is already verified'));
    }

    // Find pending user
    const pendingUser = await PendingUser.findOne({ email: email.toLowerCase() });
    if (!pendingUser) {
      return res.status(404).json(errorResponse('Signup not found. Please sign up again.'));
    }

    // Generate new verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    pendingUser.verificationToken = verificationToken;
    pendingUser.verificationTokenExpiry = verificationTokenExpiry;
    await pendingUser.save();

    // Send verification email
    await emailService.sendVerificationEmail(pendingUser.email, pendingUser.firstName, verificationToken);

    logger.info('Verification email resent', { email: pendingUser.email });

    res.status(200).json(successResponse('Verification email sent successfully. Please check your inbox.'));
  } catch (error) {
    logger.error('Resend verification error', error);
    res.status(500).json(errorResponse('An error occurred while sending verification email.'));
  }
};

module.exports = {
  signup,
  login,
  verify,
  logout,
  verifyEmail,
  resendVerification,
};
