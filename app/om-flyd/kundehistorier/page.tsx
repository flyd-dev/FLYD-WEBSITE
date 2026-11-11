import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Container from '@/components/Container';
import Section from '@/components/Section';
import Eyebrow from '@/components/Eyebrow';
import Breadcrumbs from '@/components/Breadcrumbs';
import ClosingCta from '@/components/ClosingCta';
import KundehistorieKort from '@/components/KundehistorieKort';
import { UtkastBanner } from '@/components/Bekreft';
import { pageMetadata } from '@/lib/seo';
import { kundehistorier, kundehistorierPath, kunUtkast } from '@/data/kundehistorier';

const base = pageMetadata({
  title: 'Kundehistorier',
  description:
    'Historier fra bedrifter Flyd jobber med – fra bryggeri i Stavanger til laboratorium i Båtsfjord. Se hva vi leverer, og hva kundene sier.',
  path: kundehistorierPath,
});
// Så lenge alle historiene er utkast, er oversikten det også.
export const metadata: Metadata = kunUtkast ? { ...base, robots: { index: false, follow: false } } : base;

/**
 * Bredden på kortene i et rutenett med seks spalter (desktop): tre i raden,
 * og de første gjøres bredere når antallet ikke går opp, så ingen rad står
 * halvtom. Fem historier blir to brede og tre smale.
 */
function bredde(i: number, antall: number): 2 | 3 | 6 {
  const rest = antall % 3;
  if (rest === 1 && i === 0) return 6;
  if (rest === 2 && i < 2) return 3;
  return 2;
}

const spalter = { 2: 'lg:col-span-2', 3: 'lg:col-span-3', 6: 'lg:col-span-6' } as const;

/** Oversikt over kundehistoriene. Innholdet kommer fra data/kundehistorier.ts. */
export default function KundehistorierPage() {
  if (kundehistorier.length === 0) notFound();

  return (
    <>
      {kunUtkast && <UtkastBanner />}
      <Section tone="sand" className="pt-10 md:pt-14">
        <Container>
          <Breadcrumbs
            items={[
              { name: 'Om Flyd', href: '/om-flyd/' },
              { name: 'Kundehistorier', href: kundehistorierPath },
            ]}
          />
          <div className="mt-10 max-w-3xl">
            <Eyebrow>Kundehistorier</Eyebrow>
            <h1 className="mt-6 font-display text-display-xl font-semibold">Historier fra kundene våre</h1>
            <span aria-hidden="true" className="aksentlinje mt-6 block h-1 w-24 rounded-pille bg-flyd-teal" />
            <p className="mt-8 font-display text-ingress font-medium text-flyd-petrol">
              Fra bryggeri i Stavanger til laboratorium i Båtsfjord. Her er noen av bedriftene vi jobber med, hva vi
              gjør for dem, og hva de selv sier.
            </p>
          </div>
        </Container>
      </Section>

      <Section tone="sand" className="!pt-0">
        <Container>
          <ul className="stagger grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-6">
            {kundehistorier.map((h, i) => {
              const b = bredde(i, kundehistorier.length);
              return (
                <li key={h.slug} data-reveal style={{ '--i': i } as React.CSSProperties} className={spalter[b]}>
                  <KundehistorieKort h={h} stor={b > 2} priority={i < 2} />
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>

      <ClosingCta
        kicker="Din bedrift"
        title="Skal vi se på hva vi kan gjøre for dere?"
        text="Ta kontakt, så tar vi en prat om hvor dere er i dag og hva som kan bli enklere."
      />
    </>
  );
}
