import React from 'react';
import './Features.css';

function Features() {
  const features = [
    {
      title: 'Earn Yield',
      desc: 'Deposit your USDC or XLM into liquidity pools and earn competitive interest rates automatically.',
      icon: '📈'
    },
    {
      title: 'Instant Loans',
      desc: 'Borrow assets against your collateral with no credit checks. Highly capital efficient and secure.',
      icon: '⚡'
    },
    {
      title: 'Isolated Markets',
      desc: 'Create and participate in custom markets with specific risk parameters for maximum flexibility.',
      icon: '🛡️'
    }
  ];

  return (
    <section className="features" id="markets">
      <div className="container">
        <div className="features-grid">
          {features.map((f, i) => (
            <div key={i} className="feature-card">
              <div className="feature-icon">{f.icon}</div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
