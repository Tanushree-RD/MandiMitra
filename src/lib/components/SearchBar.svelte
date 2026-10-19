<script lang="ts">
	import { language, addToast } from '#lib/stores/appStore';
	import { Search, Mic, X } from '@lucide/svelte';

	interface Props {
		query?: string;
		placeholder?: string;
		onSearch?: (value: string) => void;
	}

	let { query = $bindable(''), placeholder, onSearch }: Props = $props();

	let isKannada = $derived($language === 'kn');
	let isListening = $state(false);

	let inputPlaceholder = $derived(
		placeholder || (isKannada ? 'ಬೆಳೆ, ತಾಲೂಕು ಅಥವಾ ರೈತರ ಹೆಸರು ಹುಡುಕಿ...' : 'Search crop, taluk, or farmer name...')
	);

	function handleInput(e: Event) {
		const target = e.target as HTMLInputElement;
		query = target.value;
		if (onSearch) onSearch(query);
	}

	function clearQuery() {
		query = '';
		if (onSearch) onSearch('');
	}

	function simulateVoiceSearch() {
		isListening = true;
		addToast(
			isKannada ? 'ಧ್ವನಿ ಗುರುತಿಸುವಿಕೆ ಪ್ರಾರಂಭವಾಗಿದೆ...' : 'Voice Search Activated...',
			isKannada ? 'ಉದಾಹರಣೆಗೆ: "ಪುತ್ತೂರು ಅಡಿಕೆ" ಎಂದು ಹೇಳಿ' : 'Listening... e.g. "Puttur Arecanut"',
			'info',
			2500
		);

		setTimeout(() => {
			isListening = false;
			query = isKannada ? 'ಅಡಿಕೆ' : 'Arecanut';
			if (onSearch) onSearch(query);
			addToast(
				isKannada ? 'ಧ್ವನಿ ಗುರುತಿಸಲಾಗಿದೆ: "ಅಡಿಕೆ"' : 'Voice Recognized: "Arecanut"',
				isKannada ? 'ಫಲಿತಾಂಶಗಳನ್ನು ಪ್ರದರ್ಶಿಸಲಾಗುತ್ತಿದೆ' : 'Filtered matching crops',
				'success'
			);
		}, 1800);
	}
</script>

<div class="relative w-full">
	<div
		class="relative flex items-center bg-white rounded-2xl border {isListening ? 'border-emerald-500 ring-2 ring-emerald-500/20 shadow-md' : 'border-stone-200/90 shadow-2xs focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-500/20'} transition-all duration-200"
	>
		<div class="pl-4 text-stone-400 pointer-events-none flex items-center justify-center">
			<Search class="w-5 h-5" />
		</div>

		<input
			type="text"
			value={query}
			oninput={handleInput}
			placeholder={inputPlaceholder}
			class="w-full py-3.5 pl-3 pr-20 text-sm md:text-base text-stone-900 placeholder:text-stone-400 focus:outline-hidden bg-transparent font-medium"
		/>

		<div class="absolute right-2 flex items-center gap-1">
			{#if query}
				<button
					type="button"
					onclick={clearQuery}
					class="p-1.5 text-stone-400 hover:text-stone-600 rounded-lg hover:bg-stone-100 transition-colors"
					aria-label="Clear search"
				>
					<X class="w-4 h-4" />
				</button>
			{/if}

			<button
				type="button"
				onclick={simulateVoiceSearch}
				class="p-2 rounded-xl transition-all duration-200 {isListening ? 'bg-red-500 text-white animate-pulse' : 'text-emerald-700 hover:bg-emerald-50'}"
				title={isKannada ? 'ಧ್ವನಿ ಹುಡುಕಾಟ (Kannada Voice Search)' : 'Voice search'}
			>
				<Mic class="w-4 h-4 {isListening ? 'animate-bounce' : ''}" />
			</button>
		</div>
	</div>

	{#if isListening}
		<div class="absolute -bottom-7 left-3 text-xs text-emerald-700 font-semibold flex items-center gap-1.5 animate-pulse">
			<span class="w-2 h-2 rounded-full bg-emerald-500"></span>
			<span>{isKannada ? 'ಕೇಳಿಸಿಕೊಳ್ಳಲಾಗುತ್ತಿದೆ... ಮಾತನಾಡಿ' : 'Listening for crop voice search...'}</span>
		</div>
	{/if}
</div>
