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
import { fristerAs as a, fristerFaq, kilder } from '@/data/frister-aksjeselskap';
import toppbilde from '@/public/header/topp-frister-aksjeselskap.webp';

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
  mainEntity: fristerFaq.map((f) => ({
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

const kalender: { frist: string; hva: string; til: string; kilde: React.ReactNode }[] = [
  {
    frist: '31. januar',
    hva: 'Aksjonærregisteroppgaven (RF-1086)',
    til: 'Skatteetaten',
    kilde: <Ekstern href={kilder.aksjonarregister}>Skatteetaten</Ekstern>,
  },
  {
    frist: '31. mai',
    hva: 'Skattemelding med næringsspesifikasjon',
    til: 'Skatteetaten',
    kilde: <Ekstern href={kilder.skattemeldingSelskap}>Skatteetaten</Ekstern>,
  },
  {
    frist: 'Seks måneder etter regnskapsårets slutt',
    hva: 'Ordinær generalforsamling godkjenner årsregnskapet. Ved kalenderår: innen 30. juni.',
    til: 'Selskapet',
    kilde: <Ekstern href={kilder.aksjeloven}>Aksjeloven § 5-5</Ekstern>,
  },
  {
    frist: '31. juli',
    hva: 'Komplett årsregnskap',
    til: 'Regnskapsregisteret',
    kilde: <Ekstern href={kilder.arsregnskap}>Brønnøysund</Ekstern>,
  },
  {
    frist: '14 dager etter endring',
    hva: 'Reelle rettighetshavere',
    til: 'Brønnøysundregistrene',
    kilde: <Ekstern href={kilder.reelleRettighetshavere}>Brønnøysund</Ekstern>,
  },
  {
    frist: 'Den 5. hver måned',
    hva: 'A-melding (har selskapet ansatte)',
    til: 'Skatteetaten',
    kilde: <Ekstern href={kilder.amelding}>Skatteetaten</Ekstern>,
  },
  {
    frist: 'Annenhver måned',
    hva: 'Mva-melding (er selskapet mva-registrert)',
    til: 'Skatteetaten',
    kilde: <Ekstern href={kilder.mvaFrister}>Lovdata</Ekstern>,
  },
];

export default function FristerAksjeselskapPage() {
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
                { name: 'Frister for aksjeselskap', href: a.path },
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
                  Et aksjeselskap har tre store årlige frister: aksjonærregisteroppgaven 31. januar, skattemeldingen
                  31. mai og årsregnskapet til Regnskapsregisteret 31. juli. Ordinær generalforsamling skal holdes innen
                  seks måneder etter at regnskapsåret er slutt, altså innen 30. juni når regnskapsåret følger
                  kalenderåret.
                </p>
                <p className="mt-6 text-[15px] text-flyd-dempet">
                  Sist oppdatert <time dateTime={a.modified}>15. oktober 2026</time>.
                </p>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <ButtonLink href={kontakt} variant="primary-dark" withArrow>
                    Snakk med oss
                  </ButtonLink>
                  <ButtonLink href="#kalender" variant="secondary-dark">
                    Se årskalenderen
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
                'Aksjonærregisteroppgaven skal leveres innen 31. januar, og fra juni 2026 bare gjennom et regnskaps- eller årsoppgjørssystem.',
                'Skattemeldingen for AS har frist 31. mai. Du kan søke om én måneds utsettelse før fristen går ut. I 2027 er 31. mai en mandag.',
                'Årsregnskapet skal være hos Regnskapsregisteret senest 31. juli. Den fristen kan ikke utsettes.',
                'Alle fristene gjelder også for holdingselskap og selskap uten aktivitet.',
              ]}
            />
          </div>
        </Container>
      </Section>

      {/* ÅRSKALENDER */}
      <Section tone="lysmint" id="kalender">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Årskalender</Eyebrow>
            <h2 className={`mt-5 ${h2}`}>Årskalender for aksjeselskap</h2>
            <p className={`mt-6 ${brod}`}>
              Fristene gjelder for et regnskapsår som følger kalenderåret, med levering året etter.
            </p>
          </div>
          <div className="mt-10 max-w-5xl overflow-x-auto" tabIndex={0} role="region" aria-label="Årskalender for aksjeselskap">
            <table className="w-full min-w-[640px] border-collapse text-left text-[16px] leading-relaxed text-flyd-skog">
              <thead>
                <tr className="border-b-2 border-flyd-linje-mint font-display text-[15px] font-semibold">
                  <th scope="col" className="py-3 pr-6">
                    Frist
                  </th>
                  <th scope="col" className="py-3 pr-6">
                    Hva
                  </th>
                  <th scope="col" className="py-3 pr-6">
                    Til
                  </th>
                  <th scope="col" className="py-3">
                    Kilde
                  </th>
                </tr>
              </thead>
              <tbody>
                {kalender.map((k) => (
                  <tr key={k.hva} className="border-b border-flyd-linje-mint align-top">
                    <th scope="row" className="py-4 pr-6 font-display font-semibold">
                      {k.frist}
                    </th>
                    <td className="py-4 pr-6 text-flyd-skifer">{k.hva}</td>
                    <td className="py-4 pr-6 text-flyd-skifer">{k.til}</td>
                    <td className="py-4 text-[15px]">{k.kilde}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* AKSJONÆRREGISTEROPPGAVEN */}
      <Section tone="sand" id="aksjonarregisteroppgaven">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>31. januar</Eyebrow>
            <h2 className={`mt-5 ${h2}`}>Aksjonær&shy;register&shy;oppgaven (RF-1086)</h2>
            <p className={`mt-6 ${brod}`}>
              Alle norske aksjeselskap og allmennaksjeselskap skal levere aksjonærregisteroppgaven hvert år, med frist
              31. januar. Boligaksjeselskap er unntatt, og det samme er selskap der Euronext VPS står for
              innrapporteringen (<Ekstern href={kilder.aksjonarregister}>Skatteetaten</Ekstern>).
            </p>

            <h3 className={h3}>Bare via system fra juni 2026</h3>
            <p className={`mt-4 ${brod}`}>
              Fra juni 2026 skal alle aksjeselskap levere aksjonærregisteroppgaven gjennom et regnskaps- eller
              årsoppgjørssystem (sluttbrukersystem). Det er ikke lenger mulig å levere i Altinn eller på papir. Kravet
              gjelder også endringsoppgaver for 2025 og tidligere år.
            </p>

            <h3 className={h3}>Tvangsmulkt til oppgaven er levert</h3>
            <p className={`mt-4 ${brod}`}>
              Leveres ikke oppgaven i tide, må selskapet betale tvangsmulkt til den er levert.
            </p>
          </div>
        </Container>
      </Section>

      {/* SKATTEMELDINGEN */}
      <Section tone="lysmint" id="skattemelding">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>31. mai</Eyebrow>
            <h2 className={`mt-5 ${h2}`}>Skattemeldingen for aksjeselskap</h2>
            <p className={`mt-6 ${brod}`}>
              Fristen er 31. mai hvert år. Skattemeldingen med næringsspesifikasjon hentes inn og leveres gjennom et
              regnskaps- eller årsoppgjørssystem. Den skal leveres selv om selskapet ikke har hatt omsetning, også når
              selskapet nylig er startet eller avviklet (
              <Ekstern href={kilder.skattemeldingSelskap}>Skatteetaten</Ekstern>).
            </p>

            <h3 className={h3}>Utsettelse</h3>
            <Punkter
              linje="mint"
              items={[
                'Du kan søke om én måneds utsettelse.',
                'Søknaden må sendes før fristen går ut. Du kan ikke søke etter fristen.',
                'Elektroniske søknader innvilges automatisk.',
                'Regnskapsførere og revisorer kan søke for sine klienter.',
              ]}
            />
            <p className={`mt-5 ${brod}`}>
              Kilder: <Ekstern href={kilder.utsattFrist}>Skatteetaten om utsatt frist</Ekstern> og{' '}
              <Ekstern href={kilder.skattemeldingSelskap}>skattemelding for selskap</Ekstern>.
            </p>

            <h3 className={h3}>Når 31. mai er en helgedag</h3>
            <p className={`mt-4 ${brod}`}>
              I 2026 var 31. mai en søndag, og Skatteetaten skrev at det ikke var for sent å søke om utsettelse senest
              1. juni (<Ekstern href={kilder.utsattFrist}>Skatteetaten</Ekstern>). I 2025 falt fristen på en lørdag, og
              næringsdrivende kunne levere til og med mandag 2. juni (
              <Ekstern href={kilder.pressemelding2025}>Skatteetaten, pressemelding 30.05.2025</Ekstern>). I 2027 er 31.
              mai en mandag, så da gjelder den ordinære fristen.
            </p>
          </div>
        </Container>
      </Section>

      {/* GENERALFORSAMLING */}
      <Section tone="sand" id="generalforsamling">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Generalforsamling</Eyebrow>
            <h2 className={`mt-5 ${h2}`}>Generalforsamling og godkjenning av årsregnskapet</h2>
            <p className={`mt-6 ${brod}`}>
              «Innen seks måneder etter utgangen av hvert regnskapsår skal selskapet holde ordinær generalforsamling» (
              <Ekstern href={kilder.aksjeloven}>aksjeloven § 5-5</Ekstern>). Generalforsamlingen skal godkjenne
              årsregnskapet og eventuell årsberetning, og den vedtar eventuelt utbytte.
            </p>
            <p className={`mt-5 ${brod}`}>
              Følger regnskapsåret kalenderåret (1. januar–31. desember), betyr det at generalforsamlingen må holdes
              innen 30. juni. Har selskapet et avvikende regnskapsår, regner du seks måneder fra utgangen av det
              regnskapsåret.
            </p>
          </div>
        </Container>
      </Section>

      {/* ÅRSREGNSKAPET */}
      <Section tone="lysmint" id="arsregnskap">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>31. juli</Eyebrow>
            <h2 className={`mt-5 ${h2}`}>Årsregnskapet til Regnskapsregisteret</h2>
            <p className={`mt-6 ${brod}`}>
              Alle innsendingspliktige virksomheter skal sende komplett årsregnskap til Regnskapsregisteret senest 31.
              juli, gjennom skjemaet for årsregnskap i Altinn. Plikten gjelder selv om det ikke er drift eller
              aktivitet (<Ekstern href={kilder.arsregnskap}>Brønnøysundregistrene</Ekstern>).
            </p>
            <Punkter
              linje="mint"
              items={[
                'Fristen kan ikke utsettes.',
                'Styret er ansvarlig for innsendingen, også når regnskapsfører eller revisor skal sende inn.',
                'Er årsregnskapet sendt før fristen, kan du rette feil eller mangler innen to uker uten forsinkelsesgebyr. Det gjelder ikke når regnskapet sendes etter fristen.',
                <>
                  Forsinkelsesgebyret kan maksimalt bli 69 940 kroner (
                  <Ekstern href={kilder.forsinkelsesgebyr}>Brønnøysundregistrene, oppdatert 2. januar 2026</Ekstern>).
                </>,
              ]}
            />
            <p className={`mt-6 ${brod}`}>
              Årsregnskapet og skattemeldingen er to ulike innsendinger. Skattemeldingen går til Skatteetaten,
              årsregnskapet til Regnskapsregisteret i Brønnøysund.
            </p>
          </div>
        </Container>
      </Section>

      {/* ANDRE FRISTER */}
      <Section tone="sand" id="andre-frister">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Løpende frister</Eyebrow>
            <h2 className={`mt-5 ${h2}`}>Andre frister å holde øye med</h2>

            <h3 className={h3}>Reelle rettighetshavere</h3>
            <p className={`mt-4 ${brod}`}>
              Alle registreringspliktige virksomheter må registrere reelle rettighetshavere innen 14 dager etter at de
              er registrert i et offentlig register, eller etter at det har kommet nye rettighetshavere eller andre
              endringer. Et AS uten reelle rettighetshavere må også registrere det. Følges ikke plikten opp, kan
              registeret ilegge dagbøter (
              <Ekstern href={kilder.reelleRettighetshavere}>Brønnøysundregistrene, oppdatert 8. juni 2026</Ekstern>).
            </p>

            <h3 className={h3}>A-melding og mva-melding</h3>
            <p className={`mt-4 ${brod}`}>
              Har selskapet ansatte, skal a-meldingen leveres innen den 5. hver måned. Faller den 5. på en helg eller
              helligdag, flyttes fristen til første hverdag etter (
              <Ekstern href={kilder.amelding}>Skatteetaten</Ekstern>). Er selskapet mva-registrert, leverer det
              normalt mva-melding annenhver måned, med frist én måned og ti dager etter hver termin og 31. august for
              mai–juni (<Ekstern href={kilder.mvaFrister}>skatteforvaltningsforskriften § 8-3-10</Ekstern>).
            </p>
          </div>
        </Container>
      </Section>

      {/* KONSEKVENSER */}
      <Section tone="lysmint" id="konsekvenser">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Forsinkelse</Eyebrow>
            <h2 className={`mt-5 ${h2}`}>Hva skjer hvis fristene ikke overholdes?</h2>
            <Punkter
              linje="mint"
              items={[
                <>
                  <strong className="font-semibold">Skattemeldingen:</strong> leverer du ikke og søker ikke utsettelse
                  innen fristen, kan selskapet få tilleggsskatt eller tvangsmulkt (
                  <Ekstern href={kilder.skattemeldingSelskap}>Skatteetaten</Ekstern>).
                </>,
                <>
                  <strong className="font-semibold">Aksjonærregisteroppgaven:</strong> tvangsmulkt til oppgaven er
                  levert (<Ekstern href={kilder.aksjonarregister}>Skatteetaten</Ekstern>).
                </>,
                <>
                  <strong className="font-semibold">Årsregnskapet:</strong> forsinkelsesgebyr på inntil 69 940 kroner (
                  <Ekstern href={kilder.forsinkelsesgebyr}>Brønnøysundregistrene</Ekstern>).
                </>,
              ]}
            />

            <h3 className={h3}>I ytterste fall: tvangsoppløsning</h3>
            <p className={`mt-4 ${brod}`}>
              Er komplett årsregnskap ikke levert innen seks måneder etter fristen, kan selskapet bli tvangsoppløst.
              Regnskapsregisteret gir først en ny frist på én måned i Altinn. Overholdes ikke den, kunngjøres selskapets
              navn med en ny frist på fire uker. Går også den fristen ut, varsles tingretten, som tvangsoppløser
              selskapet uten flere varsler (<Ekstern href={kilder.tvangsopplosning}>Brønnøysundregistrene</Ekstern>).
            </p>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section tone="sand" id="sporsmal">
        <Container>
          <Eyebrow>Spørsmål og svar</Eyebrow>
          <h2 className={`mt-5 max-w-3xl ${h2}`}>Ofte stilte spørsmål om frister for AS</h2>
          <div className="mt-8 max-w-4xl space-y-3">
            {fristerFaq.map((f) => (
              <details key={f.q} className="faq group rounded-kort bg-flyd-lysmint px-6 md:px-7">
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

      {/* HVA FLYD KAN HJELPE MED */}
      <Section tone="sand" id="flyd" className="pt-0 md:pt-0">
        <Container>
          <div className="on-dark rounded-bilde bg-flyd-petrol p-8 text-flyd-sand md:p-12 lg:p-14">
            <div className="max-w-3xl">
              <Eyebrow tone="petrol">Rogaland og Agder</Eyebrow>
              <h2 className="mt-5 font-display text-display-md font-semibold text-flyd-sand">
                Slik hjelper Flyd med årsoppgjøret
              </h2>
              <p className="mt-6 text-[17px] leading-[1.65] text-flyd-dempet">
                Vi holder styr på fristene, så du kan drive selskapet. Vi hjelper deg med:
              </p>
              <NumberedList
                tone="dark"
                className="mt-8"
                items={[
                  'Årsregnskap og innsending til Regnskapsregisteret før 31. juli.',
                  'Skattemelding med næringsspesifikasjon, eller søknad om utsettelse i tide.',
                  'Aksjonærregisteroppgaven fra regnskapssystemet.',
                  'Lønn, a-melding og mva-melding gjennom året.',
                ]}
              />
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-5">
                <ButtonLink href={kontakt} variant="secondary-dark" withArrow>
                  Snakk med oss
                </ButtonLink>
                <TextLink href="/tjenester/regnskap/" tone="dark">
                  Regnskap
                </TextLink>
                <TextLink href="/tjenester/lonn-og-hr/" tone="dark">
                  Lønn og HR
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
