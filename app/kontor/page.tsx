import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { pageMetadata } from '@/lib/seo';
import Container from '@/components/Container';
import Section from '@/components/Section';
import Eyebrow from '@/components/Eyebrow';
import ClosingCta from '@/components/ClosingCta';
import Breadcrumbs from '@/components/Breadcrumbs';
import FlydIcon from '@/components/FlydIcon';
import { offices, officeLabel } from '@/data/offices';

export const metadata: Metadata = pageMetadata({
  title: 'Kontorer i Rogaland og Agder',
  description:
    'Flyd har seks kontorer: Stavanger/Sandnes (Forus), Egersund, Sokndal, Moi, Sirdal og Flekkefjord. Ett nummer, lokale folk.',
  path: '/kontor/',
});

/**
 * Oversikt over kontorene (/kontor/). Innholdet kommer fra data/offices.ts.
 * Kortene bruker små utgaver av fasadebildene (public/kontor/kort/, 720 px
 * bred), ellers laster siden nesten 1 MB bilder på mobil.
 */
export default function KontorerPage() {
  return (
    <>
      <Section tone="sand" className="pt-10 md:pt-14">
        <Container>
          <Breadcrumbs items={[{ name: 'Kontorer', href: '/kontor/' }]} />
          <div className="mt-10 max-w-3xl">
            <Eyebrow>Kontorer</Eyebrow>
            <h1 className="mt-6 font-display text-display-xl font-semibold">Seks kontorer. Ett nummer.</h1>
            <span aria-hidden="true" className="aksentlinje mt-6 block h-1 w-24 rounded-pille bg-flyd-teal" />
            <p className="mt-8 font-display text-ingress font-medium text-flyd-petrol">
              Vi er der kundene våre er, fra Forus til Flekkefjord. Ett nummer gjelder for alle kontorene:{' '}
              <a
                href="tel:+4748019958"
                className="whitespace-nowrap underline decoration-flyd-teal decoration-2 underline-offset-4 hover:text-flyd-skog"
              >
                +47 480 19 958
              </a>
              .
            </p>
          </div>
        </Container>
      </Section>

      <Section tone="sand" className="!pt-0">
        <Container>
          <ul className="stagger grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
            {offices.map((o, i) => (
              <li key={o.slug} data-reveal style={{ '--i': i } as React.CSSProperties}>
                <Link
                  href={`/kontor/${o.slug}/`}
                  className="lenkekort group flex h-full flex-col rounded-kort bg-flyd-lysmint p-3 hover:bg-flyd-linje-mint"
                >
                  <div className="relative aspect-[3/2] overflow-hidden rounded-flis bg-flyd-linje-mint">
                    {o.image && (
                      <Image
                        src={o.image.src.replace('/kontor/', '/kontor/kort/')}
                        alt={o.image.alt}
                        fill
                        priority={i === 0}
                        sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 90vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                      />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col px-3 pb-3 pt-6">
                    <h2 className="font-display text-[24px] font-semibold leading-tight">{officeLabel(o)}</h2>
                    <p className="mt-3 flex items-start gap-2.5 text-[15px] text-flyd-skifer">
                      <FlydIcon name="lokal" className="mt-0.5 h-5 w-5 flex-shrink-0 text-flyd-teal" />
                      <span>
                        {o.street}, {o.postal}
                      </span>
                    </p>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[15px] font-medium text-flyd-petrol">
                      Til kontoret
                      <ArrowRight className="lenkekort-pil h-4 w-4" strokeWidth={2} aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <ClosingCta
        kicker="Kontakt"
        title="Usikker på hvilket kontor som passer?"
        text="Ring oss eller send en melding, så setter vi deg i kontakt med riktig person."
      />
    </>
  );
}
