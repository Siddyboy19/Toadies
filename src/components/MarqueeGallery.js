import React, { useState } from 'react';
import NFT_DATA from '../data/nftData';
import './MarqueeGallery.css';

/* Image-only modal */
function ImageModal({ nft, onClose }) {
  if (!nft) return null;
  return (
    <div className="img-modal" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="img-modal__card">
        <button className="img-modal__close" onClick={onClose} aria-label="Close">✕</button>
        <img src={nft.src} alt={nft.name} className="img-modal__img" />
        <div className="img-modal__label">{nft.name}</div>
      </div>
    </div>
  );
}

/* distribute 57 NFTs across 6 columns, then triple for seamless loop */
function buildColumns(data, count) {
  const cols = Array.from({ length: count }, () => []);
  data.forEach((nft, i) => cols[i % count].push(nft));
  return cols.map(col => [...col, ...col, ...col]);
}

const COLS = buildColumns(NFT_DATA, 6);

export default function MarqueeGallery() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="mq-outer">
      <div className="mq-viewport">
        <div className="mq-track">
          {COLS.map((col, ci) => (
            <div
              key={ci}
              className={`mq-col ${ci % 2 === 0 ? 'mq-col--down' : 'mq-col--up'}`}
              style={{ '--dur': `${20 + ci * 4}s` }}
            >
              {col.map((nft, i) => (
                <Card key={`c${ci}-${i}`} nft={nft} onClick={setSelected} />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mq-fade mq-fade--top"/>
      <div className="mq-fade mq-fade--bottom"/>
      <div className="mq-fade mq-fade--left"/>
      <div className="mq-fade mq-fade--right"/>

      {selected && <ImageModal nft={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

function Card({ nft, onClick }) {
  return (
    <div className="mq-card" onClick={() => onClick(nft)}>
      <img src={nft.src} alt={nft.name} className="mq-card__img" loading="lazy" draggable={false}/>
      <div className="mq-card__overlay">
        <span className="mq-card__name">{nft.name}</span>
      </div>
    </div>
  );
}
