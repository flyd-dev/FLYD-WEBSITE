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
      <Section tone="sand" size="lg" className="pt-12 md:pt-16">
      <Container>
        <div className="max-w-3xl">
          <Eyebrow>Personvern</Eyebrow>
          <h1 className="mt-6 font-display text-display-xl font-semibold">
            Slik behandler vi dine opplysninger.
          </h1>
          <p className="mt-6 text-[15px] text-flyd-skifer">Sist oppdatert 6. oktober 2026.</p>

          <div className="mt-12 space-y-10 text-[17px] leading-[1.7] text-flyd-skifer">
            <section>
              <h2 className="border-t border-flyd-linje-sand pt-8 font-display text-[24px] font-semibold text-flyd-skog">
                Behandlingsansvarlig
              </h2>
              <p className="mt-3">
                Flyd AS, org.nr. 933 662 934, er behandlingsansvarlig for
                personopplysningene som samles inn gjennom dette nettstedet.
              </p>
            </section>

            <section>
              <h2 className="border-t border-flyd-linje-sand pt-8 font-display text-[24px] font-semibold text-flyd-skog">
                Hvilke opplysninger vi samler inn
              </h2>
              <p className="mt-3">
                Når du sender oss en henvendelse via kontaktskjemaet, behandler
                vi navn, bedrift, e-post, telefonnummer og innholdet i meldingen
                din. Opplysningene brukes utelukkende for å besvare henvendelsen
                og opprette videre dialog.
              </p>
              <p className="mt-3">
                Henvendelser fra kontaktskjemaet formidles til oss gjennom
                automatiseringstjenesten Make (make.com), som behandler
                opplysningene på våre vegne som databehandler, på servere i EU.
              </p>
            </section>

            <section>
              <h2 className="border-t border-flyd-linje-sand pt-8 font-display text-[24px] font-semibold text-flyd-skog">
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
              <h2 className="border-t border-flyd-linje-sand pt-8 font-display text-[24px] font-semibold text-flyd-skog">
                Dine rettigheter
              </h2>
              <p className="mt-3">
                Du har rett til innsyn, retting og sletting av dine
                opplysninger. Du kan også kreve at behandlingen begrenses eller
                protestere mot den. Henvendelser sendes til{' '}
                <a
                  href="mailto:support@flyd.no"
                  className="font-medium text-flyd-petrol underline decoration-flyd-teal decoration-2 underline-offset-4 transition-colors hover:text-flyd-skog hover:decoration-flyd-skog"
                >
                  support@flyd.no
                </a>
                . Du har også rett til å klage til{' '}
                <a
                  href="https://www.datatilsynet.no/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-flyd-petrol underline decoration-flyd-teal decoration-2 underline-offset-4 transition-colors hover:text-flyd-skog hover:decoration-flyd-skog"
                >
                  Datatilsynet
                </a>{' '}
                dersom du mener behandlingen er i strid med regelverket.
              </p>
            </section>

            <section>
              <h2 className="border-t border-flyd-linje-sand pt-8 font-display text-[24px] font-semibold text-flyd-skog">
                Informasjonskapsler
              </h2>
              <p className="mt-3">
                Vi bruker tekniske informasjonskapsler som er nødvendige for at
                sidene skal fungere. Disse kan vi benytte uten samtykke.
              </p>
              <p className="mt-3">
                I tillegg bruker vi Google Analytics og Microsoft Clarity for å
                lage statistikk om hvordan nettstedet brukes – blant
                annet hvilke sider som besøkes og hvordan man navigerer – slik at
                vi kan forbedre innholdet. Disse informasjonskapslene settes kun
                dersom du aktivt godtar dem i samtykkebanneren. Frem til du har
                gitt samtykke, lastes ikke skriptene fra Google og Microsoft i
                det hele tatt, og det samles ikke inn data via dem. Det
                rettslige grunnlaget er ditt samtykke, jf. ekomloven og
                personvernforordningen (GDPR).
              </p>
              <p className="mt-3">
                Når du godtar alle, bruker vi også Google Ads til å måle om
                annonsene våre fører til henvendelser (konverteringsmåling), og
                til å vise annonser til deg som tidligere har besøkt flyd.no
                (remarketing). Kommer du fra en av annonsene våre, følger
                annonsens klikk-ID med henvendelsen, slik at vi senere kan melde
                til Google Ads om den førte til et kundeforhold. Vi deler ikke
                navn, e-post eller innholdet i henvendelsen din med Google –
                bare at et skjema ble sendt, og eventuelt at du ble kunde.
              </p>
              <p className="mt-3">
                Når statistikk og annonsemåling er aktivert, behandler Google
                opplysningene fra Google Analytics som databehandler på våre
                vegne. For Google Ads (konverteringsmåling og remarketing) og
                Microsoft Clarity bruker Google og Microsoft også opplysningene
                til egne formål, og er da selvstendig behandlingsansvarlige.
                Hvordan de gjør det, står i{' '}
                <a
                  href="https://policies.google.com/privacy?hl=no"
                  className="font-medium text-flyd-petrol underline decoration-flyd-teal decoration-2 underline-offset-4 transition-colors hover:text-flyd-skog hover:decoration-flyd-skog"
                >
                  Googles personvernerklæring
                </a>{' '}
                og{' '}
                <a
                  href="https://www.microsoft.com/nb-no/privacy/privacystatement"
                  className="font-medium text-flyd-petrol underline decoration-flyd-teal decoration-2 underline-offset-4 transition-colors hover:text-flyd-skog hover:decoration-flyd-skog"
                >
                  Microsofts personvernerklæring
                </a>
                . Velger du «Kun nødvendige», samles ingen data inn via disse
                verktøyene.
              </p>
              <p className="mt-3">
                Du kan når som helst trekke tilbake eller endre samtykket ditt
                via «Endre samtykke»-lenken nederst på siden. Valget lagres
                lokalt i nettleseren din. Det gjør også en eventuell klikk-ID fra
                en annonse, som slettes etter 90 dager eller når du trekker
                tilbake samtykket.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </Section>
    </>
  );
}
