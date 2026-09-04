/**
 * Type definitions for Zinot frontend
 */

export interface Market {
  id: string;
  asset: string;
  assetName: string;
  totalLiquidity: number;
  totalBorrowed: number;
  supplyAPY: number;
  borrowAPY: number;
  utilizationRate: number;
  collateralFactor: number;
  lastUpdated: number;
}

export interface UserPosition {
  user: string;
  asset: string;
  suppliedAmount: number;
  borrowedAmount: number;
  healthFactor: number;
  liquidationPrice: number;
}

export interface PoolStats {
  totalTVL: number;
  totalDebt: number;
  activeUsers: number;
  liquidations24h: number;
  avgHealthFactor: number;
  highestUtilization: number;
}

export interface AssetPrice {
  asset: string;
  price: number;
  timestamp: number;
  source: string;
}

export interface Transaction {
  id: string;
  type: 'supply' | 'borrow' | 'repay' | 'withdraw' | 'liquidate';
  user: string;
  asset: string;
  amount: number;
  timestamp: number;
  status: 'pending' | 'completed' | 'failed';
  txHash?: string;
}

export type WalletStatus = 'disconnected' | 'connecting' | 'connected' | 'error';

export interface WalletContext {
  publicKey: string | null;
  status: WalletStatus;
  balance: number;
  connect: () => Promise<void>;
  disconnect: () => void;
  signTransaction: (tx: unknown) => Promise<string>;
}

export interface AppContextType {
  wallet: WalletContext;
  markets: Market[];
  positions: UserPosition[];
  poolStats: PoolStats | null;
  prices: Record<string, AssetPrice>;
  loading: boolean;
  error: string | null;
  refreshMarkets: () => Promise<void>;
  refreshPositions: () => Promise<void>;
  clearError: () => void;
}
