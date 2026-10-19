<script lang="ts">
	import { userRole, language, setRole, selectedListingId } from '#lib/stores/appStore';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { ChevronRight, Play, Eye, Sparkles, RefreshCw, ChevronDown, ChevronUp } from '@lucide/svelte';

	let isExpanded = $state(true);

	const steps = [
		{ id: 'landing', label: '1. Landing Page', path: '/' },
		{ id: 'login', label: '2. Mock Login', path: '/login' },
		{ id: 'farmer', label: '3. Farmer Hub', path: '/farmer' },
		{ id: 'add', label: '4. Add Produce', path: '/farmer/add' },
		{ id: 'buyer', label: '5. Buyer Market', path: '/buyer' },
		{ id: 'detail', label: '6. Crop Details', path: '/buyer/crop' },
		{ id: 'offer', label: '7. Send Offer', path: '/buyer/offer' },
		{ id: 'farmer-offer', label: '8. Farmer Review', path: '/farmer/offers' },
		{ id: 'deal', label: '9. Deal Confirmed', path: '/deal-confirmed' }
	];

	let currentPath = $derived(page.url.pathname);

	function navigateTo(path: string) {
		goto(path);
	}
</script>

<div class="fixed top-0 inset-x-0 z-50 bg-stone-900/95 text-stone-200 border-b border-stone-800 backdrop-blur-md text-xs shadow-md transition-all">
	<div class="max-w-7xl mx-auto px-3 py-1.5 flex items-center justify-between gap-2">
		<!-- Prototype Tag -->
		<div class="flex items-center gap-2 shrink-0">
			<span class="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded-md border border-emerald-500/30 text-[10px] uppercase tracking-wider">
				<Sparkles class="w-3 h-3 text-emerald-400" />
				Hackathon Selection Prototype
			</span>
			<span class="hidden sm:inline text-stone-400 text-[11px]">|</span>
			<span class="hidden sm:inline text-stone-300 font-medium text-[11px]">Demo Flow Navigator</span>
		</div>

		<!-- Steps Pills (Desktop/Tablet) -->
		<div class="hidden md:flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
			{#each steps as s}
				<button
					type="button"
					onclick={() => navigateTo(s.path)}
					class="px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all shrink-0 {currentPath === s.path || (s.path === '/buyer/crop' && currentPath.startsWith('/buyer/crop'))
						? 'bg-emerald-600 text-white shadow-xs font-bold'
						: 'text-stone-400 hover:text-stone-200 hover:bg-stone-800'}"
				>
					{s.label}
				</button>
			{/each}
		</div>

		<!-- Mobile Compact Navigator -->
		<div class="flex md:hidden items-center gap-1">
			<select
				class="bg-stone-800 text-stone-200 text-xs rounded-md px-2 py-1 border border-stone-700 font-medium focus:outline-hidden"
				value={currentPath}
				onchange={(e) => navigateTo(e.currentTarget.value)}
			>
				{#each steps as s}
					<option value={s.path}>{s.label}</option>
				{/each}
			</select>
		</div>

		<!-- Quick Role Toggle in Bar -->
		<div class="flex items-center gap-1.5 shrink-0">
			<button
				type="button"
				onclick={() => {
					if ($userRole === 'farmer') {
						setRole('buyer');
						goto('/buyer');
					} else {
						setRole('farmer');
						goto('/farmer');
					}
				}}
				class="text-[11px] font-bold px-2.5 py-1 rounded-md bg-stone-800 hover:bg-stone-700 text-emerald-300 border border-stone-700 transition-colors flex items-center gap-1"
				title="Toggle Role View"
			>
				<span>{$userRole === 'farmer' ? '🌾 Farmer View' : '🛒 Buyer View'}</span>
				<RefreshCw class="w-3 h-3" />
			</button>
		</div>
	</div>
</div>
