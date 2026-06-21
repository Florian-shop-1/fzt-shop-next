"use client";

import { useEffect, useState } from "react";
import Nav from "@/components/Nav";
import BookingModal from "@/components/BookingModal";
import HeroParticles from "@/components/HeroParticles";
import CinematicVideo from "@/components/CinematicVideo";
import InquiryModal from "@/components/InquiryModal";
import { MagicNewsFooter, MagicNewsOverlays } from "@/components/MagicNews";
import { ReturningVisitorHint, SouvenirCountdown } from "@/components/VisitorHints";
import ShowDetail from "@/components/ShowDetail";
import GiftCardModal from "@/components/GiftCardModal";
import SocialLinks from "@/components/SocialLinks";
import HotelModal from "@/components/HotelModal";
import DirectionsModal from "@/components/DirectionsModal";

export default function Home() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [initialShow, setInitialShow] = useState("");
  const [voucherValue, setVoucherValue] = useState(200);
  const [voucherCustom, setVoucherCustom] = useState(false);
  const [giftCardOpen, setGiftCardOpen] = useState(false);
  const [inquiryType, setInquiryType] = useState<"loge" | "firmen" | "gruppe" | null>(null);
  const [hotelOpen, setHotelOpen] = useState(false);
  const [directionsOpen, setDirectionsOpen] = useState(false);
  const [docuPlaying, setDocuPlaying] = useState(false);
  const [detailShow, setDetailShow] = useState<string | null>(null);

  const openDetail = (show: string) => {
    setDetailShow(show);
    try { localStorage.setItem("fztTicketsViewed", "1"); } catch {}
  };

  const openBooking = (show = "") => {
    setInitialShow(show);
    setBookingOpen(true);
    try { localStorage.setItem("fztTicketsViewed", "1"); } catch {}
  };

  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Native Browser-Validierungsmeldungen durchgehend auf "du" umstellen
  useEffect(() => {
    const onInvalid = (e: Event) => {
      const t = e.target as HTMLInputElement | HTMLTextAreaElement;
      if (!t || typeof (t as HTMLInputElement).setCustomValidity !== "function") return;
      const v = (t as HTMLInputElement).validity;
      let msg = "";
      if (v.valueMissing) msg = "Bitte fülle dieses Feld aus.";
      else if (v.typeMismatch) msg = (t as HTMLInputElement).type === "email" ? "Bitte gib eine gültige E-Mail-Adresse ein." : "Bitte prüfe deine Eingabe.";
      else if (!v.valid) msg = "Bitte prüfe deine Eingabe.";
      if (msg) (t as HTMLInputElement).setCustomValidity(msg);
    };
    const onInput = (e: Event) => {
      const t = e.target as HTMLInputElement;
      if (t && typeof t.setCustomValidity === "function") t.setCustomValidity("");
    };
    document.addEventListener("invalid", onInvalid, true);
    document.addEventListener("input", onInput, true);
    return () => {
      document.removeEventListener("invalid", onInvalid, true);
      document.removeEventListener("input", onInput, true);
    };
  }, []);

  return (
    <>
      <Nav onBooking={() => openBooking()} />
      <BookingModal open={bookingOpen} initialShow={initialShow} onClose={() => setBookingOpen(false)} onLogeInquiry={() => { setBookingOpen(false); setInquiryType("loge"); }} />
      <InquiryModal type={inquiryType} onClose={() => setInquiryType(null)} />
      <SouvenirCountdown />
      <ReturningVisitorHint />
      <GiftCardModal open={giftCardOpen} value={voucherValue} onClose={() => setGiftCardOpen(false)} />
      <HotelModal open={hotelOpen} onClose={() => setHotelOpen(false)} />
      <DirectionsModal open={directionsOpen} onClose={() => setDirectionsOpen(false)} />
      <ShowDetail
        showKey={detailShow}
        onClose={() => setDetailShow(null)}
        onBook={key => { setDetailShow(null); openBooking(key); }}
      />

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
          <div
            className="hero-avail"
            role="button"
            tabIndex={0}
            style={{ cursor: "pointer" }}
            onClick={() => openBooking("ulmfassbar")}
            onKeyDown={e => (e.key === "Enter" || e.key === " ") && openBooking("ulmfassbar")}
          >
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
          <div className="show-card reveal" onClick={() => openDetail("ulmfassbar")}>
            <div className="show-card-img" style={{ backgroundImage: "url('/images/show-atmosphere.jpg')", backgroundPosition: "center top" }} />
            <div className="show-card-overlay" />
            <div className="show-card-content">
              <span className="show-badge">★ Bestseller</span>
              <h3>ULMFASSBAR</h3>
              <p>Florian Zimmers Signature-Show. Zweieinhalb Stunden Weltklasse-Magie — persönlich, atemberaubend, unvergesslich.</p>
              <div className="show-meta">
                <span className="show-price">ab 49 €</span>
                <span className="show-rating">★★★★★ 847 Bewertungen</span>
              </div>
              <div className="show-card-btn">Tickets sichern &nbsp;→</div>
            </div>
          </div>

          <div className="show-card show-card--featured reveal reveal-d1" onClick={() => openDetail("magic-memories")}>
            <div className="show-card-img" style={{ backgroundImage: "url('/images/show-magic-dinner.jpg')", backgroundPosition: "center 20%" }} />
            <div className="show-card-overlay" />
            <div className="show-card-content">
              <span className="show-badge show-badge--premium">✦ Neue Show</span>
              <h3>Magic Memories</h3>
              <p>Florian Zimmers brandneue Show. Zweieinhalb Stunden voller Staunen, Emotionen und magischer Momente.</p>
              <div className="show-meta">
                <span className="show-price">ab 49 €</span>
                <span className="show-rating">Brandneu · Premiere</span>
              </div>
              <div className="show-card-btn">Tickets sichern &nbsp;→</div>
            </div>
          </div>

          <div className="show-card reveal reveal-d2" onClick={() => openDetail("flo-zirkus")}>
            <div className="show-card-img" style={{ backgroundImage: "url('/images/flo-zirkus-neu.png')", backgroundPosition: "center 20%" }} />
            <div className="show-card-overlay" />
            <div className="show-card-content">
              <span className="show-badge" style={{ background: "#3a7fd0", color: "#fff" }}>Kindershow</span>
              <h3>Flo-Zirkus</h3>
              <p>Eine interaktive Show, bei der die kleinen Gäste selbst Teil der Magie werden.</p>
              <div className="show-meta">
                <span className="show-price">ab 29 €</span>
                <span className="show-rating">★★★★★ 203 Bewertungen</span>
              </div>
              <div className="show-card-btn">Tickets sichern &nbsp;→</div>
            </div>
          </div>

          <div className="show-card reveal reveal-d3" onClick={() => openDetail("magic-dinner")}>
            <div className="show-card-img" style={{ backgroundImage: "url('/images/magic-dinner-neu2.png')", backgroundPosition: "center top" }} />
            <div className="show-card-overlay" />
            <div className="show-card-content">
              <span className="show-badge" style={{ background: "linear-gradient(135deg,#C9A84C,#8B6914)" }}>♥ Dinner & Magie</span>
              <h3>Magic Dinner</h3>
              <p>Exklusives Dinner-Erlebnis. Vier Gänge, außergewöhnliche Küche und Magie direkt am Tisch.</p>
              <div className="show-meta">
                <span className="show-price">ab 129 €</span>
                <span className="show-rating">★★★★★ 512 Bewertungen</span>
              </div>
              <div className="show-card-btn">Tickets sichern &nbsp;→</div>
            </div>
          </div>
        </div>
      </section>


      {/* FLORIAN ZIMMER — DER MAGIER */}
      <section id="magician">
        <div className="container">
          <div className="section-header text-center reveal">
            <span className="section-label">Der Magier</span>
            <h2>Florian Zimmer</h2>
            <div className="divider divider-center" />
          </div>

          <div className="magician-inner">
            {/* BIO + TOP AWARDS */}
            <div className="reveal">
              <p className="magician-eyebrow-meta">Geboren 3. Mai 1982 in Ulm</p>
              <p className="magician-bio-intro">
                Einer der weltweit gefeiertsten Magier und kreativsten Visionäre der Zauberkunst.
              </p>
              <p className="magician-bio-body">
                Als einziger Deutscher wurde er mit dem prestigeträchtigen <strong style={{ color: "var(--white)" }}>Siegfried &amp; Roy Golden Lion Award</strong> in Las Vegas ausgezeichnet. Schon früh Deutscher Meister und Europameister der Magie, verzauberte er Stars wie <strong style={{ color: "var(--white)" }}>Michael Jackson</strong> und <strong style={{ color: "var(--white)" }}>Adele</strong>. Im Rahmen einer US-Fernsehshow erhielt er den <strong style={{ color: "var(--white)" }}>World Magic Award</strong> als bester zeitgenössischer Magier.
              </p>

              <div className="magician-quote">
                <p className="magician-quote-text">»Kreativster Magier der Welt«</p>
                <p className="magician-quote-source">International Magic Society (I.M.S.)</p>
              </div>

              <div className="magician-top-awards">
                {[
                  { icon: "✦", title: "Siegfried & Roy Golden Lion Award", sub: "Las Vegas — der prestigeträchtigste Preis der Zauberkunst. Einziger Deutscher Preisträger." },
                  { icon: "✦", title: "World Magic Award", sub: "USA — Ausgezeichnet als »Bester zeitgenössischer Magier« im Rahmen einer Fernsehshow." },
                  { icon: "✦", title: "Europameister & Deutscher Meister", sub: "Magie-Weltmeisterschaft — Höchste offizielle Auszeichnung Europas und Deutschlands." },
                  { icon: "✦", title: "IMS Merlin Award", sub: "Internationale Magievereinigung — »Kreativster Magier der Welt«." },
                ].map(a => (
                  <div key={a.title} className="magician-award-card">
                    <span className="award-card-icon">{a.icon}</span>
                    <div>
                      <p className="award-card-title">{a.title}</p>
                      <p className="award-card-sub">{a.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* DOKUMENTATION */}
            <div className="docu-video-wrap reveal reveal-d1">
              {docuPlaying ? (
                <div className="docu-iframe-wrap">
                  <button className="docu-iframe-close" onClick={() => setDocuPlaying(false)} aria-label="Video schließen">✕</button>
                  <div className="yt-no-logo" style={{ width: "100%", height: "100%" }}>
                    <iframe
                      src="https://www.youtube.com/embed/-WyTAS4L5Sw?autoplay=1&rel=0&modestbranding=1&iv_load_policy=3"
                      title="Florian Zimmer Theater — Dokumentation"
                      allowFullScreen
                      allow="autoplay; fullscreen"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div
                    className="docu-thumb"
                    onClick={() => setDocuPlaying(true)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={e => e.key === "Enter" && setDocuPlaying(true)}
                    aria-label="Dokumentation abspielen"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="docu-thumb-img"
                      src="https://img.youtube.com/vi/-WyTAS4L5Sw/maxresdefault.jpg"
                      alt="Dokumentation — Florian Zimmer Theater"
                      onError={e => { (e.target as HTMLImageElement).src = "/images/hero-theater.jpg"; }}
                    />
                    <div className="docu-thumb-overlay" />
                    <div className="docu-play-center">
                      <div className="docu-play-btn" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26" style={{ marginLeft: 4 }}>
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                      <span className="docu-play-label">Dokumentation ansehen</span>
                    </div>
                  </div>
                  <p className="docu-caption">»Die Geschichte hinter dem Theater« — Dokumentarfilm</p>
                </>
              )}
            </div>
          </div>

          {/* ALLE AUSZEICHNUNGEN */}
          <div className="awards-strip reveal">
            {[
              "Siegfried & Roy Golden Lion Award",
              "World Magic Award",
              "Europameister der Magier",
              "Deutscher Meister der Zauberkunst",
              "IMS Merlin Award",
              "Goldene Ringe von Lausanne",
              "Monte Carlo Magic Star",
              "Marc Klasser Award",
              "Colombe d'Or",
              "Artistika",
              "Kleinkunstpreis Baden-Württemberg",
            ].map(award => (
              <span key={award} className="award-chip">
                <span className="award-chip-star">✦</span>
                {award}
              </span>
            ))}
          </div>

          {/* FOLGE DER MAGIE */}
          <div className="follow-magic reveal">
            <span className="follow-magic-label">Folge der Magie</span>
            <SocialLinks variant="follow" />
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
          <h2>Die VIP-Loge —<br /><em>Dein privater Zauberraum</em></h2>
          <div className="divider" />
          <p>Der schönste Platz für besondere Anlässe. In deiner eigenen Loge erlebst du die Show ganz privat, mit persönlichem Service — und einen Abend, den wir individuell für dich planen. Melde dich einfach bei uns: Wir haben attraktive Angebote, für Firmen als betriebliche Ausgabe steuerlich absetzbar.</p>
          <div className="loge-perks">
            {["Ob zu sechst oder mit bis zu 50 Gästen — wir finden die passende Loge", "Exklusivbuchung des gesamten Theaters bereits ab 100 Gästen", "Wahlweise in den Golden Seats oder auf der VIP-Empore — nur 7 Meter zur Bühne", "Champagner-Empfang & persönlicher Service", "Persönliche Begrüßung durch Florian Zimmer", "Dein Abend — individuell geplant", "Für Firmen steuerlich absetzbar"].map(p => (
              <div key={p} className="loge-perk"><span className="perk-dot" />{p}</div>
            ))}
          </div>
          <button className="btn-primary" onClick={() => setInquiryType("loge")}>✦ &nbsp;Loge unverbindlich anfragen</button>
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
                <div>Unbegrenzt gültig · kein Ablaufdatum</div>
              </div>
            </div>
            <div className="gutschein-text reveal reveal-d1">
              <span className="section-label">Das perfekte Geschenk</span>
              <h2>Verschenke <em>Magie</em></h2>
              <div className="divider" />
              <p>Gib dem Menschen, den du liebst, eine Nacht voller Wunder — ein Erlebnis, das alle anderen Geschenke übertrifft.</p>

              <div className="voucher-values">
                {[50, 75, 100, 150, 200, 300].map(v => (
                  <button key={v} className={`voucher-val-btn${!voucherCustom && voucherValue === v ? " active" : ""}`} onClick={() => { setVoucherCustom(false); setVoucherValue(v); }}>{v} €</button>
                ))}
                <button className={`voucher-val-custom${voucherCustom ? " active" : ""}`} onClick={() => setVoucherCustom(true)}>Wunschbetrag</button>
              </div>

              {voucherCustom && (
                <div className="voucher-custom-input">
                  <input
                    type="number"
                    min={25}
                    max={1000}
                    step={5}
                    autoFocus
                    placeholder="min. 25 €"
                    onChange={e => setVoucherValue(Number(e.target.value) || 0)}
                    onBlur={e => { const v = Number(e.target.value) || 0; if (v > 0 && v < 25) setVoucherValue(25); }}
                  />
                  <span className="voucher-custom-currency">€</span>
                </div>
              )}

              {voucherValue >= 100 && (
                <div className="magic-gift-badge">
                  <span className="gift-icon">🪄</span>
                  <div>
                    <strong>Kostenloses Zauber-Geschenk inklusive!</strong>
                    <p>Ab 100 € erhältst du einen erscheinenden Zauberstab kostenlos dazu.</p>
                  </div>
                </div>
              )}

              <div className="voucher-bonus" style={{ marginTop: 16 }}>
                <div className="voucher-bonus-title">Was ist inbegriffen?</div>
                <ul className="voucher-bonus-list">
                  <li>Für jede Show einlösbar — unbegrenzt gültig, kein Ablaufdatum</li>
                  <li>Sofort digital verfügbar oder als Premium-Karte per Post</li>
                  <li>{voucherValue >= 100 ? "Kostenloser Versand + exklusives Zauber-Geschenk" : "Kostenloser digitaler Versand"}</li>
                  <li>Persönliche Widmung mit eigenem Text inklusive</li>
                </ul>
              </div>

              <div className="gutschein-opts">
                {[
                  { icon: "📧", name: "Digital sofort", sub: "Per E-Mail · kostenlos · sofort verfügbar" },
                  { icon: "🪄", name: "Inkl. Zauberstab", sub: "Erscheinender Zauberstab dazu · ab 100 € versandkostenfrei" },
                  { icon: "🎁", name: "Exklusive Geschenkbox", sub: "Mit Florian Zimmer Kartenspiel · +14,90 € inkl. Versand" },
                ].map(opt => (
                  <div key={opt.name} className="gutschein-opt">
                    <span className="opt-icon">{opt.icon}</span>
                    <div><strong>{opt.name}</strong><span>{opt.sub}</span></div>
                  </div>
                ))}
              </div>
              <button className="btn-primary" onClick={() => setGiftCardOpen(true)}>✦ &nbsp;Gutschein jetzt gestalten</button>
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
              <h2>Wenn dein Team einen<br />Abend <em>nie vergisst</em></h2>
              <div className="divider" />
              <p>Weihnachtsfeiern, Teambuilding, Incentives, Jubiläen — Florian Zimmer Theater ist die ausgefallenste Eventlocation in der Region.</p>
              <p>Auf Wunsch buchst du das Theater <strong style={{ color: "var(--white)" }}>exklusiv für dich</strong>. Wir stellen dir ein individuelles Angebot zusammen — Show, Menü, Fingerfood, After-Show-Party und mehr, ganz nach deinen Vorstellungen.</p>
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
            {[{ num: "100.000+", label: "begeisterte Gäste seit 2022" }, { num: "4.9 ★", label: "Durchschnittsbewertung" }, { num: "Top 19%", label: "weltweit auf TripAdvisor" }, { num: "98%", label: "würden uns weiterempfehlen" }].map((s, i) => (
              <div key={s.label} className={`stat-item reveal${i > 0 ? ` reveal-d${i}` : ""}`}>
                <div className="stat-number">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* MAGIC NEWS */}
      <footer>
        <MagicNewsFooter />
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logo.png" alt="Florian Zimmer Theater" style={{ height: 40, width: "auto", filter: "brightness(0) invert(1)", opacity: 0.9, marginBottom: 12 }} />
              <p>HOME OF MAGIC in Neu-Ulm. Live-Magie auf Weltklasse-Niveau — für unvergessliche Abende zu zweit, mit Familie oder als Firmen-Event.</p>
              <SocialLinks variant="footer" />
            </div>
            <div className="footer-col">
              <h4>Shows</h4>
              <a href="#" onClick={e => { e.preventDefault(); openDetail("ulmfassbar"); }}>ULMFASSBAR</a>
              <a href="#" onClick={e => { e.preventDefault(); openDetail("magic-memories"); }}>Magic Memories</a>
              <a href="#" onClick={e => { e.preventDefault(); openDetail("flo-zirkus"); }}>Flo-Zirkus</a>
              <a href="#" onClick={e => { e.preventDefault(); openDetail("magic-dinner"); }}>Magic Dinner</a>
              <a href="#loge">VIP-Loge</a>
            </div>
            <div className="footer-col">
              <h4>Services</h4>
              <a href="#" onClick={e => { e.preventDefault(); setGiftCardOpen(true); }}>Gutschein kaufen</a>
              <a href="#" onClick={e => { e.preventDefault(); setInquiryType("firmen"); }}>Firmenevents</a>
              <a href="#" onClick={e => { e.preventDefault(); setInquiryType("gruppe"); }}>Gruppenreservierung</a>
              <a href="#" onClick={e => { e.preventDefault(); setHotelOpen(true); }}>Hotel-Kooperationen</a>
            </div>
            <div className="footer-col">
              <h4>Theater</h4>
              <a href="tel:+497317906110">0731 7906 110</a><a href="mailto:tickets@florianzimmer.com">tickets@florianzimmer.com</a><a href="#" onClick={e => { e.preventDefault(); setDirectionsOpen(true); }}>Anfahrt &amp; Parken</a><a href="#">FAQ</a><a href="/datenschutz">Datenschutz</a><a href="/impressum">Impressum</a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Florian Zimmer Theater GmbH — Alle Rechte vorbehalten</span>
            <span style={{ color: "var(--gold)" }}>✦ HOME OF MAGIC</span>
          </div>
        </div>
      </footer>

      {/* MAGIC NEWS OVERLAYS (45s + Exit-Intent) */}
      <MagicNewsOverlays />

      {/* STICKY MOBILE BAR */}
      <div className="sticky-bar">
        <button className="btn-secondary" onClick={() => openBooking()}>Gutschein</button>
        <button className="btn-primary" onClick={() => openBooking()}>Jetzt buchen</button>
      </div>
    </>
  );
}
