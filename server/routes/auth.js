import { Router } from 'express';
import { dbAll, dbGet, dbRun } from '../db.js';
import { generateToken } from '../auth.js';
import jwt from 'jsonwebtoken';

const router = Router();

const MOCK_OTP = '123456';

// POST /api/auth/send-otp
router.post('/send-otp', (req, res) => {
  const { phone } = req.body;
  if (!phone || phone.length < 10) {
    return res.status(400).json({ error: 'Valid phone number required' });
  }
  console.log(`📱 [Mock SMS] OTP 123456 sent to ${phone}`);
  res.json({ success: true, message: 'OTP sent', hint: 'Demo OTP: 123456' });
});

// POST /api/auth/verify-otp
router.post('/verify-otp', (req, res) => {
  const { phone, otp, name, name_kn, role } = req.body;
  
  if (!phone || !otp) {
    return res.status(400).json({ error: 'Phone and OTP required' });
  }
  
  if (otp !== MOCK_OTP) {
    return res.status(401).json({ error: 'Invalid OTP' });
  }

  let user = dbGet('SELECT * FROM users WHERE phone = ?', [phone]);

  if (!user) {
    if (!name || !role) {
      return res.json({ 
        success: false,
        isNewUser: true,
        message: 'New user - please provide name and role'
      });
    }
    const result = dbRun(
      'INSERT INTO users (phone, name, name_kn, role) VALUES (?, ?, ?, ?)',
      [phone, name, name_kn || name, role]
    );
    user = dbGet('SELECT * FROM users WHERE id = ?', [result.lastInsertRowid]);
  }

  const token = generateToken(user);
  res.json({ 
    success: true, 
    token, 
    user: { 
      id: user.id, 
      phone: user.phone, 
      name: user.name,
      name_kn: user.name_kn, 
      role: user.role,
      taluk: user.taluk
    } 
  });
});

// GET /api/auth/me
router.get('/me', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token' });
  }
  
  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'mandimitra_hackathon_secret_2024');
    const user = dbGet('SELECT id, phone, name, name_kn, role, taluk FROM users WHERE id = ?', [decoded.id]);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ user });
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
});

export default router;
