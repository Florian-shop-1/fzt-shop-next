"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import BookingModal from "@/components/BookingModal";

// ─────────────────────────────────────────────
//  SPIELPLAN — Monatsübersicht aller Shows
//  Termine kommen live aus /api/ditix/events.
//  Solange dort nichts kommt, werden Beispiel-Termine
//  gezeigt (DEMO_TERMINE), damit die Ansicht sichtbar ist.
//  Julian: sobald die Route echte Events liefert, greifen sie automatisch.
// ─────────────────────────────────────────────

const DEMO_TERMINE = true;

interface ShowMeta { name: string; color: string }
const SHOW_META: Record<string, ShowMeta> = {
  "ulmfassbar":      { name: "ULMFASSBAR",     color: "#C9A84C" },
  "magic-memories":  { name: "Magic Memories", color: "#9B7BD4" },
  "flo-zirkus":      { name: "Flo-Zirkus",     color: "#3A7FD0" },
  "magic-dinner":    { name: "Magic Dinner",   color: "#C0654E" },
};

interface PlanEvent { day: number; showId: string; time: string; soldOut?: boolean }
interface MiniEvent { name: string; timestampStart: number; ticketSaleState: string | null }

const mapShow = (name: string): string | null => {
  const n = name.toLowerCase();
  if (n.includes("ulmfassbar")) return "ulmfassbar";
  if (n.includes("memories")) return "magic-memories";
  if (n.includes("zirkus")) return "flo-zirkus";
  if (n.includes("dinner")) return "magic-dinner";
  return null;
};

// Beispiel-Spielplan (wiederkehrendes Muster) — nur bis Live-Daten da sind
function demoEvents(year: number, month: number): PlanEvent[] {
  const out: PlanEvent[] = [];
  const days = new Date(year, month + 1, 0).getDate();
  const today = new Date(); today.setHours(0, 0, 0, 0);
  for (let d = 1; d <= days; d++) {
    const date = new Date(year, month, d);
    if (date < today) continue;
    const wd = date.getDay(); // 0 = So … 6 = Sa
    // Samstags meist zwei Vorstellungen
    if (wd === 6) {
      out.push({ day: d, showId: "ulmfassbar", time: "16:30" });
      out.push({ day: d, showId: "ulmfassbar", time: "20:30" });
    }
    if (wd === 5) out.push({ day: d, showId: "magic-memories", time: "19:30" });
    if (wd === 0) out.push({ day: d, showId: "flo-zirkus", time: "15:00" });
    if (wd === 4) out.push({ day: d, showId: "magic-dinner", time: "19:00" });
  }
  return out;
}

const MONATE = ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];
const WOCHENTAGE = ["Mo","Di","Mi","Do","Fr","Sa","So"];

export default function SpielplanPage() {
  const heute = new Date();
  const [year, setYear] = useState(heute.getFullYear());
  const [month, setMonth] = useState(heute.getMonth());
  const [liveEvents, setLiveEvents] = useState<MiniEvent[] | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingShow, setBookingShow] = useState("");

  // Live-Termine laden (einmalig)
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/ditix/events");
        if (!res.ok) return;
        const data: MiniEvent[] = await res.json();
        if (!cancelled && Array.isArray(data) && data.length > 0) setLiveEvents(data);
      } catch { /* still — Demo bleibt */ }
    })();
    return () => { cancelled = true; };
  }, []);

  // Termine des angezeigten Monats
  const events = useMemo<PlanEvent[]>(() => {
    if (liveEvents) {
      const out: PlanEvent[] = [];
      for (const ev of liveEvents) {
        if (!ev?.timestampStart) continue;
        const d = new Date(ev.timestampStart);
        if (d.getFullYear() !== year || d.getMonth() !== month) continue;
        const showId = mapShow(ev.name || "");
        if (!showId) continue;
        out.push({
          day: d.getDate(),
          showId,
          time: d.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" }),
          soldOut: ev.ticketSaleState === "SOLD_OUT",
        });
      }
      return out;
    }
    return DEMO_TERMINE ? demoEvents(year, month) : [];
  }, [liveEvents, year, month]);

  const byDay = useMemo(() => {
    const m: Record<number, PlanEvent[]> = {};
    for (const e of events) (m[e.day] ??= []).push(e);
    for (const k in m) m[k].sort((a, b) => a.time.localeCompare(b.time));
    return m;
  }, [events]);

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstOffset = (new Date(year, month, 1).getDay() + 6) % 7; // Mo = 0
  const istHeute = (d: number) =>
    d === heute.getDate() && month === heute.getMonth() && year === heute.getFullYear();

  const prev = () => { if (month === 0) { setMonth(11); setYear(y => y - 1); } else setMonth(m => m - 1); };
  const next = () => { if (month === 11) { setMonth(0); setYear(y => y + 1); } else setMonth(m => m + 1); };

  const openBooking = (showId: string) => { setBookingShow(showId); setBookingOpen(true); };

  // Shows, die in diesem Monat vorkommen → Legende
  const legende = useMemo(
    () => Object.keys(SHOW_META).filter(id => events.some(e => e.showId === id)),
    [events]
  );

  return (
    <main className="plan-page">
      <header className="plan-topbar">
        <Link href="/" className="plan-logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo.png" alt="Florian Zimmer Theater" />
        </Link>
        <Link href="/" className="legal-back">← Zurück zur Startseite</Link>
      </header>

      <div className="plan-head">
        <span className="plan-eyebrow">✦ Spielplan</span>
        <h1>Alle Shows, alle Termine</h1>
        <p className="plan-sub">Auf einen Blick — tippe einen Termin an und buche direkt.</p>
      </div>

      <div className="plan-nav">
        <button className="plan-nav-btn" onClick={prev} aria-label="Vorheriger Monat">‹</button>
        <h2 className="plan-month">{MONATE[month]} {year}</h2>
        <button className="plan-nav-btn" onClick={next} aria-label="Nächster Monat">›</button>
      </div>

      <div className="plan-weekdays">
        {WOCHENTAGE.map(w => <span key={w}>{w}</span>)}
      </div>

      <div className="plan-grid">
        {Array.from({ length: firstOffset }).map((_, i) => <div key={`e${i}`} className="plan-cell empty" />)}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const d = i + 1;
          const evs = byDay[d] ?? [];
          return (
            <div key={d} className={`plan-cell${evs.length ? " has-shows" : ""}${istHeute(d) ? " today" : ""}`}>
              <span className="plan-day">{d}</span>
              <span className="plan-day-full">
                {new Date(year, month, d).toLocaleDateString("de-DE", { weekday: "short", day: "numeric", month: "long" })}
              </span>
              {evs.map((e, idx) => {
                const meta = SHOW_META[e.showId];
                return (
                  <button
                    key={idx}
                    className={`plan-show${e.soldOut ? " soldout" : ""}`}
                    style={{ borderLeftColor: meta.color }}
                    onClick={() => !e.soldOut && openBooking(e.showId)}
                    disabled={e.soldOut}
                  >
                    <span className="plan-show-name">{meta.name}</span>
                    <span className="plan-show-time">{e.soldOut ? "Ausgebucht" : `${e.time} Uhr`}</span>
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>

      {legende.length > 0 && (
        <div className="plan-legend">
          {legende.map(id => (
            <span key={id} className="plan-legend-item">
              <span className="plan-legend-dot" style={{ background: SHOW_META[id].color }} />
              {SHOW_META[id].name}
            </span>
          ))}
        </div>
      )}

      <p className="plan-note">
        Kein passender Termin dabei? Schreib uns an{" "}
        <a href="mailto:tickets@florianzimmer.com">tickets@florianzimmer.com</a> — für Gruppen und
        Firmenevents finden wir fast immer einen Weg.
      </p>

      <BookingModal
        open={bookingOpen}
        initialShow={bookingShow}
        onClose={() => setBookingOpen(false)}
      />
    </main>
  );
}
