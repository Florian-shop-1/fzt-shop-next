"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import BookingModal, { SHOW_DATES, type DateEntry } from "@/components/BookingModal";

// ─────────────────────────────────────────────
//  SPIELPLAN — Monatsübersicht aller Shows
//
//  WICHTIG: Nutzt exakt dieselbe Terminquelle wie das Buchungsmodal
//  (SHOW_DATES aus BookingModal). Nur so passen die Termin-IDs, und ein
//  Klick im Kalender kann den Termin direkt vorauswählen.
//
//  Julian: sobald echte Ditix-Termine da sind, an EINER Stelle austauschen
//  (SHOW_DATES in BookingModal.tsx) — Kalender und Buchung ziehen automatisch mit.
// ─────────────────────────────────────────────

interface ShowMeta { name: string; color: string }
const SHOW_META: Record<string, ShowMeta> = {
  "ulmfassbar":      { name: "ULMFASSBAR",     color: "#C9A84C" },
  "magic-memories":  { name: "Magic Memories", color: "#9B7BD4" },
  "flo-zirkus":      { name: "Flo-Zirkus",     color: "#3A7FD0" },
  "magic-dinner":    { name: "Magic Dinner",   color: "#C0654E" },
};

interface PlanEvent {
  day: number;
  showId: string;
  time: string;
  dateId: string;
  timeId: string;
  soldOut?: boolean;
}

const MONATE = ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];
const WOCHENTAGE = ["Mo","Di","Mi","Do","Fr","Sa","So"];

// Datum steckt in der Termin-ID: "<showId>-YYYY-MM-DD"
function keyOf(entry: DateEntry): { y: number; m: number; d: number } | null {
  const match = entry.id.match(/(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return null;
  return { y: Number(match[1]), m: Number(match[2]) - 1, d: Number(match[3]) };
}

export default function SpielplanPage() {
  const heute = new Date();
  const [year, setYear] = useState(heute.getFullYear());
  const [month, setMonth] = useState(heute.getMonth());
  const [plan, setPlan] = useState<Record<string, DateEntry[]> | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [booking, setBooking] = useState<{ showId: string; dateId: string; timeId: string } | null>(null);

  // Erst nach dem Mounten setzen — vermeidet Server/Client-Unterschiede beim Datum
  useEffect(() => { setPlan(SHOW_DATES); }, []);

  const events = useMemo<PlanEvent[]>(() => {
    if (!plan) return [];
    const out: PlanEvent[] = [];
    for (const showId of Object.keys(plan)) {
      for (const entry of plan[showId]) {
        const k = keyOf(entry);
        if (!k || k.y !== year || k.m !== month) continue;
        if (entry.soldOut || entry.times.length === 0) {
          out.push({ day: k.d, showId, time: "", dateId: entry.id, timeId: "", soldOut: true });
          continue;
        }
        for (const t of entry.times) {
          out.push({ day: k.d, showId, time: t.time, dateId: entry.id, timeId: t.id });
        }
      }
    }
    return out;
  }, [plan, year, month]);

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

  const openBooking = (e: PlanEvent) => {
    setBooking({ showId: e.showId, dateId: e.dateId, timeId: e.timeId });
    setBookingOpen(true);
  };

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
                if (!meta) return null;
                return (
                  <button
                    key={idx}
                    className={`plan-show${e.soldOut ? " soldout" : ""}`}
                    style={{ borderLeftColor: meta.color }}
                    onClick={() => !e.soldOut && openBooking(e)}
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
        initialShow={booking?.showId}
        initialDateId={booking?.dateId}
        initialTimeId={booking?.timeId}
        onClose={() => setBookingOpen(false)}
      />
    </main>
  );
}
