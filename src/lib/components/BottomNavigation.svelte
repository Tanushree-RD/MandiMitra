<script lang="ts">
	import { language, userRole, setRole, listings } from '#lib/stores/appStore';
	import { page } from '$app/state';
	import { Home, ShoppingBag, Plus, MessageSquare, User, TrendingUp, RefreshCw, Sprout } from '@lucide/svelte';

	let isKannada = $derived($language === 'kn');
	let currentRole = $derived($userRole);
	let currentPath = $derived(page.url.pathname);

	let pendingOffersCount = $derived(
		$listings.reduce((sum, item) => sum + (item.offers ? item.offers.filter(o => o.status === 'pending').length : 0), 0)
	);
</script>

<nav class="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-xl border-t border-stone-200/90 py-1.5 px-3 shadow-lg">
	<div class="flex items-center justify-around">
		{#if currentRole === 'farmer'}
			<!-- Farmer Nav Items -->
			<a
				href="/farmer"
				class="flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl transition-colors {currentPath === '/farmer' ? 'text-emerald-800 font-bold' : 'text-stone-500'}"
			>
				<Home class="w-5 h-5" />
				<span class="text-[10px] tracking-tight">{isKannada ? 'ಮುಖಪುಟ' : 'Dashboard'}</span>
			</a>

			<a
				href="/buyer"
				class="flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl transition-colors {currentPath.startsWith('/buyer') ? 'text-emerald-800 font-bold' : 'text-stone-500'}"
			>
				<ShoppingBag class="w-5 h-5" />
				<span class="text-[10px] tracking-tight">{isKannada ? 'ಮಾರುಕಟ್ಟೆ' : 'Market'}</span>
			</a>

			<!-- Elevated Add Crop Center Action -->
			<a
				href="/farmer/add"
				class="flex flex-col items-center -mt-5 group"
			>
				<div class="w-12 h-12 rounded-full bg-emerald-800 text-white flex items-center justify-center shadow-lg shadow-emerald-800/30 group-active:scale-95 transition-transform ring-4 ring-white">
					<Plus class="w-6 h-6 stroke-[2.5]" />
				</div>
				<span class="text-[10px] font-bold text-emerald-900 mt-1">{isKannada ? 'ಬೆಳೆ ಹಾಕಿ' : 'Sell Crop'}</span>
			</a>

			<a
				href="/farmer/offers"
				class="relative flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl transition-colors {currentPath === '/farmer/offers' ? 'text-emerald-800 font-bold' : 'text-stone-500'}"
			>
				<MessageSquare class="w-5 h-5" />
				<span class="text-[10px] tracking-tight">{isKannada ? 'ಆಫರ್‌ಗಳು' : 'Offers'}</span>
				{#if pendingOffersCount > 0}
					<span class="absolute top-0 right-2 w-4 h-4 rounded-full bg-amber-500 text-stone-950 text-[9px] font-extrabold flex items-center justify-center">
						{pendingOffersCount}
					</span>
				{/if}
			</a>

			<a
				href="/login"
				class="flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl transition-colors {currentPath === '/login' ? 'text-emerald-800 font-bold' : 'text-stone-500'}"
			>
				<User class="w-5 h-5" />
				<span class="text-[10px] tracking-tight">{isKannada ? 'ಪ್ರೊಫೈಲ್' : 'Profile'}</span>
			</a>
		{:else}
			<!-- Buyer Nav Items -->
			<a
				href="/buyer"
				class="flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl transition-colors {currentPath.startsWith('/buyer') ? 'text-emerald-800 font-bold' : 'text-stone-500'}"
			>
				<ShoppingBag class="w-5 h-5" />
				<span class="text-[10px] tracking-tight">{isKannada ? 'ಉತ್ಪನ್ನಗಳು' : 'Browse'}</span>
			</a>

			<a
				href="/farmer"
				class="flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl transition-colors {currentPath === '/farmer' ? 'text-emerald-800 font-bold' : 'text-stone-500'}"
			>
				<TrendingUp class="w-5 h-5" />
				<span class="text-[10px] tracking-tight">{isKannada ? 'ಮಂಡಿ ದರ' : 'Mandi Rates'}</span>
			</a>

			<a
				href="/farmer/offers"
				class="relative flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl transition-colors {currentPath === '/farmer/offers' ? 'text-emerald-800 font-bold' : 'text-stone-500'}"
			>
				<MessageSquare class="w-5 h-5" />
				<span class="text-[10px] tracking-tight">{isKannada ? 'ನನ್ನ ಬಿಡ್‌ಗಳು' : 'My Bids'}</span>
				{#if pendingOffersCount > 0}
					<span class="absolute top-0 right-2 w-4 h-4 rounded-full bg-amber-500 text-stone-950 text-[9px] font-extrabold flex items-center justify-center">
						{pendingOffersCount}
					</span>
				{/if}
			</a>

			<a
				href="/login"
				class="flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl transition-colors {currentPath === '/login' ? 'text-emerald-800 font-bold' : 'text-stone-500'}"
			>
				<User class="w-5 h-5" />
				<span class="text-[10px] tracking-tight">{isKannada ? 'ಪ್ರೊಫೈಲ್' : 'Profile'}</span>
			</a>
		{/if}
	</div>
</nav>
