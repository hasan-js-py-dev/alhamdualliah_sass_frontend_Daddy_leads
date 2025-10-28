# Windows Setup Guide

## Fixed: No Python or Build Tools Required!

The backend now uses `bcryptjs` instead of `bcrypt`, which means:
- ✅ No Python installation needed
- ✅ No Windows build tools required
- ✅ Pure JavaScript implementation
- ✅ Works on all Windows systems (32-bit and 64-bit)

## Installation Steps

1. **Delete the problematic node_modules** (if exists):
```bash
cd backend
rmdir /s /q node_modules
```

2. **Install dependencies**:
```bash
npm install
```

3. **Create .env file**:
```bash
copy .env.example .env
```

4. **Edit .env file** with your settings:
```env
# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://apurbohasan627:E9XRRJJjEfCeJkJ@cluster0.mongodb.net/daddy-leads?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# Session Configuration
SESSION_SECRET=your-super-secret-session-key-change-this-too

# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:8080
```

5. **Start the server**:
```bash
npm run dev
```

## Testing

Test the backend is working:
```bash
curl http://localhost:5000/health
```

You should see:
```json
{
  "status": "OK",
  "timestamp": "2024-...",
  "uptime": 1.234,
  "environment": "development"
}
```

## Next Steps

1. The backend will run on `http://localhost:5000`
2. Deploy to Contabo following `DEPLOYMENT_GUIDE.md`
3. Update frontend API URL to `https://api.daddy-leads.com/v1`

## Troubleshooting

### If you still have issues:

1. **Clear npm cache**:
```bash
npm cache clean --force
```

2. **Delete package-lock.json**:
```bash
del package-lock.json
```

3. **Reinstall**:
```bash
npm install
```

### Port already in use:
```bash
# Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F
```

## Why bcryptjs?

- **bcrypt**: Native module, requires C++ compilation, needs Python + build tools
- **bcryptjs**: Pure JavaScript, no compilation, works everywhere
- Same API, same security level
- Perfect for Windows development
