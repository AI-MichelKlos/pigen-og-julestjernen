// emulér titelkameraet ved et fast tidspunkt T (Halloween-formlen), så billedet kan sammenlignes
const G = window.__G; const T = window.__T ?? 3;
G.HOOKS.render.push(() => { const a = T * 0.06 + 0.4; const top = G.TOWER.top; G.camera.position.set(Math.sin(a) * 48, top + 1 + Math.sin(T * 0.2) * 2, Math.cos(a) * 48); G.camera.lookAt(0, top + 3, 0); });
await new Promise(r => setTimeout(r, 3000));
return { top: G.TOWER.top };
