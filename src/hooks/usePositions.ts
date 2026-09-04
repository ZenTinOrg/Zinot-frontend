/**
 * Hook for fetching and managing user positions
 */

import { useEffect, useState } from 'react';
import { ApiService } from '../services/api';
import type { UserPosition } from '../types';

interface UsePositionsReturn {
  positions: UserPosition[];
  loading: boolean;
  error: string | null;
  refresh: (user: string) => Promise<void>;
}

export function usePositions(user?: string): UsePositionsReturn {
  const [positions, setPositions] = useState<UserPosition[]>([]);
  const [loading, setLoading] = useState(!user);
  const [error, setError] = useState<string | null>(null);

  const fetchPositions = async (targetUser: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await ApiService.getPositions(targetUser);
      setPositions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch positions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      void fetchPositions(user);
    }
  }, [user]);

  return {
    positions,
    loading,
    error,
    refresh: fetchPositions,
  };
}
