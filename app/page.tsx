'use client';

import { useRef } from 'react';
import HeroSection from '@/components/utilities/hero-section';
import CTASection from '@/components/utilities/cta-section';
import FeatureSection from '@/components/utilities/feature-section';
import DualImageSection from '@/components/utilities/dual-image-section';
import ThreeArguments from '@/components/utilities/three-arguments';
import Foerderung from '@/components/utilities/foerderung';
import TripleImageSection from '@/components/utilities/triple-image-section';
import Link from 'next/link';
import { FileSearchCorner, HeartHandshake, Milestone } from 'lucide-react';

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
                Mit Mardu verwalten Verantwortliche Zutritt und Maschinennutzung: Wer darf wann
                welche Tür öffnen und welche Maschine nutzen – von der Werkstatt (
                <Link href="#produkte">mardu.space</Link>) bis zur Baustelle (
                <Link href="#produkte">mardu.construction</Link>).
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

      <section id="loesung">
        <FeatureSection
          title="Die Mardu-Lösung"
          description={
            <>
              <p>
                Mardu ist eine flexibel anwendbare funkbasierte Zugriffs- und
                Zutrittskontrolllösung. Alle Endgeräte sind mit einander Funkvernetzt um höchste
                Ausfallsicherheit garantieren zu können. Zentral und Vollständig Lokal kann das
                System verwaltet werden, sodass sich verschiedenste Einsatzszenarien abbilden
                lassen. Von Innen und Außenbereichen bis hin zu temporären Aufbauten wie Festivals.
              </p>
              <p className="mt-4">
                Hierdurch lassen sich verschiedenste Einsatzszenarien abbilden. Von Innen und
                Außenbereichen bis hin zu temporären Aufbauten wie Festivals. Mit Mardu können
                Zutritte zu Türen, Toren und Drehkreuzen sowie Maschinenzugriffe oder jeder andere
                sicherheitsrelevante Bereich gesichert werden.
              </p>
              <p className="mt-4">
                Alle Vorgänge werden werden nachvollziehbar und DSGVO konform protokolliert: So
                reduziert Mardu Schlüsselverwaltung und papierbasierte Nachweise.
              </p>
              <p className="mt-4">
                Sprechen sie uns gerne an, gemeinsam lässt sich für die verschiedensten
                Anwendungsfälle ein Lösung finden.
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
              imageSrc: '/mardu-space.jpeg',
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
              imageSrc: '/mardu-constructions.jpg',
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
            imageSrc: '/people/Bild2.jpg',
            imageAlt: 'Luca Schöneberg',
            title: 'Luca Schöneberg',
            subtitle: '(Co-Founder)',
            linkedinUrl: 'https://www.linkedin.com/in/luca-sch%C3%B6neberg-150348186',
            email: 'luca.schoeneberg@mardu.de',
            description: (
              <>
                <p>
                  Luca studierte Medieninformatik an der Hochschule Osnabrück und machte zuvor eine
                  Ausbildung zum Fachinformatiker für Systemintegration. Bei Mardu arbeitet er an
                  Web-, App- und Backend-Themen sowie an Nutzer- und Rechteverwaltung.
                </p>
              </>
            ),
          },
          {
            imageSrc: '/people/Erik.jpeg',
            imageAlt: 'Erik Frey',
            unoptimized: true,
            title: 'Erik Frey',
            subtitle: '(Co-Founder)',
            linkedinUrl: 'https://www.linkedin.com/in/erik-frey-660236346',
            email: 'erik.frey@mardu.de',
            description: (
              <>
                <p>
                  Erik studierte Elektrotechnik und Informationstechnik am Karlsruher Institut für
                  Technologie. Bei Mardu beschäftigt er sich mit Embedded Software und
                  Hardware-Entwicklung.
                </p>
              </>
            ),
          },
          {
            imageSrc: '/people/Bild1.jpg',
            imageAlt: 'Melvin Valerius',
            title: 'Melvin Valerius',
            subtitle: '(kauf. Leiter)',
            email: 'melvin.valerius@mardu.de',
            description: (
              <>
                <p>
                  Melvin studiert Volkswirtschaftslehre an der Universität Münster und absolvierte
                  zuvor eine Ausbildung zum Industriekaufmann. Bei Mardu kümmert er sich um
                  kaufmännische Themen wie Finanzen, Buchhaltung und Controlling.
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
          primaryButtonHref="https://flow.cleverreach.com/fl/27df128d-415e-4904-bc2a-29dedd704f6f/"
          secondaryButtonText="Beratung Vereinbaren"
          secondaryButtonHref="/contact"
        />
      </section>
    </main>
  );
}
