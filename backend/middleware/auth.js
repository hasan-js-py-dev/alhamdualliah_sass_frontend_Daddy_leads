const passport = require('passport');
const Session = require('../models/Session');
const { errorResponse } = require('../utils/responseUtils');

/**
 * Middleware to authenticate JWT token
 */
const authenticateJWT = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, async (err, user, info) => {
    if (err) {
      return res.status(500).json(errorResponse('Authentication error'));
    }

    if (!user) {
      return res.status(401).json(errorResponse('Invalid or expired token'));
    }

    // Verify session exists in database
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (token) {
      const session = await Session.findValidSession(token);
      
      if (!session) {
        return res.status(401).json(errorResponse('Session expired or invalid'));
      }
    }

    req.user = user;
    next();
  })(req, res, next);
};

/**
 * Middleware to authenticate with local strategy (email/password)
 */
const authenticateLocal = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      return res.status(500).json(errorResponse('Authentication error'));
    }

    if (!user) {
      // Check if user doesn't exist
      if (info?.message === 'NO_ACCOUNT_FOUND') {
        return res.status(401).json({
          success: false,
          message: 'No account found with this email. Please sign up first.',
          code: 'NO_ACCOUNT_FOUND'
        });
      }
      return res.status(401).json(errorResponse(info?.message || 'Invalid credentials'));
    }

    req.user = user;
    next();
  })(req, res, next);
};

/**
 * Middleware to check if user has sufficient credits
 */
const checkCredits = (creditType, amount) => {
  return (req, res, next) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json(errorResponse('Unauthorized'));
    }

    const availableCredits = user.credits[creditType] || 0;

    if (availableCredits < amount) {
      return res.status(403).json(
        errorResponse(`Insufficient ${creditType}. Required: ${amount}, Available: ${availableCredits}`)
      );
    }

    next();
  };
};

module.exports = {
  authenticateJWT,
  authenticateLocal,
  checkCredits,
};
