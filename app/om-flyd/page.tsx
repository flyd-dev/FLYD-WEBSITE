import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, ArrowUpRight } from 'lucide-react';
import Container from '@/components/Container';
import Section from '@/components/Section';
import Eyebrow from '@/components/Eyebrow';
import FullflydMark from '@/components/FullflydMark';
import TeamCard from '@/components/TeamCard';
import { ButtonLink } from '@/components/Button';
import { GlowCard } from '@/components/ui/glow-card';
import { leadership, officeLeads, otherTeam } from '@/data/team';
import { offices } from '@/data/offices';

export const metadata: Metadata = {
  title: 'Om Flyd',
  description:
    'Flyd er et kompetansehus for økonomi og teknologi. Møt teamet og besøk et av våre seks kontorer i Sør-Vest-Norge.',
};

const values = [
  {
    title: 'Personlig',
    body: 'Vi kjenner kundene våre og følger dem opp individuelt. Ingen nummerskranker.',
  },
  {
    title: 'Nær',
    body: 'Seks kontorer gjør at vi alltid er i nærheten — også når det haster.',
  },
  {
    title: 'Visjonær',
    body: 'Vi tenker fremover og bruker teknologi aktivt for å løfte kundene.',
  },
  {
    title: 'Kompetent',
    body: 'Dyp fagkunnskap innen økonomi, systemer og rådgivning — i samme team.',
  },
];

export default function OmFlydPage() {
  return (
    <>
      {/* HERO */}
      <Section tone="paper" size="lg" className="pt-20 md:pt-28 overflow-hidden">
        <div
          className="pointer-events-none absolute -left-[8%] bottom-[-10%] hidden lg:block opacity-[0.1]"
          aria-hidden="true"
        >
          <FullflydMark variant="teal" className="text-[18rem]" />
        </div>
        <Container className="relative">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Eyebrow tone="teal">Om Flyd</Eyebrow>
              <h1 className="mt-6 font-display text-display-xl font-semibold">
                Mer enn et
                <br />
                <span className="text-flyd-teal-dark">regnskapskontor.</span>
              </h1>
            </div>
            <div className="lg:col-span-5">
              <p className="text-[17px] leading-[1.8] text-flyd-ink/80">
                Flyd er et kompetansehus for økonomi og teknologi. Vi leverer
                regnskap, rådgivning, programvare og integrasjoner fra samme
                sted – slik at du slipper å koordinere fem leverandører og kan
                konsentrere deg om å drive bedriften videre.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* VALUES */}
      <Section tone="teal">
        <Container>
          <div className="max-w-2xl" data-reveal>
            <Eyebrow tone="ink">Våre verdier</Eyebrow>
            <h2 className="mt-5 font-display text-display-lg font-semibold">
              Fire ord som styrer dagen vår.
            </h2>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {values.map((v, i) => (
              <div key={v.title} data-reveal className="h-full">
                <GlowCard
                  glowColor="teal"
                  customSize
                  className="h-full p-8 md:p-9"
                >
                  <div className="text-[11px] uppercase tracking-[0.22em] text-flyd-teal-dark">
                    0{i + 1}
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-semibold">
                    {v.title}
                  </h3>
                  <p className="mt-4 text-[14px] text-flyd-ink/75 leading-relaxed">
                    {v.body}
                  </p>
                </GlowCard>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* HOW WE WORK (dark) */}
      <Section tone="ink">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4" data-reveal>
              <Eyebrow tone="paper">Slik jobber vi</Eyebrow>
              <h2 className="mt-5 font-display text-display-lg font-semibold">
                Langsiktige
                <br />
                relasjoner.
              </h2>
            </div>
            <div className="lg:col-span-8 space-y-6" data-reveal>
              <p className="text-[18px] leading-[1.8] text-flyd-paper/85">
                Vi tror på langsiktige relasjoner. Hver kunde får en dedikert
                kontaktperson som kjenner virksomheten, utfordringene og målene.
              </p>
              <p className="text-[18px] leading-[1.8] text-flyd-paper/85">
                Ved å kombinere fagkompetanse med teknologiforståelse skaper vi
                bedre flyt – i prosesser, systemer og beslutninger.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* TEAM — leadership */}
      <Section tone="paper" id="team">
        <Container>
          <div className="flex items-end justify-between gap-6" data-reveal>
            <div>
              <Eyebrow>Ledelse og partnere</Eyebrow>
              <h2 className="mt-5 font-display text-display-lg font-semibold leading-[1.05] text-[#3b3c36]">
                Menneskene bak{' '}
                <Image
                  src="/brand/flyd-logo-dark.png"
                  alt="Flyd"
                  width={935}
                  height={445}
                  className="inline-block h-[1em] w-auto translate-y-[0.22em] align-baseline"
                />
              </h2>
            </div>
            <div className="hidden text-right text-[13px] text-flyd-ink/60 md:block">
              19 medarbeidere
              <br />6 kontorer
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {leadership.map((m) => (
              <TeamCard key={m.email} m={m} />
            ))}
          </div>

          <h3 className="mt-24 font-display text-2xl font-semibold text-[#3b3c36]" data-reveal>
            Kontorledere
          </h3>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {officeLeads.map((m) => (
              <TeamCard key={m.email} m={m} />
            ))}
          </div>

          <h3 className="mt-24 font-display text-2xl font-semibold text-[#3b3c36]" data-reveal>
            Resten av teamet
          </h3>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {otherTeam.map((m) => (
              <TeamCard key={m.email} m={m} />
            ))}
          </div>
        </Container>
      </Section>

      {/* OFFICES */}
      <Section tone="teal-soft" id="kontorer">
        <Container>
          <div className="max-w-2xl" data-reveal>
            <Eyebrow>Kontorer</Eyebrow>
            <h2 className="mt-5 font-display text-display-lg font-semibold">
              Seks steder. Én partner.
            </h2>
            <p className="mt-6 text-[16px] leading-[1.75] text-flyd-ink/75">
              Vi er lokalt tilstede der kundene våre er – fra Stavanger i nord
              til Flekkefjord i sør.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-[1px] bg-flyd-ink/10 sm:grid-cols-2 lg:grid-cols-3">
            {offices.map((o) => (
              <a
                key={o.city}
                href={o.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-reveal
                className="group relative bg-flyd-paper p-7 md:p-8 transition-colors duration-200 hover:bg-[#F2F7F7]"
              >
                <div className="flex items-start justify-between">
                  <MapPin
                    className="h-5 w-5 text-flyd-teal-dark"
                    strokeWidth={1.75}
                  />
                  <ArrowUpRight
                    className="h-5 w-5 text-flyd-ink/30 transition-colors group-hover:text-flyd-accent"
                    strokeWidth={1.75}
                  />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold">
                  {o.city} <span className="text-flyd-ink/40">·</span>{' '}
                  <span className="text-flyd-teal-dark">{o.name}</span>
                </h3>
                <p className="mt-3 text-[14px] text-flyd-ink/70 leading-relaxed">
                  {o.street}
                  <br />
                  {o.postal}
                </p>
              </a>
            ))}
          </div>
        </Container>
      </Section>

      {/* CLOSING */}
      <Section tone="ink" size="lg">
        <Container>
          <div className="max-w-3xl" data-reveal>
            <h2 className="font-display text-display-lg font-semibold">
              Vil du vite mer om hvem vi er?
            </h2>
            <p className="mt-8 max-w-xl text-[17px] text-flyd-paper/80 leading-[1.75]">
              Ta kontakt — så finner vi en anledning til å møtes, enten på et
              kontor, i en videosamtale eller over en kaffe.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <ButtonLink href="/kontakt" variant="teal" withArrow accent>
                Ta kontakt
              </ButtonLink>
              <ButtonLink href="/karriere" variant="outline-paper">
                Jobb hos oss
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
