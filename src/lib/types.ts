export type Language = 'kn' | 'en';
export type UserRole = 'farmer' | 'buyer';

export type FairPriceGrade = 'great_deal' | 'fair' | 'premium';

export interface MandiPriceItem {
	id: string;
	cropEn: string;
	cropKn: string;
	apmcEn: string;
	apmcKn: string;
	modalPrice: number;
	minPrice: number;
	maxPrice: number;
	unitEn: string;
	unitKn: string;
	changePercent: number; // e.g. +3.2 or -1.5
	trend: 'up' | 'down' | 'stable';
	lastUpdated: string;
}

export interface Offer {
	id: string;
	listingId: string;
	buyerName: string;
	buyerPhone: string;
	buyerCompany: string;
	buyerLocation: string;
	offerPricePerUnit: number;
	quantityRequested: number;
	totalAmount: number;
	status: 'pending' | 'accepted' | 'countered' | 'rejected';
	createdAt: string;
	note?: string;
	counterPrice?: number;
}

export interface ProduceListing {
	id: string;
	cropEn: string;
	cropKn: string;
	category: string;
	farmerName: string;
	farmerPhone: string;
	farmerAvatar?: string;
	taluk: string;
	district: string;
	quantity: number;
	unit: string;
	unitKn: string;
	askingPrice: number; // in ₹ per unit
	mandiPrice: number; // benchmark APMC price
	mandiApmc: string;
	mandiDiffPercent: number; // e.g. -2% or +5%
	fairPriceGrade: FairPriceGrade;
	image: string;
	harvestDate: string;
	organicCertified: boolean;
	distanceKm: number;
	descriptionEn: string;
	descriptionKn: string;
	pickupAddress: string;
	offers: Offer[];
	isOwnListing?: boolean; // if created by current logged-in farmer
}

export interface ToastMessage {
	id: string;
	type: 'success' | 'info' | 'warning' | 'deal';
	title: string;
	message: string;
}
