<script lang="ts">
	import { language } from '#lib/stores/appStore';
	import { Plus, Sparkles } from '@lucide/svelte';

	interface Props {
		onClick?: () => void;
	}

	let { onClick }: Props = $props();
	let isKannada = $derived($language === 'kn');
</script>

<div class="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-40">
	<button
		type="button"
		onclick={onClick}
		class="group relative inline-flex items-center gap-2.5 bg-gradient-to-r from-emerald-700 via-emerald-800 to-emerald-900 hover:from-emerald-600 hover:to-emerald-800 text-white font-bold px-5 py-3.5 rounded-full shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 ring-4 ring-emerald-500/20"
	>
		<!-- Glow pulse animation -->
		<span class="absolute -inset-1 rounded-full bg-emerald-500/30 blur-md group-hover:bg-emerald-500/50 transition-opacity"></span>

		<span class="relative flex items-center justify-center w-7 h-7 rounded-full bg-white/20">
			<Plus class="w-5 h-5 text-white stroke-[2.5] group-hover:rotate-90 transition-transform duration-300" />
		</span>

		<span class="relative text-sm tracking-wide">
			{isKannada ? 'ಬೆಳೆ ಮಾರಾಟಕ್ಕೆ ಸೇರಿಸಿ' : 'Add Produce'}
		</span>

		<Sparkles class="relative w-4 h-4 text-emerald-200" />
	</button>
</div>
