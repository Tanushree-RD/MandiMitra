const BASE_URL = '/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('mm_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

export const api = {
  // Auth
  async login(phone, otp, role = 'farmer') {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, otp, role })
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Login failed');
    }
    return res.json();
  },

  async getMe() {
    const res = await fetch(`${BASE_URL}/auth/me`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Not authenticated');
    return res.json();
  },

  async getDemoUsers() {
    const res = await fetch(`${BASE_URL}/auth/demo-users`);
    return res.json();
  },

  // Listings
  async getListings(params = {}) {
    const query = new URLSearchParams();
    if (params.crop) query.append('crop', params.crop);
    if (params.taluk) query.append('taluk', params.taluk);
    if (params.farmer_id) query.append('farmer_id', params.farmer_id);
    if (params.status) query.append('status', params.status);
    if (params.max_price) query.append('max_price', params.max_price);
    if (params.min_quantity) query.append('min_quantity', params.min_quantity);

    const res = await fetch(`${BASE_URL}/listings?${query.toString()}`);
    return res.json();
  },

  async getListing(id) {
    const res = await fetch(`${BASE_URL}/listings/${id}`);
    if (!res.ok) throw new Error('Listing not found');
    return res.json();
  },

  async createListing(data) {
    const res = await fetch(`${BASE_URL}/listings`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to create listing');
    }
    return res.json();
  },

  // Offers
  async getOffers(role) {
    const query = role ? `?role=${role}` : '';
    const res = await fetch(`${BASE_URL}/offers${query}`, {
      headers: getAuthHeaders()
    });
    return res.json();
  },

  async createOffer(data) {
    const res = await fetch(`${BASE_URL}/offers`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to create offer');
    }
    return res.json();
  },

  async respondToOffer(id, action, counter_price = null, message = null) {
    const res = await fetch(`${BASE_URL}/offers/${id}/respond`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ action, counter_price, message })
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to respond to offer');
    }
    return res.json();
  },

  // Mandi Prices
  async getPrices(crop, district = 'Dakshina Kannada') {
    const res = await fetch(`${BASE_URL}/prices?crop=${encodeURIComponent(crop)}&district=${encodeURIComponent(district)}`);
    return res.json();
  },

  async getAllPricesSummary() {
    const res = await fetch(`${BASE_URL}/prices/summary`);
    return res.json();
  },

  // Notifications
  async getNotifications() {
    const res = await fetch(`${BASE_URL}/notifications`, {
      headers: getAuthHeaders()
    });
    return res.json();
  },

  async markAllNotificationsRead() {
    const res = await fetch(`${BASE_URL}/notifications/read-all`, {
      method: 'POST',
      headers: getAuthHeaders()
    });
    return res.json();
  }
};
