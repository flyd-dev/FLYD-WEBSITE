import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import Container from "@/components/Container";
import Section from "@/components/Section";
import Eyebrow from "@/components/Eyebrow";
import Breadcrumbs from "@/components/Breadcrumbs";
import Bekreft from "@/components/Bekreft";
import JsonLd from "@/components/JsonLd";
import FlydIcon from "@/components/FlydIcon";
import GoogleAnmeldelse from "@/components/GoogleAnmeldelse";
import TeamCard from "@/components/TeamCard";
import ClosingCta from "@/components/ClosingCta";
import BildeAkkordeon from "@/components/BildeAkkordeon";
import { ButtonLink, TextLink } from "@/components/Button";
import { siteUrl } from "@/lib/seo";
import {
  offices,
  openingHours,
  atOffice,
  officeLabel,
  type Office,
} from "@/data/offices";
import { getKontorside, kontorFaq } from "@/data/kontorsider";
import { regionTjenester } from "@/data/kontoroversikt";
import { revisjonOmtale } from "@/data/revisjon";
import { kontorTeam } from "@/data/team";

/**
 * Kontorsiden (/kontor/[slug]/). Alle seks kontorene har de samme seksjonene i
 * samme rekkefølge: topp med fasadebilde, tjenester, fra kontoret, folkene,
 * spørsmål og avslutning. Sandnes har utvidet tekst i data/kontorsider.ts; de
 * andre bruker tjenestelisten fra /kontor og spørsmålene i `kontorSporsmal`.
 *
 * Pris, oppstart og hvem vi passer for står som spørsmål med svar, ikke som
 * egne seksjoner, så siden er kort å lese, men har teksten for søk.
 *
 * [BEKREFT]-plassholderne vises alltid, slik at byggesjekken
 * (scripts/sjekk-bekreft.mjs) stopper produksjonsbygg til innholdet er levert.
 * De står aldri i JSON-LD.
 */
export default function KontorMal({ office }: { office: Office }) {
  const side = getKontorside(office.slug);
  const faq = kontorFaq(office.slug);
  const team = kontorTeam[office.slug] ?? [];
  const andre = offices.filter((o) => o.slug !== office.slug);
  const url = `${siteUrl}/kontor/${office.slug}/`;
  const sted = atOffice(office);

  const h1 =
    side?.h1 ??
    `${office.revisjon ? "Regnskapsfører og revisor" : "Regnskapsfører"} ${sted}`;
  const tjenester = side?.tjenester.punkter ?? regionTjenester;

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "AccountingService"],
    // Samme @id som kontoret i layoutens @graph, så Google ser én enhet.
    "@id": `${siteUrl}/#office-${office.city.toLowerCase()}`,
    name: side?.schemaName ?? `Flyd ${office.city}`,
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
    description: side?.description ?? office.meta?.description ?? office.blurb,
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
    openingHoursSpecification: openingHours.schema,
    ...(side
      ? { areaServed: side.areaServed.map((name) => ({ "@type": "City", name })) }
      : office.areaServed && {
          areaServed: office.areaServed.map(({ type, name }) => ({
            "@type": type,
            name,
          })),
        }),
  };

  // Bare spørsmål med ferdig svar. Svaret er det samme som vises på siden.
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq
      .filter((f) => f.a)
      .map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: [f.a, ...(f.punkter ?? [])].join(" "),
        },
      })),
  };

  const visitRow = "flex items-start gap-3";
  const visitIcon = "mt-0.5 h-5 w-5 flex-shrink-0 text-flyd-teal";
  const visitLink =
    "text-flyd-skog decoration-flyd-teal decoration-2 underline-offset-4 transition-colors hover:text-flyd-petrol hover:underline";
  const brod = "text-[17px] leading-[1.7] text-flyd-skifer";
  const kontorLenke =
    "font-medium text-flyd-petrol underline decoration-flyd-teal decoration-2 underline-offset-4 transition-colors hover:text-flyd-skog";

  return (
    <>
      <JsonLd data={localBusinessJsonLd} />
      <JsonLd data={faqJsonLd} />

      {/* TOPP – tittel, ingress og fasadebilde */}
      <Section tone="sand" className="pt-10 md:pt-14">
        <Container>
          <Breadcrumbs
            items={[
              { name: "Kontorer", href: "/kontor/" },
              { name: office.city, href: `/kontor/${office.slug}/` },
            ]}
          />
          <div className="mt-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Eyebrow>{side?.kicker ?? `Kontor · ${office.name}`}</Eyebrow>
              <h1 className="mt-6 font-display text-display-xl font-semibold">{h1}</h1>
              <p className="mt-8 max-w-2xl text-[18px] leading-[1.65] text-flyd-skifer">
                {side?.ingress ?? office.blurb}
              </p>
              {/* Revisjon står for seg, ikke som en del av regnskapstilbudet (uavhengighet). */}
              {office.revisjon && (
                <div className="mt-8 max-w-2xl border-t border-flyd-linje-sand pt-8">
                  <Eyebrow as="h2">Revisor {sted}</Eyebrow>
                  <p className={`mt-4 ${brod}`}>Revisjonsteamet vårt holder til her. {revisjonOmtale}</p>
                  <div className="mt-5">
                    <TextLink href="/tjenester/revisjon/">Les om revisjon</TextLink>
                  </div>
                </div>
              )}
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <ButtonLink href="/kontakt" variant="primary" withArrow>
                  Snakk med oss
                </ButtonLink>
                <ButtonLink href="tel:+4748019958" variant="secondary" external>
                  Ring +47 480 19 958
                </ButtonLink>
              </div>
            </div>
            {office.image && (
              <div className="lg:col-span-5">
                <div className="relative aspect-[4/3] overflow-hidden rounded-bilde bg-flyd-lysmint">
                  <Image
                    src={office.image.src}
                    alt={office.image.alt}
                    fill
                    priority
                    sizes="(min-width:1024px) 40vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </Container>
      </Section>

      {/* TJENESTER – Petrol som seksjonsskille, samme liste som på /kontor */}
      <Section tone="petrol" flyt>
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5" data-reveal>
              <Eyebrow tone="petrol">Tjenester</Eyebrow>
              <h2 className="mt-5 font-display text-display-lg font-semibold text-flyd-sand">
                {side?.tjenester.title ?? `Dette hjelper vi bedrifter ${sted} med`}
              </h2>
              <p className="mt-6 max-w-md text-[17px] leading-[1.65] text-flyd-dempet">
                {side?.tjenester.intro ??
                  "Samme tjenester, samme fagmiljø og samme systemer på alle kontorene våre – forskjellen er at vi møter deg der du er."}
              </p>
            </div>
            <ul className="border-t border-flyd-sand/15 lg:col-span-7" data-reveal>
              {tjenester.map((t) => (
                <li key={t.title}>
                  <Link
                    href={t.href}
                    className="group flex items-start justify-between gap-6 border-b border-flyd-sand/15 py-5 transition-colors"
                  >
                    <span>
                      <span className="block font-display text-[18px] font-semibold text-flyd-sand transition-colors group-hover:text-flyd-mint">
                        {t.title}
                      </span>
                      <span className="mt-1.5 block text-[15px] leading-relaxed text-flyd-dempet">{t.text}</span>
                    </span>
                    <ArrowRight
                      className="mt-1 h-5 w-5 flex-shrink-0 text-flyd-mint transition-transform duration-200 group-hover:translate-x-1"
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

      {/* FRA KONTORET – besøksinfo og bilder */}
      <Section tone="sand">
        <Container>
          <div className="max-w-3xl" data-reveal>
            <Eyebrow>Fra kontoret</Eyebrow>
            <h2 className="mt-5 font-display text-display-lg font-semibold">
              {side?.lokalt.title ?? `Hos oss ${sted}`}
            </h2>
            {side && (
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
            )}
          </div>
          <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-12">
            <div className="rounded-kort bg-flyd-lysmint p-7 md:p-8 lg:col-span-4" data-reveal>
              <Eyebrow as="h3">Besøk oss</Eyebrow>
              <div className="mt-5 space-y-4 text-[16px]">
                <div className={visitRow}>
                  <FlydIcon name="lokal" className={visitIcon} />
                  <div>
                    <div className="font-display font-semibold">{officeLabel(office)}</div>
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
                  <ButtonLink href={office.mapsUrl} variant="secondary" withArrow external className="w-full">
                    Åpne i Google Maps
                  </ButtonLink>
                </div>
              )}
              <GoogleAnmeldelse url={office.reviewUrl} />
            </div>
            {/* Bildene fra kontoret åpner seg ved hover, fokus eller trykk. */}
            {office.gallery && office.gallery.length > 0 && (
              // På desktop like høy som besøkskortet ved siden av.
              <BildeAkkordeon className="lg:col-span-8 lg:!h-auto lg:min-h-[420px]" hoyde="liten" flater={office.gallery} />
            )}
          </div>
        </Container>
      </Section>

      {/* FOLKENE – fra kontorTeam i data/team.ts, kontorlederen først */}
      {team.length > 0 && (
        <Section tone="lysmint">
          <Container>
            <div data-reveal>
              <Eyebrow>Folkene</Eyebrow>
              <h2 className="mt-5 font-display text-display-lg font-semibold">Møt teamet {sted}</h2>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
              {team.map((m) => (
                <TeamCard key={m.email} m={m} tone="sand" />
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* SPØRSMÅL – pris, oppstart, systemer og bytte; så de andre kontorene */}
      <Section tone="sand">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5" data-reveal>
              <Eyebrow>Spørsmål og svar</Eyebrow>
              <h2 className="mt-5 font-display text-display-lg font-semibold">
                Spørsmål om regnskapsfører {sted}
              </h2>
            </div>
            <div className="space-y-3 lg:col-span-7" data-reveal>
              {faq.map((f) => (
                <details key={f.q} className="faq group rounded-flis bg-flyd-lysmint px-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-flis py-5 font-display text-[18px] font-semibold text-flyd-skog transition-colors duration-200 hover:text-flyd-petrol">
                    <span className="min-w-0 break-words max-sm:hyphens-auto">{f.q}</span>
                    <Plus className="faq-pil h-5 w-5 flex-shrink-0 text-flyd-teal" strokeWidth={2} aria-hidden="true" />
                  </summary>
                  <div className="faq-svar space-y-4 pb-6 text-[16px] leading-relaxed text-flyd-skifer">
                    {f.a && <p>{f.a}</p>}
                    {f.punkter &&
                      (f.nummerert ? (
                        <ol className="list-decimal space-y-2 pl-5 marker:font-semibold marker:text-flyd-petrol">
                          {f.punkter.map((p) => (
                            <li key={p}>{p}</li>
                          ))}
                        </ol>
                      ) : (
                        <ul className="list-disc space-y-2 pl-5 marker:text-flyd-teal">
                          {f.punkter.map((p) => (
                            <li key={p}>{p}</li>
                          ))}
                        </ul>
                      ))}
                    {f.lenke && <TextLink href={f.lenke.href}>{f.lenke.tekst}</TextLink>}
                    {f.bekreft && <Bekreft>{f.bekreft}</Bekreft>}
                  </div>
                </details>
              ))}
            </div>
          </div>

          {/* De andre kontorene som en lenkerad (alle står også i footeren). */}
          <nav aria-label="Andre kontorer" className="mt-16 border-t border-flyd-linje-sand pt-8">
            <p className="text-[15px] text-flyd-skifer">Flyd har også kontorer her:</p>
            <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-[16px]">
              {andre.map((o) => (
                <li key={o.slug}>
                  <Link href={`/kontor/${o.slug}/`} className={kontorLenke}>
                    Regnskapsfører {atOffice(o)}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/kontor/" className={kontorLenke}>
                  Alle kontorer
                </Link>
              </li>
            </ul>
          </nav>
        </Container>
      </Section>

      <ClosingCta
        kicker="Kontakt"
        title={`Ta en prat med oss ${sted}`}
        text={`Fortell oss om virksomheten din, så finner vi ut hvordan vi kan hjelpe – på kontoret ${sted}, hos deg eller på video.`}
      />
    </>
  );
}
