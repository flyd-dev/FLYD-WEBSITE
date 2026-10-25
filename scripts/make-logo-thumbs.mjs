#!/usr/bin/env node
// Små kundelogoer til logokarusellen på forsiden (40–48 px høye på skjerm).
// Originalene i public/customer-logo/ er 300 px høye; her lages 144 px høye
// kopier (3× skjermtetthet) i public/customer-logo/sma/. Logoene lastes med en
// gang på mobil, så de store filene (304 kB til sammen) konkurrerte med
// heltebildet. Kjøres før hvert bygg (prebuild), og hopper over logoer som
// allerede er oppdatert. Logoer som er 144 px eller lavere, kopieres som de er
// (ny koding gjorde dem bare større).
import { readdir, stat, mkdir, copyFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const KILDE = join(ROOT, 'public', 'customer-logo');
const MAL = join(KILDE, 'sma');
const HOYDE = 144;

let sharp;
try {
  sharp = (await import('sharp')).default;
} catch {
  console.warn('make-logo-thumbs: fant ikke sharp, hopper over.');
  process.exit(0);
}

await mkdir(MAL, { recursive: true });
let laget = 0;
for (const navn of await readdir(KILDE)) {
  if (!navn.endsWith('.webp')) continue;
  const inn = join(KILDE, navn);
  const ut = join(MAL, navn);
  const s = await stat(inn);
  const u = await stat(ut).catch(() => null);
  if (u && u.mtimeMs >= s.mtimeMs) continue;
  const { height = 0 } = await sharp(inn).metadata();
  if (height <= HOYDE) {
    await copyFile(inn, ut);
  } else {
    await sharp(inn).resize({ height: HOYDE }).webp({ quality: 82, alphaQuality: 90, effort: 6 }).toFile(ut);
  }
  laget++;
}
console.log(`make-logo-thumbs: ${laget} nye eller oppdaterte småbilder.`);
