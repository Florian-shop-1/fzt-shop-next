"use client";

import { useEffect, useState } from "react";

interface InquiryModalProps {
  type: "loge" | "firmen" | null;
  onClose: () => void;
}

const COPY = {
  loge: {
    eyebrow: "Exklusiv & Privat",
    headline: "VIP-Loge anfragen",
    sub: "Logen für kleine Runden bis zu 50 Gäste, auf Wunsch sogar die Exklusivbuchung des ganzen Theaters ab 100 Gästen. Wir planen deinen Abend individuell und haben attraktive Angebote — für Firmen als betriebliche Ausgabe absetzbar. Schreib uns kurz, wir melden uns innerhalb von 2 Stunden.",
    msgLabel: "Wunschtermin & Anmerkungen",
    msgPlaceholder: "z. B. Samstag, 7. Juni · Jahrestag für 4 Personen",
    cta: "Anfrage senden",
  },
  firmen: {
    eyebrow: "Firmenevents",
    headline: "Firmenanfrage stellen",
    sub: "Weihnachtsfeiern, Teambuilding, Incentives — komplett buchbar für 10 bis 300 Personen. Wir melden uns innerhalb von 2 Stunden.",
    msgLabel: "Anlass, Personenzahl & Wunschtermin",
    msgPlaceholder: "z. B. Weihnachtsfeier · 40 Personen · Dezember 2026",
    cta: "Anfrage senden",
  },
};

export default function InquiryModal({ type, onClose }: InquiryModalProps) {
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!type) { setSent(false); return; }
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [type]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!type) return null;

  const c = COPY[type];

  return (
    <div className="inquiry-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="inquiry-modal">
        <button className="inquiry-close" onClick={onClose} aria-label="Schließen">✕</button>

        {sent ? (
          <div className="inquiry-success">
            <span className="inquiry-success-icon">✦</span>
            <h4>Deine Anfrage ist angekommen.</h4>
            <p>Wir melden uns persönlich innerhalb von 2 Stunden — oder sofort unter<br />
              <a href="tel:+497317906110" style={{ color: "var(--gold)" }}>0731 7906 110</a>
            </p>
          </div>
        ) : (
          <>
            <span className="inquiry-eyebrow">{c.eyebrow}</span>
            <h3>{c.headline}</h3>
            <p>{c.sub}</p>

            <div className="inquiry-fields">
              <div className="inquiry-field">
                <label>Name *</label>
                <input type="text" autoComplete="name" placeholder="Max Mustermann" />
              </div>
              <div className="inquiry-field">
                <label>E-Mail *</label>
                <input type="email" autoComplete="email" placeholder="max@beispiel.de" />
              </div>
              <div className="inquiry-field">
                <label>Telefon</label>
                <input type="tel" autoComplete="tel" placeholder="+49 ···" />
              </div>
              <div className="inquiry-field">
                <label>{c.msgLabel}</label>
                <textarea placeholder={c.msgPlaceholder} />
              </div>
            </div>

            <button className="inquiry-submit" onClick={() => setSent(true)}>
              ✦ &nbsp;{c.cta}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
