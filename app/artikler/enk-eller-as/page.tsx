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
import { enkEllerAs as a, enkEllerAsFaq, kilder } from '@/data/enk-eller-as';
import toppbilde from '@/public/header/topp-enk-eller-as.webp';

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
  mainEntity: enkEllerAsFaq.map((f) => ({
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

const sammenligning: { tema: string; enk: string; as: string }[] = [
  {
    tema: 'Ansvar for gjeld',
    enk: 'Innehaveren har fullt personlig ansvar for gjeld og forpliktelser.',
    as: 'Aksjeeierne hefter ikke overfor kreditorene for selskapets forpliktelser.',
  },
  {
    tema: 'Kapital',
    enk: 'Ingen aksjekapital.',
    as: 'Minst 30 000 kroner i aksjekapital.',
  },
  {
    tema: 'Skatt på overskuddet',
    enk: 'Skattes hos deg som næringsinntekt, med trygdeavgift og trinnskatt på personinntekten.',
    as: 'Skattes i selskapet med 22 prosent. Utbytte skattes i tillegg hos deg.',
  },
  {
    tema: 'Regnskap',
    enk: 'Bokføringsplikt. Regnskapsplikt bare for store foretak.',
    as: 'Alltid regnskapsplikt og årsregnskap til Regnskapsregisteret.',
  },
  {
    tema: 'Formelle krav',
    enk: 'Få: bokføring og skattemelding med næringsspesifikasjon.',
    as: 'Flere: styre, generalforsamling, aksjonærregisteroppgave og eventuelt revisor.',
  },
];

const tidslinje: { tittel: string; tekst: React.ReactNode }[] = [
  {
    tittel: 'Høsten: vurder om AS passer',
    tekst: <>Gå gjennom risiko, overskudd og planer for neste år. Bruk sjekklisten over.</>,
  },
  {
    tittel: 'Før stiftelsen: forbered overføringen',
    tekst: (
      <>
        Aktivitet, driftsmidler og forpliktelser i virksomheten må i det vesentlige overføres til aksjeselskapet (
        <Ekstern href={kilder.fsfin5}>skatteforskriften § 11-20-5</Ekstern>), og du må eie alle aksjene. Det må også
        legges fram en erklæring fra revisor om at eiendelene ikke er oppført over virkelig verdi (
        <Ekstern href={kilder.fsfin3}>skatteforskriften § 11-20-3</Ekstern>).
      </>
    ),
  },
  {
    tittel: 'Innen 1. juli: stift og registrer',
    tekst: (
      <>
        Stift aksjeselskapet og send melding til Foretaksregisteret innen 1. juli. Da kan omdanningen få virkning fra 1.
        januar samme år, forutsatt at selskapet har foretatt skattetrekk og beregnet arbeidsgiveravgift senest fra 1. juli
        (<Ekstern href={kilder.fsfin}>skatteforskriften § 11-20-4</Ekstern>). Du registrerer det nye aksjeselskapet og
        avvikler deretter enkeltpersonforetaket. En direkte omdanning kan ikke registreres (
        <Ekstern href={kilder.brregEnk}>Brønnøysundregistrene</Ekstern>). Det nye aksjeselskapet får nytt
        organisasjonsnummer (<Ekstern href={kilder.enhetsregisterloven}>enhetsregisterloven § 6-2</Ekstern>), så avtaler
        med kunder og leverandører må normalt reforhandles (<Ekstern href={kilder.altinnOmdanning}>Altinn</Ekstern>).
      </>
    ),
  },
  {
    tittel: 'Skattemeldingen: legg ved oversikten',
    tekst: (
      <>
        En spesifisert oppgave over eiendeler og forpliktelser som er overført, skal legges ved skattemeldingen (
        <Ekstern href={kilder.fsfin}>skatteforskriften § 11-20-5</Ekstern>).
      </>
    ),
  },
];

export default function EnkEllerAsPage() {
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
                { name: 'ENK eller AS?', href: a.path },
              ]}
            />
            <div className="mt-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <span className="block h-0.5 w-10 bg-flyd-mint" aria-hidden="true" />
                <Eyebrow tone="petrol" className="mt-5">
                  Artikkel · Selskapsform
                </Eyebrow>
                <h1 className="mt-5 font-display text-display-xl font-semibold text-flyd-sand">{a.h1}</h1>
                <p className="mt-8 max-w-2xl font-display text-ingress font-medium text-flyd-dempet">
                  Enkeltpersonforetak er enklest å starte, men du har fullt personlig ansvar for gjelden. Aksjeselskap
                  gir begrenset ansvar og mer fleksibilitet i skatt, mot flere formelle krav. Vurderer du å bytte, er
                  nyttår det naturlige tidspunktet.
                </p>
                <p className="mt-6 text-[15px] text-flyd-dempet">
                  Sist oppdatert <time dateTime={a.modified}>15. oktober 2026</time>.
                </p>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <ButtonLink href={kontakt} variant="primary-dark" withArrow>
                    Snakk med oss
                  </ButtonLink>
                  <ButtonLink href="#omdanning" variant="secondary-dark">
                    Slik går du fra ENK til AS
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
            <h2 className={`mt-5 ${h2}`}>ENK og AS side om side</h2>
          </div>
          <div className="mt-10 max-w-5xl overflow-x-auto" tabIndex={0} role="region" aria-label="ENK og AS side om side">
            <table className="w-full min-w-[640px] border-collapse text-left text-[16px] leading-relaxed text-flyd-skog">
              <thead>
                <tr className="border-b-2 border-flyd-linje-sand font-display text-[15px] font-semibold">
                  <th scope="col" className="py-3 pr-6">
                    <span className="sr-only">Tema</span>
                  </th>
                  <th scope="col" className="py-3 pr-6">
                    Enkeltpersonforetak
                  </th>
                  <th scope="col" className="py-3">
                    Aksjeselskap
                  </th>
                </tr>
              </thead>
              <tbody>
                {sammenligning.map((r) => (
                  <tr key={r.tema} className="border-b border-flyd-linje-sand align-top">
                    <th scope="row" className="py-4 pr-6 font-display font-semibold">
                      {r.tema}
                    </th>
                    <td className="py-4 pr-6 text-flyd-skifer">{r.enk}</td>
                    <td className="py-4 text-flyd-skifer">{r.as}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`mt-6 max-w-3xl ${brod}`}>
            Kilder: <Ekstern href={kilder.brregEnk}>Brønnøysundregistrene</Ekstern>,{' '}
            <Ekstern href={kilder.aksjeloven12}>aksjeloven § 1-2</Ekstern> og{' '}
            <Ekstern href={kilder.aksjeloven31}>§ 3-1</Ekstern>,{' '}
            <Ekstern href={kilder.forskuddsutskrivingen}>Skatteetaten</Ekstern> og{' '}
            <Ekstern href={kilder.regnskapSkatteetaten}>Skatteetaten om regnskap</Ekstern>.
          </p>
        </Container>
      </Section>

      {/* ANSVAR */}
      <Section tone="lysmint" id="ansvar">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Ansvar</Eyebrow>
            <h2 className={`mt-5 ${h2}`}>Ansvar: den viktigste forskjellen</h2>
            <p className={`mt-6 ${brod}`}>
              I et enkeltpersonforetak er det ikke noe skille mellom deg og virksomheten. Innehaveren har fullt personlig
              ansvar for gjeld og forpliktelser (<Ekstern href={kilder.brregEnk}>Brønnøysundregistrene</Ekstern>).
            </p>
            <p className={`mt-5 ${brod}`}>
              Et aksjeselskap er en egen enhet. Aksjeeierne hefter ikke overfor kreditorene for selskapets forpliktelser (
              <Ekstern href={kilder.aksjeloven12}>aksjeloven § 1-2</Ekstern>). Til gjengjeld følger det plikter med
              vervene: styret skal påse at virksomhet, regnskap og formuesforvaltning er under betryggende kontroll (
              <Ekstern href={kilder.aksjeloven612}>§ 6-12</Ekstern>), og daglig leder skal sørge for at regnskapet er i
              samsvar med lov og forskrifter (<Ekstern href={kilder.aksjeloven614}>§ 6-14</Ekstern>).
            </p>
          </div>
        </Container>
      </Section>

      {/* SKATT */}
      <Section tone="sand" id="skatt">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Skatt</Eyebrow>
            <h2 className={`mt-5 ${h2}`}>Skatt: hvordan det skiller seg</h2>
            <p className={`mt-6 ${brod}`}>
              Satsene under gjelder 2026 (<Ekstern href={kilder.forskuddsutskrivingen}>Skatteetaten, Forskuddsutskrivingen 2026</Ekstern>
              ). Satsene for 2027 var ikke vedtatt da denne artikkelen ble skrevet.
            </p>

            <h3 className={h3}>Enkeltpersonforetak</h3>
            <p className={`mt-4 ${brod}`}>
              Overskuddet skattes løpende hos deg, enten du tar pengene ut eller ikke. Det skattes som alminnelig inntekt
              med 22 prosent, og i tillegg betaler du trygdeavgift på 10,8 prosent og trinnskatt av personinntekten fra
              næringen. Skatten betales som{' '}
              <Link href="/artikler/forskuddsskatt-enk/" className={lenke}>
                forskuddsskatt
              </Link>{' '}
              gjennom året. Går foretaket med underskudd, kan du få fradrag for det i annen inntekt, for eksempel lønn (
              <Ekstern href={kilder.nyttEnk}>Skatteetaten</Ekstern>).
            </p>

            <h3 className={h3}>Aksjeselskap</h3>
            <p className={`mt-4 ${brod}`}>
              Selskapet betaler 22 prosent skatt av overskuddet. Du tar ut lønn, utbytte eller begge deler. Lønn skattes
              som vanlig lønnsinntekt hos deg. Selskapet betaler arbeidsgiveravgift av lønnen (
              <Ekstern href={kilder.folketrygdloven}>folketrygdloven § 23-2</Ekstern>), og lønnen er en fradragsberettiget
              kostnad for selskapet (<Ekstern href={kilder.skatteloven61}>skatteloven § 6-1</Ekstern>). Utbytte ut over skjermingsfradraget oppjusteres med faktoren 1,72 og
              skattes deretter med 22 prosent hos deg. Overskudd som blir stående i selskapet, skattes bare med
              selskapsskatten. Det er ofte der AS-et gir en fordel, for eksempel når pengene skal brukes til nye
              investeringer.
            </p>
            <p className={`mt-5 ${brod}`}>
              Tar du ut det meste av overskuddet privat, blir skatteforskjellen ofte liten. Det finnes ingen generell
              skattesparing ved å velge AS.
            </p>
          </div>
        </Container>
      </Section>

      {/* FORMELLE KRAV */}
      <Section tone="lysmint" id="krav">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Arbeid og plikter</Eyebrow>
            <h2 className={`mt-5 ${h2}`}>Arbeid og formelle krav</h2>

            <h3 className={h3}>Enkeltpersonforetak</h3>
            <p className={`mt-4 ${brod}`}>
              Du har bokføringsplikt og leverer skattemelding med næringsspesifikasjon innen 31. mai (
              <Ekstern href={kilder.skattemeldingEnk}>Skatteetaten</Ekstern>). Regnskapsplikt får et ENK først når
              eiendelene er verdt over 20 millioner kroner, eller det har flere ansatte enn 20 årsverk (
              <Ekstern href={kilder.regnskapSkatteetaten}>Skatteetaten</Ekstern>). Et ENK kan også ha ansatte. Betaler du
              lønn til andre, er du arbeidsgiver og leverer a-melding hver måned (
              <Ekstern href={kilder.nyttEnk}>Skatteetaten</Ekstern>). Les også{' '}
              <Link href="/artikler/trenger-jeg-regnskapsforer/" className={lenke}>
                trenger jeg regnskapsfører?
              </Link>
            </p>

            <h3 className={h3}>Aksjeselskap</h3>
            <Punkter
              linje="mint"
              items={[
                <>
                  Årsregnskap til Regnskapsregisteret senest 31. juli (
                  <Ekstern href={kilder.arsregnskap}>Brønnøysundregistrene</Ekstern>).
                </>,
                <>
                  Ordinær generalforsamling innen seks måneder etter utgangen av regnskapsåret (
                  <Ekstern href={kilder.aksjeloven55}>aksjeloven § 5-5</Ekstern>).
                </>,
                'Aksjonærregisteroppgave hvert år og egen skattemelding for selskapet.',
                'A-melding hver måned hvis selskapet betaler lønn, også til deg.',
                <>
                  Revisor hvis driftsinntekten er 7 millioner kroner eller mer, balansesummen er 27 millioner kroner eller
                  mer, eller selskapet har mer enn 10 årsverk (
                  <Ekstern href={kilder.revisjonsplikt}>Brønnøysundregistrene</Ekstern>).
                </>,
              ]}
            />
            <p className={`mt-5 ${brod}`}>
              Se alle datoene i <Link href="/artikler/frister-aksjeselskap/" className={lenke}>fristene for aksjeselskap</Link>.
            </p>
          </div>
        </Container>
      </Section>

      {/* TEGN PÅ AT DET ER PÅ TIDE */}
      <Section tone="sand" id="tegn">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Sjekkliste</Eyebrow>
            <h2 className={`mt-5 ${h2}`}>Tegn på at det er på tide å bytte</h2>
            <p className={`mt-6 ${brod}`}>
              Regelverket har ingen omsetningsgrense for når du må bytte. Dette er tommelfingerregler:
            </p>
            <Punkter
              items={[
                'Risikoen øker, for eksempel med større kontrakter, garantiansvar eller lån.',
                'Du skal ansette folk og vil skille risikoen fra privatøkonomien.',
                'Overskuddet blir større enn det du trenger å ta ut privat.',
                'Du vil ta inn en medeier eller investor.',
                'Kunder eller samarbeidspartnere forventer at du har et aksjeselskap.',
              ]}
            />
          </div>
        </Container>
      </Section>

      {/* OMDANNING */}
      <Section tone="lysmint" id="omdanning">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Omdanning</Eyebrow>
            <h2 className={`mt-5 ${h2}`}>Slik går du fra ENK til AS rundt nyttår</h2>
            <p className={`mt-6 ${brod}`}>
              Et enkeltpersonforetak kan omdannes til aksjeselskap skattefritt hvis vilkårene er oppfylt. Aksjeselskapet
              må være nystiftet, og det kan ikke tas inn nye eiere ved omdanningen (
              <Ekstern href={kilder.altinnOmdanning}>Altinn</Ekstern>). Du må eie 100 prosent av aksjene i det nye
              selskapet etter omdanningen, og aktivitet, driftsmidler og forpliktelser må i det vesentlige overføres. Fast
              eiendom og gjeld kreves ikke overført, og eiendeler du bruker privat, som bolig eller hytte, kan ikke
              overføres (<Ekstern href={kilder.fsfin5}>skatteforskriften § 11-20-5</Ekstern>). Hjemmelen er{' '}
              <Ekstern href={kilder.skatteloven}>skatteloven § 11-20</Ekstern>, med regler i{' '}
              <Ekstern href={kilder.fsfin}>skatteforskriften §§ 11-20-3 til 11-20-5</Ekstern>. Inngangsverdien på aksjene settes til de
              skattemessige nettoverdiene som er overført (<Ekstern href={kilder.inngangsverdi}>Skatteetaten</Ekstern>).
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
              Stiftes selskapet etter 1. juli, kan overgangen til selskapsfastsetting tidligst skje fra 1. januar året etter
              (<Ekstern href={kilder.fsfin}>skatteforskriften § 11-20-4</Ekstern>). Starter du med et nytt aksjeselskap, er
              det lurt å sjekke kravene til{' '}
              <Link href="/artikler/e-faktura-2027/" className={lenke}>
                e-faktura fra 2027
              </Link>{' '}
              når du velger regnskapssystem.
            </p>
          </div>
        </Container>
      </Section>

      {/* BLI I ENK */}
      <Section tone="sand" id="bli">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Bli i ENK</Eyebrow>
            <h2 className={`mt-5 ${h2}`}>Når bør du bli i ENK?</h2>
            <Punkter
              items={[
                'Risikoen i virksomheten er lav.',
                'Overskuddet er lite, eller du tar ut det meste privat.',
                <>
                  Du venter underskudd de første årene. Underskudd i ENK kan trekkes fra i annen inntekt, for eksempel lønn
                  (<Ekstern href={kilder.nyttEnk}>Skatteetaten</Ekstern>).
                </>,
                'Du ønsker minst mulig administrasjon og færrest mulig frister.',
              ]}
            />
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section tone="lysmint" id="sporsmal">
        <Container>
          <Eyebrow>Spørsmål og svar</Eyebrow>
          <h2 className={`mt-5 max-w-3xl ${h2}`}>Ofte stilte spørsmål om ENK og AS</h2>
          <div className="mt-8 max-w-4xl space-y-3">
            {enkEllerAsFaq.map((f) => (
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
                Vurderer du AS fra nyttår?
              </h2>
              <p className="mt-6 text-[17px] leading-[1.65] text-flyd-dempet">
                Ta en uforpliktende prat. Vi sier ærlig fra om det lønner seg for deg.
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
