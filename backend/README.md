# Backend Setup for Daddy Leads

This folder contains backend code and documentation for the Daddy Leads application.

## Structure

```
backend/
├── README.md                    # This file
├── MONGODB_SETUP.md            # MongoDB setup instructions
├── api/                        # API endpoint examples
│   ├── auth/                   # Authentication endpoints
│   │   ├── signup.js          # User registration
│   │   ├── login.js           # User login
│   │   ├── logout.js          # User logout
│   │   ├── verify.js          # Session verification
│   │   └── google-oauth.js    # Google OAuth handler
│   └── middleware/             # Express middleware
│       ├── auth.js            # Authentication middleware
│       └── validation.js      # Input validation middleware
├── models/                     # MongoDB models
│   ├── User.js                # User model
│   └── Session.js             # Session model
└── config/                     # Configuration files
    ├── database.js            # MongoDB connection
    └── env.example            # Environment variables template
```

## Getting Started

1. **Install MongoDB**: Follow instructions in `MONGODB_SETUP.md`
2. **Set up backend API**: Create Express.js server with endpoints
3. **Configure environment variables**: Copy `.env.example` to `.env`
4. **Connect frontend**: Update frontend to use your API endpoints

## Technology Stack

- **MongoDB**: Database
- **Express.js**: Backend framework (recommended)
- **Node.js**: Runtime environment
- **bcrypt**: Password hashing
- **jsonwebtoken**: JWT token generation

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/verify` - Verify session token
- `POST /api/auth/google` - Google OAuth

## Environment Variables

Create a `.env` file in the backend folder with:

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/daddy-leads
# or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/daddy-leads

# JWT
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback

# Server
PORT=5000
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
# Production:
# FRONTEND_URL=https://daddy-leads.com,https://app.daddy-leads.com
```

## Security Best Practices

1. **Password Hashing**: Use bcrypt with salt rounds ≥ 10
2. **JWT Tokens**: Store in httpOnly cookies or secure localStorage
3. **CORS**: Whitelist only your domains
4. **Rate Limiting**: Implement on authentication endpoints
5. **Input Validation**: Validate all user inputs
6. **HTTPS**: Always use HTTPS in production
7. **Environment Variables**: Never commit `.env` files

## Next Steps

1. Review `MONGODB_SETUP.md` for database setup
2. Implement API endpoints using the examples in `api/`
3. Test authentication flow locally
4. Deploy backend to Vercel, Heroku, or AWS
5. Update frontend environment variables with production API URL

## Additional Resources

- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Express.js Documentation](https://expressjs.com/)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
- [OWASP Security Cheatsheet](https://cheatsheetseries.owasp.org/)
