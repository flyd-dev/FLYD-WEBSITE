import Container from '@/components/Container';
import Section from '@/components/Section';
import Eyebrow from '@/components/Eyebrow';
import LogoMarquee from '@/components/LogoMarquee';
import PartnerStrip from '@/components/PartnerStrip';
import StatsSection from '@/components/StatsSection';
import ServiceCard from '@/components/ServiceCard';
import NumberedList from '@/components/NumberedList';
import ProcessCards from '@/components/ProcessCards';
import { process } from '@/data/process';
import ClosingCta from '@/components/ClosingCta';
import { ButtonLink, TextLink } from '@/components/Button';
import { HeroTypewriter, HeroTypewriterPause } from '@/components/HeroTypewriter';
import { type FlydIconName } from '@/components/FlydIcon';
import SystemBane from '@/components/SystemBane';
import UtvidendeHero from '@/components/UtvidendeHero';
import ForhandslastBilde from '@/components/ForhandslastBilde';
import { kombinerbareTjenester, uavhengigeTjenester, serviceUrl } from '@/data/services';
import { stats } from '@/data/stats';

const whyFlyd: { icon: FlydIconName; text: string }[] = [
  { icon: 'samme-tak', text: 'Regnskap, revisjon, rådgivning og teknologi' },
  { icon: 'sparring', text: 'Rådgivere som stiller spørsmål – ikke bare leverer tall' },
  { icon: 'erp', text: 'Moderne ERP- og programvarekompetanse' },
  { icon: 'automatisering', text: 'Integrasjoner som reduserer manuelt arbeid' },
  { icon: 'lokal', text: 'Lokal tilstedeværelse med personlig oppfølging' },
  { icon: 'innsikt', text: 'Innsikt og analyse som gir bedre beslutninger' },
];

const HERO = {
  src: '/header/hero-1200.webp',
  srcSet: '/header/hero-1200.webp 1200w, /header/hero-2400.webp 2400w',
};

export default function HomePage() {
  return (
    <>
      {/* Heltebildet er det største elementet i første skjermbilde (LCP). */}
      <ForhandslastBilde src={HERO.src} srcSet={HERO.srcSet} sizes="100vw" />
      {/* HERO – forsiden er Skog + foto med overlay (designmanualen kap. 07/08). */}
      <Section tone="sand" className="!pb-0 !pt-0 md:!pt-1">
        {/* Kortet starter innrykket med radius 24 px og vokser til full bredde
            (utfallende, uten radius) når du scroller. */}
        <UtvidendeHero className="on-dark relative flex min-h-[640px] overflow-hidden [contain:paint] bg-flyd-skog text-flyd-sand lg:min-h-[min(calc(100vh-112px),820px)]">
          {/* Bildet er festet høyt (15 %) og zoomer fra samme punkt, så hodene ikke
              kuttes i toppen; det som må beskjæres, tas nedenfra. */}
          {/* Originalfotoet i to størrelser: mobil henter 1200 px, store
              skjermer 2400 px. next/image lager ikke srcset med statisk
              eksport (unoptimized), derfor vanlig <img> + preload over. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={HERO.src}
            srcSet={HERO.srcSet}
            sizes="100vw"
            alt="Flyd-teamet i en uformell prat på kontoret"
            fetchPriority="high"
            decoding="async"
            className="hero-drift absolute inset-0 h-full w-full object-cover object-[70%_15%]"
          />
          <div className="overlay-skog-bunn absolute inset-0 lg:hidden" aria-hidden="true" />
          <div className="overlay-skog absolute inset-0 hidden lg:block" aria-hidden="true" />

          <Container className="relative flex items-end pb-12 pt-40 md:pb-16 lg:items-center lg:py-24">
            <div className="max-w-2xl" data-reveal>
              {/* Kickeren står inne i H1, så overskriften begynner med merkenavnet
                  (Google retter «flyd» til «floyd»). Poppins 600, versal, +8 %.
                  Mint fordi bunnen er Skog – på lys bunn ville den vært Petrol. */}
              <h1 className="font-display text-display-xl font-semibold text-flyd-sand">
                <span className="mb-5 block text-[13px] font-semibold uppercase leading-[1.3] tracking-[0.08em] text-flyd-mint md:mb-6 md:text-[15px]">
                  Flyd AS – regnskap, revisjon, ERP og teknologi
                </span>{' '}
                Økonomi og teknologi
                <span className="mt-2 block whitespace-nowrap text-[0.78em] sm:text-[1em]">
                  <span>– </span>
                  <HeroTypewriter
                    text={['full flyd.', 'god kontroll.', 'full oversikt.', 'trygg vekst.']}
                  />
                </span>
              </h1>
              <p className="mt-8 max-w-xl font-display text-ingress font-medium text-flyd-dempet">
                Flyd er et kompetansehus for økonomi og teknologi. Vi hjelper
                bedrifter med regnskap, revisjon, rådgivning og programvare – fra
                daglig bokføring til ERP og integrasjoner.
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
            <HeroTypewriterPause className="absolute bottom-4 right-4 md:bottom-6 md:right-6" />
          </Container>
        </UtvidendeHero>
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
            <StatsSection stats={stats} columns={5} />
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
                Regnskap, revisjon og teknologi.
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

          {/* Tjenestene som kan leveres sammen i rutenettet, revisjon i egen bred rad under. */}
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
            {kombinerbareTjenester.map((s) => (
              <div key={s.id} data-reveal className="h-full">
                <ServiceCard
                  title={s.title}
                  text={s.short}
                  icon={s.icon}
                  tone="petrol"
                  href={serviceUrl(s)}
                />
              </div>
            ))}
            {uavhengigeTjenester.map((s) => (
              <div key={s.id} data-reveal className="sm:col-span-2 lg:col-span-3">
                <ServiceCard title={s.title} text={s.short} icon={s.icon} tone="petrol" href={serviceUrl(s)} wide />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* HVORFOR FLYD – Petrol som seksjonsskille */}
      <Section tone="petrol" flyt>
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Halv bredde: med 5 av 12 ble «sparringspartner.» bredere enn spalten fra ca. 1 340 px. */}
            <div className="lg:col-span-6" data-reveal>
              <Eyebrow tone="petrol">Hvorfor Flyd</Eyebrow>
              <h2 className="mt-5 font-display text-display-lg font-semibold text-flyd-sand">
                Din strategiske sparrings&shy;partner.
              </h2>
              <p className="mt-6 max-w-md text-[17px] leading-[1.65] text-flyd-dempet">
                Flyd kombinerer fagkompetanse med moderne teknologiforståelse. Vi
                er opptatt av helheten – vi ser tallene, systemene og arbeidsflyten
                under ett.
              </p>
            </div>
            <div className="lg:col-span-6">
              <NumberedList
                items={whyFlyd.map((w) => w.text)}
                icons={whyFlyd.map((w) => w.icon)}
                tone="dark"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* PROGRAMVARE – systemene og hvordan de henger sammen, partnerne under */}
      <Section tone="sand">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
            <div className="lg:col-span-5" data-reveal>
              <Eyebrow>Programvare</Eyebrow>
              <h2 className="mt-5 font-display text-display-lg font-semibold">
                Riktig system for din virksomhet.
              </h2>
              <p className="mt-6 text-[17px] leading-[1.65] text-flyd-skifer">
                Vi hjelper deg å velge, implementere og utnytte forretningssystemet
                som passer bedriften – ikke det vi tilfeldigvis selger. Så kobler vi
                det til resten, slik at dataene flyter dit de skal.
              </p>
              <div className="mt-8 flex flex-col items-start gap-3">
                <TextLink href="/tjenester/erp/">Programvare og ERP</TextLink>
                <TextLink href="/tjenester/integrasjoner/">Integrasjoner</TextLink>
              </div>
            </div>
            <div className="lg:col-span-7" data-reveal>
              <SystemBane />
            </div>
          </div>

          <div className="mt-20 border-t border-flyd-linje-sand pt-10 md:mt-24">
            <Eyebrow>Våre partnere</Eyebrow>
            <div className="mt-8">
              <PartnerStrip />
            </div>
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

      <ClosingCta
        kicker="Kontakt"
        title="La oss ta en prat."
        text="Fortell oss om virksomheten din – så finner vi ut hvordan vi kan hjelpe."
      />
    </>
  );
}
