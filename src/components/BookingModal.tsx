"use client";

import { useEffect, useState } from "react";

interface BookingModalProps {
  open: boolean;
  initialShow?: string;
  onClose: () => void;
}

const SHOWS = [
  { id: "ulmfassbar", name: "ULMFASSBAR", desc: "Die große Magishow · 2,5 Std.", price: "ab 59 €" },
  { id: "magic-dinner", name: "Magic Dinner", desc: "Show + Menü · 4 Std.", price: "ab 129 €" },
  { id: "flo-zirkus", name: "Flo-Zirkus", desc: "Zirkus & Magie · 2 Std.", price: "ab 45 €" },
  { id: "this-is-magic", name: "This is Magic!", desc: "Familienshow · 2 Std.", price: "ab 39 €" },
];

const SEAT_CATS = [
  { id: "parterre", name: "Parterre — Mittendrin", desc: "Beste Atmosphäre · Direkt am Geschehen", price: 59, avail: "42 Plätze frei", color: "" },
  { id: "premium", name: "Premium — Ideale Sicht", desc: "Erhöhte Bühnenebene · Perfekte Perspektive", price: 79, avail: "Nur noch 12 Plätze!", color: "#E67E22" },
  { id: "front-row", name: "Front-Row VIP — Das Beste", desc: "Erste Reihe · Hautnah dabei · Interaktion garantiert", price: 99, avail: "Nur noch 4 Plätze!", color: "#E74C3C" },
];

const EXTRAS = [
  { id: "prosecco", name: "Welcome-Prosecco", desc: "Für alle Personen — beliebteste Wahl", price: 7.5, icon: "🥂", perPerson: true },
  { id: "romantik", name: "Romantik-Paket", desc: "Rosen + persönliche Karte + Sektempfang", price: 29, icon: "🌹", perPerson: false },
  { id: "geburtstag", name: "Geburtstags-Deko", desc: "Personalisierter Tischaufsteller + Karte", price: 19, icon: "🎂", perPerson: false },
  { id: "foto", name: "Foto-Session backstage", desc: "Meet & Greet mit Florian Zimmer", price: 39, icon: "📸", perPerson: false },
];

const SOLD_OUT = [3, 7, 14, 21];
const LOW = [5, 8, 12];
const DAY_LABELS = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

export default function BookingModal({ open, initialShow, onClose }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [selectedShow, setSelectedShow] = useState(initialShow ?? "");
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedSeat, setSelectedSeat] = useState("");
  const [seatPrice, setSeatPrice] = useState(59);
  const [qty, setQty] = useState(2);
  const [extras, setExtras] = useState<string[]>([]);

  useEffect(() => {
    if (open) { setStep(1); if (initialShow) setSelectedShow(initialShow); }
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open, initialShow]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!open) return null;

  const toggleExtra = (id: string) =>
    setExtras(prev => prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]);

  const extrasTotal = extras.reduce((sum, id) => {
    const e = EXTRAS.find(x => x.id === id)!;
    return sum + (e.perPerson ? e.price * qty : e.price);
  }, 0);
  const total = seatPrice * qty + extrasTotal;

  const nextStep = () => {
    if (step < 5) setStep(s => s + 1);
    else { alert("Vielen Dank! Ihre Buchung wird bearbeitet. ✨"); onClose(); }
  };
  const prevStep = () => setStep(s => s - 1);

  return (
    <div className="modal-overlay active" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <button className="modal-close" onClick={onClose}>✕</button>

        {/* Header */}
        <div className="modal-header">
          <h2>Jetzt buchen</h2>
          <div className="step-indicator">
            {[1, 2, 3, 4, 5].map((n, i) => (
              <>
                <div key={n} className={`step-dot${step === n ? " active" : step > n ? " done" : ""}`}>{n}</div>
                {i < 4 && <div key={`l${n}`} className={`step-line${step > n ? " done" : ""}`} />}
              </>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="modal-body">
          {/* Step 1 */}
          {step === 1 && (
            <div>
              <p className="step-hint">Welche Show möchtest du erleben?</p>
              <div className="step-show-grid">
                {SHOWS.map(s => (
                  <div
                    key={s.id}
                    className={`step-show-opt${selectedShow === s.id ? " selected" : ""}`}
                    onClick={() => setSelectedShow(s.id)}
                  >
                    <div className="check-mark">✓</div>
                    <h4>{s.name}</h4>
                    <p>{s.desc}</p>
                    <div className="s-price">{s.price}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div>
              <p className="step-hint">Wähle deinen Wunschtermin</p>
              <div className="date-labels">
                {DAY_LABELS.map(d => <div key={d} className="date-lbl">{d}</div>)}
              </div>
              <div className="date-grid">
                {Array.from({ length: 28 }, (_, i) => i + 1).map(day => (
                  <button
                    key={day}
                    disabled={SOLD_OUT.includes(day)}
                    className={`date-btn${SOLD_OUT.includes(day) ? " soldout" : LOW.includes(day) ? " low" : ""}${selectedDate === day ? " selected" : ""}`}
                    onClick={() => setSelectedDate(day)}
                  >{day}</button>
                ))}
              </div>
              <p style={{ fontSize: 12, color: "var(--muted)", marginBottom: 16 }}>Uhrzeit:</p>
              <div className="time-grid">
                {["19:30", "15:00", "20:00"].map(t => (
                  <button
                    key={t}
                    className={`time-btn${selectedTime === t ? " selected" : ""}`}
                    onClick={() => setSelectedTime(t)}
                  >{t} Uhr</button>
                ))}
              </div>
              {selectedDate && LOW.includes(selectedDate) && (
                <div className="urgency-note">⚠ Nur noch wenige Plätze für diesen Termin!</div>
              )}
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div>
              <p className="step-hint">Wähle deine Platzkategorie</p>
              <div className="seat-cats">
                {SEAT_CATS.map(cat => (
                  <div
                    key={cat.id}
                    className={`seat-cat${selectedSeat === cat.id ? " selected" : ""}`}
                    onClick={() => { setSelectedSeat(cat.id); setSeatPrice(cat.price); }}
                  >
                    <div className="seat-cat-info">
                      <h4>{cat.name}</h4>
                      <p>{cat.desc}</p>
                    </div>
                    <div className="seat-cat-right">
                      <div className="seat-cat-price">{cat.price} €</div>
                      <div className="seat-cat-avail" style={cat.color ? { color: cat.color } : {}}>
                        {cat.avail}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="qty-selector">
                <span>Personen:</span>
                <button className="qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                <span className="qty-num">{qty}</span>
                <button className="qty-btn" onClick={() => setQty(q => Math.min(10, q + 1))}>+</button>
              </div>
            </div>
          )}

          {/* Step 4 */}
          {step === 4 && (
            <div>
              <p className="step-hint">Mach den Abend noch unvergesslicher</p>
              <div className="extras-step">
                {EXTRAS.map(e => (
                  <div
                    key={e.id}
                    className={`extra-opt${extras.includes(e.id) ? " selected" : ""}`}
                    onClick={() => toggleExtra(e.id)}
                  >
                    <div className="extra-opt-check">{extras.includes(e.id) ? "✓" : ""}</div>
                    <span className="extra-opt-icon">{e.icon}</span>
                    <div className="extra-opt-info">
                      <strong>{e.name}</strong>
                      <p>{e.desc}</p>
                    </div>
                    <span className="extra-opt-price">
                      {e.perPerson ? `${e.price} € / Pers.` : `${e.price} €`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 5 */}
          {step === 5 && (
            <div>
              <div className="order-summary">
                <div className="order-row">
                  <span>{SHOWS.find(s => s.id === selectedShow)?.name ?? "Show"} × {qty} Pers.</span>
                  <span>{seatPrice * qty} €</span>
                </div>
                {extras.map(id => {
                  const e = EXTRAS.find(x => x.id === id)!;
                  const p = e.perPerson ? e.price * qty : e.price;
                  return (
                    <div key={id} className="order-row">
                      <span>{e.name}</span><span>{p} €</span>
                    </div>
                  );
                })}
                <div className="order-row total">
                  <span>Gesamtbetrag</span><span>{total} €</span>
                </div>
              </div>
              <div className="pay-methods">
                <button className="pay-btn">🍎 Apple Pay</button>
                <button className="pay-btn">G Google Pay</button>
              </div>
              <div className="pay-divider">oder mit Karte bezahlen</div>
              <div className="form-row">
                <div className="form-group">
                  <label>Vorname *</label>
                  <input type="text" autoComplete="given-name" placeholder="Max" />
                </div>
                <div className="form-group">
                  <label>Nachname *</label>
                  <input type="text" autoComplete="family-name" placeholder="Mustermann" />
                </div>
              </div>
              <div className="form-group">
                <label>E-Mail *</label>
                <input type="email" autoComplete="email" placeholder="max@beispiel.de" />
              </div>
              <div className="form-group">
                <label>Telefon (optional)</label>
                <input type="tel" autoComplete="tel" placeholder="+49 ···" />
              </div>
              <div className="modal-trust">
                <span>🔒</span>
                <span>256-bit SSL · Sichere Buchung via Stripe · Bis 48h vor Show kostenlos stornierbar</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button
            className="btn-back"
            style={{ visibility: step === 1 ? "hidden" : "visible" }}
            onClick={prevStep}
          >← Zurück</button>
          <button className="btn-next" onClick={nextStep}>
            {step === 5 ? "Jetzt buchen" : "Weiter"} →
          </button>
        </div>
      </div>
    </div>
  );
}
