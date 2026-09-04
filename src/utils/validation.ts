/**
 * Data validation utilities
 * Ensure type safety and data integrity
 */

import type { Market, UserPosition, PoolStats, AssetPrice } from '../types';

export function isValidMarket(data: unknown): data is Market {
  if (!data || typeof data !== 'object') return false;
  const obj = data as Record<string, unknown>;
  return (
    typeof obj.id === 'string' &&
    typeof obj.asset === 'string' &&
    typeof obj.assetName === 'string' &&
    typeof obj.totalLiquidity === 'number' &&
    typeof obj.totalBorrowed === 'number' &&
    typeof obj.supplyAPY === 'number' &&
    typeof obj.borrowAPY === 'number' &&
    typeof obj.utilizationRate === 'number' &&
    typeof obj.collateralFactor === 'number' &&
    typeof obj.lastUpdated === 'number'
  );
}

export function isValidPosition(data: unknown): data is UserPosition {
  if (!data || typeof data !== 'object') return false;
  const obj = data as Record<string, unknown>;
  return (
    typeof obj.user === 'string' &&
    typeof obj.asset === 'string' &&
    typeof obj.suppliedAmount === 'number' &&
    typeof obj.borrowedAmount === 'number' &&
    typeof obj.healthFactor === 'number' &&
    typeof obj.liquidationPrice === 'number'
  );
}

export function isValidPoolStats(data: unknown): data is PoolStats {
  if (!data || typeof data !== 'object') return false;
  const obj = data as Record<string, unknown>;
  return (
    typeof obj.totalTVL === 'number' &&
    typeof obj.totalDebt === 'number' &&
    typeof obj.activeUsers === 'number' &&
    typeof obj.liquidations24h === 'number' &&
    typeof obj.avgHealthFactor === 'number' &&
    typeof obj.highestUtilization === 'number'
  );
}

export function isValidPrice(data: unknown): data is AssetPrice {
  if (!data || typeof data !== 'object') return false;
  const obj = data as Record<string, unknown>;
  return (
    typeof obj.asset === 'string' &&
    typeof obj.price === 'number' &&
    typeof obj.timestamp === 'number' &&
    typeof obj.source === 'string'
  );
}

export function validateMarkets(data: unknown[]): Market[] {
  return data.filter(isValidMarket);
}

export function validatePositions(data: unknown[]): UserPosition[] {
  return data.filter(isValidPosition);
}
