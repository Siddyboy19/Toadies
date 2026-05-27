import React from 'react';
import NFTSlider from './NFTSlider';
import MarqueeGallery from './MarqueeGallery';
import NFT_DATA from '../data/nftData';
import './Gallery.css';

export default function Gallery({ galleryRef }) {
  return (
    <section ref={galleryRef} id="gallery-stats-section" className="gallery">
      <div className="gallery__head">
        <span className="gallery__eyebrow">✦ THE COLLECTION ✦</span>
        <h2 className="gallery__title">🐸 Toadies NFT</h2>
        <p className="gallery__sub">
          <span className="gallery__supply">4,444</span> unique Toadies
          — coming to <span className="gallery__eth">Ethereum Mainnet</span>
        </p>
        <div className="gallery__chain-badge">
          <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13">
            <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z"/>
          </svg>
          Ethereum Mainnet · Click any Toadie to view
        </div>
      </div>

      <NFTSlider nfts={NFT_DATA} />
      <MarqueeGallery />
    </section>
  );
}
