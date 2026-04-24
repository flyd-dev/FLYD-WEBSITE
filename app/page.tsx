import Link from 'next/link';
import { Cloud, Layers, Plug, Sparkles } from 'lucide-react';
import Container from '@/components/Container';
import Section from '@/components/Section';
import Eyebrow from '@/components/Eyebrow';
import FullflydMark from '@/components/FullflydMark';
import LogoMarquee from '@/components/LogoMarquee';
import PartnerStrip from '@/components/PartnerStrip';
import HeroMosaic from '@/components/HeroMosaic';
import StatsSection from '@/components/StatsSection';
import { ButtonLink } from '@/components/Button';
import { Typewriter } from '@/components/ui/typewriter';
import { HandWrittenCircle } from '@/components/ui/hand-writing-text';
import ColorChangeCards from '@/components/ui/color-change-card';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import RuixenCard, { type RuixenCardTone } from '@/components/ui/ruixen-card-01';
import WhyFlydList from '@/components/WhyFlydList';
import { services, erpSystems } from '@/data/services';

const serviceTones: RuixenCardTone[] = ['teal', 'dark', 'ink', 'teal', 'dark', 'ink'];

const erpIcons: Record<string, typeof Cloud> = {
  tripletex: Cloud,
  visma: Layers,
  unimicro: Plug,
  poweroffice: Sparkles,
};

const stats = [
  { value: '670+', label: 'Kunder' },
  { value: '6', label: 'Kontorer' },
  { value: '19', label: 'Medarbeidere' },
  { value: '8', label: 'Statsautoriserte regnskapsførere' },
];

const whyFlyd = [
  'Regnskap, rådgivning og teknologi under samme tak',
  'Strategisk sparringspartner – ikke bare leverandør',
  'Moderne ERP- og programvarekompetanse',
  'Integrasjoner som reduserer manuelt arbeid',
  'Lokal tilstedeværelse med personlig oppfølging',
  'Innsikt og analyse som gir bedre beslutninger',
];

const process = [
  {
    n: '01',
    title: 'Dialog',
    body:
      'Vi starter med en uforpliktende samtale. Blir kjent med bedriften, systemene og hvor dere vil – og hvor skoen trykker i dag.',
    imgSrc: '/process-bg/dialog.webp',
  },
  {
    n: '02',
    title: 'Plan',
    body:
      'Vi designer en løsning tilpasset virksomheten: riktig ERP, integrasjoner, arbeidsflyt og hvem som gjør hva.',
    imgSrc: '/process-bg/plan.webp',
  },
  {
    n: '03',
    title: 'I drift',
    body:
      'Vi tar hånd om regnskap, lønn og rapportering. Dere får oppdaterte tall og en fast rådgiver å støtte dere på.',
    imgSrc: '/process-bg/drift.webp',
  },
  {
    n: '04',
    title: 'Videreutvikling',
    body:
      'Vi følger med, justerer og foreslår forbedringer. Systemet skal vokse med bedriften – ikke bremse den.',
    imgSrc: '/process-bg/videreutvikling.webp',
  },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <Section
        tone="paper"
        className="overflow-hidden relative min-h-[100vh] lg:h-[100vh]"
      >
        <Container className="relative w-full h-full">
          <div className="grid h-full w-full grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12 lg:auto-rows-fr">
            <div
              className="lg:col-span-8 lg:flex lg:flex-col lg:justify-center"
              data-reveal
            >
              <Eyebrow tone="teal">Kompetansehus for økonomi og teknologi</Eyebrow>
              <h1 className="mt-6 font-display text-display-xl font-semibold">
                Økonomi og teknologi
                <span className="mt-3 block whitespace-nowrap text-2xl leading-[1.15] sm:text-3xl md:text-4xl lg:text-5xl xl:text-display-lg">
                  <span className="text-flyd-ink">– </span>
                  <Typewriter
                    text={[
                      'full flyd.',
                      'god kontroll.',
                      'full oversikt.',
                      'trygg vekst.',
                    ]}
                    speed={70}
                    waitTime={1800}
                    deleteSpeed={40}
                    className="text-flyd-teal"
                    cursorClassName="ml-1 text-flyd-teal font-light"
                  />
                </span>
              </h1>
              <p className="mt-8 max-w-2xl text-[18px] font-normal leading-[1.7] text-flyd-ink/75">
                Flyd er et kompetansehus som hjelper bedrifter med hele bildet.
                Fra daglig regnskap til ERP og integrasjoner – én partner, ett
                nummer, full flyd.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-6">
                <HandWrittenCircle strokeClassName="text-flyd-teal-dark opacity-90">
                  <ButtonLink href="/kontakt" variant="primary" withArrow>
                    Snakk med oss
                  </ButtonLink>
                </HandWrittenCircle>
                <ButtonLink href="/tjenester" variant="outline">
                  Se våre tjenester
                </ButtonLink>
              </div>
            </div>

            <div
              className="relative lg:col-span-4 hidden lg:block overflow-hidden min-h-0"
              data-reveal
            >
              <HeroMosaic />
            </div>
          </div>
        </Container>
      </Section>

      {/* STATS */}
      <Section tone="teal" size="sm" className="!py-10 md:!py-14">
        <Container>
          <div className="mb-7 md:mb-9 max-w-3xl" data-reveal>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold leading-[1.15] tracking-[-0.02em]">
              Kontroll i dag.
              <br />
              <span className="text-flyd-teal-dark">Innsikt for i morgen.</span>
            </h2>
          </div>
          <StatsSection stats={stats} />
        </Container>
      </Section>

      {/* CUSTOMER LOGOS */}
      <Section tone="paper" size="sm">
        <Container>
          <div className="mb-10 flex items-center justify-between gap-6">
            <Eyebrow>Et utvalg kunder</Eyebrow>
            <Link
              href="/kontakt"
              className="text-[13px] uppercase tracking-[0.2em] text-flyd-ink/60 transition-colors hover:text-flyd-accent"
            >
              Bli kunde →
            </Link>
          </div>
        </Container>
        <LogoMarquee />
      </Section>

      {/* SERVICES */}
      <Section tone="teal-soft" id="tjenester">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div className="lg:col-span-5" data-reveal>
              <Eyebrow>Tjenester</Eyebrow>
              <h2 className="mt-5 font-display text-display-lg font-semibold">
                Alt du trenger — <br />
                i ett hus.
              </h2>
              <p className="mt-6 max-w-md text-[16px] text-flyd-ink/75 leading-[1.75]">
                Vi kombinerer regnskap, rådgivning og teknologi for å gi deg bedre
                kontroll, mer effektive prosesser og et sterkere beslutningsgrunnlag.
              </p>
              <div className="mt-8">
                <ButtonLink href="/tjenester" variant="outline" withArrow>
                  Utforsk alle tjenester
                </ButtonLink>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                {services.map((s, i) => (
                  <div key={s.id} data-reveal>
                    <RuixenCard
                      title={s.title}
                      subtitle={s.short}
                      icon={s.icon}
                      tone={serviceTones[i % serviceTones.length]}
                      href={`/tjenester#${s.id}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* WHY FLYD (dark) */}
      <Section tone="ink">
        <Container>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
            <div className="lg:col-span-5" data-reveal>
              <Eyebrow tone="paper">Hvorfor Flyd</Eyebrow>
              <h2 className="mt-5 font-display text-display-lg font-semibold">
                Din strategiske
                <br />
                <span className="text-flyd-teal">sparringspartner.</span>
              </h2>
              <p className="mt-8 max-w-md text-[17px] leading-[1.75] text-flyd-paper/75">
                Flyd kombinerer fagkompetanse med moderne teknologiforståelse. Vi
                er ikke et tradisjonelt regnskapsbyrå — vi er et kompetansehus som
                hjelper bedrifter med å se hele bildet.
              </p>
            </div>

            <WhyFlydList items={whyFlyd} />
          </div>
        </Container>
      </Section>

      {/* ERP SYSTEMS */}
      <Section tone="paper">
        <Container>
          <div className="max-w-3xl" data-reveal>
            <Eyebrow>Programvare</Eyebrow>
            <h2 className="mt-5 font-display text-display-lg font-semibold">
              Riktig system for din virksomhet.
            </h2>
            <p className="mt-6 text-[16px] text-flyd-ink/75 leading-[1.75]">
              Vi hjelper deg å velge, implementere og utnytte forretningssystemet
              som passer bedriften – ikke det vi tilfeldigvis selger.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-5 md:gap-6 sm:grid-cols-2">
            {erpSystems.map((e) => {
              const Icon = erpIcons[e.id] ?? Cloud;
              return (
                <SpotlightCard
                  key={e.id}
                  spotlightColor="rgba(76, 142, 147, 0.55)"
                  className="group border border-flyd-ink/10 bg-flyd-paper p-8 md:p-10 transition-[border-color,transform,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:border-flyd-teal-dark/30 hover:shadow-subtle"
                >
                  <div data-reveal>
                    <div className="flex items-start justify-between gap-6">
                      <div className="flex items-center gap-4">
                        <span className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center border border-flyd-teal-dark/25 bg-flyd-teal/10 text-flyd-teal-dark transition-colors duration-300 group-hover:bg-flyd-teal/20 group-hover:text-flyd-teal-dark">
                          <Icon className="h-5 w-5" strokeWidth={1.75} />
                        </span>
                        <h3 className="font-display text-2xl font-semibold leading-none">
                          {e.name}
                        </h3>
                      </div>
                      <span className="hidden text-[11px] uppercase tracking-[0.22em] text-flyd-teal-dark md:inline whitespace-nowrap pt-3">
                        {e.tagline}
                      </span>
                    </div>
                    <span className="mt-4 inline-block text-[11px] uppercase tracking-[0.22em] text-flyd-teal-dark md:hidden">
                      {e.tagline}
                    </span>
                    <p className="mt-6 text-[15px] text-flyd-ink/75 leading-relaxed">
                      {e.description}
                    </p>
                  </div>
                </SpotlightCard>
              );
            })}
          </div>

          <div className="mt-10 flex justify-end" data-reveal>
            <Link
              href="/tjenester#nettsider"
              className="group inline-flex items-center gap-2 text-[13px] uppercase tracking-[0.2em] text-flyd-ink/60 transition-colors hover:text-flyd-accent"
            >
              Trenger du en nettside eller digital flate som snakker med systemet?
              <span
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              >
                →
              </span>
            </Link>
          </div>
        </Container>
      </Section>

      {/* SLIK JOBBER VI */}
      <Section tone="teal-soft">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5" data-reveal>
              <Eyebrow>Slik jobber vi</Eyebrow>
              <h2 className="mt-5 font-display text-display-lg font-semibold">
                Fra første samtale
                <br />
                <span className="text-flyd-teal-dark">til full flyd.</span>
              </h2>
              <p className="mt-6 max-w-md text-[16px] text-flyd-ink/75 leading-[1.75]">
                Vi tror på tydelige forventninger og kort vei fra plan til
                handling. Her er hvordan et samarbeid med Flyd vanligvis ser ut.
              </p>
              <div className="mt-8">
                <ButtonLink href="/kontakt" variant="outline" withArrow>
                  Ta første steg
                </ButtonLink>
              </div>
            </div>

            <div className="lg:col-span-7" data-reveal>
              <ColorChangeCards steps={process} />
            </div>
          </div>
        </Container>
      </Section>

      {/* PARTNERS */}
      <Section tone="paper" size="sm" className="!py-14 md:!py-16">
        <Container>
          <div className="mb-8 flex items-center justify-center md:mb-10" data-reveal>
            <Eyebrow>Våre partnere</Eyebrow>
          </div>
          <PartnerStrip />
        </Container>
      </Section>

      {/* CLOSING CTA */}
      <Section tone="ink" size="lg" className="overflow-hidden">
        <div
          className="pointer-events-none absolute inset-x-0 bottom-[-8%] flex justify-center opacity-10"
          aria-hidden="true"
        >
          <FullflydMark
            variant="paper"
            className="text-[22rem] md:text-[32rem] leading-none"
          />
        </div>
        <Container className="relative">
          <div className="max-w-3xl" data-reveal>
            <Eyebrow tone="paper">Kontakt</Eyebrow>
            <h2 className="mt-5 font-display text-display-xl font-semibold">
              La oss ta en prat.
            </h2>
            <p className="mt-8 max-w-xl text-[18px] leading-[1.75] text-flyd-paper/80">
              Fortell oss om virksomheten din — så finner vi ut hvordan vi kan
              hjelpe.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <ButtonLink href="/kontakt" variant="teal" withArrow accent>
                Send melding
              </ButtonLink>
              <ButtonLink href="tel:+4748019958" variant="outline-paper">
                Ring oss
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
