import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.flyd.no';
  const now = new Date();
  const routes = ['', '/tjenester', '/om-flyd', '/karriere', '/kontakt', '/personvern'];
  return routes.map((r) => ({
    url: `${base}${r}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: r === '' ? 1 : 0.7,
  }));
}
