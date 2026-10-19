<script lang="ts">
	import { language, userRole, setRole, listings, isAuthenticated, mockLogout } from '#lib/stores/appStore';
	import LanguageSwitch from './LanguageSwitch.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { Sprout, Bell, User, ArrowRightLeft, ShieldCheck, LogOut, PlusCircle } from '@lucide/svelte';

	let isKannada = $derived($language === 'kn');
	let currentRole = $derived($userRole);
	let currentPath = $derived(page.url.pathname);

	let pendingOffersCount = $derived(
		$listings.reduce((sum, item) => sum + (item.offers ? item.offers.filter(o => o.status === 'pending').length : 0), 0)
	);

	function handleSwitchRole() {
		if ($userRole === 'farmer') {
			setRole('buyer');
			goto('/buyer');
		} else {
			setRole('farmer');
			goto('/farmer');
		}
	}
</script>

<header class="sticky top-8 md:top-8 z-40 bg-white/90 backdrop-blur-xl border-b border-stone-200/80 transition-all">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between h-16">
			<!-- Logo & Brand -->
			<a href="/" class="flex items-center gap-2.5 group">
				<div class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-800 to-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform duration-200">
					<Sprout class="w-6 h-6 stroke-[2.2]" />
				</div>
				<div>
					<div class="flex items-baseline gap-1.5">
						<span class="text-lg md:text-xl font-extrabold text-stone-900 tracking-tight group-hover:text-emerald-800 transition-colors">
							{isKannada ? 'ಮಂಡಿಮಿತ್ರ' : 'MandiMitra'}
						</span>
						<span class="hidden sm:inline text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
							{isKannada ? 'ನೇರ ಮಾರುಕಟ್ಟೆ' : 'Farmer-Direct'}
						</span>
					</div>
					<p class="text-[10px] text-stone-500 font-medium -mt-0.5 hidden xs:block">
						{isKannada ? 'ಕರ್ನಾಟಕ ಎಪಿಎಂಸಿ ಜೋಡಿತ ವೇದಿಕೆ' : 'Karnataka APMC Linked'}
					</p>
				</div>
			</a>

			<!-- Navigation Links (Desktop) -->
			<nav class="hidden md:flex items-center gap-1 bg-stone-100/70 p-1 rounded-2xl border border-stone-200/60">
				<a
					href="/"
					class="px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-colors {currentPath === '/' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'}"
				>
					{isKannada ? 'ಮುಖಪುಟ' : 'Home'}
				</a>

				<a
					href="/farmer"
					class="px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-colors {currentPath.startsWith('/farmer') && currentPath !== '/farmer/offers' ? 'bg-white text-emerald-800 shadow-xs' : 'text-stone-600 hover:text-stone-900'}"
				>
					{isKannada ? 'ರೈತರ ಹಬ್' : 'Farmer Hub'}
				</a>

				<a
					href="/buyer"
					class="px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-colors {currentPath.startsWith('/buyer') ? 'bg-white text-emerald-800 shadow-xs' : 'text-stone-600 hover:text-stone-900'}"
				>
					{isKannada ? 'ಖರೀದಿದಾರರ ಮಾರುಕಟ್ಟೆ' : 'Buyer Market'}
				</a>

				<a
					href="/farmer/offers"
					class="relative px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-colors {currentPath === '/farmer/offers' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'}"
				>
					<span>{isKannada ? 'ಆಫರ್‌ಗಳು' : 'Offers'}</span>
					{#if pendingOffersCount > 0}
						<span class="ml-1 inline-flex items-center justify-center px-1.5 py-0.2 text-[10px] font-bold text-white bg-amber-600 rounded-full">
							{pendingOffersCount}
						</span>
					{/if}
				</a>
			</nav>

			<!-- Right Actions: Language Switch + Role Switch + Notifications -->
			<div class="flex items-center gap-2 sm:gap-3">
				<!-- Language Switch -->
				<LanguageSwitch />

				<!-- Role Switcher Pill -->
				<button
					type="button"
					onclick={handleSwitchRole}
					class="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border transition-all duration-200 {currentRole === 'farmer' ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100' : 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100'}"
					title="Switch between Farmer & Buyer experience"
				>
					<ArrowRightLeft class="w-3.5 h-3.5" />
					<span>{currentRole === 'farmer' ? (isKannada ? 'ರೈತರ ಮೋಡ್' : 'Farmer Mode') : (isKannada ? 'ಖರೀದಿದಾರ' : 'Buyer Mode')}</span>
				</button>

				{#if currentRole === 'farmer'}
					<a
						href="/farmer/add"
						class="hidden lg:inline-flex items-center gap-1.5 bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-xs transition-colors"
					>
						<PlusCircle class="w-4 h-4" />
						<span>{isKannada ? 'ಬೆಳೆ ಸೇರಿಸಿ' : 'Add Produce'}</span>
					</a>
				{/if}

				<!-- Notifications indicator -->
				<a
					href="/farmer/offers"
					class="relative p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-full transition-colors"
					title="Offers & Alerts"
				>
					<Bell class="w-5 h-5" />
					{#if pendingOffersCount > 0}
						<span class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500 animate-pulse ring-2 ring-white"></span>
					{/if}
				</a>

				<!-- Profile / Login Avatar -->
				<a
					href="/login"
					class="flex items-center gap-1.5 pl-1.5 text-stone-700 hover:text-stone-900"
					title="Demo User Profile"
				>
					<div class="w-8 h-8 rounded-full bg-stone-200 border border-stone-300 flex items-center justify-center text-xs font-bold text-stone-700 overflow-hidden">
						{currentRole === 'farmer' ? 'ಮಂ' : 'ಶೆ'}
					</div>
				</a>
			</div>
		</div>
	</div>
</header>
