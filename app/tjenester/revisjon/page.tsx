import type { Metadata } from 'next';
import { Fragment } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Container from '@/components/Container';
import Section from '@/components/Section';
import Eyebrow from '@/components/Eyebrow';
import Breadcrumbs from '@/components/Breadcrumbs';
import NumberedList from '@/components/NumberedList';
import TeamCard from '@/components/TeamCard';
import ClosingCta from '@/components/ClosingCta';
import JsonLd from '@/components/JsonLd';
import { ButtonLink } from '@/components/Button';
import { pageMetadata, siteUrl } from '@/lib/seo';
import { serviceUrl, visibleServices } from '@/data/services';
import { auditPartners, auditTeam } from '@/data/team';
import { revisjon } from '@/data/revisjon';

/**
 * Revisjon har egen side i stedet for TjenesteMal: ingen prosess, priser eller
 * salgstekst, bare hva vi gjør og hvem du snakker med. Tekstene står i data/revisjon.ts.
 */
const tjeneste = visibleServices.find((s) => s.slug === 'revisjon');

export const metadata: Metadata = pageMetadata({
  title: revisjon.meta.title,
  description: revisjon.meta.description,
  path: '/tjenester/revisjon/',
});

const team = [...auditPartners, ...auditTeam];

export default function RevisjonPage() {
  if (!tjeneste) notFound();
  const kontakt = `/kontakt?tema=${encodeURIComponent(tjeneste.tema.toLowerCase())}`;

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${siteUrl}${serviceUrl(tjeneste)}#service`,
    name: tjeneste.title,
    description: tjeneste.short,
    url: `${siteUrl}${serviceUrl(tjeneste)}`,
    provider: { '@id': `${siteUrl}/#organization` },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Rogaland' },
      { '@type': 'AdministrativeArea', name: 'Agder' },
    ],
  };

  return (
    <>
      <JsonLd data={serviceJsonLd} />

      {/* HERO */}
      <Section tone="sand" className="pt-10 md:pt-14" flyt>
        <Container>
          <Breadcrumbs
            items={[
              { name: 'Tjenester', href: '/tjenester/' },
              { name: tjeneste.title, href: serviceUrl(tjeneste) },
            ]}
          />
          <div className="mt-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Eyebrow>Tjeneste</Eyebrow>
              <h1 className="mt-6 font-display text-display-xl font-semibold">{revisjon.tittel}</h1>
              <span aria-hidden="true" className="aksentlinje mt-6 block h-1 w-24 rounded-pille bg-flyd-teal" />
              <p className="mt-8 max-w-2xl font-display text-ingress font-medium text-flyd-petrol">
                {revisjon.ingress}
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <ButtonLink href={kontakt} variant="primary" withArrow>
                  Snakk med oss
                </ButtonLink>
                <ButtonLink href="tel:+4748019958" variant="secondary" external>
                  Ring +47 480 19 958
                </ButtonLink>
              </div>
            </div>
            {tjeneste.image && (
              <div className="lg:col-span-5">
                <div className="relative aspect-[4/3] overflow-hidden rounded-bilde bg-flyd-lysmint">
                  <Image
                    src={tjeneste.image.src}
                    alt={tjeneste.image.alt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </Container>
      </Section>

      {/* TJENESTENE – Petrol som seksjonsskille */}
      <Section tone="petrol" flyt>
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5" data-reveal>
              <Eyebrow tone="petrol">{revisjon.tjenester.kicker}</Eyebrow>
              <h2 className="mt-5 font-display text-display-lg font-semibold text-flyd-sand">
                {revisjon.tjenester.tittel}
              </h2>
              <p className="mt-6 max-w-md text-[17px] leading-[1.65] text-flyd-dempet">
                {revisjon.tjenester.tekst}
              </p>
            </div>
            <div className="lg:col-span-7">
              <NumberedList
                tone="dark"
                items={revisjon.tjenester.punkter.map((p) => (
                  <Fragment key={p.tittel}>
                    <strong className="block font-display text-[20px] font-semibold leading-tight">{p.tittel}</strong>
                    <span className="mt-2 block text-[16px] text-flyd-dempet">{p.tekst}</span>
                  </Fragment>
                ))}
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* REVISJONSTEAMET */}
      <Section tone="sand">
        <Container>
          <div className="max-w-3xl" data-reveal>
            <Eyebrow>{revisjon.team.kicker}</Eyebrow>
            <h2 className="mt-5 font-display text-display-lg font-semibold">{revisjon.team.tittel}</h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((m) => (
              <TeamCard key={m.email} m={m} />
            ))}
          </div>
        </Container>
      </Section>

      <ClosingCta
        kicker={revisjon.avslutning.kicker}
        title={revisjon.avslutning.tittel}
        text={revisjon.avslutning.tekst}
        primary={{ href: kontakt, label: 'Snakk med oss' }}
      />
    </>
  );
}
