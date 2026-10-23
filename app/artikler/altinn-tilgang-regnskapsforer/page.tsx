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
import { altinnTilgang as a, altinnFaq, kilder } from '@/data/altinn-tilgang-regnskapsforer';
import toppbilde from '@/public/header/topp-altinn-tilgang.webp';

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
  mainEntity: altinnFaq.map((f) => ({
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

const regnskapsforerPakker: { pakke: string; gir: string }[] = [
  {
    pakke: 'Regnskapsfører med signeringsrettighet',
    gir: 'Signere på vegne av virksomheten i alle tjenester som krever signeringsrett.',
  },
  {
    pakke: 'Regnskapsfører uten signeringsrettighet',
    gir: 'Bruke alle tjenester som ikke krever signeringsrett.',
  },
  {
    pakke: 'Regnskapsfører lønn',
    gir: 'Rapportere lønn for virksomheten.',
  },
];

const datoer: { dato: string; hva: React.ReactNode; kilde: React.ReactNode }[] = [
  {
    dato: '19.06.2026',
    hva: 'Gamle Altinn stengte. Etter denne datoen kan det ikke gis nye fullmakter med Altinn-roller, bare med tilgangspakker.',
    kilde: <Ekstern href={kilder.skatteetatenRegnskapsforer}>Skatteetaten</Ekstern>,
  },
  {
    dato: '17.11.2026',
    hva: 'Skattemeldingen (person og næring), a-meldingen, skattekort og skatteoppgjøret er ikke lenger tilgjengelige gjennom de gamle rollene.',
    kilde: <Ekstern href={kilder.altinnUtfasing}>Altinn</Ekstern>,
  },
  {
    dato: '31.12.2026',
    hva: 'Altinn-rollene er faset ut. Tilgang til tjenester gjennom roller opphører.',
    kilde: (
      <>
        <Ekstern href={kilder.altinnOvergang}>Altinn</Ekstern>,{' '}
        <Ekstern href={kilder.skatteetatenRegnskapsforer}>Skatteetaten</Ekstern>
      </>
    ),
  },
  {
    dato: '2027',
    hva: 'Skatteetaten: «Fra og med 2027 må du ha riktig tilgangspakke for å få tilgang» til skattemeldingen.',
    kilde: <Ekstern href={kilder.skatteetatenSelskap}>Skatteetaten</Ekstern>,
  },
  {
    dato: '31.05.2027',
    hva: 'Frist for skattemeldingen for inntektsåret 2026, både for selskap og enkeltpersonforetak.',
    kilde: (
      <>
        <Ekstern href={kilder.skatteetatenSelskap}>Selskap</Ekstern>,{' '}
        <Ekstern href={kilder.skatteetatenEnk}>ENK</Ekstern>
      </>
    ),
  },
];

const steg: { tittel: string; tekst: React.ReactNode }[] = [
  {
    tittel: 'Registrer regnskapsføreren i Enhetsregisteret',
    tekst: (
      <>
        Meld regnskapsføreren i{' '}
        <Ekstern href={kilder.brregSamordnet}>Samordnet registermelding</Ekstern> i Altinn. Meldingen signeres i
        Altinn, og når regnskapsføreren er et selskap, går signeringsoppdraget til byråets innboks. Når registreringen
        er på plass, får byrået de tre regnskapsførerpakkene automatisk.
      </>
    ),
  },
  {
    tittel: 'Gi tilgangspakker til byrået ved behov',
    tekst: (
      <>
        Trenger byrået tilgang før registreringen er klar, eller til mer enn regnskapsførerpakkene dekker? Logg inn
        på altinn.no og velg virksomheten din. Gå til <strong className={sterk}>Meny</strong> ›{' '}
        <strong className={sterk}>Tilgangsstyring</strong> › <strong className={sterk}>Brukere</strong>, og velg
        byrået eller legg det til som <strong className={sterk}>Ny bruker</strong> med organisasjonsnummeret.
      </>
    ),
  },
  {
    tittel: 'Velg bare pakkene byrået trenger',
    tekst: (
      <>
        Velg fanen <strong className={sterk}>Tilgangspakker</strong> og klikk{' '}
        <strong className={sterk}>Gi fullmakt</strong>. Søk opp pakken og klikk{' '}
        <strong className={sterk}>Gi fullmakt</strong> til høyre for den. Du kan gi flere pakker i samme runde.
      </>
    ),
  },
  {
    tittel: 'Byrået fordeler tilgangen internt',
    tekst: (
      <>
        Fullmakten gis til byrået, ikke til hver medarbeider. Byrået gir den videre til sine ansatte og systemer
        gjennom klientadministrasjon i Altinn.
      </>
    ),
  },
  {
    tittel: 'Rydd bort fullmakter du ikke trenger',
    tekst: (
      <>
        Når registreringen i Enhetsregisteret er på plass, kan du slette manuelle fullmakter som er blitt
        overflødige: <strong className={sterk}>Tilgangsstyring</strong> ›{' '}
        <strong className={sterk}>Brukere</strong> › velg byrået ›{' '}
        <strong className={sterk}>Slett fullmakt</strong>.
      </>
    ),
  },
];

export default function AltinnTilgangPage() {
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
                { name: 'Altinn-tilgang for regnskapsfører', href: a.path },
              ]}
            />
            <div className="mt-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <span className="block h-0.5 w-10 bg-flyd-mint" aria-hidden="true" />
                <Eyebrow tone="petrol" className="mt-5">
                  Artikkel · Altinn
                </Eyebrow>
                {/* Myk bindestrek: «regnskapsføreren» er bredere enn skjermen på mobil. */}
                <h1 className="mt-5 font-display text-display-xl font-semibold text-flyd-sand">
                  {a.h1.replace('regnskapsføreren', 'regnskaps­føreren')}
                </h1>
                <p className="mt-8 max-w-2xl font-display text-ingress font-medium text-flyd-dempet">
                  De gamle Altinn-rollene er erstattet av tilgangspakker. Står regnskapsføreren registrert i
                  Enhetsregisteret, får byrået pakkene for regnskapsfører automatisk. Trenger byrået mer, eller tilgang
                  raskere, gir du tilgangspakker til byråets organisasjonsnummer i Altinn.
                </p>
                <p className="mt-6 text-[15px] text-flyd-dempet">
                  Sist oppdatert <time dateTime={a.modified}>15. oktober 2026</time>.
                </p>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <ButtonLink href={kontakt} variant="primary-dark" withArrow>
                    Snakk med oss
                  </ButtonLink>
                  <ButtonLink href="#steg" variant="secondary-dark">
                    Gå til steg for steg
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
                'Tilgangspakker har erstattet de gamle Altinn-rollene. En pakke samler fullmakter til tjenester innen ett område.',
                'Registrerer du regnskapsføreren i Enhetsregisteret, får byrået pakkene for regnskapsfører automatisk.',
                'Trengs mer, gir du tilgangspakker til byråets organisasjonsnummer under Tilgangsstyring i Altinn.',
                'Fullmakter du selv ga byrået i gamle Altinn, må gis på nytt. Gjør det før 17. november 2026, da skattemeldingen slutter å virke med de gamle rollene.',
              ]}
            />
          </div>
        </Container>
      </Section>

      {/* HVA ER ENDRET */}
      <Section tone="lysmint" id="endret">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Nye Altinn</Eyebrow>
            <h2 className={`mt-5 ${h2}`}>Hva er endret – fra Altinn-roller til tilgangspakker</h2>
            <p className={`mt-6 ${brod}`}>
              Altinn har byttet ut rollene med rundt 120 tilgangspakker for virksomheter, fordelt på 20 kategorier.
              Gamle Altinn stengte 19. juni 2026, og tilgang gjennom Altinn-roller opphører 31. desember 2026 (
              <Ekstern href={kilder.altinnOvergang}>Altinn</Ekstern>).
            </p>
            <p className={`mt-5 ${brod}`}>
              Roller fra Enhetsregisteret og de særskilte regnskapsførerrollene gjøres om til tilgangspakker
              automatisk (<Ekstern href={kilder.skatteetatenRegnskapsforer}>Skatteetaten</Ekstern>). Hovedregelen er
              ellers at fullmakter må gis på nytt. Har du selv delegert rettigheter til regnskapsføreren i gamle Altinn,
              må byrået få dem på nytt som tilgangspakker.
            </p>
          </div>
          <div className="mt-10 max-w-5xl overflow-x-auto" tabIndex={0} role="region" aria-label="Fra Altinn-roller til tilgangspakker">
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
                {datoer.map((d) => (
                  <tr key={d.dato} className="border-b border-flyd-linje-mint align-top">
                    <th scope="row" className="whitespace-nowrap py-4 pr-6 font-display font-semibold">
                      {d.dato}
                    </th>
                    <td className="py-4 pr-6 text-flyd-skifer">{d.hva}</td>
                    <td className="py-4 text-[15px]">{d.kilde}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* PAKKER */}
      <Section tone="sand" id="pakker">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Tilgangspakker</Eyebrow>
            <h2 className={`mt-5 ${h2}`}>Hvilke tilgangspakker trenger regnskapsføreren?</h2>

            <h3 className={h3}>De tre regnskapsførerpakkene kommer automatisk</h3>
            <p className={`mt-4 ${brod}`}>
              Pakkene oppstår når du registrerer regnskapsføreren i Enhetsregisteret, og de kan bare gis til
              autoriserte regnskapsførere (
              <Ekstern href={kilder.altinnRegnskapsforerPakker}>Altinn</Ekstern>).
            </p>
          </div>
          <div className="mt-8 max-w-5xl overflow-x-auto" tabIndex={0} role="region" aria-label="Tilgangspakker for regnskapsføreren">
            <table className="w-full min-w-[560px] border-collapse text-left text-[16px] leading-relaxed text-flyd-skog">
              <thead>
                <tr className="border-b-2 border-flyd-linje-sand font-display text-[15px] font-semibold">
                  <th scope="col" className="py-3 pr-6">
                    Tilgangspakke
                  </th>
                  <th scope="col" className="py-3">
                    Gir tilgang til
                  </th>
                </tr>
              </thead>
              <tbody>
                {regnskapsforerPakker.map((p) => (
                  <tr key={p.pakke} className="border-b border-flyd-linje-sand align-top">
                    <th scope="row" className="py-4 pr-6 font-display font-semibold">
                      {p.pakke}
                    </th>
                    <td className="py-4 text-flyd-skifer">{p.gir}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="max-w-3xl">
            <h3 className={h3}>Andre pakker som kan være aktuelle</h3>
            <p className={`mt-4 ${brod}`}>
              Er byrået ikke registrert ennå, eller skal det gjøre mer enn regnskapsførerpakkene dekker, kan du gi
              enkeltpakker. Navnene under er Altinns egne (
              <Ekstern href={kilder.altinnSkattPakker}>skatt og regnskap</Ekstern>,{' '}
              <Ekstern href={kilder.altinnPersonalePakker}>personale</Ekstern>):
            </p>
            <Punkter
              items={[
                <>
                  <strong className={sterk}>Skatt næring</strong> – tjenester for skatt på næring, blant annet
                  skattemeldingen.
                </>,
                <>
                  <strong className={sterk}>Merverdiavgift</strong> – mva-meldingen og andre mva-tjenester.
                </>,
                <>
                  <strong className={sterk}>Regnskap og økonomirapportering</strong> – regnskap og økonomirapportering,
                  utenom skatt og mva.
                </>,
                <>
                  <strong className={sterk}>A-ordningen</strong> og <strong className={sterk}>Lønn</strong> –
                  a-meldingen og tjenester for lønn og honorar.
                </>,
              ]}
            />

            <h3 className={h3}>Hva skattemeldingen godtar</h3>
            <p className={`mt-4 ${brod}`}>
              Skatteetaten oppgir at skattemeldingen støtter tilgangspakkene Skatt næring, Regnskapsfører med og uten
              signeringsrettighet, Ansvarlig revisor, Revisormedarbeider og Revisorattesterer. I overgangsperioden
              virker også de gamle rollene, blant annet Regnskapsfører med signeringsrett (A0239) og uten (A0240).
              «Fra og med 2027 må du ha riktig tilgangspakke for å få tilgang» (
              <Ekstern href={kilder.skatteetatenSelskap}>Skatteetaten</Ekstern>). Rollen Begrenset signeringsrett utgår
              og må gis på nytt som Skatt næring (
              <Ekstern href={kilder.skatteetatenOvergang}>Skatteetaten</Ekstern>).
            </p>
          </div>
        </Container>
      </Section>

      {/* STEG FOR STEG */}
      <Section tone="lysmint" id="steg">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Steg for steg</Eyebrow>
            <h2 className={`mt-5 ${h2}`}>Slik gir du regnskapsføreren tilgang</h2>
            <ol className="mt-8 space-y-4">
              {steg.map((s, i) => (
                <li key={s.tittel} className="flex gap-5 rounded-kort bg-flyd-sand p-5 md:p-6">
                  <span
                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-flyd-petrol font-display text-[16px] font-semibold tabular-nums text-flyd-sand"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <div className="min-w-0 pt-1">
                    <h3 className="font-display text-[18px] font-semibold leading-[1.3] text-flyd-skog">{s.tittel}</h3>
                    <p className="mt-2 text-[16px] leading-relaxed text-flyd-skifer">{s.tekst}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className={`mt-8 ${brod}`}>
              Menynavnene følger Altinns{' '}
              <Ekstern href={kilder.altinnGiFullmakt}>steg-for-steg-guide for tilgangspakker</Ekstern> og{' '}
              <Ekstern href={kilder.altinnSlett}>veiledningen for å slette fullmakter</Ekstern>. På mobil klikker du
              først på pakken og deretter på Gi fullmakt.
            </p>
          </div>
        </Container>
      </Section>

      {/* HVEM KAN GI TILGANG */}
      <Section tone="sand" id="hvem">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Hvem kan gi tilgang</Eyebrow>
            <h2 className={`mt-5 ${h2}`}>Hvem i bedriften kan gi tilgang?</h2>
            <p className={`mt-6 ${brod}`}>
              Daglig leder, styrets leder og innehaver får automatisk pakken Hovedadministrator, og den gir rett til å
              administrere alle fullmakter i virksomheten (
              <Ekstern href={kilder.altinnAdministrere}>Altinn</Ekstern>). Andre kan gi fullmakt hvis de er
              tilgangsstyrer og selv har pakken de vil gi videre (
              <Ekstern href={kilder.altinnGiFullmakt}>Altinn</Ekstern>). Daglig leder, styreleder og innehaver får
              også automatisk pakken Klientadministrator (<Ekstern href={kilder.altinnAdministrere}>Altinn</Ekstern>).
            </p>

            <h3 className={h3}>Enkeltpersonforetak</h3>
            <p className={`mt-4 ${brod}`}>
              Overgangen gjelder også enkeltpersonforetak. Innehaveren får Hovedadministrator og Klientadministrator
              automatisk (<Ekstern href={kilder.altinnAdministrere}>Altinn</Ekstern>) og gir regnskapsføreren tilgang
              på samme måte. Altinns utfasingsliste omfatter skattemeldingen for både person og næring, med 17.
              november 2026 som siste dag for de gamle rollene (
              <Ekstern href={kilder.altinnUtfasing}>Altinn</Ekstern>). For enkeltpersonforetak er skattemeldingen
              innehaverens personlige skattemelding, med både private opplysninger og næringsopplysninger, og fristen er
              31. mai (<Ekstern href={kilder.skatteetatenEnk}>Skatteetaten</Ekstern>). Har du gitt regnskapsføreren
              fullmakten Skatteforhold for privatpersoner før mars 2021, må den gis på nytt (
              <Ekstern href={kilder.skatteetatenRegnskapsforer}>Skatteetaten</Ekstern>). Avklar derfor med
              regnskapsføreren hvilke pakker byrået trenger for å levere den.
            </p>
          </div>
        </Container>
      </Section>

      {/* FØR 2027 */}
      <Section tone="lysmint" id="for-2027">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Sjekkliste</Eyebrow>
            <h2 className={`mt-5 ${h2}`}>Hva må gjøres før 2027?</h2>
            <Punkter
              linje="mint"
              items={[
                'Står regnskapsføreren registrert i Enhetsregisteret? Sjekk virksomheten din på brreg.no.',
                'Har byrået pakkene det trenger, også utover regnskapsførerpakkene?',
                'Er fullmakter du selv ga i gamle Altinn, gitt på nytt som tilgangspakker?',
                'Har noen andre enn daglig leder behov for å gi fullmakter? Gi dem tilgangsstyring.',
                'Er alt på plass før 17. november 2026, når skattemeldingen og a-meldingen slutter å virke med de gamle rollene?',
                'Planlegg skattemeldingen for 2026 i god tid før fristen 31. mai 2027.',
              ]}
            />
          </div>
        </Container>
      </Section>

      {/* BYTTER DU */}
      <Section tone="sand" id="bytte">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Nytt byrå</Eyebrow>
            <h2 className={`mt-5 ${h2}`}>Bytter du regnskapsfører?</h2>
            <p className={`mt-6 ${brod}`}>
              Meld den nye regnskapsføreren i Samordnet registermelding, så får det nye byrået regnskapsførerpakkene.
              Slett samtidig fullmakter du har gitt det gamle byrået manuelt. Les mer om{' '}
              <Link href="/bytte-regnskapsforer/" className={lenke}>
                hvordan du bytter regnskapsfører
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
          <h2 className={`mt-5 max-w-3xl ${h2}`}>Ofte stilte spørsmål om Altinn-tilgang</h2>
          <div className="mt-8 max-w-4xl space-y-3">
            {altinnFaq.map((f) => (
              <details key={f.q} className="faq group rounded-kort bg-flyd-sand px-6 md:px-7">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-flis py-5 font-display text-[18px] font-semibold text-flyd-skog transition-colors duration-200 hover:text-flyd-petrol">
                  <span className="min-w-0">{f.q}</span>
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
                Usikker på om regnskapsføreren har riktig tilgang?
              </h2>
              <p className="mt-6 text-[17px] leading-[1.65] text-flyd-dempet">
                Send oss organisasjonsnummeret ditt, så sjekker vi det for deg før fristene. Vi hjelper deg med:
              </p>
              <NumberedList
                tone="dark"
                className="mt-8"
                items={[
                  'Registrering av regnskapsfører i Enhetsregisteret.',
                  'Gjennomgang av hvilke tilgangspakker byrået har, og hvilke som mangler.',
                  'Fullmakter som må gis på nytt etter overgangen til nye Altinn.',
                  'Opprydding i gamle fullmakter når du bytter regnskapsfører.',
                ]}
              />
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-5">
                <ButtonLink href={kontakt} variant="secondary-dark" withArrow>
                  Snakk med oss
                </ButtonLink>
                <TextLink href="/kontor/" tone="dark">
                  Finn nærmeste kontor
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
