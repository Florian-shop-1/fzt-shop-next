"use client";

import { useEffect } from "react";

// ─────────────────────────────────────────────
//  ANFAHRT & PARKEN
// ─────────────────────────────────────────────

const ADDRESS = "Grethe-Weiser-Str. 2/1, 89231 Neu-Ulm";
const MAPS_QUERY = encodeURIComponent(ADDRESS);

export default function DirectionsModal({ open, onClose }: { open: boolean; onClose: () => void }) {
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
      <div className="inquiry-modal" style={{ maxWidth: 620 }}>
        <button className="inquiry-close" onClick={onClose} aria-label="Schließen">✕</button>
        <span className="inquiry-eyebrow">Anfahrt & Parken</span>
        <h3>So findest du uns</h3>

        <div className="dir-address">
          <div>
            <strong>Florian Zimmer Theater</strong>
            <span>{ADDRESS}</span>
          </div>
          <a
            className="dir-maps-btn"
            href={`https://www.google.com/maps/dir/?api=1&destination=${MAPS_QUERY}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Route starten →
          </a>
        </div>

        <div className="dir-map">
          <iframe
            title="Anfahrt Florian Zimmer Theater"
            src={`https://maps.google.com/maps?q=${MAPS_QUERY}&z=15&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <h4 className="dir-park-title">Parken</h4>
        <ul className="dir-park-list">
          <li>
            <strong>VIP-Parkplatz direkt am Theater — 15 €</strong>
            <span>Der nächstgelegene Parkplatz, reserviert für dich inkl. Namensbranding. Einfach im Buchungsprozess dazubuchen.</span>
          </li>
          <li>
            <strong>Kostenlose Parkplätze rund ums Theater</strong>
            <span>Im öffentlichen Raum direkt in der Umgebung.</span>
          </li>
          <li>
            <strong>Parkhaus nebenan</strong>
            <span>Gehört dem Dietrich Kino. Bei Magic Dinner / längeren Abenden meist teurer als der VIP-Parkplatz — auf die Preisgestaltung haben wir keinen Einfluss.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
