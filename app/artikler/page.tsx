import type { Metadata } from 'next';
import fs from 'node:fs';
import path from 'node:path';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { pageMetadata } from '@/lib/seo';
import Container from '@/components/Container';
import Section from '@/components/Section';
import Eyebrow from '@/components/Eyebrow';
import ClosingCta from '@/components/ClosingCta';
import Breadcrumbs from '@/components/Breadcrumbs';
import FlytLinjer from '@/components/FlytLinjer';
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
          <ul className="stagger grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
            {artikler.map((a, i) => {
              // Den nyeste artikkelen fremhevet i full bredde.
              const fremhevet = i === 0;
              return (
              <li
                key={a.slug}
                data-reveal
                style={{ '--i': i } as React.CSSProperties}
                className={fremhevet ? 'sm:col-span-2 lg:col-span-3' : undefined}
              >
                <Link
                  href={a.path}
                  className={`lys lenkekort group flex h-full flex-col rounded-kort bg-flyd-lysmint p-3 hover:bg-flyd-linje-mint ${
                    fremhevet ? 'lg:flex-row lg:gap-4' : ''
                  }`}
                >
                  <div
                    className={`relative aspect-video overflow-hidden rounded-flis bg-flyd-petrol ${
                      fremhevet ? 'lg:aspect-auto lg:min-h-[380px] lg:w-7/12 lg:flex-none' : ''
                    }`}
                  >
                    {a.bilde ? (
                      <Image
                        src={a.bilde.src}
                        alt={a.bilde.alt}
                        width={a.bilde.width}
                        height={a.bilde.height}
                        priority={i === 0}
                        sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 90vw"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                      />
                    ) : (
                      // Uten bilde: rolig Petrol-flate med flytlinjene, bare pynt.
                      <FlytLinjer className="opacity-40" />
                    )}
                  </div>
                  <div className={`flex flex-1 flex-col px-3 pb-3 pt-6 ${fremhevet ? 'lg:justify-center lg:px-8 lg:py-8' : ''}`}>
                    <Eyebrow>{a.tema}</Eyebrow>
                    <h2
                      className={`mt-4 font-display text-[22px] font-semibold leading-[1.25] text-flyd-skog ${
                        fremhevet ? 'lg:text-[clamp(1.75rem,2.6vw,2.375rem)] lg:leading-[1.15]' : ''
                      }`}
                    >
                      {a.title}
                    </h2>
                    <p className="mt-3 text-[16px] leading-[1.6] text-flyd-skifer">{a.ingress}</p>
                    <div
                      className={`mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-2 pt-6 text-[15px] ${
                        fremhevet ? 'lg:mt-8' : ''
                      }`}
                    >
                      <time dateTime={a.published} className="text-flyd-skifer">
                        {formatDato(a.published)}
                      </time>
                      <span className="inline-flex items-center gap-1.5 font-medium text-flyd-petrol">
                        Les artikkelen
                        <ArrowRight className="lenkekort-pil h-4 w-4" strokeWidth={2} aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
              );
            })}
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
