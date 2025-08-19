# DHR Deployment Checklist

## Pre-Deployment Checklist

### ✅ Environment Setup
- [ ] Create `.env` file with all required variables
- [ ] Update `VITE_PATREON_REDIRECT_URI` to match new domain
- [ ] Set `SESSION_SECRET` to a secure random string
- [ ] Verify `DATABASE_URL` points to your PostgreSQL database

### ✅ Database Setup
- [ ] Ensure PostgreSQL database is running and accessible
- [ ] Run `npm run db:push` to sync database schema
- [ ] Verify existing data is preserved (if migrating from Replit)

### ✅ Code Preparation
- [ ] Remove Replit-specific dependencies (completed)
- [ ] Update server port configuration (completed)
- [ ] Test build process locally: `npm run build`
- [ ] Test production server locally: `npm start`

### ✅ Patreon Configuration
- [ ] Update Patreon OAuth redirect URI in Patreon Developer Dashboard
- [ ] Verify OAuth credentials are correct
- [ ] Test OAuth flow locally

## Platform-Specific Checklist

### Railway
- [ ] Install Railway CLI: `npm install -g @railway/cli`
- [ ] Login: `railway login`
- [ ] Initialize project: `railway init`
- [ ] Set environment variables: `railway variables set KEY=value`
- [ ] Deploy: `railway up`

### Render
- [ ] Connect GitHub repository to Render
- [ ] Create new Web Service
- [ ] Set build command: `npm run build`
- [ ] Set start command: `node dist/index.js`
- [ ] Add all environment variables in dashboard
- [ ] Deploy

### Vercel
- [ ] Install Vercel CLI: `npm install -g vercel`
- [ ] Login: `vercel login`
- [ ] Deploy: `vercel --prod`
- [ ] Set environment variables in Vercel dashboard

### Heroku
- [ ] Install Heroku CLI: `npm install -g heroku`
- [ ] Login: `heroku login`
- [ ] Create app: `heroku create your-app-name`
- [ ] Add PostgreSQL: `heroku addons:create heroku-postgresql:mini`
- [ ] Set environment variables: `heroku config:set KEY=value`
- [ ] Deploy: `git push heroku main`

### DigitalOcean App Platform
- [ ] Connect GitHub repository to DigitalOcean
- [ ] Create new App in DigitalOcean dashboard
- [ ] Configure app settings:
- [ ]   - Build Command: `npm run build`
- [ ]   - Run Command: `node dist/index.js`
- [ ]   - Environment: Node.js
- [ ] Add all environment variables in DigitalOcean dashboard
- [ ] Update Patreon OAuth redirect URI to match your app URL
- [ ] Configure custom domain (optional)
- [ ] Set up DigitalOcean Managed Database (optional)

## Post-Deployment Checklist

### ✅ Verification
- [ ] Test application loads correctly
- [ ] Verify Patreon OAuth flow works
- [ ] Test database connections
- [ ] Check all API endpoints respond correctly
- [ ] Verify file uploads work (if applicable)

### ✅ Security
- [ ] Ensure HTTPS is enabled
- [ ] Verify environment variables are not exposed
- [ ] Check session configuration is secure
- [ ] Test authentication flows

### ✅ Performance
- [ ] Monitor application performance
- [ ] Check database query performance
- [ ] Verify static assets are served correctly
- [ ] Test under load if possible

### ✅ Monitoring
- [ ] Set up error monitoring (Sentry, etc.)
- [ ] Configure logging
- [ ] Set up uptime monitoring
- [ ] Monitor database connections

## Troubleshooting

### Common Issues
- **Port binding errors**: Check `PORT` environment variable
- **Database connection**: Verify `DATABASE_URL` and network access
- **OAuth errors**: Check redirect URI matches exactly
- **Build failures**: Ensure all dependencies are installed

### Validation Script
Run the validation script to check your setup:
```bash
npm run migrate:validate
```

## Support Resources

- [Railway Docs](https://docs.railway.app)
- [Render Docs](https://render.com/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Heroku Docs](https://devcenter.heroku.com)
- [DigitalOcean App Platform Docs](https://docs.digitalocean.com/products/app-platform/)
- [Neon Database Docs](https://neon.tech/docs)
- [Patreon API Docs](https://docs.patreon.com)

## Emergency Rollback

If deployment fails:
1. Keep your Replit instance running as backup
2. Document any issues encountered
3. Check platform-specific logs for errors
4. Consider rolling back to previous deployment
5. Test locally before re-deploying
