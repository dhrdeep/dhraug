# DigitalOcean App Platform Deployment Guide

This guide will walk you through deploying your DHR Deep House Radio application to DigitalOcean App Platform.

## Prerequisites

- DigitalOcean account
- GitHub repository with your code
- PostgreSQL database (Neon, DigitalOcean Managed Database, etc.)
- Patreon OAuth credentials

## Step 1: Prepare Your Repository

1. **Push your code to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Prepare for DigitalOcean deployment"
   git push origin main
   ```

2. **Update the repository URL** in `.do/app.yaml`:
   ```yaml
   github:
     repo: yourusername/dhr-deep-house-radio  # Replace with your actual repo
     branch: main
   ```

## Step 2: Set Up Database

### Option A: Use Your Existing Neon Database
- Keep your current Neon PostgreSQL database
- Copy the `DATABASE_URL` for later use

### Option B: Create DigitalOcean Managed Database
1. Go to DigitalOcean Dashboard → Databases
2. Create a new PostgreSQL cluster
3. Choose your preferred region
4. Select a plan (Basic plan is sufficient to start)
5. Note the connection string

## Step 3: Deploy to DigitalOcean App Platform

### Method 1: Using DigitalOcean Dashboard (Recommended)

1. **Log in to DigitalOcean Dashboard**
   - Go to [cloud.digitalocean.com](https://cloud.digitalocean.com)
   - Sign in to your account

2. **Create New App**
   - Click "Create" → "Apps"
   - Choose "GitHub" as source
   - Connect your GitHub account if not already connected
   - Select your `dhr-deep-house-radio` repository
   - Choose the `main` branch

3. **Configure App Settings**
   - **App Name**: `dhr-deep-house-radio`
   - **Region**: Choose closest to your users
   - **Build Command**: `npm run build`
   - **Run Command**: `node dist/index.js`
   - **Environment**: Node.js

4. **Set Environment Variables**
   Click "Edit" next to Environment Variables and add:
   ```
   NODE_ENV=production
   DATABASE_URL=your_database_connection_string
   PATREON_CLIENT_ID=your_patreon_client_id
   PATREON_CLIENT_SECRET=your_patreon_client_secret
   VITE_PATREON_CLIENT_ID=your_patreon_client_id
   VITE_PATREON_CLIENT_SECRET=your_patreon_client_secret
   VITE_PATREON_REDIRECT_URI=https://your-app-name.ondigitalocean.app/patreon-callback
   SESSION_SECRET=your_secure_session_secret
   ```

5. **Deploy**
   - Click "Create Resources"
   - Wait for build and deployment to complete

### Method 2: Using doctl CLI

1. **Install doctl CLI**:
   ```bash
   # macOS
   brew install doctl
   
   # Linux
   snap install doctl
   
   # Windows
   # Download from https://github.com/digitalocean/doctl/releases
   ```

2. **Authenticate**:
   ```bash
   doctl auth init
   ```

3. **Deploy**:
   ```bash
   doctl apps create --spec .do/app.yaml
   ```

## Step 4: Update Patreon OAuth Configuration

1. **Get your app URL** from DigitalOcean dashboard
   - It will be something like: `https://dhr-deep-house-radio-abc123.ondigitalocean.app`

2. **Update Patreon Developer Dashboard**:
   - Go to [Patreon Developer Dashboard](https://www.patreon.com/portal/registration/register-clients)
   - Find your app
   - Update the redirect URI to: `https://your-app-name.ondigitalocean.app/patreon-callback`

3. **Update Environment Variable**:
   - In DigitalOcean dashboard, update `VITE_PATREON_REDIRECT_URI`
   - Set it to your new redirect URI

## Step 5: Configure Custom Domain (Optional)

1. **Add Custom Domain**:
   - In your app dashboard, go to "Settings" → "Domains"
   - Click "Add Domain"
   - Enter your domain (e.g., `dhr.yourdomain.com`)

2. **Configure DNS**:
   - Add a CNAME record pointing to your app URL
   - Or add an A record if you have a static IP

3. **Update Patreon Redirect URI**:
   - Update the redirect URI to use your custom domain
   - Update the environment variable in DigitalOcean

## Step 6: Verify Deployment

1. **Test the Application**:
   - Visit your app URL
   - Test all major features:
     - Home page loads
     - Patreon OAuth flow
     - Database connections
     - API endpoints

2. **Check Logs**:
   - In DigitalOcean dashboard, go to "Runtime Logs"
   - Look for any errors or warnings

3. **Monitor Performance**:
   - Check "Metrics" tab for performance data
   - Monitor database connections

## Step 7: Database Migration

1. **Run Database Migration**:
   ```bash
   # You can run this locally with the production DATABASE_URL
   npm run db:push
   ```

2. **Verify Data**:
   - Check that your existing data is preserved
   - Test user authentication

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment setting | `production` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:port/db` |
| `PATREON_CLIENT_ID` | Patreon OAuth client ID | `abc123...` |
| `PATREON_CLIENT_SECRET` | Patreon OAuth client secret | `xyz789...` |
| `VITE_PATREON_CLIENT_ID` | Frontend Patreon client ID | `abc123...` |
| `VITE_PATREON_CLIENT_SECRET` | Frontend Patreon client secret | `xyz789...` |
| `VITE_PATREON_REDIRECT_URI` | OAuth redirect URI | `https://app.ondigitalocean.app/patreon-callback` |
| `SESSION_SECRET` | Express session secret | `random-secret-string` |

## Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check build logs in DigitalOcean dashboard
   - Ensure all dependencies are in `package.json`
   - Verify Node.js version compatibility

2. **Database Connection Issues**:
   - Verify `DATABASE_URL` is correct
   - Check if database allows connections from DigitalOcean IPs
   - Ensure database is running and accessible

3. **OAuth Errors**:
   - Verify redirect URI matches exactly
   - Check Patreon app configuration
   - Ensure HTTPS is used for redirect URI

4. **Port Issues**:
   - DigitalOcean App Platform automatically handles port configuration
   - Ensure your app listens on the port specified by `PORT` environment variable

### Getting Help

- **DigitalOcean Documentation**: [App Platform Docs](https://docs.digitalocean.com/products/app-platform/)
- **Community**: [DigitalOcean Community](https://www.digitalocean.com/community)
- **Support**: Contact DigitalOcean support if needed

## Cost Optimization

- **Start with Basic Plan**: `basic-xxs` is sufficient for testing
- **Scale as needed**: Upgrade instance size based on traffic
- **Database**: Consider DigitalOcean Managed Database for better integration
- **Monitoring**: Use DigitalOcean's built-in monitoring tools

## Security Best Practices

1. **Environment Variables**: All secrets are stored as environment variables
2. **HTTPS**: Automatically enabled by DigitalOcean
3. **Database**: Use connection pooling and secure connections
4. **Sessions**: Use secure session configuration
5. **OAuth**: Implement proper state validation

## Next Steps

After successful deployment:

1. **Set up monitoring** and alerts
2. **Configure backups** for your database
3. **Set up CI/CD** for automatic deployments
4. **Optimize performance** based on usage patterns
5. **Scale resources** as your user base grows
