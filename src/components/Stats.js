import React from 'react';
import './Stats.css';

const STATS = [
  { num:'4,444', label:'🐸 Total Supply'           },
  { num:'ETH',   label:'⛓️ Ethereum Mainnet'       },
  { num:'FCFS',  label:'🌿 Spot Request Live'       },
  { num:'∞',     label:'⚡ Swamp Vibes'             },
];

export default function Stats({ statsRef }) {
  return (
    <section id="stats-section" ref={statsRef} className="stats">
      <h2 className="stats__title">🌊 Swamp Stats</h2>
      <p  className="stats__sub">The numbers don't lie — the swamp is real</p>
      <div className="stats__grid">
        {STATS.map((s,i) => (
          <div key={s.label} className="stats__card" style={{animationDelay:`${i*0.4}s`}}>
            <div className="stats__num">{s.num}</div>
            <div className="stats__label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
