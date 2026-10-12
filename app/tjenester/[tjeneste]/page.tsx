import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { pageMetadata } from '@/lib/seo';
import TjenesteMal from '@/components/maler/TjenesteMal';
import { visibleServices, getServiceBySlug, serviceUrl } from '@/data/services';

/** Én side per tjeneste: /tjenester/[tjeneste]/. Innholdet ligger i data/services.ts. */

export function generateStaticParams() {
  return visibleServices.map((s) => ({ tjeneste: s.slug }));
}

type Props = { params: { tjeneste: string } };

export function generateMetadata({ params }: Props): Metadata {
  const s = getServiceBySlug(params.tjeneste);
  if (!s) return { title: 'Fant ikke siden' };
  return {
    ...pageMetadata({
      title: s.slug === 'erp' ? 'ERP og systemvalg' : s.title,
      description: s.short,
      path: serviceUrl(s),
    }),
    ...(s.status === 'utkast' ? { robots: { index: false, follow: false } } : {}),
  };
}

export default function TjenesteSide({ params }: Props) {
  const s = getServiceBySlug(params.tjeneste);
  if (!s) notFound();
  return <TjenesteMal service={s} />;
}
