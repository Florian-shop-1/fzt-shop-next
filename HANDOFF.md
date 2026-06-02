# Handoff — Conversion-Features (Frontend → Backend)

Stand: Frontend gebaut mit Platzhaltern in API-Form. Hier die offenen Backend-Übergabepunkte für Julian.

---

## 1. Magic News (Newsletter)

**Frontend fertig:** `src/components/MagicNews.tsx`
- Footer-Bereich, 45-Sek-Overlay, Exit-Intent (1×/14 Tage via localStorage `magicNewsDismissed`)
- Anmeldeformular ruft bereits auf:

```
POST /api/magic-news/subscribe
Body: { email: string }
```

**TODO Backend:** Route anlegen → Kontakt an Brevo-Liste „Magic News" übergeben.
Frontend zeigt nach Submit optimistisch den Erfolgs-State (Double-Opt-in-Mail kommt von Brevo).

---

## 2. Warenkorbabbrecher → Brevo (Spec Pkt. 6)

**TODO Backend:** Sobald E-Mail vorhanden + Tickets im Warenkorb + Checkout begonnen + Kauf nicht abgeschlossen → Kontakt an Brevo.

Mitzugebende Attribute:
- Warenkorb-Link (mit Wiederherstellung)
- Show
- Ticketanzahl
- Warenkorbwert
- Zeitpunkt

Frontend liefert diese Daten im Checkout-State (`BookingModal.tsx`: `bookingData`, `total`, `qty`, `resolvedShow`). Übergabepunkt: beim Eintritt in Schritt 6 (Checkout) bzw. bei E-Mail-Eingabe.

---

## 3. Brevo-Mails 1–3 (Spec Pkt. 7–9)

Reine Brevo-Automation, kein Frontend nötig:
- **Mail 1** (1 h): „Deine Plätze warten noch auf dich" → Button „Buchung fortsetzen"
- **Mail 2** (24 h): „Dein magischer Abend ist nur noch einen Klick entfernt" → „Zu meinen Tickets"
- **Mail 3** (48 h): Souvenirglas-Angebot → Button-Link **mit `?souvenirglass=1`**

---

## 4. Souvenirglas (Spec Pkt. 10–13)

**Frontend fertig:** `src/components/VisitorHints.tsx` + `BookingModal.tsx`
- Rückkehr über `?souvenirglass=1`:
  - `SouvenirCountdown` zeigt ruhigen 24h-Banner (Deadline in localStorage `fztSouvenirDeadline`)
  - `BookingModal` setzt `souvenir = true` → Warenkorb-Karte „🎁 {qty} × Souvenirglas · 0,00 €" + Benefits
  - Menge = Ticketanzahl (1 Ticket = 1 Glas)

**TODO Backend:**
- Eigenes **Ditix-Ticket** „Florian Zimmer Theater Souvenirglas" (0 €) mit:
  - eigenem QR-Code, scanbar an der Magic Bar, nach Scan automatisch entwerten
  - Beschreibung: „Bitte zeige dieses Ticket an der Magic Bar vor und erhalte dein persönliches Florian Zimmer Theater Souvenirglas."
- API-Übergabe wie gewohnt; Frontend fügt das Glas dann über die bestehende cart/add-Logik hinzu (Menge = qty).

---

## 5. Bereits rein Frontend (kein Backend nötig)

- Menü-Nudge „Ohne Magic Menü weitermachen?" (Schritt 3, gleichwertige Buttons)
- Ticket-Schutz-Nachfrage „Wirklich ohne Ticket-Schutz?" (Schritt 4, einmalig)
- Wiederkehrender-Besucher-Hinweis (`fztTicketsViewed` / `sessionStorage fztGreeted`)

---

## Grundregel (Spec Pkt. 14)
Keine Rabatt-Optik, keine Alarmfarben, keine Countdown-Hölle. Alles als Service für den Gast.
Bei neuen Conversion-Elementen diese Linie beibehalten.
