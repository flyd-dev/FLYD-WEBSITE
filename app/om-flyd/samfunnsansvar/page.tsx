import type { Metadata } from 'next';
import Image from 'next/image';
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

/** «Sokndal Sportsdrill» → «SS». Brukes der vi ikke har logo. */
const forbokstaver = (navn: string) =>
  navn
    .split(' ')
    .map((o) => o[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

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
            <h1 className="mt-6 font-display text-display-xl font-semibold">Med på laget.</h1>
            <span aria-hidden="true" className="aksentlinje mt-6 block h-1 w-24 rounded-pille bg-flyd-teal" />
            <p className="mt-8 font-display text-ingress font-medium text-flyd-petrol">
              Flyd har kontorer i seks lokalsamfunn i Rogaland og Agder. Vi heier på lag, utøvere og arrangementer
              som skaper aktivitet der vi og kundene våre bor.
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
                      <li key={a.navn} className="flex items-center gap-4 border-b border-flyd-linje-mint py-3 sm:gap-5">
                        {/* Logoen på en Sand-flis. Navnet står rett ved siden av, så bildet er pynt (tom alt). */}
                        <span className="flex h-16 w-20 flex-none items-center justify-center rounded-flis bg-flyd-sand p-2 sm:h-20 sm:w-28 sm:p-2.5">
                          {a.logo ? (
                            <Image
                              src={a.logo.src}
                              alt=""
                              width={a.logo.bredde}
                              height={a.logo.hoyde}
                              sizes="112px"
                              className="max-h-full w-auto max-w-full object-contain mix-blend-multiply"
                            />
                          ) : (
                            <span aria-hidden="true" className="font-display text-[18px] font-semibold text-flyd-petrol">
                              {forbokstaver(a.navn)}
                            </span>
                          )}
                        </span>
                        <span className="flex min-w-0 flex-1 flex-col gap-x-6 gap-y-0.5 sm:flex-row sm:items-baseline sm:justify-between">
                          <span className="font-display text-[20px] font-semibold leading-snug text-flyd-skog">
                            {a.navn}
                          </span>
                          <span className="text-[15px] text-flyd-skifer">{a.detalj}</span>
                        </span>
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
