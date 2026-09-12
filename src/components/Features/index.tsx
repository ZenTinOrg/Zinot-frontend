
import { TrendingUp, Zap, ShieldCheck } from 'lucide-react';
import './Features.css';

function Features() {
  const features = [
    {
      title: 'Earn Yield',
      desc: 'Deposit your USDC or XLM into liquidity pools and earn competitive interest rates automatically.',
      Icon: TrendingUp
    },
    {
      title: 'Instant Loans',
      desc: 'Borrow assets against your collateral with no credit checks. Highly capital efficient and secure.',
      Icon: Zap
    },
    {
      title: 'Isolated Markets',
      desc: 'Create and participate in custom markets with specific risk parameters for maximum flexibility.',
      Icon: ShieldCheck
    }
  ];

  return (
    <section className="features" id="markets">
      <div className="container">
        <div className="features-grid">
          {features.map((f) => (
            <div key={f.title} className="feature-card">
              <div className="feature-icon">
                <f.Icon size={28} strokeWidth={2} aria-hidden="true" />
              </div>
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
