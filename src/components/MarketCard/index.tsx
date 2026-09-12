/**
 * Market Card component - displays market information
 */

import React from 'react';
import type { Market } from '../../types';

export interface MarketCardProps {
  market: Market;
  onSupply?: (market: Market) => void;
  onBorrow?: (market: Market) => void;
}

export const MarketCard: React.FC<MarketCardProps> = ({
  market,
  onSupply,
  onBorrow,
}) => {
  const utilizationPercent = (market.utilizationRate * 100).toFixed(1);

  return (
    <div className="market-card" data-testid={`market-${market.id}`}>
      <div className="market-header">
        <h3 className="market-name">{market.assetName}</h3>
        <span className="market-symbol">{market.asset}</span>
      </div>

      <div className="market-stats">
        <div className="stat">
          <label>TVL</label>
          <span className="tvl">${market.totalLiquidity.toLocaleString()}</span>
        </div>
        <div className="stat">
          <label>Supply APY</label>
          <span className="apy-supply">{market.supplyAPY.toFixed(2)}%</span>
        </div>
        <div className="stat">
          <label>Borrow APY</label>
          <span className="apy-borrow">{market.borrowAPY.toFixed(2)}%</span>
        </div>
        <div className="stat">
          <label>Utilization</label>
          <div className="utilization-bar">
            <div
              className="utilization-fill"
              style={{ width: `${Math.min(market.utilizationRate, 100)}%` }}
            />
          </div>
          <span className="utilization-percent">{utilizationPercent}%</span>
        </div>
      </div>

      <div className="market-actions">
        <button
          onClick={() => onSupply?.(market)}
          className="btn btn-primary"
          type="button"
        >
          Supply
        </button>
        <button
          onClick={() => onBorrow?.(market)}
          className="btn btn-secondary"
          type="button"
        >
          Borrow
        </button>
      </div>
    </div>
  );
};
