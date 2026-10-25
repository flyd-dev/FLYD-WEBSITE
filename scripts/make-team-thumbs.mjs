#!/usr/bin/env node
// Små teambilder til de kompakte teamkortene på /om-flyd (84 × 104 px på skjerm).
// Originalene i public/team/ er 800 px brede; her lages 252 px brede kopier
// (3× skjermtetthet) i public/team/sma/. Kjøres før hvert bygg (prebuild), og
// hopper over bilder som allerede er oppdatert.
import { readdir, stat, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const KILDE = join(ROOT, 'public', 'team');
const MAL = join(KILDE, 'sma');
const BREDDE = 252;

let sharp;
try {
  sharp = (await import('sharp')).default;
} catch {
  console.warn('make-team-thumbs: fant ikke sharp, hopper over.');
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
  await sharp(inn).resize({ width: BREDDE }).webp({ quality: 76 }).toFile(ut);
  laget++;
}
console.log(`make-team-thumbs: ${laget} nye eller oppdaterte småbilder.`);
