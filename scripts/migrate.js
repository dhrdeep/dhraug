#!/usr/bin/env node

import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { Pool } from '@neondatabase/serverless';
import { sql } from 'drizzle-orm';

// Load environment variables
config();

async function validateEnvironment() {
  console.log('🔍 Validating environment variables...');
  
  const requiredVars = [
    'DATABASE_URL',
    'PATREON_CLIENT_ID',
    'PATREON_CLIENT_SECRET',
    'VITE_PATREON_CLIENT_ID',
    'VITE_PATREON_CLIENT_SECRET',
    'VITE_PATREON_REDIRECT_URI'
  ];

  const missing = [];
  
  for (const varName of requiredVars) {
    if (!process.env[varName]) {
      missing.push(varName);
    }
  }

  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:');
    missing.forEach(varName => console.error(`   - ${varName}`));
    console.error('\nPlease check your .env file or environment configuration.');
    process.exit(1);
  }

  console.log('✅ All required environment variables are set');
}

async function testDatabaseConnection() {
  console.log('\n🔍 Testing database connection...');
  
  try {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    
    // Test a simple query
    await pool.query('SELECT 1');
    console.log('✅ Database connection successful');
    
    await pool.end();
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1);
  }
}

async function validatePatreonConfig() {
  console.log('\n🔍 Validating Patreon configuration...');
  
  const clientId = process.env.PATREON_CLIENT_ID;
  const clientSecret = process.env.PATREON_CLIENT_SECRET;
  const redirectUri = process.env.VITE_PATREON_REDIRECT_URI;
  
  if (!clientId || clientId === 'your_patreon_client_id') {
    console.error('❌ PATREON_CLIENT_ID is not properly configured');
    process.exit(1);
  }
  
  if (!clientSecret || clientSecret === 'your_patreon_client_secret') {
    console.error('❌ PATREON_CLIENT_SECRET is not properly configured');
    process.exit(1);
  }
  
  if (!redirectUri || redirectUri.includes('yourdomain.com')) {
    console.error('❌ VITE_PATREON_REDIRECT_URI is not properly configured');
    process.exit(1);
  }
  
  console.log('✅ Patreon configuration looks good');
  console.log(`   Redirect URI: ${redirectUri}`);
}

async function main() {
  console.log('🚀 DHR Migration Validation Script\n');
  
  try {
    await validateEnvironment();
    await testDatabaseConnection();
    await validatePatreonConfig();
    
    console.log('\n🎉 All validations passed! Your application is ready for deployment.');
    console.log('\nNext steps:');
    console.log('1. Choose your hosting platform (DigitalOcean, Railway, Render, etc.)');
    console.log('2. Set up your environment variables on the platform');
    console.log('3. Deploy your application');
    console.log('4. Update your Patreon OAuth redirect URI to match your new domain');
    
  } catch (error) {
    console.error('❌ Migration validation failed:', error.message);
    process.exit(1);
  }
}

main();
