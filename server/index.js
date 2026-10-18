import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { initDb, dbGet } from './db.js';
import { loadFallbackCSV } from './services/priceService.js';
import authRoutes from './routes/auth.js';
import listingRoutes from './routes/listings.js';
import offerRoutes from './routes/offers.js';
import priceRoutes from './routes/prices.js';
import notificationRoutes from './routes/notifications.js';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const app = express();
const PORT = process.env.PORT || 3001;

// Ensure uploads directory
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static(uploadsDir));

// Initialize and start
async function start() {
  await initDb();
  
  // Load fallback prices if empty
  const priceCount = dbGet('SELECT COUNT(*) as count FROM mandi_prices');
  if (!priceCount || priceCount.count === 0) {
    console.log('📊 Loading fallback mandi prices...');
    loadFallbackCSV();
  }

  // Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/listings', listingRoutes);
  app.use('/api/offers', offerRoutes);
  app.use('/api/prices', priceRoutes);
  app.use('/api/notifications', notificationRoutes);

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', name: 'MandiMitra API', version: '1.0.0' });
  });

  // Error handler
  app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error' });
  });

  app.listen(PORT, () => {
    console.log(`
╔══════════════════════════════════════╗
║   🌾 MandiMitra API Server          ║
║   Running on port ${PORT}              ║
║   http://localhost:${PORT}             ║
╚══════════════════════════════════════╝
    `);
  });
}

start().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
