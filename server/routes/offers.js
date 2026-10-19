import { Router } from 'express';
import { dbAll, dbGet, dbRun } from '../db.js';
import { authMiddleware, requireRole } from '../auth.js';
import { createNotification } from './notifications.js';

const router = Router();

const CROP_NAMES_KN = {
  arecanut: 'ಅಡಿಕೆ', coconut: 'ತೆಂಗಿನಕಾಯಿ', paddy: 'ಭತ್ತ',
  tomato: 'ಟೊಮೇಟೊ', banana: 'ಬಾಳೆಹಣ್ಣು', chilli: 'ಮೆಣಸಿನಕಾಯಿ',
  pepper: 'ಕಾಳುಮೆಣಸು', ginger: 'ಶುಂಠಿ'
};

// GET /api/offers
router.get('/', authMiddleware, (req, res) => {
  const { listing_id } = req.query;

  if (req.user.role === 'farmer') {
    let sql = `
      SELECT o.*, l.crop, l.quantity as listing_quantity, l.asking_price, l.taluk, l.unit,
             u.name as buyer_name, u.name_kn as buyer_name_kn, u.phone as buyer_phone
      FROM offers o
      JOIN listings l ON o.listing_id = l.id
      JOIN users u ON o.buyer_id = u.id
      WHERE l.farmer_id = ?
    `;
    const params = [req.user.id];
    if (listing_id) {
      sql += ' AND o.listing_id = ?';
      params.push(Number(listing_id));
    }
    sql += ' ORDER BY o.created_at DESC';
    const offers = dbAll(sql, params);
    return res.json({ offers });
  }

  // Buyer sees their own offers
  let sql = `
    SELECT o.*, l.crop, l.quantity as listing_quantity, l.asking_price, l.taluk, l.photo, l.unit,
           u.name as farmer_name, u.name_kn as farmer_name_kn, u.phone as farmer_phone
    FROM offers o
    JOIN listings l ON o.listing_id = l.id
    JOIN users u ON l.farmer_id = u.id
    WHERE o.buyer_id = ?
  `;
  const params = [req.user.id];
  if (listing_id) {
    sql += ' AND o.listing_id = ?';
    params.push(Number(listing_id));
  }
  sql += ' ORDER BY o.created_at DESC';
  const offers = dbAll(sql, params);
  res.json({ offers });
});

// POST /api/offers
router.post('/', authMiddleware, requireRole('buyer'), (req, res) => {
  const { listing_id, price, quantity, message } = req.body;

  if (!listing_id || !price || !quantity) {
    return res.status(400).json({ error: 'listing_id, price, and quantity required' });
  }

  const listing = dbGet(`
    SELECT l.*, u.name as farmer_name FROM listings l JOIN users u ON l.farmer_id = u.id WHERE l.id = ? AND l.status = 'active'
  `, [Number(listing_id)]);
  if (!listing) return res.status(404).json({ error: 'Active listing not found' });

  const existing = dbGet(
    "SELECT * FROM offers WHERE listing_id = ? AND buyer_id = ? AND status = 'pending'",
    [Number(listing_id), req.user.id]
  );
  if (existing) {
    return res.status(400).json({ error: 'You already have a pending offer on this listing' });
  }

  const result = dbRun(`
    INSERT INTO offers (listing_id, buyer_id, price, quantity, message)
    VALUES (?, ?, ?, ?, ?)
  `, [Number(listing_id), req.user.id, Number(price), Number(quantity), message || null]);

  const offer = dbGet('SELECT * FROM offers WHERE id = ?', [result.lastInsertRowid]);

  const cropKn = CROP_NAMES_KN[listing.crop] || listing.crop;
  createNotification({
    user_id: listing.farmer_id,
    type: 'new_offer',
    title: `New offer on ${listing.crop}`,
    title_kn: `${cropKn} ಮೇಲೆ ಹೊಸ ಆಫರ್`,
    message: `${req.user.name} offered ₹${price}/${listing.unit} for ${quantity} ${listing.unit}`,
    message_kn: `${req.user.name} ₹${price}/${listing.unit} ಗೆ ${quantity} ${listing.unit} ಆಫರ್ ಮಾಡಿದ್ದಾರೆ`,
    related_id: offer.id
  });

  console.log(`📱 [Mock WhatsApp] To farmer ${listing.farmer_name}: New offer of ₹${price} on your ${listing.crop} listing`);

  res.status(201).json({ offer });
});

// PUT /api/offers/:id/respond
router.put('/:id/respond', authMiddleware, requireRole('farmer'), (req, res) => {
  const { action, counter_price } = req.body;

  if (!['accept', 'reject', 'counter'].includes(action)) {
    return res.status(400).json({ error: 'action must be accept, reject, or counter' });
  }

  const offer = dbGet(`
    SELECT o.*, l.farmer_id, l.crop, l.unit, u.name as buyer_name
    FROM offers o
    JOIN listings l ON o.listing_id = l.id
    JOIN users u ON o.buyer_id = u.id
    WHERE o.id = ?
  `, [Number(req.params.id)]);

  if (!offer) return res.status(404).json({ error: 'Offer not found' });
  if (offer.farmer_id !== req.user.id) return res.status(403).json({ error: 'Not your listing' });
  if (offer.status !== 'pending') return res.status(400).json({ error: 'Offer already responded to' });

  const cropKn = CROP_NAMES_KN[offer.crop] || offer.crop;

  if (action === 'accept') {
    dbRun('UPDATE offers SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', ['accepted', Number(offer.id)]);
    dbRun("UPDATE listings SET status = 'sold', updated_at = CURRENT_TIMESTAMP WHERE id = ?", [Number(offer.listing_id)]);
    dbRun("UPDATE offers SET status = 'rejected', updated_at = CURRENT_TIMESTAMP WHERE listing_id = ? AND id != ? AND status = 'pending'",
      [Number(offer.listing_id), Number(offer.id)]);

    createNotification({
      user_id: offer.buyer_id,
      type: 'offer_accepted',
      title: `Offer accepted for ${offer.crop}!`,
      title_kn: `${cropKn} ಆಫರ್ ಸ್ವೀಕರಿಸಲಾಗಿದೆ!`,
      message: `${req.user.name} accepted your offer of ₹${offer.price}/${offer.unit}`,
      message_kn: `${req.user.name} ನಿಮ್ಮ ₹${offer.price}/${offer.unit} ಆಫರ್ ಸ್ವೀಕರಿಸಿದ್ದಾರೆ`,
      related_id: offer.id
    });
    console.log(`📱 [Mock WhatsApp] To buyer ${offer.buyer_name}: Your offer on ${offer.crop} was ACCEPTED!`);
  } else if (action === 'reject') {
    dbRun('UPDATE offers SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', ['rejected', Number(offer.id)]);
    createNotification({
      user_id: offer.buyer_id,
      type: 'offer_rejected',
      title: `Offer rejected for ${offer.crop}`,
      title_kn: `${cropKn} ಆಫರ್ ತಿರಸ್ಕರಿಸಲಾಗಿದೆ`,
      message: `${req.user.name} rejected your offer of ₹${offer.price}/${offer.unit}`,
      message_kn: `${req.user.name} ನಿಮ್ಮ ₹${offer.price}/${offer.unit} ಆಫರ್ ತಿರಸ್ಕರಿಸಿದ್ದಾರೆ`,
      related_id: offer.id
    });
  } else if (action === 'counter') {
    if (!counter_price) return res.status(400).json({ error: 'counter_price required' });
    dbRun('UPDATE offers SET status = ?, counter_price = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      ['countered', Number(counter_price), Number(offer.id)]);
    createNotification({
      user_id: offer.buyer_id,
      type: 'offer_countered',
      title: `Counter offer on ${offer.crop}`,
      title_kn: `${cropKn} ಮೇಲೆ ಪ್ರತಿ ಆಫರ್`,
      message: `${req.user.name} countered with ₹${counter_price}/${offer.unit}`,
      message_kn: `${req.user.name} ₹${counter_price}/${offer.unit} ಪ್ರತಿ ಆಫರ್ ಮಾಡಿದ್ದಾರೆ`,
      related_id: offer.id
    });
    console.log(`📱 [Mock WhatsApp] To buyer ${offer.buyer_name}: Counter offer of ₹${counter_price} on ${offer.crop}`);
  }

  const updated = dbGet(`
    SELECT o.*, u.name as buyer_name, u.name_kn as buyer_name_kn, u.phone as buyer_phone
    FROM offers o JOIN users u ON o.buyer_id = u.id WHERE o.id = ?
  `, [Number(offer.id)]);

  res.json({ offer: updated });
});

export default router;
