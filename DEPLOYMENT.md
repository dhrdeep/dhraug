# DHR Deep House Radio - Deployment Guide

This guide will help you migrate your DHR application from Replit to other hosting platforms.

## Prerequisites

- Node.js 20+ installed locally
- A PostgreSQL database (Neon, Supabase, Railway, etc.)
- Patreon OAuth credentials
- Git repository with your code

## Environment Variables

Create a `.env` file in your project root with the following variables:

```bash
# Database Configuration
DATABASE_URL=postgresql://username:password@host:port/database

# Patreon OAuth Configuration (Server-side)
PATREON_CLIENT_ID=your_patreon_client_id
PATREON_CLIENT_SECRET=your_patreon_client_secret

# Patreon OAuth Configuration (Client-side)
VITE_PATREON_CLIENT_ID=your_patreon_client_id
VITE_PATREON_CLIENT_SECRET=your_patreon_client_secret
VITE_PATREON_REDIRECT_URI=https://yourdomain.com/patreon-callback

# Server Configuration
PORT=5000
NODE_ENV=production

# Session Configuration (for production, use a secure secret)
SESSION_SECRET=your_session_secret_here
```

## Database Setup

1. **Create a PostgreSQL database** on your preferred provider:
   - [Neon](https://neon.tech) (recommended - same as Replit)
   - [Supabase](https://supabase.com)
   - [Railway](https://railway.app)
   - [Render](https://render.com)

2. **Run database migrations**:
   ```bash
   npm run db:push
   ```

## Deployment Options

### Option 1: DigitalOcean App Platform (Recommended)
1. **Connect your GitHub repository** to DigitalOcean
2. **Create a new App** in DigitalOcean dashboard
3. **Configure the app**:
   - Build Command: `npm run build`
   - Start Command: `node dist/index.js`
   - Environment: Node.js
4. **Add environment variables** in the DigitalOcean dashboard
5. **Update Patreon OAuth redirect URI** to match your app URL

**📖 For detailed DigitalOcean deployment instructions, see [DIGITALOCEAN_DEPLOYMENT.md](DIGITALOCEAN_DEPLOYMENT.md)**

### Option 2: Railway

1. **Install Railway CLI**:
   ```bash
   npm install -g @railway/cli
   ```

2. **Login to Railway**:
   ```bash
   railway login
   ```

3. **Initialize and deploy**:
   ```bash
   railway init
   railway up
   ```

4. **Set environment variables**:
   ```bash
   railway variables set DATABASE_URL=your_database_url
   railway variables set PATREON_CLIENT_ID=your_patreon_client_id
   # ... set all other variables
   ```

### Option 3: Render

1. **Connect your GitHub repository** to Render
2. **Create a new Web Service**
3. **Configure the service**:
   - Build Command: `npm run build`
   - Start Command: `node dist/index.js`
   - Environment: Node
4. **Add environment variables** in the Render dashboard

### Option 4: Vercel

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel --prod
   ```

3. **Set environment variables** in the Vercel dashboard

### Option 5: Heroku

1. **Install Heroku CLI**:
   ```bash
   npm install -g heroku
   ```

2. **Create Heroku app**:
   ```bash
   heroku create your-app-name
   ```

3. **Add PostgreSQL addon**:
   ```bash
   heroku addons:create heroku-postgresql:mini
   ```

4. **Set environment variables**:
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set PATREON_CLIENT_ID=your_patreon_client_id
   # ... set all other variables
   ```

5. **Deploy**:
   ```bash
   git push heroku main
   ```

## Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables** (copy from `env.example`)

3. **Start development server**:
   ```bash
   npm run dev
   ```

## Build and Test Locally

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Start production server**:
   ```bash
   npm start
   ```

## Important Notes

### Patreon OAuth Redirect URI
When migrating from Replit, you'll need to update your Patreon OAuth redirect URI:
1. Go to your Patreon Developer Dashboard
2. Update the redirect URI to match your new domain
3. Update the `VITE_PATREON_REDIRECT_URI` environment variable

### Database Migration
- Your existing Neon database can be used with the new deployment
- Ensure the `DATABASE_URL` environment variable points to your database
- Run `npm run db:push` to ensure schema is up to date

### File Uploads
- The `attached_assets` folder contains uploaded files
- Consider moving these to a cloud storage service (AWS S3, Cloudinary, etc.)
- Update the file upload logic to use cloud storage

### SSL/HTTPS
- Most hosting platforms provide SSL certificates automatically
- Ensure your Patreon OAuth redirect URI uses HTTPS

## Troubleshooting

### Common Issues

1. **Port binding errors**: Ensure the `PORT` environment variable is set correctly
2. **Database connection issues**: Verify `DATABASE_URL` is correct and accessible
3. **Patreon OAuth errors**: Check redirect URI matches exactly
4. **Build failures**: Ensure all dependencies are in `package.json`

### Logs
- Check your hosting platform's logs for detailed error information
- Use `console.log` or proper logging for debugging

## Support

For issues specific to your hosting platform, refer to their documentation:
- [DigitalOcean App Platform Docs](https://docs.digitalocean.com/products/app-platform/)
- [Railway Docs](https://docs.railway.app)
- [Render Docs](https://render.com/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Heroku Docs](https://devcenter.heroku.com)
