"use client";

import { useState } from "react";

const TRAILERS = [
  {
    id: 1,
    youtubeId: "lyn08-Lqlps",
    title: "ULMFASSBAR",
    desc: "Die große Magishow — 2,5 Stunden live Illusionen auf Weltklasse-Niveau.",
    fallback: "/images/show-ulmfassbar.jpg",
  },
  {
    id: 2,
    youtubeId: "RvWYpFJmvkM",
    title: "Magic Dinner",
    desc: "Show und Genuss — ein Abend, der dich und deine Begleitung unvergesslich verbindet.",
    fallback: "/images/show-magic-dinner.jpg",
  },
];

export default function Trailers() {
  const [playing, setPlaying] = useState<number | null>(null);

  return (
    <section id="trailers">
      <div className="container">
        <div className="section-header text-center reveal">
          <span className="section-label">Erlebe die Magie</span>
          <h2>Trailer ansehen</h2>
          <div className="divider divider-center" />
          <p style={{ color: "var(--muted)", maxWidth: 480, margin: "0 auto", fontSize: 15 }}>
            Ein Vorgeschmack auf das, was dich erwartet — live ist es noch unglaublicher.
          </p>
        </div>
        <div className="trailers-grid">
          {TRAILERS.map(t => (
            <div key={t.id} className="trailer-block reveal">
              {playing === t.id ? (
                <div className="trailer-iframe active">
                  <iframe
                    src={`https://www.youtube.com/embed/${t.youtubeId}?autoplay=1&rel=0`}
                    title={t.title}
                    allowFullScreen
                    allow="autoplay"
                  />
                </div>
              ) : (
                <div className="trailer-thumb" onClick={() => setPlaying(t.id)}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="trailer-thumb-img"
                    src={`https://img.youtube.com/vi/${t.youtubeId}/maxresdefault.jpg`}
                    alt={`${t.title} Trailer`}
                    onError={e => { (e.target as HTMLImageElement).src = t.fallback; }}
                  />
                  <div className="trailer-thumb-overlay" />
                  <div className="play-btn">
                    <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  </div>
                </div>
              )}
              <div className="trailer-info">
                <h3>{t.title}</h3>
                <p>{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
