import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import Container from "@/components/Container";
import Section from "@/components/Section";
import Eyebrow from "@/components/Eyebrow";
import ClosingCta from "@/components/ClosingCta";
import OfficeCards from "@/components/OfficeCards";
import { ButtonLink } from "@/components/Button";
import JsonLd from "@/components/JsonLd";
import ServiceIcon from "@/components/ServiceIcon";
import FlydIcon from "@/components/FlydIcon";
import { offices, getOfficeBySlug, openingHours, atOffice, officeLabel } from "@/data/offices";
import { visibleServices, serviceUrl } from "@/data/services";
import Breadcrumbs from "@/components/Breadcrumbs";

const SITE_URL = "https://www.flyd.no";

export function generateStaticParams() {
  return offices.map((o) => ({ slug: o.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const office = getOfficeBySlug(params.slug);
  if (!office) return { title: "Kontor ikke funnet" };
  return pageMetadata({
    title: `Regnskapsfører ${atOffice(office)}`,
    description: `${office.blurb} Regnskap, rådgivning og teknologi – lokalt ${atOffice(office)}.`,
    path: `/kontor/${office.slug}/`,
  });
}

export default function KontorPage({ params }: { params: { slug: string } }) {
  const office = getOfficeBySlug(params.slug);
  if (!office) notFound();

  const otherOffices = offices.filter((o) => o.slug !== office.slug);

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "AccountingService"],
    "@id": `${SITE_URL}/#office-${office.city.toLowerCase()}`,
    name: `Flyd ${office.city}`,
    parentOrganization: { "@id": `${SITE_URL}/#organization` },
    url: `${SITE_URL}/kontor/${office.slug}/`,
    image: `${SITE_URL}/brand/flyd-teal.png`,
    telephone: "+4748019958",
    email: "support@flyd.no",
    description: office.blurb,
    address: {
      "@type": "PostalAddress",
      streetAddress: office.street,
      postalCode: office.postal.split(" ")[0],
      addressLocality: office.postal.split(" ").slice(1).join(" "),
      addressCountry: "NO",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: office.lat,
      longitude: office.lng,
    },
    hasMap: office.mapsUrl,
    openingHoursSpecification: openingHours.schema,
  };

  const visitRow = "flex items-start gap-3";
  const visitIcon = "mt-0.5 h-5 w-5 flex-shrink-0 text-flyd-teal";
  const visitLink =
    "text-flyd-skog decoration-flyd-teal decoration-2 underline-offset-4 transition-colors hover:text-flyd-petrol hover:underline";

  return (
    <>
      <JsonLd data={localBusinessJsonLd} />

      {/* HERO */}
      <Section tone="sand" className="pt-10 md:pt-14" flyt>
        <Container>
          <Breadcrumbs
            items={[
              { name: "Kontorer", href: "/kontor/" },
              { name: office.city, href: `/kontor/${office.slug}/` },
            ]}
          />

          <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Eyebrow>Kontor · {office.name}</Eyebrow>
              <h1 className="mt-6 font-display text-display-xl font-semibold">
                Regnskapsfører {atOffice(office)}.
              </h1>
              <p className="mt-8 max-w-2xl font-display text-ingress font-medium text-flyd-petrol">
                {office.blurb}
              </p>
              <p className="mt-5 max-w-2xl text-[17px] leading-[1.7] text-flyd-skifer">
                Som kunde hos Flyd får du mer enn løpende regnskap: rådgivning,
                riktig forretningssystem og integrasjoner som fjerner manuelt
                arbeid – og en fast kontaktperson som kjenner virksomheten din.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <ButtonLink href="/kontakt" variant="primary" withArrow>
                  Snakk med oss
                </ButtonLink>
                <ButtonLink href="tel:+4748019958" variant="secondary" external>
                  Ring oss
                </ButtonLink>
              </div>
            </div>

            <aside className="lg:col-span-5">
              <div className="lg:sticky lg:top-24">
                {office.image && (
                  <div className="relative mb-4 aspect-[3/2] overflow-hidden rounded-bilde bg-flyd-lysmint">
                    <Image
                      src={office.image.src}
                      alt={office.image.alt}
                      fill
                      sizes="(min-width:1024px) 40vw, 100vw"
                      className="object-cover"
                      priority
                    />
                  </div>
                )}
                <div className="rounded-kort bg-flyd-lysmint p-7 md:p-8">
                  <Eyebrow>Besøk oss</Eyebrow>
                  <div className="mt-5 space-y-4 text-[16px]">
                    <div className={visitRow}>
                      <FlydIcon name="lokal" className={visitIcon} />
                      <div>
                        <div className="font-display font-semibold">
                          {officeLabel(office)}
                        </div>
                        <div className="mt-0.5 text-flyd-skifer">
                          {office.street}
                          <br />
                          {office.postal}
                        </div>
                      </div>
                    </div>
                    <div className={visitRow}>
                      <FlydIcon name="telefon" className={visitIcon} />
                      <a href="tel:+4748019958" className={visitLink}>
                        +47 480 19 958
                      </a>
                    </div>
                    <div className={visitRow}>
                      <FlydIcon name="epost" className={visitIcon} />
                      <a href="mailto:support@flyd.no" className={visitLink}>
                        support@flyd.no
                      </a>
                    </div>
                    <div className={visitRow}>
                      <FlydIcon name="klokke" className={visitIcon} />
                      <span>{openingHours.label}</span>
                    </div>
                  </div>
                  <div className="mt-7">
                    <ButtonLink
                      href={office.mapsUrl}
                      variant="secondary"
                      withArrow
                      external
                      className="w-full"
                    >
                      Åpne i Google Maps
                    </ButtonLink>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      {/* BILDER FRA KONTORET – kun når kontoret har egne bilder */}
      {office.gallery && office.gallery.length > 0 && (
        <Section tone="sand" className="!pt-0">
          <Container>
            <div className="border-t border-flyd-linje-sand pt-12 md:pt-16" data-reveal>
              <Eyebrow>Fra kontoret</Eyebrow>
              <h2 className="mt-5 font-display text-display-md font-semibold">
                Hos oss {atOffice(office)}.
              </h2>
            </div>
            <div
              className={`mt-10 grid grid-cols-1 gap-4 md:gap-5 ${
                office.gallery.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3"
              }`}
            >
              {office.gallery.map((img) => (
                <div
                  key={img.src}
                  data-reveal
                  className="relative aspect-[4/3] overflow-hidden rounded-bilde bg-flyd-lysmint"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes={
                      office.gallery!.length === 2
                        ? "(min-width: 640px) 50vw, 100vw"
                        : "(min-width: 640px) 33vw, 100vw"
                    }
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* TJENESTER LOKALT – Petrol som seksjonsskille */}
      <Section tone="petrol" flyt>
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5" data-reveal>
              <Eyebrow tone="petrol">Det hjelper vi deg med</Eyebrow>
              <h2 className="mt-5 font-display text-display-lg font-semibold text-flyd-sand">
                Alt du trenger – også {atOffice(office)}.
              </h2>
              <p className="mt-6 max-w-md text-[17px] leading-[1.65] text-flyd-dempet">
                Samme tjenester, samme fagmiljø og samme systemer på alle
                kontorene våre – forskjellen er at vi møter deg der du er.
              </p>
              <div className="mt-8">
                <ButtonLink href="/tjenester" variant="secondary-dark" withArrow>
                  Utforsk alle tjenester
                </ButtonLink>
              </div>
            </div>
            <div className="lg:col-span-7" data-reveal>
              <ul className="border-t border-flyd-sand/15">
                {visibleServices.map((s) => (
                  <li key={s.id}>
                    <Link
                      href={serviceUrl(s)}
                      className="group flex items-center justify-between gap-4 border-b border-flyd-sand/15 py-5 transition-colors hover:text-flyd-mint"
                    >
                      <span className="flex items-center gap-4">
                        <ServiceIcon
                          name={s.icon}
                          className="h-6 w-6 flex-shrink-0 text-flyd-mint"
                          dotClassName="fill-flyd-korall"
                        />
                        <span className="text-[17px] text-flyd-sand group-hover:text-flyd-mint">
                          {s.title}
                        </span>
                      </span>
                      <ArrowRight
                        className="h-5 w-5 flex-shrink-0 text-flyd-mint transition-transform duration-200 group-hover:translate-x-1"
                        strokeWidth={2}
                        aria-hidden="true"
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
      <Section tone="lysmint">
        <Container>
          <div className="max-w-2xl" data-reveal>
            <Eyebrow>Andre kontorer</Eyebrow>
            <h2 className="mt-5 font-display text-display-md font-semibold">
              Vi er også nær deg andre steder.
            </h2>
          </div>
          <OfficeCards offices={otherOffices} compact className="mt-10" />
        </Container>
      </Section>

      <ClosingCta
        kicker="Kontakt"
        title={`Skal vi ta en prat ${atOffice(office)}?`}
        text="Fortell oss om virksomheten din, så finner vi ut hvordan vi kan hjelpe – på kontoret, hos deg eller i en videosamtale."
      />
    </>
  );
}
