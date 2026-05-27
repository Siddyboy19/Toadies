import React, { useState, useEffect, useRef, useCallback } from 'react';
import { getNFTTraits } from '../data/traits';
import NFTModal from './NFTModal';
import './NFTSlider.css';

export default function NFTSlider({ nfts }) {
  const [selected, setSelected] = useState(null);
  const [current,  setCurrent]  = useState(0);
  const [sliding,  setSliding]  = useState(false);
  const [dir,      setDir]      = useState('next'); // 'next' | 'prev'
  const autoRef = useRef(null);

  const VISIBLE = getVisible();
  const total   = nfts.length;

  function getVisible() {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth < 480)  return 1;
    if (window.innerWidth < 768)  return 2;
    return 3;
  }

  const [visCount, setVisCount] = useState(VISIBLE);
  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 480)      setVisCount(1);
      else if (window.innerWidth < 768) setVisCount(2);
      else                              setVisCount(3);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const advance = useCallback((direction) => {
    if (sliding) return;
    setDir(direction);
    setSliding(true);
    setTimeout(() => {
      setCurrent(prev => {
        if (direction === 'next') return (prev + 1) % total;
        return (prev - 1 + total) % total;
      });
      setSliding(false);
    }, 420);
  }, [sliding, total]);

  /* auto-slide: alternates direction */
  useEffect(() => {
    let goingRight = true;
    autoRef.current = setInterval(() => {
      advance(goingRight ? 'next' : 'prev');
      goingRight = !goingRight;
    }, 3000);
    return () => clearInterval(autoRef.current);
  }, [advance]);

  const resetAuto = () => {
    clearInterval(autoRef.current);
    let goingRight = true;
    autoRef.current = setInterval(() => {
      advance(goingRight ? 'next' : 'prev');
      goingRight = !goingRight;
    }, 3000);
  };

  const handlePrev = () => { resetAuto(); advance('prev'); };
  const handleNext = () => { resetAuto(); advance('next'); };

  /* Build visible indices (wrap-around) */
  const indices = Array.from({ length: visCount }, (_, i) => (current + i) % total);

  return (
    <div className="slider">
      {/* Arrow: prev */}
      <button
        className="slider__arrow slider__arrow--prev"
        onClick={handlePrev}
        aria-label="Previous"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
      </button>

      {/* Cards */}
      <div className={`slider__track slider__track--${dir} ${sliding ? 'slider__track--sliding' : ''}`}>
        {indices.map((idx, pos) => (
          <SliderCard
            key={`${idx}-${pos}`}
            nft={nfts[idx]}
            onClick={setSelected}
            pos={pos}
          />
        ))}
      </div>

      {/* Arrow: next */}
      <button
        className="slider__arrow slider__arrow--next"
        onClick={handleNext}
        aria-label="Next"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="9 6 15 12 9 18"/>
        </svg>
      </button>

      {/* Dot indicators */}
      <div className="slider__dots">
        {nfts.map((_, i) => (
          <button
            key={i}
            className={`slider__dot ${i === current ? 'slider__dot--active' : ''}`}
            onClick={() => { resetAuto(); setCurrent(i); }}
            aria-label={`Go to ${i + 1}`}
          />
        ))}
      </div>

      {selected && (
        <NFTModal nft={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}

function SliderCard({ nft, onClick, pos }) {
  const traits = getNFTTraits(nft.id);
  const rarityClass = `slider-card--${nft.rarity.toLowerCase()}`;

  return (
    <div
      className={`slider-card ${rarityClass}`}
      onClick={() => onClick(nft)}
      style={{ animationDelay: `${pos * 0.08}s` }}
    >
      <div className="slider-card__img-wrap">
        <img
          className="slider-card__img"
          src={nft.src}
          alt={nft.name}
          loading="lazy"
        />
        <span className={`slider-card__badge slider-card__badge--${nft.rarity.toLowerCase()}`}>
          {nft.rarity === 'Legendary' ? '⭐' : nft.rarity === 'Epic' ? '💜' : nft.rarity === 'Rare' ? '💙' : '💚'}&nbsp;
          {nft.rarity}
        </span>
      </div>
      <div className="slider-card__body">
        <p className="slider-card__name">{nft.name}</p>
        <p className="slider-card__sub">🌿 {traits.bg} · {traits.eyes}</p>
        <div className="slider-card__foot">
          <span className="slider-card__vibe">{traits.vibe}</span>
          <span className="slider-card__tag">{traits.hat}</span>
        </div>
      </div>
    </div>
  );
}
