
import './Hero.css';

function Hero() {
  return (
    <section className="hero">
      <div className="container hero-content">
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <span className="eyebrow">Protocol</span>
        </div>
        <h1 className="hero-title">
          Permissionless <span className="gradient-text">Liquidity</span> on Stellar
        </h1>
        <p className="hero-subtitle">
          The most versatile protocol for lending and borrowing USDC and XLM. Earn yield on your deposits and access instant liquidity with minimal friction.
        </p>
        <div className="hero-cta">
          <button className="btn-primary">
            <span>Launch App</span>
            <span className="btn-icon">↗</span>
          </button>
          <button className="btn-secondary">Read Documentation</button>
        </div>
      </div>
      <div className="hero-bg-blobs">
        <div className="blob blob-1" aria-hidden></div>
        <div className="blob blob-2" aria-hidden></div>
      </div>
    </section>
  );
}

export default Hero;
