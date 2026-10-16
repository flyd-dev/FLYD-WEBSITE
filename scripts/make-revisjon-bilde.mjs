// Lager tjenestebildet for Revisjon: Fias portretter av de to statsautoriserte
// revisorene (Irene Bendiksen og Heidi Elizabeth Odden) side om side i 4:3,
// samme format som de andre tjenestebildene (1000×750 WebP).
// Bare utsnitt og plassering, ingen filtre. Portrettene er allerede i gråtoner
// med samme bakgrunn som resten av teamet.
// Kjør: node scripts/make-revisjon-bilde.mjs
import sharp from 'sharp';

const PORTRETTER = ['public/team/flyd-irene.webp', 'public/team/flyd-heidi.webp'];
const OUT = 'public/tjenestebilder/revisjon.webp';
const W = 1000;
const H = 750;
// Smal Sand-fuge mellom portrettene, så det leses som to bilder og ikke en skjøt.
const FUGE = 8;
const HALV = (W - FUGE) / PORTRETTER.length;

const deler = await Promise.all(
  PORTRETTER.map((src) =>
    sharp(src)
      // 3:4-portrettet beskjæres til 2:3 fra midten, ansiktet står midt i bildet.
      .resize(HALV, H, { fit: 'cover', position: 'centre' })
      .toBuffer(),
  ),
);

await sharp({ create: { width: W, height: H, channels: 3, background: '#F8F6F1' } })
  .composite(deler.map((input, i) => ({ input, left: i * (HALV + FUGE), top: 0 })))
  .webp({ quality: 82 })
  .toFile(OUT);

console.log(`Lagret ${OUT}`);
