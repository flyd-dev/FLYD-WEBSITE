import Image from 'next/image';
import { Cloud, Layers, Plug, Sparkles } from 'lucide-react';
import Container from '@/components/Container';
import Section from '@/components/Section';
import Eyebrow from '@/components/Eyebrow';
import LogoMarquee from '@/components/LogoMarquee';
import PartnerStrip from '@/components/PartnerStrip';
import StatsSection from '@/components/StatsSection';
import ServiceCard from '@/components/ServiceCard';
import NumberedList from '@/components/NumberedList';
import ProcessCards, { type ProcessStep } from '@/components/ProcessCards';
import ClosingCta from '@/components/ClosingCta';
import { ButtonLink, TextLink } from '@/components/Button';
import { Typewriter } from '@/components/ui/typewriter';
import type { ServiceTone } from '@/components/ServiceIcon';
import { services, erpSystems } from '@/data/services';
import { stats } from '@/data/stats';

const serviceTones: ServiceTone[] = ['petrol', 'teal', 'skog'];

const erpIcons: Record<string, typeof Cloud> = {
  tripletex: Cloud,
  visma: Layers,
  unimicro: Plug,
  poweroffice: Sparkles,
};

const whyFlyd = [
  'Regnskap, rådgivning og teknologi under samme tak',
  'Strategisk sparringspartner – ikke bare leverandør',
  'Moderne ERP- og programvarekompetanse',
  'Integrasjoner som reduserer manuelt arbeid',
  'Lokal tilstedeværelse med personlig oppfølging',
  'Innsikt og analyse som gir bedre beslutninger',
];

const process: ProcessStep[] = [
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
    imgSrc: '/header/office-4.webp',
  },
];

export default function HomePage() {
  return (
    <>
      {/* HERO – forsiden er Skog + foto med overlay (designmanualen kap. 07/08).
          Bildet står i et kort med radius 24 px, siden det ikke er utfallende. */}
      <Section tone="sand" className="!pb-0 !pt-0 md:!pt-1">
        <div className="px-3 md:px-5">
          <div className="on-dark relative flex min-h-[640px] overflow-hidden rounded-bilde bg-flyd-skog text-flyd-sand lg:min-h-[min(calc(100vh-112px),820px)]">
            <Image
              src="/process-bg/videreutvikling.webp"
              alt="Flyd-teamet i en uformell prat på kontoret"
              fill
              priority
              sizes="100vw"
              className="object-cover object-[70%_center]"
            />
            <div className="overlay-skog-bunn absolute inset-0 lg:hidden" aria-hidden="true" />
            <div className="overlay-skog absolute inset-0 hidden lg:block" aria-hidden="true" />

            <Container className="relative flex items-end pb-12 pt-40 md:pb-16 lg:items-center lg:py-24">
              <div className="max-w-2xl" data-reveal>
                <Eyebrow tone="dark">Kompetansehus for økonomi og teknologi</Eyebrow>
                <h1 className="mt-6 font-display text-display-xl font-semibold text-flyd-sand">
                  Økonomi og teknologi
                  <span className="mt-2 block whitespace-nowrap text-[0.78em] sm:text-[1em]">
                    <span>– </span>
                    <Typewriter
                      text={['full flyd.', 'god kontroll.', 'full oversikt.', 'trygg vekst.']}
                      speed={70}
                      waitTime={1800}
                      deleteSpeed={40}
                      className="text-flyd-mint"
                      cursorClassName="ml-1 text-flyd-mint"
                    />
                  </span>
                </h1>
                <p className="mt-8 max-w-xl font-display text-ingress font-medium text-flyd-dempet">
                  Flyd er et kompetansehus som hjelper bedrifter med hele bildet.
                  Fra daglig regnskap til ERP og integrasjoner – én partner, ett
                  nummer, full flyd.
                </p>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <ButtonLink href="/kontakt" variant="primary-dark" withArrow>
                    Snakk med oss
                  </ButtonLink>
                  <ButtonLink href="/tjenester" variant="secondary-dark">
                    Se våre tjenester
                  </ButtonLink>
                </div>
              </div>
            </Container>
          </div>
        </div>
      </Section>

      {/* NØKKELTALL + KUNDER */}
      <Section tone="sand">
        <Container>
          <div className="max-w-3xl" data-reveal>
            <Eyebrow>Flyd i tall</Eyebrow>
            <h2 className="mt-5 font-display text-display-lg font-semibold">
              Kontroll i dag.
              <br />
              Innsikt for i morgen.
            </h2>
          </div>
          <div className="mt-12 md:mt-14">
            <StatsSection stats={stats} />
          </div>

          <div className="mt-20 flex items-center justify-between gap-6 border-t border-flyd-linje-sand pt-10 md:mt-24">
            <Eyebrow>Et utvalg kunder</Eyebrow>
            <TextLink href="/kontakt">Bli kunde</TextLink>
          </div>
        </Container>
        <div className="mt-8">
          <LogoMarquee />
        </div>
      </Section>

      {/* TJENESTER */}
      <Section tone="lysmint" id="tjenester">
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between" data-reveal>
            <div className="max-w-2xl">
              <Eyebrow>Tjenester</Eyebrow>
              <h2 className="mt-5 font-display text-display-lg font-semibold">
                Alt du trenger – i ett hus.
              </h2>
              <p className="mt-6 max-w-xl text-[17px] leading-[1.65] text-flyd-skifer">
                Vi kombinerer regnskap, rådgivning og teknologi for å gi deg bedre
                kontroll, mer effektive prosesser og et sterkere beslutningsgrunnlag.
              </p>
            </div>
            <TextLink href="/tjenester" className="lg:mb-2">
              Utforsk alle tjenester
            </TextLink>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
            {services.map((s, i) => (
              <div key={s.id} data-reveal className="h-full">
                <ServiceCard
                  title={s.title}
                  text={s.short}
                  icon={s.icon}
                  tone={serviceTones[i % serviceTones.length]}
                  href={`/tjenester#${s.id}`}
                />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* HVORFOR FLYD – Petrol som seksjonsskille */}
      <Section tone="petrol">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5" data-reveal>
              <Eyebrow tone="petrol">Hvorfor Flyd</Eyebrow>
              <h2 className="mt-5 font-display text-display-lg font-semibold text-flyd-sand">
                Din strategiske sparringspartner.
              </h2>
              <p className="mt-6 max-w-md text-[17px] leading-[1.65] text-flyd-dempet">
                Flyd kombinerer fagkompetanse med moderne teknologiforståelse. Vi
                er ikke et tradisjonelt regnskapsbyrå – vi er et kompetansehus som
                hjelper bedrifter med å se hele bildet.
              </p>
            </div>
            <div className="lg:col-span-7">
              <NumberedList items={whyFlyd} tone="dark" />
            </div>
          </div>
        </Container>
      </Section>

      {/* PROGRAMVARE */}
      <Section tone="sand">
        <Container>
          <div className="max-w-3xl" data-reveal>
            <Eyebrow>Programvare</Eyebrow>
            <h2 className="mt-5 font-display text-display-lg font-semibold">
              Riktig system for din virksomhet.
            </h2>
            <p className="mt-6 text-[17px] leading-[1.65] text-flyd-skifer">
              Vi hjelper deg å velge, implementere og utnytte forretningssystemet
              som passer bedriften – ikke det vi tilfeldigvis selger.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5">
            {erpSystems.map((e) => {
              const Icon = erpIcons[e.id] ?? Cloud;
              return (
                <div key={e.id} data-reveal className="rounded-kort bg-flyd-lysmint p-7 md:p-8">
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-flis bg-flyd-sand text-flyd-teal">
                      <Icon className="h-6 w-6" strokeWidth={2} aria-hidden="true" />
                    </span>
                    <h3 className="font-display text-[24px] font-semibold leading-tight">
                      {e.name}
                    </h3>
                  </div>
                  <span className="mt-5 inline-flex rounded-pille border border-flyd-teal px-3 py-1.5 text-[11px] font-bold uppercase leading-none tracking-[0.12em] text-flyd-petrol">
                    {e.tagline}
                  </span>
                  <p className="mt-4 text-[16px] leading-[1.6] text-flyd-skifer">
                    {e.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-10" data-reveal>
            <TextLink href="/tjenester#nettsider">
              Trenger du en nettside eller digital flate som snakker med systemet?
            </TextLink>
          </div>
        </Container>
      </Section>

      {/* SLIK JOBBER VI */}
      <Section tone="lysmint">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4" data-reveal>
              <Eyebrow>Slik jobber vi</Eyebrow>
              <h2 className="mt-5 font-display text-display-lg font-semibold">
                Fra første samtale til full flyd.
              </h2>
              <p className="mt-6 max-w-md text-[17px] leading-[1.65] text-flyd-skifer">
                Vi tror på tydelige forventninger og kort vei fra plan til
                handling. Her er hvordan et samarbeid med Flyd vanligvis ser ut.
              </p>
              <div className="mt-8">
                <ButtonLink href="/kontakt" variant="secondary" withArrow>
                  Ta første steg
                </ButtonLink>
              </div>
            </div>

            <div className="lg:col-span-8" data-reveal>
              <ProcessCards steps={process} />
            </div>
          </div>
        </Container>
      </Section>

      {/* PARTNERE */}
      <Section tone="sand" size="sm">
        <Container>
          <div className="mb-8 md:mb-10" data-reveal>
            <Eyebrow>Våre partnere</Eyebrow>
          </div>
          <PartnerStrip />
        </Container>
      </Section>

      <ClosingCta
        kicker="Kontakt"
        title="La oss ta en prat."
        text="Fortell oss om virksomheten din – så finner vi ut hvordan vi kan hjelpe."
      />
    </>
  );
}
