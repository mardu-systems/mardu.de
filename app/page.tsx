import HeroSection from '@/components/utilities/hero-section';
import CTASection from '@/components/utilities/cta-section';
import FeatureSection from '@/components/utilities/feature-section';
import DualImageSection from '@/components/utilities/dual-image-section';
import ThreeArguments from '@/components/utilities/three-arguments';
import Foerderung from '@/components/utilities/foerderung';
import TripleImageSection from '@/components/utilities/triple-image-section';
import { FileSearchCorner, HeartHandshake, Milestone } from 'lucide-react';

/* ===================== Seite ===================== */

export default function HomePage() {
  return (
    <main className="relative min-h-screen flex flex-col justify-center md:justify-start">
      {/* Hero Header Section */}
      <section id="home">
        <HeroSection
          title="Smarte Zugangssysteme für Baustellen, Werkstätten und Labore"
          description={
            <>
              <p className="mb-4">
                Verwalte Zutritt und Maschinennutzung – mobil auf der Baustelle oder stationär in
                der Werkstatt.
                <br />
                Mardu passt sich an deine Bedürfnisse an.
              </p>
            </>
          }
          buttonText="Lösungen für Werkstätten"
          buttonHref="https://mardu.space"
          secondaryButtonText="Lösungen für Baustellen"
          secondaryButtonHref="/#produkte"
          imageSrc="/_A7_9072_quer.webp"
          imageAlt="Zugriffskontrollsysteme im Makerspace"
        />
      </section>

      <section id="loesung">
        <FeatureSection
          className="text-white mb-20"
          title="Die Mardu-Lösung"
          description={
            <>
              <p>
                Wir sind eine flexible, funkbasierte Lösung für die Zugriffs- und Zutrittskontrolle.
                Alle Endgeräte sind per Funk vernetzt und dank Dual-Band-Mesh-Technologie
                hochausfallsicher. Mardu kann zentral verwaltet oder vollständig lokal betrieben
                werden und deckt so verschiedenste Einsatzszenarien ab – von permanenter
                Installation bis temporärem Setup.
              </p>
              <p className="mt-4">
                Ideal für Innen- und Außenbereiche sowie temporäre Setups (z. B. Festivals). Sichern
                Sie damit Türen, Tore, Drehkreuze, Maschinenzugänge und weitere kritische Bereiche.
              </p>
              <p className="mt-4">
                Alle Vorgänge werden nachvollziehbar und DSGVO-konform protokolliert. Dadruch
                reduzieren wir deine Bürokratie.
              </p>

              <p className="mt-4">
                Egal, ob von der Stange oder als Speziallösung – wir sind dein Ansprechpartner.
              </p>
            </>
          }
          imageSrc="/Mardu-System.webp"
          imageAlt="Mardu System"
          buttonText="Kontaktiere uns"
          buttonHref="/contact"
        />
      </section>

      <section id="produkte">
        <DualImageSection
          cards={[
            {
              imageSrc: '/mardu-space.webp',
              imageAlt: 'Zugriffskontrolle',
              title: 'mardu.space',
              description: (
                <>
                  <p>
                    Werkstätten, Produktionshallen und Labore sind Orte der täglichen Arbeit bieten
                    aber auch enormes Gefahrenpotential.
                  </p>
                  <p className="mt-4">
                    Durch mardu.space wird mit dem Mardu System sichergestellt, dass nur berechtigte
                    Nutzer Zugriff auf die Maschinen haben. Anwendung findet dieses System vorallem
                    in Makerspaces, Schülerlaboren und Universitäten aber auch in größeren
                    Produzierenden Betrieben oder Werkstätten mit mehreren Hunderten Geräten.
                  </p>
                </>
              ),
              buttonText: 'Mehr erfahren',
              buttonHref: 'https://mardu.space',
            },
            {
              imageSrc: '/mardu-constructions.webp',
              imageAlt: 'Maschinenfreigabe',
              title: 'mardu.construction (Early Access)',
              description: (
                <>
                  <p>
                    Digitale flexible und skalierbare Zutrittskontrollen für Baustellen das ist
                    mardu.construction. Hierdurch erlangt vollständige Kontrolle und Übersicht über
                    alle Bereiche, Lieferanten, Subunternehmer und Mitarbeitende auf der Baustelle.
                    Gleichzeitig kann sich effektiv vor Diebstahl und Zeitverzögerungen geschützt
                    werden.
                  </p>
                  <p className="mt-4">
                    mardu.construction befindet sich aktuell im Early-Access-Projektstadium.
                    Funktionen werden gemeinsam mit ersten Anwendern erprobt, weiterentwickelt und
                    gezielt an reale Baustellenanforderungen angepasst.
                  </p>
                </>
              ),
            },
          ]}
        />
      </section>

      <section id="argumente">
        <ThreeArguments
          className="mt-12"
          title={<span>Drei Vorteile beim Einsatz von Mardu</span>}
          items={[
            {
              title: 'Mehr Sicherheit & Nachvollziehbarkeit',
              description: (
                <>
                  Unbefugte Zugriffe werden zuverlässig verhindert. Jeder Zutritt oder jede
                  Benutzung einer Maschine ist personen- und zeitbezogen geregelt und lückenlos
                  dokumentiert.
                </>
              ),
              icon: <HeartHandshake className="text-[#351B59]" size="72" />,
            },
            {
              title: 'Klare Regeln & weniger Aufwand',
              description: (
                <>
                  Berechtigungen lassen sich flexibel von überall vergeben, ändern oder entziehen.
                  Ganz ohne Schlüssel, Schlössertausch oder manuelle Listen.
                </>
              ),
              icon: <Milestone className="text-[#351B59]" size="72" />,
            },
            {
              title: 'Lokal und Zentral verwaltbar',
              description: (
                <>
                  Alle Berechtigungen werden vor Ort zentral gespeichert und verwaltet. Gleichzeitig
                  kann alles über Fernzugriff verwaltet werden. Hierdurch kann höchste
                  Ausfallsicherheit bei gleichzeitiger Flexibilität gewährleistet werden.
                </>
              ),
              icon: <FileSearchCorner className="text-[#351B59]" size="72" />,
            },
          ]}
        />
      </section>

      <TripleImageSection
        cards={[
          {
            imageSrc: '/people/Bild2.webp',
            imageAlt: 'Luca Schöneberg',
            title: 'Luca Schöneberg',
            subtitle: '(Co-Founder)',
            linkedinUrl: 'https://www.linkedin.com/in/luca-sch%C3%B6neberg-150348186',
            email: 'luca.schoeneberg@mardu.de',
            description: (
              <>
                <p>
                  B.Sc. Medieninformatik (Hochschule Osnabrück) und ausgebildeter Fachinformatiker
                  für Systemintegration. Verantwortlich für Web-, App- und Backend-Entwicklung sowie
                  Nutzer- und Rechteverwaltung.
                </p>
              </>
            ),
          },
          {
            imageSrc: '/people/Erik.webp',
            imageAlt: 'Erik Frey',
            title: 'Erik Frey',
            subtitle: '(Co-Founder)',
            linkedinUrl: 'https://www.linkedin.com/in/erik-frey-660236346',
            email: 'erik.frey@mardu.de',
            description: (
              <>
                <p>
                  B.Sc. Elektrotechnik und Informationstechnik (Karlsruher Institut für Technologie,
                  KIT). Verantwortlich für Embedded Software und Hardware-Entwicklung.
                </p>
              </>
            ),
          },
          {
            imageSrc: '/people/Bild1.webp',
            imageAlt: 'Melvin Valerius',
            title: 'Melvin Valerius',
            subtitle: '(kauf. Leiter)',
            email: 'melvin.valerius@mardu.de',
            description: (
              <>
                <p>
                  Studium Volkswirtschaftslehre (Universität Münster) und Ausbildung zum
                  Industriekaufmann. Zuständig für Finanzen, Buchhaltung und Controlling.
                </p>
              </>
            ),
          },
        ]}
      />

      <section id="contact">
        <CTASection
          title="Sicherheit, Transparenz und Kontrolle – zentral gesteuert"
          description="Sprechen sie uns gerne an, gemeinsam lässt sich für die verschiedensten Anwendungsfälle ein Lösung finden."
          primaryButtonText="Jetzt für unseren Newsletter anmelden"
          secondaryButtonText="Beratung Vereinbaren"
        />
      </section>

      <section id="foerderung">
        <Foerderung
          items={[
            {
              href: 'https://www.bmwk.de/',
              src: '/logos/bmwk.svg',
              alt: 'Bundesministerium für Wirtschaft und Klimaschutz',
            },
            {
              href: 'https://www.esf.de/portal/DE/ESF-Plus-2021-2027/Liste-der-Vorhaben/inhalt.html',
              src: '/logos/eu_esf.svg',
              alt: 'Europäische Union – Europäischer Sozialfonds Plus (ESF Plus)',
            },
            {
              href: 'https://www.exist.de/',
              src: '/logos/exist.svg',
              alt: 'EXIST – Existenzgründungen aus der Wissenschaft',
            },
          ]}
          description={
            <>
              Die Europäische Union fördert zusammen mit dem Bundesministerium für Wirtschaft und
              Klimaschutz über den Europäischen Sozialfonds Plus (ESF Plus) das Programm{' '}
              <em>Existenzgründungen aus der Wissenschaft (EXIST)</em> in Deutschland.
            </>
          }
        />
      </section>
    </main>
  );
}
