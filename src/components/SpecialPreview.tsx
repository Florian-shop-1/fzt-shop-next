"use client";

import { useEffect, useState } from "react";

// ─────────────────────────────────────────────
//  SPECIAL / STÖRER — Slide-in von rechts
//  Sanfter Aufmerksamkeits-Störer für zeitlich begrenzte
//  Specials (Previews, Silvester-Gala …). Erscheint nach
//  kurzer Verweildauer, ist wegklickbar (14 Tage Ruhe).
//
//  Julian: echte Preview-Termine ergänzen, `active` steuern.
//  Nur EIN Special gleichzeitig aktiv lassen.
// ─────────────────────────────────────────────

const SPECIAL = {
  active: true,
  eyebrow: "Preview · Streng limitiert",
  title: "Magic Memories — Preview-Vorstellungen",
  text: "Erlebe Florian Zimmers brandneue Show vorab und gehöre zu den Ersten. Wenige Plätze zu exklusiven Preview-Konditionen.",
  cta: "Previews sichern",
  showId: "magic-memories",
  image: "/images/show-magic-dinner.jpg", // Magic Memories nutzt dieses Motiv
};

export default function SpecialPreview({ onCta }: { onCta: (showId: string) => void }) {
  const [open, setOpen] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (!SPECIAL.active) return;
    const dismissed = localStorage.getItem("specialPreviewDismissed");
    if (dismissed && Date.now() - Number(dismissed) < 14 * 24 * 60 * 60 * 1000) return;

    // Nicht stören, während ein Overlay offen ist
    const modalOpen = () =>
      !!document.querySelector(".modal-overlay, .inquiry-overlay, .gc-overlay, .magic-news-overlay");

    const t = setTimeout(() => { if (!modalOpen()) setOpen(true); }, 16000);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    setLeaving(true);
    try { localStorage.setItem("specialPreviewDismissed", String(Date.now())); } catch {}
    setTimeout(() => setOpen(false), 320);
  };

  if (!open) return null;

  return (
    <div className={`special-slidein${leaving ? " leaving" : ""}`} role="dialog" aria-label={SPECIAL.title}>
      <button className="special-close" onClick={close} aria-label="Schließen">✕</button>
      <div className="special-img" style={{ backgroundImage: `url('${SPECIAL.image}')` }} />
      <div className="special-body">
        <span className="special-eyebrow">✦ {SPECIAL.eyebrow}</span>
        <h4 className="special-title">{SPECIAL.title}</h4>
        <p className="special-text">{SPECIAL.text}</p>
        <button className="special-cta" onClick={() => { onCta(SPECIAL.showId); close(); }}>
          {SPECIAL.cta} →
        </button>
      </div>
    </div>
  );
}
