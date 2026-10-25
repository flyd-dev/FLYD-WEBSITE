#!/usr/bin/env node
// Lager kartet over Sør-Vest-Norge til kontorkartet (components/Kontorkart.tsx).
//
// Kilde: fylkesgrensene i robhop/fylker-og-kommuner, basert på Kartverkets data
// (CC BY 4.0, klippet etter kystlinjen). Skriptet projiserer kartet, tar bare
// med land innenfor utsnittet og forenkler kystlinjen, og skriver resultatet til
// data/kontorkart.ts. Kjøres bare når utsnittet eller kilden skal endres:
//
//   node scripts/make-kontorkart.mjs [sti/til/Fylker-L.geojson]
import { readFile, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const KILDE = 'https://raw.githubusercontent.com/robhop/fylker-og-kommuner/main/Fylker-L.geojson';

// Utsnitt (grader) og størrelse på viewBox. Bredden følger av breddegraden, så
// kartet ikke blir strukket.
const SYD = 58.0;
const NORD = 59.2;
const MIDT_LNG = 6.3;
const HOYDE = 800;
const LAT0 = (SYD + NORD) / 2;
const KX = Math.cos((LAT0 * Math.PI) / 180);
const ENHET = HOYDE / (NORD - SYD); // viewBox-enheter per breddegrad
const BREDDE = Math.round(HOYDE * 1.25);
const VEST = MIDT_LNG - BREDDE / ENHET / KX / 2;
const OST = MIDT_LNG + BREDDE / ENHET / KX / 2;
const TOLERANSE = 1.6; // forenkling i viewBox-enheter (kartet vises sjelden over 700 px bredt)

const fremhevet = new Set(['11', '42']); // Rogaland og Agder

const projiser = ([lng, lat]) => [(lng - VEST) * KX * ENHET, (NORD - lat) * ENHET];

function avstand(p, a, b) {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const l = dx * dx + dy * dy;
  if (!l) return Math.hypot(p[0] - a[0], p[1] - a[1]);
  const t = Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / l));
  return Math.hypot(p[0] - (a[0] + t * dx), p[1] - (a[1] + t * dy));
}

// Douglas–Peucker, iterativt så lange kystlinjer ikke sprenger stakken.
function forenkle(punkter) {
  if (punkter.length < 4) return punkter;
  const behold = new Uint8Array(punkter.length);
  behold[0] = behold[punkter.length - 1] = 1;
  const stakk = [[0, punkter.length - 1]];
  while (stakk.length) {
    const [a, b] = stakk.pop();
    let maks = 0;
    let idx = -1;
    for (let i = a + 1; i < b; i++) {
      const d = avstand(punkter[i], punkter[a], punkter[b]);
      if (d > maks) {
        maks = d;
        idx = i;
      }
    }
    if (maks > TOLERANSE) {
      behold[idx] = 1;
      stakk.push([a, idx], [idx, b]);
    }
  }
  return punkter.filter((_, i) => behold[i]);
}

const iUtsnittet = (ring) =>
  ring.some(([x, y]) => x > -40 && x < BREDDE + 40 && y > -40 && y < HOYDE + 40);

function sti(polygoner) {
  let d = '';
  for (const polygon of polygoner) {
    for (const ring of polygon) {
      const p = forenkle(ring.map(projiser));
      if (p.length < 4 || !iUtsnittet(p)) continue;
      // Små holmer under fire enheter på tvers blir bare støy.
      const xs = p.map((q) => q[0]);
      const ys = p.map((q) => q[1]);
      if (Math.max(...xs) - Math.min(...xs) < 4 && Math.max(...ys) - Math.min(...ys) < 4) continue;
      d += 'M' + p.map(([x, y]) => `${Math.round(x)} ${Math.round(y)}`).join('L') + 'Z';
    }
  }
  return d;
}

const tekst = process.argv[2]
  ? await readFile(process.argv[2], 'utf8')
  : await (await fetch(KILDE)).text();
const geo = JSON.parse(tekst);

const deler = { fremhevet: [], andre: [] };
for (const f of geo.features) {
  const polys = f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates;
  (fremhevet.has(f.properties.fylkesnummer) ? deler.fremhevet : deler.andre).push(...polys);
}

const land = sti(deler.fremhevet);
const naboer = sti(deler.andre);

const ut = `// Generert av scripts/make-kontorkart.mjs – ikke rediger for hånd.
// Kartdata: Kartverket (CC BY 4.0), via robhop/fylker-og-kommuner.

export const kartBredde = ${BREDDE};
export const kartHoyde = ${HOYDE};

/** Rogaland og Agder. */
export const kartLand = '${land}';

/** Nabofylkene i utsnittet (Vestland, Telemark). */
export const kartNaboer = '${naboer}';

/** Breddegrad og lengdegrad til punkt i viewBox, med samme projeksjon som kartet. */
export function kartPunkt(lat: number, lng: number): [number, number] {
  return [(lng - ${VEST.toFixed(6)}) * ${(KX * ENHET).toFixed(6)}, (${NORD} - lat) * ${ENHET.toFixed(6)}];
}
`;
await writeFile(join(ROOT, 'data', 'kontorkart.ts'), ut);
console.log(`make-kontorkart: ${BREDDE}×${HOYDE}, land ${(land.length / 1024).toFixed(1)} KB, naboer ${(naboer.length / 1024).toFixed(1)} KB`);
