# MandiMitra (ಮಂಡಿಮಿತ್ರ) – Interactive Clickable Prototype

> **Kannada-First Direct Farmer-to-Buyer Marketplace & APMC Price Transparency Engine**  
> *Built for the Hackathon Selection Round*

---

## 🌾 Overview

**MandiMitra** is a high-fidelity, interactive clickable prototype designed to demonstrate a direct marketplace for Karnataka's smallholder farmers (starting with Dakshina Kannada, Udupi, and Malnad regions). It empowers farmers with transparent APMC mandi price benchmarks, zero-commission direct buyer bidding, and frictionless vernacular UX.

> **Selection Round Note**: Per hackathon selection round guidelines, this prototype is **100% frontend and client-side reactive**. It contains **no backend server, external databases, cloud speech APIs, or payment gateways**. All data, market rates, and user interactions are driven by realistic simulated Karnataka agricultural datasets and reactive browser state.

---

## 🎯 Verification & Audit of Documented Features

Every feature listed below is verified and genuinely testable in the prototype:

| Feature Claim | Implementation Status | How to Test in Prototype |
| :--- | :--- | :--- |
| **Floating Demo Controller Dock** | **Fully Implemented** | Discreet floating pill in the bottom right corner of every screen. Clicking it opens a drawer to jump directly to any of the 9 stages (1 to 9) or toggle between Farmer and Buyer roles in one click. |
| **Audio Accessibility / Kannada Voice Search** | **Fully Implemented (Simulated Demo)** | In `/buyer`, click the microphone icon (🎤) inside the search bar. It triggers an animated listening indicator and toast notification in Kannada, auto-populates *"Arecanut"* (*ಅಡಿಕೆ*), and filters matching listings. |
| **Karnataka APMC Benchmark Price Ticker** | **Fully Implemented (Simulated Daily Feed)** | Displayed on the Landing Page (`/`) and Farmer Hub (`/farmer`). Shows modal benchmark prices, percentage fluctuations, and local yards (Puttur, Bantwal, Sullia, Belthangady, Udupi). |
| **One-Click Simulated Phone Call** | **Fully Implemented** | On `/buyer/crop`, click *"Call Farmer Directly"*. It triggers the `tel:` dialer protocol on supported devices and displays a direct contact notification with the farmer's verified number. |
| **Download Digital Gate Pass** | **Fully Implemented (Client-Side)** | On `/deal-confirmed`, click *"Download Gate Pass"*. Generates and immediately downloads a genuine `.txt` trade pass voucher (`MandiMitra_GatePass_MM-KA-XXXXXX.txt`) to your device. |
| **Share on WhatsApp** | **Fully Implemented** | On `/deal-confirmed`, click *"Share on WhatsApp"*. Opens `api.whatsapp.com` with a pre-filled, formatted trade confirmation text ready to dispatch. |
| **Unique Deal ID Generation** | **Fully Implemented** | On `/deal-confirmed`, generates a unique official voucher reference (e.g., `MM-KA-849201`) reflected across the gate pass file and WhatsApp message. |
| **WhatsApp Confirmation Preview Box** | **Fully Implemented** | On `/deal-confirmed`, renders an authentic WhatsApp chat bubble preview with trade summary, farmer, buyer, and APMC compliance details. |
| **Farmer Testimonial & Case Study** | **Fully Implemented** | On `/`, displays a verified farmer case study from Manjunath Gowda (Puttur Taluk) in both Kannada and English. |
| **Impact & Target Metrics** | **Fully Implemented** | On `/`, highlights target platform economics: *₹4,850+ extra income/Qtl*, *14,200+ Karnataka farmers*, *8 taluk coverage*, and *0% commission*. |

---

## 🚀 The Complete 9-Stage Demo Journey

1. **Landing Page (`/`)**: Bilingual hero section, APMC price ticker, dual-role entry points, value propositions, and farmer stories.
2. **Mock Login (`/login`)**: Role-switcher (Farmer vs. Buyer), pre-filled phone number, 4-digit mock OTP, and 1-tap fast-track buttons for rapid judge evaluation.
3. **Farmer Hub (`/farmer`)**: Farm portfolio cards, active listings, middleman commission savings counter, and incoming buyer bid alerts.
4. **Add Produce Flow (`/farmer/add`)**: 1-click crop chips, quantity input, taluk selection, and the **APMC Benchmark Price Advisor** which dynamically classifies rates into *Fair Price*, *Great Deal*, or *Premium*.
5. **Buyer Marketplace (`/buyer`)**: Filter by Karnataka taluks, crop category, and "Fair Price Only", with real-time text and simulated voice search.
6. **Crop Listing Details (`/buyer/crop`)**: High-res harvest view, APMC benchmark comparison visualizer, farm location, simulated farmer direct call, and direct buy option.
7. **Submit Buyer Offer (`/buyer/offer`)**: Custom bidding interface showing real-time total payout calculations against the farmer's asking rate.
8. **Farmer Offer Review (`/farmer/offers`)**: Farmer inbox to review buyer bids, make an instant counter-offer, or accept the deal.
9. **Trade Confirmation (`/deal-confirmed`)**: Celebration confetti, official Trade Voucher with unique Deal ID, downloadable Digital Gate Pass, and WhatsApp dispatch.

---

## 💻 Tech Stack

- **Framework**: [SvelteKit](https://kit.svelte.dev/) with Svelte 5 Runes & TypeScript
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide Svelte](https://lucide.dev/)
- **Visual FX**: [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)
- **State Management**: Reactive Svelte stores with localStorage persistence

---

## 🛠️ How to Run Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- npm

### Installation & Execution
```bash
# Clone the repository
git clone <repo-url>
cd MandiMitra

# Install dependencies
npm install

# Run the development server
npm run dev

# Open in browser
http://127.0.0.1:5173/
```

### Type Checking & Build Validation
```bash
# Run svelte-check
npm run check

# Build production bundle
npm run build
```
