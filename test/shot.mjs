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
if (scriptFile) for (const sf of scriptFile.split(',')) { // flere scripts adskilt af komma køres efter hinanden
  const body = fs.readFileSync(sf, 'utf8');
  const res = await page.evaluate(new Function('return (async () => {' + body + '})()'));
  if (res !== undefined) console.log('script:', JSON.stringify(res));
}
// VIEWS='[{"p":[x,y,z],"l":[x,y,z]}, ...]' tager ét billede pr. kameravinkel (out_0.png, out_1.png, ...) i samme browser
// ("gy":true betyder, at y-værdierne regnes fra jorden under punktet)
if (process.env.VIEWS && out !== 'none') {
  const views = JSON.parse(process.env.VIEWS);
  await page.evaluate(() => { window.__view = null; window.__G.HOOKS.render.push(() => { const v = window.__view; if (v && v.p) { const G = window.__G, py = v.gy ? G.terrainH(v.p[0], v.p[2]) : 0, ly = v.gy ? G.terrainH(v.l[0], v.l[2]) : 0; G.camera.position.set(v.p[0], v.p[1] + py, v.p[2]); G.camera.lookAt(v.l[0], v.l[1] + ly, v.l[2]); } }); });
  for (let i = 0; i < views.length; i++) {
    await page.evaluate((v) => { window.__view = v; if (v.player) { const P = window.__G.P; P.pos.set(...v.player); P.prev.copy(P.pos); P.vel.set(0, 0, 0); } }, views[i]);
    await page.waitForTimeout(views[i].wait ?? 4000);
    await page.screenshot({ path: out.replace(/\.png$/, `_${i}.png`), timeout: 300000 });
    console.log('view', i, ((Date.now() - t0) / 1000).toFixed(1), 's');
  }
} else if (out !== "none") await page.screenshot({ path: out, timeout: 300000 });
console.log('shot in', ((Date.now() - t0) / 1000).toFixed(1), 's');
for (const l of logs.slice(0, 20)) console.log(l);
await browser.close();
