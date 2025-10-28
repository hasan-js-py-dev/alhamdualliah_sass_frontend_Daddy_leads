# Complete Authentication Implementation Guide
## MongoDB Cloud + Passport.js + Express.js

This guide covers everything you need to implement authentication with your own backend server.

---

## 📋 Table of Contents
1. [Backend Setup](#backend-setup)
2. [MongoDB Cloud Configuration](#mongodb-cloud-configuration)
3. [Environment Variables](#environment-variables)
4. [Server Implementation](#server-implementation)
5. [Frontend Integration](#frontend-integration)
6. [Deployment](#deployment)

---

## 🚀 Backend Setup

### 1. Initialize Your Backend Project

```bash
# Create backend directory (if not exists)
mkdir backend
cd backend

# Initialize npm
npm init -y

# Install required dependencies
npm install express mongoose passport passport-local passport-jwt bcrypt jsonwebtoken cors dotenv express-session cookie-parser
npm install --save-dev nodemon
```

### 2. Project Structure

```
backend/
├── config/
│   ├── database.js          # MongoDB connection
│   ├── passport.js          # Passport configuration
│   └── .env                 # Environment variables
├── models/
│   ├── User.js              # User schema
│   └── Session.js           # Session schema
├── routes/
│   ├── auth.js              # Auth routes
│   └── protected.js         # Protected routes
├── middleware/
│   └── auth.js              # Auth middleware
├── server.js                # Main server file
└── package.json
```

---

## 🗄️ MongoDB Cloud Configuration

### Step 1: Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Create a new cluster (Free M0 tier is sufficient for development)

### Step 2: Configure Database Access
1. Go to **Database Access** in sidebar
2. Click **Add New Database User**
3. Create username and password (save these!)
4. Set privileges to **Read and write to any database**

### Step 3: Configure Network Access
1. Go to **Network Access** in sidebar
2. Click **Add IP Address**
3. For development: Click **Allow Access from Anywhere** (0.0.0.0/0)
4. For production: Add your server's specific IP address

### Step 4: Get Connection String
1. Go to **Database** in sidebar
2. Click **Connect** on your cluster
3. Choose **Connect your application**
4. Copy the connection string (looks like: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/`)
5. Replace `<password>` with your actual password
6. Add database name: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/daddy-leads?retryWrites=true&w=majority`

---

## 🔐 Environment Variables

Create `backend/config/.env`:

```env
# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/daddy-leads?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-min-32-characters
JWT_EXPIRES_IN=7d

# Session Configuration
SESSION_SECRET=your-super-secret-session-key-change-this-min-32-characters

# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URLs (for CORS)
FRONTEND_URL=http://localhost:5173

# For Production, add your deployed URLs:
# FRONTEND_URL=https://yourdomain.com,https://app.yourdomain.com
```

---

## 🖥️ Server Implementation

### 1. Database Connection (`config/database.js`)

```javascript
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB Connected Successfully');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
```

### 2. User Model (`models/User.js`)

```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
```

### 3. Session Model (`models/Session.js`)

```javascript
const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  token: {
    type: String,
    required: true,
    unique: true
  },
  expiresAt: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Auto-delete expired sessions
sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('Session', sessionSchema);
```

### 4. Passport Configuration (`config/passport.js`)

```javascript
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');

// Local Strategy for login
passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email: email.toLowerCase() });
      
      if (!user) {
        return done(null, false, { message: 'Invalid email or password' });
      }
      
      const isMatch = await user.comparePassword(password);
      
      if (!isMatch) {
        return done(null, false, { message: 'Invalid email or password' });
      }
      
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

// JWT Strategy for protected routes
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

passport.use(new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    const user = await User.findById(payload.userId);
    
    if (user) {
      return done(null, user);
    }
    
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
}));

module.exports = passport;
```

### 5. Auth Middleware (`middleware/auth.js`)

```javascript
const jwt = require('jsonwebtoken');
const Session = require('../models/Session');
const User = require('../models/User');

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }
    
    // Verify JWT
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (jwtError) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token'
      });
    }
    
    // Check if session exists
    const session = await Session.findOne({
      token,
      expiresAt: { $gt: new Date() }
    });
    
    if (!session) {
      return res.status(401).json({
        success: false,
        message: 'Session expired'
      });
    }
    
    // Get user
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    req.user = user;
    req.session = session;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({
      success: false,
      message: 'Authentication error'
    });
  }
};

module.exports = { authenticate };
```

### 6. Auth Routes (`routes/auth.js`)

```javascript
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Session = require('../models/Session');
const { authenticate } = require('../middleware/auth');

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    
    // Validation
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }
    
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters'
      });
    }
    
    // Check if user exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Email already registered'
      });
    }
    
    // Create user
    const user = new User({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password
    });
    
    await user.save();
    
    // Create session
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );
    
    const session = new Session({
      userId: user._id,
      token,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });
    
    await session.save();
    
    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      data: {
        token,
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        }
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Signup failed'
    });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password required'
      });
    }
    
    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }
    
    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }
    
    // Create session
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );
    
    const session = new Session({
      userId: user._id,
      token,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });
    
    await session.save();
    
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        }
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed'
    });
  }
});

// Verify session
router.get('/verify', authenticate, async (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      user: {
        id: req.user._id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email
      }
    }
  });
});

// Logout
router.post('/logout', authenticate, async (req, res) => {
  try {
    await Session.deleteOne({ token: req.session.token });
    
    res.status(200).json({
      success: true,
      message: 'Logout successful'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Logout failed'
    });
  }
});

module.exports = router;
```

### 7. Main Server (`server.js`)

```javascript
require('dotenv').config({ path: './config/.env' });
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/database');
const passport = require('./config/passport');
const authRoutes = require('./routes/auth');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL.split(','),
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());

// Routes
app.use('/api/auth', authRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV}`);
});
```

### 8. Update package.json scripts

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

---

## 🎨 Frontend Integration

### Update AccessPage.tsx to connect to backend:

The handleSubmit function should call your backend API:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  try {
    const endpoint = mode === 'signup' ? '/api/auth/signup' : '/api/auth/login';
    const payload = mode === 'signup' 
      ? { firstName: formData.firstName, lastName: formData.lastName, email: formData.email, password: formData.password }
      : { email: formData.email, password: formData.password };
    
    const response = await fetch(`http://localhost:5000${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    const data = await response.json();
    
    if (data.success) {
      // Store token
      localStorage.setItem('authToken', data.data.token);
      // Redirect to dashboard
      navigate('/dashboard');
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error('Auth error:', error);
    alert('An error occurred');
  }
};
```

### Update ProtectedRoute.tsx:

```typescript
const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        setIsAuthenticated(false);
        return;
      }
      
      try {
        const response = await fetch('http://localhost:5000/api/auth/verify', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('authToken');
          setIsAuthenticated(false);
        }
      } catch (error) {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
      }
    };
    
    verifyAuth();
  }, []);

  return isAuthenticated;
};
```

---

## 🚀 Deployment

### Option 1: Render.com (Recommended - Free Tier Available)

1. **Push code to GitHub**
2. **Go to [Render.com](https://render.com)**
3. **Create New Web Service**
   - Connect your GitHub repo
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
4. **Add Environment Variables** (from your .env file)
5. **Deploy**

### Option 2: Railway.app

1. **Go to [Railway.app](https://railway.app)**
2. **New Project → Deploy from GitHub**
3. **Add environment variables**
4. **Deploy**

### Option 3: Heroku

```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create your-app-name

# Add environment variables
heroku config:set MONGODB_URI=your_uri
heroku config:set JWT_SECRET=your_secret
# ... add all env vars

# Deploy
git push heroku main
```

### Option 4: DigitalOcean App Platform

1. **Create account at [DigitalOcean](https://www.digitalocean.com)**
2. **Create App → Connect GitHub**
3. **Configure environment variables**
4. **Deploy**

---

## ✅ Testing Your Implementation

### 1. Start Backend
```bash
cd backend
npm run dev
```

### 2. Test Signup
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### 3. Test Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### 4. Test Protected Route
```bash
curl http://localhost:5000/api/auth/verify \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 🔒 Security Best Practices

1. **Never commit .env files**
2. **Use strong JWT secrets (32+ characters)**
3. **Enable HTTPS in production**
4. **Implement rate limiting**
5. **Add input validation**
6. **Use CORS properly**
7. **Keep dependencies updated**
8. **Implement password requirements**
9. **Add refresh token rotation**
10. **Monitor for security vulnerabilities**

---

## 📚 Additional Resources

- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)
- [Passport.js Docs](http://www.passportjs.org/)
- [JWT Best Practices](https://tools.ietf.org/html/rfc7519)
- [Express Security](https://expressjs.com/en/advanced/best-practice-security.html)

---

**You're all set! 🎉** Follow this guide step by step to implement your authentication system.
