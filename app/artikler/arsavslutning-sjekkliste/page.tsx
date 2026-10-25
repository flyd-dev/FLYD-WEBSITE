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
import { arsavslutning as a, arsavslutningFaq, kilder } from '@/data/arsavslutning-sjekkliste';
import toppbilde from '@/public/header/topp-arsavslutning-sjekkliste.webp';

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
  mainEntity: arsavslutningFaq.map((f) => ({
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

const sjekkliste: { tittel: string; punkter: React.ReactNode[]; etter?: React.ReactNode }[] = [
  {
    tittel: 'Bilag og bank',
    punkter: [
      'Alle salgs- og kjøpsbilag for året, også kvitteringer for utlegg.',
      'Kontoutskrift og saldo per 31. desember for alle bankkontoer.',
      'Kontoutskrift for kredittkort, og saldo per 31. desember.',
      'Oppgjørsrapporter fra Vipps, nettbutikk og andre betalingsløsninger.',
    ],
  },
  {
    tittel: 'Kunder og leverandører',
    punkter: [
      'Liste over kundefakturaer som ikke var betalt per 31. desember.',
      'Liste over leverandørfakturaer du ikke hadde betalt per 31. desember.',
      'Kunder du tror ikke kommer til å betale.',
    ],
  },
  {
    tittel: 'Varelager',
    punkter: [
      'Varetelling ved regnskapsårets slutt, altså 31. desember når regnskapsåret følger kalenderåret.',
      'Tellelisten: varens art, antall med måleenhet og verdi for hver vare, en sum og hvordan verdien er beregnet.',
      'Listen skal være datert og vise hvem som har talt. Tellelister på papir nummereres før tellingen.',
    ],
    etter: (
      <>
        Kravene står i <Ekstern href={kilder.varetelling}>bokføringsforskriften § 6-1</Ekstern>. Fører du et
        betryggende lagerregnskap, kan du telle i løpet av året, men da må tilgang og avgang fram til årsslutt kunne
        dokumenteres.
      </>
    ),
  },
  {
    tittel: 'Eiendeler og bil',
    punkter: [
      'Kjøp og salg av maskiner, utstyr og kjøretøy i løpet av året, med faktura eller kontrakt.',
      'Kjørebok hvis enkeltpersonforetaket eier en bil.',
    ],
    etter: (
      <>
        Skatteetaten nevner kjøreboken blant det du bør ha klart før du fyller ut skattemeldingen for ENK (
        <Ekstern href={kilder.skattemeldingEnk}>Skatteetaten</Ekstern>).
      </>
    ),
  },
  {
    tittel: 'Lønn og ansatte',
    punkter: [
      'Bekreft at a-meldingene for året stemmer med det som faktisk er utbetalt.',
      'Si fra om ansatte som har sluttet eller begynt, og om bonuser eller etterbetalinger.',
    ],
    etter: (
      <>
        Les mer om <Link href="/tjenester/lonn-og-hr/" className={lenke}>lønn og HR</Link>.
      </>
    ),
  },
  {
    tittel: 'Lån, leasing og avtaler',
    punkter: [
      'Låneoppstilling per 31. desember fra banken for alle lån.',
      'Nye eller endrede leasingavtaler, leieavtaler og andre større avtaler.',
    ],
  },
  {
    tittel: 'Bare for aksjeselskap',
    punkter: [
      'Endringer i eierskapet i løpet av året: kjøp, salg, nye aksjer eller nye eiere.',
      'Lån fra selskapet til en aksjonær, eller fra en aksjonær til selskapet.',
      'Planer om utbytte, så regnskapsføreren kan ta det med i årsoppgjøret.',
    ],
    etter: (
      <>
        Eieropplysningene trengs til aksjonærregisteroppgaven, som har frist 31. januar (
        <Ekstern href={kilder.aksjonarregister}>Skatteetaten</Ekstern>).
      </>
    ),
  },
  {
    tittel: 'Bare for enkeltpersonforetak',
    punkter: [
      'Privat bruk av bil, telefon eller andre eiendeler i virksomheten.',
      'Penger og varer du har tatt ut av virksomheten til privat bruk.',
      'Fjorårets skattemelding og næringsopplysninger.',
      'Om driftsinntektene var over eller under 50 000 kroner.',
    ],
    etter: (
      <>
        Svarer du nei på spørsmålet om driftsinntekter over 50 000 kroner, får du en forenklet næringsspesifikasjon i
        skattemeldingen (<Ekstern href={kilder.skattemeldingEnk}>Skatteetaten</Ekstern>).
      </>
    ),
  },
];

const tidslinje: { tittel: string; tekst: React.ReactNode }[] = [
  {
    tittel: '31. desember: varetelling',
    tekst: (
      <>
        Varelageret telles ved regnskapsårets slutt (
        <Ekstern href={kilder.varetelling}>bokføringsforskriften § 6-1</Ekstern>).
      </>
    ),
  },
  {
    tittel: '31. januar: aksjonærregisteroppgaven (AS)',
    tekst: (
      <>
        Aksjeselskapet leverer aksjonærregisteroppgaven innen 31. januar (
        <Ekstern href={kilder.aksjonarregister}>Skatteetaten</Ekstern>).
      </>
    ),
  },
  {
    tittel: '10. februar: siste mva-termin',
    tekst: (
      <>
        Er bedriften mva-registrert med tomånedlige terminer, har siste termin for året frist 10. februar (
        <Ekstern href={kilder.mvaFrister}>Skattebetalingshåndboken</Ekstern>). Se også{' '}
        <Link href="/artikler/mva-frister/" className={lenke}>
          mva-fristene
        </Link>
        .
      </>
    ),
  },
  {
    tittel: '31. mai: skattemeldingen',
    tekst: (
      <>
        Fristen for skattemeldingen er 31. mai både for enkeltpersonforetak (
        <Ekstern href={kilder.skattemeldingEnk}>Skatteetaten</Ekstern>) og aksjeselskap (
        <Ekstern href={kilder.skattemeldingAs}>Skatteetaten</Ekstern>).
      </>
    ),
  },
  {
    tittel: '30. juni: generalforsamlingen (AS)',
    tekst: (
      <>
        Ordinær generalforsamling skal holdes innen seks måneder etter utgangen av regnskapsåret (
        <Ekstern href={kilder.aksjeloven55}>aksjeloven § 5-5</Ekstern>). Der godkjennes blant annet årsregnskapet (
        <Ekstern href={kilder.generalforsamling}>Brønnøysundregistrene</Ekstern>).
      </>
    ),
  },
  {
    tittel: '31. juli: årsregnskapet',
    tekst: (
      <>
        Årsregnskapet skal være sendt til Regnskapsregisteret senest 31. juli. Fristen kan ikke utsettes (
        <Ekstern href={kilder.arsregnskap}>Brønnøysundregistrene</Ekstern>).
      </>
    ),
  },
];

export default function ArsavslutningPage() {
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
                { name: 'Årsavslutning', href: a.path },
              ]}
            />
            <div className="mt-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <span className="block h-0.5 w-10 bg-flyd-mint" aria-hidden="true" />
                <Eyebrow tone="petrol" className="mt-5">
                  Artikkel · Årsoppgjør
                </Eyebrow>
                <h1 className="mt-5 font-display text-display-xl font-semibold text-flyd-sand">{a.h1.replace('regnskapsføreren', 'regnskaps\u00ADføreren')}</h1>
                <p className="mt-8 max-w-2xl font-display text-ingress font-medium text-flyd-dempet">
                  Regnskapsføreren kan ikke lage årsregnskap og skattemelding før hele året er dokumentert. Lever alle
                  bilag, saldoer per 31. desember, varetelling, oversikt over hvem som skylder deg og hvem du skylder, og
                  si fra om store endringer. Jo mer komplett, jo færre spørsmål.
                </p>
                <p className="mt-6 text-[15px] text-flyd-dempet">
                  Sist oppdatert <time dateTime={a.modified}>15. oktober 2026</time>.
                </p>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <ButtonLink href={kontakt} variant="primary-dark" withArrow>
                    Snakk med oss
                  </ButtonLink>
                  <ButtonLink href="#sjekkliste" variant="secondary-dark">
                    Gå til sjekklisten
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
            <h2 className={`mt-5 ${h2}`}>Dette trenger regnskapsføreren</h2>
            <Punkter
              items={[
                'Alle bilag for året: salg, kjøp og kvitteringer.',
                'Kontoutskrift og saldo per 31. desember for bankkontoer, lån og kredittkort.',
                'Varetelling ved årsskiftet, hvis du har varelager.',
                'Liste over ubetalte kundefakturaer og leverandørfakturaer.',
                'Kjøp og salg av eiendeler, og kjørebok hvis ENK-et eier bil.',
                'Aksjeselskap: endringer i eierskapet og planer om utbytte. ENK: privat bruk og uttak.',
              ]}
            />
          </div>
        </Container>
      </Section>

      {/* HVORFOR */}
      <Section tone="lysmint" id="hvorfor">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Ditt bidrag</Eyebrow>
            <h2 className={`mt-5 ${h2}`}>Hvorfor årsavslutningen avhenger av deg</h2>
            <p className={`mt-6 ${brod}`}>
              Regnskapsføreren fører det som blir levert. Mangler et bilag eller en saldo, blir det spørsmål, og
              årsoppgjøret tar lengre tid. Leverer du alt samlet, kan regnskapsføreren gjøre jobben i én omgang.
            </p>
            <p className={`mt-5 ${brod}`}>
              I et aksjeselskap har styret, eventuelt deltakerne eller daglig leder, ansvaret for å sende årsregnskapet,
              også når regnskapsføreren har avtalt å sende det. Årsregnskapet går til Regnskapsregisteret, og
              skattemeldingen går til Skatteetaten. Det er to ulike rapporteringsplikter (
              <Ekstern href={kilder.arsregnskap}>Brønnøysundregistrene</Ekstern>).
            </p>
          </div>
        </Container>
      </Section>

      {/* SJEKKLISTE */}
      <Section tone="sand" id="sjekkliste">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Sjekkliste</Eyebrow>
            <h2 className={`mt-5 ${h2}`}>Sjekkliste: dette leverer du</h2>
            <p className={`mt-6 ${brod}`}>
              De seks første gruppene gjelder alle. De to siste gjelder bare aksjeselskap eller bare
              enkeltpersonforetak.
            </p>
            {sjekkliste.map((g) => (
              <div key={g.tittel}>
                <h3 className={h3}>{g.tittel}</h3>
                <Punkter items={g.punkter} />
                {g.etter && <p className={`mt-4 ${brod}`}>{g.etter}</p>}
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* TIDSLINJE */}
      <Section tone="lysmint" id="nar">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Tidslinje</Eyebrow>
            <h2 className={`mt-5 ${h2}`}>Fristene rundt årsoppgjøret</h2>
            <p className={`mt-6 ${brod}`}>
              Dette er de lovfestede fristene. Datoene gjelder når regnskapsåret følger kalenderåret.
            </p>
            <ol className="mt-8 space-y-4">
              {tidslinje.map((s, i) => (
                <li key={s.tittel} className="flex gap-5 rounded-kort bg-flyd-sand p-5 md:p-6">
                  <span
                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-flyd-petrol font-display text-[16px] font-semibold tabular-nums text-flyd-sand"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <div className="min-w-0 break-words pt-1 max-sm:hyphens-auto">
                    <h3 className="font-display text-[18px] font-semibold leading-[1.3] text-flyd-skog">{s.tittel}</h3>
                    <p className="mt-2 text-[16px] leading-relaxed text-flyd-skifer">{s.tekst}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className={`mt-8 ${brod}`}>
              Alle fristene for aksjeselskap finner du i{' '}
              <Link href="/artikler/frister-aksjeselskap/" className={lenke}>
                fristene for aksjeselskap
              </Link>
              .
            </p>
          </div>
        </Container>
      </Section>

      {/* TILGANG */}
      <Section tone="sand" id="tilgang">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Før du starter</Eyebrow>
            <h2 className={`mt-5 ${h2}`}>Gi regnskapsføreren riktig tilgang</h2>
            <p className={`mt-6 ${brod}`}>
              Regnskapsføreren trenger tilgang i Altinn for å levere på vegne av bedriften. Sjekk at tilgangen er på plass
              før årsoppgjøret starter. Se{' '}
              <Link href="/artikler/altinn-tilgang-regnskapsforer/" className={lenke}>
                slik gir du regnskapsføreren tilgang i Altinn
              </Link>
              .
            </p>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section tone="lysmint" id="sporsmal">
        <Container>
          <Eyebrow>Spørsmål og svar</Eyebrow>
          <h2 className={`mt-5 max-w-3xl ${h2}`}>Ofte stilte spørsmål om årsoppgjøret</h2>
          <div className="mt-8 max-w-4xl space-y-3">
            {arsavslutningFaq.map((f) => (
              <details key={f.q} className="faq group rounded-kort bg-flyd-sand px-6 md:px-7">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-flis py-5 font-display text-[18px] font-semibold text-flyd-skog transition-colors duration-200 hover:text-flyd-petrol">
                  <span className="min-w-0 break-words max-sm:hyphens-auto">{f.q}</span>
                  <Plus className="faq-pil h-5 w-5 flex-shrink-0 text-flyd-teal" strokeWidth={2} aria-hidden="true" />
                </summary>
                <p className="faq-svar pb-6 text-[16px] leading-relaxed text-flyd-skifer">{f.a}</p>
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
              <Eyebrow tone="petrol">Rogaland og Agder</Eyebrow>
              <h2 className="mt-5 font-display text-display-md font-semibold text-flyd-sand">
                Usikker på hva du skal levere?
              </h2>
              <p className="mt-6 text-[17px] leading-[1.65] text-flyd-dempet">
                Ta en uforpliktende prat, så vet du hva som trengs fra deg.
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
