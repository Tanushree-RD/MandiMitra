<script lang="ts">
	import { language, userRole, setRole, mandiPrices } from '#lib/stores/appStore';
	import { goto } from '$app/navigation';
	import {
		Sprout,
		ArrowRight,
		ShieldCheck,
		TrendingUp,
		Users,
		MapPin,
		CheckCircle2,
		Sparkles,
		PhoneCall,
		MessageSquare,
		Zap,
		Scale,
		Calendar,
		Building2,
		ArrowUpRight
	} from '@lucide/svelte';

	let isKannada = $derived($language === 'kn');
	let prices = $derived($mandiPrices);

	function startAsFarmer() {
		setRole('farmer');
		goto('/login');
	}

	function startAsBuyer() {
		setRole('buyer');
		goto('/login');
	}
</script>

<div class="space-y-20 md:space-y-28">
	<!-- Hero Section: Clean 2-Column Minimalist Layout -->
	<section class="relative pt-8 sm:pt-14 pb-4 overflow-hidden">
		<!-- Subtle ambient backdrop light (Stripe style) -->
		<div class="absolute top-0 right-1/4 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl -z-10 pointer-events-none"></div>
		<div class="absolute top-20 left-10 w-80 h-80 bg-amber-50/50 rounded-full blur-3xl -z-10 pointer-events-none"></div>

		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
				<!-- Left Column: Headline, Subtext, Action Cards -->
				<div class="lg:col-span-7 space-y-6 sm:space-y-8">
					<!-- Quiet Category Eyebrow -->
					<div class="inline-flex items-center gap-2 text-xs font-semibold text-emerald-900 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/80">
						<span class="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
						<span class="tracking-wide uppercase font-bold text-[11px]">
							{isKannada ? 'ಕರ್ನಾಟಕ ಕೃಷಿ ಮಾರುಕಟ್ಟೆ' : 'Karnataka Farmgate Marketplace'}
						</span>
						<span class="text-stone-400">·</span>
						<span class="text-stone-600 font-medium">
							{isKannada ? 'ದಕ್ಷಿಣ ಕನ್ನಡ & ಉಡುಪಿ' : 'Coastal & Malnad APMC'}
						</span>
					</div>

					<!-- Punchy, Memorable Headline (Maximum 3 Lines) -->
					<h1 class="text-3xl sm:text-5xl lg:text-[54px] font-black text-stone-900 tracking-tight leading-[1.12]">
						{#if isKannada}
							<span>ನ್ಯಾಯಯುತ ಮಂಡಿ ಬೆಲೆ.</span><br />
							<span>ತೋಟದಲ್ಲೇ ನೇರ ಮಾರಾಟ.</span><br />
							<span class="text-emerald-700">ಶೂನ್ಯ ದಲ್ಲಾಳಿ ಕಮಿಷನ್.</span>
						{:else}
							<span>Fair mandi prices.</span><br />
							<span>Direct from the farm.</span><br />
							<span class="text-emerald-700">Zero broker commissions.</span>
						{/if}
					</h1>

					<!-- Minimal Supporting Text -->
					<p class="text-sm sm:text-base md:text-lg text-stone-600 font-normal max-w-xl leading-relaxed">
						{isKannada
							? 'ದಕ್ಷಿಣ ಕನ್ನಡ, ಉಡುಪಿ ಮತ್ತು ಮಲೆನಾಡು ರೈತರನ್ನು ದೃಢೀಕೃತ ಖರೀದಿದಾರರಿಗೆ ನೇರವಾಗಿ ಜೋಡಿಸುವ ಡಿಜಿಟಲ್ ವೇದಿಕೆ. ನಿಖರ ಎಪಿಎಂಸಿ ದರ ಸಲಹೆಗಾರ ಮತ್ತು ತೋಟದಲ್ಲೇ ಖಚಿತ ಖರೀದಿ.'
							: 'Connecting Karnataka smallholder growers directly with verified commercial traders. Transparent APMC benchmark pricing, zero intermediaries, and farmgate weighment.'}
					</p>

					<!-- Visually Distinctive Action Cards -->
					<div class="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
						<!-- Farmer Action Card: Deep Earth Forest -->
						<div
							class="group relative bg-stone-900 hover:bg-stone-950 text-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer border border-stone-800 flex flex-col justify-between"
							onclick={startAsFarmer}
							role="button"
							tabindex="0"
							onkeydown={(e) => e.key === 'Enter' && startAsFarmer()}
						>
							<div>
								<div class="flex items-center justify-between mb-3">
									<span class="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
										{isKannada ? 'ರೈತರಿಗಾಗಿ' : 'For Farmers'}
									</span>
									<div class="w-6 h-6 rounded-full bg-stone-800 group-hover:bg-emerald-600 flex items-center justify-center text-stone-300 group-hover:text-white transition-colors">
										<ArrowRight class="w-3.5 h-3.5" />
									</div>
								</div>
								<h3 class="text-base font-bold text-white mb-1">
									{isKannada ? 'ಬೆಳೆ ಮಾರಾಟ ಮಾಡಿ' : 'List your harvest'}
								</h3>
								<p class="text-xs text-stone-400 leading-snug">
									{isKannada
										? '೬೦ ಸೆಕೆಂಡ್‌ಗಳಲ್ಲಿ ನಿಮ್ಮ ಬೆಳೆಯನ್ನು ಹಾಕಿ ನೇರ ಬಿಡ್ ಪಡೆಯಿರಿ.'
										: 'Get APMC-guided price recommendations and direct bids.'}
								</p>
							</div>

							<div class="mt-4 pt-3 border-t border-stone-800 flex items-center justify-between text-[11px] text-emerald-300 font-semibold">
								<span>{isKannada ? 'ರೈತರಾಗಿ ಪ್ರವೇಶಿಸಿ' : 'Enter as Farmer'}</span>
								<span class="text-stone-500 font-normal">0% Brokerage</span>
							</div>
						</div>

						<!-- Buyer Action Card: Clean Gallery Tone -->
						<div
							class="group relative bg-white hover:bg-stone-50/80 text-stone-900 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border border-stone-300/80 flex flex-col justify-between"
							onclick={startAsBuyer}
							role="button"
							tabindex="0"
							onkeydown={(e) => e.key === 'Enter' && startAsBuyer()}
						>
							<div>
								<div class="flex items-center justify-between mb-3">
									<span class="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
										{isKannada ? 'ಖರೀದಿದಾರರಿಗಾಗಿ' : 'For Buyers'}
									</span>
									<div class="w-6 h-6 rounded-full bg-stone-100 group-hover:bg-stone-900 flex items-center justify-center text-stone-600 group-hover:text-white transition-colors">
										<ArrowRight class="w-3.5 h-3.5" />
									</div>
								</div>
								<h3 class="text-base font-bold text-stone-900 mb-1">
									{isKannada ? 'ಬೆಳೆ ಖರೀದಿಸಿ' : 'Source fresh harvests'}
								</h3>
								<p class="text-xs text-stone-500 leading-snug">
									{isKannada
										? 'ಕರಾವಳಿ ತಾಲೂಕುಗಳಿಂದ ನೇರವಾಗಿ ಸಗಟು ಕೃಷಿ ಉತ್ಪನ್ನ ಹುಡುಕಿ.'
										: 'Browse graded crops directly with verified APMC benchmarks.'}
								</p>
							</div>

							<div class="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-800 font-semibold">
								<span>{isKannada ? 'ಖರೀದಿದಾರರಾಗಿ ಪ್ರವೇಶಿಸಿ' : 'Enter as Buyer'}</span>
								<span class="text-stone-400 font-normal">8 Taluks</span>
							</div>
						</div>
					</div>

					<!-- Trust Micro-Bar -->
					<div class="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-stone-500 font-medium pt-1">
						<span class="flex items-center gap-1.5">
							<ShieldCheck class="w-4 h-4 text-emerald-700" />
							{isKannada ? 'ದೃಢೀಕೃತ ಎಪಿಎಂಸಿ ಬೆಲೆಗಳು' : 'Verified APMC price transparency'}
						</span>
						<span class="flex items-center gap-1.5">
							<CheckCircle2 class="w-4 h-4 text-emerald-700" />
							{isKannada ? 'ತೋಟದಲ್ಲೇ ವಿದ್ಯುನ್ಮಾನ ತೂಕ' : 'Farmgate electronic weighment'}
						</span>
					</div>
				</div>

				<!-- Right Column: Agriculture-Themed Interactive UI Mockup -->
				<div class="lg:col-span-5 relative">
					<!-- Visual Mockup Container -->
					<div class="relative mx-auto max-w-md lg:max-w-none">
						<!-- Main Product Showcase Card -->
						<div class="bg-white rounded-3xl border border-stone-200/90 shadow-xl overflow-hidden">
							<!-- Mock Card Top Bar -->
							<div class="p-4 bg-stone-50/90 border-b border-stone-100 flex items-center justify-between text-xs">
								<div class="flex items-center gap-2">
									<div class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
									<span class="font-bold text-stone-900 tracking-tight">
										{isKannada ? 'ಸಕ್ರಿಯ ಬೆಳೆ ಲಾಟ್ #KA-PUT-8912' : 'Active Batch #KA-PUT-8912'}
									</span>
								</div>
								<span class="text-[10px] font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full border border-emerald-300">
									APMC Verified
								</span>
							</div>

							<!-- Image Showcase -->
							<div class="relative h-48 overflow-hidden bg-stone-100">
								<img
									src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=700&q=80"
									alt="Karnataka Arecanut Harvest"
									class="w-full h-full object-cover"
								/>
								<div class="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent"></div>
								<div class="absolute bottom-3 left-4 text-white">
									<div class="text-lg font-black">{isKannada ? 'ಕರಾವಳಿ ಚಾಲಿ ಅಡಿಕೆ' : 'Coastal Chali Arecanut'}</div>
									<div class="text-xs text-stone-200 flex items-center gap-1">
										<MapPin class="w-3.5 h-3.5 text-emerald-400" />
										<span>Puttur Taluk, Dakshina Kannada</span>
									</div>
								</div>
							</div>

							<!-- Details & Price Visualizer -->
							<div class="p-5 space-y-4">
								<!-- Benchmark Comparison Bar -->
								<div class="p-3.5 bg-stone-50 rounded-2xl border border-stone-100 space-y-2">
									<div class="flex items-center justify-between text-xs">
										<span class="text-stone-500 font-medium">Farmer Asking Price</span>
										<span class="font-bold text-stone-900 font-mono">₹52,000 / Qtl</span>
									</div>
									<div class="flex items-center justify-between text-xs">
										<span class="text-stone-500 font-medium">Puttur APMC Mandi Rate</span>
										<span class="font-semibold text-stone-700 font-mono">₹51,000 / Qtl</span>
									</div>
									<div class="pt-1.5 border-t border-stone-200/60 flex items-center justify-between text-[11px]">
										<span class="font-bold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-md">
											Fair Market Rate (+1.9%)
										</span>
										<span class="text-stone-500">12 Quintals Lot</span>
									</div>
								</div>

								<!-- Farmer Contact Row -->
								<div class="flex items-center justify-between pt-1">
									<div class="flex items-center gap-2.5">
										<img
											src="https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&w=80&q=80"
											alt="Manjunath Gowda"
											class="w-9 h-9 rounded-full object-cover border border-stone-200"
										/>
										<div>
											<div class="text-xs font-bold text-stone-900">Manjunath Gowda</div>
											<div class="text-[11px] text-stone-500">Verified Grower · 4.9 ★</div>
										</div>
									</div>

									<a
										href="/buyer/crop"
										class="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
									>
										<span>View Lot</span>
										<ArrowUpRight class="w-3.5 h-3.5" />
									</a>
								</div>
							</div>
						</div>

						<!-- Floating Incoming Bid Micro-Notification (Stripe/Linear style) -->
						<div class="hidden sm:flex absolute -top-5 -left-6 bg-stone-900 text-white rounded-2xl p-3 shadow-xl border border-stone-800 items-center gap-3 animate-float max-w-xs">
							<div class="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
								<Zap class="w-4 h-4" />
							</div>
							<div class="min-w-0 text-xs">
								<div class="font-bold text-white truncate">Coastal Spices placed bid</div>
								<div class="text-[11px] text-stone-400">₹52,000/Qtl · Full lot accepted</div>
							</div>
						</div>

						<!-- Floating Digital Gate Pass Micro-Badge (Bottom right) -->
						<div class="hidden sm:flex absolute -bottom-5 -right-6 bg-white rounded-2xl p-3 shadow-xl border border-stone-200/90 items-center gap-3 max-w-xs">
							<div class="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 font-bold text-xs">
								✓
							</div>
							<div class="text-xs">
								<div class="font-bold text-stone-900">Zero Middleman Cut</div>
								<div class="text-[11px] text-emerald-700 font-semibold">Farmer saved ₹6,240</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Live APMC Benchmark Ticker: Sleek Bloomberg/Stripe Financial Feed -->
	<section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="bg-stone-900 text-stone-100 rounded-3xl p-5 md:p-6 shadow-xl border border-stone-800">
			<!-- Ticker Header -->
			<div class="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-800 gap-2">
				<div class="flex items-center gap-2.5">
					<span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
					<span class="text-xs font-bold uppercase tracking-wider text-stone-200">
						{isKannada ? 'ಕರ್ನಾಟಕ ಅಧಿಕೃತ ಎಪಿಎಂಸಿ ಮಂಡಿ ಬೆಲೆಗಳು' : 'Karnataka APMC Benchmark Rates'}
					</span>
					<span class="text-[10px] text-stone-400 hidden sm:inline">|</span>
					<span class="text-[11px] text-stone-400 hidden sm:inline">
						{isKannada ? 'ದೈನಂದಿನ ಅಧಿಕೃತ ದರಗಳು' : 'Daily Mandi Feed'}
					</span>
				</div>

				<div class="text-[11px] text-stone-400 font-mono">
					{isKannada ? 'ಇಂದಿನ ಮಾರುಕಟ್ಟೆ ಸ್ಥಿತಿ' : 'Puttur · Bantwal · Sullia · Udupi'}
				</div>
			</div>

			<!-- Grid of Clean Ticker Items -->
			<div class="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
				{#each prices as item}
					<div class="bg-stone-800/70 hover:bg-stone-800 rounded-xl p-3 border border-stone-700/60 transition-colors">
						<div class="text-xs font-medium text-stone-300 truncate">
							{isKannada ? item.cropKn : item.cropEn}
						</div>
						<div class="text-base font-extrabold text-white mt-0.5 font-mono">
							₹{item.modalPrice.toLocaleString()}
						</div>
						<div class="flex items-center justify-between mt-1 text-[10px]">
							<span class="text-stone-400 truncate">{isKannada ? item.apmcKn : item.apmcEn}</span>
							<span class="font-bold {item.changePercent >= 0 ? 'text-emerald-400' : 'text-rose-400'}">
								{item.changePercent >= 0 ? `+${item.changePercent}%` : `${item.changePercent}%`}
							</span>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Editorial Key Metrics / Impact (Linear/Stripe style) -->
	<section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 py-8 border-y border-stone-200/80">
			<div>
				<div class="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">₹4,850+</div>
				<div class="text-xs font-medium text-stone-500 mt-1">
					{isKannada ? 'ಕ್ವಿಂಟಾಲ್‌ಗೆ ಸರಾಸರಿ ಹೆಚ್ಚುವರಿ ಲಾಭ' : 'Avg. Extra Income per Quintal'}
				</div>
			</div>

			<div>
				<div class="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">14,200+</div>
				<div class="text-xs font-medium text-stone-500 mt-1">
					{isKannada ? 'ಕರಾವಳಿಯ ನೋಂದಾಯಿತ ರೈತರು' : 'Karnataka Smallholder Farmers'}
				</div>
			</div>

			<div>
				<div class="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">8 Taluks</div>
				<div class="text-xs font-medium text-stone-500 mt-1">
					{isKannada ? 'ಕರಾವಳಿ ಮತ್ತು ಮಲೆನಾಡು ವ್ಯಾಪ್ತಿ' : 'Coastal & Malnad Operational Belt'}
				</div>
			</div>

			<div>
				<div class="text-3xl sm:text-4xl font-black text-emerald-800 tracking-tight">0%</div>
				<div class="text-xs font-medium text-stone-500 mt-1">
					{isKannada ? 'ದಲ್ಲಾಳಿ ಕಮಿಷನ್ ಕಡಿತ' : 'Intermediary Brokerage Deductions'}
				</div>
			</div>
		</div>
	</section>

	<!-- How It Works Section: Minimalist Linear 4-Step Sequence -->
	<section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="max-w-2xl mb-12">
			<span class="text-xs font-bold text-emerald-800 uppercase tracking-wider">
				{isKannada ? 'ಪ್ರಕ್ರಿಯೆ' : 'How it works'}
			</span>
			<h2 class="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mt-1.5">
				{isKannada ? 'ತೋಟದಿಂದ ಖರೀದಿದಾರರವರೆಗೆ ಸರಳ ಹಂತಗಳು' : 'From harvest to settlement in 4 steps'}
			</h2>
			<p class="text-xs sm:text-sm text-stone-600 mt-2">
				{isKannada
					? 'ಯಾವುದೇ ದಲ್ಲಾಳಿ ಗೊಂದಲವಿಲ್ಲದೆ ನೇರ ವ್ಯಾಪಾರಕ್ಕಾಗಿ ವಿನ್ಯಾಸಗೊಳಿಸಲಾದ ಸರಳ ಪ್ರಕ್ರಿಯೆ.'
					: 'Frictionless flow designed specifically for rural smartphone growers and bulk buyers.'}
			</p>
		</div>

		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
			<!-- Step 1 -->
			<div class="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-2xs flex flex-col justify-between">
				<div>
					<span class="text-xs font-bold font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
						Step 01
					</span>
					<h3 class="text-base font-bold text-stone-900 mt-4 mb-2">
						{isKannada ? 'ಬೆಳೆಯ ವಿವರ ಹಾಕಿ' : 'List Harvest in 60s'}
					</h3>
					<p class="text-xs text-stone-600 leading-relaxed">
						{isKannada
							? 'ಫೋಟೋ ಮತ್ತು ಪ್ರಮಾಣ ಹಾಕಿ. ಎಪಿಎಂಸಿ ದರ ಸಲಹೆಗಾರ ನ್ಯಾಯಯುತ ಬೆಲೆ ಸೂಚಿಸುತ್ತದೆ.'
							: 'Upload quantity, photo, and receive automated APMC benchmark rate guidance.'}
					</p>
				</div>
				<div class="mt-6 pt-3 border-t border-stone-100 text-[11px] text-stone-500 font-medium">
					Instant APMC Price Advisor
				</div>
			</div>

			<!-- Step 2 -->
			<div class="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-2xs flex flex-col justify-between">
				<div>
					<span class="text-xs font-bold font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
						Step 02
					</span>
					<h3 class="text-base font-bold text-stone-900 mt-4 mb-2">
						{isKannada ? 'ಖರೀದಿದಾರರಿಂದ ಬಿಡ್' : 'Direct Buyer Offers'}
					</h3>
					<p class="text-xs text-stone-600 leading-relaxed">
						{isKannada
							? 'ದೃಢೀಕೃತ ವ್ಯಾಪಾರಿಗಳು ಬೆಳೆ ಪರಿಶೀಲಿಸಿ, ನೇರ ಆಫರ್ ಮತ್ತು ವಾಹನ ಸೌಲಭ್ಯದ ಮಾಹಿತಿ ನೀಡುತ್ತಾರೆ.'
							: 'Verified commercial traders browse graded lots and send transparent price proposals.'}
					</p>
				</div>
				<div class="mt-6 pt-3 border-t border-stone-100 text-[11px] text-stone-500 font-medium">
					No Middleman Phone Calls
				</div>
			</div>

			<!-- Step 3 -->
			<div class="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-2xs flex flex-col justify-between">
				<div>
					<span class="text-xs font-bold font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
						Step 03
					</span>
					<h3 class="text-base font-bold text-stone-900 mt-4 mb-2">
						{isKannada ? 'ಬೆಲೆ ಒಪ್ಪಿಗೆ / ಚೌಕಾಶಿ' : '1-Click Deal or Counter'}
					</h3>
					<p class="text-xs text-stone-600 leading-relaxed">
						{isKannada
							? 'ರೈತರು ಬಂದಿರುವ ಆಫರ್ ೧ ಕ್ಲಿಕ್‌ನಲ್ಲಿ ಒಪ್ಪಿಕೊಳ್ಳಬಹುದು ಅಥವಾ ಕೌಂಟರ್ ಬೆಲೆ ನೀಡಬಹುದು.'
							: 'Farmers accept proposals in 1 click or negotiate via structured digital counters.'}
					</p>
				</div>
				<div class="mt-6 pt-3 border-t border-stone-100 text-[11px] text-stone-500 font-medium">
					Zero Broker Pressure
				</div>
			</div>

			<!-- Step 4 -->
			<div class="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-2xs flex flex-col justify-between">
				<div>
					<span class="text-xs font-bold font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
						Step 04
					</span>
					<h3 class="text-base font-bold text-stone-900 mt-4 mb-2">
						{isKannada ? 'ತೋಟದಲ್ಲೇ ತೂಕ & ಗೇಟ್ ಪಾಸ್' : 'Farmgate Loading & Pass'}
					</h3>
					<p class="text-xs text-stone-600 leading-relaxed">
						{isKannada
							? 'ಡಿಜಿಟಲ್ ಗೇಟ್-ಪಾಸ್ ಬಿಡುಗಡೆ, ಅಧಿಕೃತ ವಾಟ್ಸಾಪ್ ರಸೀದಿ ಮತ್ತು ತೋಟದಲ್ಲೇ ನೇರ ಹಣ ಪಾವತಿ.'
							: 'Electronic weighment at the farm, instant WhatsApp trade summary, and digital gate pass.'}
					</p>
				</div>
				<div class="mt-6 pt-3 border-t border-stone-100 text-[11px] text-stone-500 font-medium">
					Downloadable Trade Pass
				</div>
			</div>
		</div>
	</section>

	<!-- Editorial Farmer Testimonial (Airbnb/Notion style) -->
	<section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="bg-stone-900 text-white rounded-3xl p-8 sm:p-12 border border-stone-800 shadow-xl">
			<div class="max-w-3xl">
				<div class="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 mb-4">
					<span class="w-2 h-2 rounded-full bg-emerald-400"></span>
					<span>{isKannada ? 'ರೈತರ ಅನುಭವ ಕಥೆ' : 'Verified Grower Experience'}</span>
				</div>

				<blockquote class="text-lg sm:text-2xl font-bold leading-relaxed mb-8 text-stone-100">
					"{isKannada
						? 'ಹಿಂದೆ ಪುತ್ತೂರು ಮಂಡಿಗೆ ಅಡಿಕೆ ಒಯ್ಯಲು ಲಾರಿ ಬಾಡಿಗೆ ಮತ್ತು ದಲ್ಲಾಳಿ ಕಮಿಷನ್ ಎಂದು ಕ್ವಿಂಟಾಲ್‌ಗೆ ₹೨,೫೦೦ ಕಳೆಯುತ್ತಿತ್ತು. ಮಂಡಿಮಿತ್ರದಿಂದ ಖರೀದಿದಾರರೇ ತೋಟಕ್ಕೆ ಬಂದು, ನಿಖರ ಮಂಡಿ ಬೆಲೆಗೆ ತೂಕ ಮಾಡಿ ಹಣ ಕೊಟ್ಟರು.'
						: 'Earlier, we lost over ₹2,500 per quintal on transport and commissions. With MandiMitra, verified traders came straight to our farm in Puttur and paid exact market benchmark rates!'}"
				</blockquote>

				<div class="flex items-center gap-3 pt-4 border-t border-stone-800">
					<img
						src="https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&w=150&q=80"
						alt="Manjunath Gowda"
						class="w-12 h-12 rounded-full object-cover border border-stone-700"
					/>
					<div>
						<div class="text-sm font-bold text-white">Manjunath Gowda (ಮಂಜುನಾಥ ಗೌಡ)</div>
						<div class="text-xs text-stone-400">Arecanut & Pepper Grower · Puttur Taluk, Dakshina Kannada</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</div>
