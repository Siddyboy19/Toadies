import React from 'react';
import './SwampBG.css';

const bubbles = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  size: 10 + (i * 7) % 40,
  left: (i * 17 + 5) % 100,
  delay: (i * 1.3) % 6,
  duration: 6 + (i % 5) * 2,
}));

const lilies = Array.from({ length: 5 }, (_, i) => ({
  id: i,
  left: 10 + i * 20,
  top: 60 + (i % 3) * 10,
  delay: i * 1.5,
  size: 40 + (i % 3) * 25,
}));

export default function SwampBG() {
  return (
    <div className="swamp-bg">
      <div className="bg-glow bg-glow--1" />
      <div className="bg-glow bg-glow--2" />
      <div className="bg-glow bg-glow--3" />
      {bubbles.map(b => (
        <div
          key={b.id}
          className="bubble"
          style={{
            width: b.size, height: b.size,
            left: `${b.left}%`, bottom: 0,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}
      {lilies.map(l => (
        <div
          key={l.id}
          className="lily"
          style={{
            left: `${l.left}%`, top: `${l.top}%`,
            width: l.size, height: l.size,
            animationDelay: `${l.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
