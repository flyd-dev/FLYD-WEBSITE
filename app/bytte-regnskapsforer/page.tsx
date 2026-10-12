import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, Plus } from 'lucide-react';
import Container from '@/components/Container';
import Section from '@/components/Section';
import Eyebrow from '@/components/Eyebrow';
import Breadcrumbs from '@/components/Breadcrumbs';
import Bekreft from '@/components/Bekreft';
import JsonLd from '@/components/JsonLd';
import NumberedList from '@/components/NumberedList';
import { ButtonLink, TextLink } from '@/components/Button';
import { pageMetadata, siteUrl } from '@/lib/seo';
import { bytteRegnskapsforer as g, bytteFaq, bytteSjekkliste } from '@/data/bytte-regnskapsforer';

export const metadata: Metadata = pageMetadata({
  title: g.title,
  description: g.description,
  path: g.path,
  image: g.image,
});

const url = `${siteUrl}${g.path}`;

// Bare spørsmål som står på siden, med samme svartekst. Ingen plassholdere.
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${url}#faq`,
  mainEntity: bytteFaq.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

// Forfatter er utelatt med vilje – legges til når en navngitt fagperson står for guiden.
const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  '@id': `${url}#article`,
  headline: g.h1,
  description: g.description,
  url,
  mainEntityOfPage: url,
  image: g.image.url,
  inLanguage: 'nb-NO',
  datePublished: g.published,
  dateModified: g.modified,
  publisher: { '@id': `${siteUrl}/#organization` },
};

const kontakt = `/kontakt/?tema=${encodeURIComponent('regnskap og rådgivning')}`;
// Oversiktssiden for gjeldende GRFS (fra 1.1.2023). Ikke undersiden «grfs» under denne – den viser 2014-standarden.
const grfs = 'https://www.regnskapnorge.no/faget/grfs/';

const lenke =
  'font-medium text-flyd-petrol underline decoration-flyd-teal decoration-2 underline-offset-4 transition-colors duration-200 hover:text-flyd-skog hover:decoration-flyd-skog';
const brod = 'text-[17px] leading-[1.7] text-flyd-skifer';
const h2 = 'font-display text-display-md font-semibold';

function Punkter({ items, linje = 'sand' }: { items: React.ReactNode[]; linje?: 'sand' | 'mint' }) {
  const border = linje === 'sand' ? 'border-flyd-linje-sand' : 'border-flyd-linje-mint';
  return (
    <ul className={`mt-5 border-t ${border}`}>
      {items.map((p, i) => (
        <li key={i} className={`flex items-start gap-3 border-b ${border} py-3 text-[16px] leading-relaxed text-flyd-skog`}>
          <Check className="mt-1 h-4 w-4 flex-shrink-0 text-flyd-teal" strokeWidth={2.5} aria-hidden="true" />
          <span>{p}</span>
        </li>
      ))}
    </ul>
  );
}

// Stegkortene er Sand med Sand-linje (skissen), så lister bruker Sand-linjer og sitatet Lys mint-flate.
const steg: { tittel: string; innhold: React.ReactNode }[] = [
  {
    tittel: 'Les oppdragsavtalen',
    innhold: (
      <>
        <p className={brod}>Finn fram avtalen med regnskapsføreren du har i dag, og se etter dette:</p>
        <Punkter
          items={[
            'Oppsigelsestid og eventuell bindingstid',
            'Hva som skal leveres når oppdraget avsluttes, og i hvilket format',
            'Honorar for sluttarbeid, for eksempel uttrekk av data eller arbeid i oppsigelsestiden',
            'Hvem som eier lisensen til regnskapssystemet – du eller byrået',
          ]}
        />
        <p className={`mt-5 ${brod}`}>
          Finner du ikke avtalen, kan du be regnskapsføreren om en kopi. Det er en helt vanlig forespørsel.
        </p>
      </>
    ),
  },
  {
    tittel: 'Velg ny regnskapsfører',
    innhold: (
      <>
        <p className={brod}>
          Snakk med en eller flere regnskapsførere, og be om et skriftlig tilbud som viser hva som inngår. Etter
          regnskapsførerloven § 5-1 skal det nye regnskapsforetaket som hovedregel, før det tar oppdraget, be den
          forrige regnskapsføreren opplyse om forhold som tilsier at oppdraget ikke bør tas.
        </p>
        <p className={`mt-4 ${brod}`}>
          Etter gjeldende{' '}
          <a href={grfs} target="_blank" rel="noopener noreferrer" className={lenke}>
            god regnskapsføringsskikk (GRFS)
          </a>{' '}
          får den forrige regnskapsføreren plikt til å svare når det er avklart hvem som skal overta, og svaret skal
          komme uten ugrunnet opphold. Det som kommer fram i svaret, kan den nye regnskapsføreren dele med deg.
        </p>
        <p className={`mt-4 ${brod}`}>Dette er en fast rutine, ikke et tegn på mistanke eller konflikt.</p>
      </>
    ),
  },
  {
    tittel: 'Si opp skriftlig',
    innhold: (
      <>
        <p className={brod}>
          Send oppsigelsen på e-post eller brev med ønsket sluttdato, og be om en skriftlig bekreftelse. Avklar
          samtidig hvem som leverer:
        </p>
        <Punkter
          items={[
            'Siste mva-melding før byttet',
            'Siste a-melding før byttet',
            'Årsregnskap og skattemelding for fjoråret, hvis de ikke er levert',
          ]}
        />
        <p className={`mt-5 ${brod}`}>Du kan bruke denne teksten som utgangspunkt:</p>
        <blockquote className="mt-4 rounded-flis bg-flyd-lysmint p-6 text-[16px] leading-relaxed text-flyd-skog md:p-7">
          Vi sier med dette opp oppdragsavtalen om regnskapstjenester for (selskapsnavn), org.nr. (nummer), med
          virkning fra (dato). Vi ber om skriftlig bekreftelse på oppsigelsen og på hvem som leverer mva-melding og
          a-melding for (termin og måned). Ny regnskapsfører er (navn), som tar kontakt om overlevering av
          regnskapsmateriale og regnskapsdata.
        </blockquote>
      </>
    ),
  },
  {
    tittel: 'Få regnskapet overlevert',
    innhold: (
      <>
        <p className={brod}>
          Når oppdraget avsluttes, skal regnskapsmaterialet og regnskapsdataene utleveres til deg så snart som mulig.
          Etter{' '}
          <a href={grfs} target="_blank" rel="noopener noreferrer" className={lenke}>
            GRFS
          </a>{' '}
          overføres regnskapsdataene i SAF-T Regnskap hvis ikke annet er avtalt. Be om:
        </p>
        <Punkter
          items={[
            'Bilag, hovedbok og saldobalanse',
            'Kunde- og leverandørreskontro',
            'Avstemminger og lønnsgrunnlag',
            'Innsendte rapporter med kvitteringer',
            'Oversikt over åpne frister og kjente avvik',
          ]}
        />
        <p className={`mt-5 ${brod}`}>
          Regnskapsmaterialet er ditt. Regnskapsførerens egne, interne arbeidspapirer er noe annet og følger ikke
          nødvendigvis med. Bedriften er selv ansvarlig for å oppbevare regnskapsmaterialet, som hovedregel i fem år
          etter regnskapsårets slutt (avtaler og vesentlig korrespondanse i 3 år og 6 måneder), jf. bokføringsloven §
          13.
        </p>
        <p className={`mt-4 ${brod}`}>
          <strong className="font-semibold text-flyd-skog">Slik gjør vi det i Flyd:</strong> Tidligere år henter vi
          inn fra SAF-T-filen. For inneværende år legger vi inn åpningsbalansen manuelt i Tripletex, med åpne poster,
          slik at du starter med riktige saldoer.
        </p>
      </>
    ),
  },
  {
    tittel: 'Registrer ny regnskapsfører og gi tilgang i Altinn',
    innhold: (
      <>
        <p className={brod}>
          Byttet meldes til Enhetsregisteret i Samordnet registermelding hos Brønnøysundregistrene. Du fyller inn den
          nye regnskapsførerens organisasjonsnummer, og regnskapsføreren får en signeringsoppgave i sin Altinn-innboks
          og bekrefter der. Å melde ny regnskapsfører koster ingenting hos Brønnøysundregistrene (endringen står ikke
          på gebyrlisten). Flyd AS har org.nr. 933 662 934.
        </p>
        <p className={`mt-4 ${brod}`}>
          Altinn er godt i gang med overgangen fra roller til tilgangspakker, og tilgang via de gamle rollene opphører
          31.12.2026. Regnskapsførerrollene som er registrert i Enhetsregisteret, videreføres som tilgangspakker.
          Fullmakter som er delegert manuelt, for eksempel til en person hos det gamle byrået, må gis på nytt som
          tilgangspakker under Tilgangsstyring i Altinn. Gi bare de pakkene som trengs.
        </p>
        <p className={`mt-4 ${brod}`}>
          Fullmakter du selv har delegert manuelt til den gamle regnskapsføreren, fjerner du under Tilgangsstyring i
          Altinn når overleveringen er dokumentert.
        </p>
        <Bekreft className="mt-5">
          hvordan den gamle regnskapsføreren fjernes fra Enhetsregisteret og Altinn, og om det skjer automatisk når
          ny regnskapsfører meldes i Samordnet registermelding
        </Bekreft>
      </>
    ),
  },
  {
    tittel: 'Regnskapssystem, bank og integrasjoner',
    innhold: (
      <>
        <p className={brod}>
          Du kan bytte regnskapsfører uten å bytte system. Det viktigste er å vite hvem som eier lisensen. Eier du den
          selv, gir du bare den nye regnskapsføreren tilgang i Tripletex, PowerOffice, Visma eller det systemet du
          bruker. Eier byrået lisensen, må dataene eksporteres og flyttes.
        </p>
        <p className={`mt-4 ${brod}`}>
          Når Flyd tar over, får vi brukeradministratortilgang i ditt Tripletex og setter opp brukere, bank og
          integrasjoner derfra. Gamle brukere fjernes. Integrasjoner som bruker API-nøkler, må kobles til på nytt når
          den gamle brukeren forsvinner – ellers stopper de.
        </p>
        <p className={`mt-4 ${brod}`}>
          Et bytte av regnskapsfører er også en god anledning til å spørre om systemet fortsatt passer. Noen ganger
          er det riktig å bytte samtidig, andre ganger er det tryggere å vente til etter årsoppgjøret.{' '}
          <Link href="/tjenester/erp/" className={lenke}>
            Les om ERP og systemvalg
          </Link>
          .
        </p>
      </>
    ),
  },
];

// Kortgriden under stegene (utkastet: Tid, Pris, Lisens).
const fakta: { id: string; kicker: string; tittel: string; innhold: React.ReactNode }[] = [
  {
    id: 'tid',
    kicker: 'Tid',
    tittel: 'Hvor lang tid tar et bytte?',
    innhold: (
      <>
        <p className={brod}>
          Det avhenger mest av oppsigelsestiden i avtalen og hvor raskt materialet blir overlevert. Selve
          registreringen i Enhetsregisteret går raskt, siden enkle endringer behandles maskinelt. I praksis er det
          oppsigelsestiden som setter takten.
        </p>
        <Bekreft className="mt-5">typisk tid hos Flyd fra kunden sier ja til regnskapet er i full drift</Bekreft>
      </>
    ),
  },
  {
    id: 'pris',
    kicker: 'Pris',
    tittel: 'Hva koster det å bytte regnskapsfører?',
    innhold: (
      <>
        <p className={brod}>
          Å melde ny regnskapsfører koster ingenting hos Brønnøysundregistrene. Kostnadene ved et bytte kommer fra
          avtalene dine:
        </p>
        <Punkter
          items={[
            'Honorar til den gamle regnskapsføreren i oppsigelsestiden',
            'Sluttarbeid eller uttrekk av data, hvis avtalen sier det',
            'Oppstart og eventuell opprydding hos den nye regnskapsføreren',
            'Systemlisens eller flytting av data, hvis du må over på et nytt abonnement',
          ]}
        />
        <Bekreft className="mt-5">Flyds oppstartspris ved bytte, og om overtakelsen inngår i prisen</Bekreft>
      </>
    ),
  },
  {
    id: 'lisens',
    kicker: 'Lisens',
    tittel: 'Hvem eier lisensen til regnskapssystemet?',
    innhold: (
      <>
        <p className={brod}>
          Står lisensen i ditt navn, følger systemet og dataene med deg, og den nye regnskapsføreren får bare
          tilgang. Står den i byråets navn, må dataene flyttes til et abonnement du eier eller den nye
          regnskapsføreren setter opp.
        </p>
        <Bekreft className="mt-5">hvem som normalt eier systemlisensen hos Flyd-kunder – kunden eller Flyd</Bekreft>
      </>
    ),
  },
];

export default function BytteRegnskapsforerPage() {
  return (
    <>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={faqJsonLd} />

      {/* HERO + KORTSVAR – innfelt Skog-flate på Sand, som i skissen. Eneste Korall-knapp på siden. */}
      <section className="bg-flyd-sand px-3 pt-3 md:px-4 md:pt-4">
        <div className="on-dark relative overflow-hidden rounded-bilde bg-flyd-skog py-14 text-flyd-sand md:py-20">
          <Container className="relative">
            <Breadcrumbs tone="dark" items={[{ name: 'Bytte regnskapsfører', href: g.path }]} />
            <div className="mt-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <span className="block h-0.5 w-10 bg-flyd-mint" aria-hidden="true" />
                <Eyebrow tone="petrol" className="mt-5">
                  Guide · Regnskapsfører
                </Eyebrow>
                <h1 className="mt-5 font-display text-display-xl font-semibold text-flyd-sand">{g.h1}</h1>
                <p className="mt-8 max-w-2xl font-display text-ingress font-medium text-flyd-dempet">
                  Ja, du kan bytte regnskapsfører når som helst, også midt i året. Les oppdragsavtalen, velg ny
                  regnskapsfører, si opp skriftlig med en sluttdato og avtal overlevering av regnskapsmaterialet,
                  normalt som SAF-T. Meld så ny regnskapsfører i Enhetsregisteret, og gi tilganger i Altinn og
                  regnskapssystemet. Den nye regnskapsføreren hjelper deg med det meste.
                </p>
                <p className="mt-6 text-[15px] text-flyd-dempet">
                  Sist oppdatert <time dateTime={g.modified}>12. oktober 2026</time>.
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
              {/* Dekor: Petrol-sirkel med Mint-ring og Mint-prikk */}
              <div className="hidden justify-end lg:col-span-4 lg:flex" aria-hidden="true">
                <div className="relative aspect-square w-full max-w-[380px] rounded-full bg-flyd-petrol">
                  <div className="absolute inset-[13%] rounded-full border border-flyd-mint/50" />
                  <div className="absolute bottom-[10%] right-[10%] h-[28%] w-[28%] rounded-full bg-flyd-mint/90" />
                </div>
              </div>
            </div>
          </Container>
        </div>
      </section>

      {/* SEKS STEG – kort med nummer */}
      <Section tone="sand" id="steg">
        <Container>
          <div className="max-w-3xl" data-reveal>
            <Eyebrow>Seks steg</Eyebrow>
            <h2 className="mt-5 font-display text-display-lg font-semibold">
              Slik bytter du regnskapsfører – 6 steg
            </h2>
            <p className={`mt-6 ${brod}`}>
              Rekkefølgen under gir et ryddig bytte uten hull i ansvaret. Fra steg 2 tar den nye regnskapsføreren
              normalt mye av arbeidet.
            </p>
          </div>
          <ol className="mt-12 grid grid-cols-1 gap-4 md:gap-5 lg:grid-cols-2">
            {steg.map((s, i) => (
              <li
                key={s.tittel}
                data-reveal
                className="flex gap-5 rounded-kort border border-flyd-linje-sand bg-flyd-sand p-6 md:gap-6 md:p-8"
              >
                <span
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-flyd-petrol font-display text-[18px] font-semibold tabular-nums text-flyd-sand"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-[20px] font-semibold leading-[1.3] md:pt-1">
                    <span className="sr-only">Steg {i + 1}: </span>
                    {s.tittel}
                  </h3>
                  <div className="mt-4">{s.innhold}</div>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* TID, PRIS, LISENS – kortgrid */}
      <Section tone="lysmint" id="tid-og-pris">
        <Container>
          <div className="stagger grid grid-cols-1 gap-4 md:gap-5 lg:grid-cols-3">
            {fakta.map((f, i) => (
              <div
                key={f.id}
                id={f.id}
                data-reveal
                style={{ '--i': i } as React.CSSProperties}
                className="scroll-mt-24 rounded-kort bg-flyd-sand p-7 md:p-8"
              >
                <Eyebrow>{f.kicker}</Eyebrow>
                <h2 className="mt-4 font-display text-[24px] font-semibold leading-[1.25]">{f.tittel}</h2>
                <div className="mt-4">{f.innhold}</div>
              </div>
            ))}
          </div>

          <div
            className="mt-14 grid grid-cols-1 gap-8 border-t border-flyd-linje-mint pt-14 lg:grid-cols-12 lg:gap-16"
            data-reveal
          >
            <div className="lg:col-span-5">
              <Eyebrow>Kort fortalt</Eyebrow>
              <h2 className={`mt-5 ${h2}`}>Kan jeg bytte regnskapsfører når som helst?</h2>
            </div>
            <div className="lg:col-span-7">
              <p className={brod}>
                Ja. Ingen lov binder deg til regnskapsføreren du har. Det som avgjør hvor raskt du kan gå, er
                oppdragsavtalen: der står oppsigelsestiden, eventuell bindingstid og hva det koster å avslutte. Det finnes
                ingen felles oppsigelsestid for regnskapsførere, så les avtalen før du setter en sluttdato.
              </p>
              <p className={`mt-4 ${brod}`}>
                De fleste bytter fordi de vil ha noe mer, ikke fordi noe har gått galt. Vanlige grunner er:
              </p>
              <Punkter
                linje="mint"
                items={[
                  'Du vil ha tettere oppfølging og en fast kontaktperson',
                  'Du vil ha rådgivning, ikke bare bokføring',
                  'Prisen står ikke lenger i forhold til det du får',
                  'Systemet passer ikke lenger, eller du vil automatisere mer',
                  'Virksomheten vokser og trenger mer kompetanse, for eksempel på lønn eller integrasjoner',
                ]}
              />
            </div>
          </div>

          <div
            className="mt-14 grid grid-cols-1 gap-8 border-t border-flyd-linje-mint pt-14 lg:grid-cols-12 lg:gap-16"
            data-reveal
          >
            <h2 className={`lg:col-span-5 ${h2}`}>Når er det lurt å bytte?</h2>
            <div className="lg:col-span-7">
              <p className={brod}>
                Mange bytter ved årsskiftet fordi det gir et naturlig skille, men det går fint midt i året. Det
                ryddigste er å bytte rett etter at en mva-termin og en a-melding er levert, slik at det er tydelig hvem
                som har ansvaret for hva.
              </p>
              <p className={`mt-4 ${brod}`}>
                Unngå å bytte rett før fristene for årsregnskap og skattemelding uten en klar avtale om hvem som
                leverer dem.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* SJEKKLISTE */}
      <Section tone="sand" id="sjekkliste">
        <Container>
          <div className="max-w-3xl" data-reveal>
            <Eyebrow>Sjekkliste</Eyebrow>
            <h2 className="mt-5 font-display text-display-lg font-semibold">Sjekkliste – bytte regnskapsfører</h2>
          </div>
          <div className="stagger mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
            {bytteSjekkliste.map((gruppe, i) => (
              <div
                key={gruppe.tittel}
                data-reveal
                style={{ '--i': i } as React.CSSProperties}
                className="rounded-kort bg-flyd-lysmint p-7 md:p-8"
              >
                <h3 className="font-display text-[20px] font-semibold">{gruppe.tittel}</h3>
                <Punkter linje="mint" items={gruppe.punkter} />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* OFTE STILTE SPØRSMÅL – Lys mint-kort på Sand, som i skissen */}
      <Section tone="sand" id="sporsmal" className="pt-0 md:pt-0">
        <Container>
          <div className="border-t border-flyd-linje-sand pt-20 md:pt-28" data-reveal>
            <Eyebrow>Spørsmål og svar</Eyebrow>
            <h2 className={`mt-5 max-w-3xl ${h2}`}>Ofte stilte spørsmål om å bytte regnskapsfører</h2>
            <div className="mt-8 max-w-4xl space-y-3">
              {bytteFaq.map((f) => (
                <details key={f.q} className="faq group rounded-kort bg-flyd-lysmint px-6 md:px-7">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-flis py-5 font-display text-[18px] font-semibold text-flyd-skog transition-colors duration-200 hover:text-flyd-petrol">
                    {f.q}
                    <Plus className="faq-pil h-5 w-5 flex-shrink-0 text-flyd-teal" strokeWidth={2} aria-hidden="true" />
                  </summary>
                  <p className="faq-svar pb-6 text-[16px] leading-relaxed text-flyd-skifer">{f.a}</p>
                </details>
              ))}
            </div>
            <p className={`mt-8 ${brod}`}>
              Har du et spørsmål vi ikke har svart på?{' '}
              <Link href="/kontakt/" className={lenke}>
                Ta kontakt med oss
              </Link>
              , så svarer vi så raskt vi kan.
            </p>
          </div>
        </Container>
      </Section>

      {/* HVA FLYD GJØR – Petrol-kort rett under FAQ, som i skissen. Avslutter siden; knappen er Mint-kontur, ikke Korall. */}
      <Section tone="sand" id="flyd" className="pt-0 md:pt-0">
        <Container>
          <div className="on-dark grid grid-cols-1 gap-12 rounded-bilde bg-flyd-petrol p-8 text-flyd-sand md:p-12 lg:grid-cols-12 lg:gap-16 lg:p-14">
            <div className="lg:col-span-8" data-reveal>
              <Eyebrow tone="petrol">Rogaland og Agder</Eyebrow>
              <h2 className="mt-5 font-display text-display-md font-semibold text-flyd-sand">
                Hva gjør Flyd for deg når du bytter?
              </h2>
              <p className="mt-6 max-w-xl text-[17px] leading-[1.65] text-flyd-dempet">
                Du skal ikke måtte kunne prosessen for å bytte. Når du har sagt ja, tar vi oss av overgangen.
              </p>
              <NumberedList
                tone="dark"
                className="mt-8"
                items={[
                  'Vi tar kontakt med den forrige regnskapsføreren før vi tar oppdraget, slik regnskapsførerloven § 5-1 krever, og følger opp overleveringen.',
                  'Vi henter inn tidligere år fra SAF-T og legger inn åpningsbalansen for inneværende år i Tripletex, med åpne poster.',
                  'Vi får brukeradministratortilgang i ditt Tripletex og setter opp brukere, bank og integrasjoner.',
                  'Du får en fast kontaktperson som kjenner virksomheten din.',
                ]}
              />
              <Bekreft className="mt-6">
                hvilke andre steg Flyd tar ansvar for ved overtakelse, for eksempel Samordnet registermelding og
                tilgangspakker i Altinn
              </Bekreft>
              <Bekreft className="mt-4">
                kort kundecase eller sitat fra en kunde som har byttet til Flyd, med navn og samtykke
              </Bekreft>
              <p className="mt-8 max-w-xl text-[17px] leading-[1.65] text-flyd-dempet">
                Vi har kontorer i Rogaland og Agder. Ser du etter en{' '}
                <Link
                  href="/kontor/stavanger-sandnes/"
                  className="font-medium text-flyd-sand underline decoration-flyd-mint decoration-2 underline-offset-4 transition-colors duration-200 hover:text-flyd-mint"
                >
                  regnskapsfører i Stavanger
                </Link>
                , sitter vi på Forus, midt i Stavanger-regionen.
              </p>
              <p className="mt-4 max-w-xl text-[17px] leading-[1.65] text-flyd-dempet">
                Ta en uforpliktende prat med oss. Vi ser på avtalen og systemet du har i dag, og forteller deg hvordan
                et bytte vil gå for deg.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-5">
                <ButtonLink href={kontakt} variant="secondary-dark" withArrow>
                  Snakk med oss
                </ButtonLink>
                <TextLink href="/kontor/" tone="dark">
                  Finn nærmeste kontor
                </TextLink>
                <TextLink href="/tjenester/" tone="dark">
                  Se alle tjenestene våre
                </TextLink>
              </div>
            </div>
            {/* Dekor: Mint-ring med Flyd-teal-prikk */}
            <div className="hidden items-center justify-center lg:col-span-4 lg:flex" aria-hidden="true">
              <div className="flex aspect-square w-full max-w-[260px] items-center justify-center rounded-full border border-flyd-mint/50">
                <div className="h-[38%] w-[38%] rounded-full bg-flyd-teal" />
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
