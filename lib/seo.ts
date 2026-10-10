import type { Metadata } from 'next';

export const siteUrl = 'https://www.flyd.no';

const ogImage = {
  url: `${siteUrl}/opengraph-image.png`,
  width: 1200,
  height: 630,
  type: 'image/png',
  alt: 'Flyd – Regnskap, rådgivning og teknologi i samme hus',
};

/**
 * Metadata for én side: title, description, canonical, Open Graph og
 * Twitter-kort. Next.js slår ikke sammen `openGraph` fra layout og side,
 * så hver side må sette sitt eget – ellers arver alle forsidens.
 *
 * `title` får « · Flyd» etter seg (malen i layout). Bruk `absoluteTitle`
 * når hele tittelen skal stå som den er.
 */
export function pageMetadata({
  title,
  absoluteTitle,
  description,
  path,
}: {
  title?: string;
  absoluteTitle?: string;
  description: string;
  /** Med skråstrek på slutten, f.eks. '/kontakt/'. */
  path: string;
}): Metadata {
  const fullTitle = absoluteTitle ?? `${title} · Flyd`;
  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      locale: 'nb_NO',
      siteName: 'Flyd',
      url: `${siteUrl}${path}`,
      title: fullTitle,
      description,
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage.url],
    },
  };
}
