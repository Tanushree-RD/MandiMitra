import { Router } from 'express';
import { dbAll, dbGet, dbRun } from '../db.js';
import { authMiddleware } from '../auth.js';

const router = Router();

export function createNotification({ user_id, type, title, title_kn, message, message_kn, related_id }) {
  return dbRun(`
    INSERT INTO notifications (user_id, type, title, title_kn, message, message_kn, related_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `, [user_id, type, title, title_kn || title, message, message_kn || message, related_id || null]);
}

// GET /api/notifications
router.get('/', authMiddleware, (req, res) => {
  const notifications = dbAll(
    'SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT 50',
    [req.user.id]
  );
  
  const unread = dbGet(
    'SELECT COUNT(*) as count FROM notifications WHERE user_id = ? AND is_read = 0',
    [req.user.id]
  );

  res.json({ notifications, unread_count: unread?.count || 0 });
});

// PUT /api/notifications/read-all
router.put('/read-all', authMiddleware, (req, res) => {
  dbRun('UPDATE notifications SET is_read = 1 WHERE user_id = ?', [req.user.id]);
  res.json({ success: true });
});

// PUT /api/notifications/:id/read
router.put('/:id/read', authMiddleware, (req, res) => {
  dbRun('UPDATE notifications SET is_read = 1 WHERE id = ? AND user_id = ?', [Number(req.params.id), req.user.id]);
  res.json({ success: true });
});

export default router;
