const User = require('../models/User');
const Session = require('../models/Session');
const { generateToken, getTokenExpirationMs } = require('../utils/tokenUtils');
const { successResponse, errorResponse } = require('../utils/responseUtils');
const logger = require('../utils/logger');

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

    // Create new user
    const user = new User({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password,
      agreeToTerms,
    });

    await user.save();

    // Generate JWT token
    const token = generateToken({
      id: user._id,
      email: user.email,
    });

    // Create session
    const expiresIn = getTokenExpirationMs();
    await Session.createSession(user._id, token, expiresIn);

    // Return success with token and minimal user data
    res.status(201).json(
      successResponse('Account created successfully', {
        token,
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      })
    );
  } catch (error) {
    logger.error('Signup error', { userId: error.userId });
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

module.exports = {
  signup,
  login,
  verify,
  logout,
};
