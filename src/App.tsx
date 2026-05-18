import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';

function App() {
  return (
    <div className="app">
      <header>
        <nav className="navbar">
          <div className="nav-float">
            <Navbar />
          </div>
        </nav>
      </header>
      <main>
        <Hero />
        <Features />
      </main>
      <footer>
        <div className="container">
          <p>&copy; 2026 Zinot Protocol. Built on Stellar.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
