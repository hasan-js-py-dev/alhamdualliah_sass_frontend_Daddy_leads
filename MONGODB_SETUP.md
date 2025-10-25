# MongoDB Authentication Setup Guide

This guide explains how to implement MongoDB authentication for the Daddy Leads application.

## Overview

The `/access?p=login` and `/access?p=signup` routes are now set up to handle authentication. You'll need to connect these to your MongoDB backend.

## Implementation Steps

### 1. Set Up MongoDB Atlas (or your MongoDB instance)

1. Create a MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster
3. Set up database access (username/password)
4. Set up network access (add your IP or allow from anywhere for development)
5. Get your connection string

### 2. Create Backend API Endpoints

You'll need to create backend API endpoints to handle:

#### Signup Endpoint (`POST /api/auth/signup`)
```javascript
// Expected request body:
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "securepassword123",
  "agreeToUpdates": true,
  "acceptTerms": true
}

// Response:
{
  "success": true,
  "userId": "mongodb_user_id",
  "token": "jwt_token"
}
```

#### Login Endpoint (`POST /api/auth/login`)
```javascript
// Expected request body:
{
  "email": "john@example.com",
  "password": "securepassword123"
}

// Response:
{
  "success": true,
  "userId": "mongodb_user_id",
  "token": "jwt_token",
  "user": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com"
  }
}
```

### 3. Update AccessPage.tsx

Update the `handleSubmit` function in `src/pages/AccessPage.tsx`:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  try {
    const endpoint = mode === 'signup' 
      ? 'YOUR_API_BASE_URL/api/auth/signup' 
      : 'YOUR_API_BASE_URL/api/auth/login';
    
    const body = mode === 'signup' 
      ? {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          agreeToUpdates: formData.agreeToUpdates,
          acceptTerms: formData.acceptTerms,
        }
      : {
          email: formData.email,
          password: formData.password,
        };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (data.success) {
      // Store token in localStorage
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userId', data.userId);
      
      // Redirect to dashboard or home
      navigate('/');
    } else {
      // Handle error
      console.error('Authentication failed:', data.message);
    }
  } catch (error) {
    console.error('Authentication error:', error);
  }
};
```

### 4. MongoDB Schema

Create a users collection with the following schema:

```javascript
{
  _id: ObjectId,
  firstName: String,
  lastName: String,
  email: String (unique, indexed),
  password: String (hashed with bcrypt),
  agreeToUpdates: Boolean,
  acceptTerms: Boolean,
  googleId: String (optional, for Google OAuth),
  createdAt: Date,
  updatedAt: Date
}
```

### 5. Google OAuth Setup

For Google authentication (`handleGoogleAuth` function):

1. Set up Google OAuth in Google Cloud Console
2. Get Client ID and Client Secret
3. Implement OAuth flow in your backend
4. Update the `handleGoogleAuth` function to redirect to your OAuth endpoint

## Security Best Practices

1. **Password Hashing**: Always hash passwords using bcrypt before storing
2. **JWT Tokens**: Use secure JWT tokens with expiration
3. **HTTPS**: Always use HTTPS in production
4. **Input Validation**: Validate all inputs on both frontend and backend
5. **Rate Limiting**: Implement rate limiting on auth endpoints
6. **Email Verification**: Consider adding email verification for new signups

## Alternative: Using Lovable Cloud

If you prefer not to set up your own MongoDB backend, consider using **Lovable Cloud** which provides:
- Built-in authentication
- Managed database
- No backend setup required
- Automatic scaling

To enable Lovable Cloud, simply let the AI assistant know and it will set it up for you.
