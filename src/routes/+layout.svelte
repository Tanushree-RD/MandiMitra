<script lang="ts">
	import './layout.css';
	import type { LayoutProps } from './$types';
	import FloatingDemoController from '#lib/components/FloatingDemoController.svelte';
	import Navbar from '#lib/components/Navbar.svelte';
	import BottomNavigation from '#lib/components/BottomNavigation.svelte';
	import ToastNotifications from '#lib/components/ToastNotifications.svelte';
	import { language } from '#lib/stores/appStore';
	import { page } from '$app/state';
	import { Sprout, ShieldCheck, Heart } from '@lucide/svelte';

	let { children }: LayoutProps = $props();
	let isKannada = $derived($language === 'kn');
	let isLandingPage = $derived(page.url.pathname === '/');
</script>

<svelte:head>
	<title>{isKannada ? 'ಮಂಡಿಮಿತ್ರ | ಕರ್ನಾಟಕದ ರೈತ ಮತ್ತು ಖರೀದಿದಾರರ ಡಿಜಿಟಲ್ ವೇದಿಕೆ' : 'MandiMitra | Karnataka Farmer-to-Buyer Marketplace'}</title>
</svelte:head>

<div class="min-h-screen flex flex-col bg-stone-50 text-stone-900 selection:bg-emerald-200 selection:text-emerald-950 font-sans">
	<!-- Sticky Clean Single Navbar -->
	<Navbar />

	<!-- Floating prototype switcher for evaluators -->
	<FloatingDemoController />

	<!-- Floating notifications -->
	<ToastNotifications />

	<!-- Main Body Content -->
	<main class="flex-1 pb-20 md:pb-12">
		{@render children()}
	</main>

	<!-- Footer -->
	<footer class="bg-stone-900 text-stone-300 py-12 border-t border-stone-800 hidden md:block">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
				<div class="md:col-span-2">
					<div class="flex items-center gap-2.5 mb-3">
						<div class="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
							<Sprout class="w-5 h-5" />
						</div>
						<span class="text-xl font-extrabold text-white tracking-tight">
							{isKannada ? 'ಮಂಡಿಮಿತ್ರ' : 'MandiMitra'}
						</span>
					</div>
					<p class="text-xs text-stone-400 max-w-sm leading-relaxed mb-4">
						{isKannada
							? 'ಕರ್ನಾಟಕದ ಸಣ್ಣ ಮತ್ತು ಅಂಚಿನ ರೈತರನ್ನು ನೇರವಾಗಿ ದೃಢೀಕೃತ ಖರೀದಿದಾರರಿಗೆ ಜೋಡಿಸುವ ಮತ್ತು ಪಾರದರ್ಶಕ ಎಪಿಎಂಸಿ ಮಂಡಿ ಬೆಲೆ ಖಚಿತಪಡಿಸುವ ಡಿಜಿಟಲ್ ವೇದಿಕೆ.'
							: 'Connecting Karnataka smallholder farmers directly with verified buyers while providing real-time APMC mandi price transparency and zero brokerage.'}
					</p>
					<div class="flex items-center gap-2 text-xs text-emerald-400 font-medium">
						<ShieldCheck class="w-4 h-4 text-emerald-400" />
						<span>{isKannada ? 'ದಕ್ಷಿಣ ಕನ್ನಡ, ಉಡುಪಿ ಮತ್ತು ಮಲೆನಾಡು ವ್ಯಾಪ್ತಿ' : 'Serving Coastal & Malnad Karnataka Regions'}</span>
					</div>
				</div>

				<div>
					<h4 class="text-xs font-bold text-white uppercase tracking-wider mb-3">
						{isKannada ? 'ಸಕ್ರಿಯ ಮಂಡಿಗಳು' : 'Active Mandis'}
					</h4>
					<ul class="text-xs space-y-2 text-stone-400">
						<li>Puttur APMC (ಪುತ್ತೂರು)</li>
						<li>Bantwal APMC (ಬಂಟ್ವಾಳ)</li>
						<li>Belthangady APMC (ಬೆಳ್ತಂಗಡಿ)</li>
						<li>Sullia APMC (ಸುಳ್ಯ)</li>
						<li>Udupi APMC (ಉಡುಪಿ)</li>
					</ul>
				</div>

				<div>
					<h4 class="text-xs font-bold text-white uppercase tracking-wider mb-3">
						{isKannada ? 'ಪ್ರೊಟೊಟೈಪ್ ಮಾಹಿತಿ' : 'Prototype Info'}
					</h4>
					<p class="text-xs text-stone-400 leading-relaxed mb-2">
						Designed for Hackathon Selection Round. Built with SvelteKit, Tailwind CSS & Lucide Icons.
					</p>
					<span class="inline-block text-[11px] font-semibold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
						100% Mock Data & Interactive State
					</span>
				</div>
			</div>

			<div class="pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-2">
				<p>© 2026 MandiMitra. {isKannada ? 'ರೈತರ ಸಬಲೀಕರಣಕ್ಕಾಗಿ ನಿರ್ಮಿಸಲಾಗಿದೆ.' : 'Empowering farmers with transparent digital trade.'}</p>
				<p class="flex items-center gap-1">
					Made with <Heart class="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Karnataka Agriculture
				</p>
			</div>
		</div>
	</footer>

	<!-- Bottom Navigation (Mobile Only, App Views) -->
	{#if !isLandingPage}
		<BottomNavigation />
	{/if}
</div>
