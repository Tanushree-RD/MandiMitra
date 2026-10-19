<script lang="ts">
	import { language } from '#lib/stores/appStore';
	import type { FairPriceGrade } from '#lib/types';
	import { CheckCircle2, TrendingUp, Sparkles } from '@lucide/svelte';

	interface Props {
		grade?: FairPriceGrade;
		diffPercent?: number;
		size?: 'sm' | 'md' | 'lg';
		showIcon?: boolean;
	}

	let { grade = 'fair', diffPercent = 0, size = 'md', showIcon = true }: Props = $props();

	let isKannada = $derived($language === 'kn');

	let badgeClass = $derived.by(() => {
		if (grade === 'great_deal') {
			return 'bg-emerald-50 text-emerald-800 border-emerald-300 ring-1 ring-emerald-400/20';
		} else if (grade === 'fair') {
			return 'bg-teal-50 text-teal-800 border-teal-300 ring-1 ring-teal-400/20';
		} else {
			return 'bg-amber-50 text-amber-800 border-amber-300 ring-1 ring-amber-400/20';
		}
	});

	let label = $derived.by(() => {
		if (grade === 'great_deal') {
			return isKannada ? 'ಉತ್ತಮ ಡೀಲ್' : 'Great Value';
		} else if (grade === 'fair') {
			return isKannada ? 'ಎಪಿಎಂಸಿ ನ್ಯಾಯಯುತ ದರ' : 'APMC Fair Price';
		} else {
			return isKannada ? 'ಪ್ರೀಮಿಯಂ ದರ್ಜೆ' : 'Premium Grade';
		}
	});
</script>

<span
	class="inline-flex items-center gap-1.5 font-medium rounded-full border px-2.5 py-0.5 shadow-2xs transition-all {badgeClass} {size === 'sm' ? 'text-[11px] py-0.5 px-2' : size === 'lg' ? 'text-xs py-1 px-3 font-semibold' : 'text-xs'}"
>
	{#if showIcon}
		{#if grade === 'great_deal'}
			<Sparkles class="w-3.5 h-3.5 text-emerald-600" />
		{:else if grade === 'fair'}
			<CheckCircle2 class="w-3.5 h-3.5 text-teal-600" />
		{:else}
			<TrendingUp class="w-3.5 h-3.5 text-amber-600" />
		{/if}
	{/if}
	<span>{label}</span>
	{#if diffPercent !== undefined && diffPercent !== 0}
		<span class="opacity-75 font-mono text-[10px]">
			({diffPercent > 0 ? `+${diffPercent}%` : `${diffPercent}%`})
		</span>
	{/if}
</span>
