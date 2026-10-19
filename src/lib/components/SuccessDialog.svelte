<script lang="ts">
	import { CheckCircle2, Sparkles, X, ArrowRight } from '@lucide/svelte';
	import confetti from 'canvas-confetti';

	const browser = typeof window !== 'undefined';

	interface Props {
		isOpen: boolean;
		title: string;
		subtitle: string;
		primaryBtnText?: string;
		secondaryBtnText?: string;
		onPrimary?: () => void;
		onSecondary?: () => void;
		onClose: () => void;
	}

	let {
		isOpen,
		title,
		subtitle,
		primaryBtnText = 'Continue',
		secondaryBtnText,
		onPrimary,
		onSecondary,
		onClose
	}: Props = $props();

	$effect(() => {
		if (isOpen && browser) {
			try {
				confetti({
					particleCount: 80,
					spread: 70,
					origin: { y: 0.6 },
					colors: ['#047857', '#10b981', '#34d399', '#f59e0b', '#fbbf24']
				});
			} catch (e) {
				// Ignore confetti error if any
			}
		}
	});
</script>

{#if isOpen}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm animate-in fade-in"
		role="dialog"
		aria-modal="true"
	>
		<div
			class="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl border border-stone-200 text-center relative overflow-hidden animate-in zoom-in-95"
		>
			<!-- Ambient background glow -->
			<div class="absolute -top-16 -left-16 w-36 h-36 bg-emerald-100 rounded-full blur-2xl pointer-events-none"></div>
			<div class="absolute -bottom-16 -right-16 w-36 h-36 bg-amber-100 rounded-full blur-2xl pointer-events-none"></div>

			<!-- Success Icon with Ripple -->
			<div class="relative w-20 h-20 mx-auto mb-5 flex items-center justify-center">
				<div class="absolute inset-0 rounded-full bg-emerald-100 animate-ping opacity-30"></div>
				<div class="w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-400 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30">
					<CheckCircle2 class="w-10 h-10 stroke-[2.5]" />
				</div>
			</div>

			<h3 class="text-xl md:text-2xl font-extrabold text-stone-900 tracking-tight mb-2">
				{title}
			</h3>
			<p class="text-sm text-stone-600 leading-relaxed mb-6 font-medium">
				{subtitle}
			</p>

			<div class="space-y-2.5">
				{#if onPrimary}
					<button
						type="button"
						onclick={onPrimary}
						class="w-full py-3.5 px-6 rounded-2xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
					>
						<span>{primaryBtnText}</span>
						<ArrowRight class="w-4 h-4" />
					</button>
				{/if}

				{#if secondaryBtnText && onSecondary}
					<button
						type="button"
						onclick={onSecondary}
						class="w-full py-2.5 px-6 rounded-2xl text-stone-600 hover:text-stone-900 hover:bg-stone-100 font-semibold text-xs transition-colors"
					>
						{secondaryBtnText}
					</button>
				{/if}
			</div>

			<button
				type="button"
				onclick={onClose}
				class="absolute top-4 right-4 text-stone-400 hover:text-stone-600 p-2 rounded-full"
				aria-label="Close dialog"
			>
				<X class="w-4 h-4" />
			</button>
		</div>
	</div>
{/if}
