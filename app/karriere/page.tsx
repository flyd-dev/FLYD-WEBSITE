import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Briefcase, ArrowRight } from 'lucide-react';
import Container from '@/components/Container';
import Section from '@/components/Section';
import Eyebrow from '@/components/Eyebrow';
import ClosingCta from '@/components/ClosingCta';
import { ButtonLink } from '@/components/Button';
import FlydLogo from '@/components/FlydLogo';
import { Gallery4, type Gallery4Item } from '@/components/ui/gallery4';
import JsonLd from '@/components/JsonLd';
import { jobs } from '@/data/jobs';

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Hjem', item: 'https://www.flyd.no/' },
    { '@type': 'ListItem', position: 2, name: 'Karriere', item: 'https://www.flyd.no/karriere/' },
  ],
};

export const metadata: Metadata = {
  title: 'Ledige stillinger – Karriere',
  description:
    'Bli en del av Flyd. Vi er alltid på utkikk etter dyktige folk innen økonomi, teknologi og rådgivning.',
  alternates: { canonical: '/karriere/' },
};

const perks: Gallery4Item[] = [
  {
    id: 'fagmiljo',
    icon: 'samme-tak',
    title: 'Moderne fagmiljø',
    description:
      'Regnskapsførere, rådgivere og ERP-konsulenter i samme team – der fag og systemer jobber sammen.',
    background: '/team-bg/DSC_4940.webp',
  },
  {
    id: 'utvikling',
    icon: 'videreutvikling',
    title: 'Personlig utvikling',
    description:
      'Vi investerer i deg, både faglig og personlig. Din vekst er en del av vår vekst.',
    background: '/team-bg/perk-utvikling.webp',
  },
  {
    id: 'kunder',
    icon: 'kunder',
    title: 'Spennende kunder',
    description:
      'Fra gründere til industrikonsern – ingen dag er lik, og hver kunde gir nye faglige løft.',
    background: '/team-bg/kunder.webp',
  },
  {
    id: 'laering',
    icon: 'statsautorisert',
    title: 'Faglig påfyll',
    description:
      'Kurs, sertifiseringer og interne fagsamlinger – vi holder kompetansen skarp.',
    background: '/team-bg/perk-miljo.webp',
  },
  {
    id: 'miljo',
    icon: 'medarbeidere',
    title: 'Godt arbeidsmiljø',
    description:
      'Trivsel, samarbeid og arbeidsglede er ikke bare ord – det er hvordan vi gjør ting.',
    background: '/team-bg/arbeidsmiljo.webp',
  },
  {
    id: 'pavirke',
    icon: 'sparring',
    title: 'Rom for å påvirke',
    description:
      'Du får være med å forme din egen rolle og selskapet videre. Vi lytter.',
    background: '/team-bg/perk-pavirke.webp',
  },
];

const tallord = ['Én', 'To', 'Tre', 'Fire', 'Fem', 'Seks', 'Sju', 'Åtte', 'Ni', 'Ti'];

function stillingsOverskrift(antall: number): string {
  if (antall === 0) return 'Ingen ledige stillinger akkurat nå.';
  const tall = tallord[antall - 1] ?? String(antall);
  return antall === 1
    ? `${tall} åpen stilling akkurat nå.`
    : `${tall} åpne stillinger akkurat nå.`;
}

export default function KarrierePage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      {/* HERO – portrettbilde ved siden av teksten (designmanualen kap. 07). */}
      <Section tone="sand" size="lg" className="pt-12 md:pt-16">
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Eyebrow>Karriere</Eyebrow>
              <h1 className="mt-6 font-display text-display-xl font-semibold">
                Bli en del av{' '}
                <FlydLogo
                  title="Flyd"
                  className="inline-block h-[1em] w-auto translate-y-[0.22em] align-baseline text-flyd-teal"
                />
              </h1>
              <p className="mt-8 max-w-2xl font-display text-ingress font-medium text-flyd-petrol">
                Vi er alltid på utkikk etter dyktige folk som brenner for økonomi,
                teknologi og rådgivning.
              </p>
              <p className="mt-5 max-w-2xl text-[17px] leading-[1.7] text-flyd-skifer">
                Hos Flyd får du jobbe i skjæringspunktet mellom fag og teknologi –
                med alt fra løpende regnskap til ERP-implementeringer og komplekse
                integrasjoner.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                {jobs.length > 0 ? (
                  <>
                    <ButtonLink href="#ledige-stillinger" variant="primary" withArrow>
                      Se ledige stillinger
                    </ButtonLink>
                    <ButtonLink href="mailto:support@flyd.no" variant="secondary" external>
                      Send åpen søknad
                    </ButtonLink>
                  </>
                ) : (
                  <ButtonLink href="mailto:support@flyd.no" variant="primary" withArrow external>
                    Send åpen søknad
                  </ButtonLink>
                )}
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden rounded-bilde bg-flyd-lysmint lg:aspect-square">
                <Image
                  src="/header/office-3.webp"
                  alt="Kolleger hos Flyd samlet på kontoret"
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover object-[40%_center]"
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="lysmint" className="overflow-hidden">
        <Gallery4
          eyebrow="Hvorfor jobbe i Flyd"
          title="Seks grunner til å vurdere oss."
          items={perks}
        />
      </Section>

      {/* OPEN POSITIONS */}
      <Section tone="sand" id="ledige-stillinger">
        <Container>
          <div
            className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
            data-reveal
          >
            <div className="max-w-2xl">
              <Eyebrow>Ledige stillinger</Eyebrow>
              <h2 className="mt-5 font-display text-display-lg font-semibold">
                {stillingsOverskrift(jobs.length)}
              </h2>
            </div>
            {jobs.length > 0 && (
              <span className="inline-flex rounded-pille bg-flyd-korall px-4 py-2 text-[12px] font-bold uppercase leading-none tracking-[0.12em] text-flyd-skog">
                {jobs.length} stilling{jobs.length === 1 ? '' : 'er'}
              </span>
            )}
          </div>

          {jobs.length > 0 && (
          <ul className="mt-12 grid grid-cols-1 gap-4" data-reveal>
            {jobs.map((job) => (
              <li key={job.slug}>
                <Link
                  href={`/karriere/${job.slug}/`}
                  className="group grid grid-cols-1 gap-6 rounded-kort bg-flyd-lysmint p-7 transition-transform duration-300 ease-out hover:-translate-y-1 active:translate-y-0 motion-reduce:transition-none md:grid-cols-12 md:items-center md:gap-8 md:p-8"
                >
                  <div className="md:col-span-5">
                    <h3 className="font-display text-[24px] font-semibold leading-tight md:text-[28px]">
                      {job.title}
                    </h3>
                    <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-[15px] text-flyd-skifer">
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-4 w-4 text-flyd-teal" strokeWidth={2} aria-hidden="true" />
                        {job.location}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Briefcase className="h-4 w-4 text-flyd-teal" strokeWidth={2} aria-hidden="true" />
                        {job.type}
                      </span>
                    </div>
                  </div>

                  <div className="md:col-span-5">
                    <p className="text-[16px] leading-[1.65] text-flyd-skifer">
                      {job.ingress}
                    </p>
                  </div>

                  <div className="md:col-span-2 md:flex md:justify-end">
                    <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-[15px] font-medium text-flyd-petrol decoration-flyd-teal decoration-2 underline-offset-[6px] group-hover:underline">
                      Se stilling
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          )}

          <div
            className="mt-10 flex flex-wrap items-center gap-6 rounded-kort bg-flyd-lysmint p-8 md:p-10"
            data-reveal
          >
            <div className="max-w-xl">
              <Eyebrow>Åpen søknad</Eyebrow>
              <p className="mt-3 text-[16px] leading-[1.65] text-flyd-skog">
                {jobs.length > 0
                  ? 'Finner du ikke en stilling som passer? Send oss en åpen søknad – vi leser alt som kommer inn og tar kontakt når noe passer.'
                  : 'Send oss gjerne en åpen søknad likevel – vi leser alt som kommer inn og tar kontakt når noe passer.'}
              </p>
            </div>
            <div className="md:ml-auto">
              <ButtonLink href="mailto:support@flyd.no" variant="secondary" withArrow external>
                Send åpen søknad
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>

      <ClosingCta
        title="Lurer du på noe før du søker?"
        text="Ta en uformell prat med oss – vi svarer på alt fra arbeidshverdag til karriereveier, uten forpliktelse."
        primary={{ href: '/kontakt?tema=karriere', label: 'Ta kontakt' }}
        secondary={{ href: 'mailto:support@flyd.no', label: 'support@flyd.no', external: true }}
      />
    </>
  );
}
