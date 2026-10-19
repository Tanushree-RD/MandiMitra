<script lang="ts">
	import { language, listings, selectedListingId, submitOffer, addToast } from '#lib/stores/appStore';
	import SuccessDialog from '#lib/components/SuccessDialog.svelte';
	import { goto } from '$app/navigation';
	import {
		ArrowLeft,
		Send,
		IndianRupee,
		ShieldCheck,
		TrendingUp,
		Sparkles,
		CheckCircle2,
		MessageSquare,
		Clock
	} from '@lucide/svelte';

	let isKannada = $derived($language === 'kn');
	let allListings = $derived($listings);
	let currentId = $derived($selectedListingId);

	let listing = $derived(allListings.find((l) => l.id === currentId) || allListings[0]);

	// Offer form states
	let proposedPrice = $state(49000);
	let quantity = $state(15);
	let note = $state('Can dispatch truck tomorrow at 9:00 AM. Weighing & immediate payment at farmgate.');
	let isSuccessModalOpen = $state(false);

	$effect(() => {
		if (listing) {
			// Initialize smart default offer (e.g. 98% of asking price)
			proposedPrice = Math.round(listing.askingPrice * 0.98);
			quantity = Math.min(listing.quantity, 15);
		}
	});

	let totalAmount = $derived(proposedPrice * quantity);
	let diffFromAsking = $derived(proposedPrice - listing.askingPrice);
	let diffPercent = $derived(
		parseFloat((((proposedPrice - listing.askingPrice) / listing.askingPrice) * 100).toFixed(1))
	);

	function handleSubmitOffer() {
		submitOffer(listing.id, proposedPrice, quantity, note);
		isSuccessModalOpen = true;
	}

	function handleGoToFarmerReview() {
		isSuccessModalOpen = false;
		goto('/farmer/offers');
	}

	function handleBackToMarket() {
		isSuccessModalOpen = false;
		goto('/buyer');
	}
</script>

<div class="max-w-2xl mx-auto px-4 py-6 md:py-10 space-y-6">
	<!-- Back Button -->
	<div>
		<a href="/buyer/crop" class="inline-flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-emerald-800 transition-colors">
			<ArrowLeft class="w-4 h-4" />
			<span>{isKannada ? 'ಬೆಳೆಯ ವಿವರಕ್ಕೆ ಹಿಂತಿರುಗಿ' : 'Back to Crop Details'}</span>
		</a>
	</div>

	<!-- Header -->
	<div class="space-y-2">
		<div class="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full border border-amber-300">
			<MessageSquare class="w-3.5 h-3.5 text-amber-700" />
			<span>{isKannada ? 'ನೇರ ಚೌಕಾಶಿ ಬಿಡ್' : 'Direct Farmer Negotiation'}</span>
		</div>
		<h1 class="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
			{isKannada ? 'ರೈತರಿಗೆ ಆಫರ್ ಕಳುಹಿಸಿ' : 'Submit Offer to Farmer'}
		</h1>
		<p class="text-xs sm:text-sm text-stone-500 font-medium">
			{isKannada
				? `${listing.farmerName} ಅವರಿಗೆ ನಿಮ್ಮ ಪ್ರಸ್ತಾವಿತ ದರವನ್ನು ಕಳುಹಿಸಿ.`
				: `Submit your proposed purchase bid directly to farmer ${listing.farmerName}.`}
		</p>
	</div>

	<!-- Crop Summary Banner -->
	<div class="bg-white rounded-3xl p-4 sm:p-5 border border-stone-200/90 shadow-xs flex items-center gap-4">
		<img
			src={listing.image}
			alt={listing.cropEn}
			class="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-stone-200 shrink-0"
		/>
		<div class="min-w-0 flex-1">
			<div class="flex items-center gap-2">
				<h3 class="text-base font-extrabold text-stone-900 truncate">
					{isKannada ? listing.cropKn : listing.cropEn}
				</h3>
				<span class="text-[10px] bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
					{listing.taluk}
				</span>
			</div>
			<p class="text-xs text-stone-500 font-medium mt-0.5">
				{isKannada ? 'ರೈತರು' : 'Farmer'}: <span class="font-bold text-stone-700">{listing.farmerName}</span>
			</p>
			<div class="flex items-center gap-4 mt-2 text-xs">
				<span class="text-stone-600 font-medium">
					{isKannada ? 'ರೈತರ ಬೆಲೆ' : 'Asking'}: <strong class="text-stone-900 font-mono">₹{listing.askingPrice.toLocaleString()}</strong>
				</span>
				<span class="text-stone-400">•</span>
				<span class="text-stone-600 font-medium">
					{isKannada ? 'ಮಂಡಿ ಬೆಲೆ' : 'Mandi'}: <strong class="text-stone-900 font-mono">₹{listing.mandiPrice.toLocaleString()}</strong>
				</span>
			</div>
		</div>
	</div>

	<!-- Offer Form Card -->
	<form
		onsubmit={(e) => {
			e.preventDefault();
			handleSubmitOffer();
		}}
		class="bg-white rounded-3xl border border-stone-200/90 shadow-xl p-6 sm:p-8 space-y-6"
	>
		<!-- Offer Amount Field -->
		<div class="space-y-2">
			<label class="block text-xs font-bold text-stone-700 uppercase tracking-wider">
				{isKannada ? 'ನಿಮ್ಮ ಪ್ರಸ್ತಾವಿತ ದರ (₹ ಪ್ರತಿ ಮಾನಕ್ಕೆ)' : 'Your Proposed Price (₹ per unit)'}
			</label>
			<div class="relative flex items-center">
				<span class="absolute left-4 text-xl font-bold text-stone-400">₹</span>
				<input
					type="number"
					bind:value={proposedPrice}
					step="1"
					class="w-full py-4 pl-10 pr-4 text-2xl font-black text-emerald-800 rounded-2xl border-2 border-stone-300 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 focus:outline-hidden font-mono"
				/>
			</div>

			<!-- Price difference indicator -->
			<div class="flex items-center justify-between text-xs pt-1">
				<span class="text-stone-500 font-medium">
					{isKannada ? 'ರೈತರ ನಿರೀಕ್ಷಿತ ಬೆಲೆಗಿಂತ ವ್ಯತ್ಯಾಸ' : 'Difference from asking'}:
				</span>
				<span class="font-bold font-mono {diffPercent < 0 ? 'text-amber-700' : 'text-emerald-700'}">
					{diffPercent > 0 ? `+₹${diffFromAsking.toLocaleString()} (+${diffPercent}%)` : `₹${diffFromAsking.toLocaleString()} (${diffPercent}%)`}
				</span>
			</div>
		</div>

		<!-- Desired Quantity Field -->
		<div class="space-y-2">
			<div class="flex items-center justify-between">
				<label class="text-xs font-bold text-stone-700 uppercase tracking-wider">
					{isKannada ? 'ಖರೀದಿಸಲು ಇಚ್ಛಿಸುವ ಪ್ರಮಾಣ' : 'Quantity Desired'}
				</label>
				<span class="text-xs text-stone-500 font-medium">
					Max: {listing.quantity} {isKannada ? listing.unitKn : listing.unit}
				</span>
			</div>
			<input
				type="number"
				bind:value={quantity}
				min="1"
				max={listing.quantity}
				class="w-full py-3 px-4 text-base font-bold text-stone-900 rounded-2xl border border-stone-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 focus:outline-hidden font-mono"
			/>
		</div>

		<!-- Total Payout Banner -->
		<div class="bg-stone-50 rounded-2xl p-4 border border-stone-200 flex items-center justify-between">
			<div>
				<span class="text-[10px] uppercase font-bold text-stone-400 tracking-wider block">
					{isKannada ? 'ಒಟ್ಟು ಪ್ರಸ್ತಾವಿತ ಮೊತ್ತ' : 'Total Proposed Payout'}
				</span>
				<div class="text-2xl font-black text-stone-900 font-mono mt-0.5">
					₹{totalAmount.toLocaleString()}
				</div>
			</div>
			<span class="text-xs text-emerald-800 font-bold bg-emerald-100/70 px-3 py-1 rounded-full border border-emerald-300">
				{quantity} × ₹{proposedPrice.toLocaleString()}
			</span>
		</div>

		<!-- Message / Pickup note to farmer -->
		<div class="space-y-2">
			<label class="block text-xs font-bold text-stone-700 uppercase tracking-wider">
				{isKannada ? 'ರೈತರಿಗೆ ಟಿಪ್ಪಣಿ / ಪಿಕಪ್ ವಿವರ (ಐಚ್ಛಿಕ)' : 'Pickup & Logistics Note (Optional)'}
			</label>
			<textarea
				bind:value={note}
				rows="3"
				placeholder="e.g. Can arrange truck pickup tomorrow morning with spot cash/UPI payment..."
				class="w-full py-3 px-4 text-xs font-medium text-stone-800 rounded-2xl border border-stone-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 focus:outline-hidden resize-none leading-relaxed"
			></textarea>
		</div>

		<!-- Submit Button -->
		<button
			type="submit"
			class="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-black text-sm shadow-xl hover:shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-2"
		>
			<Send class="w-4 h-4 stroke-[2.5]" />
			<span>{isKannada ? 'ರೈತರಿಗೆ ಆಫರ್ ಕಳುಹಿಸಿ (Submit Offer)' : 'Submit Offer to Farmer'}</span>
		</button>
	</form>

	<!-- Success Dialog with Confetti -->
	<SuccessDialog
		isOpen={isSuccessModalOpen}
		title={isKannada ? '🎉 ಆಫರ್ ಯಶಸ್ವಿಯಾಗಿ ಕಳುಹಿಸಲಾಗಿದೆ!' : '🎉 Offer Submitted to Farmer!'}
		subtitle={isKannada
			? `ರೈತ ${listing.farmerName} ಅವರಿಗೆ ₹${proposedPrice.toLocaleString()}/${listing.unit} ದರದಲ್ಲಿ ಆಫರ್ ತಲುಪಿದೆ. ರೈತರು ಒಪ್ಪಿಕೊಂಡ ತಕ್ಷಣ ನಿಮಗೆ ವಾಟ್ಸಾಪ್ ನೋಟಿಫಿಕೇಶನ್ ಬರುತ್ತದೆ.`
			: `Your proposal of ₹${proposedPrice.toLocaleString()}/${listing.unit} has reached farmer ${listing.farmerName}. Ready for immediate review!`}
		primaryBtnText={isKannada ? '👉 ರೈತರ ಆಫರ್ ಪರಿಶೀಲನೆಗೆ ಹೋಗಿ (Demo Step)' : '👉 Switch to Farmer Screen to Accept'}
		secondaryBtnText={isKannada ? 'ಮಾರುಕಟ್ಟೆಗೆ ಹಿಂತಿರುಗಿ' : 'Back to Buyer Market'}
		onPrimary={handleGoToFarmerReview}
		onSecondary={handleBackToMarket}
		onClose={() => (isSuccessModalOpen = false)}
	/>
</div>
