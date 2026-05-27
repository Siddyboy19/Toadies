import React from 'react';
import bannerImg from '../assets/banner.png';
import './Banner.css';

export default function Banner() {
  const scrollDown = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <div className="banner" role="img" aria-label="Toadies NFT — community of frogs watching TV in a swamp room">

      {/* Main image */}
      <img
        src={bannerImg}
        alt="Toadies NFT community banner"
        className="banner__img"
        draggable="false"
      />

      {/* Gradient vignette overlay */}
      <div className="banner__overlay" aria-hidden="true" />

      {/* Scanline texture */}
      <div className="banner__scanlines" aria-hidden="true" />

      {/* Corner ambient glows */}
      <div className="banner__glow-tl" aria-hidden="true" />
      <div className="banner__glow-br" aria-hidden="true" />

      {/* Live badge */}
      <div className="banner__badge" aria-label="Toadies NFT — live on Ethereum">
        <span className="banner__badge-dot" aria-hidden="true" />
        <span className="banner__badge-text">Toadies NFT</span>
        <span className="banner__badge-sep" aria-hidden="true">·</span>
        <span className="banner__badge-text">4,444 Frogs</span>
        <span className="banner__badge-sep" aria-hidden="true">·</span>
        <span className="banner__badge-eth">⟠ Ethereum</span>
      </div>

      {/* Scroll-down arrow */}
      <button className="banner__scroll-arrow" onClick={scrollDown} aria-label="Scroll down">
        <span className="banner__scroll-arrow-label">Scroll</span>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polyline points="6,10 14,20 22,10" stroke="#7fff00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <polyline points="6,4 14,14 22,4" stroke="rgba(127,255,0,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
}
