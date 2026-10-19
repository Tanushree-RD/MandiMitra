<script lang="ts">
	import { language, selectedListingId } from '#lib/stores/appStore';
	import type { ProduceListing } from '#lib/types';
	import PriceComparisonBadge from './PriceComparisonBadge.svelte';
	import { MapPin, UserCheck, ShieldCheck, ArrowRight, MessageSquare, Scale } from '@lucide/svelte';

	interface Props {
		listing: ProduceListing;
		onSelect?: (listing: ProduceListing) => void;
	}

	let { listing, onSelect }: Props = $props();

	let isKannada = $derived($language === 'kn');

	function handleClick() {
		selectedListingId.set(listing.id);
		if (onSelect) onSelect(listing);
	}
</script>

<div
	class="group bg-white rounded-3xl border border-stone-200/90 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all duration-300 overflow-hidden flex flex-col cursor-pointer"
	onclick={handleClick}
	role="button"
	tabindex="0"
	onkeydown={(e) => e.key === 'Enter' && handleClick()}
>
	<!-- Image Header -->
	<div class="relative h-48 sm:h-52 w-full overflow-hidden bg-stone-100">
		<img
			src={listing.image}
			alt={listing.cropEn}
			class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
			loading="lazy"
		/>
		<div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10"></div>

		<!-- Top Badges -->
		<div class="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
			<div class="flex items-center gap-1.5 flex-wrap">
				<PriceComparisonBadge grade={listing.fairPriceGrade} diffPercent={listing.mandiDiffPercent} size="sm" />
				{#if listing.organicCertified}
					<span class="inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-950/80 text-emerald-200 backdrop-blur-md px-2 py-0.5 rounded-full border border-emerald-500/30">
						🌿 {isKannada ? 'ಸಾವಯವ' : 'Organic'}
					</span>
				{/if}
			</div>

			<span class="text-[11px] font-semibold bg-black/60 text-stone-200 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/20">
				{listing.quantity} {isKannada ? listing.unitKn : listing.unit}
			</span>
		</div>

		<!-- Bottom overlay info -->
		<div class="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
			<div class="flex items-center gap-1 text-xs text-stone-200 font-medium drop-shadow-sm">
				<MapPin class="w-3.5 h-3.5 text-emerald-400 shrink-0" />
				<span class="truncate">{listing.taluk}</span>
				<span class="opacity-60">•</span>
				<span>{listing.distanceKm} km</span>
			</div>
			{#if listing.offers.length > 0}
				<span class="text-[11px] font-semibold bg-amber-500/90 text-stone-950 px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1">
					<MessageSquare class="w-3 h-3" />
					<span>{listing.offers.length} {isKannada ? 'ಆಫರ್‌ಗಳು' : 'bids'}</span>
				</span>
			{/if}
		</div>
	</div>

	<!-- Content Body -->
	<div class="p-5 flex-1 flex flex-col justify-between">
		<div>
			<!-- Crop Titles -->
			<div class="mb-2">
				<h3 class="text-lg font-bold text-stone-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
					{isKannada ? listing.cropKn : listing.cropEn}
				</h3>
				<p class="text-xs text-stone-500 font-medium">
					{isKannada ? listing.cropEn : listing.cropKn}
				</p>
			</div>

			<!-- Farmer Info -->
			<div class="flex items-center gap-2 py-2 border-y border-stone-100 mb-3">
				<div class="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold shrink-0">
					{listing.farmerName.charAt(0)}
				</div>
				<div class="min-w-0 flex-1 flex items-center gap-1">
					<span class="text-xs font-semibold text-stone-700 truncate">{listing.farmerName}</span>
					<ShieldCheck class="w-3.5 h-3.5 text-emerald-600 shrink-0" title="APMC Verified Farmer" />
				</div>
				<span class="text-[10px] text-stone-400 shrink-0">
					{listing.harvestDate}
				</span>
			</div>
		</div>

		<!-- Pricing Section -->
		<div>
			<div class="bg-stone-50 rounded-2xl p-3 border border-stone-100 flex items-baseline justify-between mb-4">
				<div>
					<span class="block text-[11px] font-medium text-stone-500">
						{isKannada ? 'ರೈತರ ಬೆಲೆ' : 'Asking Price'}
					</span>
					<div class="flex items-baseline gap-1">
						<span class="text-xl font-extrabold text-emerald-700 tracking-tight">
							₹{listing.askingPrice.toLocaleString()}
						</span>
						<span class="text-xs font-medium text-stone-500">
							/ {isKannada ? listing.unitKn : listing.unit}
						</span>
					</div>
				</div>

				<div class="text-right">
					<span class="block text-[10px] font-medium text-stone-500">
						{isKannada ? 'ಮಂಡಿ ಬೆಲೆ' : 'Mandi Rate'}
					</span>
					<span class="text-xs font-bold text-stone-700 font-mono">
						₹{listing.mandiPrice.toLocaleString()}
					</span>
				</div>
			</div>

			<!-- CTA Button -->
			<div class="w-full py-2.5 px-4 rounded-xl bg-stone-900 group-hover:bg-emerald-700 text-white font-semibold text-xs transition-colors duration-200 flex items-center justify-center gap-2 shadow-xs">
				<span>{isKannada ? 'ವಿವರ ಮತ್ತು ಆಫರ್ ನೀಡಿ' : 'View Details & Offer'}</span>
				<ArrowRight class="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
			</div>
		</div>
	</div>
</div>
