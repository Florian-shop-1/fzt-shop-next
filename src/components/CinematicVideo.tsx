"use client";

import { useState } from "react";

export default function CinematicVideo() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="cinematic-video">
      {!playing ? (
        <div className="cv-thumb" onClick={() => setPlaying(true)} role="button" tabIndex={0} onKeyDown={e => e.key === "Enter" && setPlaying(true)} aria-label="Showreel abspielen">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="cv-img"
            src="https://img.youtube.com/vi/RvWYpFJmvkM/maxresdefault.jpg"
            alt="ULMFASSBAR — Florian Zimmer Theater"
            onError={e => { (e.target as HTMLImageElement).src = "/images/show-ulmfassbar.jpg"; }}
          />
          <div className="cv-overlay" />
          <div className="cv-gold-frame" />
          <div className="cv-center">
            <div className="cv-play-btn" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28" style={{ marginLeft: 4 }}>
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <span className="cv-play-label">Erlebe die Magie</span>
          </div>
          <p className="cv-caption"><em>»Live ist es noch unglaublicher.«</em></p>
        </div>
      ) : (
        <div className="cv-iframe-wrap">
          <button className="cv-close" onClick={() => setPlaying(false)} aria-label="Video schließen">✕</button>
          <div className="yt-no-logo" style={{ width: "100%", height: "100%" }}>
            <iframe
              src="https://www.youtube.com/embed/RvWYpFJmvkM?autoplay=1&rel=0&modestbranding=1&iv_load_policy=3"
              title="ULMFASSBAR — Florian Zimmer Theater"
              allowFullScreen
              allow="autoplay; fullscreen"
              style={{ width: "100%", height: "100%", border: "none" }}
            />
          </div>
        </div>
      )}
    </section>
  );
}
