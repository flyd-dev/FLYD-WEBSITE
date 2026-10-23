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
