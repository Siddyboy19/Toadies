import React from 'react';
import { getNFTTraits } from '../data/traits';
import './NFTCard.css';

export default function NFTCard({ nft, onClick, style }) {
  const traits = getNFTTraits(nft.id);

  return (
    <div className="nft-card" onClick={() => onClick(nft)} style={style}>
      <div className="nft-card__img-wrap">
        <img
          className="nft-card__img"
          src={nft.src}
          alt={nft.name}
          loading="lazy"
        />
        <span className={`nft-card__badge nft-card__badge--${nft.rarity.toLowerCase()}`}>
          {nft.rarity}
        </span>
      </div>
      <div className="nft-card__info">
        <div className="nft-card__name">{nft.name}</div>
        <div className="nft-card__sub">🌿 {traits.bg} · {traits.eyes}</div>
        <div className="nft-card__footer">
          <span className="nft-card__vibe">{traits.vibe}</span>
          <span className="nft-card__tag">{traits.hat}</span>
        </div>
      </div>
    </div>
  );
}
