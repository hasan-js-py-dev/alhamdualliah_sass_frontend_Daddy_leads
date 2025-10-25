// backend/api/auth/logout.js
// Example Express.js endpoint for user logout

/**
 * User Logout Handler
 * POST /api/auth/logout
 * 
 * Headers:
 * Authorization: Bearer <token>
 */
const logout = async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    // Get database connection
    const db = req.app.locals.db;
    const sessionsCollection = db.collection('sessions');

    // Delete session from database
    await sessionsCollection.deleteOne({ token });

    res.status(200).json({
      success: true,
      message: 'Logout successful'
    });

  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred during logout. Please try again.'
    });
  }
};

module.exports = logout;
