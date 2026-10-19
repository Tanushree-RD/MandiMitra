# 🌾 MandiMitra (ಮಂಡಿಮಿತ್ರ)

**Direct Farmer-to-Buyer Marketplace & APMC Price Transparency Engine for Karnataka Agriculture**

MandiMitra is a bilingual (Kannada & English), client-side interactive prototype designed to empower smallholder farmers across Coastal and Malnad Karnataka (Dakshina Kannada, Udupi, and surrounding taluks). By bridging the gap between local growers and commercial buyers, MandiMitra eliminates middleman commissions, provides transparent daily APMC mandi benchmark pricing, enables direct negotiation, and generates instant digital trade confirmations with downloadable gate passes.

---

## Live Demo

- **Repository**: [https://github.com/Tanushree-RD/MandiMitra](https://github.com/Tanushree-RD/MandiMitra)
- **Live Deployment**: _Deployment URL coming soon / Deployable on Vercel via `@sveltejs/adapter-auto`_

---

## Problem Statement

Smallholder farmers in Karnataka—producing high-value regional crops such as Arecanut (*ಅಡಿಕೆ*), Coconut (*ತೆಂಗಿನಕಾಯಿ*), Black Pepper (*ಕಾಳುಮೆಣಸು*), Jyothi Paddy (*ಭತ್ತ*), and Spices—face three structural challenges in traditional agricultural marketing:

1. **Information Asymmetry & Price Manipulation**: Commission agents and village middlemen conceal real-time APMC mandi modal rates. Farmers sell without knowing prevailing market prices, often losing ₹3,000–₹8,000 per quintal.
2. **Heavy Middleman Commissions & Delayed Payouts**: Intermediaries charge 6% to 12% in commissions and deduction cuts, coupled with arbitrary weighing adjustments and delayed payment cycles lasting weeks.
3. **Language & Digital Barriers**: Mainstream national agri-portals are predominantly in English or Hindi, with complex registration flows that intimidate rural farmers who require an intuitive Kannada-first vernacular interface.

### How MandiMitra Solves This

- **0% Brokerage Direct Trade**: Farmers list lots directly from their farmgate; verified commercial buyers place bids with zero commission cuts.
- **APMC Price Transparency Engine**: Every listing dynamically benchmarks the farmer's asking price against official APMC rates from local yards (Puttur, Bantwal, Belthangady, Sullia, Udupi), categorizing offers into *Fair Price*, *Great Deal*, or *Premium*.
- **Direct Negotiation & Counter-Offers**: Transparent bidding allows buyers to submit custom price and quantity bids, while farmers can counter-offer or accept with one click.
- **Digital Trade Pass & WhatsApp Dispatch**: Accepted deals generate a unique trade reference ID (`MM-KA-XXXXXX`), a downloadable digital trade gate pass (`.txt`), and pre-formatted WhatsApp trade notifications for immediate farmgate pickup and payment.

---

## Features

### 👨‍🌾 Farmer Features
- **Farmer Hub & Portfolio Overview (`/farmer`)**: Live overview cards displaying total estimated portfolio value (e.g., ₹22.8 Lakh), number of active listings, pending incoming bids, and middleman commission savings percentage (+8.4%).
- **Add Produce Flow (`/farmer/add`)**:
  - One-tap quick crop selector for regional Karnataka staples (Arecanut/Red Chali, Coconuts, Black Pepper, Jyothi Paddy, Robusta Banana, Turmeric).
  - Flexible quantity entry with regional units (Quintals, Coconuts, Kilograms).
  - **Dynamic APMC Benchmark Price Advisor**: Automatically benchmarks the farmer's asking price against official APMC modal rates with real-time percentage indicators (*Fair Market Rate*, *Great Deal*, *Premium*).
  - Configurable farmgate pickup address and contact details.
- **Offer & Bid Management (`/farmer/offers`)**:
  - Dedicated inbox displaying all buyer bids with buyer company name, location, bid price, requested quantity, and delivery notes.
  - One-click **Accept Deal** (instantly transitions to Deal Confirmed stage).
  - Interactive **Counter-Offer Modal**: Allows the farmer to propose a revised price per unit directly back to the buyer.
  - **Reject Bid** action with immediate status feedback.
- **Commission Savings Counter**: Dynamic calculation displaying the exact rupees saved by bypassing conventional 6–10% middleman brokerage cuts.

### 🏢 Buyer Features
- **Verified Buyer Marketplace (`/buyer`)**:
  - Visual catalog of active farmgate listings featuring harvest images, farmer badges, distance, asking price, and available lot size.
  - **Taluk Multi-Filter**: Filter crops across Karnataka taluks (Puttur, Bantwal, Belthangady, Sullia, Moodbidri, Udupi, Karkala).
  - **Category Filters**: Filter by crop category (All Crops, Areca & Commercial, Coconut & Plantation, Pepper & Spices, Paddy & Grains, Banana & Fruits).
  - **"Fair Price Only" Toggle**: Filter listings that match or beat APMC benchmark rates.
  - **Simulated Kannada Voice Search**: Interactive microphone button triggering animated speech listening and auto-populating searches (e.g., *Arecanut / ಅಡಿಕೆ*).
  - **Sort Options**: Sort by Nearest First, Price: Low to High, Price: High to Low, or Newest Listings.
- **Produce Listing Details (`/buyer/crop`)**:
  - Comprehensive harvest view showing crop grade, total lot valuation, farmgate address, and verified grower badge.
  - **APMC Price Comparison Visualizer**: Clear card comparing the farmer's asking price directly against the local APMC mandi benchmark.
  - **Simulated Direct Farmer Call**: One-click direct dialer button triggering `tel:` protocol with toast confirmation.
  - **Instant Buy (Direct Buy)** or **Submit Custom Offer**.
- **Submit Custom Buyer Offer (`/buyer/offer`)**:
  - Bidding interface with price-per-unit and quantity inputs.
  - Real-time calculation showing difference from the farmer's asking price (in ₹ and %) and total calculated payout.
  - Custom logistics / farmgate pickup note input.

### 🌐 General & Platform Features
- **Bilingual Experience (Kannada & English)**: Global navbar toggle (`ಕನ್ನಡ / EN`) dynamically switching all application text, labels, and badges.
- **Mock Authentication & Role Switcher (`/login`)**:
  - Simulated phone number input and 4-digit OTP verification.
  - **One-Tap Fast Track Access**: Pre-configured instant login buttons for rapid evaluator review (as Farmer Manjunath Gowda or Buyer Coastal Spices & Areca Traders).
- **Floating Demo Controller Dock**: Persistent bottom-right floating pill opening a drawer to jump directly to any of the 9 demo stages (1 to 9) or toggle user roles at any time.
- **Deal Confirmation & Digital Trade Voucher (`/deal-confirmed`)**:
  - Confetti celebration animation upon deal acceptance.
  - Automatically generated unique Deal ID (`MM-KA-XXXXXX`).
  - **Client-Side Digital Gate Pass**: Generates and downloads a `.txt` trade pass voucher to the user's filesystem with full compliance details.
  - **WhatsApp Trade Dispatch Integration**: Opens WhatsApp with pre-formatted, comprehensive trade summary text ready to send.
  - Live preview of the WhatsApp confirmation bubble.
- **Live APMC Mandi Ticker**: Real-time modal price feed across major Karnataka APMC yards (Puttur, Bantwal, Belthangady, Sullia, Udupi).
- **Toast Notifications**: Interactive bilingual toasts providing feedback for actions such as submitting bids, switching languages, making calls, and downloading gate passes.

---

## Prototype Flow

The prototype provides a complete, cohesive 9-stage end-to-end user journey:

```text
[ 1. Landing Page ]
        │
        ▼
[ 2. Mock Login / Fast Track ] ──► Choose Farmer or Buyer Role
        │
   ┌────┴────────────────────────┐
   ▼                             ▼
[ 3. Farmer Dashboard ]    [ 5. Buyer Marketplace ]
   │                             │
   ▼                             ▼
[ 4. Add Produce Flow ]    [ 6. Listing Details ]
(with APMC Advisor)              │
                                 ▼
                           [ 7. Submit Buyer Offer ]
                                 │
   ┌─────────────────────────────┘
   ▼
[ 8. Farmer Offer Review ] ──► Accept / Counter-Offer / Reject
   │
   ▼
[ 9. Deal Confirmed ] ──► Confetti + Unique Deal ID + Digital Gate Pass (.txt) + WhatsApp Dispatch
```

1. **Stage 1: Landing Page (`/`)** – Explore value propositions, live APMC price ticker, dual-role entry points, and verified farmer case studies.
2. **Stage 2: Mock Login (`/login`)** – Switch between Farmer and Buyer roles with simulated OTP or one-tap evaluator fast-track buttons.
3. **Stage 3: Farmer Dashboard (`/farmer`)** – Review portfolio valuation, active listings, incoming bid alerts, and middleman commission savings.
4. **Stage 4: Add Produce (`/farmer/add`)** – Select crop chips, set quantity, check live APMC price recommendations, and publish.
5. **Stage 5: Buyer Marketplace (`/buyer`)** – Browse listings with taluk filters, category chips, simulated Kannada voice search, and APMC fairness badges.
6. **Stage 6: Listing Details (`/buyer/crop`)** – Inspect harvest grade, compare against APMC yard rates, trigger simulated farmer phone calls, or initiate purchase.
7. **Stage 7: Offer Screen (`/buyer/offer`)** – Submit a custom bid with live price differential calculations against the farmer's asking rate.
8. **Stage 8: Farmer Offer Review (`/farmer/offers`)** – Review incoming buyer bids, make a counter-offer with a revised rate, or accept the deal.
9. **Stage 9: Deal Confirmation (`/deal-confirmed`)** – View official trade confirmation, download a `.txt` Digital Gate Pass, and dispatch WhatsApp trade notices.

---

## Screenshots

### 1. Landing Page
![Landing Page](static/screenshots/01-landing-page.png)
*Bilingual hero section featuring Karnataka agricultural focus, live APMC price ticker, dual role entry points, and 0% commission guarantee.*

---

### 2. Mock Login & Fast-Track Access
![Mock Login](static/screenshots/02-mock-login.png)
*Simulated OTP login with dedicated One-Tap Fast Track buttons for immediate evaluation as either Farmer or Buyer.*

---

### 3. Farmer Dashboard
![Farmer Dashboard](static/screenshots/03-farmer-dashboard.png)
*Farmer hub displaying portfolio valuation, active listings, incoming buyer bids, middleman savings counter, and APMC benchmark feed.*

---

### 4. Add Produce Flow
![Add Produce](static/screenshots/04-add-produce.png)
*Produce listing form with one-tap regional crop chips, quantity inputs, and the real-time APMC Benchmark Price Advisor.*

---

### 5. Buyer Marketplace
![Buyer Marketplace](static/screenshots/05-buyer-marketplace.png)
*Direct crop marketplace with taluk filters, crop categories, "Fair Price Only" toggle, and simulated Kannada voice search.*

---

### 6. Listing Details
![Listing Details](static/screenshots/06-listing-details.png)
*Detailed harvest view highlighting APMC price benchmark comparison, farmgate location, simulated direct farmer calling, and bidding options.*

---

### 7. Buyer Offer Submission Screen
![Offer Screen](static/screenshots/07-offer-screen.png)
*Interactive bidding screen showing real-time price variance calculations against the farmer's asking rate and total lot payout.*

---

### 8. Farmer Offer Review & Counter-Offer
![Farmer Offer Review](static/screenshots/07b-farmer-offer-review.png)
*Farmer offer inbox with options to review buyer bids, propose counter-offers, or accept deals directly.*

---

### 9. Deal Confirmation & Gate Pass
![Deal Confirmation](static/screenshots/08-deal-confirmation.png)
*Deal confirmation screen with confetti animation, official Deal ID, client-side downloadable Digital Gate Pass (`.txt`), and WhatsApp dispatch.*

---

## Tech Stack

The prototype is built strictly using modern frontend web technologies with client-side reactivity and persistence:

- **Framework**: [SvelteKit](https://kit.svelte.dev/) (v2.x) with [Svelte 5](https://svelte.dev/) Runes (`$state`, `$derived`, `$effect`, `$props`)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) via `@tailwindcss/vite`
- **Icons**: [Lucide Svelte](https://lucide.dev/) (`@lucide/svelte` / `lucide-svelte`)
- **Celebration Effects**: [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)
- **State Management**: Reactive Svelte stores (`svelte/store`) with automatic `localStorage` synchronization
- **Build Tool**: [Vite](https://vitejs.dev/) (v6.x)

---

## Project Structure

```text
MandiMitra/
├── public/
│   └── screenshots/              # Captured high-res application screenshots
├── src/
│   ├── app.d.ts                  # SvelteKit application type definitions
│   ├── app.html                  # Root HTML template with fonts and metadata
│   ├── lib/
│   │   ├── components/           # Reusable UI components
│   │   │   ├── BottomNavigation.svelte       # Mobile bottom navigation bar
│   │   │   ├── DemoFlowBar.svelte            # Demo journey status indicator
│   │   │   ├── FilterChips.svelte            # Taluk and category filter pills
│   │   │   ├── FloatingActionButton.svelte   # Quick action button
│   │   │   ├── FloatingDemoController.svelte # Persistent 9-stage demo controller dock
│   │   │   ├── LanguageSwitch.svelte         # Kannada / English language toggle
│   │   │   ├── Modal.svelte                  # Accessible reusable dialog
│   │   │   ├── Navbar.svelte                 # Sticky top navigation bar
│   │   │   ├── PriceComparisonBadge.svelte   # APMC price fairness badge
│   │   │   ├── ProduceCard.svelte            # Crop listing card
│   │   │   ├── SearchBar.svelte              # Text search with simulated voice search
│   │   │   ├── StatsCards.svelte             # Farmer portfolio metrics cards
│   │   │   ├── SuccessDialog.svelte          # Submission success confirmation modal
│   │   │   └── ToastNotifications.svelte     # Floating action notifications
│   │   ├── stores/
│   │   │   └── appStore.ts       # Central reactive state (listings, language, user role, offers)
│   │   ├── i18n.ts               # Bilingual translations dictionary (Kannada & English)
│   │   ├── mockData.ts           # Realistic Karnataka agricultural datasets & APMC rates
│   │   └── types.ts              # TypeScript interfaces (ProduceListing, Offer, APMCPrice)
│   └── routes/                   # SvelteKit file-based routing
│       ├── +layout.svelte        # Application layout wrapper with navbar, demo dock, footer
│       ├── +page.svelte          # Stage 1: Landing Page
│       ├── layout.css            # Tailwind CSS imports and theme configuration
│       ├── login/
│       │   └── +page.svelte      # Stage 2: Mock Login & Role Selection
│       ├── farmer/
│       │   ├── +page.svelte      # Stage 3: Farmer Hub Dashboard
│       │   ├── add/
│       │   │   └── +page.svelte  # Stage 4: Add Produce Flow with APMC Advisor
│       │   └── offers/
│       │       └── +page.svelte  # Stage 8: Farmer Offer Review & Counter-Offer
│       ├── buyer/
│       │   ├── +page.svelte      # Stage 5: Buyer Marketplace
│       │   ├── crop/
│       │   │   └── +page.svelte  # Stage 6: Crop Listing Details & Price Comparison
│       │   └── offer/
│       │       └── +page.svelte  # Stage 7: Buyer Offer & Bidding Screen
│       └── deal-confirmed/
│           └── +page.svelte      # Stage 9: Deal Confirmation, Gate Pass & WhatsApp
├── static/
│   ├── screenshots/              # Static screenshots accessible by browser & GitHub
│   └── robots.txt
├── package.json                  # Dependencies, scripts, and project metadata
├── svelte.config.js              # SvelteKit configuration
├── tsconfig.json                 # TypeScript compiler configuration
└── vite.config.ts                # Vite configuration with Tailwind CSS v4 plugin
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- `npm` (bundled with Node.js)

### Installation

Clone the repository and install project dependencies:

```bash
git clone https://github.com/Tanushree-RD/MandiMitra.git
cd MandiMitra
npm install
```

### Running Locally

Start the local development server:

```bash
npm run dev
```

Open your browser and navigate to:

```text
http://localhost:5173/
```

### Type Checking & Build

To validate types or build the production bundle:

```bash
# Run SvelteKit type checks
npm run check

# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```
