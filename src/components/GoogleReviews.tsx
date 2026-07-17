"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// ─────────────────────────────────────────────
//  GOOGLE-REZENSIONEN (Trustindex-Widgets)
//
//  Widget-IDs aus dem Trustindex-Dashboard (JS-Einbindung).
//
//  WICHTIG: Trustindex bindet Widgets an die im Konto registrierten
//  Domains. Wird eine neue Domain (z. B. Vercel-Adresse) nicht dort
//  freigegeben, rendert das Widget nichts.
//  → Dann im Trustindex-Dashboard die Domain ergänzen.
//
//  Rendert ein Widget nichts, wird der ganze Block ausgeblendet —
//  so steht nie eine leere Überschrift auf der Seite.
//
//  DATENSCHUTZ: lädt ein externes Skript von cdn.trustindex.io.
//  Ist in der Datenschutzerklärung aufgeführt.
// ─────────────────────────────────────────────

// "Dark Luxury"-Variante — passt zum Design der Seite.
// Weitere Widgets einfach als zusätzliche ID ergänzen (dann aber ebenfalls
// im Trustindex-Dashboard auf ein dunkles Theme stellen).
const TRUSTINDEX_WIDGET_IDS = [
  "f999738484f2431bf00634b59fa",
];

function TrustindexWidget({ id, onLoaded }: { id: string; onLoaded: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || el.dataset.loaded === "1") return;
    el.dataset.loaded = "1";

    const s = document.createElement("script");
    s.src = `https://cdn.trustindex.io/loader.js?${id}`;
    s.defer = true;
    s.async = true;
    el.appendChild(s);

    // Prüfen, ob das Widget tatsächlich Inhalt rendert
    let tries = 0;
    const iv = setInterval(() => {
      tries++;
      if (el.getBoundingClientRect().height > 60) { onLoaded(); clearInterval(iv); }
      else if (tries > 15) clearInterval(iv);
    }, 1000);
    return () => clearInterval(iv);
  }, [id, onLoaded]);

  return <div className="google-reviews-widget" ref={ref} />;
}

export default function GoogleReviews() {
  const [hasContent, setHasContent] = useState(false);
  const onLoaded = useCallback(() => setHasContent(true), []);

  return (
    <div className={`google-reviews${hasContent ? " has-content" : ""}`}>
      <span className="google-reviews-label">✦ Das sagen unsere Gäste</span>
      {TRUSTINDEX_WIDGET_IDS.map(id => (
        <TrustindexWidget key={id} id={id} onLoaded={onLoaded} />
      ))}
    </div>
  );
}
