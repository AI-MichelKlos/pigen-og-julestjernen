// Fingeraftryk af verden og udseende (bruges med test/shot.mjs og ?test):
//  - geometri: bagt statisk pynt indeholder verdenspositioner, så flytter et træ sig, ændres geoHash
//  - materialer, lys, tåge, shadere, efterbehandling, startskærmens tekster og musik
// Alt, der ændrer sig af sig selv (partikler, flakkende lys og flammer), sorteres fra ved at tage to prøver med et lille mellemrum.
// Sammenlign juleudgaven før og efter en ændring: alle felter skal være ens. Halloween og jul skal have samme geoHash.
const G = window.__G;
const h = (str) => { let x = 2166136261 >>> 0; for (let i = 0; i < str.length; i++) { x ^= str.charCodeAt(i); x = Math.imul(x, 16777619) >>> 0; } return x.toString(16); };
const fake = () => ({ uniforms: {}, vertexShader: 'void main(){\n#include <project_vertex>\n}', fragmentShader: 'void main(){\n#include <opaque_fragment>\n#include <emissivemap_fragment>\n}' });
function sample() {
  const geo = [], mats = [], shaders = [], lights = [];
  G.scene.traverse(o => {
    if (o.isLight) lights.push(o.type + o.color.getHexString() + (o.groundColor ? o.groundColor.getHexString() : '') + o.intensity.toFixed(3) + o.position.toArray().map(v => v.toFixed(1)));
    const ms = o.material ? (Array.isArray(o.material) ? o.material : [o.material]) : [];
    for (const m of ms) {
      mats.push(m.type + (m.color ? m.color.getHexString() : '') + (m.emissive ? m.emissive.getHexString() : '') + (m.map ? 'M' : '') + (m.opacity ?? 1).toFixed(2));
      if (m.fragmentShader) shaders.push(h(m.fragmentShader + m.vertexShader));
      if (m.onBeforeCompile && m.onBeforeCompile.toString().length > 30) { const sh = fake(); try { m.onBeforeCompile(sh, G.renderer); shaders.push(h(sh.vertexShader + sh.fragmentShader)); } catch (e) { shaders.push('err'); } }
    }
    if (!o.geometry || o.isPoints) return; // partikler og snefald ændrer sig hele tiden
    const p = o.geometry.attributes.position; let s = 0; if (p) { const a = p.array; for (let i = 0; i < a.length; i += 7) s += a[i] * ((i % 13) + 1); }
    geo.push(o.type + ':' + (p ? p.count : 0) + ':' + s.toFixed(2));
  });
  return { geo, mats, shaders, lights };
}
// vent til spillet faktisk er kørt et stykke frem (tegning er langsom i testbrowseren), så flakkende ting når at ændre sig
const advance = async (dt) => { const t0 = G.GAME.simT; const w0 = Date.now(); while (G.GAME.simT - t0 < dt && Date.now() - w0 < 60000) await new Promise(r => setTimeout(r, 200)); };
const A1 = sample(); await advance(0.6); const A2 = sample(); await advance(0.6); const A3 = sample();
const out = {};
for (const k of ['geo', 'mats', 'shaders', 'lights']) {
  const keep = (list, other) => { const c = new Map(); for (const x of other) c.set(x, (c.get(x) || 0) + 1); return list.filter(x => { const n = c.get(x); if (n) { c.set(x, n - 1); return true; } return false; }); };
  const stable = keep(keep(A1[k], A2[k]), A3[k]).sort();
  out[k] = h(stable.join('|')) + ' (' + stable.length + '/' + A1[k].length + ')';
}
out.fog = G.scene.fog.color.getHexString() + ' ' + G.scene.fog.density;
out.post = h(G.composer.passes.map(p => (p.material ? p.material.fragmentShader : '') + JSON.stringify(p.material ? Object.fromEntries(Object.entries(p.material.uniforms).filter(([k, v]) => typeof v.value === 'number' || (v.value && v.value.isVector3)).map(([k, v]) => [k, v.value])) : {})).join('|'));
out.title = document.title; out.h1 = document.querySelector('#start h1').textContent; out.win = document.querySelector('#win h1').textContent; out.sub = h(document.querySelector('#start .sub').textContent);
const Au = window.__GP ? window.__GP.Audio : null; if (Au) { const s = Au.makeSongs(); out.songs = Object.keys(s).map(k => k + ':' + s[k].spu.toFixed(4) + ':' + s[k].len + ':' + h(s[k].play.toString())).join(' '); }
out.css = h([document.body, document.getElementById('start'), document.getElementById('startBtn'), document.querySelector('#start h1'), document.getElementById('vignette')].map(e => { const c = getComputedStyle(e); return c.background + c.textShadow + c.color; }).join('|'));
return out;
