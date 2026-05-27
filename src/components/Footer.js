import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import './Footer.css';

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.738l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const DiscordIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
    <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z"/>
  </svg>
);

const TICKER_ITEMS = [
  '🐸 TOADIES NFT','⚡ ETHEREUM','🌿 4,444 SUPPLY',
  '💚 SWAMP VIBES','🌊 FCFS LIVE','💎 PURE ART',
  '🐸 TOADIES NFT','⚡ ETHEREUM','🌿 4,444 SUPPLY',
  '💚 SWAMP VIBES','🌊 FCFS LIVE','💎 PURE ART',
];

export default function Footer() {
  return (
    <footer className="footer">

      {/* animated divider ticker */}
      <div className="footer__divider">
        <div className="footer__divider-ticker">
          {TICKER_ITEMS.map((t,i)=>(
            <span key={i} className="footer__divider-item">{t}</span>
          ))}
        </div>
      </div>

      {/* main grid */}
      <div className="footer__main">

        {/* brand */}
        <div className="footer__brand">
          <div className="footer__logo-wrap">
            <img src={logo} alt="Toadies" className="footer__logo-img"/>
            <div className="footer__logo-glow"/>
          </div>
          <h3 className="footer__name">TOADIES</h3>
          <p className="footer__tagline">Born in the Swamp.<br/>Living on Ethereum.</p>
        </div>

        {/* quick links */}
        <div className="footer__col">
          <h4 className="footer__col-title">Explore</h4>
          <ul className="footer__col-list">
            <li><Link to="/"            className="footer__col-link">🏠 Home</Link></li>
            <li><a href="#gallery-section" className="footer__col-link">🎨 Gallery</a></li>
            <li><Link to="/mint-permit" className="footer__col-link">🐸 Mint Permit</Link></li>
          </ul>
        </div>

        {/* on-chain */}
        <div className="footer__col">
          <h4 className="footer__col-title">On-Chain</h4>
          <ul className="footer__col-list">
            <li className="footer__col-stat">
              <span className="footer__col-stat-num">4,444</span>
              <span className="footer__col-stat-label">Total Supply</span>
            </li>
            <li className="footer__col-stat">
              <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" style={{color:'var(--cyan)'}}>
                <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z"/>
              </svg>
              <span className="footer__col-stat-label">Ethereum Mainnet</span>
            </li>
            <li><span className="footer__col-stat-live">● FCFS Phase Live</span></li>
          </ul>
        </div>

      </div>

      {/* bottom bar — Fix 4: white X + Discord icons only */}
      <div className="footer__bottom">
        <p className="footer__copy">© 2026 Toadies NFT · Pure Digital Art · Just Vibes 🐸</p>

        <div className="footer__icon-socials">
          <a href="https://x.com/Toadies_" target="_blank" rel="noreferrer"
             className="footer__icon-link" aria-label="Follow on X">
            <XIcon/>
          </a>
          <a href="https://discord.gg/8VJsWgd5GP" target="_blank" rel="noreferrer"
             className="footer__icon-link footer__icon-link--discord" aria-label="Join Discord">
            <DiscordIcon/>
          </a>
        </div>
      </div>

    </footer>
  );
}
