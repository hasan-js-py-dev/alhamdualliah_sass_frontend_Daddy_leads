// backend/api/auth/signup.js
// Example Express.js endpoint for user registration

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * User Signup Handler
 * POST /api/auth/signup
 * 
 * Request Body:
 * {
 *   firstName: string,
 *   lastName: string,
 *   email: string,
 *   password: string,
 *   agreeToUpdates: boolean,
 *   acceptTerms: boolean
 * }
 */
const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, agreeToUpdates, acceptTerms } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    if (!acceptTerms) {
      return res.status(400).json({
        success: false,
        message: 'You must accept the terms and conditions'
      });
    }

    // Email validation (basic)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    // Password strength validation (minimum 8 characters)
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters long'
      });
    }

    // Get database connection
    const db = req.app.locals.db;
    const usersCollection = db.collection('users');

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email already exists'
      });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user document
    const newUser = {
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: hashedPassword,
      agreeToUpdates,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Insert user into database
    const result = await usersCollection.insertOne(newUser);

    // Create session token
    const token = jwt.sign(
      { userId: result.insertedId, email: email.toLowerCase() },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    // Store session in database
    const sessionsCollection = db.collection('sessions');
    await sessionsCollection.insertOne({
      userId: result.insertedId,
      token,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      createdAt: new Date()
    });

    // Return success response
    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      data: {
        token,
        user: {
          id: result.insertedId,
          firstName,
          lastName,
          email: email.toLowerCase()
        }
      }
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred during signup. Please try again.'
    });
  }
};

module.exports = signup;
