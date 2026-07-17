"use client";

import { useEffect, useRef } from "react";

// ─────────────────────────────────────────────
//  BEWERTUNGS-WIDGETS (Trustindex)
//
//  Widget-IDs aus dem Trustindex-Dashboard (JS-Einbindung).
//  Weitere Widgets einfach als zusätzliche ID ergänzen — dann aber
//  ebenfalls im Trustindex-Dashboard auf das dunkle Theme stellen.
//
//  WICHTIG: Trustindex bindet Widgets an die im Konto registrierten
//  Domains. Auf localhost rendern sie deshalb nie — nur live testen.
//
//  DATENSCHUTZ: lädt ein externes Skript von cdn.trustindex.io.
//  Ist in der Datenschutzerklärung aufgeführt.
// ─────────────────────────────────────────────

const TRUSTINDEX_WIDGET_IDS = [
  "f999738484f2431bf00634b59fa", // Google
  "d5fd3fa48bdd468af906e88c048", // TripAdvisor / Travellers' Choice
];

function TrustindexWidget({ id }: { id: string }) {
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
  }, [id]);

  return <div className="google-reviews-widget" ref={ref} />;
}

export default function GoogleReviews() {
  return (
    <div className="google-reviews">
      {TRUSTINDEX_WIDGET_IDS.map(id => <TrustindexWidget key={id} id={id} />)}
    </div>
  );
}
