import type { MetadataRoute } from 'next';
import fs from 'node:fs';
import path from 'node:path';
import { jobs } from '@/data/jobs';

const base = 'https://www.flyd.no';

function mtimeOf(relPath: string): Date {
  try {
    return fs.statSync(path.join(process.cwd(), relPath)).mtime;
  } catch {
    return new Date();
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: {
    path: string;
    source: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  }[] = [
    { path: '', source: 'app/page.tsx', priority: 1, changeFrequency: 'monthly' },
    { path: '/tjenester', source: 'app/tjenester/page.tsx', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/om-flyd', source: 'app/om-flyd/page.tsx', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/karriere', source: 'app/karriere/page.tsx', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/kontakt', source: 'app/kontakt/page.tsx', priority: 0.7, changeFrequency: 'yearly' },
    { path: '/personvern', source: 'app/personvern/page.tsx', priority: 0.3, changeFrequency: 'yearly' },
  ];

  const jobsMtime = mtimeOf('data/jobs.ts');

  return [
    ...staticRoutes.map((r) => ({
      url: `${base}${r.path}/`,
      lastModified: mtimeOf(r.source),
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })),
    ...jobs.map((job) => ({
      url: `${base}/karriere/${job.slug}/`,
      lastModified: jobsMtime,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),
  ];
}
