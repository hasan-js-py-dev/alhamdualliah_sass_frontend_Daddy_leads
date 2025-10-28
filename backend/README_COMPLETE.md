# Daddy Leads Backend API

Complete backend authentication system for Daddy Leads B2B Lead Generation Platform.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
```

Edit `.env` and update these critical values:
- `JWT_SECRET` - Generate a strong random secret (minimum 32 characters)
- `SESSION_SECRET` - Generate a strong random secret (minimum 32 characters)

### 3. Start Server

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

Server will start on `http://localhost:5000`

## 📁 Project Structure

```
backend/
├── server.js                 # Main application entry
├── package.json
├── .env                      # Environment variables (create from .env.example)
├── config/
│   ├── database.js          # MongoDB connection
│   └── passport.js          # Passport strategies
├── models/
│   ├── User.js              # User schema with credits
│   └── Session.js           # Session management
├── routes/
│   └── v1/
│       └── auth.js          # Authentication routes
├── controllers/
│   └── authController.js    # Authentication logic
├── middleware/
│   ├── auth.js              # JWT & Passport middleware
│   ├── validation.js        # Input validation
│   └── errorHandler.js      # Error handling
└── utils/
    ├── tokenUtils.js        # JWT utilities
    └── responseUtils.js     # Response formatting
```

## 🔌 API Endpoints

### Base URL
- **Development:** `http://localhost:5000/v1`
- **Production:** `https://api.daddy-leads.com/v1`

### Health Check
```bash
GET /health
```

### Authentication Endpoints

#### 1. Signup
```bash
POST /v1/auth/signup
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "agreeToTerms": true
}

Response 201:
{
  "success": true,
  "message": "Account created successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "credits": {
        "leadsFinderCredits": 0,
        "dataScraperCredits": 0
      }
    }
  }
}
```

#### 2. Login
```bash
POST /v1/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}

Response 200:
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "credits": {
        "leadsFinderCredits": 5000,
        "dataScraperCredits": 3000
      }
    }
  }
}
```

#### 3. Verify Token
```bash
GET /v1/auth/verify
Authorization: Bearer <jwt-token>

Response 200:
{
  "success": true,
  "message": "Token verified",
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "credits": {
        "leadsFinderCredits": 5000,
        "dataScraperCredits": 3000
      }
    }
  }
}
```

#### 4. Logout
```bash
POST /v1/auth/logout
Authorization: Bearer <jwt-token>

Response 200:
{
  "success": true,
  "message": "Logout successful"
}
```

## 🧪 Testing with cURL

### Test Signup
```bash
curl -X POST http://localhost:5000/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "SecurePass123",
    "agreeToTerms": true
  }'
```

### Test Login
```bash
curl -X POST http://localhost:5000/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123"
  }'
```

### Test Verify (replace TOKEN)
```bash
curl -X GET http://localhost:5000/v1/auth/verify \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

### Test Logout (replace TOKEN)
```bash
curl -X POST http://localhost:5000/v1/auth/logout \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

## 🔐 Security Features

- ✅ Password hashing with bcrypt (10 salt rounds)
- ✅ JWT token authentication
- ✅ Session management with MongoDB
- ✅ Rate limiting (100 requests/15min, 10 auth attempts/15min)
- ✅ CORS protection
- ✅ Helmet security headers
- ✅ Input validation and sanitization
- ✅ Automatic session expiration (TTL index)
- ✅ Error handling with no sensitive data exposure

## 🚀 Deployment to Contabo

See `DEPLOYMENT_GUIDE.md` for complete step-by-step deployment instructions.

## 📊 Database Schema

### Users Collection
- firstName, lastName, email (unique), password (hashed)
- credits.leadsFinderCredits (default: 0)
- credits.dataScraperCredits (default: 0)
- agreeToTerms (must be true)
- isActive (default: true)
- timestamps (createdAt, updatedAt)

### Sessions Collection
- userId (ref: User)
- token (JWT, unique)
- expiresAt (TTL index for auto-deletion)
- timestamps

## 🛠️ Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

## 📝 Environment Variables

See `.env.example` for all required variables.

**Critical variables to change in production:**
- `JWT_SECRET` - Must be strong and random
- `SESSION_SECRET` - Must be strong and random
- `FRONTEND_URL` - Your production frontend domains
- `NODE_ENV` - Set to `production`

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Check connection string format
- Verify network access in MongoDB Atlas
- Ensure database user has correct permissions

### CORS Errors
- Verify `FRONTEND_URL` in `.env` matches your frontend domain
- Check that origin is included in allowed origins

### JWT Errors
- Ensure `JWT_SECRET` is set and consistent
- Check token hasn't expired (default 7 days)

## 📚 Tech Stack

- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** Passport.js (Local + JWT strategies)
- **Security:** Helmet, CORS, Rate Limiting
- **Validation:** express-validator

## 📄 License

MIT

## 🤝 Support

For issues or questions, contact support at support@daddy-leads.com

---

**Backend Ready! Connect with frontend at daddy-leads.com** 🚀
