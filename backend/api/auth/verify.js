// backend/api/auth/verify.js
// Example Express.js endpoint for session verification

const jwt = require('jsonwebtoken');

/**
 * Session Verification Handler
 * GET /api/auth/verify
 * 
 * Headers:
 * Authorization: Bearer <token>
 */
const verify = async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    // Verify JWT token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (jwtError) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token'
      });
    }

    // Get database connection
    const db = req.app.locals.db;
    const sessionsCollection = db.collection('sessions');
    const usersCollection = db.collection('users');

    // Check if session exists and is valid
    const session = await sessionsCollection.findOne({
      token,
      expiresAt: { $gt: new Date() }
    });

    if (!session) {
      return res.status(401).json({
        success: false,
        message: 'Session expired or invalid'
      });
    }

    // Get user details
    const user = await usersCollection.findOne(
      { _id: session.userId },
      { projection: { password: 0 } } // Exclude password from response
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        }
      }
    });

  } catch (error) {
    console.error('Verify error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred during verification. Please try again.'
    });
  }
};

module.exports = verify;
