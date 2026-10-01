// Lager favikonene fra logoens egne konturer («f» og punktum) – Sand på
// Flyd-teal, etter designmanualen. Kjør: node scripts/make-favicons.mjs
import fs from 'node:fs';
import sharp from 'sharp';

const logo = fs.readFileSync('components/FlydLogo.tsx', 'utf8');
const d = logo.match(/d="([^"]+)"/)[1];
const parts = d.split(/ (?=M )/);
const f = parts.find((p) => p.startsWith('M 191.500 82.707'));
const dot = parts.find((p) => p.startsWith('M 866 366.485'));
if (!f || !dot) throw new Error('Fant ikke «f» eller punktum i FlydLogo.tsx');

// «f» spenner x 82–243, y 82–396; punktumet flyttes inntil, 30 enheter unna.
const s = 300 / 314;
const tx = (512 - 250 * s) / 2 - 82 * s;
const ty = (512 - 314 * s) / 2 - 82 * s;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#4C8687"/>
  <g fill="#F8F6F1" transform="translate(${tx.toFixed(2)} ${ty.toFixed(2)}) scale(${s.toFixed(4)})">
    <path d="${f}"/>
    <path transform="translate(-593 0)" d="${dot}"/>
  </g>
</svg>
`;
fs.writeFileSync('public/favicon.svg', svg);

const png = (size) => sharp(Buffer.from(svg)).resize(size, size).png({ compressionLevel: 9 }).toBuffer();
const sizes = { 'favicon-32.png': 32, 'favicon-192.png': 192, 'favicon-512.png': 512, 'favicon.png': 256, 'apple-touch-icon.png': 180 };
for (const [file, size] of Object.entries(sizes)) fs.writeFileSync(`public/${file}`, await png(size));

// favicon.ico med to PNG-bilder (16 og 32 px) – støttes av alle moderne nettlesere.
const icoImages = [await png(16), await png(32)];
const header = Buffer.alloc(6 + 16 * icoImages.length);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(icoImages.length, 4);
let offset = header.length;
icoImages.forEach((img, i) => {
  const size = i === 0 ? 16 : 32;
  const e = 6 + 16 * i;
  header.writeUInt8(size, e);
  header.writeUInt8(size, e + 1);
  header.writeUInt8(0, e + 2);
  header.writeUInt8(0, e + 3);
  header.writeUInt16LE(1, e + 4);
  header.writeUInt16LE(32, e + 6);
  header.writeUInt32LE(img.length, e + 8);
  header.writeUInt32LE(offset, e + 12);
  offset += img.length;
});
fs.writeFileSync('public/favicon.ico', Buffer.concat([header, ...icoImages]));
console.log('Favikoner skrevet');
