import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Container from '@/components/Container';
import Section from '@/components/Section';
import Eyebrow from '@/components/Eyebrow';
import Bekreft, { UtkastBanner } from '@/components/Bekreft';
import KundeHistorier from '@/components/designlab/KundeHistorier';
import LogoFlyt from '@/components/designlab/LogoFlyt';
import { kundehistorier } from '@/data/kundehistorier';
import { visUtkast } from '@/lib/utkast';

/**
 * Designlab (/designlab/): forslag fra 21st.dev som ikke er tatt i bruk ennå.
 * Bare utkast – siden finnes ikke i produksjonsbygget (visUtkast), står ikke
 * i sitemap og har noindex.
 */
export const metadata: Metadata = {
  title: 'Designlab · Flyd',
  robots: { index: false, follow: false },
};

export default function DesignlabPage() {
  if (!visUtkast) notFound();

  return (
    <>
      <UtkastBanner />

      <Section tone="sand" className="pt-12 md:pt-16">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Designlab</Eyebrow>
            <h1 className="mt-5 font-display text-display-xl font-semibold">Forslag som venter.</h1>
            <p className="mt-8 max-w-2xl font-display text-ingress font-medium text-flyd-skifer">
              To komponenter som er klare, men ikke brukt på sidene: kundehistoriene trenger ekte sitater, og
              logoene langs flytlinjen er et alternativ til logostripa på forsiden.
            </p>
          </div>
        </Container>
      </Section>

      <Section tone="lysmint">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Kundehistorier</Eyebrow>
            <h2 className="mt-5 font-display text-display-lg font-semibold">Hva som endret seg, med kundenes egne ord.</h2>
          </div>
          <Bekreft className="mt-8 max-w-3xl">
            Tallene, sitatene og navnene er eksempler. De må byttes med ekte, godkjente kundesitater før publisering.
          </Bekreft>
          <div className="mt-10">
            <KundeHistorier historier={kundehistorier} />
          </div>

          {/* Framgangsmåten for ekte sitater. Revisjonskunder spørres ikke: revisjon selges ikke. */}
          <div className="mt-16 grid grid-cols-1 gap-10 rounded-kort bg-flyd-sand p-7 md:p-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <Eyebrow>Slik henter dere inn sitater</Eyebrow>
              <h3 className="mt-5 font-display text-display-md font-semibold">Fire til seks kunder, ett tall og ett sitat hver.</h3>
              <ol className="mt-6 space-y-3 text-[16px] leading-[1.6] text-flyd-skifer">
                <li>1. Velg kunder fra logostripa som har fått et tydelig resultat (regnskap, lønn, ERP eller integrasjoner – ikke revisjon).</li>
                <li>2. Send forespørselen til høyre fra kontaktpersonen deres.</li>
                <li>3. Skriv sitatet ferdig ut fra svaret, og send det til kunden for godkjenning.</li>
                <li>4. Lagre det skriftlige ja-et. Legg inn tall, sitat, navn og tittel i data/kundehistorier.ts.</li>
              </ol>
            </div>
            <div className="lg:col-span-7">
              <p className="font-body text-[13px] font-bold uppercase tracking-[0.12em] text-flyd-skog">
                Forespørsel (kan kopieres)
              </p>
              <div className="mt-4 space-y-4 rounded-flis bg-flyd-lysmint p-6 text-[15px] leading-[1.65] text-flyd-skog">
                <p>
                  <strong className="font-medium">Emne:</strong> Kan vi sitere deg på flyd.no?
                </p>
                <p>Hei [navn],</p>
                <p>
                  Vi skal vise noen kundehistorier på flyd.no, og vi vil gjerne ha med [bedrift]. Har du lyst til å
                  svare kort på to spørsmål?
                </p>
                <p>
                  1. Hva er det viktigste som har blitt bedre etter at dere begynte med oss? Gjerne med et tall – for
                  eksempel timer spart i måneden, dager raskere månedsavslutning eller færre feil.
                  <br />
                  2. Hvordan ville du sagt det til en kollega, med én eller to setninger?
                </p>
                <p>
                  Vi sender deg teksten til godkjenning før noe publiseres, og vi bruker navn, tittel og logo bare
                  hvis du sier ja.
                </p>
                <p>Hilsen [navn], Flyd</p>
                <p className="border-t border-flyd-linje-mint pt-4 text-flyd-skifer">
                  <strong className="font-medium text-flyd-skog">Samtykke:</strong> «Ja, Flyd kan bruke sitatet,
                  navnet mitt, tittelen min og logoen til [bedrift] på flyd.no. Jeg kan trekke samtykket når som
                  helst ved å sende en e-post til support@flyd.no.»
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="sand">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Et utvalg kunder</Eyebrow>
            <h2 className="mt-5 font-display text-display-lg font-semibold">670+ bedrifter i full flyd.</h2>
          </div>
        </Container>
        <div className="mt-10">
          <LogoFlyt />
        </div>
      </Section>
    </>
  );
}
