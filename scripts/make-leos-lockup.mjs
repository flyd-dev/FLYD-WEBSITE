// Lager Leo's Lekeland-logoen til kundestripa: løvehodet fra den offisielle
// ikonfila (grønn flis fjernet) til venstre, det offisielle ordmerket til høyre.
// Bare utklipp og plassering, ingen omtegning eller omfarging.
// Kilder (lastet ned 16.10.2026, ligger i brand_assets/customer-logo-src/):
//   leos-lekeland-icon.png     ← https://www.leoslekeland.no/icon.png
//   leos-lekeland-ordmerke.svg ← https://www.leoslekeland.no/_next/static/media/logo.36b72qk9tq227.svg
// Kjør: node scripts/make-leos-lockup.mjs
import sharp from 'sharp';

const ICON = 'brand_assets/customer-logo-src/leos-lekeland-icon.png';
const WORDMARK = 'brand_assets/customer-logo-src/leos-lekeland-ordmerke.svg';
const OUT = 'public/customer-logo/leos-lekeland.webp';

const BG = [17, 87, 64]; // flisfargen #115740
const T0 = 14; // avstand under dette: ren bakgrunn
const T1 = 72; // avstand over dette: rent motiv

const { data, info } = await sharp(ICON).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const W = info.width;
const H = info.height;
const dist = new Float32Array(W * H);
for (let i = 0; i < W * H; i++) {
  const r = data[i * 4] - BG[0];
  const g = data[i * 4 + 1] - BG[1];
  const b = data[i * 4 + 2] - BG[2];
  dist[i] = Math.sqrt(r * r + g * g + b * b);
}

// Flomfyll fra kanten: bare bakgrunn som henger sammen med flisa nøkles ut,
// så de grønne øynene står urørt.
const reached = new Uint8Array(W * H);
const queue = [];
const push = (x, y) => {
  if (x < 0 || y < 0 || x >= W || y >= H) return;
  const i = y * W + x;
  if (reached[i] || (data[i * 4 + 3] > 0 && dist[i] >= T1)) return;
  reached[i] = 1;
  queue.push(i);
};
for (let x = 0; x < W; x++) { push(x, 0); push(x, H - 1); }
for (let y = 0; y < H; y++) { push(0, y); push(W - 1, y); }
while (queue.length) {
  const i = queue.pop();
  const x = i % W;
  const y = (i / W) | 0;
  push(x + 1, y); push(x - 1, y); push(x, y + 1); push(x, y - 1);
}

const out = Buffer.from(data);
for (let i = 0; i < W * H; i++) {
  if (!reached[i]) continue;
  const t = Math.min(1, Math.max(0, (dist[i] - T0) / (T1 - T0)));
  const a = t * t * (3 - 2 * t);
  out[i * 4 + 3] = Math.round(a * data[i * 4 + 3]);
  // Fjern grønnskjæret i pelskanten: P = a·F + (1−a)·B → F
  for (let c = 0; c < 3; c++) {
    out[i * 4 + c] = a > 0.02
      ? Math.max(0, Math.min(255, Math.round((data[i * 4 + c] - (1 - a) * BG[c]) / a)))
      : 0;
  }
}
const cut = await sharp(out, { raw: { width: W, height: H, channels: 4 } }).png().toBuffer();
const head = await sharp(cut).trim({ threshold: 1 }).png().toBuffer({ resolveWithObject: true });
const headW = head.info.width;
const headH = head.info.height;

// Ordmerket rendres som vektor i 58 % av hodets høyde, midtstilt loddrett.
const wordH = Math.round(headH * 0.58);
const word = await sharp(WORDMARK, { density: 72 * (wordH / 41) * 1.05 })
  .resize({ height: wordH })
  .png()
  .toBuffer({ resolveWithObject: true });
const gap = Math.round(headH * 0.1);

await sharp({
  create: { width: headW + gap + word.info.width, height: headH, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
})
  .composite([
    { input: head.data, left: 0, top: 0 },
    { input: word.data, left: headW + gap, top: Math.round((headH - wordH) / 2) },
  ])
  .webp({ lossless: true })
  .toFile(OUT);

console.log(`${OUT}: ${headW + gap + word.info.width}×${headH}`);
