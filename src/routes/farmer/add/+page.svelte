<script lang="ts">
	import { language, addProduceListing, selectedListingId } from '#lib/stores/appStore';
	import { cropPresets, karnatakaTaluks } from '#lib/mockData';
	import SuccessDialog from '#lib/components/SuccessDialog.svelte';
	import PriceComparisonBadge from '#lib/components/PriceComparisonBadge.svelte';
	import { goto } from '$app/navigation';
	import {
		Sprout,
		Camera,
		CheckCircle2,
		ArrowRight,
		Info,
		Sparkles,
		UploadCloud,
		ArrowLeft,
		TrendingUp,
		ShieldCheck
	} from '@lucide/svelte';

	let isKannada = $derived($language === 'kn');

	// Form State
	let selectedCropId = $state('arecanut');
	let quantity = $state(20);
	let unit = $state('Quintals');
	let unitKn = $state('ಕ್ವಿಂಟಾಲ್');
	let askingPrice = $state(49500);
	let taluk = $state('Puttur');
	let organicCertified = $state(true);
	let description = $state('High quality harvest, naturally sun-dried and sorted. Moisture under 10%.');
	let customImageUrl = $state('');

	// Current active preset
	let activePreset = $derived(cropPresets.find((c) => c.id === selectedCropId) || cropPresets[0]);

	import type { FairPriceGrade } from '#lib/types';

	// Reactive calculation of mandi benchmark
	let mandiBenchmark = $derived(activePreset.defaultMandiPrice);
	let diffPercent = $derived(
		parseFloat((((askingPrice - mandiBenchmark) / mandiBenchmark) * 100).toFixed(1))
	);

	let fairGrade = $derived.by((): FairPriceGrade => {
		if (diffPercent <= 2) return 'great_deal';
		if (diffPercent <= 6) return 'fair';
		return 'premium';
	});

	let isSuccessOpen = $state(false);
	let createdListingId = $state('');

	function handleCropChange(cropId: string) {
		selectedCropId = cropId;
		const preset = cropPresets.find((c) => c.id === cropId);
		if (preset) {
			unit = preset.unitEn;
			unitKn = preset.unitKn;
			askingPrice = Math.round(preset.defaultMandiPrice * 1.02); // 2% above mandi
			taluk = preset.defaultTaluk;
		}
	}

	function handlePresetImage(imgUrl: string) {
		customImageUrl = imgUrl;
	}

	function handleSubmit() {
		const newListing = addProduceListing({
			cropEn: activePreset.nameEn,
			cropKn: activePreset.nameKn,
			category: 'Commercial',
			quantity,
			unit,
			unitKn,
			askingPrice,
			mandiPrice: mandiBenchmark,
			taluk,
			image: customImageUrl || activePreset.sampleImage,
			organicCertified,
			descriptionEn: description,
			descriptionKn: isKannada ? 'ತಾಜಾ ಕೊಯ್ಲು ಮಾಡಿದ ಗುಣಮಟ್ಟದ ಕೃಷಿ ಉತ್ಪನ್ನ. ಮಾರಾಟಕ್ಕೆ ಸಿದ್ಧವಾಗಿದೆ.' : description
		});

		createdListingId = newListing.id;
		selectedListingId.set(newListing.id);
		isSuccessOpen = true;
	}

	function handleViewInBuyerMarket() {
		isSuccessOpen = false;
		goto('/buyer/crop');
	}

	function handleReturnDashboard() {
		isSuccessOpen = false;
		goto('/farmer');
	}
</script>

<div class="max-w-3xl mx-auto px-4 py-6 md:py-10 space-y-8">
	<!-- Top back button -->
	<div>
		<a href="/farmer" class="inline-flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-emerald-800 transition-colors">
			<ArrowLeft class="w-4 h-4" />
			<span>{isKannada ? 'ರೈತರ ಹಬ್‌ಗೆ ಹಿಂತಿರುಗಿ' : 'Back to Farmer Hub'}</span>
		</a>
	</div>

	<!-- Header Title -->
	<div class="space-y-2">
		<div class="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-900 text-xs font-bold px-3 py-1 rounded-full border border-emerald-300">
			<Sprout class="w-3.5 h-3.5 text-emerald-700" />
			<span>{isKannada ? 'ಹೊಸ ಬೆಳೆ ಪಟ್ಟಿ ಮಾಡಿ' : 'Quick Produce Listing'}</span>
		</div>
		<h1 class="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
			{isKannada ? 'ನಿಮ್ಮ ಬೆಳೆ ಮಾರಾಟಕ್ಕೆ ಸೇರಿಸಿ' : 'List Your Harvest for Direct Sale'}
		</h1>
		<p class="text-xs sm:text-sm text-stone-500 font-medium">
			{isKannada
				? 'ನಿಮ್ಮ ಬೆಳೆಯನ್ನು ಪ್ರಕಟಿಸಿ ಮತ್ತು ದೃಢೀಕೃತ ಖರೀದಿದಾರರಿಂದ ನೇರ ಬಿಡ್ ಪಡೆಯಿರಿ.'
				: 'Publish your produce to hundreds of verified local Karnataka traders with zero brokerage.'}
		</p>
	</div>

	<!-- Form Card -->
	<form
		onsubmit={(e) => {
			e.preventDefault();
			handleSubmit();
		}}
		class="bg-white rounded-3xl border border-stone-200/90 shadow-xl p-6 sm:p-8 space-y-6"
	>
		<!-- Crop Selection Preset Chips -->
		<div>
			<label class="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
				{isKannada ? 'ಬೆಳೆಯ ಹೆಸರು ಆರಿಸಿ' : 'Select Crop'}
			</label>
			<div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
				{#each cropPresets as preset}
					<button
						type="button"
						onclick={() => handleCropChange(preset.id)}
						class="p-3 rounded-2xl border text-left transition-all duration-200 flex items-center gap-2.5 {selectedCropId === preset.id
							? 'bg-emerald-50 border-emerald-600 ring-2 ring-emerald-500/20 text-emerald-950 font-bold'
							: 'border-stone-200 hover:border-stone-300 text-stone-700'}"
					>
						<img src={preset.sampleImage} alt={preset.nameEn} class="w-10 h-10 rounded-xl object-cover shrink-0" />
						<div class="min-w-0">
							<div class="text-xs font-bold truncate">{isKannada ? preset.nameKn : preset.nameEn}</div>
							<div class="text-[10px] text-stone-500 font-medium">{isKannada ? preset.nameEn : preset.nameKn}</div>
						</div>
					</button>
				{/each}
			</div>
		</div>

		<!-- Quantity and Units -->
		<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
			<div>
				<label class="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
					{isKannada ? 'ಲಭ್ಯವಿರುವ ಪ್ರಮಾಣ' : 'Available Quantity'}
				</label>
				<input
					type="number"
					bind:value={quantity}
					min="1"
					class="w-full py-3 px-4 text-base font-bold text-stone-900 rounded-2xl border border-stone-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 focus:outline-hidden"
				/>
			</div>

			<div>
				<label class="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
					{isKannada ? 'ಅಳತೆಯ ಮಾನ' : 'Unit of Measurement'}
				</label>
				<select
					bind:value={unit}
					class="w-full py-3 px-4 text-sm font-bold text-stone-900 rounded-2xl border border-stone-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 focus:outline-hidden bg-white"
				>
					<option value="Quintals">Quintals (ಕ್ವಿಂಟಾಲ್)</option>
					<option value="Kg">Kilograms / Kg (ಕೆ.ಜಿ)</option>
					<option value="Nuts">Nuts (ಕಾಯಿಗಳು)</option>
					<option value="Tons">Tons (ಟನ್)</option>
				</select>
			</div>
		</div>

		<!-- APMC Price Advisor & Asking Price Input -->
		<div class="bg-stone-50 rounded-3xl p-5 border border-stone-200 space-y-4">
			<div class="flex items-start justify-between gap-2">
				<div class="flex items-center gap-2">
					<div class="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
						<TrendingUp class="w-4 h-4" />
					</div>
					<div>
						<h3 class="text-xs font-bold text-stone-900 uppercase tracking-wider">
							{isKannada ? 'ಎಪಿಎಂಸಿ ಮಂಡಿ ಬೆಲೆ ಸಲಹೆಗಾರ' : 'APMC Benchmark Price Advisor'}
						</h3>
						<p class="text-[11px] text-stone-500 font-medium">
							{isKannada ? 'ನಿಮ್ಮ ಸಮೀಪದ ಮಾರುಕಟ್ಟೆಯ ಇಂದಿನ ಸರಾಸರಿ ದರ' : 'Today\'s official benchmark rate in this taluk'}
						</p>
					</div>
				</div>

				<div class="text-right">
					<span class="text-xs font-extrabold text-stone-800 font-mono">
						₹{mandiBenchmark.toLocaleString()}
					</span>
					<span class="text-[10px] text-stone-500 block">/ {unit}</span>
				</div>
			</div>

			<!-- Price Input Slider & Input -->
			<div class="space-y-2">
				<div class="flex items-center justify-between">
					<label class="text-xs font-bold text-stone-700">
						{isKannada ? 'ನಿಮ್ಮ ನಿರೀಕ್ಷಿತ ಬೆಲೆ (₹ ಪ್ರತಿ ಮಾನಕ್ಕೆ)' : 'Your Expected Selling Price (₹)'}
					</label>
					<div class="flex items-center gap-2">
						<PriceComparisonBadge grade={fairGrade} diffPercent={diffPercent} size="sm" />
					</div>
				</div>

				<div class="relative flex items-center">
					<span class="absolute left-4 text-base font-bold text-stone-500">₹</span>
					<input
						type="number"
						bind:value={askingPrice}
						step="1"
						class="w-full py-3 pl-9 pr-4 text-xl font-black text-emerald-800 rounded-2xl border border-stone-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 focus:outline-hidden font-mono"
					/>
				</div>

				<p class="text-[11px] text-stone-500 leading-relaxed">
					{#if diffPercent >= 0}
						{isKannada
							? `ನಿಮ್ಮ ಬೆಲೆಯು ಎಪಿಎಂಸಿ ಮಂಡಿ ಬೆಲೆಗಿಂತ +${diffPercent}% ಹೆಚ್ಚಾಗಿದೆ.`
							: `Your asking price is +${diffPercent}% above APMC mandi rate.`}
					{:else}
						{isKannada
							? `ನಿಮ್ಮ ಬೆಲೆಯು ಎಪಿಎಂಸಿ ಮಂಡಿ ಬೆಲೆಗಿಂತ ${diffPercent}% ಕಡಿಮೆಯಾಗಿದೆ (ತ್ವರಿತ ಮಾರಾಟಕ್ಕೆ ಸೂಕ್ತ).`
							: `Your asking price is ${diffPercent}% below APMC mandi rate (fast sell).`}
					{/if}
				</p>
			</div>
		</div>

		<!-- Taluk Selection -->
		<div>
			<label class="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
				{isKannada ? 'ತಾಲೂಕು / ತೋಟದ ಸ್ಥಳ' : 'Taluk / Farm Location'}
			</label>
			<select
				bind:value={taluk}
				class="w-full py-3 px-4 text-sm font-semibold text-stone-900 rounded-2xl border border-stone-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 focus:outline-hidden bg-white"
			>
				{#each karnatakaTaluks as t}
					{#if t.id !== 'all'}
						<option value={t.id}>{isKannada ? `${t.kn} (${t.en})` : t.en}</option>
					{/if}
				{/each}
			</select>
		</div>

		<!-- Photo Selection -->
		<div>
			<label class="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
				{isKannada ? 'ಬೆಳೆಯ ಫೋಟೋ' : 'Produce Photo'}
			</label>
			<div class="flex items-center gap-3">
				<img
					src={customImageUrl || activePreset.sampleImage}
					alt="Selected preview"
					class="w-20 h-20 rounded-2xl object-cover border-2 border-emerald-600/30 shadow-xs"
				/>
				<div class="flex-1 space-y-1.5">
					<div class="text-xs font-bold text-stone-800">
						{isKannada ? 'ಹೈ-ರೆಸಲ್ಯೂಶನ್ ಫೋಟೋ ಆಯ್ಕೆ' : 'High Quality Crop Photo'}
					</div>
					<p class="text-[11px] text-stone-500">
						{isKannada ? 'ಡೆಮೊ ಪರೀಕ್ಷೆಗಾಗಿ ಮಾದರಿ ಫೋಟೋ ಸಿದ್ಧವಾಗಿದೆ' : 'Preset image selected. Real farmers can snap via mobile camera.'}
					</p>
				</div>
			</div>
		</div>

		<!-- Organic Certification Toggle -->
		<div class="flex items-center justify-between p-4 rounded-2xl bg-stone-50 border border-stone-200">
			<div class="flex items-center gap-3">
				<span class="text-xl">🌿</span>
				<div>
					<div class="text-xs font-bold text-stone-900">{isKannada ? 'ನೈಸರ್ಗಿಕ / ಸಾವಯವ ಕೃಷಿ' : 'Naturally Grown / Organic'}</div>
					<div class="text-[11px] text-stone-500">{isKannada ? 'ರಾಸಾಯನಿಕ ರಹಿತ ಬೆಳೆ' : 'Certified or naturally cultivated without chemicals'}</div>
				</div>
			</div>
			<input
				type="checkbox"
				bind:checked={organicCertified}
				class="w-5 h-5 accent-emerald-700 rounded-md cursor-pointer"
			/>
		</div>

		<!-- Submit Button -->
		<button
			type="submit"
			class="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-800 to-emerald-950 hover:from-emerald-700 hover:to-emerald-900 text-white font-extrabold text-sm shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2"
		>
			<Sparkles class="w-4 h-4 text-emerald-300" />
			<span>{isKannada ? 'ಮಾರುಕಟ್ಟೆಯಲ್ಲಿ ಪ್ರಕಟಿಸಿ (Publish Listing)' : 'Publish Produce to Marketplace'}</span>
			<ArrowRight class="w-4 h-4" />
		</button>
	</form>

	<!-- Success Dialog with Confetti -->
	<SuccessDialog
		isOpen={isSuccessOpen}
		title={isKannada ? '🎉 ಬೆಳೆ ಯಶಸ್ವಿಯಾಗಿ ಪ್ರಕಟವಾಗಿದೆ!' : '🎉 Listing Published Successfully!'}
		subtitle={isKannada
			? `${taluk} ತಾಲೂಕಿನ ಮತ್ತು ಕರ್ನಾಟಕದ ಖರೀದಿದಾರರಿಗೆ ಮಾಹಿತಿ ತಲುಪಿದೆ. ಇನ್ನು ಕೆಲವೇ ಕ್ಷಣಗಳಲ್ಲಿ ಬಿಡ್‌ಗಳನ್ನು ನಿರೀಕ್ಷಿಸಬಹುದು.`
			: `Your produce is live on MandiMitra! Local APMC buyers have received instant alerts.`}
		primaryBtnText={isKannada ? 'ಖರೀದಿದಾರರ ಮಾರುಕಟ್ಟೆಯಲ್ಲಿ ವೀಕ್ಷಿಸಿ' : 'View in Buyer Marketplace'}
		secondaryBtnText={isKannada ? 'ರೈತರ ಹಬ್‌ಗೆ ಹಿಂತಿರುಗಿ' : 'Go to Farmer Dashboard'}
		onPrimary={handleViewInBuyerMarket}
		onSecondary={handleReturnDashboard}
		onClose={() => (isSuccessOpen = false)}
	/>
</div>
