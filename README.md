# Zinot Frontend - Stellar Lending Interface

The frontend for Zinot, a lending and borrowing protocol on Stellar. We're building this in the open, piece by piece — this README tracks exactly where each piece stands, so contributors can see what's ready to build on and where to jump in.

## 🌟 Where things stand

**🟢 Shipped** — the public landing page, live in `App.tsx`:
- `Navbar`, `Hero`, `Features`
- Ships today as a static page; copy and sample rates are placeholders until the data layer below is connected

**🟡 Built and ready to integrate** — engineered, type-checked, and waiting to be wired into the app:
- `MarketCard`, `MarketList`, `PositionCard` — the market/position display components
- `useMarkets` / `usePositions` — data-fetching hooks for them
- `ApiService` (`src/services/api.ts`) — a REST client already speaking the protocol's intended API shape (`/api/markets`, `/api/positions/:user`, `/api/prices/:asset`, `/api/stats/pool`)
- `src/utils/validation.ts` — runtime validators for the data those endpoints return

This is the foundation of the real product: the display layer and its data contract are done. What's left is connecting them — rendering these components in the app and pointing `VITE_API_URL` at a live backend (or a mocked one for local dev). **This is one of the best places for a new contributor to make an immediate, visible impact.**

**🧭 On the roadmap** — designed below, open for contributors to pick up:
- Routing and dedicated pages (Dashboard, Markets, Positions, Governance)
- App-wide state management for wallet/session/portfolio data
- Stellar wallet integration and Soroban contract calls (Freighter, Lobstr, and manual signing via Stellar Lab)
- Supply/Borrow modals and the end-to-end transaction flow
- An automated test suite

## 🎯 Target Architecture

This is the full picture we're building toward — a reference for how the pieces above fit together as the roadmap items land.

### Component Structure

```
┌─────────────────────────────────┐
│         App.tsx                 │
│  ┌──────────────────────────────┤
│  │  Layout Components           │
│  │  - Header/Navigation         │
│  │  - Sidebar                   │
│  └──────────────────────────────┤
│  ┌──────────────────────────────┤
│  │  Pages                       │
│  │  - Dashboard                 │
│  │  - Markets                   │
│  │  - Positions                 │
│  │  - Governance                │
│  └──────────────────────────────┤
│  ┌──────────────────────────────┤
│  │  Components                  │
│  │  - Market Card               │
│  │  - Position Card             │
│  │  - Supply Modal              │
│  │  - Borrow Modal              │
│  └──────────────────────────────┤
│  ┌──────────────────────────────┤
│  │  State Management            │
│  │  - Redux / Context API       │
│  │  - Wallet State               │
│  │  - User Positions            │
│  └──────────────────────────────┘
└─────────────────────────────────┘
         ↕ Fetch/Update
┌─────────────────────────────────┐
│  Backend APIs                   │
│  - Market data                  │
│  - User positions               │
│  - Transaction status           │
└─────────────────────────────────┘
         ↕ Contract Calls
┌─────────────────────────────────┐
│  Stellar Network                │
│  - Soroban Contracts            │
│  - Asset Transfers              │
│  - Transaction Finality         │
└─────────────────────────────────┘
```

### Pages

**Dashboard** — protocol overview: TVL/debt stats, top markets, user portfolio summary.

**Markets** — a sortable market table with a detail modal (Supply/Borrow/Analytics tabs). `MarketList`/`MarketCard` already implement the sortable list and card (see "Built and ready to integrate"); the detail modal and page routing are the open piece.

**Positions** — supplied/borrowed lists with health factor and liquidation warnings. `PositionCard` is built; the dedicated page and routing are next.

**Governance** — proposals, voting, delegation. Planned once the core lending flow is live.

### Stellar integration

```typescript
// Target shape for the wallet/contract layer
const walletProvider = new StellarWalletProvider();
const publicKey = await walletProvider.connect();

const transaction = await zinotContract.buildSupplyTx(
  asset: 'USDC',
  amount: 1000
);
const signedTx = await walletProvider.sign(transaction);
const result = await network.submitTransaction(signedTx);
```

Wallets we're targeting: Stellar.js (via Horizon), Freighter, Lobstr, and Stellar Lab for manual signing.

### API surface

`ApiService` already implements this client-side contract — the next step is a backend that speaks it:

```typescript
ApiService.getMarkets();              // GET /api/markets
ApiService.getPositions(publicKey);   // GET /api/positions/:user
ApiService.getPrice(asset);           // GET /api/prices/:asset
ApiService.getPoolStats();            // GET /api/stats/pool
```

## 🛠️ Development

### Prerequisites
```bash
Node.js 18+
npm
```

### Installation
```bash
npm install
```

### Environment Variables
```env
VITE_API_URL=http://localhost:3001
```
`VITE_STELLAR_NETWORK` and `VITE_CONTRACT_ID` are reserved for the wallet integration milestone — nothing reads them yet.

### Development Server
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Lint
```bash
npm run lint
```

### Type Checking
```bash
npm run type-check
```

A test suite (`npm test`) is on the roadmap and not set up yet — see Contributing below if you'd like to lead that.

## 📚 Feature Roadmap

- [x] Market display component
- [x] Position display component
- [ ] Wire market/position components into the app against a live or mocked API
- [ ] Supply functionality
- [ ] Borrow functionality
- [ ] Wallet integration
- [ ] Liquidation notifications
- [ ] Historical charts
- [ ] Governance voting
- [ ] Advanced analytics
- [ ] Automated test suite

## 🤝 Contributing

Good first areas to dig into:
- Wire the existing market/position components into `App.tsx` against a live or mocked backend
- Wallet integration
- Component optimization
- Mobile responsiveness
- Accessibility enhancements
- Standing up the test suite

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📄 License

MIT License - see LICENSE file

## 👤 Maintainer

**m1s0g1** - Zinot Frontend Maintainer
