import Link from "next/link";
import { Fragment } from "react";

export const metadata = { title: "Häufige Fragen — Florian Zimmer Theater" };

interface QA { q: string; a: string[] }
interface Cat { title: string; items: QA[] }

const FAQ: Cat[] = [
  {
    title: "Dein Besuch im Florian Zimmer Theater",
    items: [
      {
        q: "Wann öffnet das Theater vor der Show?",
        a: [
          "Unser Foyer öffnet spätestens eine Stunde vor Showbeginn. So kannst du ganz entspannt ankommen, etwas trinken, dich umsehen und den Abend ohne Stress beginnen.",
          "Unser Restaurant öffnet bereits ab 17:00 Uhr. Wenn du ein Magic-Menü gebucht hast, komm bitte spätestens um 18:00 Uhr, damit genug Zeit für das Essen vor der Show bleibt. Die genaue Uhrzeit findest du immer direkt bei deinem Termin im Ticketshop.",
        ],
      },
      {
        q: "Wie lange dauert die Show?",
        a: [
          "Unsere großen Abendshows wie ULMFASSBAR und Magic Memories dauern ca. 2,5 Stunden inklusive einer Pause von etwa 20 Minuten.",
          "Unsere Kindershow Flo-Zirkus dauert ca. 50 Minuten.",
        ],
      },
      {
        q: "Gibt es eine Pause?",
        a: [
          "Ja. Bei unseren Abendshows gibt es eine Pause von ca. 20 Minuten. In dieser Zeit kannst du Getränke und Snacks an unserer Magic Bar genießen.",
        ],
      },
      {
        q: "Was passiert, wenn ich zu spät komme?",
        a: [
          "Keine Sorge: Wenn du dich verspätest, lassen wir dich zu einem passenden Moment in den Saal. Damit die Show für alle Gäste magisch bleibt, kann es sein, dass du kurz warten musst, bis ein geeigneter Moment kommt.",
        ],
      },
      {
        q: "Darf ich während der Show fotografieren oder filmen?",
        a: [
          "Während der Show bitten wir dich, nicht zu fotografieren und nicht zu filmen. So können alle Gäste den Moment ungestört genießen.",
          "Vor und nach der Show darfst du natürlich Erinnerungsfotos machen. Florian nimmt sich nach der Show außerdem gerne Zeit für Fotos mit den Gästen.",
        ],
      },
      {
        q: "Gibt es einen Dresscode?",
        a: [
          "Wir schreiben dir nichts vor. Für viele Gäste ist der Besuch bei uns ein festlicher Abend – komm also gerne so, wie du dich wohlfühlst und wie es für dich zu einem besonderen Theaterabend passt.",
        ],
      },
    ],
  },
  {
    title: "Kinder & Familien",
    items: [
      {
        q: "Ab welchem Alter sind die Shows geeignet?",
        a: [
          "Unsere Abendshows empfehlen wir ab dem Schulalter.",
          "Unsere Kindershow Flo-Zirkus ist für Kinder ab 0 Jahren geeignet und speziell für Familien gemacht.",
        ],
      },
      {
        q: "Brauchen Kleinkinder ein eigenes Ticket?",
        a: [
          "Bei Flo-Zirkus sind Kinder von 0 bis 3 Jahren kostenlos, wenn sie auf dem Schoß einer Begleitperson sitzen.",
        ],
      },
      {
        q: "Wo können Kinderwagen abgestellt werden?",
        a: [
          "Kinderwagen bleiben während der Show im Foyer. Unser Team zeigt dir vor Ort gerne, wo du den Kinderwagen abstellen kannst.",
        ],
      },
    ],
  },
  {
    title: "Tickets, Gutscheine & Umbuchung",
    items: [
      {
        q: "Muss ich mein Ticket ausdrucken?",
        a: [
          "Nein. Du musst dein Ticket nicht ausdrucken. Es reicht, wenn du das Ticket auf dem Smartphone vorzeigst und der QR-Code gut lesbar ist.",
        ],
      },
      {
        q: "Sind die Tickets personalisiert?",
        a: [
          "Nein. Unsere Tickets sind nicht personalisiert und können übertragen werden. Wenn du selbst nicht kommen kannst, darf eine andere Person dein Ticket nutzen.",
        ],
      },
      {
        q: "Kann ich meine Tickets umbuchen?",
        a: [
          "Eine Umbuchung ist bis 48 Stunden vor der Veranstaltung möglich, wenn du beim Kauf die Flex-Option ausgewählt hast.",
          "Die Flex-Option sichert jeweils einen Gast ab – inklusive Menü und gebuchter Zusatzleistungen. Wenn du umbuchen möchtest, melde dich bitte per E-Mail bei uns: tickets@florianzimmer.com",
        ],
      },
      {
        q: "Kann ich Tickets zurückgeben oder stornieren?",
        a: [
          "Ohne gebuchte Flex-Option sind Tickets grundsätzlich vom Umtausch und von der Rückgabe ausgeschlossen.",
          "Mit Flex-Option kannst du bis 48 Stunden vor der Veranstaltung umbuchen. Melde dich dafür bitte rechtzeitig bei unserem Ticketservice.",
        ],
      },
      {
        q: "Gibt es Ermäßigungen?",
        a: [
          "Ja. Bei unseren Mittagsshows gibt es Ermäßigungen für Kinder bis 14 Jahre.",
          "Für Schulausflüge bieten wir nach Verfügbarkeit besondere Kontingente an. Bitte melde dich dafür direkt bei uns per E-Mail oder telefonisch.",
          "Wenn du einen Schwerbehindertenausweis mit Merkzeichen B hast, ist die Begleitperson kostenlos. Bitte buche in diesem Fall nicht einfach online, sondern melde dich vorab per E-Mail oder telefonisch bei uns, damit wir alles passend vorbereiten können.",
        ],
      },
      {
        q: "Kann ich Gutscheine kaufen?",
        a: [
          "Ja. Du kannst online Wertgutscheine kaufen. Unsere Gutscheine sind für alle Shows einlösbar und zeitlich nicht begrenzt.",
          "Du kannst Wertgutscheine auch für Magic-Menüs verwenden, wenn du das Menü online zusammen mit deinem Showticket buchst.",
          "Wichtig: Wertgutscheine können nicht direkt vor Ort im Restaurant eingelöst werden, sondern nur online im Buchungsprozess.",
        ],
      },
    ],
  },
  {
    title: "Magic-Menü, Snacks & Getränke",
    items: [
      {
        q: "Kann ich vor der Show essen?",
        a: [
          "Ja. In Verbindung mit einem Showticket kannst du unser Magic-Menü buchen: ein besonderes Menü für deinen magischen Abend – inklusive Welcome Drink.",
          "Das Magic-Menü ist aktuell für 69 € buchbar und wird passend zu deinem Showbesuch geplant.",
        ],
      },
      {
        q: "Wie buche ich das Magic-Menü?",
        a: [
          "Am einfachsten buchst du dein Magic-Menü direkt online im Ticketshop zusammen mit deinen Showtickets.",
          "Du kannst dich aber auch telefonisch bei uns melden. Online ist in der Regel der schnellste und einfachste Weg.",
        ],
      },
      {
        q: "Kann ich auch ohne Showticket im Restaurant essen?",
        a: [
          "Ja, das ist möglich. Ohne Showticket buchst du allerdings kein Magic-Menü, sondern besuchst die ausgezeichnete Signature Cuisine von Osman Kavak.",
          "Bitte reserviere dafür direkt im Restaurant.",
        ],
      },
      {
        q: "Gibt es Snacks in der Pause?",
        a: [
          "Ja. An unserer Magic Bar kannst du Snacks vorbestellen – zum Beispiel unsere leckere Zauberschnitte (Pinsa) für die Pause.",
          "So ist dein Snack vorbereitet und du kannst die Pause ganz entspannt genießen.",
        ],
      },
      {
        q: "Kann ich Allergien oder Unverträglichkeiten angeben?",
        a: [
          "Ja. Bitte gib Allergien, Unverträglichkeiten oder besondere Hinweise direkt bei der Buchung an. So können wir deinen Besuch bestmöglich vorbereiten.",
        ],
      },
      {
        q: "Wie kann ich im Theater bezahlen?",
        a: ["Im Theaterbereich ist Zahlung ausschließlich mit Karte möglich."],
      },
    ],
  },
  {
    title: "Barrierefreiheit",
    items: [
      {
        q: "Ist das Florian Zimmer Theater barrierefrei?",
        a: [
          "Ja. Barrierefreiheit ist uns besonders wichtig.",
          "Das Florian Zimmer Theater wurde vom Freistaat Bayern mit dem Signet „Bayern barrierefrei“ gewürdigt, weil unsere Barrierefreiheit über das übliche Maß hinausgeht.",
          "Unser Ziel ist, dass möglichst viele Menschen einen wunderschönen, entspannten und magischen Abend bei uns erleben können.",
        ],
      },
      {
        q: "Gibt es Rollstuhlplätze?",
        a: [
          "Ja. Wir haben Rollstuhlplätze im Theater.",
          "Bitte melde dich vor der Buchung per E-Mail oder telefonisch bei uns, damit wir die passenden Plätze für dich reservieren und deinen Besuch optimal vorbereiten können.",
        ],
      },
      {
        q: "Gibt es barrierefreie Toiletten?",
        a: ["Ja. Im Florian Zimmer Theater gibt es barrierefreie Toiletten."],
      },
      {
        q: "Ist eine Begleitperson kostenlos?",
        a: [
          "Ja. Wenn du einen Schwerbehindertenausweis mit Merkzeichen B hast, ist deine Begleitperson kostenlos.",
          "Bitte melde dich in diesem Fall per E-Mail oder telefonisch bei uns, damit wir die Buchung korrekt für dich vorbereiten können.",
        ],
      },
      {
        q: "Gibt es einen Behindertenparkplatz?",
        a: ["Ja. Direkt am Theater gibt es einen Behindertenparkplatz."],
      },
    ],
  },
  {
    title: "Anfahrt & Parken",
    items: [
      {
        q: "Wo befindet sich das Florian Zimmer Theater?",
        a: [
          "Du findest uns hier:",
          "Florian Zimmer Theater, Grethe-Weiser-Straße 2/1, 89231 Neu-Ulm",
        ],
      },
      {
        q: "Gibt es Parkplätze am Theater?",
        a: [
          "Direkt am Theater gibt es nur begrenzt kostenlose Parkmöglichkeiten.",
          "Wenn du ganz entspannt ankommen möchtest, kannst du dir im Bestellprozess einen reservierten VIP-Parkplatz für 15 € sichern. Dieser Parkplatz ist für dich reserviert – inklusive Namensbranding.",
          "In der Umgebung gibt es außerdem öffentlichen Parkraum und ein Parkhaus nebenan. Bitte beachte: Das Parkhaus gehört nicht zum Theater und ist kostenpflichtig. Wenn du länger bleibst, zum Beispiel für Menü und Show, kann der VIP-Parkplatz oft die entspanntere Wahl sein.",
        ],
      },
      {
        q: "Wie komme ich mit öffentlichen Verkehrsmitteln zum Theater?",
        a: [
          "Du erreichst uns bequem mit der Linie 5 aus Ulm und Neu-Ulm. Vom Ulmer Hauptbahnhof kommst du ohne Umstieg in unsere Nähe.",
          "Je nach Verbindung und aktueller Linienführung steigst du an Grethe-Weiser-Straße, Memminger Straße, Arena oder einer nahegelegenen Haltestelle aus.",
          "Da es im ÖPNV immer wieder Baustellen oder Änderungen geben kann, empfehlen wir dir, vor der Fahrt kurz die aktuelle Verbindung in der Fahrplanauskunft zu prüfen.",
        ],
      },
    ],
  },
  {
    title: "Gruppen, Firmen & besondere Anlässe",
    items: [
      {
        q: "Kann man das Florian Zimmer Theater für Firmenveranstaltungen buchen?",
        a: [
          "Ja. Das Florian Zimmer Theater ist ideal für Firmenfeiern, Weihnachtsfeiern, Kundenevents, Mitarbeiterevents und besondere Abende mit Kollegen, Kunden oder Geschäftspartnern.",
          "Bei uns bekommt ihr Show, Dinner, Bar, Atmosphäre und Eventbetreuung unter einem Dach.",
        ],
      },
      {
        q: "Kann man Tickets als Mitarbeitergeschenk kaufen?",
        a: [
          "Ja. Tickets für das Florian Zimmer Theater sind ein außergewöhnliches Mitarbeitergeschenk – persönlich, hochwertig und unvergesslich.",
          "Auch größere Ticketpakete sind möglich. Für Firmen können wir individuelle Angebote erstellen und die Buchung passend vorbereiten.",
          "Je nach Anlass und Gestaltung können solche Mitarbeitergeschenke steuerlich interessant sein. Bitte kläre die Details im Einzelfall mit deinem Steuerberater.",
        ],
      },
      {
        q: "Kann man das Theater exklusiv buchen?",
        a: [
          "Ja. Für besondere Veranstaltungen kann das Florian Zimmer Theater auch exklusiv gebucht werden.",
          "Ob Firmenfeier, Weihnachtsfeier, Geburtstag, Hochzeit, Kundenevent oder ein ganz besonderer Abend: Wir entwickeln gemeinsam mit dir den passenden Ablauf.",
        ],
      },
      {
        q: "Wie frage ich eine Firmenveranstaltung oder ein Gruppenevent an?",
        a: [
          "Schreib uns gerne an tickets@florianzimmer.com oder ruf uns an: 0731 7906 110.",
          "Wir beraten dich gerne und erstellen dir ein individuelles Angebot.",
        ],
      },
    ],
  },
];

// E-Mail & Telefon in Antworten automatisch klickbar machen
function linkify(text: string) {
  const parts = text.split(/(tickets@florianzimmer\.com|0731 7906 110)/g);
  return parts.map((p, i) => {
    if (p === "tickets@florianzimmer.com")
      return <a key={i} href="mailto:tickets@florianzimmer.com">{p}</a>;
    if (p === "0731 7906 110")
      return <a key={i} href="tel:+497317906110">{p}</a>;
    return <Fragment key={i}>{p}</Fragment>;
  });
}

export default function FaqPage() {
  return (
    <main className="faq-page">
      <Link href="/" className="legal-back">← Zurück zur Startseite</Link>
      <span className="faq-eyebrow">Häufige Fragen</span>
      <h1>Gut zu wissen, bevor die Magie beginnt</h1>
      <p className="faq-intro">
        Du planst deinen Besuch im Florian Zimmer Theater? Hier findest du die wichtigsten
        Antworten rund um Tickets, Showbesuch, Menü, Anfahrt, Barrierefreiheit und besondere
        Anlässe. Unser Ziel ist einfach: Du sollst dich schon vor deinem Besuch gut aufgehoben
        fühlen – und dich auf einen unglaublich schönen Abend voller Unterhaltung, Glück und
        Magie freuen.
      </p>

      {FAQ.map(cat => (
        <section key={cat.title} className="faq-cat">
          <h2>{cat.title}</h2>
          {cat.items.map(item => (
            <details key={item.q} className="faq-item">
              <summary>
                <span>{item.q}</span>
                <span className="faq-icon" aria-hidden>+</span>
              </summary>
              <div className="faq-answer">
                {item.a.map((p, i) => <p key={i}>{linkify(p)}</p>)}
              </div>
            </details>
          ))}
        </section>
      ))}

      <div className="faq-contact">
        <p>Deine Frage war nicht dabei?</p>
        <p>
          Schreib uns an <a href="mailto:tickets@florianzimmer.com">tickets@florianzimmer.com</a> oder
          ruf an unter <a href="tel:+497317906110">0731 7906 110</a> – wir helfen dir gerne weiter.
        </p>
      </div>

      <Link href="/" className="legal-back legal-back--bottom">← Zurück zur Startseite</Link>
    </main>
  );
}
