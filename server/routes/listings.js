import { Router } from 'express';
import { dbAll, dbGet, dbRun } from '../db.js';
import { authMiddleware, requireRole } from '../auth.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { createNotification } from './notifications.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const storage = multer.diskStorage({
  destination: path.join(__dirname, '..', 'uploads'),
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

const router = Router();

// GET /api/listings
router.get('/', (req, res) => {
  const { crop, taluk, max_price, min_quantity, search, farmer_id } = req.query;
  
  let sql = `
    SELECT l.*, u.name as farmer_name, u.name_kn as farmer_name_kn, u.phone as farmer_phone
    FROM listings l
    JOIN users u ON l.farmer_id = u.id
    WHERE 1=1
  `;
  const params = [];

  if (farmer_id) {
    sql += ' AND l.farmer_id = ?';
    params.push(Number(farmer_id));
  } else {
    sql += " AND l.status = 'active'";
  }

  if (crop) {
    sql += ' AND l.crop = ?';
    params.push(crop);
  }
  if (taluk) {
    sql += ' AND l.taluk = ?';
    params.push(taluk);
  }
  if (max_price) {
    sql += ' AND l.asking_price <= ?';
    params.push(Number(max_price));
  }
  if (min_quantity) {
    sql += ' AND l.quantity >= ?';
    params.push(Number(min_quantity));
  }
  if (search) {
    sql += ' AND (l.crop LIKE ? OR l.taluk LIKE ? OR l.note LIKE ?)';
    const term = `%${search}%`;
    params.push(term, term, term);
  }

  sql += ' ORDER BY l.created_at DESC';

  const listings = dbAll(sql, params);
  res.json({ listings });
});

// GET /api/listings/:id
router.get('/:id', (req, res) => {
  const listing = dbGet(`
    SELECT l.*, u.name as farmer_name, u.name_kn as farmer_name_kn, u.phone as farmer_phone
    FROM listings l
    JOIN users u ON l.farmer_id = u.id
    WHERE l.id = ?
  `, [Number(req.params.id)]);
  
  if (!listing) return res.status(404).json({ error: 'Listing not found' });
  res.json({ listing });
});

// POST /api/listings
router.post('/', authMiddleware, requireRole('farmer'), upload.single('photo'), (req, res) => {
  const { crop, quantity, unit, asking_price, taluk, note } = req.body;
  
  if (!crop || !quantity || !asking_price || !taluk) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const photo = req.file ? `/uploads/${req.file.filename}` : null;

  const result = dbRun(`
    INSERT INTO listings (farmer_id, crop, quantity, unit, asking_price, taluk, photo, note)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `, [req.user.id, crop, Number(quantity), unit || 'kg', Number(asking_price), taluk, photo, note || null]);

  const listing = dbGet('SELECT * FROM listings WHERE id = ?', [result.lastInsertRowid]);
  res.status(201).json({ listing });
});

// PUT /api/listings/:id
router.put('/:id', authMiddleware, requireRole('farmer'), (req, res) => {
  const listing = dbGet('SELECT * FROM listings WHERE id = ? AND farmer_id = ?', [Number(req.params.id), req.user.id]);
  if (!listing) return res.status(404).json({ error: 'Listing not found' });

  const { crop, quantity, unit, asking_price, taluk, note, status } = req.body;
  
  dbRun(`
    UPDATE listings SET
      crop = COALESCE(?, crop),
      quantity = COALESCE(?, quantity),
      unit = COALESCE(?, unit),
      asking_price = COALESCE(?, asking_price),
      taluk = COALESCE(?, taluk),
      note = COALESCE(?, note),
      status = COALESCE(?, status),
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `, [crop || null, quantity ? Number(quantity) : null, unit || null, asking_price ? Number(asking_price) : null, taluk || null, note || null, status || null, Number(req.params.id)]);

  const updated = dbGet('SELECT * FROM listings WHERE id = ?', [Number(req.params.id)]);
  res.json({ listing: updated });
});

// DELETE /api/listings/:id
router.delete('/:id', authMiddleware, requireRole('farmer'), (req, res) => {
  const listing = dbGet('SELECT * FROM listings WHERE id = ? AND farmer_id = ?', [Number(req.params.id), req.user.id]);
  if (!listing) return res.status(404).json({ error: 'Listing not found' });
  
  dbRun('DELETE FROM listings WHERE id = ?', [Number(req.params.id)]);
  res.json({ success: true });
});

export default router;
