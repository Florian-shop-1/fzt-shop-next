# Anweisungen für Claude

Du arbeitest an einem Next.js Ticketshop für das Florian Zimmer Theater.
Deine Aufgabe ist ausschließlich **Design und Frontend**. API-Logik, Zahlungsabwicklung
und Datenbankanbindung existieren bereits in einem separaten Produktions-Repo —
du siehst und berührst diese Schicht nicht.

---

## Diese Dateien bearbeitest du

- `src/app/globals.css` — alle Styles
- `src/components/*.tsx` — UI-Komponenten
- `src/app/page.tsx` — Startseite
- `public/images/` — Bilder

## Diese Dateien berührst du nie

- `src/app/api/**` — alle API-Routes
- `src/lib/ditix.ts` / `src/lib/ditix-client.ts`

---

## API-Aufrufe in Komponenten

Komponenten fetchen Daten immer über diese internen Routen — nie direkt extern:

| Route | Methode | Zweck |
|---|---|---|
| `/api/ditix/events` | GET | Alle kommenden Events |
| `/api/ditix/ticket-types` | POST `{ eventId }` | Ticket-Types + Upsells eines Events |
| `/api/ditix/seating-prices` | POST `{ seatmapSchemaId }` | Preise pro Sitzkategorie |
| `/api/ditix/seatmap` | POST `{ seatmapEventId }` | Saalplan-Geometrie |
| `/api/ditix/reserve` | POST | Sitzplatz reservieren |
| `/api/ditix/cart/add` | POST | Ticket in Warenkorb |
| `/api/ditix/checkout/prepare` | POST | Checkout vorbereiten |
| `/api/google-rating` | GET | Google-Bewertung |
| `/api/ditix/shop-config` | GET | Stripe/PayPal Keys |

Wenn du eine neue Komponente baust die Daten braucht: fetch von diesen Routen,
genau so wie es die bestehenden Komponenten bereits tun.

---

## Datenstrukturen

### Event
```ts
interface DitixEvent {
  id: string;
  code: string;
  name: string;                  // z.B. "ULMFASSBAR by Florian Zimmer"
  timestampStart: number;        // Unix Millisekunden
  timestampEnd: number;
  location: string | null;
  coverImageId: string | null;
  ticketSaleState: string | null; // "AVAILABLE" | "SOLD_OUT" | null
  kind: "SEATED" | "GA";         // SEATED = Saalplan, GA = freie Plätze
  seatmapEventId: string | null;
  seatmapSchemaId: string | null;
  seatingPlanVersionId: string | null;
}
```

### Ticket-Type (Eintrittskarte oder Upsell)
```ts
interface TicketType {
  id: string;
  name: string;                        // z.B. "Classic Menü", "VIP Loge"
  isActive: boolean;
  isHiddenInShop: boolean;
  orderInShop: number;
  description: string | null;          // HTML-String
  showDescriptionInShop: boolean;
  isLimitedPerPerson: boolean;
  minLimitPerPerson: number | null;
  maxLimitPerPerson: number | null;
  dependsOnType: { id: string } | null; // null = eigenständig, gesetzt = Zusatz zu Eltern-Item
  seatingPrice: { seatmapPriceId: string } | null; // null = kein Sitzplatz (= Upsell/GA)
}
```

### Preis
```ts
interface Price {
  amount: number;   // z.B. 5900
  scale: number;    // z.B. 2  →  5900 / 10^2 = 59.00 €
  currency: { code: string }; // "EUR"
}
```
**Preisformatierung immer:** `(amount / Math.pow(10, scale)).toFixed(2) + " €"`

### Google Rating
```ts
interface GoogleRating {
  rating: number;   // z.B. 4.8
  count: number;    // z.B. 412
  url: string;      // Google Maps Link
}
```

---

## Show-Zuordnung

Events werden lokal einem `ShowKey` zugeordnet anhand des `name`-Felds:

```ts
type ShowKey = "ulmfassbar" | "magic-dinner" | "zirkus" | "family";
```

| Event-Name enthält | ShowKey |
|---|---|
| `"ulmfassbar"` | `"ulmfassbar"` |
| `"dinner"` | `"magic-dinner"` |
| `"zirkus"` | `"zirkus"` |
| `"family"` | `"family"` |

Jeder ShowKey hat ein `SHOW_META`-Objekt mit `name`, `desc`, `image`, `badge`, `badgeColor`,
`duration`, `price`. Bilder liegen unter `/public/images/`.

---

## Upsell-Schritte

Ticket-Types ohne `seatingPrice` und ohne `dependsOnType` sind Upsells.
Sie erscheinen in Schritten basierend auf dem `name`:

| Name enthält | Schritt |
|---|---|
| `menü` / `menu` / `cuisine` / `dinner` | 3 — Magicuisine |
| `vip` / `loge` / `empore` / `bar` | 4 — VIP & Pause |
| alles andere | 5 — Extras |

Ticket-Types mit `dependsOnType` sind Abhängigkeits-Items (z.B. Getränkearrangement)
und werden unter ihrem Eltern-Item eingerückt dargestellt.

---

## Konventionen die du immer einhältst

- Kein direkter externer API-Aufruf in Komponenten — nur über `/api/ditix/...`
- Datum: `new Date(timestampStart).toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long" })`
- Uhrzeit: `new Date(timestampStart).toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })`
- CSS: Klassen aus `globals.css` — Inline-Style nur für dynamische Werte (Hintergrundbilder, berechnete Breiten)
- TypeScript: Keine `any`
- Sprache: Alle UI-Texte auf Deutsch

---

## Lokale Entwicklung

```bash
npm install
npm run dev   # → http://localhost:3000
```

Keine `.env`-Datei nötig.
