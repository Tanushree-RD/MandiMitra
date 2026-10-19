<script lang="ts">
	import {
		language,
		listings,
		acceptOfferAction,
		counterOfferAction,
		rejectOfferAction,
		addToast,
		userRole,
		setRole
	} from '#lib/stores/appStore';
	import type { Offer, ProduceListing } from '#lib/types';
	import Modal from '#lib/components/Modal.svelte';
	import { goto } from '$app/navigation';
	import {
		CheckCircle2,
		XCircle,
		ArrowLeft,
		MessageSquare,
		Clock,
		Building2,
		Phone,
		MapPin,
		Sparkles,
		Send,
		AlertCircle,
		TrendingUp,
		ShieldCheck
	} from '@lucide/svelte';

	let isKannada = $derived($language === 'kn');
	let allListings = $derived($listings);

	// Collect all offers across listings
	let allOffers = $derived.by(() => {
		const result: { offer: Offer; listing: ProduceListing }[] = [];
		for (const l of allListings) {
			if (l.offers && l.offers.length > 0) {
				for (const o of l.offers) {
					result.push({ offer: o, listing: l });
				}
			}
		}
		return result;
	});

	// Counter Offer Modal state
	let isCounterModalOpen = $state(false);
	let selectedOfferForCounter = $state<{ offer: Offer; listing: ProduceListing } | null>(null);
	let counterPriceInput = $state(49500);

	function handleAccept(offerId: string) {
		const success = acceptOfferAction(offerId);
		if (success) {
			goto('/deal-confirmed');
		}
	}

	function openCounterModal(item: { offer: Offer; listing: ProduceListing }) {
		selectedOfferForCounter = item;
		counterPriceInput = Math.round((item.offer.offerPricePerUnit + item.listing.askingPrice) / 2);
		isCounterModalOpen = true;
	}

	function submitCounter() {
		if (!selectedOfferForCounter) return;
		counterOfferAction(selectedOfferForCounter.offer.id, counterPriceInput);
		isCounterModalOpen = false;
	}

	function handleReject(offerId: string) {
		rejectOfferAction(offerId);
	}
</script>

<div class="max-w-4xl mx-auto px-4 py-6 md:py-10 space-y-6">
	<!-- Top Navigation -->
	<div>
		<a href="/farmer" class="inline-flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-emerald-800 transition-colors">
			<ArrowLeft class="w-4 h-4" />
			<span>{isKannada ? 'ರೈತರ ಹಬ್‌ಗೆ ಹಿಂತಿರುಗಿ' : 'Back to Farmer Hub'}</span>
		</a>
	</div>

	<!-- Header -->
	<div class="space-y-2">
		<div class="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full border border-amber-300">
			<MessageSquare class="w-3.5 h-3.5 text-amber-700" />
			<span>{isKannada ? 'ಖರೀದಿದಾರರ ಬಿಡ್ಡಿಂಗ್ ವೇದಿಕೆ' : 'Direct Buyer Offer Inbox'}</span>
		</div>
		<h1 class="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
			{isKannada ? 'ಬಂದಿರುವ ಆಫರ್‌ಗಳ ಪರಿಶೀಲನೆ' : 'Review Incoming Buyer Offers'}
		</h1>
		<p class="text-xs sm:text-sm text-stone-500 font-medium">
			{isKannada
				? 'ಖರೀದಿದಾರರ ಆಫರ್ ಪರಿಶೀಲಿಸಿ, ನೇರವಾಗಿ ಒಪ್ಪಿಕೊಳ್ಳಿ ಅಥವಾ ನಿಮ್ಮ ಕೌಂಟರ್ ಬೆಲೆ ತಿಳಿಸಿ.'
				: 'Review price proposals from verified buyers. Accept in 1-click to confirm the trade.'}
		</p>
	</div>

	<!-- Offers List -->
	{#if allOffers.length > 0}
		<div class="space-y-5">
			{#each allOffers as item (item.offer.id)}
				<div class="bg-white rounded-3xl border border-stone-200/90 shadow-md hover:shadow-xl transition-all p-6 sm:p-7 space-y-5 relative overflow-hidden">
					<!-- Top Status Badge -->
					<div class="flex items-center justify-between border-b border-stone-100 pb-4">
						<div class="flex items-center gap-2.5">
							<div class="w-10 h-10 rounded-2xl bg-stone-100 flex items-center justify-center text-lg shrink-0">
								🏢
							</div>
							<div>
								<div class="flex items-center gap-2">
									<h3 class="text-base font-extrabold text-stone-900">{item.offer.buyerCompany}</h3>
									<span class="text-[10px] font-bold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200">
										{item.offer.buyerLocation}
									</span>
								</div>
								<div class="text-xs text-stone-500 font-medium flex items-center gap-2 mt-0.5">
									<span>Contact: {item.offer.buyerName}</span>
									<span>•</span>
									<span class="font-mono">{item.offer.buyerPhone}</span>
								</div>
							</div>
						</div>

						<div class="text-right">
							{#if item.offer.status === 'accepted'}
								<span class="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
									<CheckCircle2 class="w-3.5 h-3.5" />
									<span>{isKannada ? 'ಡೀಲ್ ಖಚಿತವಾಗಿದೆ' : 'Deal Confirmed'}</span>
								</span>
							{:else if item.offer.status === 'countered'}
								<span class="inline-flex items-center gap-1 text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
									<Clock class="w-3.5 h-3.5" />
									<span>{isKannada ? 'ಕೌಂಟರ್ ಬೆಲೆ ಕಳುಹಿಸಲಾಗಿದೆ' : `Countered: ₹${item.offer.counterPrice?.toLocaleString()}`}</span>
								</span>
							{:else if item.offer.status === 'rejected'}
								<span class="inline-flex items-center gap-1 text-xs font-bold text-rose-800 bg-rose-100 px-3 py-1 rounded-full border border-rose-300">
									<XCircle class="w-3.5 h-3.5" />
									<span>{isKannada ? 'ತಿರಸ್ಕರಿಸಲಾಗಿದೆ' : 'Declined'}</span>
								</span>
							{:else}
								<span class="inline-flex items-center gap-1 text-xs font-bold text-amber-900 bg-amber-100/80 px-3 py-1 rounded-full animate-pulse">
									<Sparkles class="w-3.5 h-3.5 text-amber-600" />
									<span>{isKannada ? 'ಹೊಸ ಆಫರ್' : 'Action Required'}</span>
								</span>
							{/if}
						</div>
					</div>

					<!-- Crop & Price Breakdown Grid -->
					<div class="grid grid-cols-1 md:grid-cols-3 gap-4 bg-stone-50 rounded-2xl p-4 border border-stone-100">
						<!-- Crop & Quantity -->
						<div>
							<span class="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
								{isKannada ? 'ಬೆಳೆ & ಪ್ರಮಾಣ' : 'Crop & Lot Size'}
							</span>
							<h4 class="text-sm font-extrabold text-stone-900 mt-0.5">
								{isKannada ? item.listing.cropKn : item.listing.cropEn}
							</h4>
							<p class="text-xs text-stone-500 font-medium">
								{item.offer.quantityRequested} {isKannada ? item.listing.unitKn : item.listing.unit}
							</p>
						</div>

						<!-- Buyer's Proposed Rate vs Asking -->
						<div>
							<span class="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
								{isKannada ? 'ಖರೀದಿದಾರರ ಬಿಡ್ ದರ' : 'Buyer\'s Proposed Rate'}
							</span>
							<div class="text-lg font-black text-emerald-800 font-mono mt-0.5">
								₹{item.offer.offerPricePerUnit.toLocaleString()}
								<span class="text-xs font-semibold text-stone-500">/ {item.listing.unit}</span>
							</div>
							<p class="text-[11px] text-stone-500 font-medium">
								{isKannada ? 'ನಿಮ್ಮ ಬೆಲೆ' : 'Your asking'}: ₹{item.listing.askingPrice.toLocaleString()}
							</p>
						</div>

						<!-- Total Payout -->
						<div>
							<span class="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
								{isKannada ? 'ನಿಮಗೆ ದೊರೆಯುವ ಒಟ್ಟು ಹಣ' : 'Total Deal Payout'}
							</span>
							<div class="text-xl font-black text-stone-900 font-mono mt-0.5">
								₹{item.offer.totalAmount.toLocaleString()}
							</div>
							<span class="text-[10px] text-emerald-700 font-bold">
								Zero middleman deductions
							</span>
						</div>
					</div>

					<!-- Buyer Message / Logistics note -->
					{#if item.offer.note}
						<div class="bg-amber-50/60 p-3.5 rounded-2xl border border-amber-200/80 text-xs text-stone-700 space-y-1">
							<span class="text-[10px] font-bold text-amber-900 uppercase tracking-wider block flex items-center gap-1">
								<MessageSquare class="w-3 h-3" />
								<span>{isKannada ? 'ಖರೀದಿದಾರರ ಟಿಪ್ಪಣಿ / ಪಿಕಪ್ ಸೌಲಭ್ಯ' : 'Buyer Pickup & Payment Note'}</span>
							</span>
							<p class="font-medium leading-relaxed italic">
								"{item.offer.note}"
							</p>
						</div>
					{/if}

					<!-- Action Buttons Row (Accept, Counter, Reject) -->
					{#if item.offer.status === 'pending' || item.offer.status === 'countered'}
						<div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-2">
							<button
								type="button"
								onclick={() => handleReject(item.offer.id)}
								class="py-2.5 px-4 rounded-xl border border-stone-200 hover:border-rose-400 text-stone-600 hover:text-rose-700 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
							>
								<XCircle class="w-4 h-4" />
								<span>{isKannada ? 'ತಿರಸ್ಕರಿಸಿ' : 'Decline Offer'}</span>
							</button>

							<button
								type="button"
								onclick={() => openCounterModal(item)}
								class="py-2.5 px-4 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
							>
								<TrendingUp class="w-4 h-4" />
								<span>{isKannada ? 'ಬೇರೆ ಬೆಲೆ ಕೇಳಿ (Counter)' : 'Make Counter Offer'}</span>
							</button>

							<button
								type="button"
								onclick={() => handleAccept(item.offer.id)}
								class="py-3 px-6 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
							>
								<CheckCircle2 class="w-4 h-4" />
								<span>{isKannada ? 'ಆಫರ್ ಒಪ್ಪಿಕೊಳ್ಳಿ (ಡೀಲ್ ಖಚಿತ)' : 'Accept Deal & Confirm'}</span>
							</button>
						</div>
					{:else if item.offer.status === 'accepted'}
						<div class="pt-2 flex justify-end">
							<a
								href="/deal-confirmed"
								class="py-2.5 px-5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs flex items-center gap-2"
							>
								<span>{isKannada ? 'ಗೇಟ್ ಪಾಸ್ & ರಸೀದಿ ವೀಕ್ಷಿಸಿ' : 'View Gate Pass & Receipt'}</span>
								<CheckCircle2 class="w-4 h-4" />
							</a>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	{:else}
		<div class="bg-white rounded-3xl p-12 text-center border border-stone-200 max-w-md mx-auto my-8">
			<div class="text-4xl mb-3">📬</div>
			<h3 class="text-base font-bold text-stone-900">
				{isKannada ? 'ಯಾವುದೇ ಹೊಸ ಆಫರ್‌ಗಳಿಲ್ಲ' : 'No active offers right now'}
			</h3>
			<p class="text-xs text-stone-500 mt-1 mb-4">
				{isKannada ? 'ಖರೀದಿದಾರರು ನಿಮ್ಮ ಬೆಳೆಯನ್ನು ವೀಕ್ಷಿಸುತ್ತಿದ್ದಾರೆ.' : 'As buyers browse and place bids, they will show up here.'}
			</p>
			<a href="/farmer" class="py-2 px-4 rounded-xl bg-emerald-800 text-white font-bold text-xs inline-block">
				{isKannada ? 'ರೈತರ ಹಬ್‌ಗೆ ಹಿಂತಿರುಗಿ' : 'Go to Dashboard'}
			</a>
		</div>
	{/if}

	<!-- Counter Offer Modal -->
	<Modal
		isOpen={isCounterModalOpen}
		title={isKannada ? 'ಕೌಂಟರ್ ಬೆಲೆ ಪ್ರಸ್ತಾಪಿಸಿ' : 'Propose Counter Rate to Buyer'}
		subtitle={isKannada ? 'ಖರೀದಿದಾರರಿಗೆ ನಿಮ್ಮ ಸಮಂಜಸವಾದ ಹೊಸ ದರವನ್ನು ಕಳುಹಿಸಿ' : 'Send your revised price proposal to Coastal Spices'}
		onClose={() => (isCounterModalOpen = false)}
	>
		{#if selectedOfferForCounter}
			<div class="space-y-5">
				<div class="bg-stone-50 rounded-2xl p-4 border border-stone-200 text-xs text-stone-600 space-y-1">
					<div class="flex items-center justify-between">
						<span>{isKannada ? 'ಖರೀದಿದಾರರು ನೀಡಿದ ಬೆಲೆ' : 'Buyer Proposed'}:</span>
						<strong class="text-stone-900 font-mono">₹{selectedOfferForCounter.offer.offerPricePerUnit.toLocaleString()}</strong>
					</div>
					<div class="flex items-center justify-between">
						<span>{isKannada ? 'ನಿಮ್ಮ ಆರಂಭಿಕ ಬೆಲೆ' : 'Original Asking'}:</span>
						<strong class="text-stone-900 font-mono">₹{selectedOfferForCounter.listing.askingPrice.toLocaleString()}</strong>
					</div>
				</div>

				<div>
					<label class="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
						{isKannada ? 'ನಿಮ್ಮ ಹೊಸ ಕೌಂಟರ್ ಬೆಲೆ (₹)' : 'Your Counter Price (₹)'}
					</label>
					<div class="relative flex items-center">
						<span class="absolute left-4 text-lg font-bold text-stone-400">₹</span>
						<input
							type="number"
							bind:value={counterPriceInput}
							class="w-full py-3.5 pl-9 pr-4 text-xl font-black text-emerald-800 rounded-2xl border-2 border-stone-300 focus:border-emerald-600 focus:outline-hidden font-mono"
						/>
					</div>
				</div>

				<div class="flex items-center justify-end gap-2 pt-2">
					<button
						type="button"
						onclick={() => (isCounterModalOpen = false)}
						class="py-2.5 px-4 rounded-xl text-stone-600 hover:text-stone-900 text-xs font-semibold"
					>
						Cancel
					</button>

					<button
						type="button"
						onclick={submitCounter}
						class="py-2.5 px-5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
					>
						<Send class="w-3.5 h-3.5" />
						<span>{isKannada ? 'ಹೊಸ ದರ ರವಾನಿಸಿ' : 'Send Counter Proposal'}</span>
					</button>
				</div>
			</div>
		{/if}
	</Modal>
</div>
