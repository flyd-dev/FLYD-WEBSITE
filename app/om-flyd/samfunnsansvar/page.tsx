import type { Metadata } from 'next';
import Container from '@/components/Container';
import Section from '@/components/Section';
import Eyebrow from '@/components/Eyebrow';
import Breadcrumbs from '@/components/Breadcrumbs';
import ClosingCta from '@/components/ClosingCta';
import { pageMetadata } from '@/lib/seo';
import { samfunnsansvarPath, sponsorgrupper } from '@/data/samfunnsansvar';

export const metadata: Metadata = pageMetadata({
  title: 'Samfunnsansvar – lag og arrangementer vi støtter',
  description:
    'Flyd støtter idrettslag, utøvere og arrangementer i lokalsamfunnene der vi har kontor. Se hvem vi sponser.',
  path: samfunnsansvarPath,
});

/** Samfunnsansvar: hvem Flyd sponser. Listen står i data/samfunnsansvar.ts. */
export default function SamfunnsansvarPage() {
  return (
    <>
      <Section tone="sand" className="pt-10 md:pt-14">
        <Container>
          <Breadcrumbs
            items={[
              { name: 'Om Flyd', href: '/om-flyd/' },
              { name: 'Samfunnsansvar', href: samfunnsansvarPath },
            ]}
          />
          <div className="mt-10 max-w-3xl">
            <Eyebrow>Samfunnsansvar</Eyebrow>
            <h1 className="mt-6 font-display text-display-xl font-semibold">Vi heier på lokal&shy;miljøet.</h1>
            <span aria-hidden="true" className="aksentlinje mt-6 block h-1 w-24 rounded-pille bg-flyd-teal" />
            <p className="mt-8 font-display text-ingress font-medium text-flyd-petrol">
              Flyd har kontorer i seks lokalsamfunn i Rogaland og Agder. Derfor støtter vi lag, utøvere og
              arrangementer som skaper aktivitet der vi og kundene våre bor.
            </p>
          </div>
        </Container>
      </Section>

      <Section tone="lysmint">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5" data-reveal>
              <Eyebrow>Sponsoravtaler</Eyebrow>
              <h2 className="mt-5 font-display text-display-lg font-semibold">Hvem vi støtter.</h2>
              <p className="mt-6 max-w-md text-[17px] leading-[1.65] text-flyd-skifer">
                Idrettslagene, utøverne og arrangementene under har avtale med Flyd i dag.
              </p>
            </div>
            <div className="space-y-12 lg:col-span-7">
              {sponsorgrupper.map((g) => (
                <div key={g.tittel} data-reveal>
                  <Eyebrow as="h3">{g.tittel}</Eyebrow>
                  <ul className="mt-5 border-t border-flyd-linje-mint">
                    {g.avtaler.map((a) => (
                      <li
                        key={a.navn}
                        className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-flyd-linje-mint py-4"
                      >
                        <span className="font-display text-[20px] font-semibold leading-snug text-flyd-skog">
                          {a.navn}
                        </span>
                        <span className="text-[15px] text-flyd-skifer">{a.detalj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
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
