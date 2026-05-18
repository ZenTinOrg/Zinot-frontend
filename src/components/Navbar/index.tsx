import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
    <div className="nav-content">
      <div className="logo">ZINOT</div>
      <div className="nav-links">
        <a href="#markets">Markets</a>
        <a href="#governance">Governance</a>
        <a href="#docs">Docs</a>
        <button className="btn-app">Connect Wallet</button>
      </div>
    </div>
  );
}

export default Navbar;
