import { writable, derived, get } from 'svelte/store';
import type { Language, UserRole, ProduceListing, Offer, ToastMessage } from '../types';
import { initialListings, initialOffers, mockMandiPrices } from '../mockData';
import { translations } from '../i18n';

const browser = typeof window !== 'undefined';

// Local storage helpers
function getStored<T>(key: string, fallback: T): T {
	if (!browser) return fallback;
	try {
		const val = localStorage.getItem(`mandimitra_${key}`);
		return val ? JSON.parse(val) : fallback;
	} catch (e) {
		return fallback;
	}
}

function setStored<T>(key: string, value: T): void {
	if (!browser) return;
	try {
		localStorage.setItem(`mandimitra_${key}`, JSON.stringify(value));
	} catch (e) {
		console.warn('LocalStorage save failed', e);
	}
}

// Stores
export const language = writable<Language>(getStored<Language>('lang', 'kn'));
export const userRole = writable<UserRole>(getStored<UserRole>('role', 'farmer'));
export const isAuthenticated = writable<boolean>(getStored<boolean>('auth', true));

export const currentUser = writable({
	farmer: {
		name: 'Manjunath Gowda (ಮಂಜುನಾಥ ಗೌಡ)',
		phone: '+91 98452 71829',
		taluk: 'Puttur',
		district: 'Dakshina Kannada',
		role: 'farmer' as UserRole
	},
	buyer: {
		name: 'Ramesh Shenoy (ರಮೇಶ್ ಶೆಣೈ)',
		company: 'Coastal Spices & Areca Traders',
		phone: '+91 94481 22340',
		taluk: 'Mangaluru Bunder',
		district: 'Dakshina Kannada',
		role: 'buyer' as UserRole
	}
});

export const listings = writable<ProduceListing[]>(getStored<ProduceListing[]>('listings', initialListings));
export const mandiPrices = writable(mockMandiPrices);
export const toasts = writable<ToastMessage[]>([]);

export const selectedListingId = writable<string>('list-1');
export const confirmedDeal = writable<{ listing: ProduceListing; offer: Offer } | null>(null);

// Sync with localStorage on changes
if (browser) {
	language.subscribe((val) => setStored('lang', val));
	userRole.subscribe((val) => setStored('role', val));
	listings.subscribe((val) => setStored('listings', val));
}

// Translations helper derived store
export const t = derived(language, ($lang) => translations[$lang]);

// Toast helper
export function addToast(title: string, message: string, type: ToastMessage['type'] = 'success', duration = 4000) {
	const id = Math.random().toString(36).substring(2, 9);
	toasts.update((current) => [...current, { id, title, message, type }]);

	setTimeout(() => {
		toasts.update((current) => current.filter((item) => item.id !== id));
	}, duration);
}

export function removeToast(id: string) {
	toasts.update((current) => current.filter((item) => item.id !== id));
}

// Store Actions
export function setLanguage(lang: Language) {
	language.set(lang);
}

export function setRole(role: UserRole) {
	userRole.set(role);
}

export function mockLogin(role: UserRole) {
	userRole.set(role);
	isAuthenticated.set(true);
	addToast(
		role === 'farmer' ? 'ಸ್ವಾಗತ! Welcome Farmer' : 'ಸ್ವಾಗತ! Welcome Buyer',
		role === 'farmer' ? 'Logged in as Manjunath Gowda (Puttur)' : 'Logged in as Coastal Spices Traders (Mangaluru)',
		'info'
	);
}

export function mockLogout() {
	isAuthenticated.set(false);
	addToast('Logged Out', 'Returned to landing page', 'info');
}

export function addProduceListing(data: {
	cropEn: string;
	cropKn: string;
	category: string;
	quantity: number;
	unit: string;
	unitKn: string;
	askingPrice: number;
	mandiPrice: number;
	taluk: string;
	image: string;
	organicCertified: boolean;
	descriptionEn?: string;
	descriptionKn?: string;
}) {
	const currentListings = get(listings);
	const diff = ((data.askingPrice - data.mandiPrice) / data.mandiPrice) * 100;
	const diffPercent = parseFloat(diff.toFixed(1));

	let grade: ProduceListing['fairPriceGrade'] = 'fair';
	if (diffPercent <= 2) grade = 'great_deal';
	else if (diffPercent <= 6) grade = 'fair';
	else grade = 'premium';

	const newListing: ProduceListing = {
		id: `list-${Date.now()}`,
		cropEn: data.cropEn,
		cropKn: data.cropKn,
		category: data.category || 'Harvest',
		farmerName: 'Manjunath Gowda',
		farmerPhone: '+91 98452 71829',
		farmerAvatar: 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&w=200&q=80',
		taluk: data.taluk,
		district: 'Dakshina Kannada',
		quantity: data.quantity,
		unit: data.unit,
		unitKn: data.unitKn,
		askingPrice: data.askingPrice,
		mandiPrice: data.mandiPrice,
		mandiApmc: `${data.taluk} APMC`,
		mandiDiffPercent: diffPercent,
		fairPriceGrade: grade,
		image: data.image,
		harvestDate: 'Just now',
		organicCertified: data.organicCertified,
		distanceKm: 3.5,
		descriptionEn: data.descriptionEn || 'Freshly harvested produce, graded and stored under covered shelter.',
		descriptionKn: data.descriptionKn || 'ತಾಜಾ ಕೊಯ್ಲು ಮಾಡಿದ ಗುಣಮಟ್ಟದ ಕೃಷಿ ಉತ್ಪನ್ನ. ತಕ್ಷಣ ಮಾರಾಟಕ್ಕೆ ಸಿದ್ಧವಾಗಿದೆ.',
		pickupAddress: `Gowda Farm, Taluk ${data.taluk}, Dakshina Kannada`,
		offers: [],
		isOwnListing: true
	};

	listings.set([newListing, ...currentListings]);
	addToast('ಬೆಳೆ ಸೇರಿಸಲಾಗಿದೆ! Listing Published', `${data.cropKn} / ${data.cropEn} is now live on MandiMitra!`, 'success');
	return newListing;
}

export function submitOffer(listingId: string, offerPrice: number, quantity: number, note = '') {
	const currentListings = get(listings);
	const listing = currentListings.find((l) => l.id === listingId);
	if (!listing) return null;

	const newOffer: Offer = {
		id: `off-${Date.now()}`,
		listingId,
		buyerName: 'Ramesh Shenoy',
		buyerCompany: 'Coastal Spices & Areca Traders',
		buyerPhone: '+91 94481 22340',
		buyerLocation: 'Bunder, Mangaluru',
		offerPricePerUnit: offerPrice,
		quantityRequested: quantity,
		totalAmount: offerPrice * quantity,
		status: 'pending',
		createdAt: 'Just now',
		note
	};

	const updated = currentListings.map((l) => {
		if (l.id === listingId) {
			return { ...l, offers: [newOffer, ...l.offers] };
		}
		return l;
	});

	listings.set(updated);
	addToast('ಆಫರ್ ಕಳುಹಿಸಲಾಗಿದೆ! Offer Sent', `Bid of ₹${offerPrice.toLocaleString()}/${listing.unit} sent to farmer ${listing.farmerName}`, 'deal');
	return newOffer;
}

export function acceptOfferAction(offerId: string): boolean {
	const currentListings = get(listings);
	let targetListing: ProduceListing | null = null;
	let targetOffer: Offer | null = null;

	for (const l of currentListings) {
		const matched = l.offers.find((o) => o.id === offerId);
		if (matched) {
			targetListing = l;
			targetOffer = { ...matched, status: 'accepted' as const };
			break;
		}
	}

	if (targetListing && targetOffer) {
		const finalOffer: Offer = targetOffer;
		const updated = currentListings.map((l) => {
			if (l.id === targetListing!.id) {
				return {
					...l,
					offers: l.offers.map((o) => (o.id === offerId ? finalOffer : o))
				};
			}
			return l;
		});

		listings.set(updated);
		confirmedDeal.set({ listing: targetListing, offer: finalOffer });
		addToast(
			'ಡೀಲ್ ಖಚಿತವಾಗಿದೆ! Deal Confirmed!',
			`Offer accepted at ₹${finalOffer.offerPricePerUnit.toLocaleString()} / unit!`,
			'deal'
		);
		return true;
	}
	return false;
}

export function counterOfferAction(offerId: string, counterPrice: number) {
	const currentListings = get(listings);
	const updated = currentListings.map((l) => {
		const updatedOffers = l.offers.map((o) => {
			if (o.id === offerId) {
				return { ...o, status: 'countered' as const, counterPrice };
			}
			return o;
		});
		return { ...l, offers: updatedOffers };
	});

	listings.set(updated);
	addToast('ಹೊಸ ದರ ಕಳುಹಿಸಲಾಗಿದೆ! Counter-Offer Sent', `Countered at ₹${counterPrice.toLocaleString()}`, 'info');
}

export function rejectOfferAction(offerId: string) {
	const currentListings = get(listings);
	const updated = currentListings.map((l) => {
		const updatedOffers = l.offers.map((o) => {
			if (o.id === offerId) {
				return { ...o, status: 'rejected' as const };
			}
			return o;
		});
		return { ...l, offers: updatedOffers };
	});

	listings.set(updated);
	addToast('ಆಫರ್ ತಿರಸ್ಕರಿಸಲಾಗಿದೆ! Offer Declined', 'Buyer has been informed', 'warning');
}

export function resetDemoData() {
	listings.set(initialListings);
	confirmedDeal.set(null);
	selectedListingId.set('list-1');
	addToast('Demo State Reset', 'Restored pristine sample listings and offers', 'info');
}
