"use client";

import { Fragment, useEffect, useState } from "react";

// ─────────────────────────────────────────────
//  DATA TYPES
// ─────────────────────────────────────────────

interface ShowEntry {
  id: string;
  name: string;
  desc: string;
  image: string;
  duration: string;
  badge?: string;
  badgeColor?: string;
  price: string;
}

interface TimeEntry {
  id: string;
  time: string;
  availableSeats?: number;
}

interface DateEntry {
  id: string;
  weekday: string;
  date: string;
  displayDate: string;
  times: TimeEntry[];
  low?: boolean;
  soldOut?: boolean;
}

interface ExtraEntry {
  id: string;
  name: string;
  desc: string;
  price: number;
  icon: string;
  perPerson: boolean;
}

interface BookingModalProps {
  open: boolean;
  initialShow?: string;
  onClose: () => void;
}

// ─────────────────────────────────────────────
//  STATIC DATA
// ─────────────────────────────────────────────

const SHOWS: ShowEntry[] = [
  {
    id: "ulmfassbar",
    name: "ULMFASSBAR",
    desc: "Florian Zimmers Signature-Show — Weltklasse-Magie, Humor und pure Emotion. Ein Abend, der dich sprachlos zurücklässt.",
    image: "/images/show-ulmfassbar.jpg",
    duration: "2h 30min",
    badge: "Bestseller",
    badgeColor: "#C9A84C",
    price: "ab 59 €",
  },
  {
    id: "magic-dinner",
    name: "Magic Dinner",
    desc: "Show + exklusives 3-Gänge-Menü. Der romantischste Abend des Jahres — vollständig durchkomponiert.",
    image: "/images/show-magic-dinner.jpg",
    duration: "4h",
    badge: "Exklusiv",
    badgeColor: "#9A7A2A",
    price: "ab 129 €",
  },
  {
    id: "flo-zirkus",
    name: "Flo-Zirkus",
    desc: "Zirkus, Akrobatik und Magie vereint. Ein spektakuläres Erlebnis für alle Sinne.",
    image: "/images/show-atmosphere.jpg",
    duration: "2h",
    badge: "Familienshow",
    badgeColor: "#6d28d9",
    price: "ab 45 €",
  },
  {
    id: "this-is-magic",
    name: "This is Magic!",
    desc: "Magie, die Herzen öffnet. Staunen, Lachen, Gänsehaut — für die ganze Familie ab 4 Jahren.",
    image: "/images/show-ulmfassbar-2.jpg",
    duration: "2h",
    badge: "Familienshow",
    badgeColor: "#6d28d9",
    price: "ab 39 €",
  },
];

const SHOW_DATES: Record<string, DateEntry[]> = {
  ulmfassbar: [
    { id: "u1", weekday: "Sa", date: "31. Mai 2026",  displayDate: "Sa, 31. Mai 2026",  times: [{ id: "u1t1", time: "19:30", availableSeats: 18 }], low: true },
    { id: "u2", weekday: "Sa", date: "07. Juni 2026",  displayDate: "Sa, 07. Juni 2026",  times: [{ id: "u2t1", time: "15:00", availableSeats: 42 }, { id: "u2t2", time: "19:30", availableSeats: 38 }] },
    { id: "u3", weekday: "Sa", date: "14. Juni 2026",  displayDate: "Sa, 14. Juni 2026",  times: [{ id: "u3t1", time: "19:30", availableSeats: 44 }] },
    { id: "u4", weekday: "Sa", date: "21. Juni 2026",  displayDate: "Sa, 21. Juni 2026",  times: [{ id: "u4t1", time: "15:00", availableSeats: 40 }, { id: "u4t2", time: "19:30", availableSeats: 35 }] },
    { id: "u5", weekday: "Sa", date: "28. Juni 2026",  displayDate: "Sa, 28. Juni 2026",  times: [{ id: "u5t1", time: "19:30", availableSeats: 46 }] },
    { id: "u6", weekday: "Sa", date: "05. Juli 2026",  displayDate: "Sa, 05. Juli 2026",  times: [{ id: "u6t1", time: "15:00", availableSeats: 48 }, { id: "u6t2", time: "19:30", availableSeats: 50 }] },
  ],
  "magic-dinner": [
    { id: "m1", weekday: "Fr", date: "05. Juni 2026",  displayDate: "Fr, 05. Juni 2026",  times: [{ id: "m1t1", time: "19:00", availableSeats: 8  }], low: true },
    { id: "m2", weekday: "Sa", date: "06. Juni 2026",  displayDate: "Sa, 06. Juni 2026",  times: [{ id: "m2t1", time: "18:30", availableSeats: 18 }, { id: "m2t2", time: "21:00", availableSeats: 22 }] },
    { id: "m3", weekday: "Fr", date: "12. Juni 2026",  displayDate: "Fr, 12. Juni 2026",  times: [{ id: "m3t1", time: "19:00", availableSeats: 24 }] },
    { id: "m4", weekday: "Sa", date: "13. Juni 2026",  displayDate: "Sa, 13. Juni 2026",  times: [{ id: "m4t1", time: "18:30", availableSeats: 20 }] },
    { id: "m5", weekday: "Fr", date: "19. Juni 2026",  displayDate: "Fr, 19. Juni 2026",  times: [{ id: "m5t1", time: "19:00", availableSeats: 28 }] },
    { id: "m6", weekday: "Sa", date: "20. Juni 2026",  displayDate: "Sa, 20. Juni 2026",  times: [{ id: "m6t1", time: "18:30", availableSeats: 30 }, { id: "m6t2", time: "21:00", availableSeats: 32 }] },
  ],
  "flo-zirkus": [
    { id: "f1", weekday: "So", date: "07. Juni 2026",  displayDate: "So, 07. Juni 2026",  times: [{ id: "f1t1", time: "15:00", availableSeats: 36 }, { id: "f1t2", time: "18:00", availableSeats: 40 }] },
    { id: "f2", weekday: "So", date: "14. Juni 2026",  displayDate: "So, 14. Juni 2026",  times: [{ id: "f2t1", time: "15:00", availableSeats: 44 }] },
    { id: "f3", weekday: "So", date: "21. Juni 2026",  displayDate: "So, 21. Juni 2026",  times: [{ id: "f3t1", time: "15:00", availableSeats: 40 }, { id: "f3t2", time: "18:00", availableSeats: 38 }] },
    { id: "f4", weekday: "So", date: "28. Juni 2026",  displayDate: "So, 28. Juni 2026",  times: [], soldOut: true },
    { id: "f5", weekday: "So", date: "05. Juli 2026",  displayDate: "So, 05. Juli 2026",  times: [{ id: "f5t1", time: "15:00", availableSeats: 38 }, { id: "f5t2", time: "18:00", availableSeats: 42 }] },
  ],
  "this-is-magic": [
    { id: "tm1", weekday: "So", date: "07. Juni 2026", displayDate: "So, 07. Juni 2026",  times: [{ id: "tm1t1", time: "14:00", availableSeats: 52 }, { id: "tm1t2", time: "16:30", availableSeats: 48 }] },
    { id: "tm2", weekday: "So", date: "14. Juni 2026", displayDate: "So, 14. Juni 2026",  times: [{ id: "tm2t1", time: "14:00", availableSeats: 60 }] },
    { id: "tm3", weekday: "So", date: "21. Juni 2026", displayDate: "So, 21. Juni 2026",  times: [{ id: "tm3t1", time: "14:00", availableSeats: 48 }, { id: "tm3t2", time: "16:30", availableSeats: 50 }] },
    { id: "tm4", weekday: "So", date: "28. Juni 2026", displayDate: "So, 28. Juni 2026",  times: [{ id: "tm4t1", time: "14:00", availableSeats: 55 }] },
    { id: "tm5", weekday: "So", date: "05. Juli 2026", displayDate: "So, 05. Juli 2026",  times: [{ id: "tm5t1", time: "14:00", availableSeats: 50 }, { id: "tm5t2", time: "16:30", availableSeats: 52 }] },
  ],
};

const EXTRAS: ExtraEntry[] = [
  { id: "prosecco",   name: "Welcome-Prosecco",      desc: "Für alle Personen — beliebteste Wahl",           price: 7.5, icon: "🥂", perPerson: true  },
  { id: "romantik",   name: "Romantik-Paket",         desc: "Rosen + persönliche Karte + Sektempfang",        price: 29,  icon: "🌹", perPerson: false },
  { id: "geburtstag", name: "Geburtstags-Deko",       desc: "Personalisierter Tischaufsteller + Karte",       price: 19,  icon: "🎂", perPerson: false },
  { id: "foto",       name: "Foto-Session backstage", desc: "Meet & Greet mit Florian Zimmer nach der Show",  price: 39,  icon: "📸", perPerson: false },
];

const SEAT_ZONES = [
  { id: "front-row", name: "Front Row VIP — Hautnah dabei",  price: 99, avail: "⚠ Nur 4 Plätze frei!", availColor: "#E74C3C" },
  { id: "premium",   name: "Premium — Ideale Perspektive",   price: 79, avail: "Nur noch 12 Plätze!",  availColor: "#E67E22" },
  { id: "parterre",  name: "Parterre — Mittendrin erleben",  price: 59, avail: "42 Plätze verfügbar",  availColor: "var(--muted)" },
];

const GOLD_TAKEN = [1,1,1,1,1,1,0,1, 1,1,1,1,1,0,1,1, 1,1,1,1,0,1,0,1];
const PREM_TAKEN = [1,1,0,1,1,0,1,0,1,1, 1,0,1,1,0,1,1,0,1,1, 0,1,0,1,1,0,1,1,0,1, 1,0,1,0,1,1,0,0,1,1];
const STD_TAKEN  = [1,0,1,0,1,0,0,1,0,1,0,1, 0,1,0,1,0,1,0,0,1,0,1,0, 1,0,0,1,0,1,0,1,0,0,1,0, 0,1,0,0,1,0,1,0,0,1,0,1, 1,0,0,1,0,0,1,0,1,0,0,1, 0,1,0,0,0,1,0,1,0,0,1,0];

const ZONE_ROWS: Record<string, { taken: number[]; cols: number; rows: number[] }> = {
  "front-row": { taken: GOLD_TAKEN, cols: 8,  rows: [0,1,2]     },
  "premium":   { taken: PREM_TAKEN, cols: 10, rows: [0,1,2,3]   },
  "parterre":  { taken: STD_TAKEN,  cols: 12, rows: [0,1,2,3,4,5] },
};

const STEP_LABELS = ["Show & Termin", "Plätze", "Extras", "Kontakt"];

// ─────────────────────────────────────────────
//  SVG ICONS
// ─────────────────────────────────────────────

function IconCalendar({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  );
}

function IconClock({ size = 11 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  );
}

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────

export default function BookingModal({ open, initialShow, onClose }: BookingModalProps) {
  const [step,           setStep]          = useState(1);
  const [selectedShowId, setSelectedShowId] = useState(initialShow ?? "");
  const [selectedDateId, setSelectedDateId] = useState<string | null>(null);
  const [selectedTimeId, setSelectedTimeId] = useState<string | null>(null);
  const [selectedSeat,   setSelectedSeat]   = useState("");
  const [seatPrice,      setSeatPrice]      = useState(59);
  const [qty,            setQty]            = useState(2);
  const [extras,         setExtras]         = useState<string[]>([]);

  useEffect(() => {
    if (open) {
      setStep(1);
      setSelectedSeat("");
      setSeatPrice(59);
      setExtras([]);
      if (initialShow) {
        setSelectedShowId(initialShow);
        setSelectedDateId(null);
        setSelectedTimeId(null);
      }
    }
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open, initialShow]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!open) return null;

  // ── Helpers ──────────────────────────────

  const handleSelectShow = (id: string) => {
    if (selectedShowId === id) return;
    setSelectedShowId(id);
    setSelectedDateId(null);
    setSelectedTimeId(null);
  };

  const handleSelectTime = (dateId: string, timeId: string) => {
    setSelectedDateId(dateId);
    setSelectedTimeId(timeId);
  };

  const toggleExtra = (id: string) =>
    setExtras(prev => prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]);

  const extrasTotal = extras.reduce((sum, id) => {
    const e = EXTRAS.find(x => x.id === id)!;
    return sum + (e.perPerson ? e.price * qty : e.price);
  }, 0);
  const total = seatPrice * qty + extrasTotal;

  const canProceed = (() => {
    if (step === 1) return selectedShowId !== "" && selectedDateId !== null && selectedTimeId !== null;
    if (step === 2) return selectedSeat !== "";
    return true;
  })();

  const nextStep = () => {
    if (step < 4) setStep(s => s + 1);
    else { alert("Vielen Dank! Ihre Buchung wird bearbeitet. ✨"); onClose(); }
  };

  // Resolved entities for summary
  const resolvedShow = SHOWS.find(s => s.id === selectedShowId);
  const resolvedDates = SHOW_DATES[selectedShowId] ?? [];
  const resolvedDate = resolvedDates.find(d => d.id === selectedDateId) ?? null;
  const resolvedTime = resolvedDate?.times.find(t => t.id === selectedTimeId) ?? null;

  const dotClass  = (n: number) => `step-dot${step === n ? " active" : step > n ? " done" : ""}`;
  const lineClass = (n: number) => `step-line${step > n ? " done" : ""}`;

  // ── Render ───────────────────────────────

  return (
    <div className="modal-overlay active" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <button className="modal-close" onClick={onClose}>✕</button>

        {/* ── Header ── */}
        <div className="modal-header">
          <h2>Jetzt buchen</h2>
          <div className="step-indicator">
            {[1, 2, 3, 4].map((n, i) => (
              <Fragment key={n}>
                <div className={dotClass(n)}>{step > n ? "✓" : n}</div>
                {i < 3 && <div className={lineClass(n)} />}
              </Fragment>
            ))}
          </div>
          <div className="step-labels">
            {STEP_LABELS.map((label, i) => (
              <span key={label} className={`step-label-text${step === i + 1 ? " active" : ""}`}>
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* ── Body ── */}
        <div className="modal-body">

          {/* ══════════════════════════════════════
              STEP 1 — Show + Datum & Uhrzeit
          ══════════════════════════════════════ */}
          {step === 1 && (
            <div>
              {/* Show list */}
              <p className="step-hint">Wähle deine Show</p>
              <div className="show-list">
                {SHOWS.map(show => (
                  <div
                    key={show.id}
                    className={`show-list-card${selectedShowId === show.id ? " selected" : ""}`}
                    onClick={() => handleSelectShow(show.id)}
                  >
                    <div
                      className="show-list-img"
                      style={{ backgroundImage: `url('${show.image}')` }}
                    />
                    <div className="show-list-info">
                      <div className="show-list-meta">
                        {show.badge && (
                          <span
                            className="show-list-badge"
                            style={{ background: show.badgeColor }}
                          >{show.badge}</span>
                        )}
                        <span className="show-list-duration">{show.duration}</span>
                        <span className="show-list-price">{show.price}</span>
                      </div>
                      <h4 className="show-list-name">{show.name}</h4>
                      <p className="show-list-desc">{show.desc}</p>
                    </div>
                    <div className={`show-list-check${selectedShowId === show.id ? " visible" : ""}`}>
                      ✓
                    </div>
                  </div>
                ))}
              </div>

              {/* Date & time section — appears when a show is selected */}
              {selectedShowId && (
                <div className="date-section">
                  <div className="date-section-title">
                    <IconCalendar size={15} />
                    Datum &amp; Uhrzeit
                  </div>

                  <div className="date-cards">
                    {resolvedDates.map(d => {
                      const isActive = selectedDateId === d.id;
                      return (
                        <div
                          key={d.id}
                          className={`date-card${d.soldOut ? " soldout" : ""}${d.low && !d.soldOut ? " low" : ""}${isActive ? " selected" : ""}`}
                        >
                          <div className="date-card-header">
                            <IconCalendar size={13} />
                            <span className="date-card-weekday">{d.weekday},</span>
                            <span className="date-card-date">{d.date}</span>
                            {d.low && !d.soldOut && (
                              <span className="date-card-avail-warn">Wenige Plätze</span>
                            )}
                          </div>
                          <div className="date-card-times">
                            {d.soldOut ? (
                              <span className="date-soldout-label">Ausgebucht</span>
                            ) : (
                              d.times.map(t => (
                                <button
                                  key={t.id}
                                  className={`date-card-time${isActive && selectedTimeId === t.id ? " selected" : ""}`}
                                  onClick={() => handleSelectTime(d.id, t.id)}
                                >
                                  <IconClock size={11} />
                                  {t.time} Uhr
                                  {t.availableSeats !== undefined && t.availableSeats <= 15 && (
                                    <span className="time-seats-badge">{t.availableSeats} Pl.</span>
                                  )}
                                </button>
                              ))
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Scarcity note for low-availability dates */}
                  {resolvedDate?.low && (
                    <div className="urgency-note" style={{ marginTop: 10 }}>
                      <span className="scarcity-dot" />
                      Für diesen Termin nur noch wenige Plätze — jetzt sichern!
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ══════════════════════════════════════
              STEP 2 — Saalplan
          ══════════════════════════════════════ */}
          {step === 2 && (
            <div>
              <p className="step-hint">Wähle deine Platzkategorie im Saal</p>
              <div className="seatmap-hint">
                💡 Klicke auf eine Zone — goldene Sitze sind die ersten Reihen direkt vor der Bühne.
              </div>

              <div className="seatmap">
                {/* Stage */}
                <div className="seatmap-stage">
                  <div className="seatmap-stage-label">✦ &nbsp;BÜHNE &nbsp;✦</div>
                  <div className="seatmap-stage-sub">FLORIAN ZIMMER THEATER</div>
                </div>

                {/* Seat zones */}
                {SEAT_ZONES.map(zone => {
                  const cfg = ZONE_ROWS[zone.id];
                  const dotCls =
                    zone.id === "front-row" ? "golden-dot" :
                    zone.id === "premium"   ? "premium-dot" : "standard-dot";
                  const zoneCls =
                    zone.id === "front-row" ? "golden-zone" :
                    zone.id === "premium"   ? "premium-zone" : "standard-zone";
                  return (
                    <div
                      key={zone.id}
                      className={`seatmap-zone ${zoneCls}${selectedSeat === zone.id ? " selected" : ""}`}
                      onClick={() => { setSelectedSeat(zone.id); setSeatPrice(zone.price); }}
                    >
                      <div className="seatmap-zone-header">
                        {selectedSeat === zone.id && <div className="zone-selected-check">✓</div>}
                        <span className="zone-name">{zone.name}</span>
                        <span className="zone-avail-tag" style={{ color: zone.availColor }}>{zone.avail}</span>
                        <span className="zone-price-tag">{zone.price} €</span>
                      </div>
                      <div className="seatmap-rows">
                        {cfg.rows.map(row => (
                          <div key={row} className="seatmap-row">
                            {cfg.taken.slice(row * cfg.cols, row * cfg.cols + cfg.cols).map((taken, col) => (
                              <div
                                key={col}
                                className={`seat-dot ${dotCls}`}
                                style={taken ? { opacity: zone.id === "parterre" ? 0.15 : 0.18 } : {}}
                              />
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}

                {/* VIP Loge */}
                <div className="seatmap-loge-row">
                  <div className="loge-box" onClick={() => alert("VIP-Loge anfragen:\n📞 0731 7906 110\n✉ loge@florianzimmertheater.de")}>
                    <div className="loge-box-title">VIP Loge</div>
                    <div className="loge-box-price">ab 599 €</div>
                    <div className="loge-box-cta">anfragen →</div>
                  </div>
                  <div className="seatmap-loge-center">EINGANG · AUSGANG</div>
                  <div className="loge-box" onClick={() => alert("VIP-Loge anfragen:\n📞 0731 7906 110\n✉ loge@florianzimmertheater.de")}>
                    <div className="loge-box-title">VIP Loge</div>
                    <div className="loge-box-price">ab 599 €</div>
                    <div className="loge-box-cta">anfragen →</div>
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div style={{ display: "flex", gap: 20, margin: "14px 0 4px", fontSize: 11, color: "var(--muted)" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ width: 13, height: 9, borderRadius: "2px 2px 0 0", background: "var(--gold)", display: "inline-block" }} />
                  verfügbar
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ width: 13, height: 9, borderRadius: "2px 2px 0 0", background: "rgba(201,168,76,0.18)", display: "inline-block" }} />
                  belegt
                </span>
              </div>

              <div className="qty-selector">
                <span>Personen:</span>
                <button className="qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                <span className="qty-num">{qty}</span>
                <button className="qty-btn" onClick={() => setQty(q => Math.min(10, q + 1))}>+</button>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════
              STEP 3 — Extras
          ══════════════════════════════════════ */}
          {step === 3 && (
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

          {/* ══════════════════════════════════════
              STEP 4 — Kontakt & Bezahlung
          ══════════════════════════════════════ */}
          {step === 4 && (
            <div>
              {/* Order summary */}
              <div className="order-summary">
                <div className="order-row" style={{ flexDirection: "column", gap: 2, alignItems: "flex-start" }}>
                  <span style={{ fontWeight: 600 }}>{resolvedShow?.name ?? "Show"}</span>
                  <span style={{ fontSize: 12, color: "var(--muted)" }}>
                    {resolvedDate?.displayDate ?? ""}{resolvedTime ? ` · ${resolvedTime.time} Uhr` : ""}
                  </span>
                </div>
                <div className="order-row">
                  <span>{qty} × {selectedSeat === "front-row" ? "Front Row VIP" : selectedSeat === "premium" ? "Premium" : "Parterre"}</span>
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

              {/* Payment */}
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

        {/* ── Footer ── */}
        <div className="modal-footer">
          <button
            className="btn-back"
            style={{ visibility: step === 1 ? "hidden" : "visible" }}
            onClick={() => setStep(s => s - 1)}
          >← Zurück</button>
          <button
            className="btn-next"
            onClick={nextStep}
            disabled={!canProceed}
            style={!canProceed ? { opacity: 0.38, cursor: "not-allowed", boxShadow: "none" } : {}}
          >
            {step === 4 ? "Jetzt buchen ✦" : "Weiter →"}
          </button>
        </div>
      </div>
    </div>
  );
}
