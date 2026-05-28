"use client";

import { useEffect, useState } from "react";
import Nav from "@/components/Nav";
import Trailers from "@/components/Trailers";
import BookingModal from "@/components/BookingModal";

export default function Home() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [initialShow, setInitialShow] = useState("");

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
      <BookingModal open={bookingOpen} initialShow={initialShow} onClose={() => setBookingOpen(false)} />

      {/* HERO */}
      <section className="hero" id="hero">
        <div className="hero-bg" />
        <div className="hero-overlay" />
        <div className="hero-glow" />
        <div className="hero-content">
          <p className="hero-eyebrow">✦ Deutschlands Magietheater · Neu-Ulm ✦</p>
          <h1>Eine Nacht,<br />die du <em>nie</em> vergisst.</h1>
          <p className="hero-sub">
            Live-Magie, atemberaubende Illusionen und ein Erlebnis,<br />
            das dich und deine Liebsten verzaubern wird.
          </p>
          <div className="hero-ctas">
            <button className="btn-primary" onClick={() => openBooking()}>✦ &nbsp;Jetzt Erlebnis sichern</button>
            <a href="#shows" className="btn-secondary">Shows entdecken</a>
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
          <div className="trust-item"><strong>50.000+</strong><span>begeisterte Gäste</span></div>
          <div className="trust-sep" />
          <div className="trust-item"><strong>★ 4.9</strong><span>TripAdvisor</span></div>
          <div className="trust-sep" />
          <div className="trust-item"><strong>Top 10%</strong><span>weltweit</span></div>
          <div className="trust-sep" />
          <div className="trust-item"><strong>Golden Lion</strong><span>Award Winner</span></div>
          <div className="trust-sep" />
          <div className="trust-item"><strong>DSGVO</strong><span>sichere Buchung</span></div>
        </div>
      </div>

      {/* SHOWS */}
      <section id="shows" style={{ padding: "100px 0 0" }}>
        <div className="container">
          <div className="section-header text-center reveal">
            <span className="section-label">Unsere Shows</span>
            <h2>Wähle dein Erlebnis</h2>
            <div className="divider divider-center" />
          </div>
        </div>
        <div className="shows-grid">
          {[
            { id: "ulmfassbar", img: "/images/show-ulmfassbar.jpg", badge: "★ Bestseller", badgeBg: "", name: "ULMFASSBAR", desc: "Die große Magishow — live, persönlich, atemberaubend. 2,5 Stunden pure Illusion.", price: "ab 59 €", rating: "★★★★★ 847 Bewertungen", cta: "Plätze sichern" },
            { id: "magic-dinner", img: "/images/show-magic-dinner.jpg", badge: "♥ Beliebteste Wahl", badgeBg: "linear-gradient(135deg,#C9A84C,#8B6914)", name: "Magic Dinner", desc: "Show + exklusives 3-Gänge-Menü. Ein ganzer Abend voller Zauber und Genuss.", price: "ab 129 €", rating: "★★★★★ 512 Bewertungen", cta: "Tisch reservieren" },
            { id: "flo-zirkus", img: "/images/show-atmosphere.jpg", badge: "Neu 2025", badgeBg: "#2a6aad", name: "Flo-Zirkus", desc: "Zirkus, Akrobatik und Magie vereint. Ein spektakuläres Erlebnis für alle Sinne.", price: "ab 45 €", rating: "★★★★★ 203 Bewertungen", cta: "Tickets sichern" },
            { id: "this-is-magic", img: "/images/show-ulmfassbar-2.jpg", badge: "Familienshow", badgeBg: "#5a2d82", name: "This is Magic!", desc: "Magie für die ganze Familie. Staunen und Lachen für Groß und Klein.", price: "ab 39 €", rating: "★★★★★ 389 Bewertungen", cta: "Familienticket" },
          ].map((show, i) => (
            <div key={show.id} className={`show-card reveal${i > 0 ? ` reveal-d${i}` : ""}`} onClick={() => openBooking(show.id)}>
              <div className="show-card-img" style={{ backgroundImage: `url('${show.img}')` }} />
              <div className="show-card-overlay" />
              <div className="show-card-content">
                <span className="show-badge" style={show.badgeBg ? { background: show.badgeBg } : {}}>{show.badge}</span>
                <h3>{show.name}</h3>
                <p>{show.desc}</p>
                <div className="show-meta">
                  <span className="show-price">{show.price}</span>
                  <span className="show-rating">{show.rating}</span>
                </div>
                <div className="show-card-btn">{show.cta} &nbsp;→</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TRAILERS */}
      <Trailers />

      {/* MAGIC DINNER */}
      <section id="magic-dinner">
        <div className="container">
          <div className="md-inner">
            <div className="md-visual reveal">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="md-img" src="/images/show-magic-dinner.jpg" alt="Magic Dinner" />
              <div className="md-badge">♥ Bestseller</div>
              <div className="md-glow" />
            </div>
            <div className="md-text reveal reveal-d1">
              <span className="section-label">Das besondere Erlebnis</span>
              <h2>Magic Dinner —<br /><em>Magie trifft Genuss</em></h2>
              <div className="divider" />
              <p>Erlebe eine vollständige Magishow kombiniert mit einem exklusiven 3-Gänge-Menü in edler Atmosphäre. Der gesamte Abend ist durchkomponiert — von der Ankunft bis zum letzten Bissen.</p>
              <div className="price-tag">
                <span className="price-from">ab</span>
                <span className="price-amount">129€</span>
                <span className="price-per">/ Person</span>
              </div>
              <ul className="features-list">
                <li><span className="feat-icon">✦</span> Exklusives 3-Gänge-Menü vor der Show</li>
                <li><span className="feat-icon">✦</span> Erlesene Weinbegleitung inklusive</li>
                <li><span className="feat-icon">✦</span> Reservierter Premium-Tisch mit bester Sicht</li>
                <li><span className="feat-icon">✦</span> Persönliche Begrüßung durch das Team</li>
                <li><span className="feat-icon">✦</span> 4 Stunden unvergessliches Gesamterlebnis</li>
              </ul>
              <button className="btn-primary" onClick={() => openBooking("magic-dinner")}>✦ &nbsp;Magic Dinner buchen</button>
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
          <button className="btn-primary" onClick={() => alert("Bitte rufen Sie uns an: 0731 7906 110\noder: loge@florianzimmertheater.de")}>✦ &nbsp;Loge anfragen</button>
        </div>
      </section>

      {/* EXTRAS */}
      <section id="extras">
        <div className="container">
          <div className="section-header text-center reveal">
            <span className="section-label">Erlebnis aufwerten</span>
            <h2>Mach den Abend <em>unvergesslich</em></h2>
            <div className="divider divider-center" />
          </div>
          <div className="extras-grid">
            {[
              { icon: "🥂", name: "Welcome-Prosecco", desc: "Für alle Personen — ein eleganter Auftakt zum magischen Abend.", price: "7,50 € / Person", badge: "Beliebt" },
              { icon: "🌹", name: "Romantik-Paket", desc: "Rosen, persönliche Karte und Sektempfang — für den perfekten Abend zu zweit.", price: "29 €", badge: "" },
              { icon: "🎂", name: "Geburtstags-Deko", desc: "Personalisierter Tischaufsteller und handgeschriebene Karte für den Jubilar.", price: "19 €", badge: "" },
              { icon: "📸", name: "Foto-Session", desc: "Meet & Greet backstage mit Florian Zimmer nach der Show. Unvergesslich.", price: "39 €", badge: "Exklusiv" },
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
              <div className="gutschein-value">100€</div>
              <div className="gutschein-name">Für: Max Mustermann</div>
              <div className="gutschein-msg">&ldquo;Einen magischen Abend für dich — genieße jeden Moment.&rdquo;</div>
              <div className="gutschein-footer">
                <div className="gutschein-code">MAGIC-X7K2</div>
                <div>3 Jahre gültig</div>
              </div>
            </div>
            <div className="gutschein-text reveal reveal-d1">
              <span className="section-label">Das perfekte Geschenk</span>
              <h2>Verschenke <em>Magie</em></h2>
              <div className="divider" />
              <p>Ein Gutschein für Florian Zimmer Theater ist das Geschenk, das alle anderen übertrifft. Für jeden Anlass — Geburtstag, Jahrestag, Weihnachten oder einfach so.</p>
              <div className="gutschein-opts">
                {[
                  { icon: "📧", name: "Digital sofort", sub: "Per E-Mail, kostenlos, sofort verfügbar" },
                  { icon: "💌", name: "Premium-Karte per Post", sub: "Hochwertiger Karton, 3–5 Werktage · 4,90 €" },
                  { icon: "🎁", name: "Geschenkbox", sub: "Karte + FZT-Zauberset · 29 €" },
                ].map(opt => (
                  <div key={opt.name} className="gutschein-opt">
                    <span className="opt-icon">{opt.icon}</span>
                    <div><strong>{opt.name}</strong><span>{opt.sub}</span></div>
                  </div>
                ))}
              </div>
              <button className="btn-primary" onClick={() => openBooking()}>✦ &nbsp;Gutschein gestalten</button>
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
              <button className="btn-primary" onClick={() => alert("Bitte rufen Sie uns an: 0731 7906 110\noder: firmen@florianzimmertheater.de")}>✦ &nbsp;Unverbindlich anfragen</button>
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
              { icon: "🏆", title: "Travellers' Choice", sub: "TripAdvisor 2024" },
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
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <span style={{ fontFamily: "var(--font-playfair), serif", fontSize: 17, fontWeight: 700, letterSpacing: 1 }}>FLORIAN ZIMMER THEATER</span>
              <p>Deutschlands Magietheater in Neu-Ulm. Live-Magie auf Weltklasse-Niveau — für unvergessliche Abende zu zweit, mit Familie oder als Firmen-Event.</p>
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
              <a href="tel:+497317906110">📞 0731 7906 110</a><a href="#">Anfahrt &amp; Parken</a><a href="#">FAQ</a><a href="#">Datenschutz</a><a href="#">Impressum</a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Florian Zimmer Theater GmbH — Alle Rechte vorbehalten</span>
            <span style={{ color: "var(--gold)" }}>✦ Deutschlands Magietheater</span>
          </div>
        </div>
      </footer>

      {/* STICKY MOBILE BAR */}
      <div className="sticky-bar">
        <button className="btn-secondary" onClick={() => openBooking()}>🎁 Gutschein</button>
        <button className="btn-primary" onClick={() => openBooking()}>Jetzt buchen</button>
      </div>
    </>
  );
}
