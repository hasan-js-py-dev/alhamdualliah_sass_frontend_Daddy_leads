# Email Verification Setup Guide

This guide explains how to set up email verification for the Daddy Leads backend.

## Environment Variables

Add the following variables to your `backend/.env` file:

```env
# Email Service (Resend)
RESEND_API_KEY=re_ar7cJy6v_KvyGkxARDmWd663hpinNE8WG
FROM_EMAIL=contact@daddy-leads.com

# Frontend URL (for verification links)
FRONTEND_URL=https://app.daddy-leads.com
```

For development, use:
```env
FRONTEND_URL=http://localhost:5173
```

## How It Works

### 1. User Signup Flow
1. User creates an account at `/access?p=signup`
2. Backend creates user with `emailVerified: false`
3. Backend generates a verification token and sends email via Resend
4. User receives email with verification link
5. Success popup appears confirming email was sent

### 2. Email Verification Flow
1. User clicks verification link in email
2. Link opens `/verify-email?token=...` page
3. Frontend calls `/v1/auth/verify-email` endpoint
4. Backend verifies token and sets `emailVerified: true`
5. Success popup appears and redirects to dashboard

### 3. Login Protection
1. User tries to login at `/access?p=login`
2. If email not verified, error popup appears
3. Popup includes "Resend Verification Email" button
4. User can resend verification email without creating new account

## API Endpoints

### POST /v1/auth/signup
Creates new user and sends verification email.

**Request:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "securepassword123",
  "agreeToTerms": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "Account created successfully! Please check your email to verify your account.",
  "data": {
    "user": {
      "id": "...",
      "email": "john@example.com",
      "emailVerified": false
    }
  }
}
```

### POST /v1/auth/verify-email
Verifies email with token and logs user in.

**Request:**
```json
{
  "token": "abc123..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Email verified successfully!",
  "data": {
    "token": "jwt_token...",
    "user": {
      "id": "...",
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

### POST /v1/auth/resend-verification
Resends verification email.

**Request:**
```json
{
  "email": "john@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Verification email sent successfully. Please check your inbox."
}
```

### POST /v1/auth/login
Login with email verification check.

**Error Response (if email not verified):**
```json
{
  "success": false,
  "message": "Email not verified. Please verify your email to continue."
}
```

## Database Changes

The User model now includes:

```javascript
{
  emailVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    default: null,
  },
  verificationTokenExpiry: {
    type: Date,
    default: null,
  }
}
```

## Installation

Install the required package:

```bash
cd backend
npm install resend@2.0.0
```

## Testing

1. Start the backend server
2. Create a new account at `/access?p=signup`
3. Check your email inbox for verification email
4. Click the verification link
5. You should be redirected to dashboard after success

## Troubleshooting

### Email not sending
- Check `RESEND_API_KEY` is correct
- Verify domain is validated in Resend dashboard: https://resend.com/domains
- Check backend logs for errors

### Verification link not working
- Ensure `FRONTEND_URL` is set correctly in `.env`
- Check token hasn't expired (24 hour expiry)
- Verify backend is running and accessible

### Login blocked
- Check if email was verified
- Use "Resend Verification Email" button in error popup
- Check spam folder for verification email
