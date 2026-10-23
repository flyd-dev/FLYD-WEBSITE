import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Container from '@/components/Container';
import Section from '@/components/Section';
import Eyebrow from '@/components/Eyebrow';
import FlydIcon, { type FlydIconName } from '@/components/FlydIcon';
import { UtkastBanner } from '@/components/Bekreft';
import GlassBrett from '@/components/designlab/bakgrunner/GlassBrett';
import PrikkeBolge from '@/components/designlab/bakgrunner/PrikkeBolge';
import Nordlys from '@/components/designlab/bakgrunner/Nordlys';
import { visUtkast } from '@/lib/utkast';

/**
 * Tre bakgrunner for de mørke flatene (/designlab/bakgrunner/) å velge mellom,
 * vist bak et utsnitt av «Hvorfor Flyd» fra forsiden. Bare utkast: finnes ikke i
 * produksjonsbygget, står ikke i sitemap, noindex.
 */
export const metadata: Metadata = {
  title: 'Bakgrunner – varianter · Flyd',
  robots: { index: false, follow: false },
};

const punkter: [FlydIconName, string][] = [
  ['samme-tak', 'Regnskap, revisjon, rådgivning og teknologi'],
  ['sparring', 'Rådgivere som stiller spørsmål – ikke bare leverer tall'],
  ['erp', 'Moderne ERP- og programvarekompetanse'],
  ['automatisering', 'Integrasjoner som reduserer manuelt arbeid'],
  ['lokal', 'Lokal tilstedeværelse med personlig oppfølging'],
];

function Innhold() {
  return (
    <Container className="relative py-24 md:py-32">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Eyebrow tone="dark">Hvorfor Flyd</Eyebrow>
          <h2 className="mt-5 font-display text-display-lg font-semibold text-flyd-sand">Din strategiske sparringspartner.</h2>
          <p className="mt-6 max-w-md text-[17px] leading-[1.65] text-flyd-dempet">
            Flyd kombinerer fagkompetanse med moderne teknologiforståelse. Vi ser tallene, systemene og arbeidsflyten
            under ett.
          </p>
        </div>
        <ul className="border-t border-flyd-sand/15 lg:col-span-7">
          {punkter.map(([ikon, tekst]) => (
            <li key={tekst} className="flex items-center gap-4 border-b border-flyd-sand/15 py-4 text-[16px] text-flyd-sand">
              <FlydIcon name={ikon} className="h-6 w-6 flex-shrink-0 text-flyd-mint" />
              {tekst}
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}

const varianter = [
  {
    id: 'glassbrett',
    navn: 'A – Glassbrett',
    kilde: '«Glass Fold» på 21st.dev',
    tekst: 'Gjennomsiktige glassplater i Flyd-teal, brettet over hverandre, med et svakt lys i brettene. Beveger seg veldig sakte. Mest eksklusiv, minst «nettside-aktig».',
    Bakgrunn: () => <GlassBrett tone="skog" />,
  },
  {
    id: 'prikkebolge',
    navn: 'B – Prikkebølge',
    kilde: '«Shader Dithering» og «Sonar Grid» på 21st.dev',
    tekst: 'En bølge som glir sakte, tegnet med logoens punktum: større og lysere punktum der bølgen er, et lysere bånd langs kammen. «Flyt» laget av punktum – mest eget for Flyd.',
    Bakgrunn: () => <PrikkeBolge />,
  },
  {
    id: 'nordlys',
    navn: 'C – Nordlys',
    kilde: '«Aurora», «Silk shader» og «Mesh Gradient» på 21st.dev',
    tekst: 'Myke lysfelt i teal og Mint som driver sakte over flaten, med et fint korn. Roligst av de tre, og lettest å kjøre på mobil.',
    Bakgrunn: () => <Nordlys />,
  },
] as const;

export default function BakgrunnerPage() {
  if (!visUtkast) notFound();

  return (
    <>
      <UtkastBanner />

      <Section tone="sand" className="pt-12 md:pt-16">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Designlab</Eyebrow>
            <h1 className="mt-5 font-display text-display-xl font-semibold">Tre bakgrunner for de mørke flatene.</h1>
            <p className="mt-8 max-w-2xl font-display text-ingress font-medium text-flyd-skifer">
              Hver vist bak «Hvorfor Flyd» fra forsiden. Den du velger, kommer på alle de mørke flatene i stedet for
              punktumrutenettet.
            </p>
          </div>
        </Container>
      </Section>

      {varianter.map(({ id, navn, kilde, tekst, Bakgrunn }) => (
        <div key={id} id={id}>
          <div className="bg-flyd-sand">
            <Container className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-t border-flyd-linje-sand py-8">
              <div>
                <h2 className="font-display text-[26px] font-semibold">{navn}</h2>
                <p className="mt-2 max-w-2xl text-[16px] leading-relaxed text-flyd-skifer">{tekst}</p>
              </div>
              <p className="text-[14px] text-flyd-skifer">Idé: {kilde}</p>
            </Container>
          </div>
          <section className="on-dark relative overflow-hidden bg-flyd-skog text-flyd-sand">
            <Bakgrunn />
            <Innhold />
          </section>
        </div>
      ))}
    </>
  );
}
