<script lang="ts">
	import { toasts, removeToast } from '#lib/stores/appStore';
	import { CheckCircle2, Info, AlertTriangle, Sparkles, X } from '@lucide/svelte';

	let currentToasts = $derived($toasts);
</script>

<div class="fixed top-16 md:top-20 right-4 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
	{#each currentToasts as toast (toast.id)}
		<div
			class="pointer-events-auto bg-stone-900/95 text-white backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-stone-700/80 flex items-start gap-3 transition-all duration-300 animate-in slide-in-from-top-4"
		>
			<div class="mt-0.5 shrink-0">
				{#if toast.type === 'success'}
					<div class="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
						<CheckCircle2 class="w-4 h-4" />
					</div>
				{:else if toast.type === 'deal'}
					<div class="w-7 h-7 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center">
						<Sparkles class="w-4 h-4" />
					</div>
				{:else if toast.type === 'warning'}
					<div class="w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center">
						<AlertTriangle class="w-4 h-4" />
					</div>
				{:else}
					<div class="w-7 h-7 rounded-full bg-teal-500/20 text-teal-300 flex items-center justify-center">
						<Info class="w-4 h-4" />
					</div>
				{/if}
			</div>

			<div class="flex-1 min-w-0">
				<h4 class="text-xs font-bold text-stone-100">{toast.title}</h4>
				<p class="text-[11px] text-stone-300 font-medium mt-0.5 leading-relaxed">{toast.message}</p>
			</div>

			<button
				type="button"
				onclick={() => removeToast(toast.id)}
				class="text-stone-400 hover:text-stone-100 p-1 rounded-lg transition-colors"
			>
				<X class="w-3.5 h-3.5" />
			</button>
		</div>
	{/each}
</div>
