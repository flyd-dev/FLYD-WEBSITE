import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Check, Plus } from 'lucide-react';
import Container from '@/components/Container';
import Section from '@/components/Section';
import GlassBrett from '@/components/GlassBrett';
import Eyebrow from '@/components/Eyebrow';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import { ButtonLink, TextLink } from '@/components/Button';
import { pageMetadata, siteUrl } from '@/lib/seo';
import { bytteRegnskapsforer as g, bytteFaq, bytteSjekkliste } from '@/data/bytte-regnskapsforer';
import toppbilde from '@/public/header/topp-bytte-regnskapsforer.webp';

export const metadata: Metadata = pageMetadata({
  title: g.title,
  description: g.description,
  path: g.path,
  image: g.image,
});

const url = `${siteUrl}${g.path}`;

// Bare spørsmål som står på siden, med samme svartekst. Ingen plassholdere.
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${url}#faq`,
  mainEntity: bytteFaq.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

// Forfatter er utelatt med vilje – legges til når en navngitt fagperson står for guiden.
const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  '@id': `${url}#article`,
  headline: g.h1,
  description: g.description,
  url,
  mainEntityOfPage: url,
  image: g.image.url,
  inLanguage: 'nb-NO',
  datePublished: g.published,
  dateModified: g.modified,
  publisher: { '@id': `${siteUrl}/#organization` },
};

const kontakt = `/kontakt/?tema=${encodeURIComponent('regnskap og rådgivning')}`;

const brod = 'text-[17px] leading-[1.7] text-flyd-skifer';
const h2 = 'font-display text-display-md font-semibold';

// Forenklet versjon etter Frøyas tekst 14.10.2026 (briefs/2026-10-14-bytte-regnskapsforer-enklere.md).
const steg: { tittel: string; tekst: string; ikon: string }[] = [
  {
    tittel: 'Les avtalen du har i dag',
    ikon: '/ikoner/bytte/steg1-avtale.svg',
    tekst: 'Se hvor lang oppsigelsestid du har, og om du eier lisensen til regnskapssystemet selv.',
  },
  {
    tittel: 'Velg ny regnskapsfører',
    ikon: '/ikoner/bytte/steg2-velg.svg',
    tekst:
      'Be om et skriftlig tilbud. Den nye regnskapsføreren tar kontakt med den gamle før oppdraget starter. Det er en fast rutine etter regnskapsførerloven, ikke et tegn på problemer.',
  },
  {
    tittel: 'Si opp skriftlig',
    ikon: '/ikoner/bytte/steg3-si-opp.svg',
    tekst: 'Send en e-post med sluttdato, og avklar hvem som leverer siste mva-melding, a-melding og årsoppgjøret.',
  },
  {
    tittel: 'La den nye regnskapsføreren ta over',
    ikon: '/ikoner/bytte/steg4-overta.svg',
    tekst:
      'Regnskapet ditt skal overleveres, vanligvis som en SAF‑T‑fil. Den nye regnskapsføreren hjelper deg med å melde byttet til Brønnøysundregistrene og med tilgangen i Altinn.',
  },
];

export default function BytteRegnskapsforerPage() {
  return (
    <>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={faqJsonLd} />

      {/* HERO – innfelt Skog-flate på Sand med Fias toppbilde. Eneste Korall-knapp på siden. */}
      <section className="bg-flyd-sand px-3 pt-3 md:px-4 md:pt-4">
        <div className="on-dark relative overflow-hidden rounded-bilde bg-flyd-skog py-14 text-flyd-sand md:py-20">
          <Container className="relative">
            <Breadcrumbs tone="dark" items={[{ name: 'Bytte regnskapsfører', href: g.path }]} />
            <div className="mt-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <span className="block h-0.5 w-10 bg-flyd-mint" aria-hidden="true" />
                <Eyebrow tone="petrol" className="mt-5">
                  Guide · Regnskapsfører
                </Eyebrow>
                <h1 className="mt-5 font-display text-display-xl font-semibold text-flyd-sand">{g.h1}</h1>
                <p className="mt-8 max-w-2xl font-display text-ingress font-medium text-flyd-dempet">
                  Ja, du kan bytte regnskapsfører når som helst, også midt i året. Du sier opp den gamle, og den nye
                  hjelper deg med resten. Det tar kortere tid enn mange tror.
                </p>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <ButtonLink href={kontakt} variant="primary-dark" withArrow>
                    Snakk med oss
                  </ButtonLink>
                </div>
              </div>
              <div className="lg:col-span-6">
                <Image
                  src={toppbilde}
                  alt="To rådgivere i Flyd jobber sammen ved møtebordet"
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="h-auto w-full rounded-bilde"
                />
              </div>
            </div>
          </Container>
        </div>
      </section>

      {/* FIRE STEG */}
      <Section tone="sand" id="steg">
        <Container>
          <div className="max-w-3xl" data-reveal>
            <Eyebrow>Fire steg</Eyebrow>
            <h2 className="mt-5 font-display text-display-lg font-semibold">Slik bytter du regnskapsfører i 4 steg</h2>
          </div>
          <ol className="mt-12 grid grid-cols-1 gap-4 md:gap-5 lg:grid-cols-2">
            {steg.map((s, i) => (
              <li
                key={s.tittel}
                data-reveal
                className="rounded-kort bg-flyd-lysmint p-6 md:p-8"
              >
                {/* Dekorativt ikon (Fia), godkjent av Marius 14.10.2026 */}
                {/* eslint-disable-next-line @next/next/no-img-element -- SVG, next/image gir ingenting her */}
                <img src={s.ikon} alt="" aria-hidden="true" width={56} height={56} className="h-14 w-14" />
                {/* Skifer, ikke Flyd-teal: teal på Sand er for svak kontrast for liten tekst */}
                <p className="mt-5 text-[14px] font-medium text-flyd-skifer">Steg {i + 1}</p>
                <h3 className="mt-1 font-display text-[20px] font-semibold leading-[1.3]">{s.tittel}</h3>
                <p className={`mt-4 ${brod}`}>{s.tekst}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* TID OG PRIS + SYSTEM */}
      <Section tone="lysmint" id="tid-og-pris">
        <Container>
          <div className="stagger grid grid-cols-1 gap-4 md:gap-5 lg:grid-cols-2">
            <div data-reveal style={{ '--i': 0 } as React.CSSProperties} className="rounded-kort bg-flyd-sand p-7 md:p-8">
              <Eyebrow>Tid og pris</Eyebrow>
              <h2 className="mt-4 font-display text-[24px] font-semibold leading-[1.25]">
                Hvor lang tid tar det, og hva koster det?
              </h2>
              <p className={`mt-4 ${brod}`}>
                Det er først og fremst oppsigelsestiden i avtalen din som bestemmer hvor raskt det går, og så hvor raskt
                det gamle byrået overleverer. Å melde ny regnskapsfører koster
                ingenting. Det du eventuelt betaler for, er oppsigelsestiden hos den gamle, oppstarten hos den nye og
                eventuelt sluttarbeid eller flytting av data.
              </p>
            </div>
            <div
              id="system"
              data-reveal
              style={{ '--i': 1 } as React.CSSProperties}
              className="scroll-mt-24 rounded-kort bg-flyd-sand p-7 md:p-8"
            >
              <Eyebrow>System</Eyebrow>
              <h2 className="mt-4 font-display text-[24px] font-semibold leading-[1.25]">Må jeg bytte regnskapssystem?</h2>
              <p className={`mt-4 ${brod}`}>
                Nei, ikke hvis du eier lisensen selv. Da gir du bare den nye regnskapsføreren tilgang, for eksempel i
                Tripletex.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* HVA FLYD GJØR */}
      <Section tone="sand" id="flyd">
        <Container>
          {/* Petrol-boks med glassbrettet bak, som de andre mørke flatene. */}
          <div className="on-dark relative overflow-hidden rounded-bilde bg-flyd-petrol p-8 text-flyd-sand md:p-12 lg:p-14">
            <GlassBrett tone="petrol" />
            <div className="relative max-w-2xl" data-reveal>
              <Eyebrow tone="petrol">Rogaland og Agder</Eyebrow>
              <h2 className="mt-5 font-display text-display-md font-semibold text-flyd-sand">Dette gjør Flyd for deg</h2>
              <p className="mt-6 max-w-xl text-[17px] leading-[1.65] text-flyd-dempet">
                Når du har sagt ja, tar vi oss av overgangen. Vi henter regnskapet fra den gamle regnskapsføreren,
                setter opp Tripletex, bank og tilganger, og du får en fast kontaktperson. Vi har kontorer i Rogaland og
                Agder. Ser du etter en{' '}
                <Link
                  href="/kontor/stavanger-sandnes/"
                  className="font-medium text-flyd-sand underline decoration-flyd-mint decoration-2 underline-offset-4 transition-colors duration-200 hover:text-flyd-mint"
                >
                  regnskapsfører i Stavanger
                </Link>
                , sitter vi på Forus.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-5">
                <ButtonLink href={kontakt} variant="secondary-dark" withArrow>
                  Snakk med oss
                </ButtonLink>
                <TextLink href="/kontor/" tone="dark">
                  Finn nærmeste kontor
                </TextLink>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* SJEKKLISTE – sammenfoldet som standard */}
      <Section tone="sand" id="sjekkliste" className="pt-0 md:pt-0">
        <Container>
          <details className="faq group rounded-kort bg-flyd-lysmint px-6 md:px-8">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-flis py-6 transition-colors duration-200 hover:text-flyd-petrol">
              <h2 className="font-display text-[24px] font-semibold leading-[1.25] text-flyd-skog">
                Sjekkliste – bytte regnskapsfører
              </h2>
              <Plus className="faq-pil h-6 w-6 flex-shrink-0 text-flyd-teal" strokeWidth={2} aria-hidden="true" />
            </summary>
            <div className="faq-svar grid grid-cols-1 gap-8 pb-8 md:grid-cols-2">
              {bytteSjekkliste.map((gruppe) => (
                <div key={gruppe.tittel}>
                  <h3 className="font-display text-[20px] font-semibold">{gruppe.tittel}</h3>
                  <ul className="mt-4 border-t border-flyd-linje-mint">
                    {gruppe.punkter.map((p) => (
                      <li
                        key={p}
                        className="flex items-start gap-3 border-b border-flyd-linje-mint py-3 text-[16px] leading-relaxed text-flyd-skog"
                      >
                        <Check className="mt-1 h-4 w-4 flex-shrink-0 text-flyd-teal" strokeWidth={2.5} aria-hidden="true" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </details>
        </Container>
      </Section>

      {/* OFTE STILTE SPØRSMÅL */}
      <Section tone="sand" id="sporsmal" className="pt-0 md:pt-0">
        <Container>
          <div className="border-t border-flyd-linje-sand pt-20 md:pt-28" data-reveal>
            <Eyebrow>Spørsmål og svar</Eyebrow>
            <h2 className={`mt-5 max-w-3xl ${h2}`}>Ofte stilte spørsmål</h2>
            <div className="mt-8 max-w-4xl space-y-3">
              {bytteFaq.map((f) => (
                <details key={f.q} className="faq group rounded-kort bg-flyd-lysmint px-6 md:px-7">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-flis py-5 font-display text-[18px] font-semibold text-flyd-skog transition-colors duration-200 hover:text-flyd-petrol">
                    <span className="min-w-0 break-words max-sm:hyphens-auto">{f.q}</span>
                    <Plus className="faq-pil h-5 w-5 flex-shrink-0 text-flyd-teal" strokeWidth={2} aria-hidden="true" />
                  </summary>
                  <p className="faq-svar pb-6 text-[16px] leading-relaxed text-flyd-skifer">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
