import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const url = process.argv[2] || 'http://localhost:3000/';
const textMatch = process.argv[3] || null;
const label = process.argv[4] || 'zoom';
const dir = './temporary screenshots';
fs.mkdirSync(dir, { recursive: true });
const existing = fs.readdirSync(dir).filter((f) => f.startsWith('screenshot-'));
const n =
  existing
    .map((f) => parseInt(f.replace('screenshot-', '').split(/[^0-9]/)[0]))
    .filter((x) => !isNaN(x))
    .reduce((a, b) => Math.max(a, b), 0) + 1;
const out = path.join(dir, `screenshot-${n}-${label}.png`);

const browser = await puppeteer.launch({ headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
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

if (textMatch) {
  await page.evaluate((needle) => {
    const els = Array.from(document.querySelectorAll('h1, h2, h3, p, a, span'));
    const hit = els.find((el) => el.textContent && el.textContent.trim().includes(needle));
    if (hit) hit.scrollIntoView({ block: 'center' });
  }, textMatch);
  await new Promise((r) => setTimeout(r, 800));
}
await page.screenshot({ path: out, fullPage: false });
await browser.close();
console.log(`Saved ${out}`);
