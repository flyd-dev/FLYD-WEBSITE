import { eFaktura2027 } from './e-faktura-2027';
import { altinnTilgang } from './altinn-tilgang-regnskapsforer';
import { mvaFrister } from './mva-frister';
import { fristerAs } from './frister-aksjeselskap';
import { forskuddsskattEnk } from './forskuddsskatt-enk';
import { trengerRegnskapsforer } from './trenger-regnskapsforer';
import { enkEllerAs } from './enk-eller-as';
import { arsavslutning } from './arsavslutning-sjekkliste';
import { lonnEllerUtbytte } from './lonn-eller-utbytte';

/**
 * Alle artikler under /artikler/. Oversikten (/artikler/) og sitemapen bygges
 * herfra, så en ny artikkel trenger bare en side i app/artikler/<slug>/ og en
 * oppføring her. Bygget feiler hvis en artikkelmappe mangler oppføring (se
 * app/artikler/page.tsx). Datoene er ISO (åååå-mm-dd); `modified` oppdateres
 * når teksten endres.
 */
export type Artikkel = {
  slug: string;
  /** Med skråstrek på slutten, f.eks. '/artikler/e-faktura-2027/'. */
  path: string;
  /** Tittelen slik den står i oversikten (setningsstil, som h1 på siden). */
  title: string;
  /** Kort ingress, én til to setninger. */
  ingress: string;
  /** Tema, vises som kicker over tittelen. */
  tema: string;
  published: string;
  modified: string;
  /**
   * Kortbilde i oversikten, vises i 16:9 (object-cover). Bruk et bilde
   * artikkelen allerede har, helst toppbildet. Mangler det, får kortet en
   * rolig Petrol-flate i stedet.
   */
  bilde?: { src: string; alt: string; width: number; height: number };
};

const alle: Artikkel[] = [
  {
    slug: 'e-faktura-2027',
    path: eFaktura2027.path,
    title: eFaktura2027.h1,
    ingress: eFaktura2027.description,
    tema: 'E-faktura og EHF',
    published: eFaktura2027.published,
    modified: eFaktura2027.modified,
    bilde: eFaktura2027.hero,
  },
  {
    slug: 'altinn-tilgang-regnskapsforer',
    path: altinnTilgang.path,
    title: altinnTilgang.h1,
    ingress: altinnTilgang.description,
    tema: 'Altinn',
    published: altinnTilgang.published,
    modified: altinnTilgang.modified,
    bilde: altinnTilgang.hero,
  },
  {
    slug: 'mva-frister',
    path: mvaFrister.path,
    title: mvaFrister.h1,
    ingress: mvaFrister.description,
    tema: 'Merverdiavgift',
    published: mvaFrister.published,
    modified: mvaFrister.modified,
    bilde: mvaFrister.hero,
  },
  {
    slug: 'frister-aksjeselskap',
    path: fristerAs.path,
    title: fristerAs.h1,
    ingress: fristerAs.description,
    tema: 'Aksjeselskap',
    published: fristerAs.published,
    modified: fristerAs.modified,
    bilde: fristerAs.hero,
  },
  {
    slug: 'forskuddsskatt-enk',
    path: forskuddsskattEnk.path,
    title: forskuddsskattEnk.h1,
    ingress: forskuddsskattEnk.description,
    tema: 'Enkeltpersonforetak',
    published: forskuddsskattEnk.published,
    modified: forskuddsskattEnk.modified,
    bilde: forskuddsskattEnk.hero,
  },
  {
    slug: 'trenger-jeg-regnskapsforer',
    path: trengerRegnskapsforer.path,
    title: trengerRegnskapsforer.h1,
    ingress: trengerRegnskapsforer.description,
    tema: 'Regnskap',
    published: trengerRegnskapsforer.published,
    modified: trengerRegnskapsforer.modified,
    bilde: trengerRegnskapsforer.hero,
  },
  {
    slug: 'enk-eller-as',
    path: enkEllerAs.path,
    title: enkEllerAs.h1,
    ingress: enkEllerAs.description,
    tema: 'Selskapsform',
    published: enkEllerAs.published,
    modified: enkEllerAs.modified,
    bilde: enkEllerAs.hero,
  },
  {
    slug: 'arsavslutning-sjekkliste',
    path: arsavslutning.path,
    title: arsavslutning.h1,
    ingress: arsavslutning.description,
    tema: 'Årsoppgjør',
    published: arsavslutning.published,
    modified: arsavslutning.modified,
    bilde: arsavslutning.hero,
  },
  {
    slug: 'lonn-eller-utbytte',
    path: lonnEllerUtbytte.path,
    title: lonnEllerUtbytte.h1,
    ingress: lonnEllerUtbytte.description,
    tema: 'Aksjeselskap',
    published: lonnEllerUtbytte.published,
    modified: lonnEllerUtbytte.modified,
    bilde: lonnEllerUtbytte.hero,
  },
];

/** Nyeste først. */
export const artikler: Artikkel[] = [...alle].sort(
  (a, b) => b.published.localeCompare(a.published) || b.modified.localeCompare(a.modified),
);

const maaneder = [
  'januar',
  'februar',
  'mars',
  'april',
  'mai',
  'juni',
  'juli',
  'august',
  'september',
  'oktober',
  'november',
  'desember',
];

/** '2026-10-14' → '14. oktober 2026' (skriveregelen i designmanualen). */
export function formatDato(iso: string): string {
  const [aar, mnd, dag] = iso.split('-').map(Number);
  return `${dag}. ${maaneder[mnd - 1]} ${aar}`;
}
