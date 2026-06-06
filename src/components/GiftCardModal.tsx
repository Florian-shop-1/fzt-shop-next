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

// ─────────────────────────────────────────────
//  Ditix-Wertgutschein-Kasse.
//  Julian: echte Ditix-Gutschein-URL hier eintragen
//  (idealerweise mit Betrags-Parameter, falls Ditix das unterstützt).
//  Solange leer → Bestätigungs-/Hinweisbildschirm statt Weiterleitung.
// ─────────────────────────────────────────────
const DITIX_VOUCHER_URL: string = "";

export default function GiftCardModal({ open, value, onClose }: GiftCardModalProps) {
  const [recipient, setRecipient] = useState("");
  const [sender, setSender] = useState("");
  const [message, setMessage] = useState("");
  const [motif, setMotif] = useState("classic");
  const [delivery, setDelivery] = useState<"digital" | "post">("digital");
  const [giftBox, setGiftBox] = useState(false);
  const [addr, setAddr] = useState({ name: "", street: "", zip: "", city: "" });
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const needsAddress = delivery === "post" || giftBox;
  const addrComplete = !needsAddress || (addr.name && addr.street && addr.zip && addr.city);

  // Personalisierung sichern → dann zur Ditix-Kasse weiterleiten
  const checkout = async () => {
    if (!addrComplete || loading) return;
    setLoading(true);
    const payload = {
      value, recipient, sender, message, motif, delivery, giftBox,
      shipping: needsAddress ? addr : null, total,
    };
    try {
      // Julian: speichert Personalisierung/Versand → Ditix-Custom-Feld bzw. Versand-Liste
      await fetch("/api/voucher/personalize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch(() => {});
    } finally {
      if (DITIX_VOUCHER_URL) {
        const sep = DITIX_VOUCHER_URL.includes("?") ? "&" : "?";
        window.location.href = `${DITIX_VOUCHER_URL}${sep}amount=${value}`;
      } else {
        setLoading(false);
        setDone(true);
      }
    }
  };

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
            <p>Deine Gestaltung ist gespeichert. Die sichere Bezahlung folgt im nächsten Schritt — sobald die Kasse angebunden ist, geht es von hier direkt weiter.</p>
            <button className="btn-primary" style={{ margin: "8px auto 0", display: "flex" }} onClick={onClose}>Schließen</button>
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
                  <p>Edle Box mit Florian Zimmer Kartenspiel, deinem Gutschein und einem erscheinenden Zauberstab. Versand kostenlos.</p>
                </div>
              </div>


              {/* Lieferadresse — nur bei Postversand / Geschenkbox */}
              {needsAddress && (
                <div className="gc-address">
                  <span className="gc-eyebrow" style={{ marginBottom: 4 }}>Lieferadresse</span>
                  <div className="gc-field">
                    <label>Name *</label>
                    <input type="text" value={addr.name} onChange={e => setAddr({ ...addr, name: e.target.value })} placeholder="Vor- und Nachname" autoComplete="name" />
                  </div>
                  <div className="gc-field">
                    <label>Straße &amp; Hausnummer *</label>
                    <input type="text" value={addr.street} onChange={e => setAddr({ ...addr, street: e.target.value })} placeholder="Musterstraße 1" autoComplete="street-address" />
                  </div>
                  <div className="gc-address-row">
                    <div className="gc-field">
                      <label>PLZ *</label>
                      <input type="text" value={addr.zip} onChange={e => setAddr({ ...addr, zip: e.target.value })} placeholder="89231" autoComplete="postal-code" inputMode="numeric" />
                    </div>
                    <div className="gc-field">
                      <label>Ort *</label>
                      <input type="text" value={addr.city} onChange={e => setAddr({ ...addr, city: e.target.value })} placeholder="Neu-Ulm" autoComplete="address-level2" />
                    </div>
                  </div>
                </div>
              )}

              <div className="gc-cta-row">
                <span className="gc-total">{fmt(total)} €</span>
                <button
                  className="btn-primary"
                  onClick={checkout}
                  disabled={!addrComplete || loading}
                  style={!addrComplete || loading ? { opacity: 0.4, cursor: "not-allowed", boxShadow: "none" } : {}}
                >{loading ? "…" : "✦  Weiter zur Kasse"}</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
