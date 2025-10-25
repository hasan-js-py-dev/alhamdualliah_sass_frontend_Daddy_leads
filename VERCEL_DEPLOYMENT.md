# Vercel Deployment Guide for Daddy Leads

## Overview
This guide explains how to deploy your Daddy Leads application on Vercel with a main domain (daddy-leads.com) for marketing pages and a subdomain (app.daddy-leads.com) for the application dashboard.

## Architecture

### Main Domain (daddy-leads.com)
- Homepage (/)
- Product Page (/product)
- Pricing Page (/pricing)
- Connect Page (/connect)

### App Subdomain (app.daddy-leads.com)
- Access/Auth Page (/access?p=login or /access?p=signup)
- Dashboard (/dashboard/*)
- All protected routes

## Deployment Steps

### Option 1: Single Deployment (Recommended for MVP)

Deploy everything to one domain and use routing:

1. **Deploy to Vercel**
   ```bash
   vercel --prod
   ```

2. **Add Custom Domain**
   - Go to your Vercel project settings
   - Navigate to Domains
   - Add `daddy-leads.com` as your production domain
   - Add `app.daddy-leads.com` as an additional domain

3. **Configure DNS** (at your domain registrar)
   - Add A record for `daddy-leads.com` pointing to Vercel's IP
   - Add CNAME for `app` subdomain pointing to your Vercel project URL
   
4. **Vercel will automatically handle**
   - SSL certificates for both domains
   - Routing based on the domain

### Option 2: Separate Deployments (Advanced)

Deploy marketing site and app separately:

1. **Marketing Site (daddy-leads.com)**
   - Create a new Vercel project for marketing
   - Deploy only marketing pages
   - Connect `daddy-leads.com`

2. **App (app.daddy-leads.com)**
   - Deploy this project to Vercel
   - Connect `app.daddy-leads.com`

## Current Implementation

The app is set up to work with both approaches:

### Authentication Flow
1. User visits `daddy-leads.com` (marketing site)
2. Clicks "Sign Up" or "Login"
3. Redirects to `/access?p=signup` or `/access?p=login`
4. After successful authentication:
   - MongoDB stores user session/token
   - localStorage stores authToken
   - User redirects to `/dashboard`

### Protected Routes
All dashboard routes are wrapped with `ProtectedRoute` component that:
- Checks for valid MongoDB session/token
- Redirects to `/access?p=login` if not authenticated
- Allows access if authenticated

### Routes Structure
```
Marketing Routes (Public):
  / - Homepage
  /product - Product Page
  /pricing - Pricing Page
  /connect - Connect Page
  /access - Authentication Page (Login/Signup)

Protected Routes (Requires Auth):
  /dashboard - Main Dashboard (Sales Navigator Export)
  /dashboard/sales-navigator - Sales Navigator Export
  /dashboard/url-enrichment - URL Enrichment
  /dashboard/email-finder - Email Finder
  /dashboard/email-verifier - Email Verifier
  /dashboard/credits - Credits Management
  /dashboard/team - Team Management
  /dashboard/api - API Settings
  /dashboard/account - Account Settings
```

## MongoDB Integration

### Required MongoDB Collections

#### users
```javascript
{
  _id: ObjectId,
  firstName: String,
  lastName: String,
  email: String (unique, indexed),
  password: String (hashed with bcrypt),
  agreeToUpdates: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

#### sessions
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: users),
  token: String (unique, indexed),
  expiresAt: Date,
  createdAt: Date
}
```

### Backend API Endpoints Needed

Create these endpoints in your backend (Express/Node.js):

```javascript
POST /api/auth/signup
POST /api/auth/login
POST /api/auth/logout
GET /api/auth/verify
POST /api/auth/google (for Google OAuth)
```

## Environment Variables

Add these to your Vercel project:

```env
VITE_MONGODB_API_URL=your_backend_api_url
VITE_APP_DOMAIN=app.daddy-leads.com
VITE_MAIN_DOMAIN=daddy-leads.com
```

## Implementation Checklist

- [ ] Deploy to Vercel
- [ ] Configure custom domains (daddy-leads.com and app.daddy-leads.com)
- [ ] Set up DNS records
- [ ] Create MongoDB database
- [ ] Implement backend API endpoints
- [ ] Configure environment variables
- [ ] Test authentication flow
- [ ] Test protected routes
- [ ] Configure Google OAuth (optional)
- [ ] Set up session management

## Testing

### Local Development
```bash
npm run dev
```

### Test Authentication Flow
1. Navigate to `/access?p=signup`
2. Create an account
3. Verify redirect to `/dashboard`
4. Logout
5. Verify redirect to `/access?p=login`
6. Login
7. Verify redirect to `/dashboard`
8. Try accessing `/dashboard` without auth
9. Verify redirect to `/access?p=login`

## Troubleshooting

### 404 Errors on Refresh
Add `vercel.json` in project root:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### CORS Issues
Configure backend to allow requests from both domains:
```javascript
cors({
  origin: ['https://daddy-leads.com', 'https://app.daddy-leads.com'],
  credentials: true
})
```

### Session Not Persisting
- Check MongoDB session expiry
- Verify localStorage is accessible
- Check HTTPS/secure cookies

## Security Considerations

1. **Password Hashing**: Use bcrypt with salt rounds ≥ 10
2. **Session Tokens**: Use secure random tokens (crypto.randomBytes)
3. **HTTPS Only**: Ensure all cookies are secure and httpOnly
4. **CORS**: Whitelist only your domains
5. **Rate Limiting**: Implement on auth endpoints
6. **Input Validation**: Validate all user inputs
7. **XSS Protection**: Sanitize all user-generated content

## Additional Resources

- [Vercel Domains Documentation](https://vercel.com/docs/concepts/projects/domains)
- [MongoDB Atlas Setup](https://www.mongodb.com/cloud/atlas)
- [React Router Protected Routes](https://reactrouter.com/en/main/start/overview)
