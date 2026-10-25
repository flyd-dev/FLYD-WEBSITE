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
import { lonnEllerUtbytte as a, lonnEllerUtbytteFaq, kilder } from '@/data/lonn-eller-utbytte';
import toppbilde from '@/public/header/topp-lonn-eller-utbytte.webp';

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
  mainEntity: lonnEllerUtbytteFaq.map((f) => ({
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

const sammenligning: { tema: string; lonn: string; utbytte: string }[] = [
  {
    tema: 'For selskapet',
    lonn: 'Fradragsberettiget kostnad. Selskapet betaler arbeidsgiveravgift.',
    utbytte: 'En utdeling til eierne, ikke en kostnad. Ingen arbeidsgiveravgift.',
  },
  {
    tema: 'Skatt hos deg',
    lonn: 'Skattes som lønnsinntekt (personinntekt).',
    utbytte: 'Det som overstiger skjermingsfradraget, oppjusteres og skattes som alminnelig inntekt.',
  },
  {
    tema: 'Pensjon og sykepenger',
    lonn: 'Pensjonsgivende inntekt, og teller med i sykepengegrunnlaget.',
    utbytte: 'Gir ikke pensjonsopptjening og teller ikke med i sykepengegrunnlaget.',
  },
  {
    tema: 'Hvem bestemmer',
    lonn: 'Selskapet som arbeidsgiver. Rapporteres i a-meldingen.',
    utbytte: 'Generalforsamlingen, etter forslag fra styret.',
  },
  {
    tema: 'Krav',
    lonn: 'Lønnen bør svare til arbeidet du gjør i selskapet.',
    utbytte: 'Fri egenkapital, forsvarlig egenkapital og likviditet.',
  },
];

const ekstraordinart: { tittel: string; tekst: React.ReactNode }[] = [
  {
    tittel: 'Sett opp en mellombalanse',
    tekst: (
      <>
        Mellombalansen fastsettes etter reglene for årsregnskap og revideres, med mindre selskapet har valgt bort revisjon.
        Balansedagen kan ikke ligge mer enn seks måneder før dagen utbyttet vedtas.
      </>
    ),
  },
  {
    tittel: 'Vedtak på generalforsamlingen',
    tekst: (
      <>
        Generalforsamlingen vedtar utbyttet etter forslag fra styret (
        <Ekstern href={kilder.aksjeloven82}>aksjeloven § 8-2</Ekstern>).
      </>
    ),
  },
  {
    tittel: 'Send mellombalansen til Regnskapsregisteret',
    tekst: <>Utbyttet kan først betales ut når mellombalansen er registrert og kunngjort av Regnskapsregisteret.</>,
  },
  {
    tittel: 'Betal ut',
    tekst: <>Registreringen tar tid, så start tidlig hvis du vil ha utbyttet i år.</>,
  },
];

export default function LonnEllerUtbyttePage() {
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
                { name: 'Lønn eller utbytte', href: a.path },
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
                  Det finnes i praksis tre måter å få penger ut av eget aksjeselskap: lønn, utbytte og lån. Lønn gir
                  pensjonsopptjening og teller med for sykepenger. Utbytte krever fri egenkapital og vedtak, og ordinært
                  utbytte vedtas først på generalforsamlingen neste år. Lån til deg selv skattlegges som hovedregel som
                  utbytte.
                </p>
                <p className="mt-6 text-[15px] text-flyd-dempet">
                  Sist oppdatert <time dateTime={a.modified}>15. oktober 2026</time>.
                </p>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <ButtonLink href={kontakt} variant="primary-dark" withArrow>
                    Snakk med oss
                  </ButtonLink>
                  <ButtonLink href="#for-nyttar" variant="secondary-dark">
                    Utbytte før nyttår?
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
            <h2 className={`mt-5 ${h2}`}>Lønn og utbytte side om side</h2>
          </div>
          <div className="mt-10 max-w-4xl overflow-x-auto" tabIndex={0} role="region" aria-label="Lønn og utbytte side om side">
            <table className="w-full min-w-[640px] border-collapse text-left text-[16px] leading-relaxed text-flyd-skog">
              <thead>
                <tr className="border-b-2 border-flyd-linje-sand font-display text-[15px] font-semibold">
                  <th scope="col" className="py-3 pr-6">
                    <span className="sr-only">Tema</span>
                  </th>
                  <th scope="col" className="py-3 pr-6">
                    Lønn
                  </th>
                  <th scope="col" className="py-3">
                    Utbytte
                  </th>
                </tr>
              </thead>
              <tbody>
                {sammenligning.map((r) => (
                  <tr key={r.tema} className="border-b border-flyd-linje-sand align-top">
                    <th scope="row" className="py-4 pr-6 font-display font-semibold">
                      {r.tema}
                    </th>
                    <td className="py-4 pr-6 text-flyd-skifer">{r.lonn}</td>
                    <td className="py-4 text-flyd-skifer">{r.utbytte}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`mt-6 max-w-3xl ${brod}`}>
            Kilder: <Ekstern href={kilder.skatteloven61}>skatteloven § 6-1</Ekstern>,{' '}
            <Ekstern href={kilder.folketrygdloven232}>folketrygdloven § 23-2</Ekstern>,{' '}
            <Ekstern href={kilder.utbytte}>Skatteetaten om utbytte</Ekstern>,{' '}
            <Ekstern href={kilder.folketrygdloven315}>folketrygdloven § 3-15</Ekstern> og{' '}
            <Ekstern href={kilder.folketrygdloven828}>§ 8-28</Ekstern>,{' '}
            <Ekstern href={kilder.aksjeloven81}>aksjeloven § 8-1</Ekstern> og{' '}
            <Ekstern href={kilder.aksjeloven82}>§ 8-2</Ekstern>. Lån til deg som aksjonær er omtalt{' '}
            <a href="#aksjonarlan" className={lenke}>
              lenger ned
            </a>
            .
          </p>
        </Container>
      </Section>

      {/* LØNN */}
      <Section tone="lysmint" id="lonn">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Lønn</Eyebrow>
            <h2 className={`mt-5 ${h2}`}>Lønn til deg selv</h2>
            <p className={`mt-6 ${brod}`}>
              Lønn er en fradragsberettiget kostnad for selskapet (
              <Ekstern href={kilder.skatteloven61}>skatteloven § 6-1</Ekstern>), og selskapet betaler arbeidsgiveravgift av
              den (<Ekstern href={kilder.folketrygdloven232}>folketrygdloven § 23-2</Ekstern>). Lønnen rapporteres i
              a-meldingen og skattes hos deg som lønnsinntekt.
            </p>
            <p className={`mt-5 ${brod}`}>
              Lønn er personinntekt (<Ekstern href={kilder.skatteloven122}>skatteloven § 12-2</Ekstern>) og dermed
              pensjonsgivende inntekt i folketrygden (
              <Ekstern href={kilder.folketrygdloven315}>folketrygdloven § 3-15</Ekstern>). Sykepengene beregnes ut fra
              arbeidsinntekten som er rapportert i a-meldingen (
              <Ekstern href={kilder.folketrygdloven828}>folketrygdloven § 8-28</Ekstern>). Utbytte teller ikke med i noen
              av delene.
            </p>
            <p className={`mt-5 ${brod}`}>
              Lønnen bør svare til arbeidet du faktisk gjør. Får du lønn uten en tilsvarende arbeidsinnsats i selskapet, kan
              hele eller deler av den omklassifiseres til utbytte (
              <Ekstern href={kilder.omklassifisering}>Skatte-ABC</Ekstern>). Les mer om{' '}
              <Link href="/tjenester/lonn-og-hr/" className={lenke}>
                lønn og HR
              </Link>
              .
            </p>
          </div>
        </Container>
      </Section>

      {/* UTBYTTE */}
      <Section tone="sand" id="utbytte">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Utbytte</Eyebrow>
            <h2 className={`mt-5 ${h2}`}>Utbytte</h2>

            <h3 className={h3}>Hva kan deles ut</h3>
            <p className={`mt-4 ${brod}`}>
              Selskapet kan bare dele ut utbytte så langt det etter utdelingen har netto eiendeler som dekker aksjekapitalen
              og annen bundet egenkapital. Beregningen tar utgangspunkt i sist godkjente årsregnskap. I tillegg må
              selskapet ha forsvarlig egenkapital og likviditet etter utdelingen (
              <Ekstern href={kilder.aksjeloven81}>aksjeloven § 8-1</Ekstern>).
            </p>

            <h3 className={h3}>Hvem bestemmer</h3>
            <p className={`mt-4 ${brod}`}>
              Generalforsamlingen vedtar utbytte etter forslag fra styret, og kan ikke vedta mer enn styret har foreslått
              eller godtar (<Ekstern href={kilder.aksjeloven82}>aksjeloven § 8-2</Ekstern>). Den ordinære
              generalforsamlingen holdes innen seks måneder etter utgangen av regnskapsåret og godkjenner blant annet
              årsregnskapet og utdeling av utbytte (
              <Ekstern href={kilder.generalforsamling}>Brønnøysundregistrene</Ekstern>).
            </p>

            <h3 className={h3}>Skatt</h3>
            <p className={`mt-4 ${brod}`}>
              Utbytte skattes etter fradrag for skjerming. Skjermingsfradraget gis bare hvis utbyttet er lovlig utdelt (
              <Ekstern href={kilder.skatteloven1012}>skatteloven § 10-12</Ekstern>). Det som overstiger
              skjermingsfradraget, oppjusteres med et faktortall og skattes som alminnelig inntekt (
              <Ekstern href={kilder.skatteloven1011}>skatteloven § 10-11</Ekstern>). Skatteetaten gjør oppjusteringen
              selv, og faktortallet for hvert år står på{' '}
              <Ekstern href={kilder.faktortall}>Skatteetatens side om faktortall</Ekstern>.
            </p>

            <h3 className={h3}>Rapportering</h3>
            <p className={`mt-4 ${brod}`}>
              Aksjeselskapet leverer aksjonærregisteroppgaven innen 31. januar (
              <Ekstern href={kilder.aksjonarregister}>Skatteetaten</Ekstern>). Se de andre datoene i{' '}
              <Link href="/artikler/frister-aksjeselskap/" className={lenke}>
                fristene for aksjeselskap
              </Link>
              .
            </p>
          </div>
        </Container>
      </Section>

      {/* FØR NYTTÅR */}
      <Section tone="lysmint" id="for-nyttar">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Før nyttår</Eyebrow>
            <h2 className={`mt-5 ${h2}`}>Kan jeg ta ut utbytte før nyttår?</h2>
            <p className={`mt-6 ${brod}`}>
              Ordinært utbytte vedtas på generalforsamlingen på grunnlag av sist godkjente årsregnskap. Utbytte basert på
              regnskapet for 2025 ble vedtatt, eller ikke, på generalforsamlingen i 2026. Utbytte basert på regnskapet for
              2026 kan først vedtas i 2027.
            </p>
            <p className={`mt-5 ${brod}`}>
              Vil du ha utbytte i år, må det være et ekstraordinært utbytte på grunnlag av en mellombalanse (
              <Ekstern href={kilder.aksjeloven82a}>aksjeloven § 8-2 a</Ekstern>):
            </p>
            <ol className="mt-8 space-y-4">
              {ekstraordinart.map((s, i) => (
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
              Er det vedtatt utbytte fra fjorårets regnskap som ikke er betalt ut, bør du avklare det med regnskapsføreren.
            </p>
          </div>
        </Container>
      </Section>

      {/* AKSJONÆRLÅN */}
      <Section tone="sand" id="aksjonarlan">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Lån</Eyebrow>
            <h2 className={`mt-5 ${h2}`}>Aksjonærlån: fellen mange går i</h2>
            <p className={`mt-6 ${brod}`}>
              Lån fra selskapet til deg som personlig aksjonær skattlegges normalt som utbytte. Det gjelder også lån til
              ektefelle eller andre nærstående, og det gjelder også lån som er ulovlige etter aksjeloven. Du kan ikke velge å
              få lånet skattlagt som lønn (<Ekstern href={kilder.lanSporsmal}>Skatteetaten</Ekstern>,{' '}
              <Ekstern href={kilder.skatteloven1011}>skatteloven § 10-11</Ekstern>).
            </p>
            <Punkter
              items={[
                <>
                  <strong className="font-semibold">Unntak:</strong> lån under 100 000 kroner som betales tilbake innen
                  60 dager. Grensen gjelder samlet utestående, også mellomregning (
                  <Ekstern href={kilder.smaLan}>Skatteetaten</Ekstern>).
                </>,
                <>
                  Er lånet 100 000 kroner eller mer, blir hele lånet skattepliktig som utbytte, ikke bare det som overstiger
                  grensen.
                </>,
                <>
                  Selskapet kan bare gi lån til en aksjeeier innenfor rammen av det det kan dele ut som utbytte, og det skal
                  stilles betryggende sikkerhet (<Ekstern href={kilder.aksjeloven87}>aksjeloven § 8-7</Ekstern>).
                </>,
                <>Skjermingsfradrag får du bare hvis lånet er lovlig utdelt fra selskapet.</>,
              ]}
            />
            <p className={`mt-5 ${brod}`}>
              I praksis: ikke bruk selskapets kort eller konto til private kjøp «midlertidig». Det kan bli et aksjonærlån.
            </p>
          </div>
        </Container>
      </Section>

      {/* AVKLAR */}
      <Section tone="lysmint" id="avklar">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Sjekkliste</Eyebrow>
            <h2 className={`mt-5 ${h2}`}>Dette bør du avklare før du tar ut penger</h2>
            <Punkter
              linje="mint"
              items={[
                'Hvor mye du vil ta ut totalt, og hva du trenger pengene til.',
                'Om du trenger pensjonsopptjening og sykepengedekning gjennom lønn.',
                'Om selskapet har nok fri egenkapital og forsvarlig likviditet til utbytte.',
                'Om det står private kjøp eller mellomregning på selskapets konto.',
                'Om ekstraordinært utbytte er aktuelt, og om det er tid til mellombalanse og registrering.',
              ]}
            />
            <p className={`mt-5 ${brod}`}>
              Driver du fortsatt som enkeltpersonforetak og vurderer aksjeselskap, kan du lese{' '}
              <Link href="/artikler/enk-eller-as/" className={lenke}>
                ENK eller AS?
              </Link>
            </p>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section tone="sand" id="sporsmal">
        <Container>
          <Eyebrow>Spørsmål og svar</Eyebrow>
          <h2 className={`mt-5 max-w-3xl ${h2}`}>Ofte stilte spørsmål om lønn og utbytte</h2>
          <div className="mt-8 max-w-4xl space-y-3">
            {lonnEllerUtbytteFaq.map((f) => (
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

      {/* CTA */}
      <Section tone="sand" id="flyd" className="pt-0 md:pt-0">
        <Container>
          <div className="on-dark rounded-bilde bg-flyd-petrol p-8 text-flyd-sand md:p-12 lg:p-14">
            <div className="max-w-3xl">
              <Eyebrow tone="petrol">Rogaland og Agder</Eyebrow>
              <h2 className="mt-5 font-display text-display-md font-semibold text-flyd-sand">
                Usikker på hva som passer for deg?
              </h2>
              <p className="mt-6 text-[17px] leading-[1.65] text-flyd-dempet">
                Ta en uforpliktende prat før årsskiftet. Vi sier ærlig fra om hva vi ser.
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
