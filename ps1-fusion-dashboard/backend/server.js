/**
 * CyberJoar Strategic Fusion Dashboard
 * BACKEND CORE: OC.41335.2026
 * AUTHOR: Antigravity AI
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

const osintRoutes = require('./routes/osint');
const humintRoutes = require('./routes/humint');
const uploadRoutes = require('./routes/upload');

const app = express();
const PORT = process.env.PORT || 4000;

// Security Middleware
app.use(helmet({
  crossOriginResourcePolicy: false, // Required for serving images cross-origin
}));

// CORS Configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',') 
  : ['http://localhost:3000', 'http://localhost:5173'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Intelligence Access Denied: Origin cross-check failed'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Parsers
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Static Files (for image uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'operational', 
    timestamp: new Date().toISOString(),
    protocol: 'RESTRICTED',
    oc_reference: 'OC.41335.2026.59218'
  });
});

// Primary Routes
app.use('/api/osint', osintRoutes);
app.use('/api/humint', humintRoutes);
app.use('/api/upload', uploadRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint Secure: Not Found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[SYSTEM ERROR]:', err.stack);
  res.status(500).json({ 
    error: 'Internal Tactical Failure',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Classified error'
  });
});

// Initialize Server
app.listen(PORT, () => {
  console.log(`\x1b[36m%s\x1b[0m`, `================================================================`);
  console.log(`\x1b[36m%s\x1b[0m`, `CYBERJOAR STRATEGIC FUSION DASHBOARD — HUB ACTIVE`);
  console.log(`OPERATIONAL AT: http://localhost:${PORT}`);
  console.log(`STATUS: ALL SYSTEMS NOMINAL`);
  console.log(`\x1b[36m%s\x1b[0m`, `================================================================`);
});

/* RENDER DEPLOYMENT INSTRUCTIONS:
   1. render.com -> New Web Service -> connect repository.
   2. Root directory: ps1-fusion-dashboard/backend
   3. Build command: npm install
   4. Start command: node server.js
   5. Env variables:
      PORT=10000 (Render sets this automatically)
      ALLOWED_ORIGINS=https://your-frontend-subdomain.vercel.app
*/

/* VERCEL DEPLOYMENT INSTRUCTIONS (FRONTEND):
   1. vercel.com -> Import project -> select repo.
   2. Root directory: ps1-fusion-dashboard/frontend
   3. Framework preset: Vite
   4. Env variables:
      VITE_API_URL=https://your-backend-subdomain.onrender.com
*/



