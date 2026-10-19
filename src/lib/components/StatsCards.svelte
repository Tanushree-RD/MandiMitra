<script lang="ts">
	import { language, listings } from '#lib/stores/appStore';
	import { IndianRupee, Sprout, MessageSquareText, TrendingUp } from '@lucide/svelte';

	let isKannada = $derived($language === 'kn');

	let totalListingsCount = $derived($listings.length);
	let totalOffersCount = $derived(
		$listings.reduce((sum, item) => sum + (item.offers ? item.offers.length : 0), 0)
	);
	let estimatedValue = $derived(
		$listings.reduce((sum, item) => sum + item.askingPrice * item.quantity, 0)
	);

	function formatCurrency(num: number): string {
		if (num >= 10000000) return `₹${(num / 10000000).toFixed(1)} Cr`;
		if (num >= 100000) return `₹${(num / 100000).toFixed(1)} Lakh`;
		return `₹${num.toLocaleString()}`;
	}
</script>

<div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
	<!-- Card 1: Estimated Value -->
	<div class="bg-gradient-to-br from-emerald-800 to-emerald-950 text-white rounded-3xl p-4 md:p-5 shadow-xs relative overflow-hidden flex flex-col justify-between">
		<div class="absolute -right-3 -bottom-3 text-emerald-700/20 pointer-events-none">
			<IndianRupee class="w-24 h-24 stroke-[1.2]" />
		</div>
		<div class="flex items-center justify-between mb-3 relative z-10">
			<span class="text-xs font-semibold text-emerald-200/90 uppercase tracking-wider">
				{isKannada ? 'ಅಂದಾಜು ಮೌಲ್ಯ' : 'Farm Portfolio'}
			</span>
			<div class="w-8 h-8 rounded-xl bg-emerald-700/60 flex items-center justify-center text-emerald-100">
				<IndianRupee class="w-4 h-4" />
			</div>
		</div>
		<div class="relative z-10">
			<div class="text-xl md:text-2xl font-extrabold tracking-tight">
				{formatCurrency(estimatedValue)}
			</div>
			<p class="text-[11px] text-emerald-300 font-medium mt-0.5">
				{isKannada ? 'ನೇರ ಮಾರಾಟದ ಮೌಲ್ಯ' : 'Direct trade value'}
			</p>
		</div>
	</div>

	<!-- Card 2: Active Crops -->
	<div class="bg-white rounded-3xl p-4 md:p-5 border border-stone-200/80 shadow-2xs flex flex-col justify-between">
		<div class="flex items-center justify-between mb-3">
			<span class="text-xs font-semibold text-stone-500 uppercase tracking-wider">
				{isKannada ? 'ಸಕ್ರಿಯ ಬೆಳೆಗಳು' : 'Active Crops'}
			</span>
			<div class="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
				<Sprout class="w-4 h-4" />
			</div>
		</div>
		<div>
			<div class="text-xl md:text-2xl font-extrabold text-stone-900 tracking-tight">
				{totalListingsCount}
			</div>
			<p class="text-[11px] text-teal-700 font-semibold mt-0.5 flex items-center gap-1">
				<span>100% {isKannada ? 'ಲೈವ್ ಮಾರುಕಟ್ಟೆಯಲ್ಲಿ' : 'Live on Mandi'}</span>
			</p>
		</div>
	</div>

	<!-- Card 3: Pending Offers -->
	<div class="bg-white rounded-3xl p-4 md:p-5 border border-stone-200/80 shadow-2xs flex flex-col justify-between">
		<div class="flex items-center justify-between mb-3">
			<span class="text-xs font-semibold text-stone-500 uppercase tracking-wider">
				{isKannada ? 'ಬಂದಿರುವ ಆಫರ್‌ಗಳು' : 'Buyer Bids'}
			</span>
			<div class="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
				<MessageSquareText class="w-4 h-4" />
			</div>
		</div>
		<div>
			<div class="text-xl md:text-2xl font-extrabold text-stone-900 tracking-tight flex items-baseline gap-2">
				<span>{totalOffersCount}</span>
				<span class="text-xs font-semibold text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded-full">
					{isKannada ? 'ಹೊಸದು' : 'New'}
				</span>
			</div>
			<p class="text-[11px] text-stone-500 font-medium mt-0.5">
				{isKannada ? 'ಖರೀದಿದಾರರಿಂದ ಬಿಡ್' : 'Awaiting confirmation'}
			</p>
		</div>
	</div>

	<!-- Card 4: Middleman Savings -->
	<div class="bg-white rounded-3xl p-4 md:p-5 border border-stone-200/80 shadow-2xs flex flex-col justify-between">
		<div class="flex items-center justify-between mb-3">
			<span class="text-xs font-semibold text-stone-500 uppercase tracking-wider">
				{isKannada ? 'ಉಳಿತಾಯ / ಹೆಚ್ಚುವರಿ' : 'Farmer Gain'}
			</span>
			<div class="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
				<TrendingUp class="w-4 h-4" />
			</div>
		</div>
		<div>
			<div class="text-xl md:text-2xl font-extrabold text-emerald-700 tracking-tight">
				+8.4%
			</div>
			<p class="text-[11px] text-stone-500 font-medium mt-0.5">
				{isKannada ? 'ದಲ್ಲಾಳಿ ರಹಿತ ಹೆಚ್ಚುವರಿ' : 'vs commission agents'}
			</p>
		</div>
	</div>
</div>
