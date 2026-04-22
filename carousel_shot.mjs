import puppeteer from 'puppeteer';
const browser = await puppeteer.launch({ headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 1200, deviceScaleFactor: 2 });
await page.goto('http://localhost:3000/karriere/', { waitUntil: 'networkidle0' });
await new Promise(r => setTimeout(r, 300));
await page.evaluate(async () => {
  for (let y = 0; y <= document.body.scrollHeight; y += 400) {
    window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60));
  }
  window.scrollTo(0, 0);
  await new Promise(r => setTimeout(r, 1200));
});
for (let i = 0; i < 3; i++) {
  await page.evaluate(() => {
    const btns = document.querySelectorAll('button[aria-label="Neste"]');
    btns[0]?.click();
  });
  await new Promise(r => setTimeout(r, 700));
}
await new Promise(r => setTimeout(r, 400));
await page.screenshot({
  path: './temporary screenshots/carousel-456-v2.png',
  clip: { x: 0, y: 680, width: 1440, height: 600 }
});
await browser.close();
console.log('Saved carousel-456-v2.png');
