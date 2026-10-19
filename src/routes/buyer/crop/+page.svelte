<script lang="ts">
	import { language, listings, selectedListingId, addToast, acceptOfferAction, confirmedDeal } from '#lib/stores/appStore';
	import PriceComparisonBadge from '#lib/components/PriceComparisonBadge.svelte';
	import { goto } from '$app/navigation';

	const browser = typeof window !== 'undefined';
	import {
		ArrowLeft,
		MapPin,
		ShieldCheck,
		PhoneCall,
		MessageSquare,
		Zap,
		Calendar,
		Scale,
		TrendingUp,
		Share2,
		Heart,
		ExternalLink,
		CheckCircle2
	} from '@lucide/svelte';

	let isKannada = $derived($language === 'kn');
	let allListings = $derived($listings);
	let currentId = $derived($selectedListingId);

	// Get active listing or fallback to first
	let listing = $derived(allListings.find((l) => l.id === currentId) || allListings[0]);

	let totalPrice = $derived(listing.askingPrice * listing.quantity);

	function goBack() {
		goto('/buyer');
	}

	function goToSendOffer() {
		goto('/buyer/offer');
	}

	function handleInstantBuy() {
		// Create direct buy offer and auto-accept it!
		const mockBuyerOffer = {
			id: `off-direct-${Date.now()}`,
			listingId: listing.id,
			buyerName: 'Ramesh Shenoy',
			buyerCompany: 'Coastal Spices & Areca Traders',
			buyerPhone: '+91 94481 22340',
			buyerLocation: 'Bunder, Mangaluru',
			offerPricePerUnit: listing.askingPrice,
			quantityRequested: listing.quantity,
			totalAmount: totalPrice,
			status: 'accepted' as const,
			createdAt: 'Just now',
			note: 'Direct Instant Buy at full farmer asking price. Truck scheduled.'
		};

		confirmedDeal.set({
			listing: listing,
			offer: mockBuyerOffer
		});

		addToast(
			isKannada ? 'ನೇರ ಖರೀದಿ ದೃಢಪಟ್ಟಿದೆ!' : 'Direct Buy Confirmed!',
			isKannada ? `₹${listing.askingPrice.toLocaleString()} ದರದಲ್ಲಿ ಒಪ್ಪಂದ ಪೂರ್ಣವಾಗಿದೆ.` : 'Full asking price deal accepted.',
			'deal'
		);

		goto('/deal-confirmed');
	}

	function handleCallFarmer() {
		if (browser) {
			window.location.href = `tel:${listing.farmerPhone.replace(/\s+/g, '')}`;
		}
		addToast(
			isKannada ? 'ರೈತರಿಗೆ ಕರೆ ಸಂಪರ್ಕಿಸಲಾಗುತ್ತಿದೆ...' : 'Connecting Call to Farmer...',
			`${listing.farmerName}: ${listing.farmerPhone} (Direct Farmgate Connect)`,
			'info',
			5000
		);
	}

	function handleShare() {
		addToast(
			isKannada ? 'ಲಿಂಕ್ ನಕಲಿಸಲಾಗಿದೆ' : 'Link Copied',
			'MandiMitra crop details shared',
			'success'
		);
	}
</script>

<div class="max-w-5xl mx-auto px-4 py-6 md:py-10 space-y-6">
	<!-- Top Navigation Row -->
	<div class="flex items-center justify-between">
		<button
			type="button"
			onclick={goBack}
			class="inline-flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-emerald-800 transition-colors"
		>
			<ArrowLeft class="w-4 h-4" />
			<span>{isKannada ? 'ಮಾರುಕಟ್ಟೆಗೆ ಹಿಂತಿರುಗಿ' : 'Back to Listings'}</span>
		</button>

		<div class="flex items-center gap-2">
			<button
				type="button"
				onclick={handleShare}
				class="p-2 text-stone-600 hover:text-stone-900 bg-white rounded-xl border border-stone-200 shadow-2xs hover:bg-stone-50 transition-colors"
				title="Share crop link"
			>
				<Share2 class="w-4 h-4" />
			</button>
		</div>
	</div>

	<!-- Main Details Grid -->
	<div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
		<!-- Left: Media & Description (7 Cols) -->
		<div class="lg:col-span-7 space-y-6">
			<!-- Large Hero Image -->
			<div class="relative h-72 sm:h-96 rounded-3xl overflow-hidden bg-stone-100 shadow-md border border-stone-200">
				<img
					src={listing.image}
					alt={listing.cropEn}
					class="w-full h-full object-cover"
				/>
				<div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

				<!-- Floating Top Badges -->
				<div class="absolute top-4 left-4 right-4 flex items-center justify-between">
					<PriceComparisonBadge grade={listing.fairPriceGrade} diffPercent={listing.mandiDiffPercent} size="lg" />
					{#if listing.organicCertified}
						<span class="bg-emerald-950/90 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30 backdrop-blur-md">
							🌿 {isKannada ? 'ನೈಸರ್ಗಿಕ ಸಾವಯವ' : 'Organic Harvest'}
						</span>
					{/if}
				</div>

				<!-- Floating Bottom Overlay -->
				<div class="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
					<div>
						<span class="text-xs font-semibold text-emerald-300 block">
							{listing.taluk} Taluk • {listing.district}
						</span>
						<h1 class="text-2xl sm:text-3xl font-black drop-shadow-sm">
							{isKannada ? listing.cropKn : listing.cropEn}
						</h1>
					</div>
					<div class="text-right">
						<span class="text-xs text-stone-200 font-medium block">{isKannada ? 'ಲಭ್ಯ ಪ್ರಮಾಣ' : 'Total Batch'}</span>
						<span class="text-lg font-black text-white">{listing.quantity} {isKannada ? listing.unitKn : listing.unit}</span>
					</div>
				</div>
			</div>

			<!-- Mandi Price Comparison Visualizer -->
			<div class="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-2xs space-y-4">
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-2">
						<div class="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
							<TrendingUp class="w-4 h-4" />
						</div>
						<div>
							<h3 class="text-sm font-extrabold text-stone-900">
								{isKannada ? 'ಎಪಿಎಂಸಿ ಮಂಡಿ ಬೆಲೆ ಪಾರದರ್ಶಕತೆ' : 'APMC Mandi Price Transparency'}
							</h3>
							<p class="text-xs text-stone-500 font-medium">
								{isKannada ? 'ರೈತರ ನಿರೀಕ್ಷಿತ ಬೆಲೆ ಮತ್ತು ಅಧಿಕೃತ ಮಂಡಿ ದರದ ಹೋಲಿಕೆ' : 'Comparing farmer asking rate against verified APMC benchmark'}
							</p>
						</div>
					</div>

					<span class="text-xs font-bold text-stone-500 bg-stone-100 px-2.5 py-1 rounded-lg">
						{listing.mandiApmc}
					</span>
				</div>

				<!-- Comparison Side-by-Side Bars -->
				<div class="grid grid-cols-2 gap-4 pt-2">
					<div class="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200">
						<span class="text-[10px] uppercase font-bold text-emerald-800 tracking-wider block">
							{isKannada ? 'ರೈತರ ನಿರೀಕ್ಷಿತ ಬೆಲೆ' : 'Farmer Asking Rate'}
						</span>
						<div class="text-xl sm:text-2xl font-black text-emerald-800 font-mono mt-1">
							₹{listing.askingPrice.toLocaleString()}
						</div>
						<span class="text-[11px] text-emerald-700 font-medium">/ {isKannada ? listing.unitKn : listing.unit}</span>
					</div>

					<div class="p-3.5 rounded-2xl bg-stone-100/80 border border-stone-200">
						<span class="text-[10px] uppercase font-bold text-stone-600 tracking-wider block">
							{isKannada ? 'ಇಂದಿನ ಮಂಡಿ ದರ' : 'Today\'s Mandi Rate'}
						</span>
						<div class="text-xl sm:text-2xl font-black text-stone-800 font-mono mt-1">
							₹{listing.mandiPrice.toLocaleString()}
						</div>
						<span class="text-[11px] text-stone-500 font-medium">/ {isKannada ? listing.unitKn : listing.unit}</span>
					</div>
				</div>

				<div class="text-xs text-stone-600 bg-stone-50 p-3 rounded-xl border border-stone-100 flex items-center gap-2">
					<CheckCircle2 class="w-4 h-4 text-emerald-700 shrink-0" />
					<span>
						{isKannada
							? `ಈ ಬೆಲೆಯು ಮಧ್ಯವರ್ತಿ ಕಮಿಷನ್ ರಹಿತವಾಗಿದೆ. ರೈತರಿಗೆ ಪೂರ್ಣ ಮೌಲ್ಯ ದೊರೆಯುತ್ತದೆ.`
							: `Zero broker fee applied. Transparent farmgate trade direct between grower and buyer.`}
					</span>
				</div>
			</div>

			<!-- Farmer Quality & Harvest Description -->
			<div class="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-2xs space-y-3">
				<h3 class="text-sm font-extrabold text-stone-900 uppercase tracking-wider">
					{isKannada ? 'ಬೆಳೆಯ ಗುಣಮಟ್ಟ ಮತ್ತು ರೈತರ ವಿವರಣೆ' : 'Produce Quality & Grade Notes'}
				</h3>
				<p class="text-sm text-stone-600 leading-relaxed font-medium">
					{isKannada ? listing.descriptionKn : listing.descriptionEn}
				</p>

				<div class="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-stone-100 text-xs">
					<div>
						<span class="text-stone-400 block text-[10px] uppercase font-bold">{isKannada ? 'ಕೊಯ್ಲು ದಿನಾಂಕ' : 'Harvest Date'}</span>
						<span class="font-bold text-stone-800">{listing.harvestDate}</span>
					</div>
					<div>
						<span class="text-stone-400 block text-[10px] uppercase font-bold">{isKannada ? 'ಸ್ಥಳೀಯ ದೂರ' : 'Distance'}</span>
						<span class="font-bold text-stone-800">{listing.distanceKm} km from hub</span>
					</div>
					<div>
						<span class="text-stone-400 block text-[10px] uppercase font-bold">{isKannada ? 'ಪಾವತಿ ವಿಧಾನ' : 'Payment Mode'}</span>
						<span class="font-bold text-emerald-700">UPI / RTGS on weighment</span>
					</div>
				</div>
			</div>
		</div>

		<!-- Right: Farmer Contact Card & Action Box (5 Cols) -->
		<div class="lg:col-span-5 space-y-6">
			<!-- Farmer Profile Card -->
			<div class="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-md space-y-4">
				<div class="flex items-center gap-3">
					<img
						src={listing.farmerAvatar || 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&w=200&q=80'}
						alt={listing.farmerName}
						class="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-600/30 shadow-xs"
					/>
					<div class="min-w-0 flex-1">
						<div class="flex items-center gap-1.5">
							<h3 class="text-base font-extrabold text-stone-900 truncate">{listing.farmerName}</h3>
							<ShieldCheck class="w-4 h-4 text-emerald-600 shrink-0" title="APMC Verified" />
						</div>
						<p class="text-xs text-stone-500 font-medium flex items-center gap-1 mt-0.5">
							<MapPin class="w-3.5 h-3.5 text-stone-400 shrink-0" />
							<span>{listing.taluk}, {listing.district}</span>
						</p>
					</div>
				</div>

				<!-- Farm Address Box -->
				<div class="bg-stone-50 rounded-2xl p-3.5 border border-stone-100 text-xs text-stone-600 space-y-1">
					<span class="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
						{isKannada ? 'ತೋಟದ ವಿಳಾಸ / ಪಿಕಪ್ ಸ್ಥಳ' : 'Farm Pickup Location'}
					</span>
					<p class="font-medium text-stone-800 leading-snug">
						{listing.pickupAddress}
					</p>
				</div>

				<button
					type="button"
					onclick={handleCallFarmer}
					class="w-full py-2.5 px-4 rounded-xl border border-stone-200 hover:border-emerald-500 text-stone-800 font-bold text-xs transition-colors flex items-center justify-center gap-2 hover:bg-stone-50"
				>
					<PhoneCall class="w-3.5 h-3.5 text-emerald-700" />
					<span>{isKannada ? 'ರೈತರನ್ನು ಸಂಪರ್ಕಿಸಿ (+91 ...)' : 'Call Farmer Directly'}</span>
				</button>
			</div>

			<!-- Price & Action Box -->
			<div class="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-950 text-white rounded-3xl p-6 shadow-xl space-y-6 border border-emerald-700/50">
				<div>
					<span class="text-xs font-semibold text-emerald-200/90 block uppercase tracking-wider">
						{isKannada ? 'ಒಟ್ಟು ಲಾಟ್ ಮೌಲ್ಯ' : 'Total Batch Value'}
					</span>
					<div class="text-3xl font-black text-white tracking-tight font-mono mt-1">
						₹{totalPrice.toLocaleString()}
					</div>
					<p class="text-xs text-emerald-300 font-medium mt-1">
						{listing.quantity} {isKannada ? listing.unitKn : listing.unit} × ₹{listing.askingPrice.toLocaleString()}
					</p>
				</div>

				<div class="space-y-3 pt-2">
					<!-- Primary CTA: Send Offer -->
					<button
						type="button"
						onclick={goToSendOffer}
						class="w-full py-3.5 px-6 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-sm shadow-lg hover:shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2"
					>
						<MessageSquare class="w-4 h-4 stroke-[2.5]" />
						<span>{isKannada ? 'ಚೌಕಾಶಿ ಆಫರ್ ಕಳುಹಿಸಿ (Make Offer)' : 'Send Custom Bid / Offer'}</span>
					</button>

					<!-- Secondary CTA: Direct Buy at Asking Price -->
					<button
						type="button"
						onclick={handleInstantBuy}
						class="w-full py-3 px-6 rounded-2xl bg-white hover:bg-emerald-50 text-emerald-950 font-bold text-xs shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
					>
						<Zap class="w-3.5 h-3.5 text-emerald-700" />
						<span>{isKannada ? 'ಪೂರ್ಣ ಬೆಲೆಗೆ ನೇರ ಖರೀದಿ (Buy Now)' : 'Direct Buy at Asking Price'}</span>
					</button>
				</div>

				<p class="text-[11px] text-emerald-200/70 text-center leading-relaxed">
					{isKannada
						? 'ಆಫರ್ ಒಪ್ಪಿಕೊಂಡ ನಂತರ ವಾಟ್ಸಾಪ್ ದೃಢೀಕರಣ ಮತ್ತು ಗೇಟ್ ಪಾಸ್ ದೊರೆಯುತ್ತದೆ.'
						: 'Instant digital trade confirmation and truck gate-pass issued upon acceptance.'}
				</p>
			</div>
		</div>
	</div>
</div>
