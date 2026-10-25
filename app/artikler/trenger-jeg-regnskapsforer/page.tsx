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
import { trengerRegnskapsforer as a, trengerFaq, kilder } from '@/data/trenger-regnskapsforer';
import toppbilde from '@/public/header/topp-trenger-regnskapsforer.webp';

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
  mainEntity: trengerFaq.map((f) => ({
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

function Intern({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className={lenke}>
      {children}
    </Link>
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

export default function TrengerRegnskapsforerPage() {
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
                { name: 'Trenger jeg regnskapsfører?', href: a.path },
              ]}
            />
            <div className="mt-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <span className="block h-0.5 w-10 bg-flyd-mint" aria-hidden="true" />
                <Eyebrow tone="petrol" className="mt-5">
                  Artikkel · Regnskap
                </Eyebrow>
                <h1 className="mt-5 font-display text-display-xl font-semibold text-flyd-sand">{a.h1.replace('regnskapsfører?', 'regnskaps\u00ADfører?')}</h1>
                <p className="mt-8 max-w-2xl font-display text-ingress font-medium text-flyd-dempet">
                  Nei, ingen lov krever at du bruker regnskapsfører. Både enkeltpersonforetak og aksjeselskap har
                  bokføringsplikt og kan føre selv, men du står ansvarlig for at alt er riktig og levert til fristen.
                  Bruker du hjelp utenfra, skal det være et regnskapsforetak godkjent av Finanstilsynet.
                </p>
                <p className="mt-6 text-[15px] text-flyd-dempet">
                  Sist oppdatert <time dateTime={a.modified}>15. oktober 2026</time>.
                </p>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <ButtonLink href={kontakt} variant="primary-dark" withArrow>
                    Snakk med oss
                  </ButtonLink>
                  <ButtonLink href="#loven" variant="secondary-dark">
                    Hva loven krever
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
                'Det finnes ingen plikt til å ha regnskapsfører, men det finnes plikt til riktig bokføring og rapportering.',
                'ENK har bokføringsplikt og leverer skattemelding med næringsspesifikasjon. Regnskapsplikt får et ENK først når det blir stort.',
                'Alle AS har regnskapsplikt og sender årsregnskap til Regnskapsregisteret. Styret og daglig leder har ansvaret.',
                'Fører noen regnskapet for deg mot betaling, må det være et regnskapsforetak godkjent av Finanstilsynet.',
              ]}
            />
          </div>
        </Container>
      </Section>

      {/* HVA LOVEN KREVER */}
      <Section tone="lysmint" id="loven">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Bokføringsloven</Eyebrow>
            <h2 className={`mt-5 ${h2}`}>Hva loven faktisk krever</h2>
            <p className={`mt-6 ${brod}`}>
              Den som driver virksomhet og skal levere skattemelding for formues- og inntektsskatt eller mva-melding, har
              bokføringsplikt. Det samme har alle som er regnskapspliktige (
              <Ekstern href={kilder.bokforingsloven}>bokføringsloven § 2</Ekstern>). Bokføringen skal følge de
              grunnleggende prinsippene i § 4: blant annet et ordentlig regnskapssystem, fullstendighet, nøyaktighet,
              dokumentasjon, sporbarhet og oppbevaring. Hovedregelen er at årsregnskap og dokumentasjon av bokførte
              opplysninger skal oppbevares i fem år etter regnskapsårets slutt. Noe tilleggsdokumentasjon, som avtaler og
              korrespondanse, skal oppbevares i tre år og seks måneder (§ 13).
            </p>
            <p className={`mt-5 ${brod}`}>
              Loven sier ikke at en bestemt person skal føre regnskapet. Kravet gjelder resultatet. Overlater du
              bokføringen til andre, må også de gi kontrollmyndighetene bistand til innsyn (§ 14), men du er fortsatt
              bokføringspliktig og ansvarlig.
            </p>
          </div>
        </Container>
      </Section>

      {/* ENK */}
      <Section tone="sand" id="enk">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Enkeltpersonforetak</Eyebrow>
            <h2 className={`mt-5 ${h2}`}>Enkeltpersonforetak: kan du føre selv?</h2>
            <p className={`mt-6 ${brod}`}>
              Ja. Skatteetaten skriver at du kan gjøre dette selv, eller få en regnskapsfører til å gjøre det. Regnskapet
              må uansett følge bokføringsloven og bokføringsforskriften, og dokumentasjonen skal tas vare på i minst fem år
              (<Ekstern href={kilder.nyttEnk}>Skatteetaten</Ekstern>).
            </p>

            <h3 className={h3}>Omsetning under 50 000 kroner fra 2027</h3>
            <p className={`mt-4 ${brod}`}>
              Fra 1. januar 2027 gjelder et nytt unntak for deg som leverer skattemelding for formues- og inntektsskatt:
              Har foretaket omsetning på høyst 50 000 kroner i et kalenderår, og er det verken mva-registrert eller
              regnskapspliktig, slipper du deler av bokføringsreglene. Du må likevel dokumentere transaksjonene og
              oppbevare dokumentasjonen. Unntaket faller bort fra det tidspunktet omsetningen passerer grensen (
              <Ekstern href={kilder.bokforingsforskriftenEndring}>bokføringsforskriften § 1-2</Ekstern>).
            </p>

            <h3 className={h3}>Når kommer flere plikter?</h3>
            <Punkter
              items={[
                <>
                  Selger du mva-pliktige varer og tjenester for mer enn 50 000 kroner i løpet av 12 måneder, må du
                  registrere deg i Merverdiavgiftsregisteret og levere mva-melding (
                  <Ekstern href={kilder.nyttEnk}>Skatteetaten</Ekstern>). Se{' '}
                  <Intern href="/artikler/mva-frister/">mva-fristene</Intern>.
                </>,
                <>
                  Regnskapsplikt får et ENK først når eiendelene er verdt over 20 millioner kroner, eller det har flere
                  ansatte enn 20 årsverk (<Ekstern href={kilder.regnskapSkatteetaten}>Skatteetaten</Ekstern>).
                </>,
                <>
                  Skattemeldingen for enkeltpersonforetak har frist 31. mai (
                  <Ekstern href={kilder.skattemeldingEnk}>Skatteetaten</Ekstern>).
                </>,
              ]}
            />
          </div>
        </Container>
      </Section>

      {/* AS */}
      <Section tone="lysmint" id="as">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Aksjeselskap</Eyebrow>
            <h2 className={`mt-5 ${h2}`}>Aksjeselskap: strengere krav</h2>
            <p className={`mt-6 ${brod}`}>
              Alle aksjeselskap har regnskapsplikt (<Ekstern href={kilder.regnskapSkatteetaten}>Skatteetaten</Ekstern>).
              Komplett årsregnskap skal sendes til Regnskapsregisteret senest 31. juli (
              <Ekstern href={kilder.arsregnskap}>Brønnøysundregistrene</Ekstern>). I tillegg kommer blant annet
              aksjonærregisteroppgaven og selskapets egen skattemelding. Se{' '}
              <Intern href="/artikler/frister-aksjeselskap/">fristene for aksjeselskap</Intern>.
            </p>

            <h3 className={h3}>Ansvaret følger vervet</h3>
            <p className={`mt-4 ${brod}`}>
              Styret plikter å påse at selskapets «virksomhet, regnskap og formuesforvaltning er gjenstand for betryggende
              kontroll» (<Ekstern href={kilder.aksjeloven612}>aksjeloven § 6-12</Ekstern>). Daglig leder skal sørge for at
              selskapets regnskap er i samsvar med lov og forskrifter (
              <Ekstern href={kilder.aksjeloven614}>aksjeloven § 6-14</Ekstern>). Brønnøysundregistrene skriver at styret
              er ansvarlig for innsendingen av årsregnskapet, også når regnskapsfører eller revisor skal sende inn (
              <Ekstern href={kilder.arsregnskap}>Brønnøysundregistrene</Ekstern>).
            </p>

            <h3 className={h3}>Revisor er noe annet</h3>
            <p className={`mt-4 ${brod}`}>
              Et AS har revisjonsplikt hvis driftsinntekten er 7 millioner kroner eller mer, balansesummen er 27 millioner
              kroner eller mer, eller selskapet har mer enn 10 årsverk (
              <Ekstern href={kilder.revisjonsplikt}>Brønnøysundregistrene</Ekstern>). Er selskapet under alle grensene,
              kan generalforsamlingen velge bort revisjon (
              <Ekstern href={kilder.aksjeloven76}>aksjeloven § 7-6</Ekstern>).
            </p>
          </div>
        </Container>
      </Section>

      {/* TEGN PÅ AT DU BØR FÅ HJELP */}
      <Section tone="sand" id="tegn">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Sjekkliste</Eyebrow>
            <h2 className={`mt-5 ${h2}`}>Tegn på at det kan lønne seg å få hjelp</h2>
            <p className={`mt-6 ${brod}`}>
              Du må ikke ha regnskapsfører, men flere plikter og flere bilag gir flere steder å gjøre feil. Det kan være
              verdt å få hjelp når:
            </p>
            <Punkter
              items={[
                'Du har ansatte og skal kjøre lønn og levere a-melding hver måned.',
                'Foretaket er mva-registrert og leverer mva-melding.',
                'Du har mange bilag, varelager, bil i firmaet eller driftsmidler som skal avskrives.',
                'Du har et AS med årsregnskap, aksjonærregisteroppgave og skattemelding hvert år.',
                'Virksomheten vokser, eller du bruker kveldene på bilag.',
                'Du er usikker på hva du kan trekke fra.',
              ]}
            />
            <p className={`mt-5 ${brod}`}>
              Fra 2027 kommer også krav om e-faktura mellom bedrifter. Les mer om{' '}
              <Intern href="/artikler/e-faktura-2027/">e-faktura fra 2027</Intern>.
            </p>
          </div>
        </Container>
      </Section>

      {/* GODKJENT */}
      <Section tone="lysmint" id="godkjent">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Godkjenning</Eyebrow>
            <h2 className={`mt-5 ${h2}`}>Slik sjekker du at regnskapsføreren er godkjent</h2>
            <Punkter
              linje="mint"
              items={[
                '«Regnskapsføring i næring for andre kan bare utføres av regnskapsforetak» (regnskapsførerloven § 2-1). Et regnskapsforetak er enten et regnskapsselskap godkjent av Finanstilsynet, eller en statsautorisert regnskapsfører med eget enkeltpersonforetak (§§ 1-2, 2-2 og 2-3).',
                'Finanstilsynet fører et offentlig register over regnskapsforetak og statsautoriserte regnskapsførere (§ 2-5). Der kan du slå opp foretaket.',
                'Regnskapsforetaket skal inngå en skriftlig oppdragsavtale med deg for hvert oppdrag (§ 5-2).',
                'Foretaket skal utpeke en statsautorisert regnskapsfører som ansvarlig for hvert oppdrag (§ 5-1).',
              ]}
            />
            <p className={`mt-5 ${brod}`}>
              Kilde: <Ekstern href={kilder.regnskapsforerloven}>regnskapsførerloven (Lovdata)</Ekstern>.
            </p>
          </div>
        </Container>
      </Section>

      {/* BYTTE */}
      <Section tone="sand" id="bytte">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Nytt byrå</Eyebrow>
            <h2 className={`mt-5 ${h2}`}>Har du regnskapsfører, men vil bytte?</h2>
            <p className={`mt-6 ${brod}`}>
              Les om <Intern href="/bytte-regnskapsforer/">hvordan du bytter regnskapsfører</Intern>, og om{' '}
              <Intern href="/artikler/altinn-tilgang-regnskapsforer/">hvordan du gir regnskapsføreren tilgang i Altinn</Intern>
              .
            </p>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section tone="lysmint" id="sporsmal">
        <Container>
          <Eyebrow>Spørsmål og svar</Eyebrow>
          <h2 className={`mt-5 max-w-3xl ${h2}`}>Ofte stilte spørsmål om regnskapsfører</h2>
          <div className="mt-8 max-w-4xl space-y-3">
            {trengerFaq.map((f) => (
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
                Usikker på om du klarer deg selv?
              </h2>
              <p className="mt-6 text-[17px] leading-[1.65] text-flyd-dempet">
                Ta en uforpliktende prat. Vi sier ærlig fra hvis du ikke trenger oss ennå.
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
