<script lang="ts">
	import { X } from '@lucide/svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		isOpen: boolean;
		title?: string;
		subtitle?: string;
		maxWidth?: string;
		onClose: () => void;
		children?: Snippet;
	}

	let { isOpen, title, subtitle, maxWidth = 'max-w-lg', onClose, children }: Props = $props();

	function handleBackdropClick(e: MouseEvent) {
		if (e.target === e.currentTarget) {
			onClose();
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && isOpen) {
			onClose();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if isOpen}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
		onclick={handleBackdropClick}
		onkeydown={(e) => e.key === 'Escape' && onClose()}
		role="dialog"
		aria-modal="true"
		tabindex="-1"
	>
		<div
			class="bg-white rounded-3xl shadow-2xl border border-stone-200 w-full {maxWidth} overflow-hidden max-h-[90vh] flex flex-col transition-all duration-300 animate-in zoom-in-95"
		>
			<!-- Header -->
			{#if title}
				<div class="px-6 py-4 border-b border-stone-100 flex items-center justify-between bg-stone-50/70">
					<div>
						<h3 class="text-base md:text-lg font-bold text-stone-900 leading-snug">{title}</h3>
						{#if subtitle}
							<p class="text-xs text-stone-500 font-medium mt-0.5">{subtitle}</p>
						{/if}
					</div>
					<button
						type="button"
						onclick={onClose}
						class="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full transition-colors"
						aria-label="Close modal"
					>
						<X class="w-5 h-5" />
					</button>
				</div>
			{/if}

			<!-- Body -->
			<div class="p-6 overflow-y-auto no-scrollbar flex-1">
				{#if children}
					{@render children()}
				{/if}
			</div>
		</div>
	</div>
{/if}
