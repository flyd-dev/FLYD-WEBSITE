'use client';

import { preload } from 'react-dom';

/**
 * Forhåndslaster et bilde (heltebildet på forsiden, som er LCP-elementet).
 *
 * Kallet ligger i en klientkomponent med vilje. Fra en serverkomponent havner
 * hintet også i dataene Next.js forhåndshenter for lenker til siden, og da
 * hentet nettleseren forsidebildet på alle sider med lenke til forsiden. Her
 * kommer lenken bare i HTML-en når siden faktisk vises.
 */
export default function ForhandslastBilde({ src, srcSet, sizes }: { src: string; srcSet: string; sizes: string }) {
  preload(src, { as: 'image', imageSrcSet: srcSet, imageSizes: sizes, fetchPriority: 'high' });
  return null;
}
