import { Router } from 'express';
import { getPrices, getPriceBadge } from '../services/priceService.js';

const router = Router();

// GET /api/prices?crop=...&district=...
router.get('/', async (req, res) => {
  try {
    const { crop, district } = req.query;
    if (!crop) {
      return res.status(400).json({ error: 'crop parameter required' });
    }
    const result = await getPrices(crop, district);
    res.json(result);
  } catch (err) {
    console.error('Price fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch prices' });
  }
});

// GET /api/prices/badge?crop=...&asking_price=...&district=...
router.get('/badge', async (req, res) => {
  try {
    const { crop, asking_price, district } = req.query;
    if (!crop || !asking_price) {
      return res.status(400).json({ error: 'crop and asking_price required' });
    }
    const result = await getPrices(crop, district);
    const badge = getPriceBadge(Number(asking_price), result.stats?.modal || 0);
    res.json({ badge, stats: result.stats });
  } catch (err) {
    console.error('Badge error:', err);
    res.status(500).json({ error: 'Failed to calculate badge' });
  }
});

export default router;
