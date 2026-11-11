import type { Metadata } from 'next';
import Container from '@/components/Container';
import Section from '@/components/Section';
import Eyebrow from '@/components/Eyebrow';
import Breadcrumbs from '@/components/Breadcrumbs';
import ClosingCta from '@/components/ClosingCta';
import GlassBrett from '@/components/GlassBrett';
import TekstAvdekking from '@/components/TekstAvdekking';
import SponsorVegg from '@/components/SponsorVegg';
import { KartFlate } from '@/components/Kontorkart';
import { ButtonLink, TextLink } from '@/components/Button';
import { pageMetadata } from '@/lib/seo';
import { kartPunkt } from '@/data/kontorkart';
import {
  samfunnsansvarPath,
  sponsoravtaler,
  sponsorkategorier,
  sponsorsteder,
} from '@/data/samfunnsansvar';

export const metadata: Metadata = pageMetadata({
  title: 'Samfunnsansvar – lag og arrangementer vi støtter',
  description:
    'Flyd heier på lag, foreninger, utøvere og arrangementer i lokalsamfunnene der vi har kontor. Se hvem vi støtter.',
  path: samfunnsansvarPath,
});

// Kartutsnittet rundt stedene vi støtter noen (koordinater i kartets viewBox,
// se data/kontorkart.ts). Punktene regnes om til prosent av utsnittet.
const utsnitt: [number, number, number, number] = [140, 125, 610, 605];
const steder = sponsorsteder.map((s) => {
  const [x, y] = kartPunkt(s.lat, s.lng);
  return {
    id: s.id,
    navn: s.navn,
    navnPlass: s.navnPlass,
    left: ((x - utsnitt[0]) / utsnitt[2]) * 100,
    top: ((y - utsnitt[1]) / utsnitt[3]) * 100,
  };
});

// Tallene telles fra listen, så de alltid stemmer med kortene under.
const tall = [
  { verdi: sponsoravtaler.length, tekst: 'sponsor\u00ADavtaler', linje: 'bg-flyd-mint' },
  {
    verdi: sponsoravtaler.filter((a) => a.kategori === 'lag').length,
    tekst: 'idretts\u00ADlag og klubber',
    linje: 'bg-flyd-korall',
  },
  { verdi: new Set(sponsoravtaler.map((a) => a.sted)).size, tekst: 'steder i Rogaland og Agder', linje: 'bg-flyd-teal' },
];

/** Samfunnsansvar: hvem Flyd sponser. Listen står i data/samfunnsansvar.ts. */
export default function SamfunnsansvarPage() {
  return (
    <>
      {/* TOPP – Skog-kort med nøkkeltall */}
      <section className="bg-flyd-sand px-3 pt-3 md:px-4 md:pt-4">
        <div className="on-dark relative overflow-hidden rounded-bilde bg-flyd-skog py-12 text-flyd-sand md:py-20">
          <GlassBrett tone="skog" />
          <Container className="relative">
            <Breadcrumbs
              tone="dark"
              items={[
                { name: 'Om Flyd', href: '/om-flyd/' },
                { name: 'Samfunnsansvar', href: samfunnsansvarPath },
              ]}
            />
            <div className="mt-10 grid grid-cols-1 items-end gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <Eyebrow tone="dark">Samfunnsansvar</Eyebrow>
                <h1 className="mt-6 font-display text-display-xl font-semibold text-flyd-sand">Med på laget.</h1>
                <p className="mt-8 max-w-2xl font-display text-ingress font-medium text-flyd-sand">
                  Frivilligheten holder lokalsamfunnet i gang. Hver uke stiller trenere, ledere og foreldre opp, slik
                  at barn og unge får et sted å høre til, mestre og ha det gøy.
                </p>
                <p className="mt-5 max-w-2xl text-[17px] leading-[1.65] text-flyd-dempet">
                  Vi i Flyd vil gjerne bidra til det arbeidet, og heier på lag, foreninger og arrangementer der vi og
                  kundene våre bor.
                </p>
                <div className="mt-10">
                  <ButtonLink href="#stotter" variant="primary-dark" withArrow>
                    Se hvem vi støtter
                  </ButtonLink>
                </div>
              </div>
              <dl className="grid grid-cols-3 gap-3 sm:gap-6 lg:col-span-5">
                {tall.map((t) => (
                  <div key={t.tekst} className="flex flex-col">
                    <span aria-hidden="true" className={`block h-1 w-full rounded-pille ${t.linje}`} />
                    <dt className="order-2 mt-2 text-[14px] leading-snug text-flyd-dempet sm:text-[15px]">{t.tekst}</dt>
                    <dd className="order-1 mt-5 font-display text-[40px] font-semibold leading-none tabular-nums text-flyd-sand md:text-[56px]">
                      {t.verdi}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Container>
        </div>
      </section>

      {/* LOGOVEGGEN MED KART */}
      <Section tone="lysmint" id="stotter">
        <Container>
          <SponsorVegg
            avtaler={sponsoravtaler}
            kategorier={sponsorkategorier}
            steder={steder}
            kart={<KartFlate utsnitt={utsnitt} />}
            kartForhold={utsnitt[2] / utsnitt[3]}
            topp={
              <div className="max-w-2xl">
                <Eyebrow>Sponsoravtaler</Eyebrow>
                <h2 className="mt-5 font-display text-display-lg font-semibold">Hvem vi støtter.</h2>
                <p className="mt-6 text-[17px] leading-[1.65] text-flyd-skifer">
                  Fra skiløypene i Sirdal til fotballbanen i Flekkefjord. Velg en type eller et sted i kartet.
                </p>
              </div>
            }
          />
        </Container>
      </Section>

      {/* LOKALT TIL STEDE */}
      <Section tone="sand">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4" data-reveal>
              <Eyebrow>Lokalt til stede</Eyebrow>
              <h2 className="mt-5 font-display text-display-md font-semibold">Vi bor her selv.</h2>
            </div>
            <div className="lg:col-span-8" data-reveal>
              <TekstAvdekking
                tekst="Vi bor og jobber i de samme lokalsamfunnene som kundene våre."
                className="font-display text-[clamp(1.5rem,2.8vw,2.375rem)] font-medium leading-[1.25] text-flyd-skog"
              />
              <p className="mt-8 max-w-2xl text-[17px] leading-[1.7] text-flyd-skifer">
                Flyd har kontorer i seks lokalsamfunn i Rogaland og Agder. Når laget, klubben og festivalen har det
                bra, blir stedet bedre å bo og drive bedrift i.
              </p>
              <div className="mt-8">
                <TextLink href="/kontor/">Se kontorene våre</TextLink>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <ClosingCta
        title="Vil du vite mer om hvem vi er?"
        text="Les om folkene, verdiene og kontorene våre – eller ta kontakt, så tar vi en prat."
        secondary={{ href: '/om-flyd/', label: 'Om Flyd' }}
      />
    </>
  );
}
