// Preprocess partner PNGs: convert near-white backgrounds to transparent.
// Uses puppeteer's canvas to avoid adding image-processing deps.
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const srcDir = path.resolve('public/partners');
const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.png'));

const browser = await puppeteer.launch({ headless: 'new' });
const page = await browser.newPage();
await page.setContent('<html><body></body></html>');

for (const f of files) {
  const abs = path.join(srcDir, f);
  const buf = fs.readFileSync(abs);
  const b64 = buf.toString('base64');
  const dataUrl = `data:image/png;base64,${b64}`;

  const out = await page.evaluate(async (url) => {
    const img = new Image();
    img.src = url;
    await img.decode();
    const c = document.createElement('canvas');
    c.width = img.naturalWidth;
    c.height = img.naturalHeight;
    const ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const d = ctx.getImageData(0, 0, c.width, c.height);
    const px = d.data;
    // Threshold: pixels brighter than ~230 on all channels become fully transparent.
    // Pixels in the 200-230 luminance zone get proportional alpha fade.
    const HARD = 235; // fully transparent above this
    const SOFT = 200; // start fading above this
    for (let i = 0; i < px.length; i += 4) {
      const r = px[i], g = px[i+1], b = px[i+2];
      const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      if (lum >= HARD) {
        px[i+3] = 0;
      } else if (lum >= SOFT) {
        const t = (lum - SOFT) / (HARD - SOFT);
        px[i+3] = Math.round(255 * (1 - t));
      }
    }
    ctx.putImageData(d, 0, 0);
    return c.toDataURL('image/png');
  }, dataUrl);

  const outBuf = Buffer.from(out.split(',')[1], 'base64');
  fs.writeFileSync(abs, outBuf);
  console.log('Processed', f, '->', outBuf.length, 'bytes');
}
await browser.close();
