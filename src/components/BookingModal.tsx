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

interface MenuEntry {
  id: string;
  name: string;
  tagline: string;
  price: number;
  badge?: string;
  badgeColor?: string;
  includes: string;
  courses: string[];
}

interface StehtischEntry {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  priceLabel: string;
  personsPerUnit: number;
  badge?: string;
  highlight?: boolean;
  luxury?: boolean;
  items: string[];
}

interface BookingModalProps {
  open: boolean;
  initialShow?: string;
  onClose: () => void;
  onLogeInquiry?: () => void;
}

// ─────────────────────────────────────────────
//  STATIC DATA
// ─────────────────────────────────────────────

const SHOWS: ShowEntry[] = [
  {
    id: "ulmfassbar",
    name: "ULMFASSBAR",
    desc: "Florian Zimmers Signature-Show — Weltklasse-Magie, Humor und pure Emotion. Ein Abend, der dich sprachlos zurücklässt.",
    image: "/images/show-atmosphere.jpg",
    duration: "2h 30min",
    badge: "Bestseller",
    badgeColor: "#C9A84C",
    price: "ab 49 €",
  },
  {
    id: "magic-memories",
    name: "Magic Memories",
    desc: "Florian Zimmers brandneue Show. Zweieinhalb Stunden voller Staunen, Emotionen und magischer Momente.",
    image: "/images/show-magic-dinner.jpg",
    duration: "2h 30min",
    badge: "Neue Show",
    badgeColor: "#C9A84C",
    price: "ab 49 €",
  },
  {
    id: "flo-zirkus",
    name: "Flo-Zirkus",
    desc: "Eine interaktive Show, bei der die kleinen Gäste selbst Teil der Magie werden.",
    image: "/images/flo-zirkus-neu.png",
    duration: "50 Min",
    badge: "Kindershow",
    badgeColor: "#3a7fd0",
    price: "ab 29 €",
  },
  {
    id: "magic-dinner",
    name: "Magic Dinner",
    desc: "Exklusives Dinner-Erlebnis. Vier Gänge, außergewöhnliche Küche und Magie direkt am Tisch.",
    image: "/images/magic-dinner-neu2.png",
    duration: "3,5h",
    badge: "Exklusiv",
    badgeColor: "#9A7A2A",
    price: "ab 129 €",
  },
];

const SHOW_DATES: Record<string, DateEntry[]> = {
  ulmfassbar: [
    { id: "u1", weekday: "Sa", date: "31. Mai 2026",   displayDate: "Sa, 31. Mai 2026",   times: [{ id: "u1t1", time: "19:30", availableSeats: 18 }], low: true },
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
  "magic-memories": [
    { id: "mm1", weekday: "Fr", date: "06. Juni 2026", displayDate: "Fr, 06. Juni 2026",  times: [{ id: "mm1t1", time: "19:30", availableSeats: 24 }] },
    { id: "mm2", weekday: "Sa", date: "13. Juni 2026", displayDate: "Sa, 13. Juni 2026",  times: [{ id: "mm2t1", time: "19:30", availableSeats: 40 }] },
    { id: "mm3", weekday: "Fr", date: "20. Juni 2026", displayDate: "Fr, 20. Juni 2026",  times: [{ id: "mm3t1", time: "19:30", availableSeats: 36 }] },
    { id: "mm4", weekday: "Sa", date: "27. Juni 2026", displayDate: "Sa, 27. Juni 2026",  times: [{ id: "mm4t1", time: "19:30", availableSeats: 44 }] },
    { id: "mm5", weekday: "Sa", date: "04. Juli 2026", displayDate: "Sa, 04. Juli 2026",  times: [{ id: "mm5t1", time: "19:30", availableSeats: 48 }] },
  ],
};

const MENUS: MenuEntry[] = [
  {
    id: "classic",
    name: "Magicuisine Classic",
    tagline: "Das Original — ein kulinarisches Meisterwerk",
    price: 69,
    badge: "Beliebteste Wahl",
    badgeColor: "#C9A84C",
    includes: "inkl. Welcome-Cocktail",
    courses: [
      "Amuse-Bouche",
      "Waldpilz-Cremesuppe mit Trüffelöl",
      "Rinderfilet an Trüffeljus & Rotweinreduktion",
      "Chocolat Fondant mit Vanilleeis",
    ],
  },
  {
    id: "sea",
    name: "Magicuisine Sea",
    tagline: "Meeresfrüchte & Fisch — handverlesen & frisch",
    price: 69,
    includes: "inkl. Welcome-Cocktail",
    courses: [
      "Amuse-Bouche",
      "Hummercremesuppe",
      "Steinbutt mit Meeresfrüchten & Buttersauce",
      "Panna Cotta mit Beerencompote",
    ],
  },
  {
    id: "vegan",
    name: "Magicuisine Vegan",
    tagline: "Pflanzliche Gourmetküche auf höchstem Niveau",
    price: 69,
    includes: "inkl. Welcome-Cocktail",
    courses: [
      "Amuse-Bouche",
      "Kürbiscremesuppe mit geröstetem Kürbiskern",
      "Trüffel-Risotto mit frischen Kräutern",
      "Mango-Sorbet",
    ],
  },
  {
    id: "kids",
    name: "Kids Menü",
    tagline: "Für unsere kleinen Zauberlehrlinge",
    price: 29,
    includes: "inkl. Kids-Cocktail",
    courses: [
      "Hausgemachte Gemüsesuppe",
      "Schnitzel mit Pommes & Ketchup",
      "Vanilleeis mit bunten Streuseln",
    ],
  },
];

const STEHTISCHE: StehtischEntry[] = [
  {
    id: "silver",
    name: "Silver Stehtisch",
    subtitle: "Reservierter Stehtisch · für einzelne Gäste & kleine Gruppen",
    price: 17.5,
    priceLabel: "17,50 €",
    personsPerUnit: 1,
    items: [
      "Reservierter Stehtisch im Foyer",
      "1 Glas Magicuvée prickelnd",
      "Zauberschnitte",
      "Süßigkeit",
    ],
  },
  {
    id: "gold",
    name: "Gold Date Table",
    subtitle: "Reservierter Stehtisch · für einen besonderen Abend zu zweit",
    price: 55,
    priceLabel: "55 €",
    personsPerUnit: 2,
    badge: "Beliebt bei Paaren",
    highlight: true,
    items: [
      "Reservierter Stehtisch im Foyer",
      "1 kl. Flasche Magicuvée prickelnd",
      "Zauberschnitten",
      "Popcorn",
    ],
  },
  {
    id: "diamond",
    name: "Diamond Stehtisch",
    subtitle: "Reservierter Premium-Stehtisch · das luxuriöseste Pause-Erlebnis",
    price: 109,
    priceLabel: "109 €",
    personsPerUnit: 2,
    badge: "Luxus",
    luxury: true,
    items: [
      "Reservierter Premium-Stehtisch",
      "Laurent Perrier Rosé",
      "Zauberschnitten",
      "Popcorn",
    ],
  },
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

const VIP_BUNDLES = [
  {
    id: "kids",
    name: "Kids Magic Bundle",
    price: 29,
    badge: "Für Kinder",
    badgeColor: "#6d28d9",
    desc: "Echte Profi-Tricks zum Selbermachen — inkl. Online-Pass, in dem Florian jeden Trick Schritt für Schritt im Video erklärt (mit Vorführtipps für den Wow-Effekt).",
    items: [
      "Gelddruckmaschine 2.0",
      "Schwebender Zauberstab",
      "Verschwindendes Tuch",
      "Schwebendes Streichholz & 1-zu-8-Würfel",
      "10 Extra-Tricks auf Magieakademie.de",
    ],
    pickup: "Einfach nach der Show im Magic Shop im Foyer abholen.",
  },
  {
    id: "premium",
    name: "Premium Magic Bundle",
    price: 49,
    badge: "Limitiert",
    badgeColor: "#C9A84C",
    desc: "Florians Lieblingstricks für zuhause — inkl. Online-Pass mit Video-Erklärung und Vorführtipps zu jedem Trick.",
    items: [
      "FZ-Kartenspiel für Gedankenlese-Effekte",
      "Stift durch Geldschein (Florians Handling)",
      "Selbstlösender Zauberwürfel",
      "10 Extra-Tricks auf Magieakademie.de",
    ],
    pickup: "Einfach nach der Show im Magic Shop im Foyer abholen.",
  },
];

const STEP_LABELS = ["Show & Termin", "Plätze", "Magicuisine", "Pause & VIP", "Magie für Zuhause", "Checkout"];

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

function IconChevronDown({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  );
}

// ─────────────────────────────────────────────
//  REUSABLE QUANTITY CONTROL
// ─────────────────────────────────────────────

function QtyControl({
  value,
  onDec,
  onInc,
  canInc,
  label,
}: {
  value: number;
  onDec: () => void;
  onInc: () => void;
  canInc: boolean;
  label?: string;
}) {
  return (
    <div className="qty-ctrl">
      {label && <span className="qty-ctrl-label">{label}</span>}
      <div className="qty-ctrl-row">
        <button
          className="qty-ctrl-btn"
          onClick={e => { e.stopPropagation(); onDec(); }}
          disabled={value === 0}
        >−</button>
        <span className={`qty-ctrl-num${value > 0 ? " active" : ""}`}>{value}</span>
        <button
          className="qty-ctrl-btn"
          onClick={e => { e.stopPropagation(); onInc(); }}
          disabled={!canInc}
        >+</button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────

export default function BookingModal({ open, initialShow, onClose, onLogeInquiry }: BookingModalProps) {
  // ── Show / Date / Seat state ──────────────
  const [step,          setStep]          = useState(1);
  const [selectedShowId, setSelectedShowId] = useState(initialShow ?? "");
  const [selectedDateId, setSelectedDateId] = useState<string | null>(null);
  const [selectedTimeId, setSelectedTimeId] = useState<string | null>(null);
  const [selectedSeat,  setSelectedSeat]  = useState("");
  const [seatPrice,     setSeatPrice]     = useState(59);
  const [qty,           setQty]           = useState(2);

  // ── Upsell quantities ─────────────────────
  const [menuQtys,      setMenuQtys]      = useState<Record<string, number>>({});
  const [stehtischQtys, setStehtischQtys] = useState<Record<string, number>>({});
  const [parkingQty,    setParkingQty]    = useState(0);
  const [vipSilverQty,  setVipSilverQty]  = useState(0);
  const [vipGoldQty,    setVipGoldQty]    = useState(0);
  const [flexQty,       setFlexQty]       = useState(0);
  const [bundleQtys,    setBundleQtys]    = useState<Record<string, number>>({});

  // ── Menu expand state ─────────────────────
  const [expandedMenu,       setExpandedMenu]       = useState<string | null>(null);
  const [showMenuCards,      setShowMenuCards]      = useState(false);
  const [showStehtischCards, setShowStehtischCards] = useState(false);
  const [showAllShows,       setShowAllShows]       = useState(false);
  const [confirmed,          setConfirmed]          = useState(false);
  const [logeInfoOpen,       setLogeInfoOpen]       = useState(false);
  const [souvenir,           setSouvenir]           = useState(false);
  const [activePrompt,       setActivePrompt]       = useState<null | "menu" | "secure">(null);
  const [menuPromptShown,    setMenuPromptShown]    = useState(false);
  const [securePromptShown,  setSecurePromptShown]  = useState(false);

  useEffect(() => {
    if (open) {
      setStep(1);
      setSelectedSeat("");
      setSeatPrice(59);
      setMenuQtys({});
      setStehtischQtys({});
      setParkingQty(0);
      setVipSilverQty(0);
      setVipGoldQty(0);
      setFlexQty(0);
      setBundleQtys({});
      setExpandedMenu(null);
      setShowMenuCards(false);
      setShowStehtischCards(false);
      setShowAllShows(false);
      setConfirmed(false);
      setLogeInfoOpen(false);
      setActivePrompt(null);
      setMenuPromptShown(false);
      setSecurePromptShown(false);
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

  // Rückkehr über Brevo-Mail 3: Souvenirglas automatisch (1 Glas pro Ticket)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (new URLSearchParams(window.location.search).get("souvenirglass") === "1") setSouvenir(true);
  }, []);

  if (!open) return null;

  // ── Resolved entities ──────────────────────
  const resolvedShow  = SHOWS.find(s => s.id === selectedShowId);
  const resolvedDates = SHOW_DATES[selectedShowId] ?? [];
  const resolvedDate  = resolvedDates.find(d => d.id === selectedDateId) ?? null;
  const resolvedTime  = resolvedDate?.times.find(t => t.id === selectedTimeId) ?? null;

  // ── Dynamic Menübeginn ──────────────────────
  const getMenubeginn = (): string | null => {
    if (!resolvedDate || !resolvedTime) return null;
    if (resolvedDate.weekday === "So") return "Menü direkt nach der Show";
    const [h, m] = resolvedTime.time.split(":").map(Number);
    const totalMin = h * 60 + m - 90;
    const mh = Math.floor(totalMin / 60);
    const mm = totalMin % 60;
    return `Menübeginn: ${mh}:${mm.toString().padStart(2, "0")} Uhr`;
  };
  const menubeginn = getMenubeginn();

  // ── Computed upsell totals ────────────────
  const totalMenuQty = MENUS.reduce((s, m) => s + (menuQtys[m.id] ?? 0), 0);

  const stehtischPersonsUsed =
    (stehtischQtys["silver"]  ?? 0) * 1 +
    (stehtischQtys["gold"]    ?? 0) * 2 +
    (stehtischQtys["diamond"] ?? 0) * 2;

  // ── Helpers ───────────────────────────────
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

  // Menu qty
  const incMenu = (id: string) => {
    if (totalMenuQty < qty) setMenuQtys(p => ({ ...p, [id]: (p[id] ?? 0) + 1 }));
  };
  const decMenu = (id: string) =>
    setMenuQtys(p => ({ ...p, [id]: Math.max(0, (p[id] ?? 0) - 1) }));

  // Stehtisch qty — constraint: total persons covered ≤ seat qty
  const canIncStehtisch = (ppu: number) => stehtischPersonsUsed + ppu <= qty;
  const incStehtisch = (id: string, ppu: number) => {
    if (canIncStehtisch(ppu))
      setStehtischQtys(p => ({ ...p, [id]: (p[id] ?? 0) + 1 }));
  };
  const decStehtisch = (id: string) =>
    setStehtischQtys(p => ({ ...p, [id]: Math.max(0, (p[id] ?? 0) - 1) }));

  // Parking
  const incParking = () => setParkingQty(q => Math.min(7, q + 1));
  const decParking = () => setParkingQty(q => Math.max(0, q - 1));

  // VIP Getränkeflat
  const incVipSilver = () => setVipSilverQty(q => Math.min(qty, q + 1));
  const decVipSilver = () => {
    const next = Math.max(0, vipSilverQty - 1);
    setVipSilverQty(next);
    setVipGoldQty(g => Math.min(g, next));
  };
  const incVipGold = () => {
    if (vipSilverQty > 0) setVipGoldQty(q => Math.min(vipSilverQty, q + 1));
  };
  const decVipGold = () => setVipGoldQty(q => Math.max(0, q - 1));

  // Flex
  const incFlex = () => setFlexQty(q => Math.min(qty, q + 1));
  const decFlex = () => setFlexQty(q => Math.max(0, q - 1));

  // Bundles
  const incBundle = (id: string) => setBundleQtys(p => ({ ...p, [id]: (p[id] ?? 0) + 1 }));
  const decBundle = (id: string) => setBundleQtys(p => ({ ...p, [id]: Math.max(0, (p[id] ?? 0) - 1) }));

  // ── Price totals ──────────────────────────
  const menuTotal      = MENUS.reduce((s, m) => s + (menuQtys[m.id] ?? 0) * m.price, 0);
  const stehtischTotal = STEHTISCHE.reduce((s, st) => s + (stehtischQtys[st.id] ?? 0) * st.price, 0);
  const vipTotal       = vipSilverQty * 19 + vipGoldQty * 10;
  const parkingTotal   = parkingQty * 15;
  const flexTotal      = flexQty * 10;
  const bundleTotal    = VIP_BUNDLES.reduce((s, b) => s + (bundleQtys[b.id] ?? 0) * b.price, 0);
  const total          = seatPrice * qty + menuTotal + stehtischTotal + vipTotal + parkingTotal + flexTotal + bundleTotal;

  // German-style price formatter
  const fmt = (n: number) => n % 1 === 0 ? `${n}` : n.toFixed(2).replace(".", ",");

  // ── Flow control ──────────────────────────
  const canProceed = (() => {
    if (step === 1) return selectedShowId !== "" && selectedDateId !== null && selectedTimeId !== null;
    if (step === 2) return selectedSeat !== "";
    return true;
  })();

  const advance = () => {
    if (step < 6) setStep(s => s + 1);
    else setConfirmed(true);
  };

  const nextStep = () => {
    // Schritt 3: dezenter Magic-Menü-Hinweis (gleichwertige Buttons, kein Dark Pattern)
    if (step === 3 && totalMenuQty === 0 && !menuPromptShown) {
      setMenuPromptShown(true);
      setActivePrompt("menu");
      return;
    }
    // Schritt 4: dezente Ticket-Schutz-Nachfrage (nur einmal)
    if (step === 4 && flexQty === 0 && !securePromptShown) {
      setSecurePromptShown(true);
      setActivePrompt("secure");
      return;
    }
    advance();
  };

  const dotClass  = (n: number) => `step-dot${step === n ? " active" : step > n ? " done" : ""}`;
  const lineClass = (n: number) => `step-line${step > n ? " done" : ""}`;

  // ── Render ───────────────────────────────
  return (
    <div className="modal-overlay active" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        {/* ── Conversion-Nudge: Menü / Ticket-Schutz ── */}
        {activePrompt && (
          <div className="nudge-overlay">
            <div className="nudge-card">
              {activePrompt === "menu" ? (
                <>
                  <span className="nudge-eyebrow">✦ Magic Menü</span>
                  <h3>Ohne Magic Menü weitermachen?</h3>
                  <p>Viele Gäste machen ihren Theaterbesuch mit dem Magic Menü zu einem kompletten Abend.</p>
                  <div className="nudge-actions">
                    <button className="nudge-btn-primary" onClick={() => { setActivePrompt(null); setShowMenuCards(true); }}>Magic Menü hinzufügen</button>
                    <button className="nudge-btn-secondary" onClick={() => { setActivePrompt(null); advance(); }}>Nur Show buchen</button>
                  </div>
                </>
              ) : (
                <>
                  <span className="nudge-eyebrow">✦ Flex-Option</span>
                  <h3>Wirklich ohne Ticket-Schutz?</h3>
                  <p>Mit der Flex-Option bleibst du flexibel, falls kurzfristig etwas dazwischenkommt — du kannst dein Ticket bis zu 48 h vor der Veranstaltung kostenfrei auf einen Gutschein umbuchen. Pro Flex-Option ist ein Gast inkl. aller Zusatzleistungen wie Magic-Menü abgesichert.</p>
                  <div className="nudge-actions">
                    <button className="nudge-btn-primary" onClick={() => setActivePrompt(null)}>Ticket-Schutz hinzufügen</button>
                    <button className="nudge-btn-secondary" onClick={() => { setActivePrompt(null); advance(); }}>Ohne Ticket-Schutz fortfahren</button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* ── Show Image Banner ── */}
        {resolvedShow && (
          <div className="modal-show-banner" style={{ backgroundImage: `url('${resolvedShow.image}')` }}>
            <div className="modal-show-banner-overlay" />
            <div className="modal-show-banner-content">
              {resolvedShow.badge && (
                <span className="show-list-badge" style={{ background: resolvedShow.badgeColor }}>{resolvedShow.badge}</span>
              )}
              <span className="modal-show-banner-name">{resolvedShow.name}</span>
            </div>
          </div>
        )}

        <button className="modal-close" style={resolvedShow ? { top: 10, right: 12 } : {}} onClick={onClose}>✕</button>

        {/* ── Header ── */}
        <div className="modal-header">
          <h2>Jetzt buchen</h2>
          <div className="step-indicator">
            {[1, 2, 3, 4, 5, 6].map((n, i) => (
              <Fragment key={n}>
                <div className={dotClass(n)}>{step > n ? "✓" : n}</div>
                {i < 5 && <div className={lineClass(n)} />}
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

          {/* ══════ CONFIRMED SUCCESS STATE ══════ */}
          {confirmed && (
            <div className="modal-success">
              <div className="modal-success-icon">✦</div>
              <h2>Dein Abend ist gesichert.</h2>
              <p>Du erhältst in Kürze eine Buchungsbestätigung per E-Mail.<br />Wir freuen uns auf dich.</p>
              <div className="modal-success-details">
                <span>{resolvedShow?.name ?? "Deine Show"}</span>
                <span>{resolvedDate?.displayDate ?? ""}{resolvedTime ? ` · ${resolvedTime.time} Uhr` : ""}</span>
              </div>
              <button className="btn-primary" onClick={onClose} style={{ margin: "0 auto", display: "flex" }}>
                Zurück zur Übersicht
              </button>
            </div>
          )}

          {!confirmed && <>

          {/* ══════════════════════════════════════
              STEP 1 — Show & Termin
          ══════════════════════════════════════ */}
          {step === 1 && (
            <div>
              {/* Pre-selected show: collapsed header with "ändern" option */}
              {initialShow && !showAllShows ? (
                <div className="preselected-show">
                  <div className="preselected-show-img" style={{ backgroundImage: `url('${resolvedShow?.image}')` }} />
                  <div className="preselected-show-info">
                    {resolvedShow?.badge && <span className="show-list-badge" style={{ background: resolvedShow.badgeColor, marginBottom: 4, display: "inline-block" }}>{resolvedShow.badge}</span>}
                    <h4 className="preselected-show-name">{resolvedShow?.name}</h4>
                    <div className="preselected-show-meta">
                      <span>{resolvedShow?.duration}</span>
                      <span>·</span>
                      <span>{resolvedShow?.price}</span>
                    </div>
                  </div>
                  <button className="change-show-btn" onClick={() => setShowAllShows(true)}>ändern</button>
                </div>
              ) : (
                <>
                  <p className="step-hint">Wähle deine Show</p>
                  <div className="show-list">
                    {SHOWS.map(show => (
                      <div
                        key={show.id}
                        className={`show-list-card${selectedShowId === show.id ? " selected" : ""}`}
                        onClick={() => handleSelectShow(show.id)}
                      >
                        <div className="show-list-img" style={{ backgroundImage: `url('${show.image}')` }} />
                        <div className="show-list-info">
                          <div className="show-list-meta">
                            {show.badge && (
                              <span className="show-list-badge" style={{ background: show.badgeColor }}>{show.badge}</span>
                            )}
                            <span className="show-list-duration">{show.duration}</span>
                            <span className="show-list-price">{show.price}</span>
                          </div>
                          <h4 className="show-list-name">{show.name}</h4>
                          <p className="show-list-desc">{show.desc}</p>
                        </div>
                        <div className={`show-list-check${selectedShowId === show.id ? " visible" : ""}`}>✓</div>
                      </div>
                    ))}
                  </div>
                </>
              )}

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
                            {d.low && !d.soldOut && <span className="date-card-avail-warn">Wenige Plätze</span>}
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
              STEP 2 — Plätze
          ══════════════════════════════════════ */}
          {step === 2 && (
            <div>
              <p className="step-hint-premium">
                Wähle deinen Lieblingsplatz und erlebe Magie hautnah.
              </p>
              <div className="seatmap-hint">
                Goldene Sitze sind die ersten Reihen direkt vor der Bühne.
              </div>

              <div className="seatmap">
                <div className="seatmap-stage">
                  <div className="seatmap-stage-label">✦ &nbsp;BÜHNE &nbsp;✦</div>
                  <div className="seatmap-stage-sub">FLORIAN ZIMMER THEATER</div>
                </div>
                {SEAT_ZONES.map(zone => {
                  const cfg     = ZONE_ROWS[zone.id];
                  const dotCls  = zone.id === "front-row" ? "golden-dot"  : zone.id === "premium" ? "premium-dot" : "standard-dot";
                  const zoneCls = zone.id === "front-row" ? "golden-zone" : zone.id === "premium" ? "premium-zone" : "standard-zone";
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
                <div className="seatmap-loge-row">
                  <div className="loge-box" onClick={() => setLogeInfoOpen(v => !v)}>
                    <div className="loge-box-title">VIP Loge</div>
                    <div className="loge-box-price">ab 599 €</div>
                    <div className="loge-box-cta">anfragen →</div>
                  </div>
                  <div className="seatmap-loge-center">EINGANG · AUSGANG</div>
                  <div className="loge-box" onClick={() => setLogeInfoOpen(v => !v)}>
                    <div className="loge-box-title">VIP Loge</div>
                    <div className="loge-box-price">ab 599 €</div>
                    <div className="loge-box-cta">anfragen →</div>
                  </div>
                </div>
              </div>

              {logeInfoOpen && (
                <div className="loge-inquiry-panel">
                  <button className="loge-box-close" onClick={() => setLogeInfoOpen(false)}>schließen ✕</button>
                  <h5>VIP-Loge anfragen</h5>
                  <p>Privater Bereich für bis zu 8 Personen — ab 599 €.<br />
                    Ruf uns an: <a href="tel:+497317906110">0731 7906 110</a><br />
                    oder: <a href="mailto:loge@florianzimmertheater.de">loge@florianzimmertheater.de</a>
                  </p>
                  {onLogeInquiry && (
                    <button className="mc-hero-cta" style={{ marginTop: 12, fontSize: 13 }} onClick={onLogeInquiry}>
                      Anfrage-Formular öffnen →
                    </button>
                  )}
                </div>
              )}

              <div style={{ display: "flex", gap: 20, margin: "14px 0 4px", fontSize: 11, color: "var(--muted)" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ width: 13, height: 9, borderRadius: "2px 2px 0 0", background: "var(--gold)", display: "inline-block" }} /> verfügbar
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ width: 13, height: 9, borderRadius: "2px 2px 0 0", background: "rgba(201,168,76,0.18)", display: "inline-block" }} /> belegt
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
              STEP 3 — Magicuisine
          ══════════════════════════════════════ */}
          {step === 3 && (
            <div>
              {menubeginn && (
                <div className="menubeginn-badge">
                  <span className="menubeginn-dot" />
                  {menubeginn}
                </div>
              )}

              {!showMenuCards ? (
                /* ── Hero: Erlebnis verkaufen ── */
                <div className="mc-hero">
                  <div className="mc-hero-img-wrap">
                    <img
                      src="https://tourismus.ulm.de/_thumbnails/9420_16_00_magiccuisine.jpg"
                      alt="Magicuisine Restaurant Ambiente"
                      className="mc-hero-img"
                    />
                    <div className="mc-hero-img-overlay" />
                    <span className="mc-hero-img-badge">⭐ Beliebteste Zusatzbuchung</span>
                  </div>

                  <div className="mc-hero-body">
                    <h3 className="mc-hero-headline">
                      Die meisten Gäste ergänzen ihren Theaterabend mit einem Magic-Menü.
                    </h3>
                    <p className="mc-hero-text">
                      Beginne deinen Abend entspannt mit einem exklusiven 4-Gang-Menü
                      inklusive Welcome-Cocktail in der Magicuisine.
                    </p>

                    <ul className="mc-hero-benefits">
                      <li><span className="mc-benefit-icon">🍷</span>Welcome-Cocktail inklusive</li>
                      <li><span className="mc-benefit-icon">🍽️</span>Classic, Sea oder Vegan zur Auswahl</li>
                      <li><span className="mc-benefit-icon">✨</span>Direkt vor der Show genießen</li>
                      <li><span className="mc-benefit-icon">❤️</span>Besonders beliebt bei Paaren</li>
                    </ul>

                    <div className="mc-hero-price-row">
                      <span className="mc-hero-price-label">ab</span>
                      <span className="mc-hero-price">69 €</span>
                      <span className="mc-hero-price-per">pro Person</span>
                    </div>

                    <button
                      className="mc-hero-cta"
                      onClick={() => setShowMenuCards(true)}
                    >
                      Menü auswählen
                    </button>

                    <button
                      className="mc-hero-skip"
                      onClick={() => setStep(s => s + 1)}
                    >
                      Ohne Menü fortfahren
                    </button>
                  </div>
                </div>
              ) : (
                /* ── Menüauswahl ── */
                <div>
                  <div className="menu-select-intro">
                    <h3>Die beliebteste Art, Magie zu erleben</h3>
                    <p>Die meisten Gäste beginnen ihren Abend mit dem Magic Menü und genießen anschließend die Show.</p>
                  </div>
                  {/* Bestätigung + Rückgabe-Link */}
                  <div className="mc-confirmed-bar">
                    <div className="mc-confirmed-left">
                      <span className="mc-confirmed-check">✦</span>
                      <span className="mc-confirmed-label">Magic Dinner Erlebnis</span>
                    </div>
                    <button
                      className="mc-confirmed-remove"
                      onClick={() => { setShowMenuCards(false); setMenuQtys({}); }}
                    >
                      entfernen
                    </button>
                  </div>

                  {/* Kapazitäts-Anzeige */}
                  {totalMenuQty > 0 && (
                    <div className="upsell-capacity-bar" style={{ marginBottom: 16 }}>
                      <span className="capacity-dot" />
                      <span>{totalMenuQty} von {qty} Menüplätzen belegt</span>
                      {totalMenuQty === qty && <span className="capacity-full">Alle vergeben</span>}
                    </div>
                  )}

                  {/* Menükarten */}
                  <div className="menu-cards">
                    {MENUS.map(menu => {
                      const mq         = menuQtys[menu.id] ?? 0;
                      const isActive   = mq > 0;
                      const isExpanded = expandedMenu === menu.id;
                      const canAdd     = totalMenuQty < qty;
                      return (
                        <div key={menu.id} className={`menu-card${isActive ? " selected" : ""}`}>
                          <div className="menu-card-inner">
                            {menu.badge && (
                              <span className="menu-badge" style={{ background: menu.badgeColor ?? "var(--gold)" }}>
                                {menu.badge}
                              </span>
                            )}
                            <div className="menu-card-body">
                              <div className="menu-card-main">
                                <h4 className="menu-card-name">{menu.name}</h4>
                                <p className="menu-card-tagline">{menu.tagline}</p>
                                <div className="menu-card-price-row">
                                  <span className="menu-card-price">{menu.price} €</span>
                                  <span className="menu-card-per">/ Pers.</span>
                                  <span className="menu-card-includes">{menu.includes}</span>
                                </div>
                              </div>
                            </div>

                            <div className="menu-qty-area">
                              <QtyControl
                                value={mq}
                                onDec={() => decMenu(menu.id)}
                                onInc={() => incMenu(menu.id)}
                                canInc={canAdd}
                              />
                            </div>

                            {isExpanded && (
                              <div className="menu-courses">
                                <div className="menu-courses-label">Menüfolge</div>
                                <ul className="menu-courses-list">
                                  {menu.courses.map((c, i) => <li key={i}>{c}</li>)}
                                </ul>
                              </div>
                            )}
                          </div>

                          <button
                            className="menu-expand-btn"
                            onClick={e => {
                              e.stopPropagation();
                              setExpandedMenu(isExpanded ? null : menu.id);
                            }}
                          >
                            <span>{isExpanded ? "Weniger anzeigen" : "Menü ansehen"}</span>
                            <span className={`menu-expand-chevron${isExpanded ? " open" : ""}`}>
                              <IconChevronDown size={13} />
                            </span>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ══════════════════════════════════════
              STEP 4 — Pause & VIP
          ══════════════════════════════════════ */}
          {step === 4 && (
            <div>
              <div className="step4-intro">
                <h3 className="step4-heading">Pause &amp; VIP</h3>
                <p className="step4-sub">Mach die Pause und das Rahmenprogramm zu deinem Highlight.</p>
              </div>

              {/* ── VIP Getränkeflat ── */}
              <div style={{ marginBottom: 28 }}>
                <div className="pause-section-header" style={{ marginBottom: 14 }}>
                  <h4 className="pause-section-title">VIP Getränkeflat</h4>
                  <p className="pause-section-sub">Unbegrenzte Getränke an der Magic-Bar – ab 1h vor der Show und in der Pause.</p>
                </div>

                <div className="extras4-list" style={{ marginBottom: 0 }}>
                  {/* Silver */}
                  <div className={`extras4-card${vipSilverQty > 0 ? " selected" : ""}`}>
                    <div className="extras4-icon">🍹</div>
                    <div className="extras4-info">
                      <div className="extras4-top">
                        <strong className="extras4-name">VIP Getränkeflat Silver</strong>
                        <span className="extras4-price-block">
                          <span className="extras4-unit-price-inline">19 €</span>
                          <span className="extras4-price-meta">/ Pers.</span>
                        </span>
                      </div>
                      <p className="extras4-desc">
                        Genieße ab 1 Stunde vor Showbeginn und in der Pause alle alkoholfreien Getränke
                        an der Magic-Bar im Foyer. Ein Kind bis 12 Jahre trinkt kostenlos mit.
                        Gültig ausschließlich an der Foyer-Bar, nicht im Restaurant Magicuisine.
                      </p>
                    </div>
                    <div className="extras4-qty-col">
                      <span className="extras4-unit-price" style={{ fontSize: 14 }}>{vipSilverQty > 0 ? `${vipSilverQty * 19} €` : ""}</span>
                      <QtyControl
                        value={vipSilverQty}
                        onDec={decVipSilver}
                        onInc={incVipSilver}
                        canInc={vipSilverQty < qty}
                      />
                    </div>
                  </div>

                  {/* Gold Upgrade — nur wenn Silver > 0 */}
                  {vipSilverQty > 0 && (
                    <div className={`extras4-card vip-gold-upgrade${vipGoldQty > 0 ? " selected" : ""}`}>
                      <div className="extras4-icon">✨</div>
                      <div className="extras4-info">
                        <div className="extras4-top">
                          <strong className="extras4-name">Gold Upgrade</strong>
                          <span className="extras4-price-block">
                            <span className="extras4-unit-price-inline" style={{ color: "var(--gold-light)" }}>+10 €</span>
                            <span className="extras4-price-meta">/ Pers.</span>
                          </span>
                        </div>
                        <p className="extras4-desc">
                          Upgrade auf GOLD: Zusätzlich Bier, Wein, Sekt und Magicuvée inklusive.
                        </p>
                        <span className="vip-gold-limit-note">
                          Max. {vipSilverQty} von {vipSilverQty} Silver-Bändchen upgradebare
                        </span>
                      </div>
                      <div className="extras4-qty-col">
                        <QtyControl
                          value={vipGoldQty}
                          onDec={decVipGold}
                          onInc={incVipGold}
                          canInc={vipGoldQty < vipSilverQty}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* ── Stehtische ── */}
              <div className="pause-section">
                {!showStehtischCards ? (
                  /* Hero: Stehtisch-Erlebnis verkaufen */
                  <div className="mc-hero">
                    <div className="mc-hero-img-wrap">
                      <img
                        src="https://tourismus.ulm.de/_thumbnails/9422_11_01_magiccuisine.jpg"
                        alt="Magicuisine Foyer Bar"
                        className="mc-hero-img"
                        style={{ objectPosition: "center 20%" }}
                      />
                      <div className="mc-hero-img-overlay" />
                      <span className="mc-hero-img-badge">✦ Kein Anstehen in der Pause</span>
                    </div>

                    <div className="mc-hero-body">
                      <h3 className="mc-hero-headline">
                        Dein reservierter Platz wartet bereits.
                      </h3>
                      <p className="mc-hero-text">
                        Kein Gedränge, kein Suchen — genieße die Showpause entspannt
                        mit Getränken und Snacks an deinem eigenen Stehtisch im Foyer.
                      </p>

                      <ul className="mc-hero-benefits">
                        <li><span className="mc-benefit-icon">🥂</span>Reservierter Platz garantiert</li>
                        <li><span className="mc-benefit-icon">🍿</span>Getränke &amp; Snacks inklusive</li>
                        <li><span className="mc-benefit-icon">✨</span>Kein Anstehen, kein Warten</li>
                        <li><span className="mc-benefit-icon">🎭</span>Direkt im Foyer des Theaters</li>
                      </ul>

                      <div className="mc-hero-price-row">
                        <span className="mc-hero-price-label">ab</span>
                        <span className="mc-hero-price">17,50 €</span>
                        <span className="mc-hero-price-per">pro Person</span>
                      </div>

                      <button
                        className="mc-hero-cta"
                        onClick={() => setShowStehtischCards(true)}
                      >
                        Stehtisch auswählen
                      </button>

                      <button
                        className="mc-hero-skip"
                        onClick={() => setShowStehtischCards(true)}
                        style={{ display: "none" }}
                      >
                        {/* intentionally hidden — Stehtisch ist optional, einfach nicht buchen */}
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Stehtisch-Karten */
                  <>
                    <div className="mc-confirmed-bar" style={{ marginBottom: 18 }}>
                      <div className="mc-confirmed-left">
                        <span className="mc-confirmed-check">✦</span>
                        <span className="mc-confirmed-label">Stehtisch in der Pause</span>
                      </div>
                      <button
                        className="mc-confirmed-remove"
                        onClick={() => { setShowStehtischCards(false); setStehtischQtys({}); }}
                      >
                        entfernen
                      </button>
                    </div>

                    {stehtischPersonsUsed > 0 && (
                      <div className="upsell-capacity-bar" style={{ marginBottom: 14 }}>
                        <span className="capacity-dot" />
                        <span>{stehtischPersonsUsed} von {qty} Personen versorgt</span>
                        {stehtischPersonsUsed === qty && <span className="capacity-full">Alle versorgt</span>}
                      </div>
                    )}

                    <div className="stehtisch-cards">
                      {STEHTISCHE.map(st => {
                        const sq       = stehtischQtys[st.id] ?? 0;
                        const isActive = sq > 0;
                        const canAdd   = canIncStehtisch(st.personsPerUnit);
                        return (
                          <div
                            key={st.id}
                            className={`stehtisch-card${st.highlight ? " gold-highlight" : ""}${st.luxury ? " diamond-highlight" : ""}${isActive ? " selected" : ""}`}
                          >
                            {st.badge && (
                              <span className={`stehtisch-badge${st.highlight ? " gold-badge" : ""}${st.luxury ? " diamond-badge" : ""}`}>
                                {st.badge}
                              </span>
                            )}
                            <div className="stehtisch-top">
                              <h5 className="stehtisch-name">{st.name}</h5>
                              <span className="stehtisch-price">{st.priceLabel}</span>
                            </div>
                            {st.personsPerUnit === 2 && (
                              <span className="stehtisch-for-two">Für 2 Personen</span>
                            )}
                            {st.personsPerUnit === 1 && (
                              <span className="stehtisch-per-person">Pro Person</span>
                            )}
                            <p className="stehtisch-subtitle">{st.subtitle}</p>
                            <ul className="stehtisch-items">
                              {st.items.map((item, i) => <li key={i}>{item}</li>)}
                            </ul>
                            <div className="stehtisch-qty-area">
                              <QtyControl
                                value={sq}
                                onDec={() => decStehtisch(st.id)}
                                onInc={() => incStehtisch(st.id, st.personsPerUnit)}
                                canInc={canAdd}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>

              {/* ── VIP Parkplatz & Flex ── */}
              <div className="extras4-list" style={{ marginTop: 28 }}>
                <div className={`extras4-card${parkingQty > 0 ? " selected" : ""}`}>
                  <div className="extras4-icon">🚗</div>
                  <div className="extras4-info">
                    <strong className="extras4-name">VIP Parkplatz</strong>
                    <p className="extras4-desc">Direkt neben dem Theater – näher dran geht nicht.</p>
                    <span className="extras4-scarcity">
                      <span className="scarcity-dot" style={{ background: "#E74C3C" }} />
                      Nur 7 verfügbar
                    </span>
                  </div>
                  <div className="extras4-qty-col">
                    <span className="extras4-unit-price">15 €</span>
                    <QtyControl
                      value={parkingQty}
                      onDec={decParking}
                      onInc={incParking}
                      canInc={parkingQty < 7}
                    />
                  </div>
                </div>

                <div className={`extras4-card${flexQty > 0 ? " selected" : ""}`}>
                  <div className="extras4-icon">🔄</div>
                  <div className="extras4-info">
                    <div className="extras4-top">
                      <strong className="extras4-name">Flex-Option</strong>
                      <span className="extras4-price-block">
                        <span className="extras4-unit-price-inline">10 €</span>
                        <span className="extras4-price-meta">/ Gast</span>
                      </span>
                    </div>
                    <p className="extras4-desc">
                      Mit der Flex-Option kannst du dein Ticket bis zu 48h vor Veranstaltungsbeginn
                      kostenfrei auf einen Ticketgutschein umbuchen. Pro Flex-Option ist je ein Gast
                      inkl. aller Zusatzleistungen wie Magic-Menü, etc. abgesichert.
                    </p>
                    <span className="extras4-note" style={{ color: "var(--muted)" }}>
                      inkl. MwSt &amp; VVK-Gebühren · max. {qty} (Anzahl Tickets)
                    </span>
                  </div>
                  <div className="extras4-qty-col">
                    <span className="extras4-unit-price">{flexQty > 0 ? `${flexTotal} €` : ""}</span>
                    <QtyControl
                      value={flexQty}
                      onDec={decFlex}
                      onInc={incFlex}
                      canInc={flexQty < qty}
                    />
                  </div>
                </div>
              </div>

              <div className="florian-note">
                <span className="florian-note-icon">📸</span>
                <p>Nach der Show nimmt sich Florian Zimmer gerne Zeit für persönliche Fotos mit den Gästen.</p>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════
              STEP 5 — Magie für Zuhause
          ══════════════════════════════════════ */}
          {step === 5 && (
            <div>
              <div className="step4-intro">
                <h3 className="step4-heading">Magie für Zuhause</h3>
                <p className="step4-sub">Unvergessliche Erinnerungen zum Mitnehmen.</p>
              </div>

              <div className="extras4-list">
                {VIP_BUNDLES.map(bundle => {
                  const bq = bundleQtys[bundle.id] ?? 0;
                  return (
                    <div key={bundle.id} className={`extras4-card${bq > 0 ? " selected" : ""}`}>
                      <div className="extras4-icon">🎁</div>
                      <div className="extras4-info">
                        <div className="extras4-top">
                          <div>
                            {bundle.badge && (
                              <span
                                className="menu-badge"
                                style={{ background: bundle.badgeColor, display: "inline-flex", marginBottom: 4 }}
                              >
                                {bundle.badge}
                              </span>
                            )}
                            <strong className="extras4-name" style={{ display: "block" }}>{bundle.name}</strong>
                          </div>
                          <span className="extras4-price-block">
                            <span className="extras4-unit-price-inline">{bundle.price} €</span>
                          </span>
                        </div>
                        <p className="extras4-desc">{bundle.desc}</p>
                        <ul className="stehtisch-items" style={{ marginTop: 4 }}>
                          {bundle.items.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                        <div className="bundle-pickup">
                          <span className="bundle-pickup-icon">🎁</span>
                          {bundle.pickup}
                        </div>
                      </div>
                      <div className="extras4-qty-col" style={{ alignSelf: "center" }}>
                        <QtyControl
                          value={bq}
                          onDec={() => decBundle(bundle.id)}
                          onInc={() => incBundle(bundle.id)}
                          canInc={true}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════
              STEP 6 — Checkout
          ══════════════════════════════════════ */}
          {step === 6 && (
            <div>
              <div className="order-summary">
                {/* Show + Date */}
                <div className="order-row" style={{ flexDirection: "column", gap: 2, alignItems: "flex-start" }}>
                  <span style={{ fontWeight: 600 }}>{resolvedShow?.name ?? "Show"}</span>
                  <span style={{ fontSize: 12, color: "var(--muted)" }}>
                    {resolvedDate?.displayDate ?? ""}{resolvedTime ? ` · ${resolvedTime.time} Uhr` : ""}
                  </span>
                </div>
                {/* Seats */}
                <div className="order-row">
                  <span>
                    {qty} × {selectedSeat === "front-row" ? "Front Row VIP" : selectedSeat === "premium" ? "Premium" : "Parterre"}
                  </span>
                  <span>{seatPrice * qty} €</span>
                </div>
                {/* Menus */}
                {MENUS.map(m => {
                  const mq = menuQtys[m.id] ?? 0;
                  return mq > 0 ? (
                    <div key={m.id} className="order-row">
                      <span>{mq} × {m.name}</span>
                      <span>{mq * m.price} €</span>
                    </div>
                  ) : null;
                })}
                {/* Stehtische */}
                {STEHTISCHE.map(st => {
                  const sq = stehtischQtys[st.id] ?? 0;
                  return sq > 0 ? (
                    <div key={st.id} className="order-row">
                      <span>{sq} × {st.name}</span>
                      <span>{fmt(sq * st.price)} €</span>
                    </div>
                  ) : null;
                })}
                {/* VIP Getränkeflat */}
                {vipSilverQty > 0 && (
                  <div className="order-row">
                    <span>{vipSilverQty} × VIP Getränkeflat Silver</span>
                    <span>{vipSilverQty * 19} €</span>
                  </div>
                )}
                {vipGoldQty > 0 && (
                  <div className="order-row">
                    <span>{vipGoldQty} × Gold Upgrade</span>
                    <span>{vipGoldQty * 10} €</span>
                  </div>
                )}
                {/* Parking */}
                {parkingQty > 0 && (
                  <div className="order-row">
                    <span>{parkingQty} × VIP Parkplatz</span>
                    <span>{parkingTotal} €</span>
                  </div>
                )}
                {/* Flex */}
                {flexQty > 0 && (
                  <div className="order-row">
                    <span>{flexQty} × Flex-Option</span>
                    <span>{flexTotal} €</span>
                  </div>
                )}
                {/* Bundles */}
                {VIP_BUNDLES.map(b => {
                  const bq = bundleQtys[b.id] ?? 0;
                  return bq > 0 ? (
                    <div key={b.id} className="order-row">
                      <span>{bq} × {b.name}</span>
                      <span>{bq * b.price} €</span>
                    </div>
                  ) : null;
                })}
                <div className="order-row total">
                  <span>Gesamtbetrag</span>
                  <span>{fmt(total)} €</span>
                </div>
              </div>

              {/* Souvenirglas — Rückkehr über Magic-Mail (1 Glas pro Ticket) */}
              {souvenir && (
                <div className="souvenir-cart-card">
                  <div className="souvenir-cart-head">
                    <strong>🎁 {qty} × Florian Zimmer Theater Souvenirglas</strong>
                    <span className="souvenir-cart-price">0,00 €</span>
                  </div>
                  <p>Zu jedem Ticket schenken wir dir ein exklusives Florian Zimmer Theater Souvenirglas. Dieses Erinnerungsstück erhältst du ausschließlich im Florian Zimmer Theater.</p>
                  <ul className="souvenir-cart-list">
                    <li>Darf mit in die Show genommen werden</li>
                    <li>Perfekt für Erinnerungsfotos</li>
                    <li>Spülmaschinenfest und langlebig</li>
                    <li>Nimm die Magic mit</li>
                  </ul>
                </div>
              )}

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

          </>}
        </div>

        {/* ── Footer ── */}
        {!confirmed && (
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
              {step === 6 ? "Jetzt buchen ✦" : "Weiter →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
