const User = require('../models/User');
const Session = require('../models/Session');
const { generateToken, getTokenExpirationMs } = require('../utils/tokenUtils');
const { successResponse, errorResponse } = require('../utils/responseUtils');

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

    // Prepare user data (without password)
    const userData = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      credits: {
        leadsFinderCredits: user.credits.leadsFinderCredits,
        dataScraperCredits: user.credits.dataScraperCredits,
      },
    };

    res.status(201).json(
      successResponse('Account created successfully', {
        token,
        user: userData,
      })
    );
  } catch (error) {
    console.error('Signup error:', error);
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

    // Prepare user data (without password)
    const userData = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      credits: {
        leadsFinderCredits: user.credits.leadsFinderCredits,
        dataScraperCredits: user.credits.dataScraperCredits,
      },
    };

    res.status(200).json(
      successResponse('Login successful', {
        token,
        user: userData,
      })
    );
  } catch (error) {
    console.error('Login error:', error);
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

    // Prepare user data
    const userData = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      credits: {
        leadsFinderCredits: user.credits.leadsFinderCredits,
        dataScraperCredits: user.credits.dataScraperCredits,
      },
    };

    res.status(200).json(
      successResponse('Token verified', {
        user: userData,
      })
    );
  } catch (error) {
    console.error('Verify error:', error);
    res.status(500).json(errorResponse('An error occurred during verification. Please try again.'));
  }
};

/**
 * Logout Controller
 * POST /v1/auth/logout
 */
const logout = async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json(errorResponse('No token provided'));
    }

    // Delete session from database
    await Session.deleteSession(token);

    res.status(200).json(successResponse('Logout successful'));
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json(errorResponse('An error occurred during logout. Please try again.'));
  }
};

module.exports = {
  signup,
  login,
  verify,
  logout,
};
