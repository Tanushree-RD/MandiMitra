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
		Zap
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

<div class="space-y-16 md:space-y-24">
	<!-- Hero Section -->
	<section class="relative pt-6 md:pt-14 pb-12 overflow-hidden">
		<!-- Background decorative gradients -->
		<div class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-emerald-100/60 via-emerald-50/20 to-transparent rounded-b-3xl -z-10 pointer-events-none"></div>
		<div class="absolute -top-24 right-10 w-72 h-72 bg-amber-100/50 rounded-full blur-3xl -z-10 pointer-events-none"></div>

		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<!-- Top Badge -->
			<div class="flex justify-center mb-6">
				<div class="inline-flex items-center gap-2 bg-emerald-100/80 text-emerald-900 border border-emerald-300/80 px-4 py-1.5 rounded-full text-xs md:text-sm font-bold shadow-2xs backdrop-blur-md">
					<span class="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
					<span>{isKannada ? '🌾 ಕರ್ನಾಟಕ ಎಪಿಎಂಸಿ ಜೋಡಿತ ಡಿಜಿಟಲ್ ಮಂಡಿ' : '🌾 Karnataka APMC-Linked Digital Mandi'}</span>
				</div>
			</div>

			<!-- Hero Headlines -->
			<div class="text-center max-w-3xl mx-auto space-y-4">
				<h1 class="text-3xl sm:text-5xl md:text-6xl font-black text-stone-900 tracking-tight leading-[1.15]">
					<span>{isKannada ? 'ಸಣ್ಣ ಮತ್ತು ಮಧ್ಯಮ ರೈತರನ್ನು' : 'Connecting Marginal Farmers'}</span>
					<br class="hidden sm:inline" />
					<span class="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-700 bg-clip-text text-transparent">
						{isKannada ? 'ನೇರವಾಗಿ ಖರೀದಿದಾರರಿಗೆ ಜೋಡಿಸುವುದು' : 'Directly with Trusted Buyers'}
					</span>
				</h1>

				<p class="text-sm sm:text-base md:text-lg text-stone-600 font-medium max-w-2xl mx-auto leading-relaxed">
					{isKannada
						? 'ದಿನನಿತ್ಯದ ನಿಖರ ಎಪಿಎಂಸಿ ಮಂಡಿ ಬೆಲೆಗಳು, ಮಧ್ಯವರ್ತಿಗಳಿಲ್ಲದೆ ನೇರ ಸಂವಾದ, ಶೂನ್ಯ ಕಮಿಷನ್ ಮತ್ತು ತೋಟದಲ್ಲೇ ಖಚಿತ ಖರೀದಿಯ ನವೀನ ವೇದಿಕೆ.'
						: 'Empowering smallholder farmers in Karnataka with verified APMC prices, direct transparent bids from buyers, and zero commission brokerages.'}
				</p>
			</div>

			<!-- Role Selection CTA Cards -->
			<div class="mt-10 max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
				<!-- Farmer CTA Card -->
				<div
					class="group relative bg-gradient-to-br from-emerald-800 to-emerald-950 text-white rounded-3xl p-6 shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.99] transition-all duration-300 cursor-pointer overflow-hidden border border-emerald-700/50 flex flex-col justify-between"
					onclick={startAsFarmer}
					role="button"
					tabindex="0"
					onkeydown={(e) => e.key === 'Enter' && startAsFarmer()}
				>
					<div class="absolute -right-4 -bottom-4 text-emerald-700/20 pointer-events-none group-hover:scale-110 transition-transform">
						<Sprout class="w-32 h-32" />
					</div>

					<div>
						<div class="inline-flex items-center gap-1.5 bg-emerald-700/80 text-emerald-100 text-[11px] font-bold px-3 py-1 rounded-full mb-4 border border-emerald-500/30">
							<Sparkles class="w-3 h-3 text-emerald-300" />
							<span>{isKannada ? 'ರೈತರಿಗಾಗಿ' : 'For Farmers'}</span>
						</div>
						<h2 class="text-xl font-extrabold text-white mb-2">
							{isKannada ? 'ನಾನು ರೈತ (ಮಾರಾಟಗಾರ)' : 'Continue as Farmer'}
						</h2>
						<p class="text-xs text-emerald-200/90 leading-relaxed font-medium mb-6">
							{isKannada
								? 'ನಿಮ್ಮ ಅಡಿಕೆ, ತೆಂಗು, ಮೆಣಸು, ಭತ್ತವನ್ನು ನೇರವಾಗಿ ಮಾರುಕಟ್ಟೆಗೆ ಹಾಕಿ, ಮಧ್ಯವರ್ತಿಗಳಿಲ್ಲದೆ ನ್ಯಾಯಯುತ ಬೆಲೆ ಪಡೆಯಿರಿ.'
								: 'List your harvest in 60 seconds. Get real APMC price benchmarks and direct offers from verified buyers.'}
						</p>
					</div>

					<div class="flex items-center justify-between pt-4 border-t border-emerald-700/60">
						<span class="text-xs font-bold text-white group-hover:underline">
							{isKannada ? 'ರೈತರಾಗಿ ಪ್ರವೇಶಿಸಿ' : 'Enter as Farmer'}
						</span>
						<div class="w-8 h-8 rounded-full bg-white text-emerald-900 flex items-center justify-center shadow-xs group-hover:translate-x-1 transition-transform">
							<ArrowRight class="w-4 h-4 stroke-[2.5]" />
						</div>
					</div>
				</div>

				<!-- Buyer CTA Card -->
				<div
					class="group relative bg-white text-stone-900 rounded-3xl p-6 shadow-lg hover:shadow-2xl hover:scale-[1.02] active:scale-[0.99] transition-all duration-300 cursor-pointer overflow-hidden border border-stone-200 flex flex-col justify-between"
					onclick={startAsBuyer}
					role="button"
					tabindex="0"
					onkeydown={(e) => e.key === 'Enter' && startAsBuyer()}
				>
					<div class="absolute -right-4 -bottom-4 text-stone-100 pointer-events-none group-hover:scale-110 transition-transform">
						<Users class="w-32 h-32" />
					</div>

					<div>
						<div class="inline-flex items-center gap-1.5 bg-amber-50 text-amber-900 text-[11px] font-bold px-3 py-1 rounded-full mb-4 border border-amber-200">
							<Sparkles class="w-3 h-3 text-amber-600" />
							<span>{isKannada ? 'ಖರೀದಿದಾರರಿಗಾಗಿ' : 'For Buyers'}</span>
						</div>
						<h2 class="text-xl font-extrabold text-stone-900 mb-2">
							{isKannada ? 'ನಾನು ಖರೀದಿದಾರ / ವ್ಯಾಪಾರಿ' : 'Continue as Buyer'}
						</h2>
						<p class="text-xs text-stone-600 leading-relaxed font-medium mb-6">
							{isKannada
								? 'ಸ್ಥಳೀಯ ತೋಟಗಳಿಂದ ತಾಜಾ ಕೃಷಿ ಉತ್ಪನ್ನಗಳನ್ನು ನೇರವಾಗಿ ನೋಡಿ, ಬೆಲೆ ಹೋಲಿಸಿ ಮತ್ತು ನೇರ ಬಿಡ್ ಕಳುಹಿಸಿ.'
								: 'Source directly from verified farmers in Karnataka. Compare quality grades and send instant digital bids.'}
						</p>
					</div>

					<div class="flex items-center justify-between pt-4 border-t border-stone-100">
						<span class="text-xs font-bold text-stone-900 group-hover:text-emerald-700 transition-colors">
							{isKannada ? 'ಖರೀದಿದಾರರಾಗಿ ಪ್ರವೇಶಿಸಿ' : 'Enter as Buyer'}
						</span>
						<div class="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center shadow-xs group-hover:bg-emerald-700 group-hover:translate-x-1 transition-all">
							<ArrowRight class="w-4 h-4 stroke-[2.5]" />
						</div>
					</div>
				</div>
			</div>

			<!-- Live APMC Ticker Strip -->
			<div class="mt-12 bg-white rounded-2xl border border-stone-200/90 p-4 shadow-sm">
				<div class="flex items-center justify-between mb-3 border-b border-stone-100 pb-2">
					<div class="flex items-center gap-2">
						<span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
						<span class="text-xs font-bold text-stone-800 uppercase tracking-wider">
							{isKannada ? 'ಇಂದಿನ ಅಧಿಕೃತ ಎಪಿಎಂಸಿ ಮಂಡಿ ಬೆಲೆಗಳು' : 'Today\'s Official APMC Mandi Rates'}
						</span>
					</div>
					<span class="text-[11px] text-stone-500 font-medium">
						{isKannada ? 'ಬೆಳಗ್ಗೆ ೬:೩೦ಕ್ಕೆ ನವೀಕರಿಸಲಾಗಿದೆ' : 'Updated: 6:30 AM'}
					</span>
				</div>

				<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
					{#each prices as item}
						<div class="bg-stone-50 rounded-xl p-2.5 border border-stone-200/60">
							<div class="text-[11px] font-semibold text-stone-600 truncate">
								{isKannada ? item.cropKn : item.cropEn}
							</div>
							<div class="text-sm font-extrabold text-stone-900 mt-0.5">
								₹{item.modalPrice.toLocaleString()}
							</div>
							<div class="flex items-center justify-between mt-1 text-[10px]">
								<span class="text-stone-400 truncate">{isKannada ? item.apmcKn : item.apmcEn}</span>
								<span class="font-bold {item.changePercent >= 0 ? 'text-emerald-700' : 'text-rose-600'}">
									{item.changePercent >= 0 ? `+${item.changePercent}%` : `${item.changePercent}%`}
								</span>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- Key Metrics Highlights -->
			<div class="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
				<div class="bg-white rounded-3xl p-5 border border-stone-200/80 text-center shadow-2xs">
					<div class="text-2xl md:text-3xl font-black text-emerald-800 tracking-tight">₹4,850+</div>
					<div class="text-xs font-semibold text-stone-600 mt-1">
						{isKannada ? 'ಕ್ವಿಂಟಾಲ್‌ಗೆ ಹೆಚ್ಚುವರಿ ಲಾಭ' : 'Avg Extra Income/Qtl'}
					</div>
				</div>

				<div class="bg-white rounded-3xl p-5 border border-stone-200/80 text-center shadow-2xs">
					<div class="text-2xl md:text-3xl font-black text-stone-900 tracking-tight">14,200+</div>
					<div class="text-xs font-semibold text-stone-600 mt-1">
						{isKannada ? 'ನೋಂದಾಯಿತ ರೈತರು' : 'Karnataka Farmers'}
					</div>
				</div>

				<div class="bg-white rounded-3xl p-5 border border-stone-200/80 text-center shadow-2xs">
					<div class="text-2xl md:text-3xl font-black text-emerald-800 tracking-tight">8 ತಾಲೂಕುಗಳು</div>
					<div class="text-xs font-semibold text-stone-600 mt-1">
						{isKannada ? 'ಕರಾವಳಿ ಮತ್ತು ಮಲೆನಾಡು' : 'Coastal & Malnad Coverage'}
					</div>
				</div>

				<div class="bg-white rounded-3xl p-5 border border-stone-200/80 text-center shadow-2xs">
					<div class="text-2xl md:text-3xl font-black text-amber-600 tracking-tight">0%</div>
					<div class="text-xs font-semibold text-stone-600 mt-1">
						{isKannada ? 'ಮಧ್ಯವರ್ತಿ ಕಮಿಷನ್' : 'Middleman Commission'}
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- How It Works Section -->
	<section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
		<div class="text-center max-w-2xl mx-auto mb-12">
			<span class="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
				{isKannada ? 'ಸರಳ ಪ್ರಕ್ರಿಯೆ' : 'Simple 4-Step Journey'}
			</span>
			<h2 class="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mt-3">
				{isKannada ? 'ಮಂಡಿಮಿತ್ರ ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ?' : 'How MandiMitra Works'}
			</h2>
			<p class="text-xs sm:text-sm text-stone-600 font-medium mt-2">
				{isKannada
					? 'ಮೊಬೈಲ್ ಬಳಸಲು ಕಲಿಯುತ್ತಿರುವ ರೈತರಿಗೂ ಅತ್ಯಂತ ಸರಳ ಮತ್ತು ಸುಲಭ.'
					: 'Frictionless flow designed for first-time smartphone farmers and commercial buyers.'}
			</p>
		</div>

		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
			<!-- Step 1 -->
			<div class="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs relative flex flex-col justify-between">
				<div>
					<span class="text-3xl font-black text-emerald-200/80 font-mono">01</span>
					<h3 class="text-base font-bold text-stone-900 mt-2 mb-2">
						{isKannada ? 'ಬೆಳೆಯ ವಿವರ ಹಾಕಿ' : 'Farmer Lists Harvest'}
					</h3>
					<p class="text-xs text-stone-600 leading-relaxed">
						{isKannada
							? 'ಫೋಟೋ ತೆಗೆಯಿರಿ, ಪ್ರಮಾಣ ಮತ್ತು ನಿರೀಕ್ಷಿತ ಬೆಲೆ ಹಾಕಿ. ಎಪಿಎಂಸಿ ದರ ಸಲಹೆಗಾರ ಮಾರ್ಗದರ್ಶನ ನೀಡುತ್ತದೆ.'
							: 'Snap a photo, choose quantity, and receive instant APMC market benchmark price advice.'}
					</p>
				</div>
				<div class="mt-6 pt-4 border-t border-stone-100 flex items-center gap-2 text-[11px] font-semibold text-emerald-700">
					<CheckCircle2 class="w-4 h-4" />
					<span>{isKannada ? '೬೦ ಸೆಕೆಂಡ್‌ಗಳಲ್ಲಿ ಪೂರ್ಣ' : 'Ready in 60 seconds'}</span>
				</div>
			</div>

			<!-- Step 2 -->
			<div class="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs relative flex flex-col justify-between">
				<div>
					<span class="text-3xl font-black text-emerald-200/80 font-mono">02</span>
					<h3 class="text-base font-bold text-stone-900 mt-2 mb-2">
						{isKannada ? 'ಖರೀದಿದಾರರಿಂದ ಬಿಡ್' : 'Buyers Discover & Bid'}
					</h3>
					<p class="text-xs text-stone-600 leading-relaxed">
						{isKannada
							? 'ದೃಢೀಕೃತ ವ್ಯಾಪಾರಿಗಳು ಬೆಳೆ ಪರಿಶೀಲಿಸಿ, ನೇರ ಆಫರ್ ಮತ್ತು ವಾಹನ ಸೌಲಭ್ಯದ ಮಾಹಿತಿ ನೀಡುತ್ತಾರೆ.'
							: 'Verified buyers browse graded crops by taluk and submit transparent price proposals.'}
					</p>
				</div>
				<div class="mt-6 pt-4 border-t border-stone-100 flex items-center gap-2 text-[11px] font-semibold text-emerald-700">
					<CheckCircle2 class="w-4 h-4" />
					<span>{isKannada ? 'ನೇರ ಖರೀದಿದಾರರು' : 'Verified APMC buyers'}</span>
				</div>
			</div>

			<!-- Step 3 -->
			<div class="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs relative flex flex-col justify-between">
				<div>
					<span class="text-3xl font-black text-emerald-200/80 font-mono">03</span>
					<h3 class="text-base font-bold text-stone-900 mt-2 mb-2">
						{isKannada ? 'ಬೆಲೆ ಒಪ್ಪಿಗೆ / ಚೌಕಾಶಿ' : '1-Click Deal or Counter'}
					</h3>
					<p class="text-xs text-stone-600 leading-relaxed">
						{isKannada
							? 'ರೈತರು ಬಂದಿರುವ ಆಫರ್ ಒಪ್ಪಿಕೊಳ್ಳಬಹುದು ಅಥವಾ ತಮ್ಮದೇ ಕೌಂಟರ್ ಬೆಲೆ ಕಳುಹಿಸಬಹುದು.'
							: 'Farmer easily accepts in 1 click or sends an immediate counter price.'}
					</p>
				</div>
				<div class="mt-6 pt-4 border-t border-stone-100 flex items-center gap-2 text-[11px] font-semibold text-emerald-700">
					<CheckCircle2 class="w-4 h-4" />
					<span>{isKannada ? 'ಯಾವುದೇ ದಲ್ಲಾಳಿ ಇಲ್ಲ' : 'No broker pressure'}</span>
				</div>
			</div>

			<!-- Step 4 -->
			<div class="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs relative flex flex-col justify-between">
				<div>
					<span class="text-3xl font-black text-emerald-200/80 font-mono">04</span>
					<h3 class="text-base font-bold text-stone-900 mt-2 mb-2">
						{isKannada ? 'ವ್ಯವಹಾರ ದೃಢೀಕರಣ' : 'Farmgate Pickup & WhatsApp'}
					</h3>
					<p class="text-xs text-stone-600 leading-relaxed">
						{isKannada
							? 'ವಾಟ್ಸಾಪ್ ಸಂದೇಶ, ಡಿಜಿಟಲ್ ಗೇಟ್-ಪಾಸ್ ಮತ್ತು ನೇರ ತೋಟದಲ್ಲೇ ತೂಕ ಹಾಗೂ ಹಣ ಪಾವತಿ.'
							: 'Instant digital trade pass, automated WhatsApp receipt, and farmgate weighment.'}
					</p>
				</div>
				<div class="mt-6 pt-4 border-t border-stone-100 flex items-center gap-2 text-[11px] font-semibold text-emerald-700">
					<CheckCircle2 class="w-4 h-4" />
					<span>{isKannada ? 'ತಕ್ಷಣದ ವಾಟ್ಸಾಪ್ ಸಂದೇಶ' : 'WhatsApp gate pass'}</span>
				</div>
			</div>
		</div>
	</section>

	<!-- Farmer Testimonial / Story Card -->
	<section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
		<div class="bg-gradient-to-br from-stone-900 via-stone-800 to-stone-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
			<div class="max-w-3xl">
				<div class="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full mb-4 border border-emerald-500/30">
					<Sparkles class="w-3.5 h-3.5" />
					<span>{isKannada ? 'ರೈತರ ಅನುಭವ' : 'Farmer Story from Puttur'}</span>
				</div>

				<blockquote class="text-lg sm:text-2xl font-bold leading-relaxed mb-6">
					"{isKannada
						? 'ಹಿಂದೆ ಪುತ್ತೂರು ಮಂಡಿಗೆ ಅಡಿಕೆ ಒಯ್ಯಲು ಲಾರಿ ಬಾಡಿಗೆ ಮತ್ತು ದಲ್ಲಾಳಿ ಕಮಿಷನ್ ಎಂದು ಕ್ವಿಂಟಾಲ್‌ಗೆ ₹೨,೫೦೦ ಕಳೆಯುತ್ತಿತ್ತು. ಮಂಡಿಮಿತ್ರದಿಂದ ಖರೀದಿದಾರರೇ ತೋಟಕ್ಕೆ ಬಂದು, ನಿಖರ ಮಂಡಿ ಬೆಲೆಗೆ ತೂಕ ಮಾಡಿ ಹಣ ಕೊಟ್ಟರು.'
						: 'Earlier, we lost over ₹2,500 per quintal on transport and commissions. With MandiMitra, verified traders came straight to our farm in Puttur and paid exact market benchmark price!'}"
				</blockquote>

				<div class="flex items-center gap-3">
					<img
						src="https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&w=150&q=80"
						alt="Manjunath Gowda"
						class="w-12 h-12 rounded-full object-cover border-2 border-emerald-500"
					/>
					<div>
						<div class="text-sm font-bold text-white">Manjunath Gowda (ಮಂಜುನಾಥ ಗೌಡ)</div>
						<div class="text-xs text-stone-400">Arecanut & Pepper Farmer, Puttur Taluk, Dakshina Kannada</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</div>
