import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react';
import Container from '@/components/Container';
import Section from '@/components/Section';
import Eyebrow from '@/components/Eyebrow';
import { ButtonLink } from '@/components/Button';
import JsonLd from '@/components/JsonLd';
import { offices, getOfficeBySlug } from '@/data/offices';
import { services } from '@/data/services';

const SITE_URL = 'https://www.flyd.no';

export function generateStaticParams() {
  return offices.map((o) => ({ slug: o.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const office = getOfficeBySlug(params.slug);
  if (!office) return { title: 'Kontor ikke funnet' };
  return {
    title: `Regnskapsfører ${office.city} – Flyd ${office.city}`,
    description: `${office.blurb} Regnskap, rådgivning og teknologi – lokalt i ${office.city}.`,
    alternates: { canonical: `/kontor/${office.slug}/` },
  };
}

export default function KontorPage({ params }: { params: { slug: string } }) {
  const office = getOfficeBySlug(params.slug);
  if (!office) notFound();

  const otherOffices = offices.filter((o) => o.slug !== office.slug);

  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'AccountingService'],
    '@id': `${SITE_URL}/#office-${office.city.toLowerCase()}`,
    name: `Flyd ${office.city}`,
    parentOrganization: { '@id': `${SITE_URL}/#organization` },
    url: `${SITE_URL}/kontor/${office.slug}/`,
    image: `${SITE_URL}/brand/flyd-teal.png`,
    telephone: '+4748019958',
    email: 'support@flyd.no',
    description: office.blurb,
    address: {
      '@type': 'PostalAddress',
      streetAddress: office.street,
      postalCode: office.postal.split(' ')[0],
      addressLocality: office.postal.split(' ').slice(1).join(' '),
      addressCountry: 'NO',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: office.lat,
      longitude: office.lng,
    },
    hasMap: office.mapsUrl,
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Hjem', item: `${SITE_URL}/` },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Kontakt',
        item: `${SITE_URL}/kontakt/`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: office.city,
        item: `${SITE_URL}/kontor/${office.slug}/`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={localBusinessJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      {/* HERO */}
      <Section tone="paper" className="pt-16 md:pt-20">
        <Container>
          <Link
            href="/kontakt/#kontorer"
            className="inline-flex items-center gap-2 text-[13px] uppercase tracking-[0.18em] text-flyd-ink/70 transition-colors hover:text-flyd-teal-dark"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2} />
            Alle kontorer
          </Link>

          <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Eyebrow tone="teal">Kontor · {office.name}</Eyebrow>
              <h1 className="mt-6 font-display text-display-xl font-semibold">
                Regnskapsfører i{' '}
                <span className="text-flyd-teal-dark">{office.city}.</span>
              </h1>
              <p className="mt-8 max-w-2xl text-[18px] leading-[1.75] text-flyd-ink/80">
                {office.blurb}
              </p>
              <p className="mt-5 max-w-2xl text-[16px] leading-[1.75] text-flyd-ink/75">
                Som del av Flyd får du mer enn løpende regnskap: rådgivning,
                riktig forretningssystem og integrasjoner som fjerner manuelt
                arbeid – fra ett kompetansehus, med en fast kontaktperson som
                kjenner virksomheten din.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <ButtonLink href="/kontakt" variant="primary" withArrow accent>
                  Snakk med oss
                </ButtonLink>
                <ButtonLink href="tel:+4748019958" variant="outline">
                  Ring oss
                </ButtonLink>
              </div>
            </div>

            <aside className="lg:col-span-5">
              <div className="border border-flyd-ink/15 bg-flyd-teal-soft p-7 md:p-8 lg:sticky lg:top-24">
                <div className="text-[11px] uppercase tracking-[0.22em] text-flyd-ink/70">
                  Besøk oss
                </div>
                <div className="mt-5 space-y-4 text-[15px]">
                  <div className="flex items-start gap-3">
                    <MapPin
                      className="mt-0.5 h-4 w-4 flex-shrink-0 text-flyd-teal-dark"
                      strokeWidth={1.75}
                    />
                    <div>
                      <div className="font-display font-semibold">
                        {office.city} · {office.name}
                      </div>
                      <div className="mt-0.5 text-flyd-ink/75">
                        {office.street}
                        <br />
                        {office.postal}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone
                      className="mt-0.5 h-4 w-4 flex-shrink-0 text-flyd-teal-dark"
                      strokeWidth={1.75}
                    />
                    <a href="tel:+4748019958" className="hover:text-flyd-teal-dark">
                      +47 480 19 958
                    </a>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail
                      className="mt-0.5 h-4 w-4 flex-shrink-0 text-flyd-teal-dark"
                      strokeWidth={1.75}
                    />
                    <a
                      href="mailto:support@flyd.no"
                      className="hover:text-flyd-teal-dark"
                    >
                      support@flyd.no
                    </a>
                  </div>
                </div>
                <div className="mt-7">
                  <ButtonLink
                    href={office.mapsUrl}
                    variant="outline"
                    withArrow
                    external
                    className="w-full"
                  >
                    Åpne i Google Maps
                  </ButtonLink>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      {/* TJENESTER LOKALT */}
      <Section tone="ink">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5" data-reveal>
              <Eyebrow tone="paper">Det hjelper vi deg med</Eyebrow>
              <h2 className="mt-5 font-display text-display-lg font-semibold">
                Alt du trenger –
                <br />
                <span className="text-flyd-teal">også i {office.city}.</span>
              </h2>
              <p className="mt-8 max-w-md text-[17px] leading-[1.75] text-flyd-paper/75">
                Samme tjenester, samme fagmiljø og samme systemer på alle
                kontorene våre – forskjellen er at vi møter deg der du er.
              </p>
              <div className="mt-8">
                <ButtonLink href="/tjenester" variant="teal" withArrow accent>
                  Utforsk alle tjenester
                </ButtonLink>
              </div>
            </div>
            <div className="lg:col-span-7" data-reveal>
              <ul className="border-t border-flyd-paper/10">
                {services.map((s) => (
                  <li key={s.id}>
                    <Link
                      href={`/tjenester#${s.id}`}
                      className="group flex items-center justify-between gap-4 border-b border-flyd-paper/10 py-4 transition-colors hover:bg-flyd-paper/5"
                    >
                      <span className="flex items-start gap-3">
                        <Check
                          className="mt-1 h-4 w-4 flex-shrink-0 text-flyd-teal"
                          strokeWidth={2}
                        />
                        <span className="text-[16px] text-flyd-paper/90">
                          {s.title}
                        </span>
                      </span>
                      <ArrowUpRight
                        className="h-4 w-4 flex-shrink-0 text-flyd-paper/40 transition-colors group-hover:text-flyd-teal"
                        strokeWidth={1.75}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* ANDRE KONTORER */}
      <Section tone="teal-soft">
        <Container>
          <div className="max-w-2xl" data-reveal>
            <Eyebrow>Ett kompetansehus</Eyebrow>
            <h2 className="mt-5 font-display text-display-md font-semibold">
              Vi er også nær deg andre steder.
            </h2>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-[1px] bg-flyd-ink/10 sm:grid-cols-2 lg:grid-cols-5">
            {otherOffices.map((o) => (
              <Link
                key={o.slug}
                href={`/kontor/${o.slug}/`}
                data-reveal
                className="group bg-flyd-paper p-6 transition-colors duration-200 hover:bg-flyd-teal-soft"
              >
                <MapPin
                  className="h-4 w-4 text-flyd-teal-dark"
                  strokeWidth={1.75}
                />
                <div className="mt-3 font-display text-lg font-semibold">
                  {o.city}
                </div>
                <div className="mt-1 text-[13px] text-flyd-ink/65">
                  {o.street}
                </div>
                <div className="mt-4 text-[12px] uppercase tracking-[0.18em] text-flyd-ink/70 transition-colors group-hover:text-flyd-teal-dark">
                  Se kontoret →
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section tone="ink" size="lg">
        <Container>
          <div className="max-w-3xl" data-reveal>
            <Eyebrow tone="paper">Kontakt</Eyebrow>
            <h2 className="mt-5 font-display text-display-lg font-semibold">
              Skal vi ta en prat i {office.city}?
            </h2>
            <p className="mt-8 max-w-xl text-[17px] leading-[1.75] text-flyd-paper/80">
              Fortell oss om virksomheten din, så finner vi ut hvordan vi kan
              hjelpe – på kontoret, hos deg eller i en videosamtale.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <ButtonLink href="/kontakt" variant="teal" withArrow accent>
                Snakk med oss
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
