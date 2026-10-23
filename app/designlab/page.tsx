import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Container from '@/components/Container';
import Section from '@/components/Section';
import Eyebrow from '@/components/Eyebrow';
import Footer from '@/components/Footer';
import Bekreft, { UtkastBanner } from '@/components/Bekreft';
import { TextLink } from '@/components/Button';
import KundeHistorier, { type Kundehistorie } from '@/components/designlab/KundeHistorier';
import SystemBane from '@/components/designlab/SystemBane';
import KontorAkkordeon from '@/components/designlab/KontorAkkordeon';
import LogoFlyt from '@/components/designlab/LogoFlyt';
import { visUtkast } from '@/lib/utkast';

/**
 * Designlab (/designlab/): forslag fra 21st.dev, tegnet om etter
 * designmanualen. Bare utkast – siden finnes ikke i produksjonsbygget
 * (visUtkast), står ikke i sitemap og har noindex. Ingen av komponentene her
 * er tatt i bruk på de ekte sidene.
 */
export const metadata: Metadata = {
  title: 'Designlab · Flyd',
  robots: { index: false, follow: false },
};

// EKSEMPLER. Tallene og sitatene er ikke ekte og må byttes med godkjente
// kundesitater før noe av dette publiseres.
const historier: Kundehistorie[] = [
  {
    kunde: 'Lervig',
    tall: '3 dager',
    tallTekst: 'raskere månedsavslutning',
    tallNote: 'Etter automatisk bankavstemming i ERP-systemet',
    sitat: 'Før brukte vi første uka i måneden på å jage bilag. Nå har vi tallene klare før vi rekker å spørre etter dem.',
    navn: 'Navn Navnesen',
    rolle: 'Økonomisjef',
    href: '/kontakt',
  },
  {
    kunde: 'Driftig',
    tall: '−40 %',
    tallTekst: 'mindre manuell registrering',
    tallNote: 'Integrasjon mellom fagsystemet og regnskapet',
    sitat: 'Ordrene går rett inn i regnskapet. Vi taster ikke det samme to ganger lenger, og feilene forsvant med det.',
    navn: 'Navn Navnesen',
    rolle: 'Daglig leder',
  },
  {
    kunde: 'Sirdal Fjellpark',
    tall: 'Hver uke',
    tallTekst: 'oppdatert oversikt over sesongen',
    tallNote: 'Dashboard i Power BI',
    sitat: 'Vi ser belegg, salg og kostnader samlet. Det gjør det mye lettere å ta beslutninger midt i sesongen.',
    navn: 'Navn Navnesen',
    rolle: 'Daglig leder',
  },
  {
    kunde: 'Pizzabakeren',
    tall: '12 t',
    tallTekst: 'spart i måneden på lønn',
    tallNote: 'Timer fra kassen rett inn i lønnskjøringen',
    sitat: 'Lønna går av seg selv nå. Vi får spørsmål fra Flyd når noe ser rart ut, ikke etter at det har gått galt.',
    navn: 'Navn Navnesen',
    rolle: 'Franchisetaker',
  },
  {
    kunde: 'Bilstad Bygg',
    tall: '1',
    tallTekst: 'fast kontaktperson',
    tallNote: 'For regnskap, lønn og systemspørsmål',
    sitat: 'Vi ringer samme person enten det gjelder et bilag eller et prosjekt i systemet. Det sparer oss for mye fram og tilbake.',
    navn: 'Navn Navnesen',
    rolle: 'Daglig leder',
  },
  {
    kunde: 'Årring',
    tall: '2 uker',
    tallTekst: 'fra første samtale til nytt system',
    tallNote: 'Overgang til nytt ERP med historikk',
    sitat: 'Vi trodde bytte av system skulle bli et prosjekt over flere måneder. Det ble to uker, og ingenting forsvant på veien.',
    navn: 'Navn Navnesen',
    rolle: 'Daglig leder',
  },
];

function Forslag({ n, kilde, plass }: { n: number; kilde: string; plass: string }) {
  return (
    <p className="mb-8 inline-flex flex-wrap items-center gap-x-3 gap-y-1 rounded-flis bg-flyd-skog px-4 py-2 text-[13px] text-flyd-sand sm:rounded-pille">
      <span className="font-bold uppercase tracking-[0.12em] text-flyd-korall">Forslag {n}</span>
      <span>Fra 21st.dev: {kilde}</span>
      <span className="text-flyd-dempet">· {plass}</span>
    </p>
  );
}

export default function DesignlabPage() {
  if (!visUtkast) notFound();

  return (
    <>
      <UtkastBanner />

      <Section tone="sand" className="pt-12 md:pt-16" flyt>
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Designlab</Eyebrow>
            <h1 className="mt-5 font-display text-display-xl font-semibold">Forslag fra 21st.dev, tegnet om til Flyd.</h1>
            <p className="mt-8 max-w-2xl font-display text-ingress font-medium text-flyd-skifer">
              Fem komponenter som kan løfte designet. Alle følger designmanualen: bare Flyd-paletten, ingen skygger,
              ingen blur, og bevegelse som står stille ved redusert bevegelse. Ingenting her er tatt i bruk på de ekte
              sidene ennå.
            </p>
          </div>
        </Container>
      </Section>

      {/* 1 – Kundehistorier */}
      <Section tone="sand" className="!pt-0">
        <Container>
          <Forslag n={1} kilde="«Logo Cloud Story Tabs»" plass="Forsiden, i stedet for logostripa" />
          <div className="max-w-3xl">
            <Eyebrow>Kundehistorier</Eyebrow>
            <h2 className="mt-5 font-display text-display-lg font-semibold">Hva som endret seg, med kundenes egne ord.</h2>
          </div>
          <Bekreft className="mt-8 max-w-3xl">
            Tallene, sitatene og navnene er eksempler. De må byttes med ekte, godkjente kundesitater før publisering.
          </Bekreft>
          <div className="mt-10">
            <KundeHistorier historier={historier} />
          </div>
        </Container>
      </Section>

      {/* 2 – Systembane */}
      <Section tone="lysmint">
        <Container>
          <Forslag n={2} kilde="«Integrations Orbit Section»" plass="Forsiden (Programvare) og /tjenester/integrasjoner/" />
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-4">
              <Eyebrow>Integrasjoner</Eyebrow>
              <h2 className="mt-5 font-display text-display-lg font-semibold">Systemene dine, koblet sammen.</h2>
              <p className="mt-6 text-[17px] leading-[1.65] text-flyd-skifer">
                Vi kobler ERP, nettbutikk, lønnssystem, CRM og bransjeløsninger, slik at dataene flyter dit de skal –
                automatisk, korrekt og etterprøvbart.
              </p>
              <div className="mt-8">
                <TextLink href="/tjenester/integrasjoner/">Les om integrasjoner</TextLink>
              </div>
            </div>
            <div className="lg:col-span-8">
              <SystemBane />
            </div>
          </div>
        </Container>
      </Section>

      {/* 3 – Kontorene */}
      <Section tone="sand">
        <Container>
          <Forslag n={3} kilde="«Interactive Image Accordion» / «Hover Expand»" plass="/kontor/ og forsiden" />
          <div className="max-w-3xl">
            <Eyebrow>Kontorer</Eyebrow>
            <h2 className="mt-5 font-display text-display-lg font-semibold">Seks kontorer. Ett nummer.</h2>
          </div>
          <KontorAkkordeon className="mt-12" />
        </Container>
      </Section>

      {/* 4 – Logoer langs flytlinjen */}
      <Section tone="lysmint">
        <Container>
          <Forslag n={4} kilde="«Marquee Along SVG Path»" plass="Forsiden, som alternativ til logostripa" />
          <div className="max-w-3xl">
            <Eyebrow>Et utvalg kunder</Eyebrow>
            <h2 className="mt-5 font-display text-display-lg font-semibold">670+ bedrifter i full flyd.</h2>
          </div>
        </Container>
        <div className="mt-10">
          <LogoFlyt />
        </div>
      </Section>

      {/* 5 – Footer med ordmerke */}
      <Section tone="sand" size="sm">
        <Container>
          <Forslag n={5} kilde="«Giant Wordmark Footer»" plass="Footer på alle sider" />
          <p className="max-w-2xl text-[17px] leading-[1.65] text-flyd-skifer">
            Footeren under er den ekte, med logoen i full bredde som avslutning. Den vanlige footeren følger helt nederst
            på siden, til sammenligning.
          </p>
        </Container>
      </Section>
      <Footer ordmerke />
    </>
  );
}
