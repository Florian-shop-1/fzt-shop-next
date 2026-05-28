"use client";

import { useEffect, useState } from "react";

interface NavProps {
  onBooking: () => void;
}

export default function Nav({ onBooking }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav className={`nav${scrolled ? " scrolled" : ""}`}>
      <div className="nav-inner">
        <a href="/" className="nav-brand">FLORIAN ZIMMER THEATER</a>
        <div className={`nav-links${menuOpen ? " open" : ""}`}>
          <a href="#shows" onClick={() => setMenuOpen(false)}>Shows</a>
          <a href="#magic-dinner" onClick={() => setMenuOpen(false)}>Magic Dinner</a>
          <a href="#loge" onClick={() => setMenuOpen(false)}>Loge</a>
          <a href="#firmen" onClick={() => setMenuOpen(false)}>Firmen</a>
          <a href="#gutschein" onClick={() => setMenuOpen(false)}>Gutschein</a>
          <button className="nav-cta" onClick={() => { onBooking(); setMenuOpen(false); }}>
            Jetzt buchen
          </button>
        </div>
        <button
          className="nav-toggle"
          aria-label="Menü"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}
