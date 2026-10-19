<script lang="ts">
	import { userRole, language, setRole } from '#lib/stores/appStore';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { Sparkles, RefreshCw, ChevronUp, ChevronDown, Check, Compass, X } from '@lucide/svelte';

	let isOpen = $state(false);

	const steps = [
		{ id: '1', step: '1', label: 'Landing Page', path: '/', role: 'public' },
		{ id: '2', step: '2', label: 'Mock Login', path: '/login', role: 'auth' },
		{ id: '3', step: '3', label: 'Farmer Dashboard', path: '/farmer', role: 'farmer' },
		{ id: '4', step: '4', label: 'Add Produce', path: '/farmer/add', role: 'farmer' },
		{ id: '5', step: '5', label: 'Buyer Marketplace', path: '/buyer', role: 'buyer' },
		{ id: '6', step: '6', label: 'Crop Details', path: '/buyer/crop', role: 'buyer' },
		{ id: '7', step: '7', label: 'Send Offer', path: '/buyer/offer', role: 'buyer' },
		{ id: '8', step: '8', label: 'Farmer Review', path: '/farmer/offers', role: 'farmer' },
		{ id: '9', step: '9', label: 'Deal Confirmed', path: '/deal-confirmed', role: 'trade' }
	];

	let currentPath = $derived(page.url.pathname);
	let currentStep = $derived(
		steps.find(s => s.path === currentPath || (s.path === '/buyer/crop' && currentPath.startsWith('/buyer/crop'))) || steps[0]
	);

	function navigateTo(path: string) {
		goto(path);
		isOpen = false;
	}

	function toggleRole() {
		if ($userRole === 'farmer') {
			setRole('buyer');
			goto('/buyer');
		} else {
			setRole('farmer');
			goto('/farmer');
		}
	}
</script>

<!-- Floating Demo Controller Dock -->
<aside aria-label="Prototype demo navigator" class="fixed bottom-4 right-4 z-50 font-sans">
	{#if isOpen}
		<!-- Expanded Panel -->
		<div
			class="mb-2 w-80 bg-stone-900/95 text-stone-100 rounded-2xl p-4 shadow-2xl border border-stone-800 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-2 duration-150"
		>
			<div class="flex items-center justify-between pb-3 border-b border-stone-800">
				<div class="flex items-center gap-2">
					<div class="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
						<Compass class="w-3.5 h-3.5" />
					</div>
					<div>
						<h4 class="text-xs font-bold text-white tracking-tight">Demo Navigator</h4>
						<p class="text-[10px] text-stone-400">Jump directly to any prototype step</p>
					</div>
				</div>

				<button
					type="button"
					onclick={() => (isOpen = false)}
					class="p-1 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
					aria-label="Close navigator"
				>
					<X class="w-4 h-4" />
				</button>
			</div>

			<!-- Quick Role Switcher Inside Controller -->
			<div class="my-3 p-2 bg-stone-800/80 rounded-xl flex items-center justify-between">
				<span class="text-[11px] text-stone-300 font-medium">Active Mode:</span>
				<button
					type="button"
					onclick={toggleRole}
					class="px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1.5 {$userRole === 'farmer' ? 'bg-emerald-600 text-white' : 'bg-amber-600 text-white'}"
				>
					<RefreshCw class="w-3 h-3" />
					<span>{$userRole === 'farmer' ? '🌾 Farmer View' : '🛒 Buyer View'}</span>
				</button>
			</div>

			<!-- Steps List -->
			<div class="space-y-1 max-h-72 overflow-y-auto pr-1 no-scrollbar">
				{#each steps as s}
					<button
						type="button"
						onclick={() => navigateTo(s.path)}
						class="w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-medium flex items-center justify-between transition-colors {currentStep.id === s.step ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30' : 'text-stone-300 hover:bg-stone-800 hover:text-white'}"
					>
						<div class="flex items-center gap-2">
							<span class="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono {currentStep.id === s.step ? 'bg-emerald-500 text-stone-950 font-black' : 'bg-stone-800 text-stone-400'}">
								{s.step}
							</span>
							<span class="truncate">{s.label}</span>
						</div>
						{#if currentStep.id === s.step}
							<Check class="w-3.5 h-3.5 text-emerald-400" />
						{/if}
					</button>
				{/each}
			</div>

			<div class="mt-3 pt-2.5 border-t border-stone-800/80 flex items-center justify-between text-[10px] text-stone-400">
				<span>Hackathon Selection Build</span>
				<span class="font-mono text-emerald-400">SvelteKit 3</span>
			</div>
		</div>
	{/if}

	<!-- Collapsed Trigger Pill -->
	<button
		type="button"
		onclick={() => (isOpen = !isOpen)}
		class="group flex items-center gap-2.5 bg-stone-900/90 hover:bg-stone-900 text-stone-100 text-xs font-semibold px-3.5 py-2 rounded-full border border-stone-700/80 shadow-xl backdrop-blur-md hover:scale-[1.02] active:scale-[0.98] transition-all"
		title="Click to jump across prototype demo steps"
	>
		<span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
		<span class="text-[11px] font-medium text-stone-300">
			Demo Flow <strong class="text-white font-bold">{currentStep.step}/9: {currentStep.label}</strong>
		</span>
		<div class="p-0.5 rounded-full bg-stone-800 text-stone-400 group-hover:text-white transition-colors">
			{#if isOpen}
				<ChevronDown class="w-3.5 h-3.5" />
			{:else}
				<ChevronUp class="w-3.5 h-3.5" />
			{/if}
		</div>
	</button>
</aside>
