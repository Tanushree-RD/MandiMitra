import { dbAll, dbGet, dbRun, dbExec } from '../db.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CSV_PATH = path.join(__dirname, '..', 'data', 'mandi_sample.csv');

const CROP_MAPPING = {
  arecanut: ['Arecanut(Whole)', 'Arecanut', 'Areca Nut'],
  coconut: ['Coconut', 'Coconut Oil Cake', 'Copra'],
  paddy: ['Paddy(Dhan)(Common)', 'Paddy(Dhan)', 'Rice'],
  tomato: ['Tomato', 'Tomato (Local)'],
  banana: ['Banana', 'Banana - Loss'],
  chilli: ['Chillies (Red)', 'Chilly Capsicum', 'Green Chilli'],
  pepper: ['Black Pepper', 'Pepper'],
  ginger: ['Ginger(Green)', 'Ginger(Dry)', 'Ginger']
};

function parseCSV(csvContent) {
  const lines = csvContent.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
    const row = {};
    headers.forEach((h, idx) => {
      row[h] = values[idx] || '';
    });
    rows.push(row);
  }
  return rows;
}

export function loadFallbackCSV() {
  try {
    if (!fs.existsSync(CSV_PATH)) {
      console.log('⚠️  No fallback CSV found at', CSV_PATH);
      return false;
    }
    const content = fs.readFileSync(CSV_PATH, 'utf-8');
    const rows = parseCSV(content);
    
    for (const row of rows) {
      try {
        dbRun(
          `INSERT INTO mandi_prices (crop, district, market, min_price, max_price, modal_price, date)
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [
            row.crop || row.commodity,
            row.district,
            row.market,
            parseFloat(row.min_price) || 0,
            parseFloat(row.max_price) || 0,
            parseFloat(row.modal_price) || 0,
            row.date
          ]
        );
      } catch (e) {
        // Skip duplicates
      }
    }
    console.log(`✅ Loaded ${rows.length} price records from fallback CSV`);
    return true;
  } catch (err) {
    console.error('❌ Error loading fallback CSV:', err.message);
    return false;
  }
}

async function fetchFromAPI(crop, district) {
  const apiKey = process.env.DATA_GOV_API_KEY;
  if (!apiKey) return null;

  try {
    const fetch = (await import('node-fetch')).default;
    const commodityNames = CROP_MAPPING[crop] || [crop];
    
    const resourceId = '9ef84268-d588-465a-a308-a864a43d0070';
    const url = new URL('https://api.data.gov.in/resource/' + resourceId);
    url.searchParams.set('api-key', apiKey);
    url.searchParams.set('format', 'json');
    url.searchParams.set('filters[state]', 'Karnataka');
    url.searchParams.set('filters[district]', district);
    url.searchParams.set('filters[commodity]', commodityNames[0]);
    url.searchParams.set('limit', '30');

    const response = await fetch(url.toString(), { timeout: 5000 });
    if (!response.ok) return null;

    const data = await response.json();
    if (!data.records || data.records.length === 0) return null;

    for (const record of data.records) {
      const date = record.arrival_date || new Date().toISOString().split('T')[0];
      try {
        dbRun(
          `INSERT INTO mandi_prices (crop, district, market, min_price, max_price, modal_price, date)
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [crop, district, record.market || 'Unknown',
           parseFloat(record.min_price) || 0, parseFloat(record.max_price) || 0,
           parseFloat(record.modal_price) || 0, date]
        );
      } catch (e) { /* skip */ }
    }

    try {
      // Check if meta already exists
      const existing = dbGet(
        'SELECT id FROM price_cache_meta WHERE crop = ? AND district = ?',
        [crop, district]
      );
      if (existing) {
        dbRun("UPDATE price_cache_meta SET last_fetched = datetime('now') WHERE crop = ? AND district = ?",
          [crop, district]);
      } else {
        dbRun("INSERT INTO price_cache_meta (crop, district, last_fetched) VALUES (?, ?, datetime('now'))",
          [crop, district]);
      }
    } catch (e) { /* skip */ }

    return true;
  } catch (err) {
    console.log(`⚠️  API fetch failed for ${crop}/${district}: ${err.message}. Using fallback.`);
    return null;
  }
}

function isCacheStale(crop, district) {
  const meta = dbGet(
    "SELECT last_fetched FROM price_cache_meta WHERE crop = ? AND district = ?",
    [crop, district]
  );
  if (!meta) return true;
  const lastFetched = new Date(meta.last_fetched);
  const now = new Date();
  return (now - lastFetched) > 24 * 60 * 60 * 1000;
}

export async function getPrices(crop, district) {
  if (isCacheStale(crop, district || 'Dakshina Kannada')) {
    await fetchFromAPI(crop, district || 'Dakshina Kannada');
  }

  let sql = `
    SELECT crop, district, market, min_price, max_price, modal_price, date
    FROM mandi_prices
    WHERE crop = ?
  `;
  const params = [crop];

  if (district) {
    sql += ' AND district = ?';
    params.push(district);
  }
  sql += ' ORDER BY date DESC LIMIT 30';

  const prices = dbAll(sql, params);

  if (prices.length === 0) {
    return { prices: [], stats: null };
  }

  const latestDate = prices[0].date;
  const latestPrices = prices.filter(p => p.date === latestDate);
  const allModals = latestPrices.map(p => p.modal_price).filter(p => p > 0);
  
  const stats = {
    modal: allModals.length > 0 ? Math.round(allModals.reduce((a, b) => a + b, 0) / allModals.length) : 0,
    min: Math.min(...latestPrices.map(p => p.min_price).filter(p => p > 0)),
    max: Math.max(...latestPrices.map(p => p.max_price).filter(p => p > 0), 0),
    date: latestDate,
    market_count: latestPrices.length
  };

  if (!isFinite(stats.min)) stats.min = 0;

  return { prices, stats };
}

export function getPriceBadge(askingPrice, modalPrice) {
  if (!modalPrice || modalPrice === 0) {
    return {
      badge: 'unknown',
      badge_kn: 'ತಿಳಿದಿಲ್ಲ',
      color: 'gray',
      explanation: 'Mandi price data not available',
      explanation_kn: 'ಮಂಡಿ ಬೆಲೆ ಲಭ್ಯವಿಲ್ಲ'
    };
  }

  const ratio = askingPrice / modalPrice;
  
  if (ratio <= 0.9) {
    return {
      badge: 'Low', badge_kn: 'ಕಡಿಮೆ', color: 'red',
      explanation: `Your price (₹${askingPrice}) is below the mandi average (₹${modalPrice}). You could ask for more!`,
      explanation_kn: `ನಿಮ್ಮ ಬೆಲೆ (₹${askingPrice}) ಮಂಡಿ ಸರಾಸರಿ (₹${modalPrice}) ಗಿಂತ ಕಡಿಮೆ. ಹೆಚ್ಚು ಕೇಳಬಹುದು!`
    };
  } else if (ratio >= 1.1) {
    return {
      badge: 'High', badge_kn: 'ಹೆಚ್ಚು', color: 'orange',
      explanation: `Your price (₹${askingPrice}) is above the mandi average (₹${modalPrice}).`,
      explanation_kn: `ನಿಮ್ಮ ಬೆಲೆ (₹${askingPrice}) ಮಂಡಿ ಸರಾಸರಿ (₹${modalPrice}) ಗಿಂತ ಹೆಚ್ಚು.`
    };
  } else {
    return {
      badge: 'Fair', badge_kn: 'ಸರಿಯಾದ', color: 'green',
      explanation: `Your price (₹${askingPrice}) is close to the mandi average (₹${modalPrice}). Good price!`,
      explanation_kn: `ನಿಮ್ಮ ಬೆಲೆ (₹${askingPrice}) ಮಂಡಿ ಸರಾಸರಿ (₹${modalPrice}) ಗೆ ಹತ್ತಿರ. ಒಳ್ಳೆಯ ಬೆಲೆ!`
    };
  }
}
