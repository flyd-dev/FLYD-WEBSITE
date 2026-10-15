import type { Metadata } from 'next';
import fs from 'node:fs';
import path from 'node:path';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { pageMetadata } from '@/lib/seo';
import Container from '@/components/Container';
import Section from '@/components/Section';
import Eyebrow from '@/components/Eyebrow';
import ClosingCta from '@/components/ClosingCta';
import Breadcrumbs from '@/components/Breadcrumbs';
import { artikler, formatDato } from '@/data/artikler';

export const metadata: Metadata = pageMetadata({
  title: 'Artikler om regnskap, regelverk og systemer',
  description:
    'Artikler fra Flyd om regnskap, nye regler og regnskapssystemer. Hva som endres, når det gjelder, og hva bedriften din må gjøre.',
  path: '/artikler/',
});

// Siden bygges statisk, så sjekken kjører i bygget: hver mappe i
// app/artikler/ med en page.tsx må ha en oppføring i data/artikler.ts, ellers
// ville artikkelen aldri dukket opp i oversikten eller sitemapen.
const mappe = path.join(process.cwd(), 'app/artikler');
if (fs.existsSync(mappe)) {
  const kjente = new Set(artikler.map((a) => a.slug));
  const mangler = fs
    .readdirSync(mappe, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !d.name.startsWith('_') && !d.name.startsWith('('))
    .filter((d) => fs.existsSync(path.join(mappe, d.name, 'page.tsx')))
    .map((d) => d.name)
    .filter((slug) => !kjente.has(slug));
  if (mangler.length > 0) {
    throw new Error(`Artikler uten oppføring i data/artikler.ts: ${mangler.join(', ')}`);
  }
}

/** Oversikt over artiklene (/artikler/), nyeste først. Innholdet kommer fra data/artikler.ts. */
export default function ArtiklerPage() {
  return (
    <>
      <Section tone="sand" className="pt-10 md:pt-14" flyt>
        <Container>
          <Breadcrumbs items={[{ name: 'Artikler', href: '/artikler/' }]} />
          <div className="mt-10 max-w-3xl">
            <Eyebrow>Artikler</Eyebrow>
            <h1 className="mt-6 font-display text-display-xl font-semibold">Regelverk og regnskap, forklart</h1>
            <span aria-hidden="true" className="aksentlinje mt-6 block h-1 w-24 rounded-pille bg-flyd-teal" />
            <p className="mt-8 font-display text-ingress font-medium text-flyd-petrol">
              Nye regler, frister og systemer som påvirker bedriften din. Vi skriver om det som faktisk endres, og hva
              du må gjøre.
            </p>
          </div>
        </Container>
      </Section>

      <Section tone="sand" className="!pt-0">
        <Container>
          <ul className="stagger max-w-5xl border-t border-flyd-linje-sand">
            {artikler.map((a, i) => (
              <li key={a.slug} data-reveal style={{ '--i': i } as React.CSSProperties}>
                <Link
                  href={a.path}
                  className="group grid grid-cols-1 gap-x-10 gap-y-3 border-b border-flyd-linje-sand py-8 transition-colors duration-200 hover:bg-flyd-lysmint/60 active:bg-flyd-lysmint md:grid-cols-12 md:px-4 md:py-10"
                >
                  <p className="text-[15px] text-flyd-skifer md:col-span-3 md:pt-1">
                    <time dateTime={a.published}>{formatDato(a.published)}</time>
                  </p>
                  <div className="md:col-span-9">
                    <Eyebrow>{a.tema}</Eyebrow>
                    <h2 className="mt-4 font-display text-[24px] font-semibold leading-[1.25] text-flyd-skog transition-colors duration-200 group-hover:text-flyd-petrol md:text-[28px]">
                      {a.title}
                    </h2>
                    <p className="mt-4 max-w-2xl text-[17px] leading-[1.65] text-flyd-skifer">{a.ingress}</p>
                    <span className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-medium text-flyd-petrol underline decoration-flyd-teal decoration-2 underline-offset-4">
                      Les artikkelen
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <ClosingCta
        kicker="Spørsmål"
        title="Lurer du på hva endringene betyr for deg?"
        text="Ta kontakt, så går vi gjennom hva som gjelder for bedriften din."
      />
    </>
  );
}
