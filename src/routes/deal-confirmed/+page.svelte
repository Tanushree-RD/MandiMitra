<script lang="ts">
	import { language, confirmedDeal, listings, addToast } from '#lib/stores/appStore';
	import confetti from 'canvas-confetti';

	const browser = typeof window !== 'undefined';
	import {
		CheckCircle2,
		Sparkles,
		Share2,
		Download,
		MapPin,
		Calendar,
		Phone,
		Building2,
		ArrowRight,
		ShieldCheck,
		ExternalLink,
		MessageCircle
	} from '@lucide/svelte';

	let isKannada = $derived($language === 'kn');
	let deal = $derived($confirmedDeal);
	let fallbackListing = $derived($listings[0]);

	// Resolved deal items or sample defaults
	let listing = $derived(deal ? deal.listing : fallbackListing);
	let offer = $derived(
		deal
			? deal.offer
			: {
					id: 'off-demo-confirmed',
					buyerName: 'Ramesh Shenoy',
					buyerCompany: 'Coastal Spices & Areca Traders',
					buyerPhone: '+91 94481 22340',
					buyerLocation: 'Bunder, Mangaluru',
					offerPricePerUnit: fallbackListing.askingPrice,
					quantityRequested: fallbackListing.quantity,
					totalAmount: fallbackListing.askingPrice * fallbackListing.quantity,
					status: 'accepted' as const,
					createdAt: 'Just now',
					note: 'Confirmed APMC farmgate pickup. Driver contact will be shared.'
			  }
	);

	let dealId = $state(`MM-KA-${Math.floor(100000 + Math.random() * 900000)}`);

	$effect(() => {
		if (browser) {
			try {
				confetti({
					particleCount: 120,
					spread: 80,
					origin: { y: 0.5 },
					colors: ['#047857', '#10b981', '#34d399', '#f59e0b', '#fbbf24']
				});
			} catch (e) {
				// ignore
			}
		}
	});

	function handleShareWhatsApp() {
		const text = `🤝 MandiMitra Trade Confirmed!\nDeal ID: ${dealId}\nCrop: ${listing.cropEn} (${listing.cropKn})\nQuantity: ${offer.quantityRequested} ${listing.unit}\nAgreed Price: ₹${offer.offerPricePerUnit.toLocaleString()} / ${listing.unit}\nTotal Payout: ₹${offer.totalAmount.toLocaleString()}\nPickup: ${listing.pickupAddress}\nFarmer: ${listing.farmerName} (${listing.farmerPhone})\nBuyer: ${offer.buyerCompany} (${offer.buyerPhone})\n✅ APMC compliant, 0% brokerage.`;
		
		addToast(
			isKannada ? 'ವಾಟ್ಸಾಪ್ ಸಂದೇಶ ಸಿದ್ಧವಾಗಿದೆ' : 'WhatsApp Message Ready',
			'Simulated dispatch to Farmer & Buyer WhatsApp threads',
			'deal'
		);

		if (browser) {
			const encoded = encodeURIComponent(text);
			window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
		}
	}

	function handleDownloadPass() {
		if (browser) {
			const passVoucher = `=====================================================
            MANDIMITRA (ಮಂಡಿಮಿತ್ರ)
    OFFICIAL DIGITAL FARMGATE TRADE PASS
=====================================================
Trade ID:            ${dealId}
Issue Timestamp:     ${new Date().toLocaleString('en-IN')}
Platform Compliance: APMC Verified & Compliant
Brokerage Fee:       ₹0 (Zero Middleman Deductions)
-----------------------------------------------------
CROP & TRANSACTION DETAILS:
Harvest:             ${listing.cropEn} (${listing.cropKn})
Quantity:            ${offer.quantityRequested} ${listing.unit}
Agreed Rate:         ₹${offer.offerPricePerUnit.toLocaleString()} / ${listing.unit}
Total Agreed Payout: ₹${offer.totalAmount.toLocaleString()}

-----------------------------------------------------
SELLER (FARMER):
Name:                ${listing.farmerName}
Phone:               ${listing.farmerPhone}
Farmgate Location:   ${listing.pickupAddress}
APMC Benchmark:      ${listing.mandiApmc}

-----------------------------------------------------
BUYER (TRADER):
Company:             ${offer.buyerCompany}
Representative:      ${offer.buyerName}
Phone:               ${offer.buyerPhone}
Operating Station:   ${offer.buyerLocation}

-----------------------------------------------------
LOGISTICS SCHEDULE:
Pickup Date:         Tomorrow, 09:30 AM (Farmgate Weighment)
Transport Status:    Vehicle Assigned & Dispatched
Weighment Terms:     Electronic weighment at farm gate
=====================================================
This official trade voucher authorizes direct farmgate 
loading and transport across Karnataka districts.
`;

			const blob = new Blob([passVoucher], { type: 'text/plain;charset=utf-8' });
			const downloadUrl = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = downloadUrl;
			a.download = `MandiMitra_GatePass_${dealId}.txt`;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			URL.revokeObjectURL(downloadUrl);
		}

		addToast(
			isKannada ? 'ಗೇಟ್ ಪಾಸ್ ಡೌನ್‌ಲೋಡ್ ಆಗಿದೆ' : 'Digital Gate Pass Downloaded',
			`MandiMitra_GatePass_${dealId}.txt saved to your device`,
			'success'
		);
	}
</script>

<div class="max-w-3xl mx-auto px-4 py-8 md:py-12 space-y-8">
	<!-- Celebratory Header Card -->
	<div class="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-950 text-white rounded-3xl p-6 sm:p-10 shadow-2xl text-center relative overflow-hidden border border-emerald-700/60">
		<!-- Background glow effects -->
		<div class="absolute -top-16 -left-16 w-44 h-44 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
		<div class="absolute -bottom-16 -right-16 w-44 h-44 bg-amber-500/20 rounded-full blur-3xl pointer-events-none"></div>

		<!-- Big Checkmark Badge with Pulse Ring -->
		<div class="relative w-24 h-24 mx-auto mb-5 flex items-center justify-center">
			<div class="absolute inset-0 rounded-full bg-emerald-400/20 animate-ping"></div>
			<div class="w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-500 to-emerald-400 text-white flex items-center justify-center shadow-lg shadow-emerald-500/40">
				<CheckCircle2 class="w-12 h-12 stroke-[2.5]" />
			</div>
		</div>

		<div class="inline-flex items-center gap-1.5 bg-emerald-700/70 text-emerald-200 text-xs font-bold px-3 py-1 rounded-full mb-3 border border-emerald-500/30">
			<Sparkles class="w-3.5 h-3.5 text-amber-300" />
			<span>{isKannada ? 'ವ್ಯವಹಾರ ಯಶಸ್ವಿಯಾಗಿ ದೃಢಪಟ್ಟಿದೆ' : 'Deal Confirmed & Locked'}</span>
		</div>

		<h1 class="text-2xl sm:text-4xl font-black tracking-tight mb-3">
			{isKannada ? 'ಅಭಿನಂದನೆಗಳು! ವ್ಯಾಪಾರ ಖಚಿತಗೊಂಡಿದೆ' : 'Congratulations! Trade Confirmed'}
		</h1>
		<p class="text-xs sm:text-sm text-emerald-200/90 max-w-lg mx-auto leading-relaxed font-medium">
			{isKannada
				? 'ಯಾವುದೇ ದಲ್ಲಾಳಿ ಕಮಿಷನ್ ಇಲ್ಲದೆ, ರೈತ ಮತ್ತು ಖರೀದಿದಾರರ ನಡುವೆ ನೇರ ತೋಟದಲ್ಲೇ ಖಚಿತವಾದ ಅಧಿಕೃತ ವ್ಯವಹಾರ.'
				: 'Direct farmgate trade established without brokerage. Official digital trade pass issued.'}
		</p>

		<!-- Pass ID Badge -->
		<div class="mt-6 inline-flex items-center gap-2 bg-black/40 text-stone-200 font-mono text-xs px-4 py-1.5 rounded-full border border-white/20">
			<span>{isKannada ? 'ಡೀಲ್ ಸಂಖ್ಯೆ' : 'Trade ID'}:</span>
			<span class="font-bold text-amber-300">{dealId}</span>
		</div>
	</div>

	<!-- Trade Summary Voucher / Receipt -->
	<div class="bg-white rounded-3xl border border-stone-200/90 shadow-xl overflow-hidden">
		<!-- Voucher Header -->
		<div class="bg-stone-50 px-6 py-4 border-b border-stone-200/80 flex items-center justify-between">
			<div class="flex items-center gap-2">
				<ShieldCheck class="w-5 h-5 text-emerald-700" />
				<h3 class="text-sm font-extrabold text-stone-900 uppercase tracking-wider">
					{isKannada ? 'ಅಧಿಕೃತ ವಹಿವಾಟು ಸಾರಾಂಶ' : 'Official Trade Voucher'}
				</h3>
			</div>
			<span class="text-xs font-semibold text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded-full border border-emerald-300">
				APMC Compliant
			</span>
		</div>

		<!-- Voucher Body -->
		<div class="p-6 sm:p-8 space-y-6">
			<!-- Crop & Total Highlight -->
			<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200">
				<div>
					<span class="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
						{isKannada ? 'ಒಪ್ಪಂದದ ಬೆಳೆ' : 'Agreed Harvest'}
					</span>
					<div class="text-xl font-black text-stone-900 mt-0.5">
						{isKannada ? listing.cropKn : listing.cropEn}
					</div>
					<p class="text-xs text-stone-600 font-medium">
						{offer.quantityRequested} {isKannada ? listing.unitKn : listing.unit} @ ₹{offer.offerPricePerUnit.toLocaleString()} / unit
					</p>
				</div>

				<div class="text-left sm:text-right">
					<span class="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">
						{isKannada ? 'ಒಟ್ಟು ಪಾವತಿ ಮೊತ್ತ' : 'Total Agreed Payout'}
					</span>
					<div class="text-2xl sm:text-3xl font-black text-emerald-800 font-mono">
						₹{offer.totalAmount.toLocaleString()}
					</div>
					<span class="text-[10px] text-emerald-700 font-bold">0% Middleman Deduction</span>
				</div>
			</div>

			<!-- Farmer & Buyer Side by Side Details -->
			<div class="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-stone-100">
				<!-- Farmer Contact -->
				<div class="space-y-2">
					<span class="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
						{isKannada ? 'ಮಾರಾಟಗಾರ (ರೈತ)' : 'Seller (Farmer)'}
					</span>
					<div class="flex items-start gap-3">
						<div class="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold text-sm shrink-0">
							🌾
						</div>
						<div>
							<h4 class="text-sm font-bold text-stone-900">{listing.farmerName}</h4>
							<p class="text-xs text-stone-500 font-mono mt-0.5">{listing.farmerPhone}</p>
							<p class="text-xs text-stone-600 font-medium mt-1 leading-snug">
								{listing.pickupAddress}
							</p>
						</div>
					</div>
				</div>

				<!-- Buyer Contact -->
				<div class="space-y-2">
					<span class="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
						{isKannada ? 'ಖರೀದಿದಾರ (ವ್ಯಾಪಾರಿ)' : 'Buyer (Purchaser)'}
					</span>
					<div class="flex items-start gap-3">
						<div class="w-9 h-9 rounded-xl bg-stone-100 text-stone-900 flex items-center justify-center font-bold text-sm shrink-0">
							🏢
						</div>
						<div>
							<h4 class="text-sm font-bold text-stone-900">{offer.buyerCompany}</h4>
							<p class="text-xs text-stone-500 font-medium">Rep: {offer.buyerName}</p>
							<p class="text-xs text-stone-500 font-mono mt-0.5">{offer.buyerPhone}</p>
							<p class="text-xs text-stone-600 font-medium mt-1">{offer.buyerLocation}</p>
						</div>
					</div>
				</div>
			</div>

			<!-- Pickup Timeline -->
			<div class="bg-stone-50 rounded-2xl p-4 border border-stone-100 flex items-center justify-between text-xs text-stone-700">
				<div class="flex items-center gap-2">
					<Calendar class="w-4 h-4 text-emerald-700 shrink-0" />
					<div>
						<span class="font-bold text-stone-900 block">{isKannada ? 'ನಿಗದಿತ ಪಿಕಪ್ ದಿನ' : 'Scheduled Pickup'}</span>
						<span class="text-stone-500">Tomorrow, 09:30 AM (Farmgate Weighment)</span>
					</div>
				</div>
				<span class="font-bold text-emerald-700 bg-emerald-100/70 px-2.5 py-1 rounded-lg">
					Vehicle Assigned
				</span>
			</div>
		</div>

		<!-- Voucher Actions -->
		<div class="bg-stone-50 px-6 py-4 border-t border-stone-200/80 flex flex-col sm:flex-row items-center justify-between gap-3">
			<button
				type="button"
				onclick={handleDownloadPass}
				class="w-full sm:w-auto py-2.5 px-4 rounded-xl border border-stone-300 hover:border-emerald-600 text-stone-700 hover:text-emerald-900 font-bold text-xs transition-colors flex items-center justify-center gap-2 bg-white"
			>
				<Download class="w-4 h-4" />
				<span>{isKannada ? 'ಡಿಜಿಟಲ್ ಗೇಟ್ ಪಾಸ್ ಡೌನ್‌ಲೋಡ್' : 'Download Gate Pass'}</span>
			</button>

			<button
				type="button"
				onclick={handleShareWhatsApp}
				class="w-full sm:w-auto py-2.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2"
			>
				<MessageCircle class="w-4 h-4" />
				<span>{isKannada ? 'ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಹಂಚಿಕೊಳ್ಳಿ' : 'Share on WhatsApp'}</span>
			</button>
		</div>
	</div>

	<!-- Realistic WhatsApp Confirmation Mock Box -->
	<div class="bg-white rounded-3xl border border-stone-200/90 shadow-md p-6 space-y-4">
		<div class="flex items-center justify-between border-b border-stone-100 pb-3">
			<div class="flex items-center gap-2">
				<div class="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center">
					<MessageCircle class="w-4 h-4 fill-white" />
				</div>
				<h3 class="text-xs font-bold text-stone-900 uppercase tracking-wider">
					{isKannada ? 'ಸ್ವಯಂಚಾಲಿತ ವಾಟ್ಸಾಪ್ ದೃಢೀಕರಣ ಸಂದೇಶ' : 'Automated WhatsApp Confirmation'}
				</h3>
			</div>
			<span class="text-[11px] text-stone-400 font-medium">Delivered to both parties</span>
		</div>

		<!-- Chat Bubble Preview -->
		<div class="bg-emerald-50/50 rounded-2xl p-4 border border-emerald-100 text-xs font-mono text-stone-800 leading-relaxed whitespace-pre-line shadow-2xs">
🤝 *MandiMitra Digital Trade Confirmation*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📌 *Deal ID:* {dealId}
🌾 *Produce:* {isKannada ? listing.cropKn : listing.cropEn}
📦 *Quantity:* {offer.quantityRequested} {listing.unit}
💰 *Locked Price:* ₹{offer.offerPricePerUnit.toLocaleString()} / {listing.unit}
💵 *Total Payout:* ₹{offer.totalAmount.toLocaleString()}
📍 *Pickup Farm:* {listing.pickupAddress}
👨‍🌾 *Farmer:* {listing.farmerName} ({listing.farmerPhone})
🏢 *Buyer:* {offer.buyerCompany} ({offer.buyerPhone})
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ *Verified APMC compliant. Zero commission broker fees.*
		</div>
	</div>

	<!-- Return Home Link -->
	<div class="text-center pt-2">
		<a
			href="/farmer"
			class="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 hover:text-emerald-950 underline underline-offset-4"
		>
			<span>{isKannada ? 'ರೈತರ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗೆ ಹಿಂತಿರುಗಿ' : 'Return to Farmer Hub'}</span>
			<ArrowRight class="w-4 h-4" />
		</a>
	</div>
</div>
