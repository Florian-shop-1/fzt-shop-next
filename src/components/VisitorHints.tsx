"use client";

import { useEffect, useState } from "react";

// ─────────────────────────────────────────────
//  Wiederkehrender Besucher — dezenter Hinweis
//  (kein Popup, keine Werbung)
// ─────────────────────────────────────────────
export function ReturningVisitorHint() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Flag wurde bei früherem Ticket-Ansehen gesetzt (page.tsx: openBooking)
    const viewed = localStorage.getItem("fztTicketsViewed");
    const greeted = sessionStorage.getItem("fztGreeted");
    if (viewed && !greeted) {
      setShow(true);
      sessionStorage.setItem("fztGreeted", "1");
      const t = setTimeout(() => setShow(false), 8000);
      return () => clearTimeout(t);
    }
  }, []);

  if (!show) return null;

  return (
    <div className="returning-hint" role="status">
      <span className="returning-hint-icon">✦</span>
      <div>
        <strong>Schön, dass du wieder da bist.</strong>
        <span>Dein magischer Abend wartet bereits auf dich.</span>
      </div>
      <button className="returning-hint-close" onClick={() => setShow(false)} aria-label="Schließen">✕</button>
    </div>
  );
}

// ─────────────────────────────────────────────
//  Souvenirglas-Countdown — nur bei ?souvenirglass=1
//  (Rückkehr über Brevo-Mail 3)
//  Premium, ruhig, keine Alarmfarben.
// ─────────────────────────────────────────────
export function SouvenirCountdown() {
  const [active, setActive] = useState(false);
  const [remaining, setRemaining] = useState(24 * 60 * 60);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("souvenirglass") !== "1") return;

    setActive(true);
    // Deadline merken, damit Reload den Countdown nicht zurücksetzt
    let deadline = Number(localStorage.getItem("fztSouvenirDeadline"));
    if (!deadline || deadline < Date.now()) {
      deadline = Date.now() + 24 * 60 * 60 * 1000;
      localStorage.setItem("fztSouvenirDeadline", String(deadline));
    }
    const tick = () => setRemaining(Math.max(0, Math.floor((deadline - Date.now()) / 1000)));
    tick();
    const iv = setInterval(tick, 1000);
    return () => clearInterval(iv);
  }, []);

  if (!active) return null;

  const h = Math.floor(remaining / 3600);
  const m = Math.floor((remaining % 3600) / 60);
  const s = remaining % 60;
  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <div className="souvenir-banner">
      <div className="souvenir-banner-inner">
        <div className="souvenir-banner-text">
          <strong>🎁 Dein Florian Zimmer Theater Souvenirglas wartet bereits auf dich.</strong>
          <span>Schließe deine Buchung innerhalb der nächsten 24 Stunden ab und sichere dir zu jedem Ticket ein exklusives Souvenirglas.</span>
        </div>
        <div className="souvenir-countdown" aria-label="Verbleibende Zeit">
          <div className="souvenir-unit"><span className="souvenir-num">{pad(h)}</span><span className="souvenir-lbl">Std</span></div>
          <span className="souvenir-sep">:</span>
          <div className="souvenir-unit"><span className="souvenir-num">{pad(m)}</span><span className="souvenir-lbl">Min</span></div>
          <span className="souvenir-sep">:</span>
          <div className="souvenir-unit"><span className="souvenir-num">{pad(s)}</span><span className="souvenir-lbl">Sek</span></div>
        </div>
      </div>
    </div>
  );
}
