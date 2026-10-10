// Stopper publisering hvis en side i det ferdige bygget inneholder [BEKREFT].
//
// Kjører automatisk etter `npm run build` (postbuild), men slår bare til for
// produksjonsbygg på Vercel (VERCEL_ENV=production). Lokalt og på
// forhåndsvisninger skal [BEKREFT] synes. Kjør sjekken for hånd med
// `npm run sjekk:bekreft`.
import fs from 'node:fs';
import path from 'node:path';

const force = process.argv.includes('--alltid');
if (!force && process.env.VERCEL_ENV !== 'production') process.exit(0);

const outDir = path.join(process.cwd(), 'out');
if (!fs.existsSync(outDir)) {
  console.error('sjekk-bekreft: fant ikke out/. Kjør `npm run build` først.');
  process.exit(1);
}

const treff = [];
const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (entry.name.endsWith('.html') && fs.readFileSync(p, 'utf8').includes('[BEKREFT')) {
      treff.push(path.relative(outDir, p));
    }
  }
};
walk(outDir);

if (treff.length) {
  console.error('\n[BEKREFT] står fortsatt på disse sidene, så de kan ikke publiseres:');
  for (const t of treff) console.error(`  - ${t}`);
  console.error('Fyll inn innholdet i data/, eller sett siden til status «utkast».\n');
  process.exit(1);
}
console.log('sjekk-bekreft: ingen [BEKREFT] i bygget.');
