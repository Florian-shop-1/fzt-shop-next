"use client";

import { useEffect, useState } from "react";

// ─────────────────────────────────────────────
//  MAGIC NEWS — Newsletter
//  Frontend-Platzhalter. Anmeldung geht an Brevo
//  über die interne Route /api/magic-news/subscribe
//  (Julian: Route + Brevo-Listen-ID anbinden).
// ─────────────────────────────────────────────

export function MagicNewsForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || loading) return;
    setLoading(true);
    try {
      // Julian: an Brevo übergeben
      await fetch("/api/magic-news/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }).catch(() => {});
    } finally {
      setLoading(false);
      setSent(true);
    }
  };

  if (sent) {
    return (
      <div className="magic-news-success">
        <span className="magic-news-success-icon">✦</span>
        <p>Willkommen im Kreis der Magic News. Bitte bestätige kurz die E-Mail in deinem Postfach.</p>
      </div>
    );
  }

  return (
    <form className={`magic-news-form${compact ? " compact" : ""}`} onSubmit={submit}>
      <input
        type="email"
        required
        placeholder="Deine E-Mail-Adresse"
        value={email}
        onChange={e => setEmail(e.target.value)}
        autoComplete="email"
        aria-label="E-Mail-Adresse"
      />
      <button type="submit" className="magic-news-submit" disabled={loading}>
        {loading ? "…" : "Magic News abonnieren"}
      </button>
    </form>
  );
}

// ── Overlay: 45-Sek-Timer + Exit-Intent ──────
export function MagicNewsOverlays() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"timed" | "exit">("timed");

  useEffect(() => {
    // Bereits abonniert/geschlossen? → in den letzten 14 Tagen nicht erneut
    const dismissed = localStorage.getItem("magicNewsDismissed");
    if (dismissed && Date.now() - Number(dismissed) < 14 * 24 * 60 * 60 * 1000) return;

    let shownThisSession = false;

    // 1) Nach 45 Sekunden Verweildauer
    const timer = setTimeout(() => {
      if (!shownThisSession) {
        shownThisSession = true;
        setMode("timed");
        setOpen(true);
      }
    }, 45000);

    // 2) Exit-Intent (Maus verlässt oben)
    const onMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0 && !shownThisSession) {
        shownThisSession = true;
        setMode("exit");
        setOpen(true);
      }
    };
    document.addEventListener("mouseout", onMouseOut);

    return () => { clearTimeout(timer); document.removeEventListener("mouseout", onMouseOut); };
  }, []);

  const close = () => {
    setOpen(false);
    localStorage.setItem("magicNewsDismissed", String(Date.now()));
  };

  if (!open) return null;

  return (
    <div className="magic-news-overlay" onClick={e => e.target === e.currentTarget && close()}>
      <div className="magic-news-modal">
        <button className="magic-news-close" onClick={close} aria-label="Schließen">✕</button>
        <span className="magic-news-eyebrow">✦ Magic News</span>
        {mode === "exit" ? (
          <>
            <h3>Bevor du gehst …</h3>
            <p>Möchtest du von neuen Shows, Zusatzterminen und besonderen Aktionen erfahren?</p>
          </>
        ) : (
          <>
            <h3>Like Magic?</h3>
            <p>Dann solltest du die Magic News kennen. Neue Shows, besondere Termine und exklusive Aktionen — direkt vom Home of Magic.</p>
          </>
        )}
        <MagicNewsForm />
      </div>
    </div>
  );
}

// ── Footer-Bereich ───────────────────────────
export function MagicNewsFooter() {
  return (
    <div className="magic-news-footer">
      <div className="magic-news-footer-inner">
        <div className="magic-news-footer-text">
          <span className="section-label">Magic News</span>
          <h3>Hol dir die Magic News</h3>
          <p>Erfahre als Erstes von neuen Shows, Zusatzterminen, exklusiven Aktionen, besonderen Events und Blicken hinter die Kulissen.</p>
          <p className="magic-news-footer-note">Manche Dinge erfährst du ausschließlich über die Magic News.</p>
        </div>
        <div className="magic-news-footer-form">
          <MagicNewsForm />
        </div>
      </div>
    </div>
  );
}
