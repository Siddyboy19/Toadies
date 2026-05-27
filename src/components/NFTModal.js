import React, { useEffect } from 'react';
import { getNFTTraits } from '../data/traits';
import './NFTModal.css';

const RARITY_COLOR = {
  Common:    'var(--bright)',
  Rare:      'var(--cyan)',
  Epic:      'var(--pink)',
  Legendary: 'var(--gold)',
};

export default function NFTModal({ nft, onClose }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  if (!nft) return null;
  const traits = getNFTTraits(nft.id);
  const color  = RARITY_COLOR[nft.rarity];

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-card">
        <img className="modal-card__img" src={nft.src} alt={nft.name} />
        <div className="modal-card__body">
          <div className="modal-card__name">{nft.name}</div>
          <span
            className="modal-card__rarity"
            style={{ color, borderColor: color, background: `${color}22` }}
          >
            ✦ {nft.rarity.toUpperCase()} ✦
          </span>

          <div className="modal-card__traits">
            {[['👁️ Eyes', traits.eyes], ['🎩 Hat', traits.hat], ['🌿 BG', traits.bg], ['✨ Vibe', traits.vibe]].map(([k, v]) => (
              <div key={k} className="modal-card__trait">
                <span className="modal-card__trait-key">{k}</span>
                <span className="modal-card__trait-val">{v}</span>
              </div>
            ))}
          </div>

          <div className="modal-card__token">
            Token #{String(nft.id).padStart(4, '0')} · Toadies Collection
          </div>

          <button className="modal-card__close" onClick={onClose}>
            🐸 Close the Lily Pad
          </button>
        </div>
      </div>
    </div>
  );
}
