import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';
import Container from '@/components/Container';
import Section from '@/components/Section';
import Eyebrow from '@/components/Eyebrow';
import JsonLd from '@/components/JsonLd';
import ConsentLink from '@/components/ConsentLink';
import FlydLogo from '@/components/FlydLogo';
import { personvern } from '@/data/personvern';

export const metadata: Metadata = pageMetadata({
  title: 'Personvern',
  description:
    'Slik behandler Flyd personopplysninger i revisjon, regnskap og rådgivning, og på flyd.no. Dine rettigheter og hvem du kontakter.',
  path: '/personvern/',
});

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Hjem', item: 'https://www.flyd.no/' },
    { '@type': 'ListItem', position: 2, name: 'Personvern', item: 'https://www.flyd.no/personvern/' },
  ],
};

/**
 * Felles personvernerklæring for regnskap og revisjon. Revisjonsberetningene viser
 * til den, så punktene om revisjon må stå. Teksten er Irenes (22.10.2026), punkt 5.6
 * er skrevet etter hvordan nettstedet virker. Ankrene (#revisjon osv.) kan lenkes til.
 */

const lenke =
  'font-medium text-flyd-petrol underline decoration-flyd-teal decoration-2 underline-offset-4 transition-colors hover:text-flyd-skog hover:decoration-flyd-skog';

const deler = [
  { id: 'lovgivning', tittel: 'Lovgivning og veiledninger' },
  { id: 'innsamling', tittel: 'Når samler vi inn personopplysninger?' },
  { id: 'roller', tittel: 'Behandlingsansvarlig og databehandler' },
  { id: 'rettigheter', tittel: 'Dine rettigheter' },
  { id: 'opplysninger', tittel: 'Personopplysninger som vi samler inn og hva vi bruker dem til' },
  { id: 'sikkerhet', tittel: 'Informasjonssikkerhet, taushetsplikt og oppbevaring' },
  { id: 'overforing', tittel: 'Overføring av personopplysninger' },
] as const;

type DelId = (typeof deler)[number]['id'];

function Del({ id, children }: { id: DelId; children: React.ReactNode }) {
  const nr = deler.findIndex((d) => d.id === id) + 1;
  const { tittel } = deler[nr - 1];
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="border-t border-flyd-linje-sand pt-8 font-display text-[24px] font-semibold text-flyd-skog">
        <span className="tabular-nums text-flyd-petrol">{nr}</span> {tittel}
      </h2>
      {children}
    </section>
  );
}

function H3({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h3 id={id} className="mt-8 scroll-mt-28 font-display text-[19px] font-semibold text-flyd-skog">
      {children}
    </h3>
  );
}

/** Mellomtittel inne i et underpunkt (brukes i 5.6). */
function H4({ children }: { children: React.ReactNode }) {
  return <h4 className="mt-6 font-semibold text-flyd-skog">{children}</h4>;
}

function Liste({ children }: { children: React.ReactNode }) {
  return <ul className="mt-3 list-disc space-y-1.5 pl-6 marker:text-flyd-teal">{children}</ul>;
}

function Ekstern({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={lenke}>
      {children}
    </a>
  );
}

function Epost() {
  const epost = personvern.personvernansvarligEpost;
  return (
    <a href={`mailto:${epost}`} className={lenke}>
      {epost}
    </a>
  );
}

export default function PersonvernPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <Section tone="sand" size="lg" className="pt-12 md:pt-16">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Personvern</Eyebrow>
            {/* Myk bindestrek: det lange ordet deles på smale skjermer i stedet for å gå ut av siden. */}
            <h1 className="mt-6 font-display text-display-xl font-semibold">
              Personvern&shy;erklæring for{' '}
              <FlydLogo
                title="Flyd"
                className="inline-block h-[1em] w-auto translate-y-[0.22em] align-baseline text-flyd-teal"
              />
            </h1>
            <p className="mt-8 font-display text-ingress font-medium text-flyd-petrol">
              Denne personvernerklæringen forteller hvordan {personvern.selskap} samler inn og bruker
              personopplysninger. Målet er å gi deg overordnet informasjon om vår behandling av
              personopplysninger.
            </p>
            <p className="mt-6 text-[17px] leading-[1.7] text-flyd-skifer">
              Her får du nærmere informasjon om hvilke personopplysninger vi typisk samler inn, hva vi bruker
              opplysningene til og hvordan vi behandler dem. Du får også informasjon om hvilke rettigheter du har
              dersom vi har personopplysninger om deg.
            </p>

            <div className="mt-10 rounded-kort bg-flyd-lysmint p-6 text-[17px] leading-[1.7] text-flyd-skifer md:p-8">
              <p>Henvendelse om vår behandling av personopplysninger kan rettes til:</p>
              <address className="mt-3 not-italic text-flyd-skog">
                {personvern.selskap}
                <br />
                {personvern.postadresse}
                <br />
                <Epost />
              </address>
              <p className="mt-3">
                Henvendelsen vil bli fulgt opp av vår personvernansvarlig. Du kan også rette din henvendelse til din
                kontaktperson hos oss.
              </p>
            </div>
            <p className="mt-6 text-[15px] text-flyd-skifer">
              Dato for siste endring i vår personvernerklæring er {personvern.sistEndret}.
            </p>

            <nav aria-label="Innhold" className="mt-10 border-t border-flyd-linje-sand pt-8">
              <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-flyd-skog">
                Oversikt over personvernerklæringen
              </p>
              <ol className="mt-4 space-y-2 text-[16px]">
                {deler.map((d, i) => (
                  <li key={d.id} className="flex gap-3">
                    <span className="w-5 flex-shrink-0 tabular-nums text-flyd-skifer">{i + 1}</span>
                    <a href={`#${d.id}`} className={lenke}>
                      {d.tittel}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="mt-12 space-y-12 text-[17px] leading-[1.7] text-flyd-skifer">
              <Del id="lovgivning">
                <p className="mt-3">
                  {personvern.selskap} har offentlig godkjenning fra Finanstilsynet etter revisorloven og
                  regnskapsførerloven. Finanstilsynet fører tilsyn med at vi driver virksomheten vår i samsvar med
                  lovgivningen vi er underlagt. Nedenfor kan du lese mer om de kravene lovgivningen stiller til vår
                  innsamling, oppbevaring og sikring av opplysninger, i tillegg til kravene i personvernreglene.
                </p>
                <p className="mt-3">
                  Det er utarbeidet en{' '}
                  <Ekstern href="https://www.revisorforeningen.no/fag/nyheter/bransjenorm-gdpr-for-revisorer/">
                    veiledning for behandling av personopplysninger i revisjonsbransjen
                  </Ekstern>
                  . Det er også utarbeidet en{' '}
                  <Ekstern href="https://www.regnskapnorge.no/faget/artikler/bransjeaktuelt/veiledning-for-behandling-av-personopplysninger-i-regnskapsbransjen/">
                    veiledning for behandling av personopplysninger i regnskapsførerbransjen
                  </Ekstern>
                  . Vi følger disse i vår virksomhet.
                </p>
              </Del>

              <Del id="innsamling">
                <p className="mt-3">Vi samler inn personopplysninger i forbindelse med</p>
                <Liste>
                  <li>
                    utførelse av våre oppdrag, inkludert revisjonstjenester (revisjon av årsregnskap, forenklet
                    revisorkontroll av regnskaper, andre attestasjonsoppdrag/revisorbekreftelser og avtalte
                    kontrollhandlinger), regnskapsføring og ulike rådgivningsoppdrag
                  </li>
                  <li>kundekontroll og rapportering av mistanke etter hvitvaskingsloven</li>
                  <li>kundekontakt og markedsføring</li>
                  <li>
                    bruk av{' '}
                    <a href="#nettstedet" className={lenke}>
                      nettstedet flyd.no
                    </a>
                  </li>
                  <li>ansettelser og ansatte</li>
                </Liste>
              </Del>

              <Del id="roller">
                <p className="mt-3">
                  Vi er behandlingsansvarlig etter personvernreglene når vi behandler personopplysninger i forbindelse
                  med revisjonstjenester, utarbeidelse av årsregnskap og skattemelding for egne revisjonsklienter og
                  attestasjonstjenester. Vi er normalt behandlingsansvarlig på due diligence-oppdrag, granskingsoppdrag
                  og internrevisjonsoppdrag. Som behandlingsansvarlig er vi ansvarlig for å etterleve kravene i
                  personvernreglene som gjelder ved vår behandling av dine personopplysninger, herunder at du får
                  ivaretatt dine rettigheter.
                </p>
                <p className="mt-3">
                  I enkelte tilfeller er vi imidlertid databehandler for vår kunde. Det vil si at vi behandler dine
                  personopplysninger på vegne av vår oppdragsgiver (behandlingsansvarlig). Dette gjelder for
                  regnskapsføreroppdrag og rådgivningsoppdrag mv. hvor det er vår oppdragsgiver
                  (behandlingsansvarlig) som avgjør hvilke opplysninger vi skal behandle. I disse tilfellene vil vi
                  inngå en databehandleravtale med vår oppdragsgiver (den behandlingsansvarlige). Vi behandler dine
                  personopplysninger i samsvar med databehandleravtalen.
                </p>
              </Del>

              <Del id="rettigheter">
                <p className="mt-3">
                  Du kan utøve dine rettigheter ved å kontakte vår personvernansvarlig. Send en e-post til{' '}
                  <Epost />. Du skal få svar uten ugrunnet opphold, og senest innen 30 dager.
                </p>
                <p className="mt-3">
                  Nedenfor informerer vi om hvordan vi ivaretar de rettighetene som er mest aktuelle for vår
                  virksomhet. Les mer om{' '}
                  <Ekstern href="https://www.datatilsynet.no/rettigheter-og-plikter/den-registrertes-rettigheter/">
                    dine rettigheter etter personvernreglene
                  </Ekstern>{' '}
                  på Datatilsynets nettsider.
                </p>

                <H3 id="innsyn">4.1 Innsyn</H3>
                <p className="mt-3">
                  Enhver som ber om det har krav på å få vite hva slags behandling av personopplysninger vi foretar,
                  samt grunnleggende informasjon om behandlingen. Slik informasjon er gitt i denne
                  personvernerklæringen.
                </p>
                <p className="mt-3">
                  Hvis du ber oss om innsyn i opplysninger som vi kan ha om deg, vil vi gjøre rimelige undersøkelser
                  for å finne ut om vi har slike opplysninger. Vi kan imidlertid avvise åpenbart grunnløse eller
                  overdrevne anmodninger (personvernforordningen artikkel 12.5).
                </p>
                <p className="mt-3">
                  Når du ber om innsyn vil vi vurdere om vi kan gi innsyn uten hinder av vår lovbestemte
                  taushetsplikt, og i tilfelle informere om personopplysningene som er behandlet. Vi er underlagt
                  lovbestemt taushetsplikt som gjør at du ikke kan få innsyn i opplysninger vi behandler om deg som
                  også gjelder andre. Det vil for eksempel være tilfelle for opplysninger som gjelder en konflikt
                  mellom deg og din arbeidsgiver. Da må du gå direkte til arbeidsgiveren og be om å få innsyn i
                  opplysningene.
                </p>
                <p className="mt-3">
                  Det kan være nødvendig å vurdere personers kompetanse og integritet for å utføre våre oppdrag. Vår
                  taushetsplikt forhindrer oss i å gi innsyn i slike vurderinger. Revisors vurdering skal også være
                  uavhengig av muligheten til innsyn, jf. også personopplysningsloven § 16 første ledd bokstav e.
                </p>

                <H3 id="sletting-og-retting">4.2 Sletting og retting</H3>
                <p className="mt-3">
                  Du har rett til å få slettet opplysninger om deg selv som ikke lenger er nødvendige for å følge opp
                  oppdraget forsvarlig og som vi ikke har lovbestemt plikt til å oppbevare. Vi kan også ha en
                  berettiget interesse i å beholde opplysninger utover dette hvis det er nødvendig for å forsvare oss
                  mot erstatningskrav eller anklager (personvernforordningen artikkel 6.1.f).
                </p>
                <p className="mt-3">
                  Dersom vi behandler personopplysninger om deg som er uriktige eller ufullstendige, kan du innenfor de
                  begrensninger som er fastsatt i personvernreglene og annen lovgivning kreve å få rettet
                  personopplysningene.
                </p>

                <H3 id="klage">4.3 Klage</H3>
                <p className="mt-3">
                  Ta først kontakt med vår personvernansvarlig hvis du mener vi ikke overholder personvernreglene.
                </p>
                <p className="mt-3">
                  Du kan også klage over vår behandling av personopplysninger til{' '}
                  <Ekstern href="https://www.datatilsynet.no/">Datatilsynet</Ekstern>.
                </p>
              </Del>

              <Del id="opplysninger">
                <H3 id="revisjon">5.1 Oppdrag etter revisorloven</H3>
                <p className="mt-3">
                  Når vi utfører revisjonsoppdrag eller bekrefter opplysninger overfor offentlige myndigheter, er vi
                  pålagt gjennom revisorloven og standarder for god revisjonsskikk å skaffe oss forsvarlig
                  dokumentasjon for våre konklusjoner i revisjonsberetninger og andre uttalelser vi avgir
                  (revisjonsbevis). Denne oppdragsdokumentasjonen inneholder i hovedsak bedriftsrelaterte
                  opplysninger. Den vil imidlertid også inneholde enkelte personopplysninger, slik som:
                </p>
                <Liste>
                  <li>
                    navn og stillingsbetegnelse mv. på personer som vi har innhentet opplysninger fra i forbindelse med
                    oppdraget
                  </li>
                  <li>opplysninger om lønns- og arbeidsforhold til ansatte hos selskapet vi reviderer</li>
                  <li>
                    vurderinger av kompetansen og integriteten til personer som har ansvar for regnskapet eller andre
                    forhold som vi skal bekrefte
                  </li>
                </Liste>
                <p className="mt-3">
                  Det vil også kunne inkludere opplysninger om enkeltpersoners straffbare forhold og lovovertredelser.
                </p>

                <H3 id="regnskap">5.2 Oppdrag etter regnskapsførerloven</H3>
                <p className="mt-3">
                  Vi utfører også regnskapsføreroppdrag. Da er vi underlagt regnskapsførerloven. Etter
                  regnskapsførerloven skal vi utføre oppdraget i samsvar med de lover og regler som kundens regnskap
                  skal oppfylle (bokførings-, regnskaps- og skattelovgivningen mv.), og følge god
                  regnskapsføringsskikk. Det regnskapsmaterialet vi behandler på vegne av våre kunder inkluderer
                  personopplysninger, slik som opplysninger om lønns- og arbeidsforhold.
                </p>

                <H3 id="ikke-lovregulerte-oppdrag">5.3 Oppdrag som ikke er lovregulert</H3>
                <p className="mt-3">
                  Vi utfører også oppdrag som ikke er regulert på denne måten i revisorloven eller
                  regnskapsførerloven. Det inkluderer bekreftelser/attestasjoner overfor andre enn offentlige
                  myndigheter, avtalte kontrollhandlinger, granskinger og ulike rådgivningsoppdrag. I den grad det er
                  nødvendig å samle inn personopplysninger for å utføre disse oppdragene, skal vi vurdere om kunden har
                  et berettiget behov for revisors uttalelse. I motsatt fall vil vi ikke påta oss oppdraget. På
                  tilsvarende måte som for revisjonsoppdrag (se ovenfor), vil det være snakk om personopplysninger som
                  fremgår av dokumentasjon som er nødvendig som grunnlag for våre uttalelser, rapporter o.l.
                </p>

                <H3 id="hvitvasking">5.4 Plikter etter hvitvaskingsloven</H3>
                <p className="mt-3">
                  Gjennom hvitvaskingsloven er vi pålagt å utføre kundekontroll av alle våre kunder. I den forbindelse
                  skal vi bekrefte identiteten til den som handler på vegne av kunden (på revisjonsoppdrag er det
                  daglig leder) og reelle rettighetshavere som i siste hånd kontrollerer selskapet/kunden. Vi skal
                  registrere opplysninger om disse personene, inkludert kopi av legitimasjonsdokumenter som er
                  benyttet for å bekrefte identiteten.
                </p>
                <p className="mt-3">
                  Gjennom hvitvaskingsloven er vi også pålagt å rapportere mistanke om hvitvasking og
                  terrorfinansiering til Økokrim. Meldinger til Økokrim om mistenkelige transaksjoner skal ha med alt
                  vi er kjent med om forholdet som har medført mistanke, inkludert om involverte personer. Slike
                  meldinger er unntatt innsyn for de involverte.
                </p>

                <H3 id="kundekontakt">5.5 Kundekontakt og markedsføring</H3>
                <p className="mt-3">
                  I vår kontakt med eksisterende, tidligere og potensielle kunder, registrerer vi kontaktopplysninger
                  om kontaktpersoner slik som navn, e-postadresse, telefonnummer og stillingsbenevnelse. Vi har en
                  berettiget interesse i å holde kundekontakt og markedsføre våre tjenester (personvernforordningen
                  artikkel 6.1.f).
                </p>

                <H3 id="nettstedet">5.6 Bruk av nettstedet flyd.no</H3>
                <H4>Kontaktskjemaet</H4>
                <p className="mt-2">
                  Når du sender oss en henvendelse gjennom{' '}
                  <Link href="/kontakt/" className={lenke}>
                    kontaktskjemaet
                  </Link>
                  , registrerer vi navn, bedrift, e-postadresse, telefonnummer, emne og meldingen din. Vi bruker
                  opplysningene til å svare deg og følge opp henvendelsen. Vi har en berettiget interesse i å besvare
                  henvendelser (personvernforordningen artikkel 6.1.f). Nettstedet driftes av Vercel, og henvendelsen
                  sendes videre til oss gjennom automatiseringstjenesten Make. Begge er våre databehandlere. Make har
                  servere i EU. Vercel kan behandle opplysningene i USA, på grunnlag av{' '}
                  <span className="whitespace-nowrap">EU–US</span> Data Privacy Framework.
                  Blir du kunde,
                  oppbevarer vi opplysningene som beskrevet i{' '}
                  <a href="#sikkerhet" className={lenke}>
                    punkt 6
                  </a>
                  . Ellers sletter vi dem senest tolv måneder etter siste kontakt.
                </p>

                <H4>Informasjonskapsler (cookies)</H4>
                <p className="mt-2">
                  Uten samtykke setter vi ingen informasjonskapsler, og vi laster ingen verktøy for statistikk eller
                  annonser. Valget du gjør i samtykkebanneren, lagres i nettleseren din, slik at vi ikke trenger å
                  spørre på nytt.
                </p>
                <p className="mt-3">
                  Velger du «Godta alle», bruker vi i tillegg disse verktøyene, som setter informasjonskapsler:
                </p>
                <Liste>
                  <li>
                    Google Analytics, til besøksstatistikk: hvilke sider som besøkes, hvordan besøkende finner fram til
                    nettstedet og hvordan de bruker det.
                  </li>
                  <li>
                    Microsoft Clarity, som viser hvordan sidene brukes, for eksempel klikk, rulling og navigasjon, slik
                    at vi kan gjøre dem bedre.
                  </li>
                  <li>
                    Google Ads, til å måle om annonsene våre fører til henvendelser, og til å vise annonser til
                    personer som har besøkt flyd.no før.
                  </li>
                </Liste>
                <p className="mt-3">
                  Grunnlaget er samtykket ditt (ekomloven og personvernforordningen artikkel 6.1.a). Velger du «Kun
                  nødvendige», brukes ingen av disse verktøyene.
                </p>

                <H4>Klikk-ID fra annonser</H4>
                <p className="mt-2">
                  Kommer du til nettstedet fra en av annonsene våre og har godtatt alle informasjonskapsler, lagres
                  annonsens klikk-ID i nettleseren din i inntil 90 dager. Sender du en henvendelse, følger klikk-ID-en
                  med. Da kan vi senere melde til Google Ads om henvendelsen førte til et kundeforhold. Vi deler ikke
                  navn, e-post eller innholdet i henvendelsen med Google, bare at et skjema ble sendt og eventuelt at
                  du ble kunde. Henvendelser med klikk-ID lagrer vi i en egen oversikt med navn, bedrift, emne og
                  klikk-ID. Oppføringene slettes etter 90 dager.
                </p>

                <H4>Google og Microsoft</H4>
                <p className="mt-2">
                  Google behandler opplysningene fra Google Analytics som vår databehandler. For Google Ads og
                  Microsoft Clarity bruker Google og Microsoft også opplysningene til egne formål, og er da selvstendig
                  behandlingsansvarlige. Hvordan de gjør det, står i{' '}
                  <Ekstern href="https://policies.google.com/privacy?hl=no">Googles personvernerklæring</Ekstern> og{' '}
                  <Ekstern href="https://www.microsoft.com/nb-no/privacy/privacystatement">
                    Microsofts personvernerklæring
                  </Ekstern>
                  . Google og Microsoft kan behandle opplysningene i USA. Overføringen skjer på grunnlag av{' '}
                  <span className="whitespace-nowrap">EU–US</span> Data Privacy Framework.
                </p>

                <H4>Endre samtykke</H4>
                <p className="mt-2">
                  Du kan når som helst endre eller trekke tilbake samtykket ditt med lenken{' '}
                  <span className="whitespace-nowrap">
                    «<ConsentLink className={lenke} />»
                  </span>{' '}
                  nederst på siden. Trekker du samtykket tilbake, slettes også en
                  lagret klikk-ID.
                </p>

                <H3 id="medarbeidere">5.7 Medarbeidere og jobbsøkere</H3>
                <p className="mt-3">
                  Personopplysninger om ansatte som vi behandler, er blant annet personalia, lønnsopplysninger,
                  evalueringer, opplysninger om pårørende og utdannelse/stillingsnivå. Grunnlaget er oppfyllelse av
                  arbeidsavtalen (personvernforordningen artikkel 6.1.b) samt å oppfylle vår plikt til å rapportere
                  opplysninger om ansatte til offentlige myndigheter som NAV og Skatteetaten (personvernforordningen
                  artikkel 6.1.c, ev. artikkel 9.2.b, jf. personopplysningsloven § 6). Personopplysninger blir
                  oppbevart så lenge medarbeideren er ansatt hos oss, og slettes ett og et halvt år etter at
                  medarbeideren har sluttet. Personopplysninger om ansatte som inngår i oppbevaringspliktig
                  regnskapsmateriale, oppbevares i samsvar med kravene i bokføringsregelverket.
                </p>
                <p className="mt-3">
                  Dersom du søker jobb hos oss, trenger vi å behandle opplysninger om deg for å vurdere din søknad.
                  Grunnlaget er tiltak på søkerens anmodning før en ev. arbeidsavtale blir inngått
                  (personvernforordningen artikkel 6.1.b). Personopplysninger om søkere som ikke blir ansatt,
                  oppbevares i inntil ett år.
                </p>
              </Del>

              <Del id="sikkerhet">
                <p className="mt-3">
                  Vi har rutiner for å sikre konfidensialitet og integritet i våre kunders data. Sikringsmekanismene
                  inkluderer rolle- og tilgangsstyring og krav til innebygd personvern i våre IT-systemer. Når
                  materiale som inneholder sensitive personopplysninger overføres elektronisk til eller fra oss, skal
                  opplysningene alltid sikres mot innsyn ved hjelp av kryptering (dette gjelder såkalte særlige
                  kategorier personopplysninger, fødselsnummer og personopplysninger om straffbare forhold og
                  lovovertredelser).
                </p>
                <p className="mt-3">Utvidet informasjon om informasjonssikkerhet er tilgjengelig for våre kunder på forespørsel.</p>
                <p className="mt-3">
                  Vi er underlagt taushetsplikt etter revisorloven om alt vi blir kjent med i vår virksomhet, både i
                  forbindelse med lovregulerte oppdrag og andre oppdrag. Det gjelder enkelte unntak fra
                  taushetsplikten, se nedenfor om{' '}
                  <a href="#lovpalagt-overforing" className={lenke}>
                    overføring av personopplysninger som følge av lov
                  </a>
                  .
                </p>
                <p id="oppbevaring" className="mt-3 scroll-mt-28">
                  Etter revisorloven og forskrift til revisorloven skal vi oppbevare dokumentasjonen vår på en ordnet
                  og betryggende måte sikret mot ødeleggelse, tap og endring, i minst ti år. Etter hvitvaskingsloven
                  skal vi oppbevare opplysninger og dokumenter som er benyttet til kundekontroll eller undersøkelse av
                  mistenkelige transaksjoner etter hvitvaskingsloven i fem år etter at kundeforholdet eller
                  transaksjonen er avsluttet. Vi vil slette personopplysninger innen ett år etter utløpet av
                  oppbevaringstiden. Vi kan ha en berettiget interesse i å beholde dokumentasjonen som inneholder
                  personopplysninger lenger for å følge opp oppdraget forsvarlig eller forsvare oss mot
                  erstatningskrav eller anklager (personvernforordningen artikkel 6.1.f).
                </p>
                <p className="mt-3">
                  I den grad vi oppbevarer personopplysninger på oppdrag som ikke er omfattet av revisorloven, gjør vi
                  det fordi det er nødvendig for å følge opp oppdraget forsvarlig. Personopplysningene slettes normalt
                  fem år etter at oppdraget er avsluttet.
                </p>
              </Del>

              <Del id="overforing">
                <H3 id="lagring-i-eos">7.1 Oppbevaring i EØS</H3>
                <p className="mt-3">
                  Vi oppbevarer våre kundedata, inkludert alle personopplysninger, i Norge eller andre EØS-land. Det
                  samme gjelder opplysninger om medarbeidere og jobbsøkere. Vi benytter kun databehandlere som
                  oppbevarer opplysningene i Norge eller andre EØS-land.
                </p>
                <p className="mt-3">
                  For kunder som er en del av en internasjonal virksomhet, kan det være nødvendig å overføre
                  personopplysninger til et annet land. Hvis overføringen ikke skjer til et EØS-land eller et land
                  godkjent av EU-kommisjonen, skjer overføringen basert på standard personvernbestemmelser vedtatt av
                  EU-kommisjonen, bindende virksomhetsregler for et konsern eller gruppe av foretak eller til noen som
                  er bundet av Privacy Shield (USA).
                </p>

                <H3 id="lovpalagt-overforing">7.2 Overføring av personopplysninger som følge av lov</H3>
                <Liste>
                  <li>Finanstilsynet har tilgang til vår dokumentasjon i forbindelse med tilsyn</li>
                  <li>
                    Revisorer eller regnskapsførere som utfører kvalitetskontroll hos oss, har tilgang til vår
                    dokumentasjon
                  </li>
                  <li>
                    Rapportering av mistenkelige transaksjoner til Økokrim, se{' '}
                    <a href="#hvitvasking" className={lenke}>
                      punkt 5.4
                    </a>
                  </li>
                  <li>Politiet kan i visse tilfeller gis tilgang til dokumentasjonen vår</li>
                  <li>
                    Dersom det gjennomføres bokettersyn hos en kunde, kan vi bli pålagt å overføre informasjon til
                    skattemyndighetene som kan inneholde personopplysninger
                  </li>
                  <li>
                    Vi kan ha plikt til å gi informasjon som kan inneholde personopplysninger til gjeldsnemnd,
                    konkursbo eller bobestyrer i forbindelse med gjeldsforhandling eller konkurs
                  </li>
                  <li>Hvis vi blir innkalt som vitne i en rettssak, har vi alminnelig vitneplikt</li>
                </Liste>
                <p className="mt-3">
                  Revisorer, regnskapsførere og de myndigheter som er nevnt her, er underlagt lovbestemt taushetsplikt.
                </p>

                <H3 id="databehandlere">7.3 Vår bruk av databehandlere</H3>
                <p className="mt-3">
                  Vi bruker tjenesteleverandører til å drifte våre informasjonssystemer og lagre data for oss. Det
                  inkluderer behandling av personopplysninger slik det er beskrevet i{' '}
                  <a href="#opplysninger" className={lenke}>
                    punkt 5
                  </a>{' '}
                  ovenfor. Vi har databehandleravtaler med alle tjenesteleverandører som behandler personopplysninger
                  på vegne av oss.
                </p>
              </Del>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
