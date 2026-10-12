import type { Metadata } from 'next';

export const siteUrl = 'https://www.flyd.no';

export type OgImage = { url: string; width: number; height: number; type?: string; alt: string };

const ogImage: OgImage = {
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
  image = ogImage,
}: {
  title?: string;
  absoluteTitle?: string;
  description: string;
  /** Med skråstrek på slutten, f.eks. '/kontakt/'. */
  path: string;
  /** Eget delingsbilde (1200×630). Standard er forsidens. */
  image?: OgImage;
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
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [{ url: image.url, width: image.width, height: image.height, alt: image.alt }],
    },
  };
}
