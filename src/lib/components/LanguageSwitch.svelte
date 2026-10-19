<script lang="ts">
	import { language, setLanguage } from '#lib/stores/appStore';
	import type { Language } from '#lib/types';
	import { Globe } from '@lucide/svelte';

	let currentLang = $derived($language);

	function toggle(lang: Language) {
		setLanguage(lang);
	}
</script>

<div class="inline-flex items-center gap-1 bg-stone-100 p-1 rounded-full border border-stone-200/80 shadow-xs">
	<button
		type="button"
		onclick={() => toggle('kn')}
		class="px-2.5 py-1 text-xs font-semibold rounded-full transition-all duration-200 flex items-center gap-1.5 {currentLang === 'kn' ? 'bg-emerald-700 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'}"
		title="ಕನ್ನಡಕ್ಕೆ ಬದಲಾಯಿಸಿ"
	>
		<span>ಕನ್ನಡ</span>
	</button>
	<button
		type="button"
		onclick={() => toggle('en')}
		class="px-2.5 py-1 text-xs font-semibold rounded-full transition-all duration-200 flex items-center gap-1.5 {currentLang === 'en' ? 'bg-emerald-700 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'}"
		title="Switch to English"
	>
		<span>EN</span>
	</button>
</div>
