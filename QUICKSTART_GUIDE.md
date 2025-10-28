# 🚀 Quick Start Guide - Daddy Leads Full Stack Setup

Everything you need to get Daddy Leads authentication working from frontend to backend!

## 📦 What's Included

### ✅ Frontend (Ready to Use)
- **Login/Signup Page** with beautiful UI
- **Auth Service** for API calls
- **Auth Context** for global state
- **Protected Routes** for dashboard
- Automatic session persistence
- Error handling with toast notifications

### ✅ Backend (Complete Code)
All backend files are in the `backend/` folder:
- Express.js server with security
- MongoDB models (User, Session)
- Passport.js authentication
- JWT token management
- Input validation
- Rate limiting
- CORS configuration

## 🎯 Getting Started

### Option 1: Test Locally First (Recommended)

#### Step 1: Setup Backend Locally
```bash
cd backend
npm install
cp .env.example .env
nano .env  # Update JWT_SECRET and SESSION_SECRET
npm run dev
```

Backend runs on `http://localhost:5000`

#### Step 2: Test Endpoints
```bash
# Test signup
curl -X POST http://localhost:5000/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@test.com",
    "password": "Test123456",
    "agreeToTerms": true
  }'
```

#### Step 3: Test Frontend
The frontend is already running in Lovable preview. Just:
1. Visit `/access?p=signup`
2. Create an account
3. Should redirect to `/dashboard` automatically!

### Option 2: Deploy to Contabo

Follow the complete guide in `backend/DEPLOYMENT_GUIDE.md`

#### Quick Deploy Steps:
```bash
# 1. Connect to Contabo server
ssh root@your-server-ip

# 2. Install Node.js and PM2
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install -g pm2

# 3. Upload backend code
# (Use git clone or scp)

# 4. Install and start
cd backend
npm install --production
pm2 start server.js --name daddy-leads-api
pm2 startup && pm2 save

# 5. Setup Nginx + SSL
sudo apt install nginx certbot python3-certbot-nginx -y
# Configure Nginx (see DEPLOYMENT_GUIDE.md)
sudo certbot --nginx -d api.daddy-leads.com
```

## 📂 File Structure Overview

```
project-root/
├── src/                                    # Frontend (React)
│   ├── services/
│   │   └── authService.ts                 # ✅ API calls
│   ├── contexts/
│   │   └── AuthContext.tsx                # ✅ Global auth state
│   ├── pages/
│   │   ├── AccessPage.tsx                 # ✅ Login/Signup
│   │   └── dashboard/
│   │       └── components/
│   │           └── ProtectedRoute.tsx     # ✅ Route protection
│   └── ...
│
└── backend/                                # Backend (Node.js)
    ├── server.js                          # ✅ Main app
    ├── package.json                       # ✅ Dependencies
    ├── .env.example                       # ✅ Environment template
    ├── config/
    │   ├── database.js                    # ✅ MongoDB connection
    │   └── passport.js                    # ✅ Auth strategies
    ├── models/
    │   ├── User.js                        # ✅ User schema + credits
    │   └── Session.js                     # ✅ Session management
    ├── routes/
    │   └── v1/
    │       └── auth.js                    # ✅ Auth endpoints
    ├── controllers/
    │   └── authController.js              # ✅ Business logic
    ├── middleware/
    │   ├── auth.js                        # ✅ JWT verification
    │   ├── validation.js                  # ✅ Input validation
    │   └── errorHandler.js                # ✅ Error handling
    └── utils/
        ├── tokenUtils.js                  # ✅ JWT utilities
        └── responseUtils.js               # ✅ API responses
```

## 🔑 Critical Configuration

### Backend Environment Variables
Create `backend/.env`:
```env
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://apurbohasan627:E9XRRJJjEfCeJkJ@daddy-leads-users.6bsupik.mongodb.net/apurbohasan627_db_user?retryWrites=true&w=majority&appName=daddy-leads-users

# Generate these secrets!
JWT_SECRET=<run: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))">
SESSION_SECRET=<run: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))">

FRONTEND_URL=https://daddy-leads.com,https://app.daddy-leads.com
FRONTEND_URL_DEV=http://localhost:5173
```

### Frontend API URLs
Already configured in `src/services/authService.ts`:
- **Dev:** `http://localhost:5000/v1`
- **Prod:** `https://api.daddy-leads.com/v1`

## 🧪 Testing the Full Flow

### 1. Signup Flow
```bash
# Backend endpoint
curl -X POST https://api.daddy-leads.com/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "password": "SecurePass123",
    "agreeToTerms": true
  }'

# Frontend
Visit: https://app.daddy-leads.com/access?p=signup
```

### 2. Login Flow
```bash
# Backend endpoint
curl -X POST https://api.daddy-leads.com/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "SecurePass123"
  }'

# Frontend
Visit: https://app.daddy-leads.com/access?p=login
```

### 3. Verify Session
```bash
# Backend endpoint (replace TOKEN)
curl -X GET https://api.daddy-leads.com/v1/auth/verify \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Frontend
Refresh the page while logged in - should stay logged in
```

## 🎨 User Experience Flow

1. **New User:**
   - Visits `app.daddy-leads.com/access?p=signup`
   - Fills form: First Name, Last Name, Email, Password
   - Checks "I agree to Terms and Conditions"
   - Clicks "Create Account"
   - Gets 0 credits for both plans initially
   - Redirects to `/dashboard`
   - Logged in! ✅

2. **Returning User:**
   - Visits `app.daddy-leads.com/access?p=login`
   - Enters Email and Password
   - Clicks "Sign In"
   - Redirects to `/dashboard`
   - Logged in! ✅

3. **Session Persistence:**
   - User refreshes page
   - Frontend checks localStorage for token
   - Calls `/v1/auth/verify` with token
   - User stays logged in! ✅

4. **Protected Routes:**
   - User tries to visit `/dashboard` without login
   - Gets redirected to `/access?p=login`
   - After login, can access all dashboard routes ✅

## 💳 Credits System

When users sign up, they get:
```javascript
credits: {
  leadsFinderCredits: 0,    // $0.0019 per credit
  dataScraperCredits: 0     // $0.0009 per credit
}
```

Pricing:
- **B2B Leads Finder:** $19 for 10,000 credits (min)
- **B2B Data Scraper:** $9 for 10,000 credits (min)

## 📚 Documentation Files

- **BACKEND_DEVELOPMENT_PROMPT.md** - For ChatGPT agents
- **FRONTEND_INTEGRATION_SUMMARY.md** - Frontend setup details
- **backend/README_COMPLETE.md** - Backend API documentation
- **backend/DEPLOYMENT_GUIDE.md** - Step-by-step Contabo deployment
- **QUICKSTART_GUIDE.md** - This file!

## 🔧 Troubleshooting

### Backend Won't Start
```bash
cd backend
pm2 logs daddy-leads-api  # Check logs
pm2 restart daddy-leads-api  # Restart
```

### Frontend Can't Connect
- Check CORS in `backend/server.js`
- Verify `FRONTEND_URL` in `.env`
- Check API URL in `src/services/authService.ts`

### MongoDB Connection Failed
- Verify connection string in `.env`
- Check MongoDB Atlas allows your IP
- Test with MongoDB Compass

### JWT Token Invalid
- Ensure `JWT_SECRET` is same in .env
- Check token hasn't expired (7 days)
- Clear localStorage and login again

## ✅ Deployment Checklist

### Before Deploying:
- [ ] MongoDB Atlas network access allows server IP
- [ ] Strong JWT_SECRET generated (32+ characters)
- [ ] Strong SESSION_SECRET generated (32+ characters)
- [ ] Domain `api.daddy-leads.com` points to server IP
- [ ] FRONTEND_URL updated in .env

### After Deploying:
- [ ] Backend health check works: `curl https://api.daddy-leads.com/health`
- [ ] Signup endpoint works (test with cURL)
- [ ] Login endpoint works (test with cURL)
- [ ] Verify endpoint works (test with cURL)
- [ ] Frontend can signup new users
- [ ] Frontend can login users
- [ ] Session persists on refresh
- [ ] Protected routes work
- [ ] SSL certificate installed
- [ ] PM2 auto-restarts on reboot

## 🎉 Success Criteria

You'll know everything works when:

1. ✅ Backend responds to health check
2. ✅ Can create account via frontend
3. ✅ Can login via frontend
4. ✅ Session persists on refresh
5. ✅ Dashboard is accessible when logged in
6. ✅ Dashboard redirects to login when not logged in
7. ✅ User credits are tracked in database

## 🚀 Next Steps After Setup

1. **Add Logout Button** to dashboard
2. **Display Credits** on dashboard
3. **Add Credits Purchase** functionality
4. **Implement Lead Finder** scraper
5. **Implement Data Scraper** functionality
6. **Add Credit Deduction** when using services

## 📞 Need Help?

1. **Check logs:** `pm2 logs daddy-leads-api`
2. **Test with cURL:** Use commands in this guide
3. **Check MongoDB:** Verify connection in Atlas
4. **Review docs:** Read deployment guide for details

---

**Everything is ready! Just deploy the backend and you're live! 🎉**

The frontend is waiting at `app.daddy-leads.com` to connect with your backend API!
