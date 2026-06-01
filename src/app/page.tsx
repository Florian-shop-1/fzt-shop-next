"use client";

import { useEffect, useState } from "react";
import Nav from "@/components/Nav";
import Trailers from "@/components/Trailers";
import BookingModal from "@/components/BookingModal";
import HeroParticles from "@/components/HeroParticles";
import CinematicVideo from "@/components/CinematicVideo";
import InquiryModal from "@/components/InquiryModal";

export default function Home() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [initialShow, setInitialShow] = useState("");
  const [voucherValue, setVoucherValue] = useState(100);
  const [inquiryType, setInquiryType] = useState<"loge" | "firmen" | null>(null);

  const openBooking = (show = "") => { setInitialShow(show); setBookingOpen(true); };

  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <Nav onBooking={() => openBooking()} />
      <BookingModal open={bookingOpen} initialShow={initialShow} onClose={() => setBookingOpen(false)} onLogeInquiry={() => { setBookingOpen(false); setInquiryType("loge"); }} />
      <InquiryModal type={inquiryType} onClose={() => setInquiryType(null)} />

      {/* HERO */}
      <section className="hero" id="hero">
        <div className="hero-bg" />
        <div className="hero-overlay" />
        <div className="hero-glow" />
        <HeroParticles />
        <div className="hero-content">
          <div className="hero-logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo.png" alt="Florian Zimmer Theater" />
          </div>
          <p className="hero-eyebrow">✦ HOME OF MAGIC ✦</p>
          <h1>Eine Nacht,<br />die du <em>nie</em> vergisst.</h1>
          <p className="hero-sub">
            Der Abend beginnt hier. Live-Magie, die dich und deine Begleitung<br />
            für immer verbindet — persönlich, atemberaubend, einzigartig.
          </p>
          <div className="hero-ctas">
            <button className="btn-primary" onClick={() => openBooking()}>✦ &nbsp;Abend reservieren</button>
            <a href="#shows" className="btn-secondary">Alle Erlebnisse</a>
          </div>
          <div className="hero-avail">
            <span className="dot-live" />
            <span>Nächste Show: <strong>Samstag, 31. Mai — noch 18 Plätze</strong></span>
          </div>
        </div>
        <div className="hero-scroll">
          <div className="scroll-line" />
          <span>ENTDECKEN</span>
        </div>
      </section>

      {/* TRUST BAR */}
      <div className="trust-bar">
        <div className="trust-inner">
          <div className="trust-item"><strong>100.000+</strong><span>begeisterte Gäste</span></div>
          <div className="trust-sep" />
          <div className="trust-item"><strong>★ 4,8</strong><span>Google</span></div>
          <div className="trust-sep" />
          <div className="trust-item"><strong>Top 19%</strong><span>weltweit</span></div>
          <div className="trust-sep" />
          <div className="trust-item" style={{ flexDirection: "column", alignItems: "center", gap: 2 }}>
            <span style={{ fontSize: 10, letterSpacing: 1, color: "var(--gold)", textTransform: "uppercase", opacity: 0.8 }}># 1 Attraktion in Neu-Ulm</span>
            <strong>Travellers&apos; Choice</strong>
            <span>2025 &amp; 2026</span>
          </div>
        </div>
      </div>

      {/* CINEMATIC VIDEO */}
      <CinematicVideo />

      {/* MAGIC DIVIDER */}
      <div className="magic-divider"><span>✦ &nbsp; ✦ &nbsp; ✦</span></div>

      {/* SHOWS */}
      <section id="shows" style={{ padding: "80px 0 0" }}>
        <div className="container">
          <div className="section-header text-center reveal">
            <span className="section-label">Erlebe Florian Zimmer</span>
            <h2>Jeder Abend einzigartig.</h2>
            <div className="divider divider-center" />
          </div>
        </div>

        <div className="shows-grid">
          <div className="show-card reveal" onClick={() => openBooking("ulmfassbar")}>
            <div className="show-card-img" style={{ backgroundImage: "url('/images/show-ulmfassbar.jpg')" }} />
            <div className="show-card-overlay" />
            <div className="show-card-content">
              <span className="show-badge">★ Bestseller</span>
              <h3>ULMFASSBAR</h3>
              <p>Florian Zimmers Signature-Show. Zweieinhalb Stunden Weltklasse-Magie — persönlich, atemberaubend, unvergesslich.</p>
              <div className="show-meta">
                <span className="show-price">ab 59 €</span>
                <span className="show-rating">★★★★★ 847 Bewertungen</span>
              </div>
              <div className="show-card-btn">Plätze sichern &nbsp;→</div>
            </div>
          </div>

          <div className="show-card show-card--featured reveal reveal-d1" onClick={() => openBooking("magic-dinner")}>
            <div className="show-card-img" style={{ backgroundImage: "url('/images/show-magic-dinner.jpg')" }} />
            <div className="show-card-overlay" />
            <div className="show-card-content">
              <span className="show-badge show-badge--premium">♥ Beliebteste Wahl</span>
              <h3>Magic Dinner</h3>
              <p>Show &amp; exklusives 4-Gang-Menü. Der vollkommenste Abend des Jahres — alles aus einer Hand, vollständig durchkomponiert.</p>
              <div className="show-meta">
                <span className="show-price">ab 129 €</span>
                <span className="show-rating">★★★★★ 512 Bewertungen</span>
              </div>
              <div className="show-card-btn">Tisch reservieren &nbsp;→</div>
            </div>
          </div>

          <div className="show-card reveal reveal-d2" onClick={() => openBooking("flo-zirkus")}>
            <div className="show-card-img" style={{ backgroundImage: "url('/images/show-atmosphere.jpg')" }} />
            <div className="show-card-overlay" />
            <div className="show-card-content">
              <span className="show-badge" style={{ background: "#2a6aad" }}>Neu 2025</span>
              <h3>Flo-Zirkus</h3>
              <p>Zirkus, Akrobatik und Magie — ein spektakuläres Erlebnis für alle Sinne.</p>
              <div className="show-meta">
                <span className="show-price">ab 45 €</span>
                <span className="show-rating">★★★★★ 203 Bewertungen</span>
              </div>
              <div className="show-card-btn">Tickets sichern &nbsp;→</div>
            </div>
          </div>

          <div className="show-card reveal reveal-d3" onClick={() => openBooking("this-is-magic")}>
            <div className="show-card-img" style={{ backgroundImage: "url('/images/show-ulmfassbar-2.jpg')" }} />
            <div className="show-card-overlay" />
            <div className="show-card-content">
              <span className="show-badge" style={{ background: "#5a2d82" }}>Familienshow</span>
              <h3>This is Magic!</h3>
              <p>Magie, die Herzen öffnet — für die ganze Familie ab 4 Jahren.</p>
              <div className="show-meta">
                <span className="show-price">ab 39 €</span>
                <span className="show-rating">★★★★★ 389 Bewertungen</span>
              </div>
              <div className="show-card-btn">Familienticket &nbsp;→</div>
            </div>
          </div>
        </div>
      </section>

      {/* TRAILERS */}
      <Trailers />

      {/* MAGIC DINNER FEATURE */}
      <section id="magic-dinner">
        <div className="container">
          <div className="md-inner">
            <div className="md-visual reveal">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="md-img" src="/images/show-magic-dinner.jpg" alt="Magic Dinner" />
              <div className="md-badge">♥ Beliebteste Wahl</div>
              <div className="md-glow" />
            </div>
            <div className="md-text reveal reveal-d1">
              <span className="section-label">Das besondere Erlebnis</span>
              <h2>Magic Dinner —<br /><em>Magie trifft Genuss</em></h2>
              <div className="divider" />
              <p>Ein Abend, der vollständig für Sie gestaltet ist. Vier Gänge, ein Welcome-Cocktail, die beste Sicht — und Magie, die Sie sprachlos zurücklässt.</p>
              <div className="price-tag">
                <span className="price-from">ab</span>
                <span className="price-amount">129€</span>
                <span className="price-per">/ Person</span>
              </div>
              <ul className="features-list">
                <li><span className="feat-icon">✦</span> Exklusives 4-Gang-Menü inkl. Welcome-Cocktail</li>
                <li><span className="feat-icon">✦</span> Erlesene Weinbegleitung verfügbar</li>
                <li><span className="feat-icon">✦</span> Reservierter Premium-Tisch mit bester Sicht</li>
                <li><span className="feat-icon">✦</span> Persönliche Begrüßung durch das Team</li>
                <li><span className="feat-icon">✦</span> Vier Stunden — vollständig durchkomponiert</li>
              </ul>
              <button className="btn-primary" onClick={() => openBooking("magic-dinner")}>✦ &nbsp;Magic Dinner reservieren</button>
            </div>
          </div>
        </div>
      </section>

      {/* VIP LOGE */}
      <section id="loge">
        <div className="loge-bg" />
        <div className="loge-overlay" />
        <div className="loge-glow" />
        <div className="loge-content reveal">
          <span className="section-label">Exklusiv &amp; Privat</span>
          <h2>Die VIP-Loge —<br /><em>Ihr privater Zauberraum</em></h2>
          <div className="divider" />
          <p>Für besondere Anlässe, romantische Abende oder exklusive Firmenfeiern. Genießen Sie die Show in Ihrer eigenen privaten Loge mit persönlichem Service.</p>
          <div className="loge-perks">
            {["Privater Bereich für bis zu 8 Personen", "Champagner-Empfang und Servicepersonal", "Exklusive Sicht auf die Bühne", "Persönliche Begrüßung durch Florian Zimmer", "Ab 599 € für bis zu 8 Personen"].map(p => (
              <div key={p} className="loge-perk"><span className="perk-dot" />{p}</div>
            ))}
          </div>
          <button className="btn-primary" onClick={() => setInquiryType("loge")}>✦ &nbsp;Loge anfragen</button>
        </div>
      </section>

      {/* EXTRAS */}
      <section id="extras">
        <div className="container">
          <div className="section-header text-center reveal">
            <span className="section-label">Den Abend vollenden</span>
            <h2>Mach den Abend <em>unvergesslich</em></h2>
            <div className="divider divider-center" />
          </div>
          <div className="extras-grid">
            {[
              { icon: "🥂", name: "Welcome-Prosecco", desc: "Für alle Personen — ein eleganter Auftakt zum magischen Abend.", price: "7,50 € / Person", badge: "Beliebt" },
              { icon: "🌹", name: "Romantik-Paket", desc: "Rosen, persönliche Karte und Sektempfang — für den perfekten Abend zu zweit.", price: "29 €", badge: "" },
              { icon: "🎂", name: "Geburtstags-Deko", desc: "Personalisierter Tischaufsteller und handgeschriebene Karte für den Jubilar.", price: "19 €", badge: "" },
              { icon: "📸", name: "Foto-Session", desc: "Meet & Greet backstage mit Florian Zimmer nach der Show.", price: "39 €", badge: "Exklusiv" },
            ].map((e, i) => (
              <div key={e.name} className={`extra-card reveal${i > 0 ? ` reveal-d${i}` : ""}`}>
                <div className="extra-icon">{e.icon}</div>
                <h3>{e.name}</h3>
                <p>{e.desc}</p>
                <div className="extra-price">{e.price}</div>
                {e.badge && <span className="extra-badge">{e.badge}</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GUTSCHEIN */}
      <section id="gutschein">
        <div className="gutschein-pattern" />
        <div className="container">
          <div className="gutschein-inner">
            <div className="gutschein-card reveal">
              <div className="gutschein-logo">✦ FLORIAN ZIMMER THEATER</div>
              <div className="gutschein-tagline">HOME OF MAGIC · Neu-Ulm</div>
              <div className="gutschein-value">{voucherValue}€</div>
              <div className="gutschein-name">Für: ___________________</div>
              <div className="gutschein-msg">&ldquo;Eine Nacht voller Magie — unvergesslich, zauberhaft, einzigartig.&rdquo;</div>
              <div className="gutschein-footer">
                <div className="gutschein-code">MAGIC-X7K2</div>
                <div>3 Jahre gültig · kein Ablauf</div>
              </div>
            </div>
            <div className="gutschein-text reveal reveal-d1">
              <span className="section-label">Das perfekte Geschenk</span>
              <h2>Verschenke <em>Magie</em></h2>
              <div className="divider" />
              <p>Gib dem Menschen, den du liebst, eine Nacht voller Wunder — ein Erlebnis, das alle anderen Geschenke übertrifft.</p>

              <div className="voucher-values">
                {[50, 75, 100, 150, 200].map(v => (
                  <button key={v} className={`voucher-val-btn${voucherValue === v ? " active" : ""}`} onClick={() => setVoucherValue(v)}>{v} €</button>
                ))}
                <button className="voucher-val-custom">Wunschbetrag</button>
              </div>

              {voucherValue >= 100 && (
                <div className="magic-gift-badge">
                  <span className="gift-icon">🪄</span>
                  <div>
                    <strong>Kostenloses Zauber-Geschenk inklusive!</strong>
                    <p>Ab 100 € erhält dein Beschenkter ein hochwertiges Zaubertrick-Set — von Florian Zimmer persönlich ausgewählt.</p>
                  </div>
                </div>
              )}

              <div className="voucher-bonus" style={{ marginTop: 16 }}>
                <div className="voucher-bonus-title">Was ist inbegriffen?</div>
                <ul className="voucher-bonus-list">
                  <li>Für jede Show einlösbar — 3 Jahre gültig, kein Ablaufdatum</li>
                  <li>Sofort digital verfügbar oder als Premium-Karte per Post</li>
                  <li>{voucherValue >= 100 ? "Kostenloser Versand + exklusives Zauber-Geschenk" : "Kostenloser digitaler Versand"}</li>
                  <li>Persönliche Widmung mit eigenem Text inklusive</li>
                </ul>
              </div>

              <div className="gutschein-opts">
                {[
                  { icon: "📧", name: "Digital sofort", sub: "Per E-Mail · kostenlos · sofort verfügbar" },
                  { icon: "💌", name: "Premium-Karte", sub: "Hochwertige Karte per Post · 3–5 Tage · 4,90 €" },
                  { icon: "🎁", name: "Geschenkbox", sub: voucherValue >= 100 ? "Karte + Zauberset · kostenlos ab 100 €" : "Karte + FZT-Zauberset · 29 €" },
                ].map(opt => (
                  <div key={opt.name} className="gutschein-opt">
                    <span className="opt-icon">{opt.icon}</span>
                    <div><strong>{opt.name}</strong><span>{opt.sub}</span></div>
                  </div>
                ))}
              </div>
              <button className="btn-primary" onClick={() => openBooking()}>✦ &nbsp;Gutschein jetzt gestalten</button>
            </div>
          </div>
        </div>
      </section>

      {/* FIRMEN */}
      <section id="firmen">
        <div className="container">
          <div className="firmen-inner">
            <div className="firmen-text reveal">
              <span className="section-label">Firmenevents</span>
              <h2>Wenn Ihr Team einen<br />Abend <em>nie vergisst</em></h2>
              <div className="divider" />
              <p>Weihnachtsfeiern, Teambuilding, Incentives, Jubiläen — Florian Zimmer Theater ist die ausgefallenste Eventlocation in der Region.</p>
              <div className="firmen-bullets">
                {[{ num: "500+", label: "Firmenkunden pro Jahr" }, { num: "100%", label: "Weiterempfehlungsrate" }, { num: "10–300", label: "Personen möglich" }, { num: "✓", label: "Rechnung & USt." }].map(b => (
                  <div key={b.label} className="firmen-bullet"><div className="num">{b.num}</div><p>{b.label}</p></div>
                ))}
              </div>
              <button className="btn-primary" onClick={() => setInquiryType("firmen")}>✦ &nbsp;Unverbindlich anfragen</button>
            </div>
            <div className="reveal reveal-d1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="firmen-img" src="/images/show-atmosphere.jpg" alt="Firmenveranstaltung" />
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section id="social-proof">
        <div className="container">
          <div className="section-header text-center reveal">
            <span className="section-label">Was unsere Gäste sagen</span>
            <h2>Echte Begeisterung</h2>
            <div className="divider divider-center" />
          </div>
          <div className="reviews-grid">
            {[
              { text: "WAHNSINN! Wir waren zu viert und alle saßen mit offenem Mund da. Florian Zimmer ist phänomenal — absolut empfehlenswert!", author: "Sandra K.", source: "TripAdvisor · 2025", delay: "" },
              { text: "Das Magic Dinner war der schönste Abend unserer Beziehung. Das Essen war hervorragend und die Show hat uns beide komplett verzaubert.", author: "Thomas & Maria B.", source: "Google · 2025", delay: " reveal-d1" },
              { text: "Unsere Weihnachtsfeier war ein absoluter Hit. Das ganze Team war begeistert — und das will bei 40 Leuten schon was heißen!", author: "Markus S.", source: "Firmenkunde · 2024", delay: " reveal-d2" },
            ].map(r => (
              <div key={r.author} className={`review-card reveal${r.delay}`}>
                <div className="review-stars">★★★★★</div>
                <p className="review-text">&ldquo;{r.text}&rdquo;</p>
                <div className="review-author"><strong>{r.author}</strong>{r.source}</div>
              </div>
            ))}
          </div>
          <div className="stats-bar">
            {[{ num: "50.000+", label: "begeisterte Gäste seit 2015" }, { num: "4.9 ★", label: "Durchschnittsbewertung" }, { num: "Top 10%", label: "weltweit auf TripAdvisor" }, { num: "98%", label: "würden uns weiterempfehlen" }].map((s, i) => (
              <div key={s.label} className={`stat-item reveal${i > 0 ? ` reveal-d${i}` : ""}`}>
                <div className="stat-number">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRESS & AWARDS */}
      <section id="press">
        <div className="container">
          <div className="text-center reveal" style={{ marginBottom: 40 }}>
            <span className="section-label">Presse &amp; Auszeichnungen</span>
          </div>
          <div className="press-logos reveal">
            {["SüdwestPresse", "RegioTV", "SWR", "TOP Magazin", "Radio 7", "Augsburger Allgemeine"].map(p => (
              <div key={p} className="press-logo">{p}</div>
            ))}
          </div>
          <div className="award-banner reveal">
            {[
              { icon: "🦁", title: "Golden Lion Award", sub: "Internationaler Zauberpreis" },
              { icon: "🏆", title: "Travellers' Choice", sub: "TripAdvisor 2025 & 2026" },
              { icon: "⭐", title: "Top 10% weltweit", sub: "TripAdvisor Ranking" },
              { icon: "🎭", title: "Adele · Michael Jackson", sub: "Prominente Referenzen" },
            ].map(a => (
              <div key={a.title} className="award-item">
                <div className="award-icon">{a.icon}</div>
                <div className="award-title">{a.title}</div>
                <div className="award-sub">{a.sub}</div>
              </div>
            ))}
          </div>

          <div className="tripadvisor-badge reveal" style={{ maxWidth: 460, margin: "32px auto 0" }}>
            <svg className="ta-owl" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="18" cy="18" r="18" fill="#00AA6C"/>
              <circle cx="11" cy="21" r="6.5" fill="white"/>
              <circle cx="25" cy="21" r="6.5" fill="white"/>
              <circle cx="11" cy="21" r="3.5" fill="#00AA6C"/>
              <circle cx="25" cy="21" r="3.5" fill="#00AA6C"/>
              <circle cx="12" cy="20" r="1" fill="white"/>
              <circle cx="26" cy="20" r="1" fill="white"/>
              <path d="M13 12 Q18 8 23 12" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            </svg>
            <div className="ta-text">
              <div className="ta-label">Tripadvisor · Ausgezeichnet</div>
              <div className="ta-title">Travellers&apos; Choice Award</div>
              <div className="ta-sub">Top 10% weltweit · #1 Attraktion in Neu-Ulm</div>
              <div className="ta-years">
                <span className="ta-year">2025</span>
                <span className="ta-year">2026</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logo.png" alt="Florian Zimmer Theater" style={{ height: 40, width: "auto", filter: "brightness(0) invert(1)", opacity: 0.9, marginBottom: 12 }} />
              <p>HOME OF MAGIC in Neu-Ulm. Live-Magie auf Weltklasse-Niveau — für unvergessliche Abende zu zweit, mit Familie oder als Firmen-Event.</p>
              <div className="footer-social">
                <a href="https://www.youtube.com/c/FlorianZimmerMagic" className="social-btn" target="_blank" rel="noopener noreferrer">▶</a>
                <a href="#" className="social-btn">f</a>
                <a href="#" className="social-btn">✦</a>
              </div>
            </div>
            <div className="footer-col">
              <h4>Shows</h4>
              <a href="#">ULMFASSBAR</a><a href="#">Magic Dinner</a><a href="#">Flo-Zirkus</a><a href="#">This is Magic!</a><a href="#">VIP-Loge</a>
            </div>
            <div className="footer-col">
              <h4>Services</h4>
              <a href="#">Gutschein kaufen</a><a href="#">Firmenevents</a><a href="#">Gruppenreservierung</a><a href="#">Hotel-Kooperationen</a>
            </div>
            <div className="footer-col">
              <h4>Theater</h4>
              <a href="tel:+497317906110">0731 7906 110</a><a href="#">Anfahrt &amp; Parken</a><a href="#">FAQ</a><a href="#">Datenschutz</a><a href="#">Impressum</a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Florian Zimmer Theater GmbH — Alle Rechte vorbehalten</span>
            <span style={{ color: "var(--gold)" }}>✦ HOME OF MAGIC</span>
          </div>
        </div>
      </footer>

      {/* STICKY MOBILE BAR */}
      <div className="sticky-bar">
        <button className="btn-secondary" onClick={() => openBooking()}>Gutschein</button>
        <button className="btn-primary" onClick={() => openBooking()}>Jetzt buchen</button>
      </div>
    </>
  );
}
