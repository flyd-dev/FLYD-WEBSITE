import puppeteer from 'puppeteer';
const url = process.argv[2] || 'http://localhost:3000/';
const top = parseInt(process.argv[3] ?? '0', 10);
const height = parseInt(process.argv[4] ?? '900', 10);
const label = process.argv[5] || 'zoom';
const width = parseInt(process.argv[6] ?? '1440', 10);
const browser = await puppeteer.launch({ headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width, height: Math.max(900, height + top), deviceScaleFactor: 2 });
await page.goto(url, { waitUntil: 'networkidle0' });
await new Promise(r => setTimeout(r, 300));
await page.evaluate(async () => {
  for (let y = 0; y <= document.body.scrollHeight; y += 400) {
    window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60));
  }
  window.scrollTo(0, 0); await new Promise(r => setTimeout(r, 1500));
});
await page.screenshot({
  path: `./temporary screenshots/zoom-${label}.png`,
  clip: { x: 0, y: top, width, height }
});
await browser.close();
console.log(`Saved zoom-${label}.png`);
