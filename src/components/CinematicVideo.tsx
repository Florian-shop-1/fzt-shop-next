"use client";

import { useEffect, useRef, useState } from "react";

const VIDEO_ID = "RvWYpFJmvkM";
const POSTER = `https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`;

export default function CinematicVideo() {
  const [withSound, setWithSound] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [playing, setPlaying] = useState(false);
  const bgRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") setWithSound(false); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  // Poster erst ausblenden, wenn das Video tatsächlich läuft.
  // (YouTube meldet den Status per postMessage, sobald wir uns anmelden.)
  useEffect(() => {
    if (reduced || playing) return;

    const onMsg = (e: MessageEvent) => {
      if (typeof e.data !== "string") return;
      try {
        const d = JSON.parse(e.data) as { event?: string; info?: unknown };
        if (d.event === "onStateChange" && d.info === 1) setPlaying(true); // 1 = PLAYING
      } catch { /* keine YouTube-Nachricht — ignorieren */ }
    };
    window.addEventListener("message", onMsg);

    const iv = setInterval(() => {
      bgRef.current?.contentWindow?.postMessage(
        JSON.stringify({ event: "listening", id: 1 }), "*"
      );
    }, 600);

    return () => { window.removeEventListener("message", onMsg); clearInterval(iv); };
  }, [reduced, playing]);

  return (
    <section className="cinematic-video">
      {/* Hintergrund: läuft automatisch, stumm, in Schleife */}
      {!reduced && (
        <div className="cv-bg yt-no-logo" aria-hidden="true">
          <iframe
            ref={bgRef}
            src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${VIDEO_ID}&controls=0&modestbranding=1&playsinline=1&rel=0&iv_load_policy=3&disablekb=1&enablejsapi=1`}
            title="Florian Zimmer Theater — Hintergrundvideo"
            allow="autoplay; fullscreen"
          />
        </div>
      )}

      {/* Vorschaubild — liegt über dem Video und verschwindet erst, wenn es läuft.
          Verhindert die schwarze Fläche, falls Autoplay blockiert oder verzögert ist. */}
      <img
        className={`cv-poster${!reduced && playing ? " hidden" : ""}`}
        src={POSTER}
        alt="ULMFASSBAR — Florian Zimmer Theater"
        aria-hidden="true"
        onError={e => { (e.target as HTMLImageElement).src = "/images/show-atmosphere.jpg"; }}
      />

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
