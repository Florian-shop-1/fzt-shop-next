"use client";

import { useEffect } from "react";
import Link from "next/link";

// ─────────────────────────────────────────────
//  BERATUNGSTERMIN — fokussierte Landingpage
//  Ziel: ein einziges Conversion-Event (Termin via Calendly).
//  Bewusst schlanke Navigation, ein CTA, Slot-Picker above the fold.
// ─────────────────────────────────────────────

const CALENDLY_URL =
  "https://calendly.com/florian-zimmer-theater/info" +
  "?hide_gdpr_banner=1&background_color=12100d&text_color=f5f0e6&primary_color=c9a84c";

export default function BeratungPage() {
  // Calendly-Widget-Skript laden
  useEffect(() => {
    const id = "calendly-widget-script";
    if (document.getElementById(id)) return;
    const s = document.createElement("script");
    s.id = id;
    s.src = "https://assets.calendly.com/assets/external/widget.js";
    s.async = true;
    document.body.appendChild(s);
  }, []);

  return (
    <main className="beratung-page">
      {/* schlanke Kopfzeile — bewusst ohne volle Navigation */}
      <header className="beratung-topbar">
        <Link href="/" className="beratung-logo">
          <img src="/images/logo.png" alt="Florian Zimmer Theater" />
        </Link>
        <Link href="/" className="beratung-back">← Zurück zur Seite</Link>
      </header>

      {/* HERO: links Nutzen + Vertrauen, rechts Termin */}
      <section className="beratung-hero">
        <div className="beratung-hero-left">
          <span className="beratung-eyebrow">✦ Persönliche Beratung</span>
          <h1>Plant ihr etwas Besonderes?<br />Lass uns kurz sprechen.</h1>
          <p className="beratung-lead">
            15 Minuten, kostenlos und unverbindlich. Wir finden gemeinsam den perfekten
            Rahmen für deinen Anlass — von der passenden Show über das Magic Menü bis zur
            exklusiven Buchung des ganzen Theaters.
          </p>

          <ul className="beratung-trust">
            <li><strong>100.000+</strong> begeisterte Gäste seit 2022</li>
            <li><strong>Bayern barrierefrei</strong> — vom Freistaat ausgezeichnet</li>
            <li><strong>Top-Bewertungen</strong> auf Google &amp; TripAdvisor</li>
          </ul>

          <div className="beratung-person">
            <img src="/images/Florian-freigestellt.webp" alt="Florian Zimmer" />
            <div>
              <strong>Florian Zimmer</strong>
              <span>Starmagier &amp; Gastgeber</span>
            </div>
          </div>
        </div>

        <div className="beratung-hero-right">
          <div
            className="calendly-inline-widget beratung-calendly"
            data-url={CALENDLY_URL}
          />
          <p className="beratung-cta-note">Kostenlos · unverbindlich · kein Verkaufsdruck</p>
        </div>
      </section>

      {/* Für wen lohnt sich das Gespräch */}
      <section className="beratung-section">
        <h2>Wofür sich das Gespräch besonders lohnt</h2>
        <div className="beratung-usecases">
          {[
            { icon: "🎉", t: "Firmen- & Weihnachtsfeiern", d: "Show, Dinner, Bar & Betreuung unter einem Dach." },
            { icon: "💍", t: "Hochzeiten & Jubiläen", d: "Ein Abend, über den deine Gäste noch lange sprechen." },
            { icon: "👥", t: "Gruppen ab 10 Personen", d: "Reservierte Plätze, optional Menü & Stehtisch." },
            { icon: "✦", t: "Exklusivbuchung", d: "Das ganze Theater nur für euch — ab 100 Gästen." },
            { icon: "🎁", t: "Geschenke & Ticketpakete", d: "Tickets in größerer Stückzahl — persönlich, hochwertig, steuerlich interessant." },
            { icon: "❓", t: "Du bist unsicher?", d: "Wir beraten dich ehrlich, welche Show am besten passt." },
          ].map(u => (
            <div key={u.t} className="beratung-usecase">
              <span className="beratung-usecase-icon">{u.icon}</span>
              <strong>{u.t}</strong>
              <span className="beratung-usecase-desc">{u.d}</span>
            </div>
          ))}
        </div>
      </section>

      {/* So einfach geht's */}
      <section className="beratung-section">
        <h2>So einfach geht's</h2>
        <div className="beratung-steps">
          <div className="beratung-step">
            <span className="beratung-step-num">1</span>
            <strong>Wunschtermin wählen</strong>
            <span>Such dir oben einen freien Zeitpunkt aus, der dir passt.</span>
          </div>
          <div className="beratung-step">
            <span className="beratung-step-num">2</span>
            <strong>Wir rufen dich an</strong>
            <span>Florians Team meldet sich pünktlich zum vereinbarten Termin.</span>
          </div>
          <div className="beratung-step">
            <span className="beratung-step-num">3</span>
            <strong>Dein persönliches Angebot</strong>
            <span>Du bekommst einen klaren, individuellen Vorschlag für deinen Abend.</span>
          </div>
        </div>
      </section>

      <footer className="beratung-footer">
        <p>
          Lieber direkt schreiben? <a href="mailto:tickets@florianzimmer.com">tickets@florianzimmer.com</a>
          {" · "}<a href="tel:+497317906110">0731 7906 110</a>
        </p>
        <Link href="/" className="beratung-back">← Zurück zur Startseite</Link>
      </footer>
    </main>
  );
}
