// Lander pigen fra 4,5 m højde og tæller bladstumperne, der hvirvler op (Halloween). Brug med ?test&tema=halloween.
const G = window.__G; G.P.pos.y += 4.5; G.P.prev.copy(G.P.pos); G.P.vel.set(0, 0, 0);
let lb = null; G.scene.traverse(o => { if (o.isPoints && o.geometry.attributes.position.count === 1500) lb = o; });
const w0 = Date.now(); let maxN = 0, landed = false; const t0 = G.GAME.simT;
while (Date.now() - w0 < 90000) { await new Promise(r => setTimeout(r, 50)); maxN = Math.max(maxN, lb.geometry.drawRange.count); if (G.P.grounded && G.GAME.simT - t0 > 0.3) { landed = true; if (G.GAME.simT - t0 > 0.75) break; } }
return { maxLeafBits: maxN, landed, now: lb.geometry.drawRange.count };
