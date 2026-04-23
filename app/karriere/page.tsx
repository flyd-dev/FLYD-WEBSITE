import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Briefcase, ArrowUpRight } from 'lucide-react';
import Container from '@/components/Container';
import Section from '@/components/Section';
import Eyebrow from '@/components/Eyebrow';
import FullflydMark from '@/components/FullflydMark';
import { ButtonLink } from '@/components/Button';
import { Gallery4, type Gallery4Item } from '@/components/ui/gallery4';
import { jobs } from '@/data/jobs';

export const metadata: Metadata = {
  title: 'Karriere',
  description:
    'Bli en del av Flyd. Vi er alltid på utkikk etter dyktige folk innen økonomi, teknologi og rådgivning.',
};

const perks: Gallery4Item[] = [
  {
    id: 'fagmiljo',
    icon: 'sparkles',
    title: 'Moderne fagmiljø',
    description:
      'Skjæringspunktet mellom økonomi, teknologi og rådgivning — der fag og systemer jobber sammen.',
    background: '/team-bg/DSC_4940.webp',
  },
  {
    id: 'utvikling',
    icon: 'graduation-cap',
    title: 'Personlig utvikling',
    description:
      'Vi investerer i deg, både faglig og personlig. Din vekst er en del av vår vekst.',
    background: '/team-bg/perk-utvikling.webp',
  },
  {
    id: 'kunder',
    icon: 'building-2',
    title: 'Spennende kunder',
    description:
      'Fra gründere til industrikonsern — ingen dag er lik, og hver kunde gir nye faglige løft.',
    background: '/team-bg/DSC_5306.webp',
  },
  {
    id: 'laering',
    icon: 'compass',
    title: 'Læring og vekst',
    description:
      'Kurs, sertifiseringer og interne fagsamlinger — vi holder kompetansen skarp.',
    background: '/team-bg/perk-miljo.webp',
  },
  {
    id: 'miljo',
    icon: 'heart-handshake',
    title: 'Godt arbeidsmiljø',
    description:
      'Trivsel, samarbeid og arbeidsglede er ikke bare ord — det er hvordan vi gjør ting.',
    background: '/team-bg/DSC_4634.webp',
  },
  {
    id: 'pavirke',
    icon: 'users',
    title: 'Påvirke',
    description:
      'Du får være med å forme din egen rolle og selskapet videre. Vi lytter.',
    background: '/team-bg/perk-pavirke.webp',
  },
];

export default function KarrierePage() {
  return (
    <>
      <Section tone="paper" size="lg" className="pt-20 md:pt-28 overflow-hidden">
        <div
          className="pointer-events-none absolute -right-[6%] top-[20%] hidden lg:block opacity-[0.12]"
          aria-hidden="true"
        >
          <FullflydMark variant="teal" className="text-[18rem]" />
        </div>
        <Container className="relative">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Eyebrow tone="teal">Karriere</Eyebrow>
              <h1 className="mt-6 font-display text-display-xl font-semibold">
                Bli en del av <span className="text-flyd-teal-dark">Flyd.</span>
              </h1>
            </div>
            <div className="lg:col-span-5">
              <p className="text-[17px] leading-[1.8] text-flyd-ink/80">
                Vi er alltid på utkikk etter dyktige folk som brenner for økonomi,
                teknologi og rådgivning. Hos Flyd får du jobbe i skjæringspunktet
                mellom fag og teknologi — med alt fra løpende regnskap til
                ERP-implementeringer og komplekse integrasjoner.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="teal-soft" className="overflow-hidden">
        <Gallery4
          eyebrow="Hvorfor jobbe i Flyd"
          title="Seks grunner til å vurdere oss."
          items={perks}
        />
      </Section>

      {/* OPEN POSITIONS */}
      <Section tone="paper" id="ledige-stillinger">
        <Container>
          <div
            className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
            data-reveal
          >
            <div className="max-w-2xl">
              <Eyebrow>Ledige stillinger</Eyebrow>
              <h2 className="mt-5 font-display text-display-lg font-semibold">
                Tre åpne stillinger akkurat nå.
              </h2>
            </div>
            <div className="text-[13px] uppercase tracking-[0.2em] text-flyd-ink/55">
              {jobs.length} stilling{jobs.length === 1 ? '' : 'er'}
            </div>
          </div>

          <ul
            className="mt-12 divide-y divide-flyd-ink/15 border-y border-flyd-ink/15"
            data-reveal
          >
            {jobs.map((job) => (
              <li key={job.slug}>
                <Link
                  href={`/karriere/${job.slug}/`}
                  className="group grid grid-cols-1 gap-6 py-8 transition-colors duration-200 hover:bg-[#F2F7F7] md:grid-cols-12 md:items-center md:gap-8 md:px-6"
                >
                  <div className="md:col-span-5">
                    <h3 className="font-display text-2xl font-semibold leading-tight md:text-[28px]">
                      {job.title}
                    </h3>
                    <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-flyd-ink/65">
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin
                          className="h-4 w-4 text-flyd-teal-dark"
                          strokeWidth={1.75}
                        />
                        {job.location}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Briefcase
                          className="h-4 w-4 text-flyd-teal-dark"
                          strokeWidth={1.75}
                        />
                        {job.type}
                      </span>
                    </div>
                  </div>

                  <div className="md:col-span-5">
                    <p className="text-[15px] leading-[1.7] text-flyd-ink/75">
                      {job.ingress}
                    </p>
                  </div>

                  <div className="md:col-span-2 md:flex md:justify-end">
                    <span className="inline-flex items-center gap-2 whitespace-nowrap text-[13px] font-medium uppercase tracking-[0.18em] text-flyd-ink transition-colors group-hover:text-flyd-accent">
                      Se stilling
                      <ArrowUpRight
                        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        strokeWidth={2}
                      />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          <div
            className="mt-14 flex flex-wrap items-center gap-4 border border-flyd-ink/15 bg-[#F2F7F7] p-8 md:p-10"
            data-reveal
          >
            <div className="max-w-xl">
              <div className="text-[11px] uppercase tracking-[0.22em] text-flyd-teal-dark">
                Åpen søknad
              </div>
              <p className="mt-3 text-[15px] leading-[1.7] text-flyd-ink/80">
                Finner du ikke en stilling som passer? Send oss en åpen søknad —
                vi leser alt som kommer inn og tar kontakt når noe passer.
              </p>
            </div>
            <div className="md:ml-auto">
              <ButtonLink
                href="mailto:jobb@flyd.no"
                variant="outline"
                withArrow
                accent
                external
              >
                Send åpen søknad
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="ink" size="lg">
        <Container>
          <div className="max-w-3xl" data-reveal>
            <h2 className="font-display text-display-lg font-semibold">
              Lurer du på noe før du søker?
            </h2>
            <p className="mt-8 text-[17px] text-flyd-paper/80 leading-[1.75]">
              Ta en uformell prat med oss — vi svarer på alt fra arbeidshverdag
              til karriereveier, uten forpliktelse.
            </p>
            <div className="mt-10">
              <ButtonLink href="/kontakt" variant="teal" withArrow accent>
                Ta kontakt
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
