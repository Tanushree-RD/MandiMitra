<script lang="ts">
	import { language, listings, selectedListingId } from '#lib/stores/appStore';
	import type { ProduceListing } from '#lib/types';
	import SearchBar from '#lib/components/SearchBar.svelte';
	import FilterChips from '#lib/components/FilterChips.svelte';
	import ProduceCard from '#lib/components/ProduceCard.svelte';
	import { goto } from '$app/navigation';
	import { ShoppingBag, ArrowUpDown, SlidersHorizontal, Sparkles, MapPin, ShieldCheck } from '@lucide/svelte';

	let isKannada = $derived($language === 'kn');
	let allListings = $derived($listings);

	// Filtering & Searching State
	let searchQuery = $state('');
	let selectedTaluk = $state('all');
	let selectedCategory = $state('all');
	let sortBy = $state<'distance' | 'price_low' | 'price_high' | 'mandi_diff'>('distance');
	let fairPriceOnly = $state(false);

	let filteredListings = $derived.by(() => {
		let list = [...allListings];

		// Search Query Filter
		if (searchQuery.trim()) {
			const q = searchQuery.toLowerCase().trim();
			list = list.filter(
				(item) =>
					item.cropEn.toLowerCase().includes(q) ||
					item.cropKn.includes(q) ||
					item.farmerName.toLowerCase().includes(q) ||
					item.taluk.toLowerCase().includes(q)
			);
		}

		// Taluk Filter
		if (selectedTaluk !== 'all') {
			list = list.filter((item) => item.taluk.toLowerCase() === selectedTaluk.toLowerCase());
		}

		// Category Filter
		if (selectedCategory !== 'all') {
			list = list.filter((item) => item.category === selectedCategory);
		}

		// Fair price only filter
		if (fairPriceOnly) {
			list = list.filter((item) => item.fairPriceGrade === 'fair' || item.fairPriceGrade === 'great_deal');
		}

		// Sorting
		if (sortBy === 'distance') {
			list.sort((a, b) => a.distanceKm - b.distanceKm);
		} else if (sortBy === 'price_low') {
			list.sort((a, b) => a.askingPrice - b.askingPrice);
		} else if (sortBy === 'price_high') {
			list.sort((a, b) => b.askingPrice - a.askingPrice);
		} else if (sortBy === 'mandi_diff') {
			list.sort((a, b) => a.mandiDiffPercent - b.mandiDiffPercent);
		}

		return list;
	});

	function handleSelectListing(listing: ProduceListing) {
		selectedListingId.set(listing.id);
		goto('/buyer/crop');
	}
</script>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 space-y-6">
	<!-- Top Hero Header for Buyer -->
	<div class="bg-gradient-to-r from-stone-900 via-stone-800 to-stone-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center md:justify-between gap-6 border border-stone-800">
		<div class="space-y-2 max-w-2xl">
			<div class="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30">
				<ShieldCheck class="w-3.5 h-3.5" />
				<span>{isKannada ? 'ದೃಢೀಕೃತ ಕೃಷಿ ಮಾರುಕಟ್ಟೆ' : 'Direct Karnataka Farm-gate Sourcing'}</span>
			</div>
			<h1 class="text-2xl sm:text-3xl font-black tracking-tight">
				{isKannada ? 'ಕರ್ನಾಟಕದ ನೇರ ರೈತ ಉತ್ಪನ್ನಗಳು' : 'Karnataka Farm-Direct Produce'}
			</h1>
			<p class="text-xs sm:text-sm text-stone-400 font-medium leading-relaxed">
				{isKannada
					? 'ಪುತ್ತೂರು, ಬಂಟ್ವಾಳ, ಬೆಳ್ತಂಗಡಿ, ಸುಳ್ಯದ ರೈತರಿಂದ ನೇರವಾಗಿ ತಾಜಾ ಅಡಿಕೆ, ತೆಂಗು, ಮೆಣಸು ಮತ್ತು ಧಾನ್ಯಗಳನ್ನು ಖರೀದಿಸಿ.'
					: 'Source fresh harvests directly from verified APMC farmers with full price transparency and zero intermediary margins.'}
			</p>
		</div>

		<!-- Quick badge count -->
		<div class="bg-stone-800/80 rounded-2xl p-4 border border-stone-700 text-center shrink-0">
			<span class="text-2xl font-black text-emerald-400 block font-mono">{filteredListings.length}</span>
			<span class="text-[11px] text-stone-300 font-medium uppercase tracking-wider">
				{isKannada ? 'ಲಭ್ಯವಿರುವ ಬೆಳೆಗಳು' : 'Active Lots'}
			</span>
		</div>
	</div>

	<!-- Search & Sort Row -->
	<div class="space-y-3">
		<div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
			<div class="flex-1">
				<SearchBar bind:query={searchQuery} />
			</div>

			<!-- Sort dropdown -->
			<div class="flex items-center gap-2 shrink-0">
				<div class="relative flex items-center bg-white rounded-2xl border border-stone-200/90 shadow-2xs px-3 py-2.5">
					<ArrowUpDown class="w-4 h-4 text-stone-400 mr-2 shrink-0" />
					<select
						bind:value={sortBy}
						class="text-xs font-bold text-stone-800 bg-transparent focus:outline-hidden cursor-pointer"
					>
						<option value="distance">{isKannada ? 'ಸಮೀಪದ ಬೆಳೆಗಳು' : 'Nearest to Me'}</option>
						<option value="mandi_diff">{isKannada ? 'ಮಂಡಿ ಬೆಲೆಗೆ ಉತ್ತಮ' : 'Best Value vs Mandi'}</option>
						<option value="price_low">{isKannada ? 'ಕಡಿಮೆ ಬೆಲೆಯಿಂದ' : 'Price: Low to High'}</option>
						<option value="price_high">{isKannada ? 'ಹೆಚ್ಚು ಬೆಲೆಯಿಂದ' : 'Price: High to Low'}</option>
					</select>
				</div>
			</div>
		</div>

		<!-- Filter Chips (Taluks & Categories) -->
		<div class="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-2xs">
			<FilterChips bind:selectedTaluk bind:selectedCategory />
		</div>
	</div>

	<!-- Results Info Bar -->
	<div class="flex items-center justify-between text-xs text-stone-500 font-medium px-1">
		<span>
			{isKannada
				? `${filteredListings.length} ಬೆಳೆಗಳ ಪಟ್ಟಿ ದೊರೆತಿದೆ`
				: `Showing ${filteredListings.length} farm-direct listings`}
		</span>

		<button
			type="button"
			onclick={() => (fairPriceOnly = !fairPriceOnly)}
			class="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border transition-all {fairPriceOnly ? 'bg-emerald-100 text-emerald-900 border-emerald-300' : 'text-stone-600 border-stone-200'}"
		>
			<Sparkles class="w-3.5 h-3.5 text-emerald-600" />
			<span>{isKannada ? 'ನ್ಯಾಯಯುತ ದರ ಮಾತ್ರ' : 'Fair Price Only'}</span>
		</button>
	</div>

	<!-- Produce Cards Grid -->
	{#if filteredListings.length > 0}
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each filteredListings as listing (listing.id)}
				<ProduceCard {listing} onSelect={handleSelectListing} />
			{/each}
		</div>
	{:else}
		<div class="bg-white rounded-3xl p-12 text-center border border-stone-200 max-w-md mx-auto my-8">
			<div class="text-4xl mb-3">🌾</div>
			<h3 class="text-base font-bold text-stone-900">
				{isKannada ? 'ಯಾವುದೇ ಬೆಳೆ ಕಂಡುಬಂದಿಲ್ಲ' : 'No produce found'}
			</h3>
			<p class="text-xs text-stone-500 mt-1 mb-4">
				{isKannada
					? 'ಬೇರೆ ತಾಲೂಕು ಅಥವಾ ಬೆಳೆಯ ಹೆಸರನ್ನು ಹುಡುಕಿ ನೋಡಿ.'
					: 'Try adjusting your search terms or clearing taluk filters.'}
			</p>
			<button
				type="button"
				onclick={() => {
					searchQuery = '';
					selectedTaluk = 'all';
					selectedCategory = 'all';
				}}
				class="py-2 px-4 rounded-xl bg-emerald-800 text-white font-bold text-xs"
			>
				{isKannada ? 'ಫಿಲ್ಟರ್ ತೆರವುಗೊಳಿಸಿ' : 'Clear All Filters'}
			</button>
		</div>
	{/if}
</div>
