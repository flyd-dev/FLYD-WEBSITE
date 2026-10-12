import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, Plus } from 'lucide-react';
import Container from '@/components/Container';
import Section from '@/components/Section';
import Eyebrow from '@/components/Eyebrow';
import ClosingCta from '@/components/ClosingCta';
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

const lenke =
  'font-medium text-flyd-petrol underline decoration-flyd-teal decoration-2 underline-offset-4 transition-colors duration-200 hover:text-flyd-skog hover:decoration-flyd-skog';
const brod = 'text-[17px] leading-[1.7] text-flyd-skifer';
const h2 = 'font-display text-display-md font-semibold';

const innhold = [
  { id: 'nar-som-helst', label: 'Kan jeg bytte når som helst?' },
  { id: 'steg', label: 'Slik bytter du – 6 steg' },
  { id: 'tid-og-pris', label: 'Når, hvor lenge og hva det koster' },
  { id: 'flyd', label: 'Hva Flyd gjør for deg' },
  { id: 'sjekkliste', label: 'Sjekkliste' },
  { id: 'sporsmal', label: 'Ofte stilte spørsmål' },
];

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
    tittel: 'Velg ny regnskapsfører og aksepter tilbudet',
    innhold: (
      <>
        <p className={brod}>
          Snakk med en eller flere regnskapsførere, og be om et skriftlig tilbud som viser hva som inngår. Når du
          har akseptert tilbudet, skal den nye regnskapsføreren etter regnskapsførerloven § 5-1 be den forrige om å
          opplyse om det finnes forhold som tilsier at oppdraget ikke bør tas. Etter god regnskapsføringsskikk
          (GRFS) får du beskjed om at henvendelsen sendes.
        </p>
        <p className={`mt-4 ${brod}`}>
          Dette er en fast rutine ved alle bytter, ikke et tegn på mistanke eller konflikt. Den forrige
          regnskapsføreren skal svare uten ugrunnet opphold.
        </p>
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
        <blockquote className="mt-4 rounded-kort bg-flyd-lysmint p-6 text-[16px] leading-relaxed text-flyd-skog md:p-7">
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
          Når oppdraget avsluttes, skal regnskapsmaterialet og regnskapsdataene gjøres tilgjengelig for deg så snart
          som mulig. Etter GRFS skjer det normalt i SAF-T Regnskap, med mindre dere har avtalt noe annet. Be om:
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
          nødvendigvis med. Uansett hvem som fører regnskapet, har virksomheten ansvaret for at materialet
          oppbevares så lenge bokføringsloven krever.
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
          nye regnskapsførerens organisasjonsnummer, og regnskapsføreren bekrefter ved å signere elektronisk i
          Altinn. Meldingen koster ingenting. Flyd AS har org.nr. 933 662 934.
        </p>
        <p className={`mt-4 ${brod}`}>
          Altinn går i 2026 over fra roller til tilgangspakker. Regnskapsførerrollen som er registrert i
          Enhetsregisteret, videreføres. Fullmakter som er delegert manuelt, for eksempel til en person hos det gamle
          byrået, må gis på nytt som tilgangspakker under Tilgangsstyring i Altinn. Gi bare de pakkene som trengs, og
          fjern den gamle regnskapsførerens tilganger når overleveringen er dokumentert.
        </p>
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
        <Bekreft className="mt-5">hvem som normalt eier systemlisensen hos Flyd-kunder – kunden eller Flyd</Bekreft>
        <p className={`mt-5 ${brod}`}>
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

export default function BytteRegnskapsforerPage() {
  return (
    <>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={faqJsonLd} />

      {/* HERO + KORTSVAR */}
      <Section tone="sand" className="pt-10 md:pt-14" flyt>
        <Container>
          <Breadcrumbs items={[{ name: 'Bytte regnskapsfører', href: g.path }]} />
          <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Eyebrow>Guide</Eyebrow>
              <h1 className="mt-6 font-display text-display-xl font-semibold">{g.h1}</h1>
              <span aria-hidden="true" className="aksentlinje mt-6 block h-1 w-24 rounded-pille bg-flyd-teal" />
              <p className="mt-8 max-w-2xl font-display text-ingress font-medium text-flyd-petrol">
                Ja, du kan bytte regnskapsfører når som helst, også midt i året. Les oppdragsavtalen, velg ny
                regnskapsfører, si opp skriftlig med en sluttdato og avtal overlevering av regnskapsmaterialet, normalt
                som SAF-T. Meld så ny regnskapsfører i Enhetsregisteret, og gi tilganger i Altinn og regnskapssystemet.
                Den nye regnskapsføreren hjelper deg med det meste.
              </p>
              <p className="mt-6 text-[15px] text-flyd-skifer">
                Sist oppdatert <time dateTime={g.modified}>12. oktober 2026</time>.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <ButtonLink href={kontakt} variant="primary" withArrow>
                  Snakk med oss
                </ButtonLink>
                <ButtonLink href="#sjekkliste" variant="secondary">
                  Gå til sjekklisten
                </ButtonLink>
              </div>
            </div>
            <aside className="lg:col-span-5">
              <nav aria-label="Innhold i guiden" className="rounded-kort bg-flyd-lysmint p-7 md:p-8 lg:sticky lg:top-24">
                <Eyebrow as="h2">Innhold</Eyebrow>
                <ol className="mt-5 border-t border-flyd-linje-mint">
                  {innhold.map((x, i) => (
                    <li key={x.id} className="border-b border-flyd-linje-mint">
                      <a
                        href={`#${x.id}`}
                        className="flex gap-4 rounded-flis py-3 text-[16px] text-flyd-skog transition-colors duration-200 hover:text-flyd-petrol"
                      >
                        <span className="w-6 flex-shrink-0 font-display font-semibold tabular-nums text-flyd-petrol" aria-hidden="true">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        {x.label}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>
          </div>
        </Container>
      </Section>

      {/* KAN JEG BYTTE NÅR SOM HELST? */}
      <Section tone="lysmint" id="nar-som-helst">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5" data-reveal>
              <Eyebrow>Kort fortalt</Eyebrow>
              <h2 className={`mt-5 ${h2}`}>Kan jeg bytte regnskapsfører når som helst?</h2>
            </div>
            <div className="lg:col-span-7" data-reveal>
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
        </Container>
      </Section>

      {/* SEKS STEG */}
      <Section tone="sand" id="steg">
        <Container>
          <div className="max-w-3xl" data-reveal>
            <Eyebrow>Steg for steg</Eyebrow>
            <h2 className="mt-5 font-display text-display-lg font-semibold">
              Slik bytter du regnskapsfører – 6 steg
            </h2>
            <p className={`mt-6 ${brod}`}>
              Rekkefølgen under gir et ryddig bytte uten hull i ansvaret. Fra steg 2 tar den nye regnskapsføreren
              normalt mye av arbeidet.
            </p>
          </div>
          <ol className="mt-12 max-w-4xl border-t border-flyd-linje-sand">
            {steg.map((s, i) => (
              <li key={s.tittel} data-reveal className="flex gap-6 border-b border-flyd-linje-sand py-10 md:gap-8">
                <span
                  className="w-9 flex-shrink-0 font-display text-[24px] font-semibold leading-[1.3] tabular-nums text-flyd-rust"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-[24px] font-semibold leading-[1.3]">
                    {i + 1}. {s.tittel}
                  </h3>
                  <div className="mt-4">{s.innhold}</div>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* NÅR, HVOR LENGE, HVA KOSTER DET */}
      <Section tone="lysmint" id="tid-og-pris">
        <Container>
          <div className="space-y-14">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16" data-reveal>
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

            <div className="grid grid-cols-1 gap-8 border-t border-flyd-linje-mint pt-14 lg:grid-cols-12 lg:gap-16" data-reveal>
              <h2 className={`lg:col-span-5 ${h2}`}>Hvor lang tid tar et bytte?</h2>
              <div className="lg:col-span-7">
                <p className={brod}>
                  Det avhenger mest av oppsigelsestiden i avtalen og hvor raskt materialet blir overlevert. Selve
                  registreringen i Enhetsregisteret går raskt, siden enkle endringer behandles maskinelt. I praksis er
                  det oppsigelsestiden som setter takten.
                </p>
                <Bekreft className="mt-5">typisk tid hos Flyd fra kunden sier ja til regnskapet er i full drift</Bekreft>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 border-t border-flyd-linje-mint pt-14 lg:grid-cols-12 lg:gap-16" data-reveal>
              <h2 className={`lg:col-span-5 ${h2}`}>Hva koster det å bytte regnskapsfører?</h2>
              <div className="lg:col-span-7">
                <p className={brod}>
                  Å melde ny regnskapsfører til Brønnøysundregistrene er gratis. Kostnadene ved et bytte kommer fra
                  avtalene dine:
                </p>
                <Punkter
                  linje="mint"
                  items={[
                    'Honorar til den gamle regnskapsføreren i oppsigelsestiden',
                    'Sluttarbeid eller uttrekk av data, hvis avtalen sier det',
                    'Oppstart og eventuell opprydding hos den nye regnskapsføreren',
                    'Systemlisens eller flytting av data, hvis du må over på et nytt abonnement',
                  ]}
                />
                <Bekreft className="mt-5">Flyds oppstartspris ved bytte, og om overtakelsen inngår i prisen</Bekreft>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* HVA FLYD GJØR – Petrol som seksjonsskille */}
      <Section tone="petrol" id="flyd" flyt>
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5" data-reveal>
              <Eyebrow tone="petrol">Bytte til Flyd</Eyebrow>
              <h2 className="mt-5 font-display text-display-lg font-semibold text-flyd-sand">
                Hva gjør Flyd for deg når du bytter?
              </h2>
              <p className="mt-6 max-w-md text-[17px] leading-[1.65] text-flyd-dempet">
                Du skal ikke måtte kunne prosessen for å bytte. Når du har sagt ja, tar vi oss av overgangen.
              </p>
              <p className="mt-6 max-w-md text-[17px] leading-[1.65] text-flyd-dempet">
                Vi har kontorer i Rogaland og Agder. Ser du etter en{' '}
                <Link
                  href="/kontor/stavanger-sandnes/"
                  className="font-medium text-flyd-sand underline decoration-flyd-mint decoration-2 underline-offset-4 transition-colors duration-200 hover:text-flyd-mint"
                >
                  regnskapsfører i Stavanger
                </Link>
                , sitter vi på Forus, midt i Stavanger-regionen.
              </p>
              <div className="mt-8 flex flex-col items-start gap-3">
                <TextLink href="/kontor/" tone="dark">
                  Finn nærmeste kontor
                </TextLink>
                <TextLink href="/tjenester/" tone="dark">
                  Se alle tjenestene våre
                </TextLink>
              </div>
            </div>
            <div className="lg:col-span-7" data-reveal>
              <NumberedList
                tone="dark"
                items={[
                  'Vi tar kontakt med den forrige regnskapsføreren, slik regnskapsførerloven krever, og følger opp overleveringen.',
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

      {/* OFTE STILTE SPØRSMÅL */}
      <Section tone="lysmint" id="sporsmal">
        <Container>
          <div className="max-w-3xl" data-reveal>
            <Eyebrow>Ofte stilte spørsmål</Eyebrow>
            <h2 className={`mt-5 ${h2}`}>Ofte stilte spørsmål om å bytte regnskapsfører</h2>
            <div className="mt-8 border-t border-flyd-linje-mint">
              {bytteFaq.map((f) => (
                <details key={f.q} className="faq group border-b border-flyd-linje-mint">
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

      <ClosingCta
        kicker="Neste steg"
        title="Vurderer du å bytte regnskapsfører?"
        text="Ta en uforpliktende prat med oss. Vi ser på avtalen og systemet du har i dag, og forteller deg hvordan et bytte vil gå for deg."
        primary={{ href: kontakt, label: 'Snakk med oss' }}
      />
    </>
  );
}
