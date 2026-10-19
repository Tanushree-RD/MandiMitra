<script lang="ts">
	import { language, userRole, mockLogin, setRole, addToast } from '#lib/stores/appStore';
	import type { UserRole } from '#lib/types';
	import { goto } from '$app/navigation';
	import { Phone, ShieldCheck, ArrowRight, Sprout, ShoppingBag, Sparkles, CheckCircle2 } from '@lucide/svelte';

	let isKannada = $derived($language === 'kn');
	let currentRole = $state<UserRole>('farmer');

	let step = $state<'phone' | 'otp'>('phone');
	let phoneNumber = $state('98452 71829');
	let otpDigits = $state(['4', '8', '2', '9']);
	let isSubmitting = $state(false);

	function chooseRole(r: UserRole) {
		currentRole = r;
		setRole(r);
		if (r === 'farmer') {
			phoneNumber = '98452 71829';
		} else {
			phoneNumber = '94481 22340';
		}
	}

	function handleGetOtp() {
		if (!phoneNumber || phoneNumber.length < 5) return;
		step = 'otp';
		addToast(
			isKannada ? 'ಒಟಿಪಿ ಕಳುಹಿಸಲಾಗಿದೆ' : 'OTP Sent',
			isKannada ? 'ಡೆಮೊ ಕೋಡ್: 4829' : 'Demo Code: 4829 (Auto-filled)',
			'info'
		);
	}

	function handleVerify() {
		isSubmitting = true;
		setTimeout(() => {
			isSubmitting = false;
			mockLogin(currentRole);
			if (currentRole === 'farmer') {
				goto('/farmer');
			} else {
				goto('/buyer');
			}
		}, 800);
	}

	function quickLogin(r: UserRole) {
		chooseRole(r);
		mockLogin(r);
		if (r === 'farmer') {
			goto('/farmer');
		} else {
			goto('/buyer');
		}
	}
</script>

<div class="max-w-md mx-auto px-4 py-8 md:py-16">
	<!-- Card Container -->
	<div class="bg-white rounded-3xl border border-stone-200/90 shadow-xl p-6 sm:p-8 relative overflow-hidden">
		<!-- Decorative glow -->
		<div class="absolute -top-12 -right-12 w-32 h-32 bg-emerald-100 rounded-full blur-2xl pointer-events-none"></div>

		<!-- Title & Subtitle -->
		<div class="text-center mb-6">
			<div class="w-12 h-12 rounded-2xl bg-emerald-800 text-white flex items-center justify-center mx-auto mb-3 shadow-md">
				{#if currentRole === 'farmer'}
					<Sprout class="w-6 h-6 stroke-[2.2]" />
				{:else}
					<ShoppingBag class="w-6 h-6 stroke-[2.2]" />
				{/if}
			</div>

			<h1 class="text-2xl font-extrabold text-stone-900 tracking-tight">
				{isKannada ? 'ಸುಲಭ ಡೆಮೊ ಲಾಗಿನ್' : 'Mock Demo Login'}
			</h1>
			<p class="text-xs text-stone-500 font-medium mt-1">
				{isKannada ? 'ಮಂಡಿಮಿತ್ರ ಮಾರುಕಟ್ಟೆಗೆ ಪ್ರವೇಶಿಸಿ' : 'Select role and sign in to MandiMitra'}
			</p>
		</div>

		<!-- Role Picker Pills -->
		<div class="grid grid-cols-2 gap-2 bg-stone-100 p-1.5 rounded-2xl mb-6">
			<button
				type="button"
				onclick={() => chooseRole('farmer')}
				class="py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 {currentRole === 'farmer'
					? 'bg-emerald-800 text-white shadow-xs'
					: 'text-stone-600 hover:text-stone-900'}"
			>
				<Sprout class="w-4 h-4" />
				<span>{isKannada ? 'ರೈತರ ಖಾತೆ' : 'Farmer Account'}</span>
			</button>

			<button
				type="button"
				onclick={() => chooseRole('buyer')}
				class="py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 {currentRole === 'buyer'
					? 'bg-stone-900 text-white shadow-xs'
					: 'text-stone-600 hover:text-stone-900'}"
			>
				<ShoppingBag class="w-4 h-4" />
				<span>{isKannada ? 'ಖರೀದಿದಾರರ ಖಾತೆ' : 'Buyer Account'}</span>
			</button>
		</div>

		{#if step === 'phone'}
			<!-- Phone Input Step -->
			<div class="space-y-4">
				<div>
					<label class="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
						{isKannada ? 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ' : 'Enter Mobile Number'}
					</label>
					<div class="relative flex items-center">
						<div class="absolute left-3.5 flex items-center gap-1 text-xs font-bold text-stone-500 pointer-events-none">
							<span>🇮🇳 +91</span>
							<span class="text-stone-300">|</span>
						</div>
						<input
							type="tel"
							bind:value={phoneNumber}
							placeholder="98450 12345"
							class="w-full py-3 pl-20 pr-4 text-base font-semibold text-stone-900 rounded-2xl border border-stone-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 focus:outline-hidden"
						/>
					</div>
					<p class="text-[11px] text-stone-400 mt-1">
						{isKannada ? 'ಯಾವುದೇ ಪಾಸ್‌ವರ್ಡ್ ಅಗತ್ಯವಿಲ್ಲ' : 'No password required for prototype'}
					</p>
				</div>

				<button
					type="button"
					onclick={handleGetOtp}
					class="w-full py-3.5 px-4 rounded-2xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
				>
					<span>{isKannada ? 'ಒಟಿಪಿ ಪಡೆಯಿರಿ (Get OTP)' : 'Continue to OTP'}</span>
					<ArrowRight class="w-4 h-4" />
				</button>
			</div>
		{:else}
			<!-- OTP Input Step -->
			<div class="space-y-5 animate-in fade-in">
				<div class="bg-emerald-50 rounded-2xl p-3 border border-emerald-200/80 text-center">
					<span class="text-xs font-bold text-emerald-900 block">
						{isKannada ? 'ಒಟಿಪಿ ಕಳುಹಿಸಲಾಗಿದೆ' : 'OTP Sent to'} +91 {phoneNumber}
					</span>
					<span class="text-[11px] text-emerald-700 font-medium">
						{isKannada ? 'ಡೆಮೊ ಕೋಡ್ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ತುಂಬಲಾಗಿದೆ' : 'Mock code: 4829 has been prefilled'}
					</span>
				</div>

				<div>
					<label class="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2 text-center">
						{isKannada ? '೪ ಅಂಕಿಗಳ ಒಟಿಪಿ ಕೋಡ್' : 'Enter 4-Digit Code'}
					</label>
					<div class="flex items-center justify-center gap-3">
						{#each otpDigits as digit}
							<div class="w-12 h-14 rounded-2xl bg-stone-50 border-2 border-emerald-600/60 font-mono text-2xl font-black text-stone-900 flex items-center justify-center shadow-2xs">
								{digit}
							</div>
						{/each}
					</div>
				</div>

				<button
					type="button"
					onclick={handleVerify}
					disabled={isSubmitting}
					class="w-full py-3.5 px-4 rounded-2xl bg-emerald-800 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
				>
					{#if isSubmitting}
						<div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
						<span>{isKannada ? 'ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...' : 'Verifying...'}</span>
					{:else}
						<CheckCircle2 class="w-4 h-4" />
						<span>{isKannada ? 'ದೃಢೀಕರಿಸಿ ಮಾರುಕಟ್ಟೆಗೆ ಪ್ರವೇಶಿಸಿ' : 'Verify & Enter'}</span>
					{/if}
				</button>

				<button
					type="button"
					onclick={() => (step = 'phone')}
					class="w-full text-center text-xs font-semibold text-stone-500 hover:text-stone-800"
				>
					{isKannada ? 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ಬದಲಾಯಿಸಿ' : 'Change Phone Number'}
				</button>
			</div>
		{/if}

		<!-- 1-Tap Quick Auto-fill shortcuts for Hackathon Selection Judges -->
		<div class="mt-8 pt-6 border-t border-stone-100">
			<span class="block text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-2 text-center">
				{isKannada ? 'ಪರೀಕ್ಷಕರಿಗಾಗಿ ತ್ವರಿತ ಪ್ರವೇಶ (One-Tap Fast Track)' : 'One-Tap Demo Fast-Track'}
			</span>
			<div class="space-y-2">
				<button
					type="button"
					onclick={() => quickLogin('farmer')}
					class="w-full py-2.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 text-emerald-900 text-xs font-bold transition-all flex items-center justify-between text-left"
				>
					<div class="flex items-center gap-2">
						<span class="w-6 h-6 rounded-lg bg-emerald-200 text-emerald-900 flex items-center justify-center text-xs">🌾</span>
						<div>
							<div class="font-bold">{isKannada ? 'ರೈತರಾಗಿ ತಕ್ಷಣ ಲಾಗಿನ್' : 'Instant Login as Farmer'}</div>
							<div class="text-[10px] text-emerald-700 font-normal">Manjunath Gowda (Puttur Taluk)</div>
						</div>
					</div>
					<ArrowRight class="w-3.5 h-3.5 text-emerald-800" />
				</button>

				<button
					type="button"
					onclick={() => quickLogin('buyer')}
					class="w-full py-2.5 px-3 rounded-xl bg-stone-100 hover:bg-stone-200/80 border border-stone-200 text-stone-900 text-xs font-bold transition-all flex items-center justify-between text-left"
				>
					<div class="flex items-center gap-2">
						<span class="w-6 h-6 rounded-lg bg-stone-300 text-stone-900 flex items-center justify-center text-xs">🛒</span>
						<div>
							<div class="font-bold">{isKannada ? 'ಖರೀದಿದಾರರಾಗಿ ತಕ್ಷಣ ಲಾಗಿನ್' : 'Instant Login as Buyer'}</div>
							<div class="text-[10px] text-stone-600 font-normal">Coastal Spices & Areca Traders (Mangaluru)</div>
						</div>
					</div>
					<ArrowRight class="w-3.5 h-3.5 text-stone-800" />
				</button>
			</div>
		</div>
	</div>
</div>
