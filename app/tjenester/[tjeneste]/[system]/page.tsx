import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { pageMetadata } from '@/lib/seo';
import { visUtkast } from '@/lib/utkast';
import ErpMal from '@/components/maler/ErpMal';
import SammenligningMal from '@/components/maler/SammenligningMal';
import { visibleErpSystems, getErpBySlug, erpComparisonStatus, erpUrl } from '@/data/services';

/**
 * Undersider under ERP: /tjenester/erp/[system]/ og /tjenester/erp/sammenligning/.
 * Innholdet ligger i erpSystems i data/services.ts.
 *
 * Statisk eksport tåler ikke en tom liste her. Er alle systemsidene utkast,
 * lages bare en skjult plassholder (noindex, ikke i sitemap, ingen lenker
 * til den) som viser 404-innholdet.
 */

const PLASSHOLDER = '_ingen';
const comparisonVisible = erpComparisonStatus === 'publisert' || visUtkast;

export function generateStaticParams() {
  const params = [
    ...visibleErpSystems.map((e) => ({ tjeneste: 'erp', system: e.slug })),
    ...(comparisonVisible ? [{ tjeneste: 'erp', system: 'sammenligning' }] : []),
  ];
  return params.length ? params : [{ tjeneste: 'erp', system: PLASSHOLDER }];
}

type Props = { params: { tjeneste: string; system: string } };

export function generateMetadata({ params }: Props): Metadata {
  const noindex = { robots: { index: false, follow: false } };
  if (params.tjeneste !== 'erp') return { title: 'Fant ikke siden', ...noindex };
  if (params.system === 'sammenligning' && comparisonVisible) {
    return {
      ...pageMetadata({
        title: 'Sammenligning av ERP-systemer',
        description:
          'Tripletex, Visma Business NXT, Uni Micro og PowerOffice Go sammenlignet av Flyds konsulenter.',
        path: '/tjenester/erp/sammenligning/',
      }),
      ...(erpComparisonStatus === 'utkast' ? noindex : {}),
    };
  }
  const e = getErpBySlug(params.system);
  if (!e) return { title: 'Fant ikke siden', ...noindex };
  return {
    ...pageMetadata({
      title: `${e.name}: valg, innføring og integrasjoner`,
      description: e.description,
      path: erpUrl(e),
    }),
    ...(e.status === 'utkast' ? noindex : {}),
  };
}

export default function ErpSide({ params }: Props) {
  if (params.tjeneste !== 'erp') notFound();
  if (params.system === 'sammenligning' && comparisonVisible) return <SammenligningMal />;
  const e = getErpBySlug(params.system);
  if (!e) notFound();
  return <ErpMal system={e} />;
}
