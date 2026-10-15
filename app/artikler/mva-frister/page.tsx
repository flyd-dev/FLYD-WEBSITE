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
import { mvaFrister as a, mvaFaq, kilder, terminer2026 } from '@/data/mva-frister';
import toppbilde from '@/public/header/topp-mva-frister.webp';

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
  mainEntity: mvaFaq.map((f) => ({
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

export default function MvaFristerPage() {
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
                { name: 'Mva-frister', href: a.path },
              ]}
            />
            <div className="mt-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <span className="block h-0.5 w-10 bg-flyd-mint" aria-hidden="true" />
                <Eyebrow tone="petrol" className="mt-5">
                  Artikkel · Merverdiavgift
                </Eyebrow>
                <h1 className="mt-5 font-display text-display-xl font-semibold text-flyd-sand">{a.h1}</h1>
                <p className="mt-8 max-w-2xl font-display text-ingress font-medium text-flyd-dempet">
                  De fleste leverer mva-melding seks ganger i året, og betalingsfristen er den samme som
                  leveringsfristen. Fristen er én måned og ti dager etter hver termin, unntatt mai–juni, som har frist
                  31. august. Små virksomheter kan søke om å levere én gang i året.
                </p>
                <p className="mt-6 text-[15px] text-flyd-dempet">
                  Sist oppdatert <time dateTime={a.modified}>15. oktober 2026</time>.
                </p>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <ButtonLink href={kontakt} variant="primary-dark" withArrow>
                    Snakk med oss
                  </ButtonLink>
                  <ButtonLink href="#frister" variant="secondary-dark">
                    Se fristene for 2026
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
                'Vanlig termin er to måneder. Fristen er én måned og ti dager etter terminen, men 31. august for mai–juni.',
                'Du leverer og betaler innen samme frist.',
                'Har du høyst 1 million kroner i mva-pliktig omsetning og uttak i året, kan du søke om årstermin med frist 10. mars.',
                'Mva-meldingen skal leveres også når omsetningen er null.',
                'Faller betalingsfristen på helg eller helligdag, flyttes den til nærmeste virkedag. I 2026 oppga Skatteetaten mandag 12. oktober i stedet for lørdag 10. oktober.',
              ]}
            />
          </div>
        </Container>
      </Section>

      {/* FRISTER 2026 */}
      <Section tone="lysmint" id="frister">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Frister 2026</Eyebrow>
            <h2 className={`mt-5 ${h2}`}>Mva-fristene for 2026</h2>
            <p className={`mt-6 ${brod}`}>
              Fristene under gjelder alminnelig tomånedlig termin, og de er frister for både levering og betaling (
              <Ekstern href={kilder.forskrift}>skatteforvaltningsforskriften § 8-3-10</Ekstern>,{' '}
              <Ekstern href={kilder.skattekalender}>Skatteetatens skattekalender</Ekstern>).
            </p>
          </div>
          <div className="mt-10 max-w-5xl overflow-x-auto">
            {/* Ingen minstebredde: tabellen er smal nok til mobil, og fristkolonnen skal ikke skjules bak scroll. */}
            <table className="w-full border-collapse text-left text-[15px] leading-relaxed text-flyd-skog sm:text-[16px] [&_td]:pr-3 [&_th]:pr-3 sm:[&_td]:pr-6 sm:[&_th]:pr-6">
              <thead>
                <tr className="border-b-2 border-flyd-linje-mint font-display text-[15px] font-semibold">
                  <th scope="col" className="py-3 pr-6">
                    Termin
                  </th>
                  <th scope="col" className="py-3 pr-6">
                    Periode
                  </th>
                  <th scope="col" className="py-3">
                    Frist for levering og betaling
                  </th>
                </tr>
              </thead>
              <tbody>
                {terminer2026.map((t) => (
                  <tr key={t.termin} className="border-b border-flyd-linje-mint align-top">
                    <th scope="row" className="whitespace-nowrap py-4 pr-6 font-display font-semibold">
                      {t.termin}
                    </th>
                    <td className="py-4 pr-6 text-flyd-skifer">{t.periode}</td>
                    <td className="py-4">
                      <time dateTime={t.iso} className="font-semibold">
                        {t.frist}
                      </time>
                      {t.merknad && <span className="block text-[15px] text-flyd-skifer">{t.merknad}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="max-w-3xl">
            <h3 className={h3}>Hvorfor er fristen for mai–juni 31. august?</h3>
            <p className={`mt-4 ${brod}`}>
              Fristen for 3. termin er flyttet til 31. august. Skatteetaten begrunner det med regnskapsførernes
              «arbeidsbyrde rundt avviklingen av sommerferien» (
              <Ekstern href={kilder.handboken}>skattebetalingshåndboken</Ekstern>).
            </p>

            <h3 className={h3}>Hva skjer når fristen er på helg eller helligdag?</h3>
            <p className={`mt-4 ${brod}`}>
              Utløper betalingsfristen på en lørdag, søndag, helligdag eller lovfestet høytidsdag, flyttes den til
              nærmeste virkedag (<Ekstern href={kilder.skattebetalingsloven}>skattebetalingsloven § 10-2</Ekstern>). I
              2026 gjaldt det 4. termin: 10. oktober var en lørdag, og Skatteetatens{' '}
              <Ekstern href={kilder.skattekalender}>skattekalender</Ekstern> oppga mandag 12. oktober som frist for
              levering og betaling.
            </p>
          </div>
        </Container>
      </Section>

      {/* SAMME FRIST */}
      <Section tone="sand" id="betaling">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Betaling</Eyebrow>
            <h2 className={`mt-5 ${h2}`}>Leveringsfrist og betalingsfrist er den samme</h2>
            <p className={`mt-6 ${brod}`}>
              Merverdiavgiften for en termin forfaller samme dag som mva-meldingen skal leveres (
              <Ekstern href={kilder.skattebetalingsloven}>skattebetalingsloven § 10-30</Ekstern>). Når meldingen er
              sendt, finner du betalingsinformasjonen i Skatteetatens mva-tjeneste eller i kvitteringen i Altinn (
              <Ekstern href={kilder.betaleMva}>Skatteetaten</Ekstern>).
            </p>
          </div>
        </Container>
      </Section>

      {/* ÅRSTERMIN */}
      <Section tone="lysmint" id="arstermin">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Årstermin</Eyebrow>
            <h2 className={`mt-5 ${h2}`}>Kan jeg levere mva-melding én gang i året?</h2>
            <p className={`mt-6 ${brod}`}>
              Ja, små virksomheter kan søke om årstermin. Vilkårene er (
              <Ekstern href={kilder.arstermin}>Skatteetaten</Ekstern>):
            </p>
            <Punkter
              linje="mint"
              items={[
                'Mva-pliktig omsetning og uttak er høyst 1 million kroner i kalenderåret.',
                'Virksomheten har vært registrert i Merverdiavgiftsregisteret i minst 12 måneder.',
                'Virksomheten har levert mva-meldinger og betalt i tide.',
              ]}
            />

            <h3 className={h3}>Søknad og frist</h3>
            <p className={`mt-4 ${brod}`}>
              Du søker i Skatteetatens mva-tjeneste mellom 10. desember og 1. februar. Søknader etter 1. februar blir
              ikke tatt imot. Med årstermin er fristen for levering og betaling 10. mars året etter, for 2026 altså 10.
              mars 2027.
            </p>

            <h3 className={h3}>Tilbake til annenhver måned</h3>
            <p className={`mt-4 ${brod}`}>
              Vil du gå tilbake til tomånedlige terminer, sier du fra til Skatteetaten. Da må du levere annenhver
              måned i minst de to neste årene.
            </p>

            <h3 className={h3}>Jordbruk, skogbruk og fiske</h3>
            <p className={`mt-4 ${brod}`}>
              Primærnæringer som jordbruk, skogbruk, reindrift og fiske leverer normalt én mva-melding for hele
              kalenderåret, med frist for levering og betaling 10. april året etter. Grensen på 1 million kroner gjelder
              ikke for dem, men har du annen avgiftspliktig omsetning over 30 000 kroner, må du si fra til
              Skatteetaten (<Ekstern href={kilder.betaleMva}>Skatteetaten</Ekstern>).
            </p>
          </div>
        </Container>
      </Section>

      {/* REGISTRERING */}
      <Section tone="sand" id="registrering">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Registrering</Eyebrow>
            <h2 className={`mt-5 ${h2}`}>Når må jeg registrere meg i Merverdiavgiftsregisteret?</h2>
            <p className={`mt-6 ${brod}`}>
              Du skal registrere virksomheten når salget av mva-pliktige varer og tjenester har passert 50 000 kroner i
              løpet av en periode på 12 måneder. For veldedige og allmennyttige organisasjoner er grensen 140 000 kroner.
              Fakturer ikke med merverdiavgift før registreringen er godkjent (
              <Ekstern href={kilder.registrere}>Skatteetaten</Ekstern>).
            </p>
          </div>
        </Container>
      </Section>

      {/* FOR SENT */}
      <Section tone="lysmint" id="for-sent">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Forsinkelse</Eyebrow>
            <h2 className={`mt-5 ${h2}`}>Hva skjer hvis jeg leverer eller betaler for sent?</h2>
            <Punkter
              linje="mint"
              items={[
                <>
                  Betaler du for sent, løper det renter fra forfall til betaling skjer. Skatteetaten skriver at
                  merverdiavgift skal betales ved forfall (<Ekstern href={kilder.betaleMva}>Skatteetaten</Ekstern>).
                </>,
                <>
                  Leverer du ikke mva-meldingen i tide, kan du få tvangsmulkt, også for terminer uten omsetning (
                  <Ekstern href={kilder.registrere}>Skatteetaten</Ekstern>).
                </>,
                <>
                  Meldingen skal leveres selv om det ikke har vært mva-pliktig omsetning eller uttak i terminen (
                  <Ekstern href={kilder.skatteforvaltningsloven}>skatteforvaltningsloven § 8-3</Ekstern>).
                </>,
              ]}
            />
            <p className={`mt-6 ${brod}`}>
              Rentesatsen endres, så vi oppgir den ikke her. Skatteetaten publiserer gjeldende sats for
              forsinkelsesrenter.
            </p>
          </div>
        </Container>
      </Section>

      {/* REGNSKAPSFØRER */}
      <Section tone="sand" id="regnskapsforer">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Altinn-tilgang</Eyebrow>
            <h2 className={`mt-5 ${h2}`}>Kan regnskapsføreren levere for meg?</h2>
            <p className={`mt-6 ${brod}`}>
              Ja. For å fylle ut og sende inn mva-meldingen trengs tilgangspakken «Merverdiavgift» eller «Regnskapsfører
              med signeringsrettighet» i Altinn. Daglig leder og styreleder får «Merverdiavgift» automatisk.
              Regnskapsfører uten signeringsrett kan fylle ut meldingen, men ikke sende den inn. Skatteetaten skriver
              at roller og rolledelegeringer i gamle Altinn fjernes 1. januar 2027, og at du da må ha riktig
              tilgangspakke (<Ekstern href={kilder.mvaMelding}>Skatteetaten</Ekstern>).
            </p>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section tone="lysmint" id="sporsmal">
        <Container>
          <Eyebrow>Spørsmål og svar</Eyebrow>
          <h2 className={`mt-5 max-w-3xl ${h2}`}>Ofte stilte spørsmål om mva-frister</h2>
          <div className="mt-8 max-w-4xl space-y-3">
            {mvaFaq.map((f) => (
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
                Slipp å holde styr på fristene selv
              </h2>
              <p className="mt-6 text-[17px] leading-[1.65] text-flyd-dempet">
                Vi leverer mva-meldingen for deg, til riktig tid. Vi hjelper deg med:
              </p>
              <NumberedList
                tone="dark"
                className="mt-8"
                items={[
                  'Mva-meldingen hver termin, eller én gang i året hvis du har årstermin.',
                  'Søknad om årstermin når vilkårene er oppfylt.',
                  'Registrering i Merverdiavgiftsregisteret når du passerer grensen.',
                  'Lønn og a-melding, så alle fristene ligger hos samme byrå.',
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
