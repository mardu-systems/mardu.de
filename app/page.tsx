'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useRef } from 'react';
import CircleNumber from '@/components/circle-number';
import DashedConnector from '@/components/dashed-connector';
import HeroSection from '@/components/utilities/hero-section';
import CTASection from '@/components/utilities/cta-section';
import FeatureSection from '@/components/utilities/feature-section';
import DualImageSection from '@/components/utilities/dual-image-section';
import ThreeArguments from '@/components/utilities/three-arguments';
import Foerderung from '@/components/utilities/foerderung';
import TripleImageSection from '@/components/utilities/triple-image-section';
import Link from 'next/link';

/* ===================== Seite ===================== */

export default function HomePage() {
  const timelineRef = useRef<HTMLDivElement>(null);

  return (
    <main className="relative min-h-screen bg-[#F5F6F7] flex flex-col justify-center md:justify-start">
      {/* Hero Header Section */}
      <section id="home">
        <HeroSection
          title="Mardu – smarte Zugangssysteme für Baustellen, Werkstätten und Labore"
          description={
            <>
              <p className="mb-4">
                Mit Mardu verwalten Verantwortliche Zutritt und Maschinennutzung: Wer darf wann welche Tür öffnen und welche Maschine nutzen – von der Werkstatt bis zur Baustelle.
              </p>
            </>
          }
          buttonText="Mehr zu mardu.space"
          buttonHref="https://mardu.space"
          secondaryButtonText="Mehr zu mardu.construction"
          secondaryButtonHref="/#produkte"
          imageSrc="/_A7_9072_quer.jpg"
          imageAlt="Zugriffskontrollsysteme im Makerspace"
        />
      </section>

      <section id="plattform">
        <FeatureSection
          title="Die Mardu-Plattform"
          description={
            <>
              <p>
                Mardu ist eine modulare, skalierbare Plattform für moderne Zutritts- und Nutzungskontrolle.
                Sie verbindet zentrale Software mit flexibler Hardware, sodass sich unterschiedliche Einsatzszenarien
                abbilden lassen – von Innenräumen bis zu temporären Standorten.<br></br><br></br>
                Mit Mardu verwalten Verantwortliche Zugänge und Ressourcen wie Türen, Tore, Maschinen,
                Flächen und sicherheitsrelevante Bereiche zentral. Berechtigungen lassen sich zeitlich,
                personenbezogen oder projektbezogen vergeben – manuell, automatisiert oder regelbasiert.<br></br><br></br>
                Alle Vorgänge werden nachvollziehbar protokolliert: Wer hatte wann worauf Zugriff, wo fand die Nutzung statt
                und wie lange. So reduziert Mardu Schlüsselverwaltung und papierbasierte Nachweise – bei gleichzeitig höherer
                Transparenz und klaren Verantwortlichkeiten.
              </p>
            </>
          }
          imageSrc="/Mardu-System.jpeg"
          imageAlt="Mardu System"
          className="mb-20"
        />
      </section>

      <section id="produkte">
        <DualImageSection
          cards={[
            {
              imageSrc: "/mardu-space.jpeg",
              imageAlt: "Zugriffskontrolle",
              title: "mardu.space",
              description: (
                <>
                  <p>Makerspaces und FabLabs eröffnen kreative Möglichkeiten, bringen aber auch Risiken durch leistungsstarke Maschinen mit sich. Besonders beim Zugang für Minderjährige ist klare Verantwortung gefragt.</p>
                  <p>Das mardu.space System sorgt mit eigener Hard- und Software sowie einer europaweit anerkannten Kenntnisdatenbank (Open Education Badges) für sichere Zutritts- und Zugriffskontrollen. So werden nur geschulte Nutzer freigeschaltet – und ihre Qualifikationen lassen sich standortübergreifend einsetzen.</p>
                </>
              ),
              buttonText: "Mehr erfahren",
              buttonHref: "https://mardu.space"
            },
            {
              imageSrc: "/mardu-constructions.jpg",
              imageAlt: "Maschinenfreigabe",
              title: "mardu.construction (Early Access)",
              description: (
                <>
                  <p>Digitale Zutrittskontrolle für Baustellen, Container und temporäre Infrastruktur ermöglicht eine sichere und effiziente Verwaltung aller Zugänge – auch in dynamischen, wechselnden Umgebungen. Zugriffsrechte für Subunternehmer, Lieferanten und Mitarbeitende lassen sich gezielt vergeben, zeitlich begrenzen und jederzeit anpassen.</p>
                  <p>mardu.construction befindet sich aktuell im Early-Access-Projektstadium. Funktionen werden gemeinsam mit ersten Anwendern erprobt, weiterentwickelt und gezielt an reale Baustellenanforderungen angepasst.</p>
                </>
              )
            }
          ]}
        />
      </section>

      <section id="argumente">
        <ThreeArguments
          className="mt-12"
          title={<span>3 Vorteile bei dem Einsatz von Mardu</span>}
          items={[
            {
              title: 'Mehr Sicherheit',
              description: (
                <>
                  Unbefugte Zugriffe werden zuverlässig verhindert.
                  Jeder Zutritt oder jede Benutzung einer Maschine ist personen- und zeitbezogen geregelt
                  und lückenlos dokumentiert.
                </>
              ),
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none"
                  stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  className="lucide lucide-heart-handshake-icon lucide-heart-handshake">
                  <path d="M19.414 14.414C21 12.828 22 11.5 22 9.5a5.5 5.5 0 0 0-9.591-3.676.6.6 0 0 1-.818.001A5.5 5.5 0 0 0 2 9.5c0 2.3 1.5 4 3 5.5l5.535 5.362a2 2 0 0 0 2.879.052 2.12 2.12 0 0 0-.004-3 2.124 2.124 0 1 0 3-3 2.124 2.124 0 0 0 3.004 0 2 2 0 0 0 0-2.828l-1.881-1.882a2.41 2.41 0 0 0-3.409 0l-1.71 1.71a2 2 0 0 1-2.828 0 2 2 0 0 1 0-2.828l2.823-2.762" />
                </svg>
              ),
            },
            {
              title: 'Klare Regeln & weniger Aufwand',
              description: (
                <>
                  Zugangsrechte lassen sich flexibel vergeben, ändern oder entziehen – ganz ohne Schlüssel,
                  Schlössertausch oder manuelle Listen.
                </>
              ),
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none"
                  stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  className="lucide lucide-milestone-icon lucide-milestone"><path d="M12 13v8" />
                  <path d="M12 3v3" /><path d="M4 6a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h13a2 2 0 0 0 1.152-.365l3.424-2.317a1 1 0 0 0 0-1.635l-3.424-2.318A2 2 0 0 0 17 6z" />
                </svg>
              ),
            },
            {
              title: 'Transparenz & Nachvollziehbarkeit',
              description: (
                <>
                  Alle Zutritte oder Zugriffe werden protokolliert. So ist jederzeit ersichtlich, wer welche Tür,
                  welches Tor welche Zone betreten oder Maschine gestartet hat – wichtig für Haftung, Audits und Organisation.
                </>
              ),
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none"
                  stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  className="lucide lucide-file-search-corner-icon lucide-file-search-corner">
                  <path d="M11.1 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.589 3.588A2.4 2.4 0 0 1 20 8v3.25" /><path d="M14 2v5a1 1 0 0 0 1 1h5" /><path d="m21 22-2.88-2.88" /><circle cx="16" cy="17" r="3" />
                </svg>
              ),
            },
          ]}
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

      <TripleImageSection
        cards={[
          {
            imageSrc: "/people/Bild2.jpg",
            imageAlt: 'Luca Schöneberg',
            title: 'Luca Schöneberg',
            subtitle: '(Co-Founder)',
            linkedinUrl: 'https://www.linkedin.com/in/luca-sch%C3%B6neberg-150348186',
            email: 'luca.schoeneberg@mardu.de',
            description: (
              <>
                <p>
                  Luca studierte Medieninformatik an der Hochschule Osnabrück und machte zuvor
                  eine Ausbildung zum Fachinformatiker für Systemintegration. Bei Mardu arbeitet er
                  an Web-, App- und Backend-Themen sowie an Nutzer- und Rechteverwaltung.
                </p>
              </>
            )
          },
          {
            imageSrc: "/people/Erik.jpeg",
            imageAlt: 'Labore und Forschungseinrichtungen',
            title: 'Erik Frey',
            subtitle: '(Co-Founder)',
            objectPosition: 'center 55%',
            linkedinUrl: 'https://www.linkedin.com/in/erik-frey-660236346',
            email: 'erik.frey@mardu.de',
            description: (
              <>
                <p>
                  Erik studierte Elektrotechnik und Informationstechnik am Karlsruher Institut für Technologie.
                  Bei Mardu beschäftigt er sich mit Embedded Software und Hardware-Entwicklung.
                </p>
              </>
            )
          },
          {
            imageSrc: "/people/Bild1.jpg",
            imageAlt: 'Melvin Valerius',
            title: 'Melvin Valerius',
            subtitle: '(kauf. Leiter)',
            email: 'melvin.valerius@mardu.de',
            description: (
              <>
                <p>
                  Melvin studiert Volkswirtschaftslehre an der Universität Münster und absolvierte zuvor
                  eine Ausbildung zum Industriekaufmann. Bei Mardu kümmert er sich um kaufmännische Themen
                  wie Finanzen, Buchhaltung und Controlling.
                </p>
              </>
            )
          }
        ]}
      />

      <section id="contact">
        <CTASection
          title="Sicherheit, Transparenz und Kontrolle – zentral gesteuert"
          description="Mit Mardu behalten Betreiber volle Kontrolle über Zugänge, Maschinen und Flächen – ohne aufwändige Schlüsselverwaltung, mit lückenloser Dokumentation und flexiblen Rechte-Modellen. Erfahren Sie, wie Makerspaces, Baustellen und Labore von intelligenten Zutrittssystemen profitieren."
          primaryButtonText="Jetzt für unseren Newsletter anmelden"
          primaryButtonHref="https://flow.cleverreach.com/fl/27df128d-415e-4904-bc2a-29dedd704f6f/"
          secondaryButtonText="Beratung Vereinbaren"
          secondaryButtonHref="/contact"
        />
      </section>

    </main>
  );
}
