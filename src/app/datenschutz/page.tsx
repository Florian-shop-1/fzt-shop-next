import Link from "next/link";

export const metadata = { title: "Datenschutz — Florian Zimmer Theater" };

export default function DatenschutzPage() {
  return (
    <main className="legal-page">
      <Link href="/" className="legal-back">← Zurück zur Startseite</Link>
      <h1>Datenschutzerklärung</h1>
      <p className="legal-intro">
        Diese Datenschutzerklärung klärt Sie über die Art, den Umfang und Zweck der Verarbeitung
        von personenbezogenen Daten (nachfolgend kurz „Daten") im Rahmen unseres Onlineangebotes
        und der mit ihm verbundenen Webseiten, Funktionen und Inhalte auf. Im Hinblick auf die
        verwendeten Begrifflichkeiten verweisen wir auf die Definitionen in Art. 4 der
        Datenschutz-Grundverordnung (DSGVO).
      </p>

      <h2>Verantwortlicher</h2>
      <address>
        Florian Zimmer Theater<br />
        Grethe-Weiser-Str. 2/1<br />
        89231 Neu-Ulm
      </address>
      <address>
        Florian Zimmer Theater GmbH<br />
        Ringstraße 24<br />
        89185 Hüttisheim
      </address>
      <p>
        Vertreten durch Geschäftsführer: Florian Zimmer<br />
        E-Mail: <a href="mailto:tickets@florianzimmer.com">tickets@florianzimmer.com</a>
      </p>

      <h2>Arten der verarbeiteten Daten</h2>
      <ul>
        <li>Bestandsdaten (z. B. Namen, Adressen)</li>
        <li>Kontaktdaten (z. B. E-Mail, Telefonnummern)</li>
        <li>Inhaltsdaten (z. B. Texteingaben in Formularen)</li>
        <li>Vertrags- und Zahlungsdaten (z. B. im Rahmen von Ticketbuchungen)</li>
        <li>Nutzungsdaten (z. B. besuchte Webseiten, Zugriffszeiten)</li>
        <li>Meta-/Kommunikationsdaten (z. B. Geräte-Informationen, IP-Adressen)</li>
      </ul>

      <h2>Kategorien betroffener Personen</h2>
      <p>Besucher und Nutzer des Onlineangebotes (nachfolgend „Nutzer").</p>

      <h2>Zweck der Verarbeitung</h2>
      <ul>
        <li>Zurverfügungstellung des Onlineangebotes, seiner Funktionen und Inhalte</li>
        <li>Abwicklung von Ticketbuchungen und vertraglichen Leistungen</li>
        <li>Beantwortung von Kontaktanfragen und Kommunikation mit Nutzern</li>
        <li>Sicherheitsmaßnahmen</li>
      </ul>

      <h2>Maßgebliche Rechtsgrundlagen</h2>
      <p>
        Nach Maßgabe des Art. 13 DSGVO teilen wir Ihnen die Rechtsgrundlagen unserer
        Datenverarbeitungen mit. Soweit die Rechtsgrundlage nicht genannt wird, gilt Folgendes:
        Die Rechtsgrundlage für Einwilligungen ist Art. 6 Abs. 1 lit. a und Art. 7 DSGVO; für die
        Verarbeitung zur Erfüllung unserer Leistungen und Durchführung vertraglicher Maßnahmen
        sowie zur Beantwortung von Anfragen ist Art. 6 Abs. 1 lit. b DSGVO; für die Erfüllung
        rechtlicher Verpflichtungen Art. 6 Abs. 1 lit. c DSGVO; und zur Wahrung unserer
        berechtigten Interessen Art. 6 Abs. 1 lit. f DSGVO.
      </p>

      <h2>Sicherheitsmaßnahmen</h2>
      <p>
        Wir treffen nach Maßgabe der gesetzlichen Vorgaben unter Berücksichtigung des Stands der
        Technik geeignete technische und organisatorische Maßnahmen, um ein dem Risiko
        angemessenes Schutzniveau zu gewährleisten. Hierzu gehört insbesondere die Sicherung der
        Vertraulichkeit, Integrität und Verfügbarkeit der Daten durch eine verschlüsselte
        Übertragung (SSL/TLS) sowie durch Kontrolle des Zugriffs auf die Daten.
      </p>

      <h2>Zusammenarbeit mit Auftragsverarbeitern und Dritten</h2>
      <p>
        Sofern wir Daten gegenüber anderen Personen und Unternehmen offenbaren, sie an diese
        übermitteln oder ihnen sonst Zugriff gewähren, erfolgt dies nur auf Grundlage einer
        gesetzlichen Erlaubnis (z. B. wenn eine Übermittlung an Dritte wie Zahlungsdienstleister
        zur Vertragserfüllung erforderlich ist), aufgrund einer Einwilligung, einer rechtlichen
        Verpflichtung oder auf Grundlage unserer berechtigten Interessen.
      </p>

      <h2>Rechte der betroffenen Personen</h2>
      <p>
        Sie haben das Recht, eine Bestätigung darüber zu verlangen, ob betreffende Daten
        verarbeitet werden, sowie ein Recht auf Auskunft, Berichtigung, Löschung bzw.
        Einschränkung der Verarbeitung, ein Recht auf Datenübertragbarkeit sowie ein
        Beschwerderecht bei der zuständigen Aufsichtsbehörde.
      </p>

      <h2>Widerrufs- und Widerspruchsrecht</h2>
      <p>
        Sie haben das Recht, erteilte Einwilligungen mit Wirkung für die Zukunft zu widerrufen.
        Sie können der künftigen Verarbeitung der Sie betreffenden Daten nach Maßgabe der
        gesetzlichen Vorgaben jederzeit widersprechen, insbesondere gegen die Verarbeitung für
        Zwecke der Direktwerbung.
      </p>

      <h2>Cookies</h2>
      <p>
        Als „Cookies" werden kleine Dateien bezeichnet, die auf den Geräten der Nutzer
        gespeichert werden. Wir setzen technisch notwendige Cookies ein, um den Betrieb des
        Onlineangebotes und des Buchungsprozesses zu gewährleisten (z. B. Speichern des
        Warenkorb- oder Login-Status). Falls Sie nicht möchten, dass Cookies gespeichert werden,
        können Sie die entsprechende Option in den Systemeinstellungen Ihres Browsers
        deaktivieren. Der Ausschluss von Cookies kann zu Funktionseinschränkungen führen.
      </p>

      <h2>Löschung von Daten</h2>
      <p>
        Die von uns verarbeiteten Daten werden nach Maßgabe der gesetzlichen Vorgaben gelöscht,
        sobald sie für ihre Zweckbestimmung nicht mehr erforderlich sind und der Löschung keine
        gesetzlichen Aufbewahrungspflichten entgegenstehen (z. B. handels- oder steuerrechtliche
        Aufbewahrungspflichten).
      </p>

      <h2>Hosting und E-Mail-Versand</h2>
      <p>
        Die von uns in Anspruch genommenen Hosting-Leistungen dienen der Zurverfügungstellung von
        Infrastruktur- und Plattformdienstleistungen, Rechenkapazität, Speicherplatz, E-Mail-Versand
        sowie technischen Wartungsleistungen. Hierbei verarbeiten wir bzw. unser Hostinganbieter
        Bestands-, Kontakt-, Inhalts-, Vertrags-, Nutzungs- sowie Meta- und Kommunikationsdaten auf
        Grundlage unserer berechtigten Interessen an einer effizienten und sicheren
        Zurverfügungstellung dieses Onlineangebotes gem. Art. 6 Abs. 1 lit. f DSGVO i. V. m. Art. 28
        DSGVO.
      </p>

      <h2>Erhebung von Zugriffsdaten und Logfiles</h2>
      <p>
        Wir bzw. unser Hostinganbieter erheben auf Grundlage unserer berechtigten Interessen gem.
        Art. 6 Abs. 1 lit. f DSGVO Daten über jeden Zugriff auf den Server (Serverlogfiles). Zu den
        Zugriffsdaten gehören Name der abgerufenen Webseite, Datei, Datum und Uhrzeit des Abrufs,
        übertragene Datenmenge, Browsertyp und -version, Betriebssystem, Referrer-URL, IP-Adresse
        und der anfragende Provider. Logfile-Informationen werden aus Sicherheitsgründen für die
        Dauer von maximal 7 Tagen gespeichert und anschließend gelöscht.
      </p>

      <h2>Online-Bezahlung und Ticketing</h2>
      <p>
        Für die Abwicklung von Buchungen und Zahlungen setzen wir Zahlungsdienstleister ein. Die
        Eingabe Ihrer Zahlungsdaten erfolgt verschlüsselt direkt beim jeweiligen
        Zahlungsdienstleister; wir selbst speichern keine vollständigen Zahlungsdaten. Die
        Verarbeitung erfolgt zur Vertragserfüllung gem. Art. 6 Abs. 1 lit. b DSGVO.
      </p>

      <h2>YouTube</h2>
      <p>
        Wir binden Videos der Plattform „YouTube" des Anbieters Google Ireland Limited, Gordon
        House, Barrow Street, Dublin 4, Irland ein. Datenschutzerklärung:{" "}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">https://policies.google.com/privacy</a>.
      </p>

      <h2>Google Fonts</h2>
      <p>
        Wir binden Schriftarten („Google Fonts") des Anbieters Google Ireland Limited ein. Die
        Einbindung erfolgt auf Grundlage unserer berechtigten Interessen an einer technisch
        sicheren und einheitlichen Darstellung. Datenschutzerklärung:{" "}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">https://policies.google.com/privacy</a>.
      </p>

      <h2>Google Maps</h2>
      <p>
        Wir binden die Landkarten des Dienstes „Google Maps" des Anbieters Google Ireland Limited
        ein. Zu den verarbeiteten Daten können insbesondere IP-Adressen und Standortdaten der
        Nutzer gehören. Datenschutzerklärung:{" "}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">https://policies.google.com/privacy</a>.
      </p>

      <h2>Google-Bewertungen (Trustindex)</h2>
      <p>
        Zur Anzeige unserer Google-Bewertungen setzen wir das Widget des Anbieters Trustindex.io
        (Trustindex Ltd.) ein. Beim Aufruf der Seite wird dazu ein Skript von{" "}
        <code>cdn.trustindex.io</code> geladen; dabei kann die IP-Adresse der Nutzer an den Anbieter
        übertragen werden. Die Einbindung erfolgt auf Grundlage unserer berechtigten Interessen an
        der Darstellung authentischer Gästebewertungen gem. Art. 6 Abs. 1 lit. f DSGVO.
        Datenschutzerklärung:{" "}
        <a href="https://www.trustindex.io/privacy-policy/" target="_blank" rel="noopener noreferrer">https://www.trustindex.io/privacy-policy/</a>.
      </p>

      <h2>Onlinepräsenzen in sozialen Medien</h2>
      <p>
        Wir unterhalten Onlinepräsenzen innerhalb sozialer Netzwerke (u. a. Instagram, TikTok,
        YouTube, Facebook), um mit dort aktiven Kunden, Interessenten und Nutzern zu kommunizieren
        und über unsere Leistungen zu informieren. Dabei können Daten der Nutzer außerhalb der EU
        verarbeitet werden. Die Verarbeitung erfolgt auf Grundlage unserer berechtigten Interessen
        gem. Art. 6 Abs. 1 lit. f DSGVO. Auskunftsanfragen und die Geltendmachung von Nutzerrechten
        können am effektivsten bei den jeweiligen Anbietern geltend gemacht werden.
      </p>

      <h2>Änderungen und Aktualisierungen</h2>
      <p>
        Wir bitten Sie, sich regelmäßig über den Inhalt unserer Datenschutzerklärung zu
        informieren. Wir passen sie an, sobald Änderungen der von uns durchgeführten
        Datenverarbeitungen dies erforderlich machen.
      </p>

      <Link href="/" className="legal-back legal-back--bottom">← Zurück zur Startseite</Link>
    </main>
  );
}
