import type { MetadataRoute } from 'next';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { jobs } from '@/data/jobs';
import { offices } from '@/data/offices';
import {
  services,
  erpSystems,
  erpComparisonStatus,
  serviceUrl,
  erpUrl,
} from '@/data/services';

const base = 'https://www.flyd.no';

// Filenes mtime er byggetidspunktet på Vercel (fersk klone), så lastmod ble
// «nå» for alle sider ved hver deploy. Google ignorerer lastmod som ikke
// stemmer. Bruk siste commit som endret filen; i en grunn klone (shallow)
// kan ikke det avgjøres, og da utelates lastmod heller enn å gjette.
const shallow = (() => {
  try {
    return execFileSync('git', ['rev-parse', '--is-shallow-repository']).toString().trim() !== 'false';
  } catch {
    return true;
  }
})();

function lastCommitOf(...relPaths: string[]): Date | undefined {
  if (shallow) return undefined;
  try {
    const iso = execFileSync('git', ['log', '-1', '--format=%cI', '--', ...relPaths]).toString().trim();
    return iso ? new Date(iso) : undefined;
  } catch {
    return undefined;
  }
}

// Stillingssidene er slått av (mappen heter `_slug`, som Next.js ignorerer).
// Sitemapen listet likevel URL-ene, og de ga 404. Tas med igjen automatisk
// når mappen får navnet `[slug]`.
const jobPagesEnabled = fs.existsSync(path.join(process.cwd(), 'app/karriere/[slug]'));

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: {
    path: string;
    source: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  }[] = [
    { path: '', source: 'app/page.tsx', priority: 1, changeFrequency: 'monthly' },
    { path: '/tjenester', source: 'app/tjenester/page.tsx', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/kontor', source: 'app/kontor/page.tsx', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/om-flyd', source: 'app/om-flyd/page.tsx', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/karriere', source: 'app/karriere/page.tsx', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/kontakt', source: 'app/kontakt/page.tsx', priority: 0.7, changeFrequency: 'yearly' },
    { path: '/personvern', source: 'app/personvern/page.tsx', priority: 0.3, changeFrequency: 'yearly' },
  ];

  const jobsMtime = lastCommitOf('data/jobs.ts', 'app/karriere/[slug]');
  const officesMtime = lastCommitOf('data/offices.ts', 'app/kontor/[slug]');

  // Bare publiserte sider – utkast skal aldri i sitemapen, heller ikke på
  // forhåndsvisninger.
  const servicesMtime = lastCommitOf('data/services.ts', 'components/maler');
  const serviceRoutes = [
    ...services.filter((s) => s.status === 'publisert').map((s) => serviceUrl(s)),
    ...erpSystems.filter((e) => e.status === 'publisert').map((e) => erpUrl(e)),
    ...(erpComparisonStatus === 'publisert' ? ['/tjenester/erp/sammenligning/'] : []),
  ];

  return [
    ...staticRoutes.map((r) => ({
      url: `${base}${r.path}/`,
      lastModified: lastCommitOf(r.source),
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })),
    ...serviceRoutes.map((p) => ({
      url: `${base}${p}`,
      lastModified: servicesMtime,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...offices.map((office) => ({
      url: `${base}/kontor/${office.slug}/`,
      lastModified: officesMtime,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...(jobPagesEnabled ? jobs : []).map((job) => ({
      url: `${base}/karriere/${job.slug}/`,
      lastModified: jobsMtime,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),
  ];
}
