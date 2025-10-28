# Complete Backend Development Prompt for Daddy Leads Authentication System

## Project Overview
Build a complete backend authentication system for Daddy Leads using Node.js, Express.js, MongoDB, and Passport.js. The backend will be hosted on Contabo at `api.daddy-leads.com` with API endpoints under `/v1/`.

## Technology Stack
- **Runtime**: Node.js (v18 or higher)
- **Framework**: Express.js
- **Database**: MongoDB Atlas
- **Authentication**: Passport.js (Local Strategy + JWT)
- **Password Hashing**: bcrypt
- **Token Management**: jsonwebtoken
- **Validation**: express-validator
- **CORS**: cors middleware
- **Security**: helmet, express-rate-limit

## MongoDB Configuration
**Connection String**: 
```
mongodb+srv://apurbohasan627:E9XRRJJjEfCeJkJ@daddy-leads-users.6bsupik.mongodb.net/apurbohasan627_db_user?retryWrites=true&w=majority&appName=daddy-leads-users
```

**Database Name**: `apurbohasan627_db_user`

## Project Structure
```
backend/
├── server.js                 # Main application entry point
├── package.json
├── .env                      # Environment variables
├── .gitignore
├── config/
│   ├── database.js          # MongoDB connection
│   ├── passport.js          # Passport strategies configuration
│   └── env.js               # Environment configuration
├── models/
│   ├── User.js              # User schema with credits
│   └── Session.js           # Session/token management
├── routes/
│   └── v1/
│       └── auth.js          # Authentication routes
├── controllers/
│   └── authController.js    # Authentication logic
├── middleware/
│   ├── auth.js              # JWT verification middleware
│   ├── validation.js        # Input validation middleware
│   └── errorHandler.js      # Global error handler
└── utils/
    ├── tokenUtils.js        # JWT utilities
    └── responseUtils.js     # Standardized API responses
```

## Environment Variables (.env)
```env
# Server Configuration
PORT=5000
NODE_ENV=production
API_VERSION=v1

# MongoDB Configuration
MONGODB_URI=mongodb+srv://apurbohasan627:E9XRRJJjEfCeJkJ@daddy-leads-users.6bsupik.mongodb.net/apurbohasan627_db_user?retryWrites=true&w=majority&appName=daddy-leads-users

# JWT Configuration
JWT_SECRET=your-super-secure-random-jwt-secret-minimum-32-characters-long
JWT_EXPIRES_IN=7d

# Session Configuration
SESSION_SECRET=your-super-secure-random-session-secret-minimum-32-characters

# Frontend URLs (CORS)
FRONTEND_URL=https://daddy-leads.com,https://app.daddy-leads.com
FRONTEND_URL_DEV=http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Credits Configuration (for new users)
DEFAULT_LEADS_FINDER_CREDITS=0
DEFAULT_DATA_SCRAPER_CREDITS=0
```

## Database Schema

### 1. Users Collection
```javascript
{
  _id: ObjectId,
  firstName: String (required, trimmed),
  lastName: String (required, trimmed),
  email: String (required, unique, lowercase, indexed),
  password: String (required, hashed with bcrypt),
  credits: {
    leadsFinderCredits: Number (default: 0),
    dataScraperCredits: Number (default: 0)
  },
  agreeToTerms: Boolean (required, must be true),
  isActive: Boolean (default: true),
  createdAt: Date (default: now),
  updatedAt: Date (default: now)
}

// Indexes
{ email: 1 } (unique)
```

### 2. Sessions Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (references users._id),
  token: String (JWT token, indexed),
  expiresAt: Date (indexed for auto-deletion),
  createdAt: Date (default: now)
}

// Indexes
{ token: 1 } (unique)
{ expiresAt: 1 } (with TTL for auto-deletion)
{ userId: 1 }
```

## API Endpoints

### Base URL
- **Production**: `https://api.daddy-leads.com/v1`
- **Development**: `http://localhost:5000/v1`

### 1. POST /v1/auth/signup
Create a new user account with initial credits.

**Request Body**:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "SecurePassword123",
  "agreeToTerms": true
}
```

**Success Response** (200):
```json
{
  "success": true,
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
  },
  "message": "Account created successfully"
}
```

**Error Responses**:
- 400: Validation errors (missing fields, invalid email, weak password)
- 409: Email already exists
- 500: Server error

### 2. POST /v1/auth/login
Authenticate user and return JWT token.

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "SecurePassword123"
}
```

**Success Response** (200):
```json
{
  "success": true,
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
  },
  "message": "Login successful"
}
```

**Error Responses**:
- 400: Validation errors
- 401: Invalid credentials
- 500: Server error

### 3. GET /v1/auth/verify
Verify JWT token and return user data.

**Headers**:
```
Authorization: Bearer <jwt-token>
```

**Success Response** (200):
```json
{
  "success": true,
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

**Error Responses**:
- 401: No token provided / Invalid token / Expired token
- 404: User not found
- 500: Server error

### 4. POST /v1/auth/logout
Invalidate user session.

**Headers**:
```
Authorization: Bearer <jwt-token>
```

**Success Response** (200):
```json
{
  "success": true,
  "message": "Logout successful"
}
```

**Error Responses**:
- 401: No token provided
- 500: Server error

## Implementation Requirements

### 1. Password Security
- Minimum 8 characters
- Hash passwords using bcrypt with salt rounds = 10
- Never store plain-text passwords
- Never log passwords

### 2. JWT Implementation
- Sign tokens with HS256 algorithm
- Include user ID and email in payload
- Set expiration to 7 days
- Store tokens in sessions collection
- Verify token on each protected route

### 3. Validation Rules
**Signup**:
- firstName: Required, 1-50 characters, letters only
- lastName: Required, 1-50 characters, letters only
- email: Required, valid email format, unique
- password: Required, minimum 8 characters
- agreeToTerms: Required, must be true

**Login**:
- email: Required, valid email format
- password: Required

### 4. CORS Configuration
Allow requests from:
- `https://daddy-leads.com`
- `https://app.daddy-leads.com`
- `http://localhost:5173` (development only)

Enable credentials and allow headers:
- Content-Type
- Authorization

### 5. Rate Limiting
- 100 requests per 15 minutes per IP
- More strict on auth endpoints: 10 login attempts per 15 minutes

### 6. Error Handling
Implement global error handler that returns:
```json
{
  "success": false,
  "message": "User-friendly error message",
  "errors": [] // Optional validation errors
}
```

### 7. Security Headers (using Helmet)
- X-Content-Type-Options
- X-Frame-Options
- X-XSS-Protection
- Strict-Transport-Security

### 8. Session Management
- Store JWT in sessions collection with userId reference
- Automatically delete expired sessions using MongoDB TTL index
- On logout, remove session from database
- On login, create new session

## Pricing Plans Integration

### Credits System
When a user signs up, initialize their credits:
```javascript
credits: {
  leadsFinderCredits: 0,  // $0.0019 per credit, min $19 (10,000 credits)
  dataScraperCredits: 0   // $0.0009 per credit, min $9 (10,000 credits)
}
```

### Future Endpoints (for reference)
- POST /v1/credits/purchase - Purchase credits
- GET /v1/credits/balance - Get current balance
- POST /v1/credits/deduct - Deduct credits (protected, called by scraper services)

## Code Quality Requirements

1. **Modular Code**: Separate concerns (routes, controllers, models, middleware)
2. **Error Handling**: Try-catch blocks in all async functions
3. **Input Validation**: Validate and sanitize all inputs
4. **Logging**: Use console.error for errors (consider Morgan for request logging)
5. **Comments**: Add JSDoc comments for functions
6. **Async/Await**: Use modern async/await syntax
7. **ES6+**: Use modern JavaScript features
8. **No Hardcoding**: Use environment variables

## Testing Commands

### 1. Signup Test
```bash
curl -X POST https://api.daddy-leads.com/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "SecurePass123",
    "agreeToTerms": true
  }'
```

### 2. Login Test
```bash
curl -X POST https://api.daddy-leads.com/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123"
  }'
```

### 3. Verify Test
```bash
curl -X GET https://api.daddy-leads.com/v1/auth/verify \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

### 4. Logout Test
```bash
curl -X POST https://api.daddy-leads.com/v1/auth/logout \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

## Deployment Checklist

### Contabo Server Setup
1. Install Node.js (v18+)
2. Install MongoDB (or use MongoDB Atlas)
3. Install PM2 for process management
4. Configure Nginx as reverse proxy
5. Set up SSL certificate (Let's Encrypt)
6. Configure firewall (allow ports 80, 443, 5000)

### Nginx Configuration
```nginx
server {
    listen 80;
    server_name api.daddy-leads.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name api.daddy-leads.com;

    ssl_certificate /etc/letsencrypt/live/api.daddy-leads.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.daddy-leads.com/privkey.pem;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### PM2 Configuration
```bash
# Start application
pm2 start server.js --name daddy-leads-api

# Auto-restart on server reboot
pm2 startup
pm2 save

# View logs
pm2 logs daddy-leads-api
```

## Security Best Practices

1. ✅ Never commit .env file to Git
2. ✅ Use strong, random secrets (minimum 32 characters)
3. ✅ Enable HTTPS only in production
4. ✅ Implement rate limiting on all endpoints
5. ✅ Sanitize all user inputs
6. ✅ Use parameterized queries (MongoDB prevents injection by default)
7. ✅ Keep dependencies updated
8. ✅ Use helmet for security headers
9. ✅ Implement CORS properly
10. ✅ Log security events (failed logins, etc.)
11. ✅ Set secure session expiration
12. ✅ Never expose internal error details to clients

## Frontend Integration (Already Completed)

The frontend is already set up with:
- ✅ Auth service (`src/services/authService.ts`)
- ✅ Auth context (`src/contexts/AuthContext.tsx`)
- ✅ Protected routes (`src/pages/dashboard/components/ProtectedRoute.tsx`)
- ✅ Login/Signup page (`src/pages/AccessPage.tsx`)

The frontend expects:
- Base URL: `https://api.daddy-leads.com/v1`
- Dev URL: `http://localhost:5000/v1`
- Token stored in localStorage as `authToken`
- Bearer token authentication

## Expected Package.json
```json
{
  "name": "daddy-leads-backend",
  "version": "1.0.0",
  "description": "Backend API for Daddy Leads",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^8.0.0",
    "passport": "^0.7.0",
    "passport-local": "^1.0.0",
    "passport-jwt": "^4.0.1",
    "bcrypt": "^5.1.1",
    "jsonwebtoken": "^9.0.2",
    "express-validator": "^7.0.1",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "express-rate-limit": "^7.1.5",
    "dotenv": "^16.3.1",
    "morgan": "^1.10.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.2"
  }
}
```

## Success Criteria

✅ User can sign up with firstName, lastName, email, password
✅ New users get initial credits (0 for both)
✅ Passwords are hashed with bcrypt
✅ User can login with email/password
✅ JWT token is returned on login/signup
✅ Token is stored in sessions collection
✅ Protected routes verify token
✅ User data (including credits) is returned on verification
✅ Logout invalidates session
✅ All endpoints return consistent JSON responses
✅ Input validation prevents invalid data
✅ CORS allows frontend domains
✅ Rate limiting prevents abuse
✅ Errors are handled gracefully
✅ MongoDB connection is stable
✅ Code is modular and maintainable

---

## Quick Start Instructions

1. Clone/Create backend directory
2. Run `npm install`
3. Create `.env` file with all variables above
4. Run `npm start` or `npm run dev`
5. Test all endpoints using curl commands
6. Deploy to Contabo server
7. Configure Nginx and SSL
8. Set up PM2 for process management
9. Test with frontend at daddy-leads.com

**Note**: The frontend is already configured and waiting for your backend API!
