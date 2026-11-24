import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Check, Plus } from 'lucide-react';
import Container from '@/components/Container';
import Section from '@/components/Section';
import Eyebrow from '@/components/Eyebrow';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import { ButtonLink, TextLink } from '@/components/Button';
import { pageMetadata, siteUrl } from '@/lib/seo';
import { formatDato } from '@/data/artikler';
import { skattefrieGaverStyret as a, skattefrieGaverStyretFaq, kilder } from '@/data/skattefrie-gaver-styret';
import toppbilde from '@/public/header/topp-skattefrie-gaver-styret.webp';

// Tittelen har allerede « · Flyd», så den settes som absolutt tittel. Eget
// delingsbilde finnes ikke ennå, så forsidens brukes.
const base = pageMetadata({
  absoluteTitle: a.title,
  description: a.description,
  path: a.path,
});
export const metadata: Metadata = {
  ...base,
  openGraph: {
    ...base.openGraph,
    type: 'article',
    publishedTime: a.published,
    modifiedTime: a.modified,
  },
};

const url = `${siteUrl}${a.path}`;

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${url}#faq`,
  mainEntity: skattefrieGaverStyretFaq.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

// Forfatter er utelatt med vilje, som på de andre guidene.
const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  '@id': `${url}#article`,
  headline: a.h1,
  description: a.description,
  url,
  mainEntityOfPage: url,
  image: [`${siteUrl}${a.hero.src}`],
  inLanguage: 'nb-NO',
  datePublished: a.published,
  dateModified: a.modified,
  publisher: { '@id': `${siteUrl}/#organization` },
};

const kontakt = `/kontakt/?tema=${encodeURIComponent('regnskap og rådgivning')}`;

const lenke =
  'font-medium text-flyd-petrol underline decoration-flyd-teal decoration-2 underline-offset-4 transition-colors duration-200 hover:text-flyd-skog hover:decoration-flyd-skog';
const brod = 'text-[17px] leading-[1.7] text-flyd-skifer';

// Beløpet skal ikke brytes over to linjer («5 / 000 kroner» på 320 px). Fast
// mellomrom settes bare der teksten vises; data/ og JSON-LD har vanlig mellomrom.
const belop = '5\u00A0000';
const fastBelop = (t: string) => t.replace(/(\d) (\d{3})/g, '$1\u00A0$2');
const h2 = 'font-display text-display-md font-semibold';

function Ekstern({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={lenke}>
      {children}
    </a>
  );
}

function Punkter({ items, linje = 'sand' }: { items: React.ReactNode[]; linje?: 'sand' | 'mint' }) {
  const border = linje === 'sand' ? 'border-flyd-linje-sand' : 'border-flyd-linje-mint';
  return (
    <ul className={`mt-5 border-t ${border}`}>
      {items.map((p, i) => (
        <li
          key={i}
          className={`flex items-start gap-3 border-b ${border} py-3 text-[16px] leading-relaxed text-flyd-skog`}
        >
          <Check className="mt-1 h-4 w-4 flex-shrink-0 text-flyd-teal" strokeWidth={2.5} aria-hidden="true" />
          <span>{p}</span>
        </li>
      ))}
    </ul>
  );
}

export default function SkattefrieGaverStyretPage() {
  return (
    <>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={faqJsonLd} />

      {/* HERO + INGRESS */}
      <section className="bg-flyd-sand px-3 pt-3 md:px-4 md:pt-4">
        <div className="on-dark relative overflow-hidden rounded-bilde bg-flyd-skog py-14 text-flyd-sand md:py-20">
          <Container className="relative">
            <Breadcrumbs
              tone="dark"
              items={[
                { name: 'Artikler', href: '/artikler/' },
                { name: 'Skattefrie gaver til styret', href: a.path },
              ]}
            />
            <div className="mt-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <span className="block h-0.5 w-10 bg-flyd-mint" aria-hidden="true" />
                <Eyebrow tone="petrol" className="mt-5">
                  Artikkel · Aksjeselskap
                </Eyebrow>
                <h1 className="mt-5 font-display text-display-xl font-semibold text-flyd-sand">{a.h1}</h1>
                <p className="mt-8 max-w-2xl font-display text-ingress font-medium text-flyd-dempet">
                  Vil dere gi styremedlemmer og varamedlemmer en gave som takk for innsatsen i år? Da kan det lønne seg å
                  kjenne reglene for skattefrie gaver. Her er en kort oversikt over det som gjelder i aksjeselskap – og det
                  dere bør tenke på før nyttår.
                </p>
                <p className="mt-6 text-[15px] text-flyd-dempet">
                  Sist oppdatert <time dateTime={a.modified}>{formatDato(a.modified)}</time>.
                </p>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <ButtonLink href={kontakt} variant="primary-dark" withArrow>
                    Snakk med oss
                  </ButtonLink>
                  <ButtonLink href="#vilkar" variant="secondary-dark">
                    Se vilkårene
                  </ButtonLink>
                </div>
              </div>
              <div className="lg:col-span-6">
                <Image
                  src={toppbilde}
                  alt={a.hero.alt}
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="h-auto w-full rounded-bilde"
                />
              </div>
            </div>
          </Container>
        </div>
      </section>

      {/* GRENSEN */}
      <Section tone="sand" id="grensen">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Grensen</Eyebrow>
            <h2 className={`mt-5 ${h2}`}>Inntil 5{' '}000 kroner per person</h2>
            <p className={`mt-6 ${brod}`}>
              Et aksjeselskap kan gi styremedlemmer og varamedlemmer gaver for inntil {belop} kroner per person per
              kalenderår skattefritt. Beløpet er inkludert merverdiavgift.
            </p>
            <Punkter
              items={[
                `Grensen gjelder per selskap. Har en person verv eller er ansatt i flere selskaper, kan hun eller han få inntil ${belop} kroner fra hvert av dem.`,
                'Dere velger selv om dere vil gi én gave eller fordele beløpet på flere gaver i løpet av året.',
                `Har personen både et verv og en ansettelse i samme selskap, er grensen fortsatt ${belop} kroner til sammen. Den dobles ikke.`,
              ]}
            />
          </div>
        </Container>
      </Section>

      {/* VILKÅR */}
      <Section tone="lysmint" id="vilkar">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Vilkår</Eyebrow>
            <h2 className={`mt-5 ${h2}`}>Dette må være på plass for at gaven er skattefri</h2>
            <Punkter
              linje="mint"
              items={[
                'Gaven kan ikke være penger.',
                'Gaven kan heller ikke være noe som kan løses inn i penger. Et gavekort er greit, så lenge det ikke kan veksles inn i kontanter.',
              ]}
            />
            <p className={`mt-5 ${brod}`}>
              Det er ikke lenger et krav at gaven er en del av en ordning som gjelder alle i selskapet.
            </p>
          </div>
        </Container>
      </Section>

      {/* OVER GRENSEN */}
      <Section tone="sand" id="over-grensen">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Over grensen</Eyebrow>
            <h2 className={`mt-5 ${h2}`}>Hvis gaven er på mer enn 5{' '}000 kroner</h2>
            <p className={`mt-6 ${brod}`}>
              Det som går over {belop} kroner, er skattepliktig for mottakeren. Det overskytende beløpet skal rapporteres i
              a-meldingen, og selskapet betaler arbeidsgiveravgift av det.
            </p>
          </div>
        </Container>
      </Section>

      {/* FOR SELSKAPET */}
      <Section tone="lysmint" id="selskapet">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>For selskapet</Eyebrow>
            <h2 className={`mt-5 ${h2}`}>Dette betyr det for selskapet</h2>
            <Punkter
              linje="mint"
              items={[
                'Gaven kan trekkes fra som en kostnad.',
                'Selskapet kan ikke trekke fra inngående merverdiavgift på gaven.',
                'Gaver innenfor grensen skal ikke rapporteres i a-meldingen.',
              ]}
            />
          </div>
        </Container>
      </Section>

      {/* KILDER */}
      <Section tone="sand" id="kilder">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Kilder</Eyebrow>
            <h2 className={`mt-5 ${h2}`}>Hvor står reglene?</h2>
            <p className={`mt-6 ${brod}`}>
              Skattefritaket følger av{' '}
              <Ekstern href={kilder.fsfin51511}>forskrift til skatteloven (FSFIN) § 5-15-1</Ekstern>. At det også gjelder
              styremedlemmer og varamedlemmer, står i Skatteetatens{' '}
              <Ekstern href={kilder.skatteAbcGaver}>Skatte-ABC 2025/2026, punkt G-1-2.1</Ekstern>.
            </p>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section tone="lysmint" id="sporsmal">
        <Container>
          <Eyebrow>Spørsmål og svar</Eyebrow>
          <h2 className={`mt-5 max-w-3xl ${h2}`}>Ofte stilte spørsmål om gaver til styret</h2>
          <div className="mt-8 max-w-4xl space-y-3">
            {skattefrieGaverStyretFaq.map((f) => (
              <details key={f.q} className="faq group rounded-kort bg-flyd-sand px-6 md:px-7">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-flis py-5 font-display text-[18px] font-semibold text-flyd-skog transition-colors duration-200 hover:text-flyd-petrol">
                  <span className="min-w-0 break-words max-sm:hyphens-auto">{fastBelop(f.q)}</span>
                  <Plus className="faq-pil h-5 w-5 flex-shrink-0 text-flyd-teal" strokeWidth={2} aria-hidden="true" />
                </summary>
                <p className="faq-svar pb-6 text-[16px] leading-relaxed text-flyd-skifer">{fastBelop(f.a)}</p>
              </details>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section tone="lysmint" id="flyd" className="pt-0 md:pt-0">
        <Container>
          <div className="on-dark rounded-bilde bg-flyd-petrol p-8 text-flyd-sand md:p-12 lg:p-14">
            <div className="max-w-3xl">
              <Eyebrow tone="petrol">Kunder i hele Norge</Eyebrow>
              <h2 className="mt-5 font-display text-display-md font-semibold text-flyd-sand">Har du spørsmål?</h2>
              <p className="mt-6 text-[17px] leading-[1.65] text-flyd-dempet">
                Lurer du på hvordan reglene gjelder for dere? Ta gjerne kontakt med oss – vi hjelper deg gjerne.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-5">
                <ButtonLink href={kontakt} variant="secondary-dark" withArrow>
                  Snakk med oss
                </ButtonLink>
                <TextLink href="/kontor/" tone="dark">
                  Finn nærmeste kontor
                </TextLink>
                <TextLink href="/tjenester/regnskap/" tone="dark">
                  Regnskap
                </TextLink>
              </div>
              <p className="mt-10 text-[15px] font-semibold text-flyd-sand">Lokal hjelp</p>
              <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-[15px]">
                {[
                  ['Stavanger og Sandnes', '/kontor/stavanger-sandnes/'],
                  ['Egersund', '/kontor/egersund/'],
                  ['Sokndal', '/kontor/sokndal/'],
                  ['Moi', '/kontor/moi/'],
                  ['Sirdal', '/kontor/sirdal/'],
                  ['Flekkefjord', '/kontor/flekkefjord/'],
                ].map(([navn, href]) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="font-medium text-flyd-sand underline decoration-flyd-mint decoration-2 underline-offset-4 transition-colors duration-200 hover:text-flyd-mint"
                    >
                      {navn}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
