import { initDb, dbAll, dbGet, dbRun, dbExec } from './db.js';
import { loadFallbackCSV } from './services/priceService.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Delete existing DB file to start fresh
const dbPath = path.join(__dirname, 'mandimitra.db');
if (fs.existsSync(dbPath)) {
  fs.unlinkSync(dbPath);
}

console.log('🌱 Seeding MandiMitra database...\n');

await initDb();

// ============ USERS ============
const farmers = [
  { phone: '9876543201', name: 'Ramesh Shetty', name_kn: 'ರಮೇಶ್ ಶೆಟ್ಟಿ', role: 'farmer', taluk: 'Mangaluru' },
  { phone: '9876543202', name: 'Lakshmi Gowda', name_kn: 'ಲಕ್ಷ್ಮೀ ಗೌಡ', role: 'farmer', taluk: 'Puttur' },
  { phone: '9876543203', name: 'Ganesh Poojary', name_kn: 'ಗಣೇಶ್ ಪೂಜಾರಿ', role: 'farmer', taluk: 'Sullia' },
  { phone: '9876543204', name: 'Savitri Hegde', name_kn: 'ಸಾವಿತ್ರಿ ಹೆಗ್ಡೆ', role: 'farmer', taluk: 'Udupi' },
  { phone: '9876543205', name: 'Narayana Bhat', name_kn: 'ನಾರಾಯಣ ಭಟ್', role: 'farmer', taluk: 'Bantwal' },
  { phone: '9876543206', name: 'Padma Rai', name_kn: 'ಪದ್ಮ ರೈ', role: 'farmer', taluk: 'Kundapura' },
];

const buyers = [
  { phone: '9876543301', name: 'Suresh Kumar', name_kn: 'ಸುರೇಶ್ ಕುಮಾರ್', role: 'buyer', taluk: 'Mangaluru' },
  { phone: '9876543302', name: 'Priya Nayak', name_kn: 'ಪ್ರಿಯಾ ನಾಯಕ್', role: 'buyer', taluk: 'Udupi' },
  { phone: '9876543303', name: 'Mohammed Ashraf', name_kn: 'ಮೊಹಮ್ಮದ್ ಅಶ್ರಫ್', role: 'buyer', taluk: 'Puttur' },
  { phone: '9876543304', name: 'Deepa Kamath', name_kn: 'ದೀಪ ಕಾಮತ್', role: 'buyer', taluk: 'Mangaluru' },
];

const userIds = {};
const allUsers = [...farmers, ...buyers];
for (const u of allUsers) {
  const result = dbRun(
    'INSERT INTO users (phone, name, name_kn, role, taluk) VALUES (?, ?, ?, ?, ?)',
    [u.phone, u.name, u.name_kn, u.role, u.taluk]
  );
  userIds[u.phone] = result.lastInsertRowid;
}

console.log(`✅ Created ${farmers.length} farmers and ${buyers.length} buyers`);

// ============ LISTINGS ============
const listings = [
  { farmer: '9876543201', crop: 'arecanut', quantity: 500, unit: 'kg', asking_price: 40000, taluk: 'Mangaluru', note: 'ಒಳ್ಳೆಯ ಗುಣಮಟ್ಟದ ಅಡಿಕೆ (Premium quality arecanut)', days_ago: 2 },
  { farmer: '9876543201', crop: 'coconut', quantity: 200, unit: 'kg', asking_price: 2800, taluk: 'Mangaluru', note: 'ತಾಜಾ ತೆಂಗಿನಕಾಯಿ (Fresh coconuts)', days_ago: 1 },
  { farmer: '9876543201', crop: 'pepper', quantity: 50, unit: 'kg', asking_price: 52000, taluk: 'Mangaluru', note: 'ಕಪ್ಪು ಮೆಣಸು (Black pepper, dried)', days_ago: 5 },
  { farmer: '9876543201', crop: 'banana', quantity: 100, unit: 'dozen', asking_price: 2500, taluk: 'Mangaluru', days_ago: 0 },
  
  { farmer: '9876543202', crop: 'arecanut', quantity: 300, unit: 'kg', asking_price: 38500, taluk: 'Puttur', note: 'ಚಾಲಿ ಅಡಿಕೆ (Chali variety)', days_ago: 3 },
  { farmer: '9876543202', crop: 'pepper', quantity: 80, unit: 'kg', asking_price: 48000, taluk: 'Puttur', note: 'ಮಲಬಾರ್ ಕಾಳುಮೆಣಸು', days_ago: 1 },
  { farmer: '9876543202', crop: 'ginger', quantity: 150, unit: 'kg', asking_price: 4200, taluk: 'Puttur', days_ago: 4 },
  { farmer: '9876543202', crop: 'coconut', quantity: 300, unit: 'kg', asking_price: 2600, taluk: 'Puttur', days_ago: 0 },
  
  { farmer: '9876543203', crop: 'arecanut', quantity: 1000, unit: 'kg', asking_price: 39000, taluk: 'Sullia', note: 'ಸುಲ್ಲಿಯ ಅಡಿಕೆ (Sullia special)', days_ago: 1 },
  { farmer: '9876543203', crop: 'pepper', quantity: 100, unit: 'kg', asking_price: 50000, taluk: 'Sullia', days_ago: 2 },
  { farmer: '9876543203', crop: 'banana', quantity: 50, unit: 'dozen', asking_price: 2600, taluk: 'Sullia', days_ago: 6 },
  
  { farmer: '9876543204', crop: 'paddy', quantity: 500, unit: 'kg', asking_price: 2200, taluk: 'Udupi', note: 'ಸೋನಾ ಮಸೂರಿ ಭತ್ತ (Sona Masuri paddy)', days_ago: 2 },
  { farmer: '9876543204', crop: 'coconut', quantity: 500, unit: 'kg', asking_price: 2900, taluk: 'Udupi', days_ago: 0 },
  { farmer: '9876543204', crop: 'tomato', quantity: 200, unit: 'kg', asking_price: 1800, taluk: 'Udupi', note: 'ಬೆಳೆ ತೋಟದ ಟೊಮೇಟೊ', days_ago: 1 },
  { farmer: '9876543204', crop: 'banana', quantity: 80, unit: 'dozen', asking_price: 2700, taluk: 'Udupi', days_ago: 3 },
  
  { farmer: '9876543205', crop: 'arecanut', quantity: 400, unit: 'kg', asking_price: 41000, taluk: 'Bantwal', note: 'ರಾಶಿ ಅಡಿಕೆ (Rashi arecanut)', days_ago: 1 },
  { farmer: '9876543205', crop: 'chilli', quantity: 100, unit: 'kg', asking_price: 10500, taluk: 'Bantwal', note: 'ಬ್ಯಾಡಗಿ ಮೆಣಸಿನಕಾಯಿ (Byadagi chilli)', days_ago: 4 },
  { farmer: '9876543205', crop: 'coconut', quantity: 250, unit: 'kg', asking_price: 2750, taluk: 'Bantwal', days_ago: 2 },
  { farmer: '9876543205', crop: 'ginger', quantity: 200, unit: 'kg', asking_price: 4800, taluk: 'Bantwal', days_ago: 0 },
  
  { farmer: '9876543206', crop: 'paddy', quantity: 800, unit: 'kg', asking_price: 2100, taluk: 'Kundapura', note: 'ಸಾಂಪ್ರದಾಯಿಕ ಭತ್ತ (Traditional paddy)', days_ago: 3 },
  { farmer: '9876543206', crop: 'coconut', quantity: 400, unit: 'kg', asking_price: 2700, taluk: 'Kundapura', days_ago: 1 },
  { farmer: '9876543206', crop: 'tomato', quantity: 150, unit: 'kg', asking_price: 2200, taluk: 'Kundapura', note: 'ಗೋಲ್ ಟೊಮೇಟೊ', days_ago: 0 },
  { farmer: '9876543206', crop: 'arecanut', quantity: 200, unit: 'kg', asking_price: 38000, taluk: 'Kundapura', days_ago: 5 },
  { farmer: '9876543206', crop: 'chilli', quantity: 60, unit: 'kg', asking_price: 9500, taluk: 'Kundapura', days_ago: 2 },
  { farmer: '9876543206', crop: 'banana', quantity: 120, unit: 'dozen', asking_price: 2400, taluk: 'Kundapura', days_ago: 1 },
  { farmer: '9876543206', crop: 'ginger', quantity: 100, unit: 'kg', asking_price: 4300, taluk: 'Karkala', days_ago: 0 },
];

const listingIds = [];
for (const l of listings) {
  const farmerId = userIds[l.farmer];
  const result = dbRun(
    `INSERT INTO listings (farmer_id, crop, quantity, unit, asking_price, taluk, note, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now', ?))`,
    [farmerId, l.crop, l.quantity, l.unit, l.asking_price, l.taluk, l.note || null, `-${l.days_ago} days`]
  );
  listingIds.push(result.lastInsertRowid);
}

console.log(`✅ Created ${listings.length} listings`);

// ============ OFFERS ============
const offers = [
  { listing_idx: 0, buyer: '9876543301', price: 39000, quantity: 200, message: 'ಒಳ್ಳೆಯ ಗುಣಮಟ್ಟವಾದರೆ ತೆಗೆದುಕೊಳ್ಳುತ್ತೇನೆ', status: 'pending' },
  { listing_idx: 4, buyer: '9876543301', price: 37500, quantity: 300, message: 'Bulk purchase, need delivery to Mangaluru', status: 'pending' },
  { listing_idx: 1, buyer: '9876543301', price: 2600, quantity: 100, message: null, status: 'pending' },
  
  { listing_idx: 11, buyer: '9876543302', price: 2100, quantity: 500, message: 'ಸೋನಾ ಮಸೂರಿ ಬೇಕು', status: 'pending' },
  { listing_idx: 12, buyer: '9876543302', price: 2800, quantity: 300, message: null, status: 'pending' },
  { listing_idx: 13, buyer: '9876543302', price: 1700, quantity: 100, message: 'Can pick up tomorrow', status: 'pending' },
  
  { listing_idx: 5, buyer: '9876543303', price: 47000, quantity: 80, message: 'ಉತ್ತಮ ಕಾಳುಮೆಣಸು ಬೇಕು', status: 'pending' },
  { listing_idx: 9, buyer: '9876543303', price: 49000, quantity: 50, message: null, status: 'pending' },
  { listing_idx: 8, buyer: '9876543303', price: 38000, quantity: 500, message: 'Large order for Puttur market', status: 'pending' },
  
  { listing_idx: 15, buyer: '9876543304', price: 40500, quantity: 200, message: 'ಬಂಟ್ವಾಳದ ಅಡಿಕೆ ಬೇಕು', status: 'pending' },
  { listing_idx: 16, buyer: '9876543304', price: 10000, quantity: 50, message: 'Byadagi quality ok?', status: 'pending' },
  { listing_idx: 3, buyer: '9876543304', price: 2400, quantity: 50, message: 'Need for wedding function', status: 'pending' },
];

for (const o of offers) {
  const listingId = listingIds[o.listing_idx];
  const buyerId = userIds[o.buyer];
  dbRun(
    'INSERT INTO offers (listing_id, buyer_id, price, quantity, message, status) VALUES (?, ?, ?, ?, ?, ?)',
    [listingId, buyerId, o.price, o.quantity, o.message, o.status]
  );
}

console.log(`✅ Created ${offers.length} offers`);

// ============ NOTIFICATIONS ============
dbRun(
  'INSERT INTO notifications (user_id, type, title, title_kn, message, message_kn, related_id, is_read) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
  [userIds['9876543201'], 'new_offer', 'New offer on arecanut', 'ಅಡಿಕೆ ಮೇಲೆ ಹೊಸ ಆಫರ್', 'Suresh Kumar offered ₹39000/kg for 200 kg', 'ಸುರೇಶ್ ಕುಮಾರ್ ₹39000/kg ಗೆ 200 kg ಆಫರ್ ಮಾಡಿದ್ದಾರೆ', 1, 0]
);
dbRun(
  'INSERT INTO notifications (user_id, type, title, title_kn, message, message_kn, related_id, is_read) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
  [userIds['9876543201'], 'new_offer', 'New offer on coconut', 'ತೆಂಗಿನಕಾಯಿ ಮೇಲೆ ಹೊಸ ಆಫರ್', 'Suresh Kumar offered ₹2600/kg for 100 kg', 'ಸುರೇಶ್ ಕುಮಾರ್ ₹2600/kg ಗೆ 100 kg ಆಫರ್ ಮಾಡಿದ್ದಾರೆ', 3, 0]
);
dbRun(
  'INSERT INTO notifications (user_id, type, title, title_kn, message, message_kn, related_id, is_read) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
  [userIds['9876543204'], 'new_offer', 'New offer on paddy', 'ಭತ್ತ ಮೇಲೆ ಹೊಸ ಆಫರ್', 'Priya Nayak offered ₹2100/kg for 500 kg', 'ಪ್ರಿಯಾ ನಾಯಕ್ ₹2100/kg ಗೆ 500 kg ಆಫರ್ ಮಾಡಿದ್ದಾರೆ', 4, 0]
);
dbRun(
  'INSERT INTO notifications (user_id, type, title, title_kn, message, message_kn, related_id, is_read) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
  [userIds['9876543205'], 'new_offer', 'New offer on arecanut', 'ಅಡಿಕೆ ಮೇಲೆ ಹೊಸ ಆಫರ್', 'Deepa Kamath offered ₹40500/kg for 200 kg', 'ದೀಪ ಕಾಮತ್ ₹40500/kg ಗೆ 200 kg ಆಫರ್ ಮಾಡಿದ್ದಾರೆ', 10, 0]
);

console.log('✅ Created sample notifications');

// ============ MANDI PRICES ============
loadFallbackCSV();

console.log('\n🎉 Seed complete! MandiMitra is ready.\n');
console.log('Demo accounts:');
console.log('──────────────────────────────────────');
console.log('FARMERS:');
for (const f of farmers) {
  console.log(`  📱 ${f.phone} - ${f.name} (${f.name_kn}) - ${f.taluk}`);
}
console.log('\nBUYERS:');
for (const b of buyers) {
  console.log(`  📱 ${b.phone} - ${b.name} (${b.name_kn}) - ${b.taluk}`);
}
console.log('\n  OTP for all: 123456');
console.log('──────────────────────────────────────\n');

process.exit(0);
