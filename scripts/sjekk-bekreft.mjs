// Stopper publisering hvis en side i det ferdige bygget inneholder [BEKREFT].
//
// Kjører automatisk etter `npm run build` (postbuild), men slår bare til for
// produksjonsbygg på Vercel (VERCEL_ENV=production). Lokalt og på
// forhåndsvisninger skal [BEKREFT] synes. Kjør sjekken for hånd med
// `npm run sjekk:bekreft`.
//
// Appen er ikke lenger statisk eksport, så de forhåndsgenererte sidene ligger i
// .next/server/app. out/ sjekkes også hvis den finnes (gammel eksport).
import fs from 'node:fs';
import path from 'node:path';

const force = process.argv.includes('--alltid');
if (!force && process.env.VERCEL_ENV !== 'production') process.exit(0);

const kandidater = ['.next/server/app', 'out'];
const mapper = kandidater.filter((d) => fs.existsSync(path.join(process.cwd(), d)));
if (!mapper.length) {
  console.error(
    `sjekk-bekreft: fant verken ${kandidater.join(' eller ')}. Kjør \`npm run build\` først.`,
  );
  process.exit(1);
}

const treff = [];
let antall = 0;
const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (entry.name.endsWith('.html')) {
      antall++;
      if (fs.readFileSync(p, 'utf8').includes('[BEKREFT')) {
        treff.push(path.relative(process.cwd(), p));
      }
    }
  }
};
for (const d of mapper) walk(path.join(process.cwd(), d));

if (!antall) {
  console.error(`sjekk-bekreft: fant ingen HTML-filer i ${mapper.join(', ')}.`);
  process.exit(1);
}

if (treff.length) {
  console.error(
    `\n[BEKREFT] står fortsatt på disse sidene (av ${antall} HTML-filer i ${mapper.join(', ')}), så de kan ikke publiseres:`,
  );
  for (const t of treff) console.error(`  - ${t}`);
  console.error('Fyll inn innholdet i data/, eller sett siden til status «utkast».\n');
  process.exit(1);
}
console.log(
  `sjekk-bekreft: ingen [BEKREFT] i ${antall} HTML-filer (${mapper.join(', ')}).`,
);
