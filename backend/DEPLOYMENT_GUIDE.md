# Deployment Guide - Contabo Server

Complete guide to deploy Daddy Leads Backend API on Contabo server.

## Prerequisites

- Contabo VPS server with Ubuntu 20.04/22.04
- SSH access to server
- Domain: `api.daddy-leads.com` pointed to server IP

## Step 1: Initial Server Setup

### Connect to Server
```bash
ssh root@your-server-ip
```

### Update System
```bash
apt update && apt upgrade -y
```

### Create Non-Root User (Recommended)
```bash
adduser daddy-leads
usermod -aG sudo daddy-leads
su - daddy-leads
```

## Step 2: Install Node.js

```bash
# Install Node.js 18.x (LTS)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version  # Should show v18.x.x
npm --version
```

## Step 3: Install PM2 Process Manager

```bash
sudo npm install -g pm2

# Verify installation
pm2 --version
```

## Step 4: Install Nginx

```bash
sudo apt install nginx -y

# Start Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Check status
sudo systemctl status nginx
```

## Step 5: Setup Backend Application

### Clone or Upload Backend Code

**Option A: Using Git**
```bash
cd /home/daddy-leads
git clone <your-backend-repo-url> backend
cd backend
```

**Option B: Using SCP (from your local machine)**
```bash
# On your local machine
scp -r ./backend daddy-leads@your-server-ip:/home/daddy-leads/
```

### Install Dependencies
```bash
cd /home/daddy-leads/backend
npm install --production
```

### Configure Environment
```bash
cp .env.example .env
nano .env
```

**Update these values in .env:**
```env
PORT=5000
NODE_ENV=production

MONGODB_URI=mongodb+srv://apurbohasan627:E9XRRJJjEfCeJkJ@daddy-leads-users.6bsupik.mongodb.net/apurbohasan627_db_user?retryWrites=true&w=majority&appName=daddy-leads-users

# IMPORTANT: Generate strong secrets!
JWT_SECRET=<generate-32-character-random-string>
SESSION_SECRET=<generate-32-character-random-string>

FRONTEND_URL=https://daddy-leads.com,https://app.daddy-leads.com
FRONTEND_URL_DEV=http://localhost:5173
```

**Generate strong secrets:**
```bash
# Run this command twice to generate two different secrets
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Step 6: Test Backend Locally

```bash
# Start server to test
npm start

# In another terminal, test health endpoint
curl http://localhost:5000/health
```

If successful, stop the server (Ctrl+C) and proceed to PM2 setup.

## Step 7: Configure PM2

### Start Application with PM2
```bash
cd /home/daddy-leads/backend
pm2 start server.js --name daddy-leads-api
```

### Configure PM2 Startup Script
```bash
# Generate startup script
pm2 startup systemd

# Copy and run the command that PM2 outputs

# Save PM2 process list
pm2 save
```

### Useful PM2 Commands
```bash
# View logs
pm2 logs daddy-leads-api

# View status
pm2 status

# Restart app
pm2 restart daddy-leads-api

# Stop app
pm2 stop daddy-leads-api

# Monitor
pm2 monit
```

## Step 8: Configure Firewall

```bash
# Allow SSH, HTTP, HTTPS
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw enable

# Check status
sudo ufw status
```

## Step 9: Configure Nginx Reverse Proxy

### Create Nginx Configuration
```bash
sudo nano /etc/nginx/sites-available/api.daddy-leads.com
```

**Paste this configuration:**
```nginx
server {
    listen 80;
    server_name api.daddy-leads.com;

    # Redirect to HTTPS (will be configured after SSL)
    # For now, proxy to backend
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
        
        # Increase timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}
```

### Enable Site
```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/api.daddy-leads.com /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

## Step 10: Install SSL Certificate (Let's Encrypt)

### Install Certbot
```bash
sudo apt install certbot python3-certbot-nginx -y
```

### Obtain SSL Certificate
```bash
sudo certbot --nginx -d api.daddy-leads.com

# Follow prompts:
# - Enter email address
# - Agree to terms
# - Choose redirect option (recommended)
```

Certbot will automatically update your Nginx configuration to use HTTPS.

### Test SSL Renewal
```bash
sudo certbot renew --dry-run
```

SSL certificates auto-renew via cron job.

## Step 11: Verify Deployment

### Test Health Endpoint
```bash
curl https://api.daddy-leads.com/health
```

Expected response:
```json
{
  "success": true,
  "message": "Daddy Leads API is running",
  "version": "v1",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Test Signup
```bash
curl -X POST https://api.daddy-leads.com/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "password": "TestPass123",
    "agreeToTerms": true
  }'
```

### Test Login
```bash
curl -X POST https://api.daddy-leads.com/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPass123"
  }'
```

## Step 12: Setup Monitoring (Optional)

### Install Monitoring Tools
```bash
# Install htop for system monitoring
sudo apt install htop -y

# View system resources
htop
```

### Setup Log Rotation
```bash
sudo nano /etc/logrotate.d/daddy-leads-api
```

Add:
```
/home/daddy-leads/.pm2/logs/*.log {
    daily
    rotate 7
    compress
    delaycompress
    missingok
    notifempty
}
```

## Step 13: Security Hardening

### Disable Root SSH Login
```bash
sudo nano /etc/ssh/sshd_config
```

Change:
```
PermitRootLogin no
```

Restart SSH:
```bash
sudo systemctl restart sshd
```

### Setup Fail2Ban (Optional)
```bash
sudo apt install fail2ban -y
sudo systemctl start fail2ban
sudo systemctl enable fail2ban
```

## Maintenance Commands

### Update Application
```bash
cd /home/daddy-leads/backend
git pull  # or upload new files
npm install --production
pm2 restart daddy-leads-api
```

### View Logs
```bash
# Application logs
pm2 logs daddy-leads-api

# Nginx access logs
sudo tail -f /var/log/nginx/access.log

# Nginx error logs
sudo tail -f /var/log/nginx/error.log
```

### Backup Database
MongoDB Atlas handles backups, but you can also:
```bash
# Create backup script
nano ~/backup-db.sh
```

### Monitor Server Resources
```bash
# CPU and memory usage
htop

# Disk usage
df -h

# Check PM2 status
pm2 status
```

## Troubleshooting

### Backend Not Starting
```bash
# Check logs
pm2 logs daddy-leads-api

# Check if port 5000 is in use
sudo lsof -i :5000

# Restart PM2
pm2 restart daddy-leads-api
```

### Nginx Errors
```bash
# Check Nginx error logs
sudo tail -f /var/log/nginx/error.log

# Test Nginx configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

### MongoDB Connection Issues
- Verify MongoDB Atlas allows your server IP
- Check connection string in .env
- Test connection with MongoDB Compass

### SSL Certificate Issues
```bash
# Check certificate status
sudo certbot certificates

# Renew manually
sudo certbot renew

# Check Nginx config
sudo nginx -t
```

## Production Checklist

- ✅ Node.js and npm installed
- ✅ PM2 running backend
- ✅ PM2 startup script configured
- ✅ Nginx installed and configured
- ✅ SSL certificate installed
- ✅ Firewall configured
- ✅ Environment variables set (with strong secrets)
- ✅ MongoDB connection working
- ✅ All API endpoints tested
- ✅ Logs accessible via PM2
- ✅ Auto-restart on reboot configured

## Support

If you encounter issues:
1. Check PM2 logs: `pm2 logs daddy-leads-api`
2. Check Nginx logs: `sudo tail -f /var/log/nginx/error.log`
3. Verify MongoDB connection in Atlas
4. Test endpoints with cURL

---

**Your Backend is Live at `https://api.daddy-leads.com/v1` 🚀**
