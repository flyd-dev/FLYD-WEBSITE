import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const url = process.argv[2] || 'http://localhost:3000/';
const label = process.argv[3] || '';
const viewport = process.argv[4] || 'desktop';

const dir = './temporary screenshots';
fs.mkdirSync(dir, { recursive: true });
const existing = fs.readdirSync(dir).filter((f) => f.startsWith('screenshot-'));
const n =
  existing
    .map((f) => parseInt(f.replace('screenshot-', '').split(/[^0-9]/)[0]))
    .filter((x) => !isNaN(x))
    .reduce((a, b) => Math.max(a, b), 0) + 1;
const suffix = label ? `-${label}` : '';
const out = path.join(dir, `screenshot-${n}${suffix}.png`);

const browser = await puppeteer.launch({ headless: 'new' });
const page = await browser.newPage();
const vw = viewport === 'mobile' ? 390 : 1440;
const vh = viewport === 'mobile' ? 844 : 900;
await page.setViewport({ width: vw, height: vh, deviceScaleFactor: 2 });
await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
// Pre-reveal: scroll to bottom to trigger IntersectionObservers, then back to top
await page.evaluate(async () => {
  const step = 400;
  const h = document.body.scrollHeight;
  for (let y = 0; y <= h; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 80));
  }
  window.scrollTo(0, 0);
  await new Promise((r) => setTimeout(r, 1600));
});
await page.screenshot({ path: out, fullPage: true });
await browser.close();
console.log(`Saved ${out}`);
