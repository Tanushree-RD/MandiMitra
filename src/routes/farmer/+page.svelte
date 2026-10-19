<script lang="ts">
	import { language, listings, mandiPrices, selectedListingId } from '#lib/stores/appStore';
	import StatsCards from '#lib/components/StatsCards.svelte';
	import FloatingActionButton from '#lib/components/FloatingActionButton.svelte';
	import PriceComparisonBadge from '#lib/components/PriceComparisonBadge.svelte';
	import { goto } from '$app/navigation';
	import {
		Plus,
		TrendingUp,
		ArrowUpRight,
		Clock,
		MapPin,
		MessageSquare,
		CheckCircle2,
		ShieldCheck,
		ChevronRight,
		Calendar,
		Building2,
		Sparkles
	} from '@lucide/svelte';

	let isKannada = $derived($language === 'kn');
	let allListings = $derived($listings);
	let prices = $derived($mandiPrices);

	// Farmer's own listings (or demo user's crops)
	let myCrops = $derived(allListings.filter((l) => l.isOwnListing));

	// Collect offers specifically for the farmer
	let incomingOffers = $derived.by(() => {
		const list: { offer: any; listing: any }[] = [];
		for (const l of allListings) {
			if (l.isOwnListing && l.offers) {
				for (const o of l.offers) {
					list.push({ offer: o, listing: l });
				}
			}
		}
		return list;
	});

	function goToAddProduce() {
		goto('/farmer/add');
	}

	function goToOffers() {
		goto('/farmer/offers');
	}

	function handleViewListing(id: string) {
		selectedListingId.set(id);
		goto('/buyer/crop');
	}
</script>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
	<!-- Greeting Header Banner -->
	<div class="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border border-emerald-700/50">
		<div class="absolute -right-8 -top-8 w-44 h-44 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>

		<div class="space-y-2">
			<div class="inline-flex items-center gap-1.5 bg-emerald-700/60 text-emerald-100 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30">
				<ShieldCheck class="w-3.5 h-3.5 text-emerald-300" />
				<span>{isKannada ? 'ದೃಢೀಕೃತ ಎಪಿಎಂಸಿ ರೈತ' : 'Verified APMC Farmer #KA-DK-8912'}</span>
			</div>
			<h1 class="text-2xl sm:text-3xl font-black tracking-tight">
				{isKannada ? 'ನಮಸ್ಕಾರ, ಮಂಜುನಾಥ ಗೌಡ' : 'Namaskara, Manjunath Gowda'}
			</h1>
			<p class="text-xs sm:text-sm text-emerald-200/90 font-medium flex items-center gap-2">
				<MapPin class="w-4 h-4 text-emerald-300 shrink-0" />
				<span>Puttur Taluk, Dakshina Kannada • Gowda Plantation</span>
			</p>
		</div>

		<div class="flex items-center gap-3">
			<button
				type="button"
				onclick={goToAddProduce}
				class="bg-white hover:bg-emerald-50 text-emerald-950 font-bold px-5 py-3 rounded-2xl shadow-lg hover:shadow-xl active:scale-95 transition-all text-xs sm:text-sm flex items-center gap-2"
			>
				<Plus class="w-4 h-4 stroke-[2.5]" />
				<span>{isKannada ? 'ಹೊಸ ಬೆಳೆ ಸೇರಿಸಿ' : 'Add New Produce'}</span>
			</button>
		</div>
	</div>

	<!-- Statistics Cards -->
	<div>
		<div class="flex items-center justify-between mb-3">
			<h2 class="text-sm font-bold text-stone-900 uppercase tracking-wider">
				{isKannada ? 'ತೋಟದ ಪ್ರಗತಿ ಮತ್ತು ಸಾರಾಂಶ' : 'Farm Portfolio & Metrics'}
			</h2>
			<span class="text-xs text-stone-500 font-medium">
				{isKannada ? 'ಲೈವ್ ಅಪ್ಡೇಟ್' : 'Real-time sync'}
			</span>
		</div>
		<StatsCards />
	</div>

	<!-- Recent Offers from Buyers Alert Section -->
	{#if incomingOffers.length > 0}
		<div class="bg-amber-50/70 rounded-3xl border border-amber-200 p-5 sm:p-6 shadow-xs">
			<div class="flex items-center justify-between mb-4">
				<div class="flex items-center gap-2.5">
					<div class="w-8 h-8 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-bold">
						<MessageSquare class="w-4 h-4" />
					</div>
					<div>
						<h2 class="text-base font-extrabold text-stone-900">
							{isKannada ? 'ಖರೀದಿದಾರರಿಂದ ಹೊಸ ಆಫರ್‌ಗಳು' : 'New Buyer Offers Received'}
						</h2>
						<p class="text-xs text-stone-600 font-medium">
							{isKannada ? 'ನೇರ ಖರೀದಿದಾರರಿಂದ ಬಿಡ್ ಬಂದಿದೆ - ಪರಿಶೀಲಿಸಿ' : 'Direct bids awaiting your decision'}
						</p>
					</div>
				</div>

				<button
					type="button"
					onclick={goToOffers}
					class="text-xs font-bold text-amber-900 hover:text-amber-950 bg-amber-100 hover:bg-amber-200/80 px-3.5 py-1.5 rounded-xl transition-colors flex items-center gap-1"
				>
					<span>{isKannada ? 'ಎಲ್ಲಾ ಆಫರ್‌ಗಳು' : 'View All'}</span>
					<ChevronRight class="w-3.5 h-3.5" />
				</button>
			</div>

			<div class="space-y-3">
				{#each incomingOffers as item}
					<div class="bg-white rounded-2xl p-4 border border-amber-200/80 shadow-2xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
						<div class="flex items-start gap-3">
							<div class="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-xs font-bold text-stone-700 shrink-0">
								🏢
							</div>
							<div>
								<div class="flex items-center gap-2 flex-wrap">
									<h4 class="text-sm font-bold text-stone-900">{item.offer.buyerCompany}</h4>
									<span class="text-[10px] font-semibold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200">
										{item.offer.buyerLocation}
									</span>
								</div>
								<p class="text-xs text-stone-500 font-medium mt-0.5">
									{isKannada ? 'ಬೆಳೆ' : 'Crop'}: <span class="font-bold text-stone-800">{isKannada ? item.listing.cropKn : item.listing.cropEn}</span>
									• {isKannada ? 'ಪ್ರಮಾಣ' : 'Qty'}: {item.offer.quantityRequested} {item.listing.unit}
								</p>
							</div>
						</div>

						<div class="flex items-center justify-between sm:justify-end gap-4 pt-2 sm:pt-0 border-t sm:border-0 border-stone-100">
							<div class="text-right">
								<span class="text-[10px] font-medium text-stone-400 block uppercase">
									{isKannada ? 'ಬಿಡ್ ದರ' : 'Offered Rate'}
								</span>
								<span class="text-lg font-extrabold text-emerald-700 font-mono">
									₹{item.offer.offerPricePerUnit.toLocaleString()}
								</span>
								<span class="text-[10px] text-stone-500 font-medium">
									/ {item.listing.unit}
								</span>
							</div>

							<button
								type="button"
								onclick={goToOffers}
								class="py-2 px-4 rounded-xl bg-stone-900 hover:bg-emerald-800 text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-xs"
							>
								<span>{isKannada ? 'ಪರಿಶೀಲಿಸಿ & ಒಪ್ಪಿಕೊಳ್ಳಿ' : 'Review & Accept'}</span>
								<ArrowUpRight class="w-3.5 h-3.5" />
							</button>
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/if}

	<!-- Today's Mandi Benchmark Rates Strip / Cards -->
	<div id="mandi-rates" class="space-y-3">
		<div class="flex items-center justify-between">
			<div>
				<h2 class="text-base font-extrabold text-stone-900">
					{isKannada ? 'ಇಂದಿನ ಅಧಿಕೃತ ಎಪಿಎಂಸಿ ಮಂಡಿ ಬೆಲೆಗಳು' : 'Today\'s Live Mandi Benchmarks'}
				</h2>
				<p class="text-xs text-stone-500 font-medium">
					{isKannada ? 'ಪುತ್ತೂರು, ಬಂಟ್ವಾಳ, ಸುಳ್ಯ ಮತ್ತು ಉಡುಪಿ ಎಪಿಎಂಸಿ ದರಗಳು' : 'Verified APMC price transparency for fair negotiation'}
				</p>
			</div>

			<span class="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full flex items-center gap-1.5">
				<Clock class="w-3.5 h-3.5 text-emerald-600" />
				<span>{isKannada ? 'ಇಂದು 06:30 AM' : 'Today 06:30 AM'}</span>
			</span>
		</div>

		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
			{#each prices as p}
				<div class="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-2xs hover:border-emerald-300 transition-colors flex items-start justify-between">
					<div class="space-y-1">
						<div class="flex items-center gap-1.5">
							<Building2 class="w-3.5 h-3.5 text-stone-400" />
							<span class="text-xs font-bold text-stone-500">{isKannada ? p.apmcKn : p.apmcEn}</span>
						</div>
						<h3 class="text-sm font-extrabold text-stone-900">
							{isKannada ? p.cropKn : p.cropEn}
						</h3>
						<div class="text-[11px] text-stone-500">
							{isKannada ? 'ಮಿತಿ' : 'Range'}: ₹{p.minPrice.toLocaleString()} - ₹{p.maxPrice.toLocaleString()}
						</div>
					</div>

					<div class="text-right">
						<div class="text-lg font-black text-stone-900 font-mono">
							₹{p.modalPrice.toLocaleString()}
						</div>
						<span class="text-[10px] font-semibold text-stone-500 block">
							/ {isKannada ? p.unitKn : p.unitEn}
						</span>
						<span class="inline-flex items-center text-[10px] font-bold mt-1 {p.changePercent >= 0 ? 'text-emerald-700 bg-emerald-50' : 'text-rose-600 bg-rose-50'} px-2 py-0.5 rounded-md">
							{p.changePercent >= 0 ? `+${p.changePercent}%` : `${p.changePercent}%`}
						</span>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Active Produce Listings of Farmer -->
	<div class="space-y-4">
		<div class="flex items-center justify-between">
			<div>
				<h2 class="text-base font-extrabold text-stone-900">
					{isKannada ? 'ಮಾರಾಟಕ್ಕಿರುವ ನಿಮ್ಮ ಬೆಳೆಗಳು' : 'Your Active Produce Listings'}
				</h2>
				<p class="text-xs text-stone-500 font-medium">
					{isKannada ? 'ಮಾರುಕಟ್ಟೆಯಲ್ಲಿ ಸಕ್ರಿಯವಾಗಿರುವ ನಿಮ್ಮ ಕೃಷಿ ಉತ್ಪನ್ನಗಳು' : 'Manage your listed harvests and track buyer views'}
				</p>
			</div>

			<button
				type="button"
				onclick={goToAddProduce}
				class="text-xs font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-xl border border-emerald-200 transition-colors flex items-center gap-1"
			>
				<Plus class="w-3.5 h-3.5 stroke-[2.5]" />
				<span>{isKannada ? 'ಬೆಳೆ ಸೇರಿಸಿ' : 'Add Harvest'}</span>
			</button>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
			{#each myCrops as crop}
				<div
					class="bg-white rounded-3xl border border-stone-200/90 shadow-xs hover:shadow-lg transition-all overflow-hidden flex flex-col justify-between cursor-pointer group"
					onclick={() => handleViewListing(crop.id)}
					role="button"
					tabindex="0"
					onkeydown={(e) => e.key === 'Enter' && handleViewListing(crop.id)}
				>
					<div>
						<!-- Crop Image -->
						<div class="relative h-44 w-full overflow-hidden bg-stone-100">
							<img src={crop.image} alt={crop.cropEn} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
							<div class="absolute top-3 left-3 flex items-center gap-1.5">
								<PriceComparisonBadge grade={crop.fairPriceGrade} diffPercent={crop.mandiDiffPercent} size="sm" />
							</div>
							<div class="absolute bottom-3 right-3 bg-black/70 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full backdrop-blur-xs">
								{crop.quantity} {isKannada ? crop.unitKn : crop.unit}
							</div>
						</div>

						<div class="p-5">
							<h3 class="text-base font-bold text-stone-900 group-hover:text-emerald-800 transition-colors">
								{isKannada ? crop.cropKn : crop.cropEn}
							</h3>
							<p class="text-xs text-stone-500 font-medium mt-0.5">
								{isKannada ? crop.cropEn : crop.cropKn}
							</p>

							<div class="mt-4 bg-stone-50 p-3 rounded-2xl flex items-center justify-between border border-stone-100">
								<div>
									<span class="text-[10px] text-stone-400 block uppercase font-bold">{isKannada ? 'ನಿಮ್ಮ ಬೆಲೆ' : 'Asking Price'}</span>
									<span class="text-lg font-extrabold text-emerald-800 font-mono">₹{crop.askingPrice.toLocaleString()}</span>
								</div>
								<div class="text-right">
									<span class="text-[10px] text-stone-400 block uppercase font-bold">{isKannada ? 'ಮಂಡಿ ಬೆಲೆ' : 'Mandi Rate'}</span>
									<span class="text-xs font-bold text-stone-700 font-mono">₹{crop.mandiPrice.toLocaleString()}</span>
								</div>
							</div>
						</div>
					</div>

					<div class="px-5 pb-5 pt-2 flex items-center justify-between border-t border-stone-100 text-xs">
						<span class="text-stone-500 font-medium">
							{crop.offers.length} {isKannada ? 'ಆಫರ್‌ಗಳು' : 'buyer bids'}
						</span>

						<span class="font-bold text-emerald-800 flex items-center gap-1 group-hover:underline">
							<span>{isKannada ? 'ವಿವರ ವೀಕ್ಷಿಸಿ' : 'View Listing'}</span>
							<ChevronRight class="w-3.5 h-3.5" />
						</span>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Floating Action Button -->
	<FloatingActionButton onClick={goToAddProduce} />
</div>
