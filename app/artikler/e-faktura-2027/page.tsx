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
import { eFaktura2027 as a, eFakturaFaq, kilder } from '@/data/e-faktura-2027';
import toppbilde from '@/public/header/topp-e-faktura-2027.webp';

// Tittelen i briefen har allerede « · Flyd», så den settes som absolutt tittel.
const base = pageMetadata({
  absoluteTitle: a.title,
  description: a.description,
  path: a.path,
  image: a.image,
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
  mainEntity: eFakturaFaq.map((f) => ({
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
  image: [a.image.url, `${siteUrl}${a.hero.src}`],
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

// Svarene er ren tekst (de brukes også i FAQPage-JSON-LD). På siden blir
// henvisningen «Hvem er unntatt?» en lenke til unntaksseksjonen.
const unntakRef = '«Hvem er unntatt?»';
function MedUnntakLenke({ tekst }: { tekst: string }) {
  const i = tekst.indexOf(unntakRef);
  if (i < 0) return <>{tekst}</>;
  return (
    <>
      {tekst.slice(0, i)}
      <a href="#unntak" className={lenke}>
        {unntakRef}
      </a>
      {tekst.slice(i + unntakRef.length)}
    </>
  );
}

const tidslinje: {
  dato: string;
  hva: React.ReactNode;
  kilde: React.ReactNode;
}[] = [
  {
    dato: '1.1.2027',
    hva: 'Plikt til å sende e-faktura ved salg til andre bokføringspliktige. Kravene til godkjente formater trer i kraft. Unntaket fra kravet til elektronisk tilgjengelighet for virksomheter med omsetning under 5 mill. kr (bokføringsforskriften § 7-7 tredje ledd) oppheves.',
    kilde: (
      <>
        <Ekstern href={kilder.lov}>Lov 19.06.2026 nr. 39</Ekstern>,{' '}
        <Ekstern href={kilder.forskrift}>forskrift 29.09.2026</Ekstern>
      </>
    ),
  },
  {
    dato: '1.1.2027–31.12.2029',
    hva: 'Overgangsperiode: partene kan avtale et annet strukturert elektronisk format, for eksempel EDIFACT eller E2B. PDF kan ikke brukes hvis kjøperen kan motta e-faktura.',
    kilde: <Ekstern href={kilder.forskrift}>Forskrift 29.09.2026</Ekstern>,
  },
  {
    dato: '1.1.2028',
    hva: 'Bokføringspliktige parter kan ikke lenger avtale at salgsdokumentet, helt eller delvis, ikke skal oversendes (bokføringsforskriften § 5-2-1 fjerde ledd).',
    kilde: <Ekstern href={kilder.forskrift}>Forskrift 29.09.2026</Ekstern>,
  },
  {
    dato: '1.1.2030',
    hva: 'Plikt til å motta e-faktura. Krav om bokføring i et elektronisk regnskapssystem (bokføringsloven § 7 fjerde ledd).',
    kilde: (
      <>
        <Ekstern href={kilder.overgang}>Overgangsforskrift 25.09.2026</Ekstern>,{' '}
        <Ekstern href={kilder.lov}>lov 19.06.2026 nr. 39</Ekstern>
      </>
    ),
  },
];

export default function EFaktura2027Page() {
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
                { name: 'E-faktura fra 2027', href: a.path },
              ]}
            />
            <div className="mt-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <span className="block h-0.5 w-10 bg-flyd-mint" aria-hidden="true" />
                <Eyebrow tone="petrol" className="mt-5">
                  Artikkel · E-faktura og EHF
                </Eyebrow>
                <h1 className="mt-5 font-display text-display-xl font-semibold text-flyd-sand">{a.h1}</h1>
                <p className="mt-8 max-w-2xl font-display text-ingress font-medium text-flyd-dempet">
                  Fra 1. januar 2027 skal bokføringspliktige sende elektronisk faktura (EHF/Peppol) når de selger til
                  andre bokføringspliktige. I praksis gjelder det kunder som kan motta e-faktura (registrert i ELMA).
                  Plikten til å <em>motta</em> e-faktura og kravet om elektronisk regnskapssystem kommer først 1. januar
                  2030.
                </p>
                <p className="mt-6 text-[15px] text-flyd-dempet">
                  Sist oppdatert <time dateTime={a.modified}>14. oktober 2026</time>.
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

      {/* HVA ER NYTT */}
      <Section tone="sand" id="nytt">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Nytt regelverk</Eyebrow>
            <h2 className={`mt-5 ${h2}`}>Hva er nytt fra 1. januar 2027?</h2>
            <p className={`mt-6 ${brod}`}>
              Fra 1. januar 2027 har bokføringspliktige plikt til å utstede e-faktura ved salg til andre
              bokføringspliktige (bokføringsloven § 10 annet ledd). Endringen kommer fra{' '}
              <Ekstern href={kilder.lov}>lov 19. juni 2026 nr. 39</Ekstern>. Stortinget vedtok lovendringen 8. juni
              2026, og <Ekstern href={kilder.ikraft}>ikrafttredelsen ble besluttet 19. juni 2026</Ekstern>.
            </p>

            <h3 className={h3}>Hva regnes som e-faktura?</h3>
            <p className={`mt-4 ${brod}`}>
              En e-faktura er en faktura i et strukturert format som er egnet for automatisert behandling
              (bokføringsloven § 3 nr. 3). Fakturaen går rett inn i mottakerens system. En PDF sendt på e-post er{' '}
              <strong className="font-semibold text-flyd-skog">ikke</strong> e-faktura.
            </p>

            <h3 className={h3}>Godkjente formater</h3>
            <p className={`mt-4 ${brod}`}>
              Etter bokføringsforskriften § 5-2-9 annet ledd er disse formatene godkjent, i versjon 3.0 eller nyere:
            </p>
            <Punkter
              items={['EHF Fakturering', 'Peppol BIS Billing', 'EHF Selvfakturering', 'Peppol BIS Self-Billing']}
            />
            <p className={`mt-5 ${brod}`}>
              Forskriftsendringen er fastsatt av Skattedirektoratet{' '}
              <Ekstern href={kilder.forskrift}>29. september 2026</Ekstern>. Skatteetaten har{' '}
              <Ekstern href={kilder.skatteetaten}>en egen omtale av forskriftene</Ekstern>.
            </p>

            <h3 className={h3}>Gjelder det alle kunder?</h3>
            <p className={`mt-4 ${brod}`}>
              Nei. Kravet gjelder salg mellom bokføringspliktige. Fram til 2030 gjelder det i praksis bare kunder som
              kan motta e-faktura, det vil si virksomheter som er registrert i ELMA og nås via Peppol (
              <Ekstern href={kilder.prop}>Prop. 44 L (2025–2026)</Ekstern>).
            </p>
          </div>

          {/* FIGUR */}
          <figure className="mt-14">
            {/* eslint-disable-next-line @next/next/no-img-element -- images.unoptimized, next/image gir ingenting her */}
            <img
              src={a.figur.src}
              width={a.figur.width}
              height={a.figur.height}
              alt={a.figur.alt}
              loading="lazy"
              className="h-auto w-full max-w-4xl rounded-bilde"
            />
            <figcaption className="mt-4 max-w-3xl text-[15px] leading-relaxed text-flyd-skifer">
              ELMA er bare et oppslagsregister. Selve fakturaen sendes via Peppol-nettverket.
            </figcaption>
          </figure>
        </Container>
      </Section>

      {/* TIDSLINJE */}
      <Section tone="lysmint" id="tidslinje">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Tidslinje</Eyebrow>
            <h2 className={`mt-5 ${h2}`}>Tidslinje: 2027, 2028 og 2030</h2>
          </div>
          <div className="mt-10 max-w-5xl overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left text-[16px] leading-relaxed text-flyd-skog">
              <thead>
                <tr className="border-b-2 border-flyd-linje-mint font-display text-[15px] font-semibold">
                  <th scope="col" className="py-3 pr-6">
                    Dato
                  </th>
                  <th scope="col" className="py-3 pr-6">
                    Hva skjer
                  </th>
                  <th scope="col" className="py-3">
                    Kilde
                  </th>
                </tr>
              </thead>
              <tbody>
                {tidslinje.map((t) => (
                  <tr key={t.dato} className="border-b border-flyd-linje-mint align-top">
                    <th scope="row" className="whitespace-nowrap py-4 pr-6 font-display font-semibold">
                      {t.dato}
                    </th>
                    <td className="py-4 pr-6 text-flyd-skifer">{t.hva}</td>
                    <td className="py-4 text-[15px]">{t.kilde}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`mt-8 max-w-3xl ${brod}`}>
            Overgangsregelen om mottaksplikt fra 2030 er{' '}
            <Ekstern href={kilder.overgangNyhet}>fastsatt av Finansdepartementet 25. september 2026</Ekstern>.
          </p>
        </Container>
      </Section>

      {/* UNNTAK */}
      <Section tone="sand" id="unntak">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Unntak</Eyebrow>
            <h2 className={`mt-5 ${h2}`}>Hvem er unntatt?</h2>

            <h3 className={h3}>Svært små virksomheter</h3>
            <p className={`mt-4 ${brod}`}>
              Etter bokføringsforskriften § 1-2 (
              <Ekstern href={kilder.forskrift}>forskrift 29. september 2026 nr. 1933</Ekstern>) gjelder et unntak for
              bokføringspliktige som leverer skattemelding for formues- og inntektsskatt og har omsetning på høyst 50
              000 kr i kalenderåret. De slipper å motta e-faktura, og må bare utstede e-faktura hvis
              faktureringssystemet har funksjonaliteten.
            </p>
            <Punkter
              items={[
                'Unntaket gjelder ikke for den som er regnskapspliktig.',
                'Unntaket gjelder ikke for den som er mva-registrert (leverer mva-melding).',
                'Unntaket faller bort fra det tidspunktet omsetningen passerer 50 000 kr.',
              ]}
            />

            <h3 className={h3}>Kan man søke unntak?</h3>
            <p className={`mt-4 ${brod}`}>
              Ja. Søknad om unntak sendes til skattekontoret (
              <Ekstern href={kilder.overgangNyhet}>regjeringen.no, 25. september 2026</Ekstern>
              ).
            </p>
          </div>
        </Container>
      </Section>

      {/* SJEKKLISTE */}
      <Section tone="lysmint" id="sjekkliste">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Sjekkliste</Eyebrow>
            <h2 className={`mt-5 ${h2}`}>Slik gjør du deg klar i regnskapssystemet</h2>
            <ol className="mt-8 space-y-4">
              {[
                'Sjekk at faktura- eller ERP-systemet sender EHF/Peppol BIS versjon 3.0.',
                'Aktiver sending, og gjerne mottak, av EHF. Mottak registrerer deg normalt i ELMA.',
                'Legg inn organisasjonsnummer på alle bedriftskunder, så systemet kan slå opp i ELMA og velge riktig sendemåte.',
                'Oppdater sendemåte på eksisterende kunder.',
                'Bruker dere EDIFACT, E2B eller lignende: avtal med kunden og planlegg overgangen før 31.12.2029.',
                'Planlegg for 2030: mottak av e-faktura og elektronisk regnskapssystem.',
              ].map((s, i) => (
                <li key={i} className="flex gap-5 rounded-kort bg-flyd-sand p-5 md:p-6">
                  <span
                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-flyd-petrol font-display text-[16px] font-semibold tabular-nums text-flyd-sand"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <span className="pt-1 text-[16px] leading-relaxed text-flyd-skog">{s}</span>
                </li>
              ))}
            </ol>

            <h3 className={h3}>Tripletex</h3>
            <p className={`mt-4 ${brod}`}>
              I Tripletex aktiverer du EHF under «Selskap &gt; Mitt abonnement»: først «Send EHF», deretter «Motta EHF».
              Når du aktiverer mottak, blir du automatisk registrert i ELMA. Bare bruker- eller kontoadministrator kan
              aktivere. Se <Ekstern href={kilder.tripletex}>Tripletex hjelpesenter</Ekstern>.
            </p>

            <h3 className={h3}>Fiken</h3>
            <p className={`mt-4 ${brod}`}>
              Fiken foreslår EHF automatisk når kunden finnes i ELMA. Mottak aktiveres under Foretak →
              Tilleggstjenester. Se <Ekstern href={kilder.fiken}>Fiken hjelp</Ekstern>.
            </p>

            <h3 className={h3}>Andre systemer</h3>
            <p className={`mt-4 ${brod}`}>
              Bruker du PowerOffice Go, Visma, Uni Micro eller et annet system, sjekk leverandørens hjelpesider for
              hvordan du aktiverer sending og mottak av EHF. Vurderer du å bytte system før 2030, kan du{' '}
              <Link href="/tjenester/erp/" className={lenke}>
                lese om programvare og ERP
              </Link>
              , eller om{' '}
              <Link href="/bytte-regnskapsforer/" className={lenke}>
                hvordan du bytter regnskapsfører
              </Link>
              .
            </p>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section tone="sand" id="sporsmal">
        <Container>
          <Eyebrow>Spørsmål og svar</Eyebrow>
          <h2 className={`mt-5 max-w-3xl ${h2}`}>Ofte stilte spørsmål om e-faktura</h2>
          <div className="mt-8 max-w-4xl space-y-3">
            {eFakturaFaq.map((f) => (
              <details key={f.q} className="faq group rounded-kort bg-flyd-lysmint px-6 md:px-7">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-flis py-5 font-display text-[18px] font-semibold text-flyd-skog transition-colors duration-200 hover:text-flyd-petrol">
                  {f.q}
                  <Plus className="faq-pil h-5 w-5 flex-shrink-0 text-flyd-teal" strokeWidth={2} aria-hidden="true" />
                </summary>
                <p className="faq-svar pb-6 text-[16px] leading-relaxed text-flyd-skifer">
                  <MedUnntakLenke tekst={f.a} />
                </p>
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
                Hva Flyd kan hjelpe med
              </h2>
              <p className="mt-6 text-[17px] leading-[1.65] text-flyd-dempet">
                Usikker på om systemet ditt er klart for EHF? Vi hjelper deg med:
              </p>
              <NumberedList
                tone="dark"
                className="mt-8"
                items={[
                  'Oppsett av sending og mottak av EHF i regnskapssystemet.',
                  'Gjennomgang av kunderegisteret, med organisasjonsnummer og riktig sendemåte.',
                  'Systemvalg eller systembytte før kravene i 2030.',
                  'Integrasjoner mellom faktureringen og resten av systemene dine.',
                ]}
              />
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-5">
                <ButtonLink href={kontakt} variant="secondary-dark" withArrow>
                  Book en uforpliktende prat
                </ButtonLink>
                <TextLink href="/tjenester/" tone="dark">
                  Se tjenestene våre
                </TextLink>
                <TextLink href="/tjenester/integrasjoner/" tone="dark">
                  Integrasjoner
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
