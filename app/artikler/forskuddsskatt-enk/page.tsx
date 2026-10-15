import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Check, Plus } from 'lucide-react';
import Container from '@/components/Container';
import Section from '@/components/Section';
import Eyebrow from '@/components/Eyebrow';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import NumberedList from '@/components/NumberedList';
import { ButtonLink, TextLink } from '@/components/Button';
import { pageMetadata, siteUrl } from '@/lib/seo';
import { forskuddsskattEnk as a, forskuddsskattFaq, kilder } from '@/data/forskuddsskatt-enk';
import toppbilde from '@/public/header/topp-forskuddsskatt-enk.webp';

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
  mainEntity: forskuddsskattFaq.map((f) => ({
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
const h2 = 'font-display text-display-md font-semibold';
const h3 = 'mt-10 font-display text-[22px] font-semibold leading-[1.3] text-flyd-skog';
const sterk = 'font-semibold text-flyd-skog';

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

const steg: { tittel: string; tekst: React.ReactNode }[] = [
  {
    tittel: 'Logg inn og åpne skattekortet',
    tekst: <>Logg inn på skatteetaten.no og åpne skattekortet ditt for inntektsåret.</>,
  },
  {
    tittel: 'Oppdater forventet overskudd',
    tekst: (
      <>
        Gå til temaet <strong className={sterk}>Næring</strong> og legg inn det overskuddet du nå forventer. Der finner
        du også en veileder for å beregne overskuddet, og du kan endre fordelingen mellom kvartalene hvis inntekten er
        ujevn.
      </>
    ),
  },
  {
    tittel: 'Se den nye beregningen',
    tekst: <>Skatteetaten beregner ny forskuddsskatt ut fra tallene du har lagt inn.</>,
  },
  {
    tittel: 'Etter 15. desember: kontakt Skatteetaten',
    tekst: (
      <>
        Etter 15. desember kan du ikke endre skattekortet selv. Da må du kontakte Skatteetaten via skjema, eller betale
        tilleggsforskudd innen 31. mai året etter.
      </>
    ),
  },
];

export default function ForskuddsskattEnkPage() {
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
                { name: 'Forskuddsskatt for ENK', href: a.path },
              ]}
            />
            <div className="mt-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <span className="block h-0.5 w-10 bg-flyd-mint" aria-hidden="true" />
                <Eyebrow tone="petrol" className="mt-5">
                  Artikkel · Enkeltpersonforetak
                </Eyebrow>
                <h1 className="mt-5 font-display text-display-xl font-semibold text-flyd-sand">{a.h1}</h1>
                <p className="mt-8 max-w-2xl font-display text-ingress font-medium text-flyd-dempet">
                  Går enkeltpersonforetaket bedre enn du la inn i skattekortet, betaler du for lite forskuddsskatt og får
                  restskatt med rentetillegg. Du kan endre forventet overskudd i skattekortet så mange ganger du vil innen
                  15. desember. Etter det kan du fortsatt betale tilleggsforskudd innen 31. mai året etter.
                </p>
                <p className="mt-6 text-[15px] text-flyd-dempet">
                  Sist oppdatert <time dateTime={a.modified}>15. oktober 2026</time>.
                </p>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <ButtonLink href={kontakt} variant="primary-dark" withArrow>
                    Snakk med oss
                  </ButtonLink>
                  <ButtonLink href="#endre" variant="secondary-dark">
                    Slik endrer du skattekortet
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

      {/* KORT FORTALT */}
      <Section tone="sand" id="kort-fortalt">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Kort fortalt</Eyebrow>
            <h2 className={`mt-5 ${h2}`}>Det viktigste på ett minutt</h2>
            <Punkter
              items={[
                'Forskuddsskatt for ENK betales i fire terminer: 15. mars, 15. juni, 15. september og 15. desember.',
                'Du kan endre skattekortet selv innen 15. desember. Da beregnes ny forskuddsskatt.',
                'Etter 15. desember må du kontakte Skatteetaten via skjema for å endre.',
                'Tilleggsforskudd har frist 31. mai året etter. For inntektsåret 2026 er det mandag 31. mai 2027.',
                'Betaler du for lite, får du restskatt med rentetillegg, beregnet fra 1. juli i inntektsåret.',
              ]}
            />
          </div>
        </Container>
      </Section>

      {/* HVA ER FORSKUDDSSKATT */}
      <Section tone="lysmint" id="hva">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Forskuddsskatt</Eyebrow>
            <h2 className={`mt-5 ${h2}`}>Hva er forskuddsskatt for ENK?</h2>
            <p className={`mt-6 ${brod}`}>
              Som innehaver av et enkeltpersonforetak betaler du skatt av forventet overskudd løpende gjennom året, i
              stedet for at arbeidsgiveren trekker skatt av lønnen. Forskuddsskatten forfaller i fire like store
              terminer: 15. mars, 15. juni, 15. september og 15. desember. Er forskuddsskatten under 2 000 kroner, forfaller
              hele beløpet 15. juni (<Ekstern href={kilder.forskuddsutskrivingen}>Skattedirektoratet</Ekstern>).
              Fakturaen kommer omtrent tre uker før fristen (
              <Ekstern href={kilder.forskuddsskattEnk}>Skatteetaten</Ekstern>).
            </p>
            <p className={`mt-5 ${brod}`}>
              Skatteetatens tommelfingerregel er å sette av 40 prosent av overskuddet. Vanlig forskuddsskatt ligger
              mellom 34 og 50 prosent.
            </p>

            <h3 className={h3}>Har du både lønn og ENK?</h3>
            <p className={`mt-4 ${brod}`}>
              Da kan du endre fordelingen mellom skattetrekket i lønnen og forskuddsskatten. Når du åpner skattekortet,
              krysser du av for at du vil endre fordelingen. Den totale skatten blir den samme.
            </p>
          </div>
        </Container>
      </Section>

      {/* NÅR BØR DU ENDRE */}
      <Section tone="sand" id="nar">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Sjekkliste</Eyebrow>
            <h2 className={`mt-5 ${h2}`}>Når bør du endre skattekortet?</h2>
            <p className={`mt-6 ${brod}`}>
              Gå gjennom resultatet etter tredje kvartal, i oktober eller november. Da har du tid til å endre før 15.
              desember. Endre skattekortet hvis:
            </p>
            <Punkter
              items={[
                'Omsetningen eller overskuddet blir høyere enn du la inn.',
                'Du har fått store oppdrag sent på året.',
                'Kostnadene blir lavere enn du regnet med.',
                <>
                  Foretaket går med underskudd. Er forskuddsskatten allerede beregnet, setter du overskuddet fra
                  næringsinntekt til 0 kroner. Er foretaket nystartet, oppgir du underskuddet i skattemeldingen i stedet.
                </>,
                <>
                  Du har fått sykepenger eller foreldrepenger fra NAV. De har egne felt under{' '}
                  <strong className={sterk}>Næring</strong> i skattekortet.
                </>,
                'Inntekten fordeler seg ujevnt over året. Blir overskuddet i et kvartal 2/3 eller mindre av det Skatteetaten har satt opp, kan du endre fordelingen.',
              ]}
            />
            <p className={`mt-5 ${brod}`}>
              Kilde: <Ekstern href={kilder.forskuddsskattEnk}>Skatteetaten, forskuddsskatt for enkeltpersonforetak</Ekstern>.
            </p>
          </div>
        </Container>
      </Section>

      {/* STEG FOR STEG */}
      <Section tone="lysmint" id="endre">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Steg for steg</Eyebrow>
            <h2 className={`mt-5 ${h2}`}>Slik endrer du forskuddsskatten hos Skatteetaten</h2>
            <ol className="mt-8 space-y-4">
              {steg.map((s, i) => (
                <li key={s.tittel} className="flex gap-5 rounded-kort bg-flyd-sand p-5 md:p-6">
                  <span
                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-flyd-petrol font-display text-[16px] font-semibold tabular-nums text-flyd-sand"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <div className="pt-1">
                    <h3 className="font-display text-[18px] font-semibold leading-[1.3] text-flyd-skog">{s.tittel}</h3>
                    <p className="mt-2 text-[16px] leading-relaxed text-flyd-skifer">{s.tekst}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className={`mt-8 ${brod}`}>
              Du kan endre så mange ganger du vil innen 15. desember (
              <Ekstern href={kilder.forskuddsskattEnk}>Skatteetaten</Ekstern>).
            </p>
          </div>
        </Container>
      </Section>

      {/* TILLEGGSFORSKUDD */}
      <Section tone="sand" id="tilleggsforskudd">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>31. mai</Eyebrow>
            <h2 className={`mt-5 ${h2}`}>For sent å endre? Betal tilleggsforskudd</h2>
            <p className={`mt-6 ${brod}`}>
              Ser du etter nyttår at forskuddsskatten ble for lav, kan du betale tilleggsforskudd. Betaler du innen
              fristen, slipper du rentetillegg på restskatten (
              <Ekstern href={kilder.tilleggsforskudd}>Skatteetaten</Ekstern>).
            </p>
            <Punkter
              items={[
                'Fristen er 31. mai året etter inntektsåret. Faller den på en helg eller helligdag, flyttes den til første virkedag etter. For inntektsåret 2026 er fristen mandag 31. mai 2027.',
                'KID og kontonummer står i opplysningene som fulgte med skattemeldingen. Mangler du dem, kan du lage KID hos Skatteetaten.',
                'Med feil KID eller for sen betaling kan beløpet bli ikke godkjent som tilleggsforskudd. Da kan du få det tilbakebetalt før skatteoppgjøret, eller det brukes til forskudd på restskatt.',
                'Du kan klage innen 3 uker fra du fikk beskjed om at beløpet ikke ble godkjent. Klagen sendes via Altinn.',
              ]}
            />
          </div>
        </Container>
      </Section>

      {/* FOR LITE */}
      <Section tone="lysmint" id="for-lite">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Restskatt</Eyebrow>
            <h2 className={`mt-5 ${h2}`}>Hva skjer hvis du betaler for lite?</h2>
            <p className={`mt-6 ${brod}`}>
              Blir skatten i skatteoppgjøret høyere enn det du har betalt i forskudd og trekk, får du restskatt. For
              enkeltpersonforetak deles restskatt over 1 000 kroner i to fakturaer. Fristene avhenger av når
              skatteoppgjøret ditt er klart (<Ekstern href={kilder.restskatt}>Skatteetaten</Ekstern>).
            </p>

            <h3 className={h3}>Rentetillegg</h3>
            <p className={`mt-4 ${brod}`}>
              For ENK beregnes rentetillegget fra 1. juli i inntektsåret fram til forfall for første termin av
              restskatten. Satsen fastsettes for hvert inntektsår. For inntektsåret 2025 er den 3,12 prosent. Satsen for
              inntektsåret 2026 var ikke publisert på{' '}
              <Ekstern href={kilder.rentesatser}>Skatteetatens satsside</Ekstern> da denne artikkelen ble skrevet.
            </p>
            <p className={`mt-5 ${brod}`}>
              Skatteetatens eget regneeksempel: har du betalt 20 000 kroner for lite for 2025, blir rentetillegget 711
              kroner med 3,12 prosent fra 1. juli 2025 til 20. august 2026 (
              <Ekstern href={kilder.restskatt}>Skatteetaten</Ekstern>).
            </p>

            <h3 className={h3}>Betaler du ikke ved forfall</h3>
            <p className={`mt-4 ${brod}`}>
              Da løper det forsinkelsesrenter fra forfall til betaling. Satsen justeres to ganger i året, så vi oppgir
              den ikke her (<Ekstern href={kilder.restskatt}>Skatteetaten</Ekstern>).
            </p>

            <h3 className={h3}>Betaler du for mye</h3>
            <p className={`mt-4 ${brod}`}>
              Da får du pengene tilbake etter skatteoppgjøret, med rentegodtgjørelse. For inntektsåret 2025 er satsen
              3,12 prosent (<Ekstern href={kilder.rentesatser}>Skatteetaten</Ekstern>).
            </p>
          </div>
        </Container>
      </Section>

      {/* AS */}
      <Section tone="sand" id="as">
        <Container>
          <div className="max-w-3xl">
            <div className="rounded-kort bg-flyd-lysmint p-7 md:p-8">
              <Eyebrow>Aksjeselskap</Eyebrow>
              <h2 className="mt-4 font-display text-[24px] font-semibold leading-[1.25]">Og hvis du har AS?</h2>
              <p className="mt-4 text-[16px] leading-relaxed text-flyd-skifer">
                Aksjeselskap har andre regler. Forskuddsskatten forfaller i to terminer året etter inntektsåret, 15.
                februar og 15. april (<Ekstern href={kilder.forskuddsutskrivingen}>Skattedirektoratet</Ekstern>).
                Rentetillegget på restskatt beregnes fra 15. mars året etter (
                <Ekstern href={kilder.restskatt}>Skatteetaten</Ekstern>). Se også{' '}
                <Link href="/artikler/frister-aksjeselskap/" className={lenke}>
                  frister for aksjeselskap
                </Link>
                .
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section tone="lysmint" id="sporsmal">
        <Container>
          <Eyebrow>Spørsmål og svar</Eyebrow>
          <h2 className={`mt-5 max-w-3xl ${h2}`}>Ofte stilte spørsmål om forskuddsskatt for ENK</h2>
          <div className="mt-8 max-w-4xl space-y-3">
            {forskuddsskattFaq.map((f) => (
              <details key={f.q} className="faq group rounded-kort bg-flyd-sand px-6 md:px-7">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-flis py-5 font-display text-[18px] font-semibold text-flyd-skog transition-colors duration-200 hover:text-flyd-petrol">
                  {f.q}
                  <Plus className="faq-pil h-5 w-5 flex-shrink-0 text-flyd-teal" strokeWidth={2} aria-hidden="true" />
                </summary>
                <p className="faq-svar pb-6 text-[16px] leading-relaxed text-flyd-skifer">{f.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </Section>

      {/* HVA FLYD KAN HJELPE MED */}
      <Section tone="lysmint" id="flyd" className="pt-0 md:pt-0">
        <Container>
          <div className="on-dark rounded-bilde bg-flyd-petrol p-8 text-flyd-sand md:p-12 lg:p-14">
            <div className="max-w-3xl">
              <Eyebrow tone="petrol">Rogaland og Agder</Eyebrow>
              <h2 className="mt-5 font-display text-display-md font-semibold text-flyd-sand">
                Usikker på hva årets overskudd blir?
              </h2>
              <p className="mt-6 text-[17px] leading-[1.65] text-flyd-dempet">
                Vi ser over tallene før 15. desember, så du slipper overraskelser i skatteoppgjøret. Vi hjelper deg med:
              </p>
              <NumberedList
                tone="dark"
                className="mt-8"
                items={[
                  'Gjennomgang av resultatet etter tredje kvartal.',
                  'Riktig forventet overskudd i skattekortet.',
                  'Tilleggsforskudd før 31. mai hvis forskuddet ble for lavt.',
                  'Regnskap og skattemelding for enkeltpersonforetaket.',
                ]}
              />
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
