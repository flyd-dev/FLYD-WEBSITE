import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Plus } from "lucide-react";
import Container from "@/components/Container";
import Section from "@/components/Section";
import Eyebrow from "@/components/Eyebrow";
import Breadcrumbs from "@/components/Breadcrumbs";
import Bekreft from "@/components/Bekreft";
import JsonLd from "@/components/JsonLd";
import FlydIcon from "@/components/FlydIcon";
import GoogleAnmeldelse from "@/components/GoogleAnmeldelse";
import NumberedList from "@/components/NumberedList";
import { ButtonLink, TextLink } from "@/components/Button";
import { siteUrl } from "@/lib/seo";
import {
  offices,
  openingHours,
  atOffice,
  officeLabel,
  type Office,
} from "@/data/offices";
import type { Kontorside } from "@/data/kontorsider";

/**
 * Utvidet kontorside (/kontor/[slug]/) for kontorer med eget innhold i
 * data/kontorsider.ts. Øvrige kontorer bruker standardsiden i
 * app/kontor/[slug]/page.tsx.
 *
 * Siden har nøyaktig én Korall-knapp (primærknappen i heroen). Alle andre
 * handlinger er kontur, tekstlenker eller Mint-knappen i avslutningsboksen.
 *
 * [BEKREFT]-plassholderne vises alltid, slik at byggesjekken
 * (scripts/sjekk-bekreft.mjs) stopper produksjonsbygg til innholdet er levert.
 * De står aldri i JSON-LD.
 */
export default function KontorMal({
  office,
  side,
}: {
  office: Office;
  side: Kontorside;
}) {
  const url = `${siteUrl}/kontor/${office.slug}/`;
  const andre = offices.filter((o) => o.slug !== office.slug);

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "AccountingService"],
    // Samme @id som kontoret i layoutens @graph, så Google ser én enhet.
    "@id": `${siteUrl}/#office-${office.city.toLowerCase()}`,
    name: side.schemaName,
    parentOrganization: {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Flyd AS",
      url: siteUrl,
    },
    url,
    image: `${siteUrl}${office.image?.src ?? "/brand/flyd-teal.png"}`,
    telephone: "+4748019958",
    email: "support@flyd.no",
    description: side.description,
    address: {
      "@type": "PostalAddress",
      ...(office.street && { streetAddress: office.street }),
      postalCode: office.postal.split(" ")[0],
      addressLocality: office.postal.split(" ").slice(1).join(" "),
      addressCountry: "NO",
    },
    ...(office.lat != null &&
      office.lng != null && {
        geo: {
          "@type": "GeoCoordinates",
          latitude: office.lat,
          longitude: office.lng,
        },
      }),
    ...(office.mapsUrl && { hasMap: office.mapsUrl }),
    openingHours: "Mo-Fr 07:00-16:00",
    openingHoursSpecification: openingHours.schema,
    areaServed: side.areaServed.map((name) => ({ "@type": "City", name })),
  };

  // Bare spørsmål med ferdig svar. Svaret er det samme som vises på siden.
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: side.faq
      .filter((f) => f.a)
      .map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
  };

  const visitRow = "flex items-start gap-3";
  const visitIcon = "mt-0.5 h-5 w-5 flex-shrink-0 text-flyd-teal";
  const visitLink =
    "text-flyd-skog decoration-flyd-teal decoration-2 underline-offset-4 transition-colors hover:text-flyd-petrol hover:underline";
  const brod = "text-[17px] leading-[1.7] text-flyd-skifer";
  // Kort strek i Flyd-teal over korttitler, som i designutkastet.
  const strek = "block h-1 w-8 rounded-pille bg-flyd-teal";

  return (
    <>
      <JsonLd data={localBusinessJsonLd} />
      <JsonLd data={faqJsonLd} />

      {/* HERO – avrundet Skog-flate. Korall-knappen her er den eneste på siden. */}
      <Section tone="sand" size="sm" className="!pb-0 !pt-6 md:!pt-8">
        <Container>
          <Breadcrumbs
            items={[
              { name: "Kontorer", href: "/kontor/" },
              { name: office.city, href: `/kontor/${office.slug}/` },
            ]}
          />
        </Container>
        <div className="mx-auto mt-6 w-full max-w-[1400px] px-3 md:px-6">
          <div className="on-dark relative overflow-hidden rounded-bilde bg-flyd-skog text-flyd-sand">
            <Container className="py-16 md:py-24">
              <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-8">
                  <span
                    aria-hidden="true"
                    className="block h-1 w-10 rounded-pille bg-flyd-teal"
                  />
                  <Eyebrow tone="petrol" className="mt-6">
                    {side.kicker}
                  </Eyebrow>
                  <h1 className="mt-5 font-display text-display-xl font-semibold text-flyd-sand">
                    {side.h1}
                  </h1>
                  <p className="mt-8 max-w-2xl text-[18px] leading-[1.65] text-flyd-dempet">
                    {side.ingress}
                  </p>
                  <div className="mt-10 flex flex-wrap items-center gap-4">
                    <ButtonLink
                      href="/kontakt"
                      variant="primary-dark"
                      withArrow
                    >
                      Snakk med oss
                    </ButtonLink>
                    <ButtonLink
                      href="tel:+4748019958"
                      variant="secondary-dark"
                      external
                    >
                      Ring +47 480 19 958
                    </ButtonLink>
                  </div>
                </div>
                {/* Dekor: Petrol-sirkel med Mint-ring og Mint-prikk */}
                <div
                  aria-hidden="true"
                  className="hidden lg:col-span-4 lg:flex lg:justify-end"
                >
                  <div className="relative flex aspect-square w-full max-w-[380px] items-center justify-center rounded-pille bg-flyd-petrol">
                    <div className="aspect-square w-[74%] rounded-pille border-2 border-flyd-mint/50" />
                    <div className="absolute bottom-[8%] right-[10%] aspect-square w-[29%] rounded-pille bg-flyd-mint/90" />
                  </div>
                </div>
              </div>
            </Container>
          </div>
        </div>
      </Section>

      {/* TJENESTER – hele kortet er en lenke */}
      <Section tone="sand">
        <Container>
          <div className="max-w-3xl" data-reveal>
            <Eyebrow>{side.tjenester.kicker}</Eyebrow>
            <h2 className="mt-5 font-display text-display-lg font-semibold">
              {side.tjenester.title}
            </h2>
            <p className={`mt-6 ${brod}`}>{side.tjenester.intro}</p>
          </div>
          <ul className="stagger mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
            {side.tjenester.punkter.map((p, i) => (
              <li
                key={p.title}
                data-reveal
                style={{ "--i": i } as React.CSSProperties}
              >
                <Link
                  href={p.href}
                  className="lenkekort group flex h-full flex-col rounded-kort border border-flyd-linje-sand bg-flyd-sand p-7 hover:bg-flyd-lysmint"
                >
                  <span aria-hidden="true" className={strek} />
                  <h3 className="mt-5 font-display text-[21px] font-semibold leading-tight text-flyd-skog transition-colors duration-200 group-hover:text-flyd-petrol">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-[16px] leading-relaxed text-flyd-skifer">
                    {p.text}
                  </p>
                  <span className="mt-auto flex items-center gap-1.5 pt-5 text-[16px] font-medium text-flyd-petrol">
                    <span className="underline decoration-flyd-teal decoration-2 underline-offset-[6px]">
                      {p.lenketekst}
                    </span>
                    <ArrowRight
                      className="lenkekort-pil h-4 w-4 flex-shrink-0"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {/* ERP: differensiatoren, på mørk flate */}
          <div
            className="on-dark mt-5 rounded-kort bg-flyd-petrol p-7 md:p-10"
            data-reveal
          >
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-7">
                <h3 className="font-display text-[26px] font-semibold leading-tight text-flyd-sand">
                  {side.tjenester.erp.title}
                </h3>
                {side.tjenester.erp.avsnitt.map((t) => (
                  <p
                    key={t}
                    className="mt-4 text-[17px] leading-[1.65] text-flyd-dempet"
                  >
                    {t}
                  </p>
                ))}
                <div className="mt-6">
                  <TextLink href={side.tjenester.erp.href} tone="dark">
                    {side.tjenester.erp.lenketekst}
                  </TextLink>
                </div>
              </div>
              <div className="lg:col-span-5">
                <Eyebrow tone="petrol">Systemer vi jobber med</Eyebrow>
                <ul className="mt-4 border-t border-flyd-sand/15">
                  {side.tjenester.erp.systemer.map((s) => (
                    <li
                      key={s}
                      className="flex items-center gap-3 border-b border-flyd-sand/15 py-4 text-[17px] text-flyd-sand"
                    >
                      <Check
                        className="h-4 w-4 flex-shrink-0 text-flyd-mint"
                        strokeWidth={2.5}
                        aria-hidden="true"
                      />
                      {s}
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <TextLink href="/tjenester/integrasjoner/" tone="dark">
                    Les om integrasjoner
                  </TextLink>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* PRISER OG TEAM – Lys mint, overskriftene stablet som i designutkastet */}
      <Section tone="lysmint">
        <Container>
          <div className="max-w-3xl" data-reveal>
            <Eyebrow>{side.pris.kicker}</Eyebrow>
            <h2 className="mt-5 font-display text-display-lg font-semibold">
              {side.pris.title}
            </h2>
            {side.pris.bekreft && (
              <Bekreft className="mt-6">{side.pris.bekreft}</Bekreft>
            )}
          </div>
          <div
            className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16"
            data-reveal
          >
            <div className="lg:col-span-5">
              <p className={brod}>{side.pris.intro}</p>
              <p className={`mt-6 ${brod}`}>{side.pris.avslutning}</p>
            </div>
            <ul className="border-t border-flyd-linje-mint lg:col-span-7">
              {side.pris.faktorer.map((f) => (
                <li
                  key={f}
                  className="flex gap-3 border-b border-flyd-linje-mint py-4 text-[16px] text-flyd-skog"
                >
                  <Check
                    className="mt-1 h-4 w-4 flex-shrink-0 text-flyd-teal"
                    strokeWidth={2.5}
                    aria-hidden="true"
                  />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-20 md:mt-24" data-reveal>
            <Eyebrow>{side.team.kicker}</Eyebrow>
            <h2 className="mt-5 font-display text-display-lg font-semibold">
              {side.team.title}
            </h2>
            <p className={`mt-6 max-w-3xl ${brod}`}>{side.team.text}</p>
            <div className="mt-6">
              <TextLink href="/om-flyd/">
                Les mer om Flyd og folkene våre
              </TextLink>
            </div>
          </div>
          {/* Egne kort i stedet for TeamCard: bare navn, rolle og bilde, uten merkepiller. */}
          <ul className="stagger mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-4">
            {side.team.ansatte.map((a, i) => (
              <li
                key={a.name}
                data-reveal
                style={{ "--i": i } as React.CSSProperties}
                className="flex flex-col rounded-kort bg-flyd-sand p-3 pb-6"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-flis bg-flyd-linje-mint">
                  <Image
                    src={a.image}
                    alt={a.name}
                    fill
                    sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 90vw"
                    className="object-cover object-top"
                  />
                </div>
                <div className="px-3 pt-5">
                  <h3 className="font-display text-[19px] font-semibold leading-tight text-flyd-skog">
                    {a.name}
                  </h3>
                  {a.role && (
                    <p className="mt-1 text-[15px] leading-snug text-flyd-skifer">
                      {a.role}
                    </p>
                  )}
                  {a.bekreft && <Bekreft className="mt-3">{a.bekreft}</Bekreft>}
                </div>
              </li>
            ))}
          </ul>
          {side.team.bekreft && (
            <Bekreft className="mt-6">{side.team.bekreft}</Bekreft>
          )}
        </Container>
      </Section>

      {/* LOKALT: kontoret på Forus, med besøksinfo */}
      <Section tone="sand">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7" data-reveal>
              <Eyebrow>{side.lokalt.kicker}</Eyebrow>
              <h2 className="mt-5 font-display text-display-lg font-semibold">
                {side.lokalt.title}
              </h2>
              <div className="mt-8 space-y-5">
                {side.lokalt.avsnitt.map((t) => (
                  <p key={t} className={brod}>
                    {t}
                  </p>
                ))}
                {side.lokalt.bekreft?.map((b) => (
                  <Bekreft key={b}>{b}</Bekreft>
                ))}
              </div>
            </div>

            <aside className="lg:col-span-5" data-reveal>
              {office.image && (
                <div className="relative mb-4 aspect-[3/2] overflow-hidden rounded-bilde bg-flyd-lysmint">
                  <Image
                    src={office.image.src}
                    alt={office.image.alt}
                    fill
                    sizes="(min-width:1024px) 40vw, 100vw"
                    className="object-cover"
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
                        {office.street && (
                          <>
                            {office.street}
                            <br />
                          </>
                        )}
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
                {office.mapsUrl && (
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
                )}
                <GoogleAnmeldelse url={office.reviewUrl} />
              </div>
            </aside>
          </div>
          {office.gallery && office.gallery.length > 0 && (
            <div
              className={`mt-12 grid grid-cols-1 gap-4 md:gap-5 ${
                office.gallery.length === 2
                  ? "sm:grid-cols-2"
                  : "sm:grid-cols-3"
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
          )}
        </Container>
      </Section>

      {/* PASSER FOR */}
      <Section tone="lysmint">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5" data-reveal>
              <Eyebrow>{side.passerFor.kicker}</Eyebrow>
              <h2 className="mt-5 font-display text-display-lg font-semibold">
                {side.passerFor.title}
              </h2>
              <p className={`mt-6 ${brod}`}>{side.passerFor.intro}</p>
            </div>
            <div className="lg:col-span-7">
              <NumberedList items={side.passerFor.punkter} />
              {side.passerFor.bekreft && side.passerFor.bekreft.length > 0 && (
                <div className="mt-8 space-y-4" data-reveal>
                  {side.passerFor.bekreft.map((b) => (
                    <Bekreft key={b}>{b}</Bekreft>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Container>
      </Section>

      {/* SLIK KOMMER DU I GANG – Petrol som seksjonsskille */}
      <Section tone="petrol" flyt>
        <Container>
          <div className="max-w-3xl" data-reveal>
            <Eyebrow tone="petrol">{side.kommIGang.kicker}</Eyebrow>
            <h2 className="mt-5 font-display text-display-lg font-semibold text-flyd-sand">
              {side.kommIGang.title}
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <ol className="relative lg:col-span-7" data-reveal>
              <span
                aria-hidden="true"
                className="prosesslinje absolute bottom-6 left-[23px] top-6 w-0.5 bg-flyd-mint/40"
              />
              {side.kommIGang.steg.map((p, i) => (
                <li
                  key={p.title}
                  className="relative flex gap-6 pb-10 last:pb-0"
                >
                  <span className="relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-pille bg-flyd-skog font-display text-[20px] font-semibold text-flyd-korall">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="pt-2">
                    <h3 className="font-display text-[20px] font-semibold text-flyd-sand">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-[16px] leading-relaxed text-flyd-dempet">
                      {p.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <aside className="lg:col-span-5" data-reveal>
              <div className="rounded-kort bg-flyd-skog p-7 md:p-8">
                <Eyebrow tone="dark">Har du regnskapsfører fra før?</Eyebrow>
                <p className="mt-4 text-[17px] leading-[1.65] text-flyd-dempet">
                  {side.kommIGang.bytte.text}
                </p>
                <div className="mt-6">
                  <TextLink href={side.kommIGang.bytte.href} tone="dark">
                    {side.kommIGang.bytte.lenketekst}
                  </TextLink>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      {/* VANLIGE SPØRSMÅL – hvert spørsmål på egen Lys mint-flis */}
      <Section tone="sand">
        <Container>
          <div data-reveal>
            <Eyebrow>Spørsmål og svar</Eyebrow>
            <h2 className="mt-5 font-display text-display-lg font-semibold">
              Ofte stilte spørsmål
            </h2>
            <div className="mt-8 space-y-3">
              {side.faq.map((f, i) => (
                <details
                  key={f.q}
                  open={i === 0}
                  className="faq group rounded-flis bg-flyd-lysmint px-6"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-flis py-5 font-display text-[18px] font-semibold text-flyd-skog transition-colors duration-200 hover:text-flyd-petrol">
                    {f.q}
                    <Plus
                      className="faq-pil h-5 w-5 flex-shrink-0 text-flyd-teal"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                  </summary>
                  <div className="faq-svar space-y-4 pb-6">
                    {f.a && (
                      <p className="text-[16px] leading-relaxed text-flyd-skifer">
                        {f.a}
                      </p>
                    )}
                    {f.lenke && (
                      <TextLink href={f.lenke.href}>{f.lenke.tekst}</TextLink>
                    )}
                    {f.bekreft && <Bekreft>{f.bekreft}</Bekreft>}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* AVSLUTNING – Petrol-boks med Mint-knapp (ikke Korall: heroen har sidens eneste) */}
      <Section tone="sand" className="!pt-0">
        <Container>
          <div
            className="on-dark relative overflow-hidden rounded-bilde bg-flyd-petrol p-8 md:p-14"
            data-reveal
          >
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <Eyebrow tone="petrol">{side.kontakt.kicker}</Eyebrow>
                <h2 className="mt-5 font-display text-display-lg font-semibold text-flyd-sand">
                  {side.kontakt.title}
                </h2>
                <p className="mt-6 max-w-xl text-[18px] leading-[1.65] text-flyd-dempet">
                  {side.kontakt.text}
                </p>
                <div className="mt-8">
                  <ButtonLink
                    href="/kontakt"
                    variant="secondary-dark"
                    withArrow
                    className="!bg-flyd-mint !text-flyd-skog hover:!border-flyd-sand hover:!bg-flyd-sand"
                  >
                    Snakk med oss
                  </ButtonLink>
                </div>
              </div>
              <div
                aria-hidden="true"
                className="hidden lg:col-span-4 lg:flex lg:justify-end"
              >
                <div className="flex aspect-square w-full max-w-[260px] items-center justify-center rounded-pille border-2 border-flyd-mint/50">
                  <div className="aspect-square w-[38%] rounded-pille bg-flyd-teal" />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ANDRE KONTORER – kort, én linje per kontor */}
      <Section tone="lysmint" size="sm">
        <Container>
          <div className="max-w-3xl" data-reveal>
            <Eyebrow>{side.andreKontorer.kicker}</Eyebrow>
            <h2 className="mt-5 font-display text-display-md font-semibold">
              {side.andreKontorer.title}
            </h2>
            <ul className="mt-8 border-t border-flyd-linje-mint">
              {andre.map((o) => (
                <li key={o.slug}>
                  <Link
                    href={`/kontor/${o.slug}/`}
                    className="group flex items-center justify-between gap-4 border-b border-flyd-linje-mint py-4 text-[17px] text-flyd-skog transition-colors hover:text-flyd-petrol"
                  >
                    <span>
                      <span className="font-display font-semibold">
                        Regnskapsfører {atOffice(o)}
                      </span>
                      <span className="text-flyd-skifer">
                        {" "}
                        – {[o.street, o.postal].filter(Boolean).join(", ")}
                      </span>
                    </span>
                    <ArrowRight
                      className="h-5 w-5 flex-shrink-0 text-flyd-teal transition-transform duration-200 group-hover:translate-x-1"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>
    </>
  );
}
