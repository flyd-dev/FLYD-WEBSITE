import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Container from '@/components/Container';
import Section from '@/components/Section';
import Eyebrow from '@/components/Eyebrow';
import Link from 'next/link';
import Bekreft, { UtkastBanner } from '@/components/Bekreft';
import { TextLink } from '@/components/Button';
import KundeHistorier from '@/components/designlab/KundeHistorier';
import SystemBane from '@/components/designlab/SystemBane';
import KontorAkkordeon from '@/components/designlab/KontorAkkordeon';
import LogoFlyt from '@/components/designlab/LogoFlyt';
import { kundehistorier } from '@/data/kundehistorier';
import { visUtkast } from '@/lib/utkast';

/**
 * Designlab (/designlab/): forslag fra 21st.dev, tegnet om etter
 * designmanualen. Bare utkast – siden finnes ikke i produksjonsbygget
 * (visUtkast), står ikke i sitemap og har noindex. Forslagene er også lagt
 * inn på de ekte sidene bak visUtkast, så forhåndsvisningen viser dem der de
 * hører hjemme, mens produksjon har dagens versjon.
 */
export const metadata: Metadata = {
  title: 'Designlab · Flyd',
  robots: { index: false, follow: false },
};

const plasser = [
  { href: '/', side: 'Forsiden', hva: '– heltebildet vokser til full bredde, kundehistorier, systembanen og «Slik jobber vi» med faste bilder' },
  { href: '/?kunder=flyt', side: 'Forsiden med ?kunder=flyt', hva: '– logoene langs flytlinjen i stedet for kundehistoriene' },
  { href: '/om-flyd/', side: '/om-flyd/', hva: '– bilder som zoomer ut av hverandre, budskap som avdekkes ord for ord og kontorflatene nederst' },
  { href: '/tjenester/integrasjoner/', side: '/tjenester/integrasjoner/', hva: '– systembanen øverst' },
  { href: '/tjenester/regnskap/', side: 'Tjenestesidene', hva: '– «Slik jobber vi» med scroll-steg (alle seks)' },
  { href: '/kontor/', side: '/kontor/', hva: '– kontorflatene under toppen' },
  { href: '/kontor/stavanger-sandnes/', side: 'Kontorsidene', hva: '– bildene åpner seg ved hover, og «Slik kommer du i gang» som tidslinje' },
  { href: '/bytte-regnskapsforer/', side: '/bytte-regnskapsforer/', hva: '– de fire stegene som tidslinje' },
  { href: '/bytte-revisor/', side: '/bytte-revisor/', hva: '– stegene som tidslinje' },
  { href: '/karriere/', side: '/karriere/', hva: '– «Seks grunner» som bildeflater i stedet for karusellen' },
  { href: '/artikler/', side: '/artikler/', hva: '– den nyeste artikkelen fremhevet i full bredde' },
  { href: '#footer', side: 'Alle sider', hva: '– nedtrekksmeny under «Tjenester» i menyen og stor logo nederst i footeren' },
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
              Ni komponenter som kan løfte designet. De fem første står under; de fire med scrolleffekter ser du best på sidene selv. Alle følger designmanualen: bare Flyd-paletten, ingen skygger,
              ingen blur, og bevegelse som står stille ved redusert bevegelse.
            </p>
            <p className="mt-8 text-[17px] leading-[1.65] text-flyd-skifer">
              På forhåndsvisningen er forslagene også lagt inn der de hører hjemme. Sammenlign med samme side på
              flyd.no, som ikke er endret:
            </p>
            <ul className="mt-4 grid gap-2 text-[17px] text-flyd-skog">
              {plasser.map((p) => (
                <li key={p.href} className="flex flex-wrap gap-x-2">
                  <Link href={p.href} className="font-medium text-flyd-petrol underline decoration-flyd-teal decoration-2 underline-offset-[6px] hover:decoration-flyd-korall">
                    {p.side}
                  </Link>
                  <span className="text-flyd-skifer">{p.hva}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* 1 – Kundehistorier */}
      <Section tone="sand" className="!pt-0">
        <Container>
          <Forslag n={1} kilde="«Logo Cloud Story Tabs»" plass="Forsiden, under nøkkeltallene" />
          <div className="max-w-3xl">
            <Eyebrow>Kundehistorier</Eyebrow>
            <h2 className="mt-5 font-display text-display-lg font-semibold">Hva som endret seg, med kundenes egne ord.</h2>
          </div>
          <Bekreft className="mt-8 max-w-3xl">
            Tallene, sitatene og navnene er eksempler. De må byttes med ekte, godkjente kundesitater før publisering.
          </Bekreft>
          <div className="mt-10">
            <KundeHistorier historier={kundehistorier} />
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
          <Forslag n={3} kilde="«Interactive Image Accordion» / «Hover Expand»" plass="/om-flyd/, i stedet for kontorkortene" />
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
          <Forslag n={4} kilde="«Marquee Along SVG Path»" plass="Forsiden med ?kunder=flyt" />
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
      <Section tone="sand" size="sm" id="footer">
        <Container>
          <Forslag n={5} kilde="«Giant Wordmark Footer»" plass="Footer på alle sider" />
          <p className="max-w-2xl text-[17px] leading-[1.65] text-flyd-skifer">
            Footeren under har logoen i full bredde som avslutning. På forhåndsvisningen gjelder det alle sider.
          </p>
        </Container>
      </Section>
    </>
  );
}
