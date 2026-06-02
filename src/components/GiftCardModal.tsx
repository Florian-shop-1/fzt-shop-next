"use client";

import { useEffect, useState } from "react";

// ─────────────────────────────────────────────
//  GUTSCHEIN GESTALTEN
//  Live-Vorschau + Personalisierung.
//  Frontend-Platzhalter — Julian bindet später
//  Warenkorb/Brevo an (z. B. /api/ditix/cart/add).
// ─────────────────────────────────────────────

interface GiftCardModalProps {
  open: boolean;
  value: number;
  onClose: () => void;
}

const MOTIFS = [
  { id: "classic", label: "Classic Gold" },
  { id: "night", label: "Magic Night" },
  { id: "romantik", label: "Romantik" },
];

export default function GiftCardModal({ open, value, onClose }: GiftCardModalProps) {
  const [recipient, setRecipient] = useState("");
  const [sender, setSender] = useState("");
  const [message, setMessage] = useState("");
  const [motif, setMotif] = useState("classic");
  const [delivery, setDelivery] = useState<"digital" | "post">("digital");
  const [sendDate, setSendDate] = useState("");
  const [giftBox, setGiftBox] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (open) { setDone(false); document.body.style.overflow = "hidden"; }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  if (!open) return null;

  const freeGift = value >= 100;                       // ab 100 €: Gratis-Versand + Zauberstab
  const postFee = delivery === "post" && !freeGift && !giftBox ? 4.9 : 0;
  const boxFee = giftBox ? 14.9 : 0;
  const total = value + postFee + boxFee;
  const fmt = (n: number) => (n % 1 === 0 ? `${n}` : n.toFixed(2).replace(".", ","));

  return (
    <div className="gc-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="gc-modal">
        <button className="gc-close" onClick={onClose} aria-label="Schließen">✕</button>

        {done ? (
          <div className="gc-success">
            <span className="gc-success-icon">✦</span>
            <h3>Dein Gutschein ist gestaltet.</h3>
            <p>Wir haben ihn in deinen Warenkorb gelegt. Im nächsten Schritt schließt du die Bestellung ab.</p>
            <button className="btn-primary" style={{ margin: "8px auto 0", display: "flex" }} onClick={onClose}>Weiter</button>
          </div>
        ) : (
          <div className="gc-grid">
            {/* Live-Vorschau */}
            <div className="gc-preview-col">
              <span className="gc-eyebrow">Vorschau</span>
              <div className={`gutschein-card gc-preview motif-${motif}`}>
                <div className="gutschein-logo">✦ FLORIAN ZIMMER THEATER</div>
                <div className="gutschein-tagline">HOME OF MAGIC · Neu-Ulm</div>
                <div className="gutschein-value">{value}€</div>
                <div className="gutschein-name">Für: {recipient || "___________________"}</div>
                <div className="gutschein-msg">
                  {message ? `„${message}“` : "„Eine Nacht voller Magie — unvergesslich, zauberhaft, einzigartig.“"}
                </div>
                {sender && <div className="gc-from">Von: {sender}</div>}
                <div className="gutschein-footer">
                  <div className="gutschein-code">MAGIC-X7K2</div>
                  <div>Unbegrenzt gültig</div>
                </div>
              </div>
            </div>

            {/* Formular */}
            <div className="gc-form-col">
              <span className="gc-eyebrow">Gutschein gestalten</span>
              <h3>Verschenke Magie</h3>

              <div className="gc-field">
                <label>Für wen ist der Gutschein?</label>
                <input type="text" value={recipient} onChange={e => setRecipient(e.target.value)} placeholder="Name des Beschenkten" maxLength={40} />
              </div>

              <div className="gc-field">
                <label>Persönliche Widmung</label>
                <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Deine persönlichen Worte …" maxLength={140} />
                <span className="gc-charcount">{message.length}/140</span>
              </div>

              <div className="gc-field">
                <label>Von wem?</label>
                <input type="text" value={sender} onChange={e => setSender(e.target.value)} placeholder="Dein Name" maxLength={40} />
              </div>

              <div className="gc-field">
                <label>Motiv</label>
                <div className="gc-motifs">
                  {MOTIFS.map(m => (
                    <button key={m.id} className={`gc-motif gc-motif-${m.id}${motif === m.id ? " active" : ""}`} onClick={() => setMotif(m.id)}>
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {freeGift && (
                <div className="gc-freegift">
                  <span className="gc-freegift-icon">🪄</span>
                  <div>
                    <strong>Ab 100 € geschenkt:</strong> kostenloser Postversand + ein erscheinender Zauberstab — gratis dazu.
                  </div>
                </div>
              )}

              <div className="gc-field">
                <label>Versand</label>
                <div className="gc-delivery">
                  <button className={`gc-delivery-opt${delivery === "digital" ? " active" : ""}`} onClick={() => setDelivery("digital")}>
                    <strong>Digital sofort</strong>
                    <span>Per E-Mail · kostenlos</span>
                  </button>
                  <button className={`gc-delivery-opt${delivery === "post" ? " active" : ""}`} onClick={() => setDelivery("post")}>
                    <strong>Premium-Karte</strong>
                    <span>Per Post · {freeGift || giftBox ? "kostenlos" : "4,90 €"}</span>
                  </button>
                </div>
              </div>

              {/* Geschenkbox-Upgrade */}
              <div
                className={`gc-box-upgrade${giftBox ? " active" : ""}`}
                onClick={() => { setGiftBox(!giftBox); if (!giftBox) setDelivery("post"); }}
                role="button"
                tabIndex={0}
                onKeyDown={e => (e.key === "Enter" || e.key === " ") && setGiftBox(!giftBox)}
              >
                <div className={`gc-box-check${giftBox ? " checked" : ""}`}>{giftBox ? "✓" : ""}</div>
                <div className="gc-box-info">
                  <div className="gc-box-top">
                    <strong>🎁 Geschenkbox-Upgrade</strong>
                    <span className="gc-box-price">+14,90 €</span>
                  </div>
                  <p>Edle Box mit Profi-Kartenspiel, deinem Gutschein und einem erscheinenden Zauberstab. Versand kostenlos.</p>
                </div>
              </div>

              {delivery === "digital" && (
                <div className="gc-field">
                  <label>Versanddatum (optional)</label>
                  <input type="date" value={sendDate} onChange={e => setSendDate(e.target.value)} />
                  <span className="gc-hint">Leer lassen = sofort senden. Ideal: pünktlich zum Geburtstag.</span>
                </div>
              )}

              <div className="gc-cta-row">
                <span className="gc-total">{fmt(total)} €</span>
                <button className="btn-primary" onClick={() => setDone(true)}>✦ &nbsp;In den Warenkorb</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
