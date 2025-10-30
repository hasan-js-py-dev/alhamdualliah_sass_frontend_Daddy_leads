const User = require('../models/User');
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

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });

    if (existingUser) {
      return res.status(409).json(errorResponse('Email already exists'));
    }

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Create new user
    const user = new User({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password,
      agreeToTerms,
      verificationToken,
      verificationTokenExpiry,
    });

    await user.save();

    // Send verification email
    try {
      await emailService.sendVerificationEmail(user.email, user.firstName, verificationToken);
    } catch (emailError) {
      logger.error('Failed to send verification email', { error: emailError.message });
      // Don't fail the signup if email fails, user can resend later
    }

    // Return success without token (user needs to verify email first)
    res.status(201).json(
      successResponse('Account created successfully! Please check your email to verify your account.', {
        user: {
          id: user._id,
          email: user.email,
          emailVerified: false,
        },
      })
    );
  } catch (error) {
    logger.error('Signup error', { error: error.message, stack: error.stack });
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
    logger.error('Login error', { userId: req.user?._id });
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
    logger.error('Verify error', { userId: req.user?._id });
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
    logger.error('Logout error', { 
      userId: req.user?._id,
      timestamp: new Date().toISOString() 
    });
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

    // Find user with valid token
    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpiry: { $gt: new Date() },
    });

    if (!user) {
      return res.status(400).json(errorResponse('Invalid or expired verification token'));
    }

    // Update user
    user.emailVerified = true;
    user.verificationToken = null;
    user.verificationTokenExpiry = null;
    await user.save();

    // Generate JWT token for auto-login
    const authToken = generateToken({
      id: user._id,
      email: user.email,
    });

    // Create session
    const expiresIn = getTokenExpirationMs();
    await Session.createSession(user._id, authToken, expiresIn);

    logger.info('Email verified successfully', { userId: user._id });

    res.status(200).json(
      successResponse('Email verified successfully!', {
        token: authToken,
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
    logger.error('Email verification error', { error: error.message });
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

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(404).json(errorResponse('User not found'));
    }

    if (user.emailVerified) {
      return res.status(400).json(errorResponse('Email is already verified'));
    }

    // Generate new verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    user.verificationToken = verificationToken;
    user.verificationTokenExpiry = verificationTokenExpiry;
    await user.save();

    // Send verification email
    await emailService.sendVerificationEmail(user.email, user.firstName, verificationToken);

    logger.info('Verification email resent', { userId: user._id });

    res.status(200).json(successResponse('Verification email sent successfully. Please check your inbox.'));
  } catch (error) {
    logger.error('Resend verification error', { error: error.message });
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
