# Zinot Frontend - Stellar Lending Interface

Modern React application providing a seamless user interface for the Zinot lending protocol on Stellar.

## 🌟 Overview

Zinot Frontend delivers an intuitive experience for users to:

✅ **Supply Liquidity**
- Deposit USDC or XLM to earn interest
- Real-time APY display
- Instant confirmation feedback
- Transaction history tracking

✅ **Borrow Assets**
- Borrow against supplied collateral
- Dynamic borrowing limits
- Health factor monitoring
- Liquidation risk alerts

✅ **Manage Positions**
- View all supplied and borrowed amounts
- Monitor portfolio health
- Track APY earnings
- Manage multiple positions

✅ **Market Analytics**
- Market overview dashboard
- Utilization rate visualization
- Historical APY charts
- Risk metrics display

## 🏗️ Architecture

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
│  │  - Wallet State              │
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

## 🎯 Key Pages

### Dashboard
**Purpose**: Main landing page with protocol overview

Features:
- Protocol TVL and debt statistics
- Top performing markets
- User's portfolio summary
- Quick action buttons

```
[Dashboard]
  ├─ Protocol Stats Card
  ├─ User Portfolio Card
  ├─ Top Markets List
  └─ Recent Transactions
```

### Markets
**Purpose**: Explore and compare all available markets

Features:
- Sortable market table (TVL, APY, utilization)
- Market detail modal
- Supply/Borrow buttons
- Real-time price updates

```
[Markets]
  ├─ Market Filters
  │  ├─ Sort by TVL
  │  ├─ Sort by APY
  │  └─ Filter by Asset
  ├─ Market Cards
  │  ├─ Asset Name & Symbol
  │  ├─ TVL & Debt
  │  ├─ APY Rates
  │  └─ Utilization Gauge
  └─ Detail Modal
     ├─ Supply Tab
     ├─ Borrow Tab
     └─ Analytics Tab
```

### Positions
**Purpose**: Manage user's lending/borrowing positions

Features:
- All supplied positions
- All borrowed positions
- Health factor status
- Liquidation warning
- Repay/Withdraw buttons

```
[Positions]
  ├─ Supplied Positions
  │  ├─ Position Card
  │  │  ├─ Asset & Amount
  │  │  ├─ APY Earned
  │  │  └─ Withdraw Button
  │  └─ Total Supplied
  ├─ Borrowed Positions
  │  ├─ Position Card
  │  │  ├─ Asset & Amount
  │  │  ├─ APY Rate
  │  │  └─ Repay Button
  │  └─ Total Borrowed
  └─ Health Status
     ├─ Health Factor
     ├─ Risk Level
     └─ Liquidation Price
```

### Governance (Future)
**Purpose**: Participate in protocol decisions

Features:
- View active proposals
- Vote on parameter changes
- Delegate voting power
- Proposal history

## 🔗 Stellar Integration

### Wallet Connection

```typescript
// Stellar wallet integration
const walletProvider = new StellarWalletProvider();
const publicKey = await walletProvider.connect();

// Transaction signing with Soroban
const transaction = await zinotContract.buildSupplyTx(
  asset: 'USDC',
  amount: 1000
);
const signedTx = await walletProvider.sign(transaction);
const result = await network.submitTransaction(signedTx);
```

### Supported Wallets
- Stellar.js default (via horizon)
- Lobstr (browser extension)
- Freighter (browser extension)
- Stellar Lab (manual signing)

### Transaction Flow

```
User clicks "Supply"
    ↓
Open Supply Modal
    ↓
Input amount & confirm
    ↓
Connect Wallet (if needed)
    ↓
Build Soroban Contract Call
    ↓
Request Signature
    ↓
Submit to Stellar Network
    ↓
Wait for Finality (~5 seconds)
    ↓
Update UI with Result
    ↓
Fetch Updated Position
    ↓
Display Success Message
```

## 🎨 UI Components

### Market Card Component
Displays key metrics for a single market:
```
┌──────────────────────────┐
│ Asset Name (USDC)        │
├──────────────────────────┤
│ TVL: $5.2M               │
│ APY: 4.5%  |  Borrow 6.2%│
│ Utilization: ████░░ 75%  │
├──────────────────────────┤
│ [Supply] [Borrow]        │
└──────────────────────────┘
```

### Position Card Component
Displays user's position details:
```
┌──────────────────────────────┐
│ Supplied XLM                 │
├──────────────────────────────┤
│ Amount: 1,500 XLM            │
│ APY: 3.2%                    │
│ Earnings: 12.5 XLM/month     │
├──────────────────────────────┤
│ [Withdraw]  [View Details]   │
└──────────────────────────────┘
```

### Supply Modal Component
```
┌────────────────────────────────┐
│ Supply Liquidity               │
├────────────────────────────────┤
│ Asset: [USDC ▼]                │
│ Amount: [________________]      │
│ Max: 5,000 USDC                │
├────────────────────────────────┤
│ Expected APY: 4.5%             │
│ Gas Fee: ~0.01 XLM             │
├────────────────────────────────┤
│ [Cancel]  [Supply]             │
└────────────────────────────────┘
```

## 🌐 API Integration

### Fetch Market Data
```typescript
const response = await fetch('/api/markets');
const markets: Market[] = await response.json();
```

### Get User Positions
```typescript
const response = await fetch(`/api/positions/${publicKey}`);
const positions: UserPosition[] = await response.json();
```

### Update Price Data
```typescript
const response = await fetch(`/api/prices/${asset}`);
const price: AssetPrice = await response.json();
```

### Poll Statistics
```typescript
const response = await fetch('/api/stats/pool');
const stats: PoolStats = await response.json();
```

## 🛠️ Development

### Prerequisites
```bash
Node.js 18+
npm or yarn
```

### Installation
```bash
npm install
```

### Environment Variables
```env
VITE_API_URL=http://localhost:3001
VITE_STELLAR_NETWORK=testnet
VITE_CONTRACT_ID=your_contract_id
```

### Development Server
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Type Checking
```bash
npm run type-check
```

## 📱 Responsive Design

- **Desktop**: Full feature set with multi-column layout
- **Tablet**: Optimized column layout
- **Mobile**: Single column with touch-friendly controls

## ♿ Accessibility

- WCAG 2.1 Level AA compliance
- Semantic HTML structure
- ARIA labels for screen readers
- Keyboard navigation support
- Color contrast ratios ≥ 4.5:1

## 🔒 Security

### Wallet Integration
- Client-side signing only
- No private keys stored
- No seed phrases transmitted
- Secure wallet provider APIs

### Transaction Validation
- Verify contract address before signing
- Display transaction details for confirmation
- Timeout long-running transactions
- Alert on price slippage >1%

### Data Security
- HTTPS only
- CSP headers enabled
- XSS protection
- CSRF tokens on forms

## 📊 State Management

### Global State (Redux/Context)
```typescript
{
  wallet: {
    connected: boolean;
    publicKey: string;
    balance: number;
  };
  markets: Market[];
  positions: UserPosition[];
  prices: { [asset: string]: number };
  loading: boolean;
  error: string | null;
}
```

## 🚀 Performance

### Optimization Strategies
- Code splitting by route
- Lazy load components
- Memoize expensive computations
- Debounce API calls
- Image optimization

### Metrics Target
- FCP: <1s
- LCP: <2.5s
- CLS: <0.1
- TTI: <3.5s

## 📚 Feature Roadmap

- [x] Market display
- [x] Position viewing
- [ ] Supply functionality
- [ ] Borrow functionality
- [ ] Liquidation notifications
- [ ] Historical charts
- [ ] Mobile app
- [ ] Governance voting
- [ ] Advanced analytics

## 🤝 Contributing

We need help with:
- UI/UX improvements
- Component optimization
- Mobile responsiveness
- Accessibility enhancements
- Testing coverage
- Documentation

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📄 License

MIT License - see LICENSE file

## 👤 Maintainer

**m1s0g1** - Zinot Frontend Maintainer  
Email: danielegbezien@gmail.com

---

**Making Stellar Lending Simple. Intuitive. Fast.**
