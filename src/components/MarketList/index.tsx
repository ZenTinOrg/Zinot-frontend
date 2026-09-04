/**
 * Market List component - displays all markets
 */

import React, { useState } from 'react';
import { useMarkets } from '../../hooks/useMarkets';
import { MarketCard } from '../MarketCard';
import type { Market } from '../../types';

interface MarketListProps {
  onSupply?: (market: Market) => void;
  onBorrow?: (market: Market) => void;
}

export const MarketList: React.FC<MarketListProps> = ({ onSupply, onBorrow }) => {
  const { markets, loading, error, refresh } = useMarkets();
  const [sortBy, setSortBy] = useState<'tvl' | 'apy' | 'utilization'>('tvl');

  const sortedMarkets = [...markets].sort((a, b) => {
    switch (sortBy) {
      case 'apy':
        return b.supplyAPY - a.supplyAPY;
      case 'utilization':
        return b.utilizationRate - a.utilizationRate;
      case 'tvl':
      default:
        return b.totalLiquidity - a.totalLiquidity;
    }
  });

  if (loading) {
    return <div className="loading">Loading markets...</div>;
  }

  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
        <button onClick={() => void refresh()} type="button">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="market-list">
      <div className="market-list-header">
        <h2>Markets</h2>
        <div className="sort-controls">
          <label>Sort by:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value as typeof sortBy)}>
            <option value="tvl">TVL</option>
            <option value="apy">APY</option>
            <option value="utilization">Utilization</option>
          </select>
        </div>
      </div>

      <div className="markets-grid">
        {sortedMarkets.map((market) => (
          <MarketCard
            key={market.id}
            market={market}
            onSupply={onSupply}
            onBorrow={onBorrow}
          />
        ))}
      </div>

      {sortedMarkets.length === 0 && <p className="empty">No markets available</p>}
    </div>
  );
};
