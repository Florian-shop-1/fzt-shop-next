"use client";

import { useEffect, useRef } from "react";

// ─────────────────────────────────────────────
//  GOOGLE-REZENSIONEN (Trustindex-Widget)
//
//  Widget-ID aus dem Trustindex-Dashboard.
//  Hinweis: Das Widget bringt sein eigenes (helles) Design mit —
//  das lässt sich von außen nicht umfärben (fremder Rahmen).
//
//  DATENSCHUTZ: lädt ein externes Skript von cdn.trustindex.io.
//  Ist in der Datenschutzerklärung aufgeführt.
// ─────────────────────────────────────────────

const TRUSTINDEX_WIDGET_ID = "f999738484f2431bf00634b59fa";

export default function GoogleReviews() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || el.dataset.loaded === "1") return;
    el.dataset.loaded = "1";

    const s = document.createElement("script");
    s.src = `https://cdn.trustindex.io/loader.js?${TRUSTINDEX_WIDGET_ID}`;
    s.defer = true;
    s.async = true;
    el.appendChild(s);
  }, []);

  return (
    <div className="google-reviews">
      <span className="google-reviews-label">✦ Das sagen unsere Gäste</span>
      <div className="google-reviews-widget" ref={ref} />
    </div>
  );
}
