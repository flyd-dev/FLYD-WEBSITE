import type { Metadata } from 'next';
import Container from '@/components/Container';
import Section from '@/components/Section';
import Eyebrow from '@/components/Eyebrow';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Personvern',
  description: 'Slik behandler Flyd personopplysninger.',
  alternates: { canonical: '/personvern/' },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Hjem', item: 'https://www.flyd.no/' },
    { '@type': 'ListItem', position: 2, name: 'Personvern', item: 'https://www.flyd.no/personvern/' },
  ],
};

export default function PersonvernPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <Section tone="paper" size="lg" className="pt-20 md:pt-28">
      <Container>
        <div className="max-w-3xl">
          <Eyebrow tone="teal">Personvern</Eyebrow>
          <h1 className="mt-6 font-display text-display-lg font-semibold">
            Slik behandler vi dine opplysninger.
          </h1>

          <div className="mt-12 space-y-8 text-[16px] leading-[1.85] text-flyd-ink/80">
            <section>
              <h2 className="font-display text-xl font-semibold text-flyd-ink">
                Behandlingsansvarlig
              </h2>
              <p className="mt-3">
                Flyd AS, org.nr. 933 662 934, er behandlingsansvarlig for
                personopplysningene som samles inn gjennom dette nettstedet.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-flyd-ink">
                Hvilke opplysninger vi samler inn
              </h2>
              <p className="mt-3">
                Når du sender oss en henvendelse via kontaktskjemaet, behandler
                vi navn, bedrift, e-post, telefonnummer og innholdet i meldingen
                din. Opplysningene brukes utelukkende for å besvare henvendelsen
                og opprette videre dialog.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-flyd-ink">
                Lagring
              </h2>
              <p className="mt-3">
                Henvendelser lagres så lenge det er nødvendig for å følge opp
                dialogen. Hvis du blir kunde, lagres opplysningene i henhold til
                regnskapsloven og bokføringsloven. Ellers slettes de senest 12
                måneder etter siste kontakt.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-flyd-ink">
                Dine rettigheter
              </h2>
              <p className="mt-3">
                Du har rett til innsyn, retting og sletting av dine
                opplysninger. Du kan også kreve at behandlingen begrenses eller
                protestere mot den. Henvendelser sendes til{' '}
                <a
                  href="mailto:support@flyd.no"
                  className="text-flyd-ink underline underline-offset-4 hover:text-flyd-teal-dark"
                >
                  support@flyd.no
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-flyd-ink">
                Informasjonskapsler
              </h2>
              <p className="mt-3">
                Vi bruker tekniske informasjonskapsler som er nødvendige for at
                sidene skal fungere. Disse kan vi benytte uten samtykke.
              </p>
              <p className="mt-3">
                I tillegg bruker vi Google Analytics for å lage anonymisert
                statistikk om hvordan nettstedet brukes, slik at vi kan forbedre
                innholdet. Disse informasjonskapslene settes kun dersom du
                aktivt godtar dem i samtykkebanneren. Frem til du har gitt
                samtykke, samler vi ikke inn data via Google Analytics. Det
                rettslige grunnlaget er ditt samtykke, jf. ekomloven og
                personvernforordningen (GDPR).
              </p>
              <p className="mt-3">
                Når statistikk er aktivert, behandles opplysningene av Google som
                databehandler på våre vegne. IP-adressen din anonymiseres, og vi
                bruker ikke dataene til markedsføring eller deling med
                tredjeparter for annonseformål.
              </p>
              <p className="mt-3">
                Du kan når som helst trekke tilbake eller endre samtykket ditt.
                Valget lagres lokalt i nettleseren din – tøm nettleserdataene for
                nettstedet, så vil samtykkebanneren vises på nytt ved neste
                besøk.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </Section>
    </>
  );
}
