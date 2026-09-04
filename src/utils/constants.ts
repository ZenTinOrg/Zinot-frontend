/**
 * Application constants and configuration
 */

export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
} as const;

export const HEALTH_FACTOR_RANGES = {
  CRITICAL: { min: 0, max: 1.0 },
  WARNING: { min: 1.0, max: 1.5 },
  SAFE: { min: 1.5, max: Infinity },
} as const;

export const ASSET_DECIMALS = {
  USDC: 6,
  XLM: 7,
} as const;

export const UTILIZATION_THRESHOLDS = {
  LOW: 50,
  MEDIUM: 75,
  HIGH: 90,
} as const;

export const CACHE_DURATIONS = {
  MARKETS: 30_000, // 30 seconds
  POSITIONS: 10_000, // 10 seconds
  PRICES: 60_000, // 1 minute
  STATS: 300_000, // 5 minutes
} as const;
