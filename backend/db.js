require('dotenv').config();
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('@prisma/client');

const urlStr = (process.env.DATABASE_URL || '').trim();
if (!urlStr) {
  throw new Error('DATABASE_URL is missing in environment variables');
}

// Default to direct IP fallback on local dev (where DNS for neon.tech is blocked), but use domain hostname in production
const NEON_IP = '35.173.20.131'; 

const url = new URL(urlStr);
const originalHost = url.hostname;
const hostToUse = (process.env.NODE_ENV === 'production' && !process.env.USE_NEON_IP) ? originalHost : NEON_IP;

console.log('DB INIT: Host target:', hostToUse, `(Original: ${originalHost})`);

const pool = new Pool({
  host: hostToUse,
  port: url.port || 5432,
  user: url.username,
  password: decodeURIComponent(url.password),
  database: url.pathname.split('/')[1],
  ssl: { 
    rejectUnauthorized: false,
    servername: originalHost // Essential for Neon routing when connecting via IP
  },
  max: 5,                       // Neon free-tier friendly (was 20, wasteful)
  idleTimeoutMillis: 60000,     // Keep idle connections longer to avoid re-handshakes
  connectionTimeoutMillis: 10000, // Allow more time for initial cold-start connection
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ 
  adapter,
  log: process.env.NODE_ENV !== 'production' ? ['warn', 'error'] : ['error'],
});

module.exports = prisma;
