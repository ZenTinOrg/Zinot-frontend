/**
 * Position Card component - displays user position
 */

import React from 'react';
import type { UserPosition } from '../../types';

interface PositionCardProps {
  position: UserPosition;
  onWithdraw?: (position: UserPosition) => void;
  onRepay?: (position: UserPosition) => void;
  type: 'supplied' | 'borrowed';
}

export const PositionCard: React.FC<PositionCardProps> = ({
  position,
  onWithdraw,
  onRepay,
  type,
}) => {
  const isSupplied = type === 'supplied';
  const amount = isSupplied ? position.suppliedAmount : position.borrowedAmount;

  return (
    <div className="position-card" data-testid={`position-${position.asset}`}>
      <div className="position-header">
        <div>
          <h4 className="position-type">
            {isSupplied ? 'Supplied' : 'Borrowed'} {position.asset}
          </h4>
          <p className="position-amount">{amount.toLocaleString()}</p>
        </div>
        {!isSupplied && (
          <div className="health-status">
            <label>Health Factor</label>
            <span className={`health-value ${position.healthFactor < 1.5 ? 'danger' : 'ok'}`}>
              {position.healthFactor.toFixed(2)}
            </span>
          </div>
        )}
      </div>

      <div className="position-details">
        {!isSupplied && (
          <div className="detail-item">
            <label>Liquidation Price</label>
            <span>${position.liquidationPrice.toFixed(2)}</span>
          </div>
        )}
      </div>

      <div className="position-actions">
        <button
          onClick={() => (isSupplied ? onWithdraw?.(position) : onRepay?.(position))}
          className="btn btn-secondary"
          type="button"
        >
          {isSupplied ? 'Withdraw' : 'Repay'}
        </button>
      </div>
    </div>
  );
};
