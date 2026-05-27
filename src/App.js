import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SwampBG   from './components/SwampBG';
import Navbar    from './components/Navbar';
import Banner    from './components/Banner';
import Hero      from './components/Hero';
import Gallery   from './components/Gallery';
import Stats     from './components/Stats';
import Footer    from './components/Footer';
import MintForm  from './pages/MintForm';
import './App.css';

function HomePage({ galleryRef, statsRef }) {
  return (
    <main>
      <Banner />
      <Hero onGalleryClick={() => galleryRef.current?.scrollIntoView({ behavior: 'smooth' })} />
      <section id="gallery-stats-section" className="gallery-stats-row">
        <div className="gallery-stats-row__left">
          <Gallery galleryRef={galleryRef} />
        </div>
        <div className="gallery-stats-row__right">
          <Stats statsRef={statsRef} />
        </div>
      </section>
      <Footer />
    </main>
  );
}

function MintPage() {
  return (
    <main>
      <MintForm />
    </main>
  );
}

export default function App() {
  const [showTop, setShowTop] = useState(false);
  const galleryRef = useRef(null);
  const statsRef   = useRef(null);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 420);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <BrowserRouter>
      <SwampBG />
      <Navbar />

      <Routes>
        <Route path="/"            element={<HomePage galleryRef={galleryRef} statsRef={statsRef} />} />
        <Route path="/mint-permit" element={<MintPage />} />
      </Routes>

      {showTop && (
        <button
          className="scroll-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
        >
          🐸
        </button>
      )}
    </BrowserRouter>
  );
}
