"use client";

import { useEffect, useState } from "react";

// ─────────────────────────────────────────────
//  SHOW-DETAIL-EBENE
//  Klick auf Show-Kachel → Trailer + Beschreibung
//  → erst dann CTA in den Buchungsfunnel.
//  Texte als Platzhalter; Julian zieht sie später
//  aus SHOW_META / Ditix-Event-Beschreibung.
// ─────────────────────────────────────────────

interface ShowDetailData {
  name: string;
  badge?: string;
  badgeColor?: string;
  image: string;
  imagePos?: string;
  trailerId?: string;        // optional — wenn leer, wird das Bild gezeigt
  tagline: string;
  paragraphs: string[];
  quote?: { text: string; source: string };
  facts: string[];
  price: string;
}

export const SHOW_DETAILS: Record<string, ShowDetailData> = {
  ulmfassbar: {
    name: "ULMFASSBAR",
    badge: "★ Bestseller",
    badgeColor: "var(--gold)",
    image: "/images/show-atmosphere.jpg",
    imagePos: "center top",
    trailerId: "RvWYpFJmvkM",
    tagline: "Deutschlands spektakulärste Magic Show.",
    paragraphs: [
      "Florian Zimmer — vom »kreativsten Magier der Welt« (Markus Lanz) — präsentiert ein magisches Erlebnis der Superlative: spektakuläre Großillusionen, faszinierende Close-up-Magie direkt vor deinen Augen, atemberaubende Spezialeffekte, Humor, Emotionen und Momente, die für immer bleiben.",
      "Erlebe die legendäre Todeskralle, eine geheimnisvolle Zeitmaschine und den Augenblick, in dem Florian Zimmer scheinbar schwerelos über die Köpfe des Publikums hinwegschwebt.",
      "ULMFASSBAR vereint alles, was große Unterhaltung ausmacht: Staunen, Nervenkitzel, Lachen, Überraschungen und echte Gänsehautmomente — eine Show voller Wunder, die Generationen begeistert.",
      "Wenn du nur eine Magieshow in deinem Leben besuchst — dann diese.",
    ],
    quote: { text: "Wahnsinn! Beifallsstürme! Standing Ovations!", source: "Südwest Presse" },
    facts: [
      "Dauer ca. 2,5 Stunden",
      "Altersempfehlung ab 6 Jahren",
      "Hauseigener Parkplatz direkt am Theater — kostenlos (begrenzte Anzahl)",
    ],
    price: "ab 49 €",
  },
  "magic-memories": {
    name: "Magic Memories",
    badge: "✦ Neue Show",
    badgeColor: "linear-gradient(135deg,#C9A84C,#8B6914)",
    image: "/images/show-magic-dinner.jpg",
    imagePos: "center 20%",
    trailerId: "",
    tagline: "Florian Zimmers brandneue Show — und vielleicht seine persönlichste.",
    paragraphs: [
      "Florian Zimmer erschafft Bilder, die sich in den Köpfen der Menschen festsetzen. Momente, die man nicht erklären kann. Augenblicke, die etwas in einem auslösen.",
      "Mit Magic Memories nimmt Florian sein Publikum mit auf eine Reise durch Staunen, Erinnerung und Träume — eine Show darüber, was passiert, wenn man wieder anfängt, an das Unmögliche zu glauben.",
      "Brandneue Illusionen, große Bühnenmomente und persönliche Geschichten verschmelzen zu einem Abend, der berührt, inspiriert und Erinnerungen schafft, die ein Leben lang bleiben.",
      "Du gehst aus dieser Show anders heraus, als du hineingegangen bist. Mit mehr Staunen. Mehr Mut. Mehr Lust auf das eigene Leben.",
      "Denn manchmal braucht es nur einen einzigen Moment, um einen Traum wieder wachzurufen.",
      "Magic Memories ist eine Show für alle, die sich nach einem Abend sehnen, der nicht nur begeistert — sondern etwas in ihnen entfesselt.",
    ],
    quote: { text: "New magic. New memories.", source: "Florian Zimmer Theater" },
    facts: [
      "Dauer ca. 2,5 Stunden",
      "Altersempfehlung ab 6 Jahren",
      "Hauseigener Parkplatz direkt am Theater — kostenlos (begrenzte Anzahl)",
    ],
    price: "ab 49 €",
  },
  "flo-zirkus": {
    name: "Flo-Zirkus",
    badge: "Kindershow",
    badgeColor: "#3a7fd0",
    image: "/images/flo-zirkus-neu.png",
    imagePos: "center 20%",
    trailerId: "lyn08-Lqlps",
    tagline: "Tauch ein in die zauberhafte Welt von Waschbär Willi und seinen Freunden.",
    paragraphs: [
      "Willi liest Gedanken, ein unsichtbares Gespenst sorgt für Abenteuer — und im »Zimmer der Wunder« wird gestaunt, gelacht und kräftig mitgemacht. Die Kinder werden aktiv Teil der Magie.",
      "Manchmal wird es richtig laut, wenn alle gleichzeitig schreien, weil Willi wieder heimlich schummelt. Ein fantastischer Nachmittag für die kleinen Großen — gemeinsam mit Mama, Papa oder Begleitung.",
    ],
    facts: [
      "Dauer ca. 50 Minuten",
      "Altersempfehlung ab 0 Jahren",
      "Kinder von 0–3 Jahren kostenlos (auf dem Schoß der Eltern)",
      "Hauseigener Parkplatz direkt am Theater — kostenlos (begrenzte Anzahl)",
    ],
    price: "ab 29 €",
  },
  "magic-dinner": {
    name: "Magic Dinner",
    badge: "♥ Dinner & Magie",
    badgeColor: "linear-gradient(135deg,#C9A84C,#8B6914)",
    image: "/images/magic-dinner-neu2.png",
    imagePos: "center top",
    trailerId: "OVk3MdjTasc",
    tagline: "Magie in ihrer intimsten Form — an ausgewählten Terminen.",
    paragraphs: [
      "Auf der Event-Galerie serviert dir unser Magicuisine-Team ein feines 4-Gänge-Menü — und zwischen den Gängen verzaubert dich Florian Zimmer. Die Illusionen passieren direkt vor deinen Augen und sogar in deinen Händen.",
      "Der perfekte Abend für ein romantisches Dinner oder eine kleine Feier. Die Teilnehmerzahl ist bewusst begrenzt — für eine Nähe, die man sonst nirgends erlebt.",
    ],
    facts: [
      "Dauer ca. 3,5 Stunden · inkl. Aperitif",
      "Deluxe: inkl. aller Getränke außer Champagner",
      "Hauseigener Parkplatz direkt am Theater — kostenlos (begrenzte Anzahl)",
    ],
    price: "ab 129 €",
  },
};

interface ShowDetailProps {
  showKey: string | null;
  onClose: () => void;
  onBook: (key: string) => void;
}

export default function ShowDetail({ showKey, onClose, onBook }: ShowDetailProps) {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (showKey) { setPlaying(false); document.body.style.overflow = "hidden"; }
    return () => { document.body.style.overflow = ""; };
  }, [showKey]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!showKey) return null;
  const d = SHOW_DETAILS[showKey];
  if (!d) return null;

  return (
    <div className="sd-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="sd-modal">
        <button className="sd-close" onClick={onClose} aria-label="Schließen">✕</button>

        {/* Trailer oder Bild */}
        <div className="sd-media">
          {d.trailerId && playing ? (
            <div className="yt-no-logo" style={{ width: "100%", height: "100%" }}>
              <iframe
                src={`https://www.youtube.com/embed/${d.trailerId}?autoplay=1&rel=0&modestbranding=1&iv_load_policy=3`}
                title={`${d.name} Trailer`}
                allowFullScreen
                allow="autoplay; fullscreen"
              />
            </div>
          ) : (
            <div
              className={`sd-media-poster${d.trailerId ? " playable" : ""}`}
              style={{ backgroundImage: `url('${d.image}')`, backgroundPosition: d.imagePos ?? "center" }}
              onClick={() => d.trailerId && setPlaying(true)}
              role={d.trailerId ? "button" : undefined}
              tabIndex={d.trailerId ? 0 : undefined}
              onKeyDown={e => d.trailerId && e.key === "Enter" && setPlaying(true)}
            >
              <div className="sd-media-overlay" />
              {d.badge && <span className="sd-badge" style={{ background: d.badgeColor }}>{d.badge}</span>}
              {d.trailerId && (
                <div className="sd-play">
                  <div className="sd-play-btn">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26" style={{ marginLeft: 4 }}>
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <span className="sd-play-label">Trailer ansehen</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Inhalt */}
        <div className="sd-body">
          <h2 className="sd-name">{d.name}</h2>
          <p className="sd-tagline">{d.tagline}</p>
          {d.paragraphs.map((p, i) => <p key={i} className="sd-para">{p}</p>)}

          {d.quote && (
            <blockquote className="sd-quote">
              <span className="sd-quote-text">»{d.quote.text}«</span>
              <span className="sd-quote-source">{d.quote.source}</span>
            </blockquote>
          )}

          <ul className="sd-facts">
            {d.facts.map((f, i) => <li key={i}>{f}</li>)}
          </ul>

          <div className="sd-cta-row">
            <span className="sd-price">{d.price}</span>
            <button className="btn-primary" onClick={() => onBook(showKey)}>✦ &nbsp;Tickets sichern</button>
          </div>
        </div>
      </div>
    </div>
  );
}
