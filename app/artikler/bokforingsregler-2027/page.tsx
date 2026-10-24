import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import Container from '@/components/Container';
import Section from '@/components/Section';
import Eyebrow from '@/components/Eyebrow';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import { ButtonLink, TextLink } from '@/components/Button';
import { pageMetadata, siteUrl } from '@/lib/seo';
import {
  bokforingsregler2027 as a,
  bokforingsregler2027Faq,
  gjelderTekst,
  kilder,
  type Gjelder,
} from '@/data/bokforingsregler-2027';
import toppbilde from '@/public/header/topp-bokforingsregler-2027.webp';

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

// Etiketten står også først i svaret i JSON-LD, så den følger med i søkeresultatet.
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${url}#faq`,
  mainEntity: bokforingsregler2027Faq.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: `${gjelderTekst[f.gjelder]}: ${f.a}` },
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

/** Fast merking av hver regel: «Gjelder i 2026» (Skog) eller «Fra 1.1.2027» (Mint). */
function Etikett({ g }: { g: Gjelder }) {
  const farge = g === '2026' ? 'bg-flyd-skog text-flyd-sand' : 'bg-flyd-mint text-flyd-skog';
  return (
    <span
      className={`inline-flex flex-shrink-0 items-center whitespace-nowrap rounded-pille px-3 py-0.5 text-[13px] font-medium leading-6 ${farge}`}
    >
      {gjelderTekst[g]}
    </span>
  );
}

function Regler({ items, linje = 'sand' }: { items: { g: Gjelder; tekst: React.ReactNode }[]; linje?: 'sand' | 'mint' }) {
  const border = linje === 'sand' ? 'border-flyd-linje-sand' : 'border-flyd-linje-mint';
  return (
    <ul className={`mt-5 border-t ${border}`}>
      {items.map((r, i) => (
        <li
          key={i}
          className={`flex flex-col items-start gap-2 border-b ${border} py-3 text-[16px] leading-relaxed text-flyd-skog sm:flex-row sm:gap-4`}
        >
          <Etikett g={r.g} />
          <span>{r.tekst}</span>
        </li>
      ))}
    </ul>
  );
}

export default function Bokforingsregler2027Page() {
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
                { name: 'Bokføringsregler 2027', href: a.path },
              ]}
            />
            <div className="mt-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <span className="block h-0.5 w-10 bg-flyd-mint" aria-hidden="true" />
                <Eyebrow tone="petrol" className="mt-5">
                  Artikkel · Enkeltpersonforetak
                </Eyebrow>
                <h1 className="mt-5 font-display text-display-xl font-semibold text-flyd-sand">{a.h1.replace('bokføringsregler', 'bokførings\u00ADregler')}</h1>
                <p className="mt-8 max-w-2xl font-display text-ingress font-medium text-flyd-dempet">
                  Fra 1. januar 2027 slipper bokføringspliktige med omsetning på høyst 50 000 kroner i året en rekke
                  bokføringskrav. Du må fortsatt dokumentere salg og kjøp og ta vare på dokumentasjonen. Unntaket gjelder
                  ikke hvis du er mva-registrert eller regnskapspliktig, og det faller bort straks omsetningen passerer
                  50 000 kroner. Ut 2026 gjelder dagens regler fullt ut.
                </p>
                <p className="mt-6 text-[15px] text-flyd-dempet">
                  Sist oppdatert <time dateTime={a.modified}>15. oktober 2026</time>.
                </p>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <ButtonLink href={kontakt} variant="primary-dark" withArrow>
                    Snakk med oss
                  </ButtonLink>
                  <ButtonLink href="#fra-2027" variant="secondary-dark">
                    Dette endres i 2027
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
            <h2 className={`mt-5 ${h2}`}>Dette gjelder når</h2>
            <p className={`mt-6 ${brod}`}>
              Hver regel i artikkelen er merket med <Etikett g="2026" /> eller <Etikett g="2027" />.
            </p>
            <Regler
              items={[
                {
                  g: '2026',
                  tekst: 'Alle bokføringspliktige ENK følger bokføringsreglene fullt ut, også med lav omsetning.',
                },
                {
                  g: '2027',
                  tekst: 'Omsetning på høyst 50 000 kroner i kalenderåret: unntatt fra bokføringsloven §§ 5 til 9 og § 13 b.',
                },
                {
                  g: '2027',
                  tekst: 'Du må fortsatt dokumentere transaksjoner (§§ 10 og 11) og oppbevare dokumentasjonen (§ 13).',
                },
                { g: '2027', tekst: 'Unntaket gjelder ikke for mva-registrerte eller regnskapspliktige.' },
                { g: '2027', tekst: 'Passerer du 50 000 kroner, gjelder de vanlige reglene fra det tidspunktet.' },
              ]}
            />
            <p className={`mt-6 ${brod}`}>
              Kilde:{' '}
              <Ekstern href={kilder.forskrift}>forskrift 29. september 2026 nr. 1933 om endring i bokføringsforskriften</Ekstern>
              , fastsatt av Skattedirektoratet (
              <Ekstern href={kilder.skattedirektoratet}>Skatteetaten, 30. september 2026</Ekstern>).
            </p>
          </div>
        </Container>
      </Section>

      {/* 2026 */}
      <Section tone="lysmint" id="i-2026">
        <Container>
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-4">
              <Eyebrow>I år</Eyebrow>
              <Etikett g="2026" />
            </div>
            <h2 className={`mt-5 ${h2}`}>Hva gjelder i 2026?</h2>
            <Regler
              linje="mint"
              items={[
                {
                  g: '2026',
                  tekst: (
                    <>
                      Driver du virksomhet og skal levere skattemelding for formues- og inntektsskatt, er du
                      bokføringspliktig (<Ekstern href={kilder.bokforingsloven2}>bokføringsloven § 2</Ekstern>).
                    </>
                  ),
                },
                {
                  g: '2026',
                  tekst: (
                    <>
                      Bokføringsforskriften har ingen lettelse basert på omsetning. Det eneste unntaket i kapittel 1 gjelder
                      konkursbo (<Ekstern href={kilder.bokforingsforskriften}>bokføringsforskriften § 1-1</Ekstern>).
                    </>
                  ),
                },
                {
                  g: '2026',
                  tekst: (
                    <>
                      Skattemeldingen for ENK har frist 31. mai, og Skatteetaten ber deg avslutte bokføringen for fjoråret
                      før du fyller den ut (<Ekstern href={kilder.skattemeldingEnk}>Skatteetaten</Ekstern>).
                    </>
                  ),
                },
              ]}
            />

            <div className="mt-10 rounded-kort bg-flyd-sand p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="font-display text-[20px] font-semibold leading-[1.3] text-flyd-skog">
                  Ikke bland med forenklet næringsspesifikasjon
                </h3>
                <Etikett g="2026" />
              </div>
              <p className="mt-3 text-[16px] leading-relaxed text-flyd-skifer">
                Når du fyller ut skattemeldingen for ENK, får du spørsmål om driftsinntektene var over 50 000 kroner.
                Svarer du nei, får du en forenklet næringsspesifikasjon (
                <Ekstern href={kilder.skattemeldingEnk}>Skatteetaten</Ekstern>). Det er en ordning i skattemeldingen, ikke
                et unntak fra bokføringsreglene. Lettelsen i bokføringen er en egen regel som først gjelder fra 1. januar
                2027.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* 2027 */}
      <Section tone="sand" id="fra-2027">
        <Container>
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-4">
              <Eyebrow>Nytt</Eyebrow>
              <Etikett g="2027" />
            </div>
            <h2 className={`mt-5 ${h2}`}>Hva endres 1.1.2027?</h2>
            <p className={`mt-6 ${brod}`}>
              Skattedirektoratet fastsatte 29. september 2026 en ny § 1-2 i bokføringsforskriften om bokføringspliktige med
              lav omsetning (<Ekstern href={kilder.forskrift}>Lovdata</Ekstern>). Den trer i kraft 1. januar 2027.
            </p>

            <h3 className={h3}>Hvem får lettelsen</h3>
            <p className={`mt-4 ${brod}`}>Alle vilkårene må være oppfylt:</p>
            <Regler
              items={[
                { g: '2027', tekst: 'Du er bokføringspliktig og leverer skattemelding for formues- og inntektsskatt.' },
                { g: '2027', tekst: 'Omsetningen overstiger ikke 50 000 kroner i løpet av kalenderåret.' },
                { g: '2027', tekst: 'Du er ikke regnskapspliktig etter regnskapsloven § 1-2.' },
                {
                  g: '2027',
                  tekst: 'Du har ikke plikt til å levere skattemelding for merverdiavgift, altså er du ikke mva-registrert.',
                },
                {
                  g: '2027',
                  tekst: 'Du er ikke blant enkelte andre bokføringspliktige som er nevnt i skatteforvaltningsforskriften § 8-2-1 annet ledd.',
                },
              ]}
            />

            <h3 className={h3}>Hva du slipper</h3>
            <p className={`mt-4 ${brod}`}>
              Du blir unntatt fra disse paragrafene i{' '}
              <Ekstern href={kilder.bokforingsloven}>bokføringsloven</Ekstern>:
            </p>
            <Regler
              items={[
                {
                  g: '2027',
                  tekst: '§ 5 Spesifikasjoner: kravet om å kunne lage bokførings-, konto-, kunde- og leverandørspesifikasjoner.',
                },
                {
                  g: '2027',
                  tekst: '§ 6 Sporbarhet: kravet om at bokførte opplysninger kan følges fra dokumentasjon til rapportering og tilbake.',
                },
                {
                  g: '2027',
                  tekst: '§ 7 Bokføring og ajourhold: kravet om å bokføre opplysningene og holde bokføringen à jour innen fristene.',
                },
                { g: '2027', tekst: '§ 8 Bokføringsvaluta: kravet om å bokføre i norske kroner.' },
                { g: '2027', tekst: '§ 9 Retting: reglene for hvordan bokførte opplysninger rettes.' },
                {
                  g: '2027',
                  tekst: '§ 13 b Elektronisk tilgjengelighet: kravet om at bokførte opplysninger er elektronisk tilgjengelige i en periode.',
                },
              ]}
            />

            <h3 className={h3}>Hva du fortsatt må gjøre</h3>
            <Regler
              items={[
                {
                  g: '2027',
                  tekst:
                    'Dokumentere transaksjoner etter bokføringsloven § 10 (dokumentasjon) og § 11 (dokumentasjon av balansen), og etter bokføringsforskriften kapittel 5, 6 og 8. Det omfatter blant annet salgsdokumenter og dokumentasjon av varelager.',
                },
                {
                  g: '2027',
                  tekst: 'Oppbevare dokumentasjonen etter bokføringsloven § 13 og bokføringsforskriften kapittel 7 og 8.',
                },
              ]}
            />
            <p className={`mt-5 ${brod}`}>
              Bokføringsloven §§ 10, 11 og 13 endres også 1. januar 2027 (
              <Ekstern href={kilder.lovendring}>lov 19. juni 2026 nr. 39</Ekstern>).
            </p>

            <h3 className={h3}>Hvis du passerer 50 000 kroner</h3>
            <Regler
              items={[
                {
                  g: '2027',
                  tekst:
                    'Overstiger omsetningen 50 000 kroner i løpet av kalenderåret, opphører unntaket fra det tidspunktet grensen overskrides, ikke fra 1. januar.',
                },
              ]}
            />
            <p className={`mt-5 ${brod}`}>
              Følg med på omsetningen gjennom året. Grensen for mva-registrering er også 50 000 kroner, men den er en egen
              regel og måles over en periode på tolv måneder:
            </p>
            <Regler
              items={[
                {
                  g: '2026',
                  tekst: (
                    <>
                      Du skal registrere virksomheten i Mva-registeret når du har solgt mva-pliktige varer og
                      tjenester for mer enn 50 000 kroner (uten mva) i løpet av en periode på tolv måneder (
                      <Ekstern href={kilder.mvaRegistrering}>Skatteetaten</Ekstern>). Se også{' '}
                      <Link href="/artikler/mva-frister/" className={lenke}>
                        mva-fristene
                      </Link>
                      .
                    </>
                  ),
                },
              ]}
            />
          </div>
        </Container>
      </Section>

      {/* E-FAKTURA */}
      <Section tone="lysmint" id="e-faktura">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>E-faktura</Eyebrow>
            <h2 className={`mt-5 ${h2}`}>Og e-faktura?</h2>
            <Regler
              linje="mint"
              items={[
                {
                  g: '2027',
                  tekst:
                    'Får du lettelsen, gjelder kravet om å utstede e-faktura ved salg av varer bare hvis du fakturerer i et faktureringssystem som har funksjonen. Forskriften nevner salg av varer, mens e-fakturakravet i bokføringsloven § 10 annet ledd gjelder salg av varer og tjenester (bokføringsforskriften § 1-2 første ledd).',
                },
              ]}
            />
            <p className={`mt-5 ${brod}`}>
              Alt annet om e-faktura og EHF står i{' '}
              <Link href="/artikler/e-faktura-2027/" className={lenke}>
                e-faktura fra 2027
              </Link>
              .
            </p>
          </div>
        </Container>
      </Section>

      {/* REGNSKAPSPROGRAM */}
      <Section tone="sand" id="program">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>I praksis</Eyebrow>
            <h2 className={`mt-5 ${h2}`}>Bør du fortsatt bruke regnskapsprogram?</h2>
            <Regler
              items={[
                {
                  g: '2027',
                  tekst: 'Lettelsen fjerner ikke kravet om å dokumentere salg og kjøp og ta vare på dokumentasjonen.',
                },
              ]}
            />
            <p className={`mt-5 ${brod}`}>
              Mange vil derfor fortsatt ha nytte av et enkelt system for fakturaer og kvitteringer, særlig hvis omsetningen
              kan komme over 50 000 kroner. Les også{' '}
              <Link href="/artikler/trenger-jeg-regnskapsforer/" className={lenke}>
                trenger jeg regnskapsfører?
              </Link>{' '}
              og{' '}
              <Link href="/artikler/enk-eller-as/" className={lenke}>
                ENK eller AS?
              </Link>
            </p>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section tone="lysmint" id="sporsmal">
        <Container>
          <Eyebrow>Spørsmål og svar</Eyebrow>
          <h2 className={`mt-5 max-w-3xl ${h2}`}>Ofte stilte spørsmål om bokføringsreglene</h2>
          <div className="mt-8 max-w-4xl space-y-3">
            {bokforingsregler2027Faq.map((f) => (
              <details key={f.q} className="faq group rounded-kort bg-flyd-sand px-6 md:px-7">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-flis py-5 font-display text-[18px] font-semibold text-flyd-skog transition-colors duration-200 hover:text-flyd-petrol">
                  <span className="min-w-0 break-words max-sm:hyphens-auto">{f.q}</span>
                  <Plus className="faq-pil h-5 w-5 flex-shrink-0 text-flyd-teal" strokeWidth={2} aria-hidden="true" />
                </summary>
                <div className="faq-svar pb-6">
                  <Etikett g={f.gjelder} />
                  <p className="mt-3 text-[16px] leading-relaxed text-flyd-skifer">{f.a}</p>
                </div>
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
                Usikker på om lettelsen gjelder deg?
              </h2>
              <p className="mt-6 text-[17px] leading-[1.65] text-flyd-dempet">
                Ta en uforpliktende prat. Vi sier ærlig fra om hva som gjelder for ENK-et ditt.
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
