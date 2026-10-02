// Landskabs-tjek (bruges med test/shot.mjs og ?test): måler kollisionsverdenen (alle kasser, man kan stå på eller gå ind i),
// skovens og det grønne bælte træer, terrænets højder og hvor mønter, gaver og dyr starter. Det skal være ens i jul og Halloween,
// og ens før og efter en ændring - så har intet træ, hus eller pynt flyttet sig.
const G = window.__G, PH = window.__PHYS;
const h = (str) => { let x = 2166136261 >>> 0; for (let i = 0; i < str.length; i++) { x ^= str.charCodeAt(i); x = Math.imul(x, 16777619) >>> 0; } return x.toString(16); };
const f = (v) => v.toFixed(3);
const boxesNow = () => { const seen = new Set(); for (let x = -150; x <= 150; x += 50) for (let z = -150; z <= 150; z += 50) for (const b of PH.queryBoxes(x, z, 40)) seen.add(b); return [...seen]; };
const b1 = boxesNow(); const c1 = new Map(b1.map(b => [b, f(b.c.x) + f(b.c.y) + f(b.c.z)]));
await new Promise(r => setTimeout(r, 1500));
const stable = boxesNow().filter(b => c1.get(b) === f(b.c.x) + f(b.c.y) + f(b.c.z)); // bevægelige platforme sorteres fra
const out = {};
out.boxes = h(stable.map(b => [b.c.x, b.c.y, b.c.z, b.h.x, b.h.y, b.h.z].map(f).join(',')).sort().join('|')) + ' (' + stable.length + ')';
const trees = []; const m4 = new (G.camera.matrix.constructor)();
for (const name of ['forest', 'greenBelt']) { const bm = G.scene.getObjectByName(name); if (!bm) continue; const n = bm._instanceInfo ? bm._instanceInfo.length : 0; for (let i = 0; i < n; i++) { bm.getMatrixAt(i, m4); trees.push(name + m4.elements.map(f).join(',')); } }
out.trees = h(trees.join('|')) + ' (' + trees.length + ')';
const hs = []; for (let x = -120; x <= 120; x += 7.3) for (let z = -120; z <= 120; z += 7.3) hs.push(f(G.terrainH(x, z)));
out.terrain = h(hs.join(','));
const GP = window.__GP; if (GP) {
  out.coins = h(GP.coins.map(c => [c.pos.x, c.pos.z].map(v => v.toFixed(1)).join(',')).join('|')) + ' (' + GP.coins.length + ')'; // mønterne vipper op og ned, så kun x og z
  out.gifts = h(GP.gifts.map(c => [c.pos.x, c.pos.y, c.pos.z].map(f).join(',')).join('|'));
  out.blocks = h(GP.qblocks.map(c => [c.pos.x, c.pos.y, c.pos.z].map(f).join(',')).join('|'));
  out.baubles = h(GP.baubles.map(c => [c.pos.x, c.pos.y, c.pos.z].map(f).join(',')).join('|'));
}
return out;
