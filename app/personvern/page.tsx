import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';
import Container from '@/components/Container';
import Section from '@/components/Section';
import Eyebrow from '@/components/Eyebrow';
import JsonLd from '@/components/JsonLd';
import ConsentLink from '@/components/ConsentLink';
import { BekreftTekst } from '@/components/Bekreft';
import { personvern } from '@/data/personvern';

export const metadata: Metadata = pageMetadata({
  title: 'Personvern',
  description:
    'Slik behandler Flyd personopplysninger i revisjon, regnskap, lønn og rådgivning, og på flyd.no. Dine rettigheter og hvem du kontakter.',
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
 * Felles personvernerklæring for regnskap og revisjon. Liit viser til den i
 * revisjonsberetningene, så punktene om revisjon må stå. Opplysningene som mangler,
 * fylles inn i data/personvern.ts. Ankrene (#ansvarlig osv.) kan lenkes til.
 */

const lenke =
  'font-medium text-flyd-petrol underline decoration-flyd-teal decoration-2 underline-offset-4 transition-colors hover:text-flyd-skog hover:decoration-flyd-skog';

/** Verdien, eller [BEKREFT] til den er fylt inn i data/personvern.ts. */
function Fylt({ verdi, mangler }: { verdi: string | null; mangler: string }) {
  return verdi ? <>{verdi}</> : <BekreftTekst>{mangler}</BekreftTekst>;
}

function Epost() {
  const { epost } = personvern.personvernansvarlig;
  return epost ? (
    <a href={`mailto:${epost}`} className={lenke}>
      {epost}
    </a>
  ) : (
    <BekreftTekst>e-post til personvernansvarlig</BekreftTekst>
  );
}

function Personvernansvarlig() {
  const { navn } = personvern.personvernansvarlig;
  return (
    <>
      personvernansvarlig{navn ? ` ${navn}` : ''} på <Epost />
    </>
  );
}

const deler = [
  { id: 'ansvarlig', tittel: 'Hvem som er ansvarlig' },
  { id: 'lovgivning', tittel: 'Lovgivning og veiledninger' },
  { id: 'innsamling', tittel: 'Når vi samler inn personopplysninger' },
  { id: 'roller', tittel: 'Behandlingsansvarlig eller databehandler' },
  { id: 'rettigheter', tittel: 'Dine rettigheter' },
  { id: 'opplysninger', tittel: 'Hvilke opplysninger vi samler inn, og hva vi bruker dem til' },
  { id: 'informasjonskapsler', tittel: 'Informasjonskapsler på flyd.no' },
  { id: 'sikkerhet', tittel: 'Informasjonssikkerhet, taushetsplikt og oppbevaring' },
  { id: 'overforing', tittel: 'Overføring av personopplysninger' },
  { id: 'endringer', tittel: 'Endringer' },
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

function Liste({ children }: { children: React.ReactNode }) {
  return <ul className="mt-3 list-disc space-y-1.5 pl-6 marker:text-flyd-teal">{children}</ul>;
}

const oppbevaring = [
  { hva: 'Dokumentasjon fra revisjon (revisorloven og forskriften til den)', hvorLenge: 'Minst ti år' },
  {
    hva: 'Kundekontroll og undersøkelser etter hvitvaskingsloven',
    hvorLenge: 'Fem år etter at kundeforholdet eller transaksjonen er avsluttet',
  },
  {
    hva: 'Regnskap, lønn og andre oppdrag',
    hvorLenge: 'Så lenge regelverket krever, og ellers normalt fem år etter at oppdraget er avsluttet',
  },
];

export default function PersonvernPage() {
  const { regnskap, revisjon } = personvern;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <Section tone="sand" size="lg" className="pt-12 md:pt-16">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Personvern</Eyebrow>
            {/* Myk bindestrek: det lange ordet deles på smale skjermer i stedet for å gå ut av siden. */}
            <h1 className="mt-6 font-display text-display-xl font-semibold">Personvern&shy;erklæring for Flyd.</h1>
            <p className="mt-8 font-display text-ingress font-medium text-flyd-petrol">
              Denne erklæringen forteller hvordan Flyd samler inn og bruker personopplysninger. Den forteller
              også hvilke rettigheter du har når vi behandler opplysninger om deg.
            </p>
            <p className="mt-6 text-[15px] text-flyd-skifer">
              Sist oppdatert <Fylt verdi={personvern.sistOppdatert} mangler="dato for publisering" />.
            </p>

            <nav aria-label="Innhold" className="mt-10 rounded-kort bg-flyd-lysmint p-6 md:p-8">
              <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-flyd-skog">Innhold</p>
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
              <Del id="ansvarlig">
                <p className="mt-3">Flyd består av to selskaper:</p>
                <Liste>
                  <li>
                    {regnskap.navn} (org.nr. <Fylt verdi={regnskap.orgnr} mangler="org.nr." />) leverer regnskap,
                    lønn, rådgivning og teknologi.
                  </li>
                  <li>
                    <Fylt verdi={revisjon.navn} mangler="revisjonsselskapets navn" /> (org.nr.{' '}
                    <Fylt verdi={revisjon.orgnr} mangler="org.nr." />
                    ), tidligere Liit AS, leverer revisjon og attestasjon.
                  </li>
                </Liste>
                <p className="mt-3">
                  Hvert selskap er ansvarlig for opplysningene det behandler i sine egne oppdrag. Revisjon og
                  regnskap holdes adskilt: vi tilbyr ikke regnskapstjenester til revisjonskundene våre, og ikke
                  revisjon til regnskapskundene.
                </p>
                <p className="mt-3">
                  Spørsmål om hvordan vi behandler personopplysninger, sender du til <Personvernansvarlig />,
                  eller til kontaktpersonen din hos oss. Postadresse:{' '}
                  <Fylt verdi={personvern.postadresse} mangler="postadresse" />.
                </p>
              </Del>

              <Del id="lovgivning">
                <p className="mt-3">
                  Vi følger personvernforordningen (GDPR) og personopplysningsloven. I tillegg gjelder lovene for
                  virksomheten vår:
                </p>
                <Liste>
                  <li>
                    <strong className="font-semibold text-flyd-skog">Revisjon:</strong> Revisjonsvirksomheten er
                    godkjent av Finanstilsynet etter revisorloven, og Finanstilsynet fører tilsyn med den. Vi
                    følger veiledningen for behandling av personopplysninger i revisjonsbransjen.
                  </li>
                  <li>
                    <strong className="font-semibold text-flyd-skog">Regnskap:</strong> Regnskapsvirksomheten er
                    autorisert etter regnskapsførerloven og er under tilsyn av Finanstilsynet.
                  </li>
                  <li>
                    <strong className="font-semibold text-flyd-skog">Begge:</strong> Hvitvaskingsloven,
                    bokføringsloven og ekomloven (informasjonskapsler på nettstedet) gjelder for begge selskapene.
                  </li>
                </Liste>
              </Del>

              <Del id="innsamling">
                <p className="mt-3">Vi samler inn personopplysninger når vi:</p>
                <Liste>
                  <li>
                    utfører oppdrag: revisjon, forenklet revisorkontroll, attestasjon, avtalte kontrollhandlinger,
                    regnskap, lønn og rådgivning
                  </li>
                  <li>kontrollerer kunder og melder mistanke etter hvitvaskingsloven</li>
                  <li>har kontakt med kunder og markedsfører tjenestene våre</li>
                  <li>tar imot henvendelser og besøk på flyd.no</li>
                  <li>ansetter folk og følger opp medarbeidere</li>
                </Liste>
              </Del>

              <Del id="roller">
                <p className="mt-3">
                  <strong className="font-semibold text-flyd-skog">Revisjon:</strong> Vi er behandlingsansvarlige
                  når vi behandler personopplysninger i revisjon, i attestasjon og når vi setter opp årsregnskap og
                  skattemelding for egne revisjonskunder. Det samme gjelder normalt i due diligence, granskinger og
                  internrevisjon.
                </p>
                <p className="mt-3">
                  <strong className="font-semibold text-flyd-skog">Regnskap og lønn:</strong> Når vi fører
                  regnskap og kjører lønn for deg, behandler vi opplysninger om dine ansatte, kunder og leverandører
                  på dine vegne. Da er vi databehandler, og du er behandlingsansvarlig. Dette reguleres i en
                  databehandleravtale med deg.
                </p>
                <p className="mt-3">
                  <strong className="font-semibold text-flyd-skog">Egne formål:</strong> Vi er alltid
                  behandlingsansvarlige for opplysninger vi behandler for oss selv: kundekontroll etter
                  hvitvaskingsloven, kundekontakt, nettstedet og våre egne ansatte.
                </p>
              </Del>

              <Del id="rettigheter">
                <p className="mt-3">
                  Du bruker rettighetene dine ved å kontakte <Personvernansvarlig />. Du får svar uten ugrunnet
                  opphold, og senest innen 30 dager. Mer om rettighetene dine finner du på{' '}
                  <a href="https://www.datatilsynet.no/" target="_blank" rel="noopener noreferrer" className={lenke}>
                    Datatilsynets nettsider
                  </a>
                  .
                </p>

                <H3 id="innsyn">5.1 Innsyn</H3>
                <p className="mt-3">
                  Du har rett til å vite hvilke opplysninger vi har om deg og hvordan vi bruker dem. Ber du om
                  innsyn, undersøker vi om vi har opplysninger om deg. Vi kan avvise forespørsler som er åpenbart
                  grunnløse eller overdrevne (personvernforordningen artikkel 12 nr. 5).
                </p>
                <p className="mt-3">
                  Vi har lovbestemt taushetsplikt. Du kan derfor ikke få innsyn i opplysninger som også gjelder
                  andre – for eksempel i en konflikt mellom deg og arbeidsgiveren din. Da må du be arbeidsgiveren om
                  innsyn. Revisors vurdering av personers kompetanse og integritet gir vi heller ikke innsyn i, jf.
                  personopplysningsloven § 16 første ledd bokstav e.
                </p>

                <H3 id="retting-og-sletting">5.2 Retting og sletting</H3>
                <p className="mt-3">
                  Er opplysningene vi har om deg feil eller ufullstendige, kan du kreve at de rettes. Du kan også
                  kreve at opplysninger slettes når vi ikke lenger trenger dem til oppdraget og ikke har plikt til å
                  oppbevare dem. Vi kan likevel beholde opplysninger når vi trenger dem for å forsvare oss mot
                  erstatningskrav eller anklager (personvernforordningen artikkel 6 nr. 1 bokstav f).
                </p>

                <H3 id="begrensning-og-protest">5.3 Begrensning og protest</H3>
                <p className="mt-3">
                  Du kan kreve at vi begrenser behandlingen, og protestere mot behandling vi gjør fordi vi har en
                  berettiget interesse. Du kan alltid reservere deg mot markedsføring.
                </p>

                <H3 id="klage">5.4 Klage</H3>
                <p className="mt-3">
                  Mener du at vi ikke følger personvernreglene, ta først kontakt med personvernansvarlig. Du kan også
                  klage til{' '}
                  <a href="https://www.datatilsynet.no/" target="_blank" rel="noopener noreferrer" className={lenke}>
                    Datatilsynet
                  </a>
                  .
                </p>
                <p className="mt-3">
                  Gjelder det opplysninger vi behandler som databehandler for en regnskapskunde, er det kunden som er
                  ansvarlig. Henvendelsen din sendes da videre til kunden.
                </p>
              </Del>

              <Del id="opplysninger">
                <H3 id="revisjon">6.1 Revisjon og attestasjon</H3>
                <p className="mt-3">
                  Revisorloven og god revisjonsskikk krever at vi dokumenterer konklusjonene i revisjonsberetninger
                  og andre uttalelser. Dokumentasjonen gjelder mest selskapet, men inneholder også noen
                  personopplysninger:
                </p>
                <Liste>
                  <li>navn, stilling og lignende for personer vi har hentet opplysninger fra</li>
                  <li>lønns- og arbeidsforhold for ansatte i selskapet vi reviderer</li>
                  <li>
                    vurderinger av kompetansen og integriteten til dem som har ansvar for regnskapet eller andre
                    forhold vi skal bekrefte
                  </li>
                  <li>i noen tilfeller opplysninger om straffbare forhold og lovbrudd</li>
                </Liste>
                <p className="mt-3">
                  Grunnlaget er at vi har en rettslig plikt (personvernforordningen artikkel 6 nr. 1 bokstav c).
                </p>

                <H3 id="regnskap">6.2 Regnskap, lønn og rådgivning</H3>
                <p className="mt-3">
                  Når vi fører regnskap og kjører lønn, behandler vi opplysninger som står i bilag, lønnsgrunnlag og
                  rapporter til myndighetene. Det kan være navn, fødselsnummer, kontonummer, lønn, fravær og
                  skattetrekk for dine ansatte, og kontaktopplysninger for dine kunder og leverandører. Vi gjør
                  dette på dine vegne og etter databehandleravtalen (se{' '}
                  <a href="#roller" className={lenke}>
                    punkt 4
                  </a>
                  ).
                </p>
                <p className="mt-3">
                  I rådgivning og teknologioppdrag behandler vi personopplysninger bare når oppdraget krever det.
                </p>

                <H3 id="ikke-lovregulerte-oppdrag">6.3 Oppdrag som ikke er lovregulert</H3>
                <p className="mt-3">
                  Vi utfører også oppdrag som ikke er regulert i revisorloven eller regnskapsførerloven. Det kan være
                  bekreftelser til andre enn offentlige myndigheter, avtalte kontrollhandlinger, granskinger og
                  rådgivning. Trenger vi personopplysninger til slike oppdrag, vurderer vi først om kunden har et
                  berettiget behov. Har kunden ikke det, sier vi nei til oppdraget.
                </p>

                <H3 id="hvitvasking">6.4 Hvitvaskingsloven</H3>
                <p className="mt-3">
                  Hvitvaskingsloven pålegger oss å kontrollere alle kundene våre. Vi bekrefter identiteten til den
                  som handler på vegne av kunden (i revisjon er det daglig leder) og til de reelle
                  rettighetshaverne. Vi registrerer opplysninger om disse personene, også kopi av legitimasjonen som
                  er brukt.
                </p>
                <p className="mt-3">
                  Vi har også plikt til å melde mistanke om hvitvasking og terrorfinansiering til Økokrim. Meldingen
                  skal ta med alt vi vet om forholdet, også om personene som er involvert. De som er involvert, har
                  ikke rett til innsyn i slike meldinger.
                </p>

                <H3 id="kundekontakt">6.5 Kundekontakt og markedsføring</H3>
                <p className="mt-3">
                  Vi registrerer navn, e-postadresse, telefonnummer og stilling for kontaktpersoner hos nåværende,
                  tidligere og mulige kunder. Grunnlaget er vår berettigede interesse i å holde kontakten og
                  markedsføre tjenestene våre (personvernforordningen artikkel 6 nr. 1 bokstav f). Nyhetsbrev sender
                  vi bare med samtykke eller innenfor et kundeforhold, og du kan når som helst melde deg av.
                </p>

                <H3 id="henvendelser">6.6 Henvendelser via flyd.no</H3>
                <p className="mt-3">
                  Sender du oss en henvendelse gjennom{' '}
                  <Link href="/kontakt/" className={lenke}>
                    kontaktskjemaet
                  </Link>
                  , behandler vi navn, bedrift, e-post, telefonnummer og meldingen din. Vi bruker dem bare til å
                  svare deg og følge opp dialogen. Henvendelsene formidles gjennom automatiseringstjenesten Make
                  (make.com), som er vår databehandler og har servere i EU.
                </p>
                <p className="mt-3">
                  Blir du kunde, oppbevarer vi opplysningene etter regnskaps- og bokføringsreglene. Ellers sletter vi
                  dem senest 12 måneder etter siste kontakt.
                </p>

                <H3 id="medarbeidere">6.7 Medarbeidere og jobbsøkere</H3>
                <p className="mt-3">
                  Om ansatte behandler vi blant annet personalia, lønn, evalueringer, opplysninger om pårørende,
                  utdanning og stillingsnivå. Grunnlaget er:
                </p>
                <Liste>
                  <li>arbeidsavtalen (personvernforordningen artikkel 6 nr. 1 bokstav b)</li>
                  <li>
                    plikten til å rapportere til myndigheter som Nav og Skatteetaten (artikkel 6 nr. 1 bokstav c og
                    eventuelt artikkel 9 nr. 2 bokstav b, jf. personopplysningsloven § 6)
                  </li>
                </Liste>
                <p className="mt-3">
                  Opplysningene slettes halvannet år etter at medarbeideren har sluttet. Opplysninger som er en del
                  av regnskapsmateriale vi har plikt til å oppbevare, oppbevares etter bokføringsreglene.
                </p>
                <p className="mt-3">
                  Søker du jobb hos oss, behandler vi opplysningene dine for å vurdere søknaden (artikkel 6 nr. 1
                  bokstav b). Opplysninger om søkere som ikke blir ansatt, oppbevarer vi i inntil ett år.
                </p>
              </Del>

              <Del id="informasjonskapsler">
                <H3>Nødvendige informasjonskapsler</H3>
                <p className="mt-3">
                  Vi bruker tekniske informasjonskapsler som trengs for at sidene skal virke. Dem kan vi bruke uten
                  samtykke.
                </p>

                <H3>Statistikk og annonsemåling – bare med samtykke</H3>
                <p className="mt-3">Godtar du det i samtykkebanneren, bruker vi i tillegg:</p>
                <Liste>
                  <li>
                    Google Analytics og Microsoft Clarity til statistikk om hvordan nettstedet brukes, slik at vi kan
                    gjøre det bedre.
                  </li>
                  <li>
                    Google Ads til å måle om annonsene våre fører til henvendelser (konverteringsmåling), og til å
                    vise annonser til deg som har besøkt flyd.no før (remarketing).
                  </li>
                </Liste>
                <p className="mt-3">
                  Før du har samtykket, lastes ikke skriptene fra Google og Microsoft, og det samles ikke inn noe
                  gjennom dem. Grunnlaget er samtykket ditt, jf. ekomloven og personvernforordningen.
                </p>

                <H3>Klikk-ID fra annonser</H3>
                <p className="mt-3">
                  Kommer du fra en av annonsene våre, følger annonsens klikk-ID med henvendelsen din. Da kan vi
                  senere melde til Google Ads om den førte til et kundeforhold. Vi deler ikke navn, e-post eller
                  innholdet i henvendelsen med Google – bare at et skjema ble sendt, og eventuelt at du ble kunde.
                </p>

                <H3>Hvem som er ansvarlig</H3>
                <p className="mt-3">
                  Google behandler opplysningene fra Google Analytics som vår databehandler. For Google Ads og
                  Microsoft Clarity bruker Google og Microsoft også opplysningene til egne formål, og er da selv
                  behandlingsansvarlige. Hvordan de gjør det, står i{' '}
                  <a href="https://policies.google.com/privacy?hl=no" className={lenke}>
                    Googles personvernerklæring
                  </a>{' '}
                  og{' '}
                  <a href="https://www.microsoft.com/nb-no/privacy/privacystatement" className={lenke}>
                    Microsofts personvernerklæring
                  </a>
                  .
                </p>

                <H3>Samtykket ditt</H3>
                <p className="mt-3">
                  Velger du «Kun nødvendige», samles ingenting inn gjennom disse verktøyene. Du kan når som helst
                  endre eller trekke tilbake samtykket med lenken «<ConsentLink className={lenke} />» nederst på
                  siden. Valget lagres i nettleseren din. Det gjør også en eventuell klikk-ID fra en annonse, som
                  slettes etter 90 dager eller når du trekker samtykket tilbake.
                </p>
              </Del>

              <Del id="sikkerhet">
                <H3>Sikkerhet</H3>
                <p className="mt-3">
                  Vi har rutiner som skal sikre at kundenes data holdes fortrolige og ikke endres. Det omfatter blant
                  annet styring av roller og tilganger, og krav om innebygd personvern i IT-systemene våre.
                </p>
                <p className="mt-3">
                  Sensitive personopplysninger krypteres alltid når de sendes elektronisk til eller fra oss. Det
                  gjelder særlige kategorier personopplysninger, fødselsnummer og opplysninger om straffbare forhold
                  og lovbrudd. Kunder kan be om mer informasjon om informasjonssikkerheten vår.
                </p>

                <H3>Taushetsplikt</H3>
                <p className="mt-3">
                  Vi har taushetsplikt etter revisorloven og regnskapsførerloven om alt vi får vite i virksomheten –
                  både i lovregulerte og andre oppdrag. Unntakene står i{' '}
                  <a href="#lovpalagt-overforing" className={lenke}>
                    punkt 9.2
                  </a>
                  .
                </p>

                <H3 id="oppbevaring">Hvor lenge vi oppbevarer opplysninger</H3>
                <table className="mt-4 w-full border-t border-flyd-linje-sand text-left text-[16px] leading-relaxed">
                  <thead>
                    <tr className="border-b border-flyd-linje-sand">
                      <th scope="col" className="py-3 pr-4 font-semibold text-flyd-skog">
                        Opplysninger
                      </th>
                      <th scope="col" className="py-3 font-semibold text-flyd-skog">
                        Hvor lenge
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {oppbevaring.map((r) => (
                      <tr key={r.hva} className="border-b border-flyd-linje-sand align-top">
                        <td className="py-3 pr-4">{r.hva}</td>
                        <td className="py-3">{r.hvorLenge}</td>
                      </tr>
                    ))}
                    <tr className="border-b border-flyd-linje-sand align-top">
                      <td className="py-3 pr-4">Henvendelser fra nettstedet</td>
                      <td className="py-3">
                        Se{' '}
                        <a href="#henvendelser" className={lenke}>
                          punkt 6.6
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p className="mt-4">
                  Vi sletter opplysningene innen ett år etter at oppbevaringstiden er ute. Vi kan beholde
                  dokumentasjon lenger når vi trenger den for å følge opp et oppdrag forsvarlig eller forsvare oss mot
                  erstatningskrav eller anklager (personvernforordningen artikkel 6 nr. 1 bokstav f).
                </p>
              </Del>

              <Del id="overforing">
                <H3 id="lagring-i-eos">9.1 Lagring i EØS</H3>
                <p className="mt-3">
                  Vi oppbevarer kundedata, også alle personopplysninger, i Norge eller andre EØS-land. Det samme
                  gjelder opplysninger om medarbeidere og jobbsøkere.
                </p>
                <p className="mt-3">
                  Noen ganger må opplysninger overføres til land utenfor EØS – for eksempel når kunden er del av et
                  internasjonalt konsern, eller gjennom verktøyene på nettstedet (
                  <a href="#informasjonskapsler" className={lenke}>
                    punkt 7
                  </a>
                  ). Da skjer overføringen bare på ett av disse grunnlagene:
                </p>
                <Liste>
                  <li>
                    et vedtak fra EU-kommisjonen om at landet har betryggende vern, som EU–US Data Privacy Framework
                    for USA
                  </li>
                  <li>EU-kommisjonens standard personvernbestemmelser</li>
                  <li>bindende virksomhetsregler i et konsern</li>
                </Liste>

                <H3 id="lovpalagt-overforing">9.2 Overføring fordi loven krever det</H3>
                <Liste>
                  <li>Finanstilsynet har tilgang til dokumentasjonen vår når de fører tilsyn.</li>
                  <li>Revisorer og andre som utfører kvalitetskontroll hos oss, har tilgang til dokumentasjonen.</li>
                  <li>
                    Vi melder mistenkelige transaksjoner til Økokrim (se{' '}
                    <a href="#hvitvasking" className={lenke}>
                      punkt 6.4
                    </a>
                    ).
                  </li>
                  <li>Politiet kan i noen tilfeller få tilgang til dokumentasjonen vår.</li>
                  <li>
                    Gjennomføres det bokettersyn hos en kunde, kan vi bli pålagt å gi skattemyndighetene opplysninger
                    som inneholder personopplysninger.
                  </li>
                  <li>
                    Ved gjeldsforhandling eller konkurs kan vi ha plikt til å gi opplysninger til gjeldsnemnd,
                    konkursbo eller bobestyrer.
                  </li>
                  <li>Blir vi innkalt som vitne i en rettssak, har vi alminnelig vitneplikt.</li>
                </Liste>
                <p className="mt-3">Alle som er nevnt her, har lovbestemt taushetsplikt.</p>

                <H3 id="databehandlere">9.3 Databehandlere</H3>
                <p className="mt-3">
                  Vi bruker leverandører til å drifte informasjonssystemene våre, lagre data og formidle henvendelser
                  fra nettstedet. De behandler personopplysninger slik det er beskrevet i{' '}
                  <a href="#opplysninger" className={lenke}>
                    punkt 6
                  </a>{' '}
                  og{' '}
                  <a href="#informasjonskapsler" className={lenke}>
                    7
                  </a>
                  . Vi har databehandleravtale med alle leverandører som behandler personopplysninger på våre vegne.
                </p>
              </Del>

              <Del id="endringer">
                <p className="mt-3">
                  Vi oppdaterer erklæringen når virksomheten eller regelverket endres. Datoen øverst viser når den
                  sist ble endret.
                </p>
              </Del>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
