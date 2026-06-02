# Design-Repo: Arbeitsanleitung für Claude Code

Du arbeitest an der **Frontend- und Design-Schicht** des FZT-Shops.
API-Logik, Zahlungsabwicklung und Datenbankanbindung sind **nicht deine Aufgabe** — diese
Schicht existiert bereits in einem separaten Produktions-Repo und wird später mit deinen
Komponenten zusammengeführt.

---

## Was du bearbeitest

| Datei / Ordner | Aufgabe |
|---|---|
| `src/app/globals.css` | Alle Styles |
| `src/components/*.tsx` | UI-Komponenten |
| `src/app/page.tsx` | Startseite |
| `public/images/` | Bilder und Assets |
| `src/lib/mock-data.ts` | Statische Testdaten (siehe unten) |

**Nicht anfassen:**
- `src/app/api/**` — wird im Produktions-Repo ersetzt
- `src/lib/ditix.ts` / `src/lib/ditix-client.ts`

---

## Datenbeschaffung: Immer über `/api/ditix/...`

Alle Komponenten fetchen Daten über dieselben API-Routen wie in Produktion.
In diesem Repo antworten diese Routen mit **statischen Mock-Daten** (kein echter API-Zugang nötig).
Du musst keine Fetch-URLs oder Logik ändern — die Komponenten funktionieren in Produktion
automatisch mit echten Daten.

---

## Mock-Datenstrukturen

### `/api/ditix/events` → `GET` → `DitixEvent[]`

```ts
interface DitixEvent {
  id: string;                        // z.B. "evt-001"
  code: string;                      // z.B. "ULMFASSBAR-2025-06"
  name: string;                      // z.B. "ULMFASSBAR by Florian Zimmer"
  timestampStart: number;            // Unix ms, z.B. 1748800800000
  timestampEnd: number;              // Unix ms
  location: string | null;           // z.B. "Florian Zimmer Theater, Neu-Ulm"
  coverImageId: string | null;
  ticketSaleState: string | null;    // "AVAILABLE" | "SOLD_OUT" | null
  kind: "SEATED" | "GA";            // SEATED = Saalplan, GA = Freie Plätze
  seatmapEventId: string | null;
  seatmapSchemaId: string | null;
  seatingPlanVersionId: string | null;
}
```

**Beispiel Mock-Events (3 Shows, realistisch):**
```json
[
  {
    "id": "evt-001",
    "code": "ULMFASSBAR-2025-06-14",
    "name": "ULMFASSBAR by Florian Zimmer",
    "timestampStart": 1749916800000,
    "timestampEnd": 1749927600000,
    "location": "Florian Zimmer Theater, Neu-Ulm",
    "coverImageId": null,
    "ticketSaleState": "AVAILABLE",
    "kind": "SEATED",
    "seatmapEventId": "sme-001",
    "seatmapSchemaId": "sms-001",
    "seatingPlanVersionId": "spv-001"
  },
  {
    "id": "evt-002",
    "code": "MAGIC-DINNER-2025-06-21",
    "name": "Magic Dinner by Florian Zimmer",
    "timestampStart": 1750521600000,
    "timestampEnd": 1750532400000,
    "location": "Florian Zimmer Theater, Neu-Ulm",
    "coverImageId": null,
    "ticketSaleState": "AVAILABLE",
    "kind": "SEATED",
    "seatmapEventId": "sme-002",
    "seatmapSchemaId": "sms-001",
    "seatingPlanVersionId": "spv-002"
  },
  {
    "id": "evt-003",
    "code": "ULMFASSBAR-2025-06-28",
    "name": "ULMFASSBAR by Florian Zimmer",
    "timestampStart": 1751126400000,
    "timestampEnd": 1751137200000,
    "location": "Florian Zimmer Theater, Neu-Ulm",
    "coverImageId": null,
    "ticketSaleState": "SOLD_OUT",
    "kind": "SEATED",
    "seatmapEventId": "sme-003",
    "seatmapSchemaId": "sms-001",
    "seatingPlanVersionId": "spv-003"
  }
]
```

---

### `/api/ditix/ticket-types` → `POST { eventId }` → `TicketType[]`

```ts
interface TicketType {
  id: string;
  name: string;                        // z.B. "Classic Menü", "VIP Loge"
  isActive: boolean;
  isHiddenInShop: boolean;
  orderInShop: number;
  description: string | null;          // HTML-String mit Menübeschreibung
  showDescriptionInShop: boolean;
  isLimitedPerPerson: boolean;
  minLimitPerPerson: number | null;
  maxLimitPerPerson: number | null;
  dependsOnType: { id: string } | null; // null = Hauptprodukt, gesetzt = Zusatz
  seatingPrice: { seatmapPriceId: string } | null; // null = GA/Upsell
}
```

**Beispiel Mock (für evt-001, ULMFASSBAR):**
```json
[
  {
    "id": "tt-001",
    "name": "Ticket",
    "isActive": true,
    "isHiddenInShop": false,
    "orderInShop": 1,
    "description": null,
    "showDescriptionInShop": false,
    "isLimitedPerPerson": false,
    "minLimitPerPerson": null,
    "maxLimitPerPerson": null,
    "dependsOnType": null,
    "seatingPrice": { "seatmapPriceId": "sp-001" }
  },
  {
    "id": "tt-002",
    "name": "Classic Menü",
    "isActive": true,
    "isHiddenInShop": false,
    "orderInShop": 2,
    "description": "<p>4-Gang-Menü inkl. Welcome Cocktail. <strong>Vorspeise:</strong> Burrata mit Tomate. <strong>Hauptgang:</strong> Rinderfilet mit Sauce Béarnaise. <strong>Dessert:</strong> Schokoladen-Fondant.</p><p><em>by Schuhmacher's</em></p>",
    "showDescriptionInShop": true,
    "isLimitedPerPerson": false,
    "minLimitPerPerson": null,
    "maxLimitPerPerson": null,
    "dependsOnType": null,
    "seatingPrice": null
  },
  {
    "id": "tt-003",
    "name": "Sea Menü",
    "isActive": true,
    "isHiddenInShop": false,
    "orderInShop": 3,
    "description": "<p>4-Gang-Menü inkl. Welcome Cocktail. <strong>Vorspeise:</strong> Lachs-Tatar. <strong>Hauptgang:</strong> Steinbutt auf Safranrisotto. <strong>Dessert:</strong> Zitronentarte.</p><p><em>by Schuhmacher's</em></p>",
    "showDescriptionInShop": true,
    "isLimitedPerPerson": false,
    "minLimitPerPerson": null,
    "maxLimitPerPerson": null,
    "dependsOnType": null,
    "seatingPrice": null
  },
  {
    "id": "tt-004",
    "name": "Vegan Menü",
    "isActive": true,
    "isHiddenInShop": false,
    "orderInShop": 4,
    "description": "<p>4-Gang Vegan-Menü inkl. Welcome Cocktail. Vollständig pflanzlich.</p><p><em>by Schuhmacher's</em></p>",
    "showDescriptionInShop": true,
    "isLimitedPerPerson": false,
    "minLimitPerPerson": null,
    "maxLimitPerPerson": null,
    "dependsOnType": null,
    "seatingPrice": null
  },
  {
    "id": "tt-005",
    "name": "Getränkearrangement Premium",
    "isActive": true,
    "isHiddenInShop": false,
    "orderInShop": 5,
    "description": "<p>Weinbegleitung (2 Gläser) passend zum gewählten Menü.</p>",
    "showDescriptionInShop": true,
    "isLimitedPerPerson": false,
    "minLimitPerPerson": null,
    "maxLimitPerPerson": null,
    "dependsOnType": { "id": "tt-002" },
    "seatingPrice": null
  },
  {
    "id": "tt-006",
    "name": "VIP Empore",
    "isActive": true,
    "isHiddenInShop": false,
    "orderInShop": 10,
    "description": "<p>Exklusiver Logenplatz auf der Empore mit bestem Blick auf die Bühne.</p>",
    "showDescriptionInShop": true,
    "isLimitedPerPerson": false,
    "minLimitPerPerson": null,
    "maxLimitPerPerson": null,
    "dependsOnType": null,
    "seatingPrice": { "seatmapPriceId": "sp-002" }
  }
]
```

---

### `/api/ditix/seating-prices` → `POST { seatmapSchemaId }` → Preise pro Kategorie

```ts
interface SeatingPrices {
  cheapestPriceForSeatingPlan: { amount: number; scale: number; currency: { code: string } };
  seatingPriceTicketPrices: Array<{
    seatmapPriceId: string;
    cheapest: { amount: number; scale: number; currency: { code: string } };
    mostExpensive: { amount: number; scale: number; currency: { code: string } };
  }>;
}
```

**Preis-Interpretation:** `amount / 10^scale` → `5900 / 10^2 = 59.00 €`

**Beispiel Mock:**
```json
{
  "cheapestPriceForSeatingPlan": { "amount": 5900, "scale": 2, "currency": { "code": "EUR" } },
  "seatingPriceTicketPrices": [
    {
      "seatmapPriceId": "sp-001",
      "cheapest": { "amount": 5900, "scale": 2, "currency": { "code": "EUR" } },
      "mostExpensive": { "amount": 5900, "scale": 2, "currency": { "code": "EUR" } }
    },
    {
      "seatmapPriceId": "sp-002",
      "cheapest": { "amount": 8900, "scale": 2, "currency": { "code": "EUR" } },
      "mostExpensive": { "amount": 8900, "scale": 2, "currency": { "code": "EUR" } }
    }
  ]
}
```

---

### `/api/google-rating` → `GET`

```json
{
  "rating": 4.8,
  "count": 412,
  "url": "https://www.google.com/maps/search/Florian+Zimmer+Theater+Neu-Ulm"
}
```

---

### `/api/ditix/shop-config` → `GET`

```json
{
  "stripe": {
    "publicKey": "pk_test_PLACEHOLDER",
    "accountId": "acct_PLACEHOLDER",
    "paymentMethods": ["card"]
  },
  "paypal": null
}
```

---

## Show-Zuordnung (SHOW_META)

Die Komponenten verwenden einen lokalen `SHOW_META`-Record um Shows anhand ihres Namens
einer visuellen Darstellung zuzuordnen. Behalte diese Struktur:

```ts
type ShowKey = "ulmfassbar" | "magic-dinner" | "zirkus" | "family";

const SHOW_META: Record<ShowKey, {
  name: string;
  desc: string;
  image: string;       // Pfad in /public/images/
  badge: string;
  badgeColor: string;
  duration: string;
  price: string;
}> = { ... }
```

Shows werden einem `ShowKey` zugeordnet wenn der Event-Name den jeweiligen Begriff enthält
(case-insensitive): `"ulmfassbar"`, `"dinner"`, `"zirkus"`, `"family"`.

---

## Upsell-Schritt-Zuordnung

Ticket-Types ohne `seatingPrice` und ohne `dependsOnType` sind Upsells.
Sie werden Schritten zugeordnet anhand des `name`-Felds:

| Name enthält | Schritt |
|---|---|
| `menü` / `menu` / `cuisine` / `dinner` | 3 — Magicuisine |
| `vip` / `loge` / `empore` / `bar` | 4 — VIP & Pause |
| alles andere | 5 — Extras |

Ticket-Types mit `dependsOnType` sind Abhängigkeits-Items (z.B. Getränkearrangement)
und werden unter ihrem Eltern-Item angezeigt.

---

## Wichtige Konventionen

- **Kein direkter Ditix-API-Aufruf** in Komponenten — immer über `/api/ditix/...`
- **Kein `window.location`-Redirect** nach Checkout — Bestätigung via State in der Komponente
- **Preisformatierung:** `amount / Math.pow(10, scale)` → Immer mit `toFixed(2)` und `€`
- **Datum:** `new Date(timestampStart)` → `toLocaleDateString("de-DE", { ... })`
- **CSS:** Nur Klassen aus `globals.css` — kein Inline-Style außer für dynamische Werte
  (Hintergrundbilder, berechnete Breiten)
- **TypeScript:** Strikte Typen — keine `any`

---

## Lokale Entwicklung

```bash
npm install
npm run dev        # → http://localhost:3000
```

Keine `.env`-Datei nötig. Die Mock-API-Routes antworten automatisch.
