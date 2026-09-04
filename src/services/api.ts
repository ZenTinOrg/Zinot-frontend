/**
 * API service for Zinot backend communication
 */

import type { Market, UserPosition, PoolStats, AssetPrice, Transaction } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export class ApiService {
  private static async fetchJson<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json() as Promise<T>;
  }

  // Markets
  static async getMarkets(): Promise<Market[]> {
    return this.fetchJson<Market[]>('/api/markets');
  }

  static async getMarket(assetId: string): Promise<Market> {
    return this.fetchJson<Market>(`/api/markets/${assetId}`);
  }

  // Positions
  static async getPositions(user: string): Promise<UserPosition[]> {
    return this.fetchJson<UserPosition[]>(`/api/positions/${user}`);
  }

  static async getPosition(user: string, asset: string): Promise<UserPosition> {
    return this.fetchJson<UserPosition>(`/api/positions/${user}/${asset}`);
  }

  // Pool Stats
  static async getPoolStats(): Promise<PoolStats> {
    return this.fetchJson<PoolStats>('/api/stats/pool');
  }

  // Prices
  static async getPrice(asset: string): Promise<AssetPrice> {
    return this.fetchJson<AssetPrice>(`/api/prices/${asset}`);
  }

  // Transactions
  static async getTransactions(user?: string): Promise<Transaction[]> {
    const endpoint = user ? `/api/transactions/${user}` : '/api/transactions';
    return this.fetchJson<Transaction[]>(endpoint);
  }

  // Health check
  static async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${API_URL}/health`);
      return response.ok;
    } catch {
      return false;
    }
  }
}
