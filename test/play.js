const G = window.__G; const A = window.__GP.Audio; const res = {};
try { A.init(); await new Promise(r => setTimeout(r, 300)); res.ctx = A.ctx && A.ctx.state;
  const s = A.makeSongs(); for (const k of Object.keys(s)) { let n = 0; for (let u = 0; u < s[k].len; u++) { s[k].play(A, u, A.t + 0.1 + u * 0.001); n++; } res[k] = n; }
  res.cur = A.cur === A.songs.jingle ? 'jingle' : A.cur === A.songs.silent ? 'silent' : '?';
} catch (e) { res.err = String(e); }
await new Promise(r => setTimeout(r, 4000));
return res;
