import puppeteer from 'puppeteer';
const browser = await puppeteer.launch({ headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
page.on('console', (m) => console.log('PAGE:', m.text()));
await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
await new Promise(r => setTimeout(r, 500));
const info = await page.evaluate(() => {
  const els = document.querySelectorAll('[data-reveal]');
  let shown = 0, hidden = 0, other = 0;
  els.forEach(el => {
    const v = el.getAttribute('data-reveal');
    if (v === 'shown') shown++;
    else if (v === 'hidden') hidden++;
    else other++;
  });
  return { total: els.length, shown, hidden, other, prefersReduced: window.matchMedia('(prefers-reduced-motion: reduce)').matches };
});
console.log(JSON.stringify(info, null, 2));
await browser.close();
