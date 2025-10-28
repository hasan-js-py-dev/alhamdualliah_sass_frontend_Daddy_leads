const express = require('express');
const router = express.Router();

// Import controllers
const authController = require('../../controllers/authController');

// Import middleware
const { authenticateJWT, authenticateLocal } = require('../../middleware/auth');
const { signupValidation, loginValidation, validate } = require('../../middleware/validation');

/**
 * @route   POST /v1/auth/signup
 * @desc    Register a new user
 * @access  Public
 */
router.post('/signup', signupValidation, validate, authController.signup);

/**
 * @route   POST /v1/auth/login
 * @desc    Authenticate user and return token
 * @access  Public
 */
router.post('/login', loginValidation, validate, authenticateLocal, authController.login);

/**
 * @route   GET /v1/auth/verify
 * @desc    Verify JWT token and return user data
 * @access  Private
 */
router.get('/verify', authenticateJWT, authController.verify);

/**
 * @route   POST /v1/auth/logout
 * @desc    Logout user and invalidate session
 * @access  Private
 */
router.post('/logout', authController.logout);

module.exports = router;
