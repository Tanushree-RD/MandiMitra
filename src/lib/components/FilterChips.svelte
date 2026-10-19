<script lang="ts">
	import { language } from '#lib/stores/appStore';
	import { karnatakaTaluks } from '#lib/mockData';

	interface Props {
		selectedTaluk?: string;
		selectedCategory?: string;
		onTalukChange?: (taluk: string) => void;
		onCategoryChange?: (category: string) => void;
	}

	let {
		selectedTaluk = $bindable('all'),
		selectedCategory = $bindable('all'),
		onTalukChange,
		onCategoryChange
	}: Props = $props();

	let isKannada = $derived($language === 'kn');

	const categories = [
		{ id: 'all', en: 'All Crops', kn: 'ಎಲ್ಲಾ ಬೆಳೆಗಳು' },
		{ id: 'Commercial', en: 'Areca & Commercial', kn: 'ಅಡಿಕೆ & ವಾಣಿಜ್ಯ' },
		{ id: 'Plantation', en: 'Coconuts & Plantation', kn: 'ತೆಂಗು & ತೋಟಗಾರಿಕೆ' },
		{ id: 'Spices', en: 'Pepper & Spices', kn: 'ಮೆಣಸು & ಮಸಾಲೆ' },
		{ id: 'Grains', en: 'Paddy & Grains', kn: 'ಭತ್ತ & ಧಾನ್ಯ' },
		{ id: 'Fruits', en: 'Banana & Fruits', kn: 'ಬಾಳೆ & ಹಣ್ಣುಗಳು' }
	];

	function selectTaluk(id: string) {
		selectedTaluk = id;
		if (onTalukChange) onTalukChange(id);
	}

	function selectCategory(id: string) {
		selectedCategory = id;
		if (onCategoryChange) onCategoryChange(id);
	}
</script>

<div class="space-y-2.5">
	<!-- Taluk Chips (Location Filter) -->
	<div class="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
		<span class="text-xs font-bold text-stone-400 uppercase tracking-wider shrink-0 pl-1">
			{isKannada ? 'ತಾಲೂಕು' : 'Taluk'}:
		</span>
		{#each karnatakaTaluks as taluk}
			<button
				type="button"
				onclick={() => selectTaluk(taluk.id)}
				class="shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all duration-200 {selectedTaluk === taluk.id
					? 'bg-emerald-800 text-white border-emerald-800 shadow-xs'
					: 'bg-white text-stone-600 border-stone-200 hover:border-emerald-300 hover:bg-stone-50'}"
			>
				{isKannada ? taluk.kn : taluk.en}
			</button>
		{/each}
	</div>

	<!-- Category Chips (Crop Filter) -->
	<div class="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
		<span class="text-xs font-bold text-stone-400 uppercase tracking-wider shrink-0 pl-1">
			{isKannada ? 'ವರ್ಗ' : 'Category'}:
		</span>
		{#each categories as cat}
			<button
				type="button"
				onclick={() => selectCategory(cat.id)}
				class="shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all duration-200 {selectedCategory === cat.id
					? 'bg-stone-900 text-white border-stone-900 shadow-xs'
					: 'bg-stone-100/80 text-stone-700 border-stone-200 hover:border-stone-300 hover:bg-stone-200/60'}"
			>
				{isKannada ? cat.kn : cat.en}
			</button>
		{/each}
	</div>
</div>
