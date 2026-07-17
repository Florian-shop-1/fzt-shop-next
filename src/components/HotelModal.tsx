"use client";

import { useEffect } from "react";

// ─────────────────────────────────────────────
//  HOTEL-KOOPERATIONEN
//  Partner-Hotels mit Vorteilscode für Theatergäste.
//  Codes/Links als Platzhalter — Florian liefert die echten.
// ─────────────────────────────────────────────

const HOTELS = [
  {
    name: "Maritim Hotel Neu-Ulm",
    distance: "5 Fahrminuten zum Theater",
    perk: "Vorzugspreis für Theatergäste",
    code: "TRUE52",
    url: "https://www.maritim.de/de/hotels/deutschland/hotel-ulm/unser-hotel",
  },
];

export default function HotelModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  if (!open) return null;

  return (
    <div className="inquiry-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="inquiry-modal">
        <button className="inquiry-close" onClick={onClose} aria-label="Schließen">✕</button>
        <span className="inquiry-eyebrow">Hotel-Kooperationen</span>
        <h3>Bleib über Nacht — günstiger</h3>
        <p>Mach aus deinem Theaterbesuch ein kleines Wochenende. Bei unseren Partner-Hotels buchst du mit deinem Vorteilscode zum Sonderpreis.</p>

        <div className="hotel-list">
          {HOTELS.map(h => (
            <div key={h.name} className="hotel-card">
              <div className="hotel-card-head">
                <strong>{h.name}</strong>
                <span className="hotel-distance">{h.distance}</span>
              </div>
              <p className="hotel-perk">{h.perk}</p>
              <div className="hotel-code-row">
                <span className="hotel-code-label">Vorteilscode</span>
                <span className="hotel-code">{h.code}</span>
              </div>
              <a className="hotel-book-btn" href={h.url} target="_blank" rel="noopener noreferrer">
                Zimmer ansehen →
              </a>
            </div>
          ))}
        </div>

        <p className="hotel-note">Gib den Code bei der Buchung an. Weitere Partner folgen in Kürze.</p>
      </div>
    </div>
  );
}
