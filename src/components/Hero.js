import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const TICKER = [
  '🐸 TOADIES NFT','🌿 4,444 FROGS ON ETH','🎨 PURE DIGITAL ART',
  '💚 SWAMP COLLECTION','⚡ ETHEREUM MAINNET','🌊 DIVE IN THE SWAMP',
  '🐸 TOADIES NFT','🌿 4,444 FROGS ON ETH','🎨 PURE DIGITAL ART',
  '💚 SWAMP COLLECTION','⚡ ETHEREUM MAINNET','🌊 DIVE IN THE SWAMP',
];

export default function Hero({ onGalleryClick }) {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 700);
    }, 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="hero">
      <h1 className={`hero__title ${pulse ? 'hero__title--pulse' : ''}`}>TOADIES</h1>
      <p  className="hero__sub">The Swampiest Collection on Ethereum</p>

      {/* Supply chips */}
      <div className="hero__chips">
        <div className="hero__chip">
          <span className="hero__chip-num">4,444</span>
          <span className="hero__chip-label">Total Supply</span>
        </div>
        <div className="hero__chip hero__chip--eth">
          <svg viewBox="0 0 24 24" fill="currentColor" className="hero__eth-icon">
            <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z"/>
          </svg>
          <span className="hero__chip-label">Ethereum</span>
        </div>
        <div className="hero__chip hero__chip--live">
          <span className="hero__chip-dot"/>
          <span className="hero__chip-label">FCFS Spot Request Live</span>
        </div>
      </div>

      {/* Buttons */}
      <div className="hero__btns">
        <button className="hero__btn hero__btn--primary" onClick={onGalleryClick}>
          🌿 Explore Collection
        </button>
        <Link to="/mint-permit" className="hero__btn hero__btn--mint">
          🐸 Mint Permit →
        </Link>
      </div>

      {/* Ticker */}
      <div className="hero__ticker-wrap">
        <div className="hero__ticker-inner">
          {TICKER.map((t,i)=><span key={i} className="hero__ticker-item">{t}</span>)}
        </div>
      </div>
    </section>
  );
}
