import Link from 'next/link';
import Container from '@/components/Container';
import Section from '@/components/Section';
import Eyebrow from '@/components/Eyebrow';
import ClosingCta from '@/components/ClosingCta';
import Breadcrumbs from '@/components/Breadcrumbs';
import Bekreft, { UtkastBanner } from '@/components/Bekreft';
import { visUtkast } from '@/lib/utkast';
import { erpSystems, erpComparisonStatus, erpUrl, visibleErpSystems } from '@/data/services';

const rader: { label: string; verdi: (e: (typeof erpSystems)[number]) => string | undefined }[] = [
  { label: 'Kort fortalt', verdi: (e) => e.tagline },
  { label: 'Passer for', verdi: (e) => e.passerFor },
  { label: 'Styrker', verdi: (e) => e.styrker?.join(' · ') },
  { label: 'Svakheter', verdi: (e) => e.svakheter?.join(' · ') },
  { label: 'Typisk innføring', verdi: (e) => e.innforing },
];

/**
 * Ærlig sammenligning av de fire systemene (/tjenester/erp/sammenligning/).
 * Tabellen bygges fra erpSystems, så den er alltid i takt med systemsidene.
 */
export default function SammenligningMal() {
  const utkast = erpComparisonStatus === 'utkast';
  return (
    <>
      {utkast && <UtkastBanner />}
      <Section tone="sand" className="pt-10 md:pt-14" flyt>
        <Container>
          <Breadcrumbs
            items={[
              { name: 'Tjenester', href: '/tjenester/' },
              { name: 'ERP', href: '/tjenester/erp/' },
              { name: 'Sammenligning', href: '/tjenester/erp/sammenligning/' },
            ]}
          />
          <div className="mt-10 max-w-3xl">
            <Eyebrow>Sammenligning</Eyebrow>
            <h1 className="mt-6 font-display text-display-xl font-semibold">
              Tripletex, Visma Business NXT, Uni Micro eller PowerOffice Go?
            </h1>
            <span aria-hidden="true" className="aksentlinje mt-6 block h-1 w-24 rounded-pille bg-flyd-teal" />
            {utkast && visUtkast && (
              <div className="mt-8">
                <Bekreft>innledning skrevet av konsulentene: hvordan de vurderer systemene, og hvem som har gjort vurderingen</Bekreft>
              </div>
            )}
          </div>
        </Container>
      </Section>

      <Section tone="lysmint" className="!pt-0 md:!pt-0">
        <Container>
          <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0" data-reveal>
            <table className="w-full min-w-[760px] border-separate border-spacing-0 text-left text-[15px]">
              <caption className="sr-only">Sammenligning av fire ERP-systemer</caption>
              <thead>
                <tr>
                  <th scope="col" className="w-40 p-4" />
                  {erpSystems.map((e) => (
                    <th key={e.id} scope="col" className="p-4 align-bottom font-display text-[18px] font-semibold">
                      {visibleErpSystems.includes(e) ? (
                        <Link href={erpUrl(e)} className="underline decoration-flyd-teal decoration-2 underline-offset-4 hover:text-flyd-petrol">
                          {e.name}
                        </Link>
                      ) : (
                        e.name
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rader.map((r) => (
                  <tr key={r.label}>
                    <th scope="row" className="border-t border-flyd-linje-mint p-4 align-top font-display text-[15px] font-semibold">
                      {r.label}
                    </th>
                    {erpSystems.map((e) => {
                      const v = r.verdi(e);
                      return (
                        <td key={e.id} className="border-t border-flyd-linje-mint p-4 align-top text-flyd-skifer">
                          {v ?? (visUtkast ? <span className="font-medium text-flyd-skog">[BEKREFT]</span> : '–')}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      <ClosingCta
        kicker="Systemvalg"
        title="Vil du ha et råd for akkurat din bedrift?"
        text="Vi går gjennom behovene dine og anbefaler systemet som passer – også når svaret er å bli der du er."
        primary={{ href: `/kontakt?tema=${encodeURIComponent('programvare / erp')}`, label: 'Snakk med oss' }}
      />
    </>
  );
}
