"use client";

import { useEffect, useState } from "react";

const VIDEO_ID = "RvWYpFJmvkM";

export default function CinematicVideo() {
  const [withSound, setWithSound] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") setWithSound(false); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  return (
    <section className="cinematic-video">
      {/* Hintergrund: läuft automatisch, stumm, in Schleife */}
      {!reduced ? (
        <div className="cv-bg yt-no-logo" aria-hidden="true">
          <iframe
            src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${VIDEO_ID}&controls=0&modestbranding=1&playsinline=1&rel=0&iv_load_policy=3&disablekb=1`}
            title="Florian Zimmer Theater — Hintergrundvideo"
            allow="autoplay; fullscreen"
          />
        </div>
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          className="cv-bg-fallback"
          src={`https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
          alt="ULMFASSBAR — Florian Zimmer Theater"
        />
      )}

      <div className="cv-overlay" />

      {/* Inhalt über dem Video */}
      <div className="cv-content">
        <button className="cv-sound-btn" onClick={() => setWithSound(true)}>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
          Mit Ton ansehen
        </button>
        <p className="cv-caption"><em>»Live ist es noch unglaublicher.«</em></p>
      </div>

      {/* Vollbild-Player mit Ton */}
      {withSound && (
        <div className="cv-sound-overlay" onClick={e => e.target === e.currentTarget && setWithSound(false)}>
          <button className="cv-close" onClick={() => setWithSound(false)} aria-label="Video schließen">✕</button>
          <div className="cv-sound-frame yt-no-logo">
            <iframe
              src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1&iv_load_policy=3`}
              title="ULMFASSBAR — Florian Zimmer Theater"
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}
