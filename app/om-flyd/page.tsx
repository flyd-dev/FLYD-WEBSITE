import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import Image from 'next/image';
import Container from '@/components/Container';
import Section from '@/components/Section';
import Eyebrow from '@/components/Eyebrow';
import TeamCard from '@/components/TeamCard';
import FlydLogo from '@/components/FlydLogo';
import OfficeCards from '@/components/OfficeCards';
import StatsSection from '@/components/StatsSection';
import ClosingCta from '@/components/ClosingCta';
import JsonLd from '@/components/JsonLd';
import { leadership, officeLeads, otherTeam } from '@/data/team';
import { offices } from '@/data/offices';
import { stat } from '@/data/stats';

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Hjem', item: 'https://www.flyd.no/' },
    { '@type': 'ListItem', position: 2, name: 'Om Flyd', item: 'https://www.flyd.no/om-flyd/' },
  ],
};

export const metadata: Metadata = pageMetadata({
  absoluteTitle: 'Om Flyd – Kompetansehus for økonomi og teknologi',
  description:
    'Flyd er et kompetansehus for økonomi og teknologi. Møt teamet og besøk et av våre seks kontorer i Sør-Vest-Norge.',
  path: '/om-flyd/',
});

const values = [
  {
    title: 'Personlig',
    body: 'Vi kjenner kundene våre og følger dem opp individuelt. Ingen nummerlapp og kø.',
  },
  {
    title: 'Nær',
    body: 'Seks kontorer gjør at vi alltid er i nærheten – også når det haster.',
  },
  {
    title: 'Visjonær',
    body: 'Vi tenker fremover og bruker teknologi aktivt for å løfte kundene.',
  },
  {
    title: 'Kompetent',
    body: 'Dyp fagkunnskap innen økonomi, systemer og rådgivning – i samme team.',
  },
];

export default function OmFlydPage() {
  const figures = [stat('medarbeidere'), stat('kontorer'), stat('kunder')];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      {/* HERO – «Innhold med tall»: Sand, bilde til venstre, tall med topplinje. */}
      <Section tone="sand" size="lg" className="pt-12 md:pt-16">
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="order-2 lg:order-1 lg:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden rounded-bilde bg-flyd-lysmint">
                <Image
                  src="/header/om-flyd-teamet.webp"
                  alt="Smilende Flyd-kolleger samlet utendørs, med skogkledde åser i bakgrunnen"
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2 lg:col-span-7">
              <Eyebrow>Om Flyd</Eyebrow>
              <h1 className="mt-6 font-display text-display-xl font-semibold">
                Mer enn et regnskapskontor.
              </h1>
              <p className="mt-8 max-w-2xl font-display text-ingress font-medium text-flyd-petrol">
                Flyd er et kompetansehus for økonomi og teknologi. Vi leverer
                regnskap, rådgivning, programvare og integrasjoner fra samme
                sted – slik at du slipper å koordinere fem leverandører og kan
                konsentrere deg om å drive bedriften videre.
              </p>
              <div className="mt-12 max-w-xl">
                <StatsSection stats={figures} columns={3} />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* VERDIER */}
      <Section tone="lysmint">
        <Container>
          <div className="max-w-3xl" data-reveal>
            <Eyebrow>Våre verdier</Eyebrow>
            <h2 className="mt-5 font-display text-display-lg font-semibold">
              Fire ord som styrer dagen vår.
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-4">
            {values.map((v, i) => (
              <div key={v.title} data-reveal className="rounded-kort bg-flyd-sand p-7 md:p-8">
                <span
                  className="font-display text-[24px] font-semibold leading-none tabular-nums text-flyd-rust"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-6 font-display text-[24px] font-semibold">{v.title}</h3>
                <p className="mt-3 text-[16px] leading-relaxed text-flyd-skifer">{v.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* SLIK JOBBER VI */}
      <Section tone="skog">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5" data-reveal>
              <Eyebrow tone="dark">Slik jobber vi</Eyebrow>
              <h2 className="mt-5 font-display text-display-lg font-semibold text-flyd-sand">
                Langsiktige relasjoner.
              </h2>
              <blockquote className="mt-10 border-l-4 border-flyd-korall pl-6 font-display text-[24px] font-semibold leading-[1.3] text-flyd-mint">
                Én partner, ett nummer – full flyd.
              </blockquote>
            </div>
            <div className="space-y-6 lg:col-span-7" data-reveal>
              <p className="font-display text-ingress font-medium text-flyd-sand">
                Hver kunde får en fast kontaktperson som kjenner virksomheten,
                utfordringene og målene – og som er der år etter år.
              </p>
              <p className="text-[17px] leading-[1.7] text-flyd-dempet">
                Ved å kombinere fagkompetanse med teknologiforståelse skaper vi
                bedre flyt – i prosesser, systemer og beslutninger.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* TEAM */}
      <Section tone="sand" id="team">
        <Container>
          <div className="flex items-end justify-between gap-6" data-reveal>
            <div>
              <Eyebrow>Ledelse og partnere</Eyebrow>
              <h2 className="mt-5 font-display text-display-lg font-semibold">
                Menneskene bak{' '}
                <FlydLogo
                  title="Flyd"
                  className="inline-block h-[1em] w-auto translate-y-[0.22em] align-baseline text-flyd-teal"
                />
              </h2>
            </div>
            <div className="hidden text-right text-[15px] text-flyd-skifer md:block">
              {stat('medarbeidere').value} medarbeidere
              <br />
              {offices.length} kontorer
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {leadership.map((m) => (
              <TeamCard key={m.email} m={m} />
            ))}
          </div>

          <div className="mt-20 border-t border-flyd-linje-sand pt-10" data-reveal>
            <Eyebrow>Kontorledere</Eyebrow>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {officeLeads.map((m) => (
              <TeamCard key={m.email} m={m} />
            ))}
          </div>

          <div className="mt-20 border-t border-flyd-linje-sand pt-10" data-reveal>
            <Eyebrow>Resten av teamet</Eyebrow>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {otherTeam.map((m) => (
              <TeamCard key={m.email} m={m} />
            ))}
          </div>
        </Container>
      </Section>

      {/* KONTORER */}
      <Section tone="lysmint" id="kontorer">
        <Container>
          <div className="max-w-2xl" data-reveal>
            <Eyebrow>Kontorer</Eyebrow>
            <h2 className="mt-5 font-display text-display-lg font-semibold">
              Seks steder. Én partner.
            </h2>
            <p className="mt-6 text-[17px] leading-[1.65] text-flyd-skifer">
              Vi er lokalt til stede der kundene våre er – fra Stavanger i nord
              til Flekkefjord i sør.
            </p>
          </div>
          <OfficeCards offices={offices} className="mt-12" />
        </Container>
      </Section>

      <ClosingCta
        title="Vil du vite mer om hvem vi er?"
        text="Ta kontakt – så finner vi en anledning til å møtes, enten på et kontor, i en videosamtale eller over en kaffe."
        secondary={{ href: '/karriere', label: 'Jobb hos oss' }}
      />
    </>
  );
}
