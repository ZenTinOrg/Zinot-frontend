/**
 * Hook for fetching and managing market data
 */

import { useEffect, useState } from 'react';
import { ApiService } from '../services/api';
import type { Market } from '../types';

interface UseMarketsReturn {
  markets: Market[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useMarkets(): UseMarketsReturn {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMarkets = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await ApiService.getMarkets();
      setMarkets(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch markets');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchMarkets();
  }, []);

  return {
    markets,
    loading,
    error,
    refresh: fetchMarkets,
  };
}
