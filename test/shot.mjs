// node test/shot.mjs <side> <query> <billede.png | none> [script.js] [bredde] [højde]   (serveren skal køre på 127.0.0.1:8123 fra test-mappen)
// Åbner spillet i headless Chromium, kører evt. et script (async function body med adgang til window.__G) og tager et billede.
import { chromium } from '/opt/npm-tools/node_modules/playwright/index.mjs';
import fs from 'fs';
const [page0, query, out, scriptFile, W = '960', H = '540'] = process.argv.slice(2);
const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium',
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--no-proxy-server', '--autoplay-policy=no-user-gesture-required'],
});
const ctx = await browser.newContext({ viewport: { width: +W, height: +H } });
const page = await ctx.newPage();
await page.route(/fonts\.(googleapis|gstatic)\.com/, r => r.abort());
const logs = [];
page.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') logs.push(m.type() + ': ' + m.text()); });
page.on('pageerror', e => logs.push('PAGEERROR: ' + e.message));
const t0 = Date.now();
await page.goto(`http://127.0.0.1:8123/${page0}${query}`, { waitUntil: 'load', timeout: 180000 });
await page.waitForFunction(() => window.__G || document.querySelector('#startBtn:not([disabled])'), null, { timeout: 300000 });
console.log('loaded in', ((Date.now() - t0) / 1000).toFixed(1), 's');
if (scriptFile) {
  const body = fs.readFileSync(scriptFile, 'utf8');
  const res = await page.evaluate(new Function('return (async () => {' + body + '})()'));
  if (res !== undefined) console.log('script:', JSON.stringify(res));
}
if (out !== "none") await page.screenshot({ path: out, timeout: 300000 });
console.log('shot in', ((Date.now() - t0) / 1000).toFixed(1), 's');
for (const l of logs.slice(0, 20)) console.log(l);
await browser.close();
