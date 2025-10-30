# Complete Guide: GitHub Actions to VPS Deployment with Docker

## Table of Contents
1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Part 1: GitHub Actions Setup](#part-1-github-actions-setup)
4. [Part 2: VPS Preparation](#part-2-vps-preparation)
5. [Part 3: Deploying to VPS](#part-3-deploying-to-vps)
6. [Part 4: Nginx Configuration](#part-4-nginx-configuration)
7. [Part 5: SSL Setup](#part-5-ssl-setup)
8. [Part 6: Monitoring & Maintenance](#part-6-monitoring--maintenance)
9. [Part 7: Troubleshooting](#part-7-troubleshooting)

---

## Overview

This guide documents the complete process of setting up automated Docker image builds using GitHub Actions, pushing images to GitHub Container Registry (GHCR), and deploying them to a VPS using Docker Compose with Nginx as a reverse proxy.

**Architecture Flow:**
```
Code Push → GitHub Actions → Build Docker Image → Push to GHCR → Pull on VPS → Docker Compose → Nginx → Domain
```

**Benefits:**
- ✅ Automated CI/CD pipeline
- ✅ Version-controlled infrastructure
- ✅ Zero-downtime deployments possible
- ✅ Easy rollback capabilities
- ✅ Multi-architecture support (amd64, arm64)

---

## Prerequisites

### Required Services:
- ✅ GitHub account with a repository
- ✅ VPS (Contabo, DigitalOcean, AWS EC2, etc.)
- ✅ Domain name with DNS access
- ✅ Basic understanding of Docker and Linux commands

### Software Requirements:
- Docker Engine 20.10+
- Docker Compose 2.0+
- Nginx 1.18+
- Certbot for SSL certificates

---

## Part 1: GitHub Actions Setup

### Step 1.1: Create GitHub Action Workflow File

**Purpose:** Automate Docker image building and pushing to GHCR whenever code changes.

**File Location:** `.github/workflows/build-and-push-backend.yml`

**Explanation of Workflow Configuration:**

```yaml
name: Build and Push Backend Docker Image

# Trigger Conditions
on:
  push:
    branches:
      - main          # Triggers on push to main branch
      - master        # Triggers on push to master branch
    paths:
      - 'backend/**'  # Only triggers when backend files change
      - '.github/workflows/build-and-push-backend.yml'
  workflow_dispatch:  # Allows manual triggering from GitHub UI

# Environment Variables
env:
  REGISTRY: ghcr.io                              # GitHub Container Registry
  IMAGE_NAME: ${{ github.repository }}/backend  # Format: username/repo/backend
  IMAGE_NAME_LOWER: ""                          # Will store lowercase version

jobs:
  build-and-push:
    runs-on: ubuntu-latest  # Use GitHub-hosted Ubuntu runner
    
    # Permissions required for GHCR
    permissions:
      contents: read   # Read repository contents
      packages: write  # Write to GitHub Packages (GHCR)

    steps:
      # Step 1: Get the code
      - name: Checkout repository
        uses: actions/checkout@v4
        # Downloads your repository code to the runner

      # Step 2: Setup Docker Buildx (advanced builder)
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3
        # Enables multi-platform builds and caching

      # Step 3: Authenticate with GHCR
      - name: Log in to GitHub Container Registry
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}           # Your GitHub username
          password: ${{ secrets.GITHUB_TOKEN }}   # Auto-provided token
        # This authenticates Docker to push images to GHCR

      # Step 4: Convert image name to lowercase
      - name: Convert image name to lowercase
        run: |
          echo "IMAGE_NAME_LOWER=$(echo ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }} | tr '[:upper:]' '[:lower:]')" >> $GITHUB_ENV
        # GHCR requires lowercase image names

      # Step 5: Generate Docker metadata (tags, labels)
      - name: Extract metadata
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ${{ env.IMAGE_NAME_LOWER }}
          tags: |
            type=raw,value=latest,enable={{is_default_branch}}
            type=raw,value=stable,enable={{is_default_branch}}
            type=sha,prefix={{branch}}-
        # Creates tags: latest, stable, and commit-specific tags

      # Step 6: Build and push Docker image
      - name: Build and push Docker image
        uses: docker/build-push-action@v5
        with:
          context: ./backend              # Build context directory
          file: ./backend/Dockerfile      # Dockerfile location
          push: true                      # Push after building
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          cache-from: type=gha            # Use GitHub Actions cache
          cache-to: type=gha,mode=max     # Save cache for next build
          platforms: linux/amd64,linux/arm64  # Multi-architecture
        # Builds Docker image for both Intel and ARM processors

      # Step 7: Output image digest
      - name: Image digest
        run: echo ${{ steps.docker_build.outputs.digest }}
        # Prints unique identifier for the built image
```

**Key Concepts Explained:**

1. **GITHUB_TOKEN**: Automatically provided by GitHub Actions, no setup needed
2. **Multi-arch builds**: Creates images that work on both Intel (amd64) and ARM (arm64) processors
3. **Caching**: Speeds up subsequent builds by reusing layers
4. **Tags**: Multiple tags (latest, stable, commit-sha) for version management

### Step 1.2: Create Dockerfile

**File Location:** `backend/Dockerfile`

**Explanation:**

```dockerfile
# Multi-stage build for production
FROM node:18-alpine AS base
# Alpine is a minimal Linux distribution (5MB vs 900MB for Ubuntu)

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN if [ -f package-lock.json ]; then \
      npm ci --omit=dev; \
    else \
      npm install --omit=dev; \
    fi && npm cache clean --force
# npm ci: Clean install from lock file (faster, more reliable)
# --omit=dev: Skip development dependencies
# Clean cache to reduce image size

# Production image
FROM base AS runner
WORKDIR /app

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nodejs
# Never run containers as root for security

# Copy node_modules from deps stage
COPY --from=deps --chown=nodejs:nodejs /app/node_modules ./node_modules
# Multi-stage build: Only copy what's needed

# Copy application code
COPY --chown=nodejs:nodejs . .

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"
# Docker will automatically check if container is healthy

# Start the application
CMD ["node", "server.js"]
```

**Why Multi-stage Build?**
- **Stage 1 (deps)**: Install dependencies
- **Stage 2 (runner)**: Copy only what's needed
- **Result**: Smaller image size, faster deployments

### Step 1.3: Create .dockerignore

**File Location:** `backend/.dockerignore`

**Purpose:** Exclude unnecessary files from Docker image (like .gitignore for Docker)

```
# Don't copy these into Docker image:
node_modules     # Will be installed fresh
*.log            # Log files
.env*            # Environment secrets
.git             # Git history
*.md             # Documentation (except README)
test/            # Test files
```

### Step 1.4: Enable GitHub Actions

1. **Push your workflow file to GitHub:**
```bash
git add .github/workflows/build-and-push-backend.yml
git add backend/Dockerfile
git add backend/.dockerignore
git commit -m "Add GitHub Actions workflow for Docker build"
git push origin main
```

2. **Monitor the workflow:**
   - Go to your GitHub repository
   - Click "Actions" tab
   - You'll see your workflow running
   - Click on it to see real-time logs

3. **Verify image was pushed:**
   - Go to your repository main page
   - Look for "Packages" on the right sidebar
   - You should see your `backend` package

**What Happens Automatically:**
- Every push to `main` branch triggers the workflow
- Docker image is built with caching (faster subsequent builds)
- Image is tagged and pushed to GHCR
- You can see all versions in GitHub Packages

---

## Part 2: VPS Preparation

### Step 2.1: Install Docker

**If Docker is NOT installed:**

```bash
# Update package index
sudo apt update

# Install prerequisites
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common

# Add Docker's official GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Add Docker repository
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Start and enable Docker
sudo systemctl start docker
sudo systemctl enable docker

# Verify installation
docker --version
docker compose version
```

**Add your user to docker group (optional, but recommended):**
```bash
sudo usermod -aG docker $USER
# Log out and back in for this to take effect
```

### Step 2.2: Install Nginx

**If Nginx is NOT installed:**

```bash
# Install Nginx
sudo apt update
sudo apt install -y nginx

# Start and enable Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Verify installation
nginx -v

# Check status
sudo systemctl status nginx
```

### Step 2.3: Install Certbot (for SSL)

```bash
# Install Certbot and Nginx plugin
sudo apt update
sudo apt install -y certbot python3-certbot-nginx

# Verify installation
certbot --version
```

---

## Part 3: Deploying to VPS

### Step 3.1: Create GitHub Personal Access Token (PAT)

**Why?** To authenticate Docker on your VPS with GHCR.

1. **Go to GitHub Settings:**
   - GitHub.com → Click your profile picture → Settings
   - Scroll down to "Developer settings" (bottom left)
   - Click "Personal access tokens" → "Tokens (classic)"
   - Click "Generate new token (classic)"

2. **Configure token:**
   - **Note:** "VPS Docker Access" (or any descriptive name)
   - **Expiration:** 90 days or No expiration (for production)
   - **Scopes:** Check these boxes:
     - ✅ `read:packages` - Download packages
     - ✅ `write:packages` - Upload packages (if needed)
     - ✅ `delete:packages` - Delete packages (optional)

3. **Generate and save token:**
   - Click "Generate token"
   - **IMPORTANT:** Copy the token NOW (you can't see it again!)
   - Save it securely (password manager recommended)

### Step 3.2: Authenticate Docker with GHCR on VPS

**SSH into your VPS:**
```bash
ssh root@your-vps-ip
# or: ssh your-username@your-vps-ip
```

**Login to GHCR:**
```bash
docker login ghcr.io
```

**When prompted:**
- **Username:** Your GitHub username (e.g., `hasan-js-py-dev`)
- **Password:** Paste the PAT token you just created

**Expected output:**
```
Login Succeeded
```

**Verify authentication:**
```bash
docker pull ghcr.io/your-username/your-repo/backend:latest
# Should start downloading the image
```

### Step 3.3: Create Project Directory Structure

```bash
# Create project directory
mkdir -p ~/daddy-leads-backend
cd ~/daddy-leads-backend

# Verify you're in the right place
pwd
# Output: /root/daddy-leads-backend (or /home/username/daddy-leads-backend)
```

### Step 3.4: Create Environment Variables File

**Create .env file:**
```bash
nano .env
```

**Add your configuration:**
```bash
# Server Configuration
PORT=5000
NODE_ENV=production
API_VERSION=v1

# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority

# JWT Configuration (CHANGE THESE IN PRODUCTION!)
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
JWT_EXPIRES_IN=7d

# Session Configuration (CHANGE THIS IN PRODUCTION!)
SESSION_SECRET=your-super-secret-session-key-min-32-chars

# Frontend URLs (CORS)
FRONTEND_URL=https://daddy-leads.com,https://app.daddy-leads.com
FRONTEND_URL_DEV=http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Credits Configuration
DEFAULT_LEADS_FINDER_CREDITS=0
DEFAULT_DATA_SCRAPER_CREDITS=0
```

**Save and exit:**
- Press `Ctrl + X`
- Press `Y` to confirm
- Press `Enter` to save

**Important Notes:**
- ⚠️ **Never commit .env to Git**
- ⚠️ **Change JWT_SECRET and SESSION_SECRET** (use random strings)
- ⚠️ **Update MONGODB_URI** with your actual MongoDB connection string
- ⚠️ **Update FRONTEND_URL** with your actual domain

**Generate secure secrets (recommended):**
```bash
# Generate JWT_SECRET
openssl rand -base64 64

# Generate SESSION_SECRET
openssl rand -base64 64
```

### Step 3.5: Create docker-compose.yml

**Create the file:**
```bash
nano docker-compose.yml
```

**Add configuration:**
```yaml
version: '3.8'

services:
  backend:
    # Docker image from GHCR
    image: ghcr.io/hasan-js-py-dev/alhamdualliah_sass_frontend_daddy_leads/backend:latest
    
    # Container name (easier to reference)
    container_name: daddy-leads-backend
    
    # Restart policy (auto-restart if crashes)
    restart: unless-stopped
    
    # Load environment variables from .env file
    env_file: .env
    
    # Port mapping: host:container
    ports:
      - "${PORT:-5000}:5000"
    # Maps VPS port 5000 to container port 5000
    # Uses PORT from .env, defaults to 5000
    
    # Additional environment variables
    environment:
      - NODE_ENV=production
    
    # Health check configuration
    healthcheck:
      test: ["CMD", "node", "-e", "require('http').get('http://localhost:5000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"]
      interval: 30s    # Check every 30 seconds
      timeout: 3s      # Timeout after 3 seconds
      start_period: 5s # Grace period on startup
      retries: 3       # Mark unhealthy after 3 failures
    # Docker will monitor /health endpoint
    
    # Network configuration
    networks:
      - backend-network

# Define networks
networks:
  backend-network:
    driver: bridge
    # Creates isolated network for containers
```

**Save and exit** (`Ctrl + X`, `Y`, `Enter`)

**Configuration Explained:**

1. **image:** Points to your GHCR image (auto-updated format)
2. **restart: unless-stopped:** Container restarts automatically if it crashes
3. **env_file:** Loads environment variables from .env
4. **ports:** Exposes container port to VPS
5. **healthcheck:** Docker monitors application health
6. **networks:** Isolates container networking

### Step 3.6: Deploy the Container

**Pull the latest image:**
```bash
docker compose pull
```
**What it does:** Downloads the latest image from GHCR

**Start the container:**
```bash
docker compose up -d
```
**Flags explained:**
- `-d`: Detached mode (runs in background)

**Expected output:**
```
[+] Running 2/2
 ✔ Network daddy-leads-backend_backend-network  Created
 ✔ Container daddy-leads-backend                Started
```

### Step 3.7: Verify Deployment

**Check container status:**
```bash
docker compose ps
```

**Expected output:**
```
NAME                  IMAGE                                    STATUS
daddy-leads-backend   ghcr.io/.../backend:latest              Up 10 seconds (healthy)
```

**View real-time logs:**
```bash
docker compose logs -f
```
**Flags explained:**
- `-f`: Follow mode (like `tail -f`)

**Expected logs:**
```
daddy-leads-backend  | ✅ MongoDB Connected Successfully
daddy-leads-backend  | 📊 Database: apurbohasan627_db_user
daddy-leads-backend  | 🚀 Daddy Leads API Server
daddy-leads-backend  | 📡 Environment: production
daddy-leads-backend  | 🌐 Server running on port: 5000
```

**Test the API locally on VPS:**
```bash
curl http://localhost:5000/health
```

**Expected response:**
```json
{"status":"ok"}
```

**If you see errors:**
- Check logs: `docker compose logs`
- Check .env file: `cat .env`
- Verify MongoDB connection string
- Ensure all required environment variables are set

---

## Part 4: Nginx Configuration

### Step 4.1: Understand Nginx's Role

**What is Nginx doing?**
- Acts as a **reverse proxy** (forwards requests to Docker container)
- Handles **SSL/TLS termination** (HTTPS encryption)
- Provides **load balancing** capabilities (if scaling horizontally)
- Adds **security headers** and **rate limiting**

**Request Flow:**
```
Internet → Domain (api.daddy-leads.com) → Nginx (port 80/443) → Docker Container (port 5000)
```

### Step 4.2: Configure DNS (Before Nginx)

**IMPORTANT:** Do this BEFORE configuring Nginx!

1. **Go to your domain registrar** (Namecheap, GoDaddy, Cloudflare, etc.)
2. **Add an A record:**
   - **Type:** A
   - **Name:** `api` (or `@` for root domain)
   - **Value:** Your VPS IP address
   - **TTL:** 300 (5 minutes) or Auto

3. **Verify DNS propagation:**
```bash
# On your local machine or VPS
nslookup api.daddy-leads.com
# or
dig api.daddy-leads.com
```

**Wait for DNS to propagate** (usually 5-30 minutes, can take up to 48 hours)

### Step 4.3: Create Nginx Configuration

**Create site configuration:**
```bash
sudo nano /etc/nginx/sites-available/daddy-leads-api
```

**Add configuration:**
```nginx
# HTTP to HTTPS redirect (added automatically by Certbot later)
server {
    listen 80;
    listen [::]:80;
    server_name api.daddy-leads.com;
    
    # Root location (will be used by Certbot for verification)
    location / {
        proxy_pass http://localhost:5000;
        
        # Proxy headers
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # WebSocket support (if needed)
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_cache_bypass $http_upgrade;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}
```

**Configuration Explained:**

1. **listen 80:** Listen on HTTP port
2. **server_name:** Your domain
3. **proxy_pass:** Forward requests to Docker container
4. **proxy_set_header:**
   - `Host`: Preserve original host header
   - `X-Real-IP`: Client's real IP address
   - `X-Forwarded-For`: Proxy chain
   - `X-Forwarded-Proto`: Original protocol (http/https)
5. **Timeouts:** Prevent hanging connections

**Save and exit** (`Ctrl + X`, `Y`, `Enter`)

### Step 4.4: Enable the Site

**Create symbolic link:**
```bash
sudo ln -s /etc/nginx/sites-available/daddy-leads-api /etc/nginx/sites-enabled/
```

**What this does:**
- Nginx reads configs from `sites-enabled`
- We create a link from `sites-available` to `sites-enabled`
- This allows us to enable/disable sites easily

**Verify symbolic link:**
```bash
ls -la /etc/nginx/sites-enabled/
```

### Step 4.5: Test and Reload Nginx

**Test configuration for syntax errors:**
```bash
sudo nginx -t
```

**Expected output:**
```
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

**If syntax errors:**
- Check your configuration file
- Look for typos or missing semicolons
- Verify file paths

**Reload Nginx:**
```bash
sudo systemctl reload nginx
```

**Check Nginx status:**
```bash
sudo systemctl status nginx
```

**Test HTTP access:**
```bash
curl http://api.daddy-leads.com/health
```

**Expected response:**
```json
{"status":"ok"}
```

---

## Part 5: SSL Setup

### Step 5.1: Understand SSL/TLS

**Why SSL?**
- ✅ Encrypts data in transit (HTTPS)
- ✅ Required for production APIs
- ✅ Improves SEO and trust
- ✅ Prevents man-in-the-middle attacks

**Let's Encrypt:**
- Free SSL certificates
- Auto-renewal
- Trusted by all browsers

### Step 5.2: Install SSL Certificate with Certbot

**Run Certbot:**
```bash
sudo certbot --nginx -d api.daddy-leads.com
```

**Flags explained:**
- `--nginx`: Use Nginx plugin (auto-configures Nginx)
- `-d`: Domain name

**Interactive prompts:**

1. **Email address:**
   - Enter your email (for renewal notifications)
   - Example: `admin@daddy-leads.com`

2. **Terms of Service:**
   - Type `Y` and press Enter (agree to terms)

3. **Share email with EFF:**
   - Type `N` (optional, but recommended to decline)

4. **HTTP to HTTPS redirect:**
   - **Option 1:** No redirect (not recommended)
   - **Option 2:** Redirect all HTTP to HTTPS ✅
   - Type `2` and press Enter

**Expected output:**
```
Successfully received certificate.
Certificate is saved at: /etc/letsencrypt/live/api.daddy-leads.com/fullchain.pem
Key is saved at: /etc/letsencrypt/live/api.daddy-leads.com/privkey.pem
Congratulations! You have successfully enabled HTTPS on https://api.daddy-leads.com
```

### Step 5.3: Verify SSL Configuration

**Test HTTPS:**
```bash
curl https://api.daddy-leads.com/health
```

**Expected response:**
```json
{"status":"ok"}
```

**Test in browser:**
- Open: `https://api.daddy-leads.com/health`
- You should see a padlock icon 🔒

**Check SSL certificate:**
```bash
sudo certbot certificates
```

**View Nginx configuration (updated by Certbot):**
```bash
sudo cat /etc/nginx/sites-available/daddy-leads-api
```

**You'll see Certbot added:**
- HTTPS listener on port 443
- SSL certificate paths
- HTTP to HTTPS redirect
- SSL configuration

### Step 5.4: Configure Auto-Renewal

**Certbot auto-renewal timer:**
```bash
# Check if timer is active
sudo systemctl status certbot.timer

# Test renewal (dry run)
sudo certbot renew --dry-run
```

**Expected output:**
```
Congratulations, all simulated renewals succeeded
```

**How auto-renewal works:**
- Certbot creates a systemd timer
- Runs twice daily
- Automatically renews certificates within 30 days of expiry
- Reloads Nginx after renewal

**Manual renewal (if needed):**
```bash
sudo certbot renew
```

---

## Part 6: Monitoring & Maintenance

### Step 6.1: Container Management

**View running containers:**
```bash
docker compose ps
```

**View logs (last 100 lines):**
```bash
docker compose logs --tail=100
```

**Follow logs in real-time:**
```bash
docker compose logs -f
```

**Restart container:**
```bash
docker compose restart
```

**Stop container:**
```bash
docker compose stop
```

**Start container:**
```bash
docker compose start
```

**Stop and remove container:**
```bash
docker compose down
```

**Rebuild and restart:**
```bash
docker compose pull    # Pull latest image
docker compose up -d   # Recreate container
```

### Step 6.2: Update Deployment

**When you push new code to GitHub:**

1. **GitHub Actions automatically builds new image**
   - Check Actions tab on GitHub
   - Wait for build to complete

2. **SSH into VPS:**
```bash
ssh root@your-vps-ip
cd ~/daddy-leads-backend
```

3. **Pull latest image:**
```bash
docker compose pull
```

4. **Recreate container with new image:**
```bash
docker compose up -d
```

5. **Verify deployment:**
```bash
docker compose logs -f
```

**One-liner update script:**
```bash
cd ~/daddy-leads-backend && docker compose pull && docker compose up -d && docker compose logs --tail=50
```

### Step 6.3: Automated Update Script (Optional)

**Create update script:**
```bash
nano ~/update-backend.sh
```

**Add script content:**
```bash
#!/bin/bash

echo "🔄 Starting backend update..."

# Navigate to project directory
cd ~/daddy-leads-backend || exit 1

# Pull latest image
echo "📥 Pulling latest image from GHCR..."
docker compose pull

# Recreate container
echo "🔄 Recreating container..."
docker compose up -d

# Wait for health check
echo "⏳ Waiting for container to be healthy..."
sleep 10

# Check status
if docker compose ps | grep -q "healthy"; then
    echo "✅ Backend updated successfully!"
    docker compose logs --tail=20
else
    echo "❌ Backend update failed!"
    docker compose logs --tail=50
    exit 1
fi
```

**Make executable:**
```bash
chmod +x ~/update-backend.sh
```

**Run update:**
```bash
~/update-backend.sh
```

### Step 6.4: Monitoring Commands

**Check container health:**
```bash
docker inspect daddy-leads-backend --format='{{.State.Health.Status}}'
```

**Check container resource usage:**
```bash
docker stats daddy-leads-backend
```

**Check disk usage:**
```bash
docker system df
```

**Clean up unused images:**
```bash
docker image prune -a
```

**Check Nginx status:**
```bash
sudo systemctl status nginx
```

**Check Nginx error logs:**
```bash
sudo tail -f /var/log/nginx/error.log
```

**Check Nginx access logs:**
```bash
sudo tail -f /var/log/nginx/access.log
```

### Step 6.5: Backup Strategy

**Backup .env file:**
```bash
cp ~/daddy-leads-backend/.env ~/daddy-leads-backend/.env.backup
```

**Backup docker-compose.yml:**
```bash
cp ~/daddy-leads-backend/docker-compose.yml ~/daddy-leads-backend/docker-compose.yml.backup
```

**Backup Nginx configuration:**
```bash
sudo cp /etc/nginx/sites-available/daddy-leads-api /etc/nginx/sites-available/daddy-leads-api.backup
```

**Backup database (if MongoDB is on VPS):**
```bash
mongodump --uri="mongodb://localhost:27017/database" --out=~/mongodb-backup-$(date +%Y%m%d)
```

---

## Part 7: Troubleshooting

### Issue 1: Container Won't Start

**Check logs:**
```bash
docker compose logs
```

**Common causes:**
- ❌ Invalid .env configuration
- ❌ MongoDB connection failed
- ❌ Port already in use
- ❌ Missing environment variables

**Solutions:**
```bash
# Check .env file
cat .env

# Test MongoDB connection (from container)
docker compose exec backend node -e "require('./config/database')"

# Check if port is in use
sudo lsof -i :5000

# Kill process using port
sudo kill -9 $(sudo lsof -t -i:5000)
```

### Issue 2: Nginx Not Proxying

**Test Nginx configuration:**
```bash
sudo nginx -t
```

**Check Nginx logs:**
```bash
sudo tail -f /var/log/nginx/error.log
```

**Verify container is running:**
```bash
docker compose ps
```

**Test container directly:**
```bash
curl http://localhost:5000/health
```

**Common causes:**
- ❌ Container not running
- ❌ Wrong proxy_pass port
- ❌ DNS not pointing to server
- ❌ Firewall blocking traffic

**Solutions:**
```bash
# Restart Nginx
sudo systemctl restart nginx

# Check firewall
sudo ufw status

# Allow HTTP/HTTPS
sudo ufw allow 'Nginx Full'
```

### Issue 3: SSL Certificate Issues

**Test certificate:**
```bash
sudo certbot certificates
```

**Common causes:**
- ❌ DNS not pointing to server
- ❌ Port 80/443 blocked
- ❌ Domain not accessible

**Solutions:**
```bash
# Renew certificate manually
sudo certbot renew --force-renewal

# Check DNS
nslookup api.daddy-leads.com

# Check if port 80 is accessible
curl http://api.daddy-leads.com
```

### Issue 4: Can't Pull Image from GHCR

**Check Docker login:**
```bash
docker login ghcr.io
```

**Verify image exists:**
- Go to GitHub → Your repo → Packages
- Check if `backend` package exists

**Common causes:**
- ❌ Not logged in to GHCR
- ❌ PAT token expired
- ❌ Wrong image name
- ❌ Package is private and user doesn't have access

**Solutions:**
```bash
# Re-login with new PAT
docker logout ghcr.io
docker login ghcr.io

# Use full image name
docker pull ghcr.io/username/repo/backend:latest
```

### Issue 5: MongoDB Connection Failed

**Check MongoDB URI in .env:**
```bash
cat .env | grep MONGODB_URI
```

**Test connection from VPS:**
```bash
curl -I https://your-mongodb-uri
```

**Common causes:**
- ❌ Incorrect connection string
- ❌ MongoDB Atlas IP whitelist
- ❌ Network issues
- ❌ Invalid credentials

**Solutions:**
- Add VPS IP to MongoDB Atlas whitelist (or allow 0.0.0.0/0)
- Verify username/password
- Check network connectivity

### Issue 6: High Memory Usage

**Check resource usage:**
```bash
docker stats daddy-leads-backend
```

**Common causes:**
- ❌ Memory leak in application
- ❌ Too many connections
- ❌ Large logs

**Solutions:**
```bash
# Restart container
docker compose restart

# Limit container memory
# Add to docker-compose.yml:
deploy:
  resources:
    limits:
      memory: 512M

# Clean up logs
docker compose logs --tail=0 > /dev/null
```

### Issue 7: Container Keeps Restarting

**Check restart count:**
```bash
docker compose ps
```

**Check logs for errors:**
```bash
docker compose logs --tail=100
```

**Common causes:**
- ❌ Application crashing
- ❌ Health check failing
- ❌ Environment variables missing

**Solutions:**
```bash
# Remove container and recreate
docker compose down
docker compose up -d

# Check health check endpoint
curl http://localhost:5000/health

# Disable health check temporarily (add to docker-compose.yml):
healthcheck:
  disable: true
```

---

## Summary Checklist

### Initial Setup:
- [ ] Create GitHub Actions workflow file
- [ ] Create Dockerfile
- [ ] Create .dockerignore
- [ ] Push to GitHub and verify Actions run
- [ ] Verify image appears in GitHub Packages

### VPS Setup:
- [ ] Install Docker
- [ ] Install Nginx
- [ ] Install Certbot
- [ ] Create GitHub PAT
- [ ] Login to GHCR on VPS
- [ ] Create project directory
- [ ] Create .env file with all required variables
- [ ] Create docker-compose.yml

### Deployment:
- [ ] Pull Docker image
- [ ] Start container with docker-compose
- [ ] Verify container is running and healthy
- [ ] Test API locally on VPS

### Domain & SSL:
- [ ] Configure DNS A record
- [ ] Wait for DNS propagation
- [ ] Create Nginx configuration
- [ ] Enable site in Nginx
- [ ] Test Nginx configuration
- [ ] Run Certbot for SSL
- [ ] Verify HTTPS works
- [ ] Test auto-renewal

### Maintenance:
- [ ] Set up update script
- [ ] Configure monitoring
- [ ] Set up backups
- [ ] Document custom configurations

---

## Quick Reference Commands

```bash
# Container Management
docker compose ps                    # List containers
docker compose logs -f               # Follow logs
docker compose restart               # Restart container
docker compose pull && docker compose up -d  # Update

# Nginx Management
sudo nginx -t                        # Test configuration
sudo systemctl reload nginx          # Reload Nginx
sudo systemctl restart nginx         # Restart Nginx
sudo tail -f /var/log/nginx/error.log # View error logs

# SSL Management
sudo certbot certificates            # List certificates
sudo certbot renew --dry-run        # Test renewal
sudo certbot renew                   # Force renewal

# System Monitoring
docker stats                         # Resource usage
df -h                               # Disk space
free -h                             # Memory usage
htop                                # Process monitor
```

---

## Additional Resources

- **Docker Documentation:** https://docs.docker.com
- **Docker Compose:** https://docs.docker.com/compose
- **Nginx Documentation:** https://nginx.org/en/docs
- **Let's Encrypt:** https://letsencrypt.org/docs
- **GitHub Actions:** https://docs.github.com/en/actions
- **GitHub Container Registry:** https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry

---

**Document Version:** 1.0  
**Last Updated:** 2025  
**Author:** Backend DevOps Team  
**License:** MIT  

---

*This guide is maintained as a living document. Please update it as the deployment process evolves.*
