import puppeteer from 'puppeteer';
const url = process.argv[2] || 'http://localhost:3000/';
const label = process.argv[3] || 'typewriter';
const browser = await puppeteer.launch({ headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
await page.goto(url, { waitUntil: 'networkidle0' });

const targets = ['full oversikt', 'trygg vekst', 'god kontroll', 'ett kompetansehus'];
const captured = new Set();
const start = Date.now();
let i = 0;
while (captured.size < targets.length && Date.now() - start < 40000) {
  const txt = await page.evaluate(() => {
    const h = document.querySelector('h1');
    return h ? h.innerText : '';
  });
  for (const t of targets) {
    if (!captured.has(t) && txt.includes(t + '.')) {
      captured.add(t);
      const safe = t.replace(/\s+/g, '-');
      await page.screenshot({
        path: `./temporary screenshots/tw-${label}-${safe}.png`,
        clip: { x: 0, y: 0, width: 1440, height: 600 }
      });
      console.log(`Captured "${t}"`);
    }
  }
  await new Promise(r => setTimeout(r, 120));
  i++;
}
await browser.close();
console.log(`done (${captured.size}/${targets.length})`);
