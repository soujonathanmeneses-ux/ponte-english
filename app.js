/* Ponte English — lógica do app (sem dependências) */
(function () {
  'use strict';

  /* ---------- dados ---------- */
  const LV = window.COURSE.levels;
  LV.forEach(function (l) {
    l.units.forEach(function (u, i) {
      u.id = l.id + '-' + (i + 1); u.n = i + 1; u.level = l;
      u.words = u.words.map(function (a, k) {
        return { id: u.id + ':' + k, en: a[0], pt: a[1], e: a[2], ex: a[3], exPt: a[4], ph: a[5] || '', unit: u };
      });
    });
  });
  const UNITS = LV.flatMap(function (l) { return l.units; });
  const WORDS = UNITS.flatMap(function (u) { return u.words; });
  const WORD_BY_ID = {}; WORDS.forEach(function (w) { WORD_BY_ID[w.id] = w; });
  const GOAL = 50;

  /* ---------- progresso salvo no navegador ---------- */
  const KEY = 'ponte-english-v1';
  const DEF = { xp: 0, days: {}, units: {}, review: {}, last: null, rate: 0.9, theme: 'auto', level: null };
  let S = load();
  function load() {
    try { const s = JSON.parse(localStorage.getItem(KEY) || 'null'); return Object.assign({}, DEF, s || {}); }
    catch (e) { return Object.assign({}, DEF); }
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { } }
  function dayKey(d) { return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  function today() { return dayKey(new Date()); }
  function addXP(n) { S.xp += n; S.days[today()] = (S.days[today()] || 0) + n; save(); }
  function streak() {
    let n = 0; const d = new Date();
    if (!S.days[dayKey(d)]) d.setDate(d.getDate() - 1);
    while (S.days[dayKey(d)]) { n++; d.setDate(d.getDate() - 1); }
    return n;
  }
  function unitState(u) { return S.units[u.id] || {}; }
  function isDone(u) { return (unitState(u).best || 0) >= 0.6; }
  function starsOf(u) { const b = unitState(u).best; return b == null ? 0 : b >= 0.9 ? 3 : b >= 0.75 ? 2 : 1; }
  function learnedWords() { return UNITS.filter(isDone).reduce(function (n, u) { return n + u.words.length; }, 0); }

  /* ---------- tema ---------- */
  function applyTheme() {
    const r = document.documentElement;
    if (S.theme === 'auto') r.removeAttribute('data-theme'); else r.setAttribute('data-theme', S.theme);
  }

  /* ---------- áudio (voz do próprio aparelho) ---------- */
  const canSpeak = typeof window.speechSynthesis !== 'undefined' && typeof window.SpeechSynthesisUtterance !== 'undefined';
  let voice = null;
  function pickVoice() {
    try {
      const vs = speechSynthesis.getVoices();
      voice = vs.find(function (v) { return /en[-_]US/i.test(v.lang) && /Google|Samantha|Natural|Aria|Jenny/i.test(v.name); }) ||
        vs.find(function (v) { return /en[-_]US/i.test(v.lang); }) || vs.find(function (v) { return /^en/i.test(v.lang); }) || null;
    } catch (e) { }
  }
  if (canSpeak) { pickVoice(); try { speechSynthesis.onvoiceschanged = pickVoice; } catch (e) { } }
  function say(text, rate) {
    if (!canSpeak) return;
    try {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'en-US'; if (voice) u.voice = voice; u.rate = rate || S.rate;
      speechSynthesis.speak(u);
    } catch (e) { }
  }

  /* ---------- utilidades ---------- */
  const $ = function (s, r) { return (r || document).querySelector(s); };
  const $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function plain(s) { return s.replace(/[{}]/g, ''); }
  function boldWord(s) { return esc(s).replace(/\{(.+?)\}/, '<b>$1</b>'); }
  function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  function norm(s) { return s.toLowerCase().replace(/[-’']/g, function (c) { return c === '-' ? ' ' : "'"; }).replace(/[.!?,;]/g, '').replace(/\s+/g, ' ').trim(); }
  function lvStyle(l) { return '--lv:' + l.color + ';--lv-soft:' + l.soft; }
  function others(w, pool, n) {
    const base = pool.filter(function (x) { return x.en !== w.en && x.pt !== w.pt; });
    let res = shuffle(base).slice(0, n);
    if (res.length < n) {
      const extra = shuffle(WORDS.filter(function (x) { return x.en !== w.en && res.indexOf(x) < 0; })).slice(0, n - res.length);
      res = res.concat(extra);
    }
    return res;
  }

  /* ---------- ícones ---------- */
  const I = {
    home: '<svg viewBox="0 0 24 24"><path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" stroke-linejoin="round"/></svg>',
    path: '<svg viewBox="0 0 24 24"><circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="6" r="2.5"/><path d="M8.5 18H15a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h6.5" stroke-linecap="round"/></svg>',
    review: '<svg viewBox="0 0 24 24"><path d="M20 11a8 8 0 1 0-2.3 5.7M20 4v7h-7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    test: '<svg viewBox="0 0 24 24"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" stroke-linecap="round"/></svg>',
    settings: '<svg viewBox="0 0 24 24"><path d="M4 7h10M18 7h2M4 17h4M12 17h8" stroke-linecap="round"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="17" r="2"/></svg>',
    x: '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18" stroke-linecap="round"/></svg>',
    back: '<svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    bridge: '<svg viewBox="0 0 24 24" fill="none" stroke-width="2.4"><path d="M2 17h20M4 17v-4a8 8 0 0 1 16 0v4M9 17v-3M15 17v-3" stroke-linecap="round"/></svg>',
    sound: '<svg viewBox="0 0 24 24"><path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16 8.5a5 5 0 0 1 0 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>'
  };
  const NAV = [['home', 'Início'], ['path', 'Trilha'], ['review', 'Revisão'], ['test', 'Nível'], ['settings', 'Ajustes']];

  /* ---------- estrutura ---------- */
  const root = document.getElementById('root');
  root.innerHTML =
    '<div class="shell"><aside class="side"><div class="logo"><span class="logo-mark">' + I.bridge + '</span>Ponte English</div>' +
    NAV.map(function (n) { return '<button class="nav-btn" data-nav="' + n[0] + '">' + I[n[0]] + '<span>' + n[1] + '</span></button>'; }).join('') +
    '<div class="side-foot"><span class="mono">Pontos totais</span><b id="side-xp">0</b></div></aside>' +
    '<main id="view"></main></div>' +
    '<nav class="tabbar">' + NAV.map(function (n) { return '<button class="nav-btn" data-nav="' + n[0] + '">' + I[n[0]] + '<span>' + n[1] + '</span></button>'; }).join('') + '</nav>' +
    '<div class="sheet" id="sheet" hidden></div>';
  const view = $('#view');
  $$('[data-nav]').forEach(function (b) { b.onclick = function () { go(b.dataset.nav); }; });

  let current = 'home';
  function go(name, arg) {
    current = name; setSession(false); hideSheet();
    $$('[data-nav]').forEach(function (b) { b.classList.toggle('on', b.dataset.nav === name || (name === 'unit' && b.dataset.nav === 'path')); });
    const revN = Object.keys(S.review).length;
    $$('[data-nav="review"]').forEach(function (b) {
      const old = $('.nav-badge', b); if (old) old.remove();
      if (revN) b.insertAdjacentHTML('beforeend', '<span class="nav-badge">' + revN + '</span>');
    });
    $('#side-xp').textContent = S.xp;
    ({ home: home, path: path, unit: unitView, review: review, test: testIntro, settings: settings })[name](arg);
    if (!(arg && arg.keepScroll)) window.scrollTo(0, 0);
  }
  function setSession(on) { document.body.classList.toggle('in-session', on); }

  /* ---------- início ---------- */
  function nextUnit() {
    const last = UNITS.find(function (u) { return u.id === S.last; });
    if (last && !isDone(last)) return last;
    return UNITS.find(function (u) { return !isDone(u); }) || last || UNITS[0];
  }
  function home() {
    const h = new Date().getHours();
    const greet = h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
    const u = nextUnit(), l = u.level;
    const tx = S.days[today()] || 0, pct = Math.min(1, tx / GOAL), C = 2 * Math.PI * 36;
    const st = streak();
    const labels = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
    let week = '';
    for (let k = 6; k >= 0; k--) {
      const d = new Date(); d.setDate(d.getDate() - k);
      week += '<div><i class="' + (S.days[dayKey(d)] ? 'on' : '') + (k === 0 ? ' today' : '') + '"></i>' + labels[d.getDay()] + '</div>';
    }
    const revN = Object.keys(S.review).length;
    const dayN = Math.floor(Date.now() / 864e5);
    const wod = WORDS[(dayN * 7) % WORDS.length];
    const started = !!unitState(u).seen;
    view.innerHTML =
      '<header class="page-h"><p class="mono">' + new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' }) + '</p>' +
      '<h1>' + greet + '! <span>Bora praticar?</span></h1></header>' +
      '<div class="bento">' +
      '<button class="tile t-continue" id="continue" style="' + lvStyle(l) + '"><span class="lv-code">' + l.id + ' · ' + esc(l.name) + '</span>' +
      '<div><p class="mono">Unidade ' + u.n + ' · ' + esc(u.en) + '</p><h2>' + esc(u.title) + '</h2></div>' +
      '<span class="pill">' + (started ? 'Continuar' : 'Começar') + ' →</span><span class="big-emoji" aria-hidden="true">' + u.icon + '</span></button>' +
      '<div class="tile"><div class="tile-h"><h3>Meta do dia</h3><span class="mono">' + GOAL + ' pts</span></div>' +
      '<svg class="ring" viewBox="0 0 84 84"><circle class="trk" cx="42" cy="42" r="36"/><circle class="val" cx="42" cy="42" r="36" stroke-dasharray="' + C + '" stroke-dashoffset="' + (C * (1 - pct)) + '" transform="rotate(-90 42 42)"/>' +
      '<text x="42" y="47" text-anchor="middle" font-family="Unbounded, sans-serif" font-size="15" font-weight="700" fill="currentColor">' + Math.round(pct * 100) + '%</text></svg>' +
      '<p class="muted" style="text-align:center;font-size:14px">' + tx + ' de ' + GOAL + ' pontos hoje</p></div>' +
      '<div class="tile"><div class="tile-h"><h3>Sequência</h3><span class="mono">dias</span></div><div class="stat">' + st + ' <small>' + (st === 1 ? 'dia seguido' : 'dias seguidos') + '</small></div><div class="week">' + week + '</div></div>' +
      '<button class="tile t-action" data-go="review"><span class="ico">' + I.review + '</span><div><h3>Revisão</h3><p class="muted" style="font-size:14px">' + (revN ? revN + ' palavra' + (revN > 1 ? 's' : '') + ' para reforçar' : 'Nada pendente') + '</p></div></button>' +
      '<button class="tile t-action" data-go="test"><span class="ico">' + I.test + '</span><div><h3>Teste de nível</h3><p class="muted" style="font-size:14px">' + (S.level ? 'Seu nível: ' + S.level : 'Descubra por onde começar') + '</p></div></button>' +
      '<div class="tile t-levels"><div class="tile-h"><h3>Sua jornada</h3><span class="mono">' + learnedWords() + '/' + WORDS.length + ' palavras</span></div>' +
      LV.map(function (lv) {
        const d = lv.units.filter(isDone).length;
        return '<div class="lv-row" style="' + lvStyle(lv) + '"><span class="lv-chip">' + lv.id + '</span><div class="bar"><i style="width:' + (d / lv.units.length * 100) + '%"></i></div><span>' + d + '/' + lv.units.length + '</span></div>';
      }).join('') + '</div>' +
      '<div class="tile t-wod" style="' + lvStyle(wod.unit.level) + '"><div class="tile-h"><h3>Palavra do dia</h3><span class="mono">' + wod.unit.level.id + '</span></div>' +
      '<div class="wod"><div class="blob" style="--s:84px">' + wod.e + '</div><div style="min-width:0"><div class="wod-word">' + esc(wod.en) + '</div><p class="muted">' + esc(wod.pt) + '</p></div></div>' +
      '<div class="ex">' + boldWord(wod.ex) + '<em>' + esc(wod.exPt) + '</em></div>' +
      (canSpeak ? '<button class="say" id="wod-say">' + I.sound + 'Ouvir</button>' : '') + '</div>' +
      '</div>';
    $('#continue').onclick = function () { go('unit', { u: u }); };
    $$('[data-go]').forEach(function (b) { b.onclick = function () { go(b.dataset.go); }; });
    const ws = $('#wod-say'); if (ws) ws.onclick = function () { say(plain(wod.ex)); };
  }

  /* ---------- trilha ---------- */
  function path(arg) {
    view.innerHTML =
      '<header class="page-h"><p class="mono">Trilha completa</p><h1>Do zero ao avançado</h1>' +
      '<p class="sub">' + LV.length + ' níveis do Quadro Europeu (CEFR), ' + UNITS.length + ' unidades, ' + WORDS.length + ' palavras e ' + UNITS.length + ' tópicos de gramática. Comece pelo A1 ou faça o teste de nível.</p></header>' +
      LV.map(function (l) {
        const d = l.units.filter(isDone).length;
        return '<section class="level" id="lv-' + l.id + '" style="' + lvStyle(l) + '">' +
          '<div class="level-h"><div class="code">' + l.id + '</div><div><h2>' + esc(l.name) + '</h2><p>' + esc(l.desc) + '</p></div><span class="prog">' + d + '/' + l.units.length + ' unidades</span></div>' +
          '<div class="units">' + l.units.map(function (u) {
            const st = starsOf(u), us = unitState(u);
            const status = isDone(u) ? '<span class="status done">Concluída</span>' : us.seen ? '<span class="status going">Em andamento</span>' : '<span class="status">Nova</span>';
            return '<button class="unit-tile" data-u="' + u.id + '"><div class="blob" style="--s:58px">' + u.icon + '</div>' +
              '<div><p class="mono">Unidade ' + u.n + '</p><h3>' + esc(u.title) + '</h3></div><p class="g">' + esc(u.grammar.title) + '</p>' +
              '<div class="unit-foot">' + status + '<span class="stars" aria-label="' + st + ' de 3 estrelas">' + '★'.repeat(st) + '☆'.repeat(3 - st) + '</span></div></button>';
          }).join('') + '</div></section>';
      }).join('');
    $$('.unit-tile').forEach(function (b) { b.onclick = function () { go('unit', { u: UNITS.find(function (u) { return u.id === b.dataset.u; }) }); }; });
    if (arg && arg.level) { const el = document.getElementById('lv-' + arg.level); if (el) setTimeout(function () { el.scrollIntoView({ behavior: 'smooth' }); }, 60); }
  }

  /* ---------- unidade ---------- */
  function unitView(arg) {
    const u = arg.u, l = u.level, tab = arg.tab || 'vocab';
    S.last = u.id; S.units[u.id] = Object.assign({}, unitState(u), { seen: true }); save();
    view.innerHTML =
      '<section class="unit-hero" style="' + lvStyle(l) + '"><button class="icon-btn" id="back" aria-label="Voltar para a trilha">' + I.back + '</button>' +
      '<div><p class="mono">' + l.id + ' · ' + esc(l.name) + ' · Unidade ' + u.n + '</p><h1>' + esc(u.title) + '</h1></div>' +
      '<div class="chips"><span>' + u.words.length + ' palavras</span><span>' + esc(u.grammar.title) + '</span>' + (starsOf(u) ? '<span>' + '★'.repeat(starsOf(u)) + '</span>' : '') + '</div>' +
      '<span class="deco" aria-hidden="true">' + u.icon + '</span></section>' +
      '<div class="seg" role="tablist"><button data-tab="vocab" role="tab">Vocabulário</button><button data-tab="gram" role="tab">Gramática</button><button data-tab="prac" role="tab">Praticar</button></div>' +
      '<div id="tabbody" style="' + lvStyle(l) + '"></div>';
    $('#back').onclick = function () { go('path', { level: l.id }); };
    $$('[data-tab]').forEach(function (b) {
      b.classList.toggle('on', b.dataset.tab === tab); b.setAttribute('aria-selected', b.dataset.tab === tab);
      b.onclick = function () { go('unit', { u: u, tab: b.dataset.tab, keepScroll: true }); };
    });
    if (tab === 'vocab') vocab(u, 0);
    if (tab === 'gram') grammar(u);
    if (tab === 'prac') practiceIntro(u);
  }

  function vocab(u, i) {
    const w = u.words[i], body = $('#tabbody');
    body.innerHTML =
      '<div class="study"><div class="flip-zone"><div class="flip" id="flip" tabindex="0" role="button" aria-label="Virar cartão">' +
      '<div class="face front"><div class="blob" style="--s:150px">' + w.e + '</div><div class="word">' + esc(w.en) + '</div>' +
      (w.ph ? '<div class="ph">fala-se: ' + esc(w.ph) + '</div>' : '') +
      (canSpeak ? '<button class="say" id="say1">' + I.sound + 'Ouvir</button>' : '') + '<span class="tap">Toque para ver o significado</span></div>' +
      '<div class="face back"><div class="blob" style="--s:84px;background:var(--card)">' + w.e + '</div><div class="pt">' + esc(w.pt) + '</div>' +
      '<div class="ex">' + boldWord(w.ex) + '<em>' + esc(w.exPt) + '</em></div>' +
      (canSpeak ? '<button class="say" id="say2">' + I.sound + 'Ouvir a frase</button>' : '') + '</div></div>' +
      '<div class="card-nav"><button class="btn" id="prev" ' + (i === 0 ? 'disabled' : '') + '>← Anterior</button><span class="count">' + (i + 1) + ' / ' + u.words.length + '</span>' +
      '<button class="btn dark" id="next">' + (i === u.words.length - 1 ? 'Praticar' : 'Próxima') + ' →</button></div></div>' +
      '<div class="word-grid">' + u.words.map(function (x, k) {
        return '<button class="wchip' + (k === i ? ' on' : '') + '" data-k="' + k + '"><div class="blob">' + x.e + '</div><div><b>' + esc(x.en) + '</b><span>' + esc(x.pt) + '</span></div></button>';
      }).join('') + '</div></div>';
    const flip = $('#flip');
    flip.onclick = function (e) { if (e.target.closest('.say')) return; flip.classList.toggle('on'); };
    flip.onkeydown = function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flip.classList.toggle('on'); } };
    const s1 = $('#say1'), s2 = $('#say2');
    if (s1) s1.onclick = function () { say(w.en); };
    if (s2) s2.onclick = function () { say(plain(w.ex)); };
    $('#prev').onclick = function () { vocab(u, i - 1); };
    $('#next').onclick = function () { if (i === u.words.length - 1) go('unit', { u: u, tab: 'prac', keepScroll: true }); else vocab(u, i + 1); };
    $$('.wchip').forEach(function (b) { b.onclick = function () { vocab(u, +b.dataset.k); }; });
    say(w.en);
  }

  function grammar(u) {
    const g = u.grammar;
    $('#tabbody').innerHTML =
      '<div class="gram"><h2 style="font-size:clamp(22px,4vw,28px)">' + esc(g.title) + '</h2><p class="rule">' + g.rule + '</p>' +
      '<div class="gtable-wrap"><table class="gtable"><tbody>' + g.table.map(function (r) { return '<tr>' + r.map(function (c) { return '<td>' + esc(c) + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table></div>' +
      '<div class="tipbox"><span class="t">DICA</span><p>' + g.tip + '</p></div>' +
      '<p class="mono">Exemplos</p><div class="ex-list">' + g.examples.map(function (e, k) {
        return '<div class="ex-row">' + (canSpeak ? '<button class="round" data-say="' + k + '" aria-label="Ouvir">' + I.sound + '</button>' : '') + '<div><b>' + esc(e[0]) + '</b><span>' + esc(e[1]) + '</span></div></div>';
      }).join('') + '</div>' +
      '<button class="btn dark wide" id="toprac">Praticar esta unidade →</button></div>';
    $$('[data-say]').forEach(function (b) { b.onclick = function () { say(g.examples[+b.dataset.say][0]); }; });
    $('#toprac').onclick = function () { go('unit', { u: u, tab: 'prac', keepScroll: true }); };
  }

  function practiceIntro(u) {
    const best = unitState(u).best;
    $('#tabbody').innerHTML =
      '<div class="gram"><h2 style="font-size:clamp(22px,4vw,28px)">Hora de praticar</h2>' +
      '<p class="rule">Uma rodada com ' + unitQuestions(u).length + ' exercícios misturando o vocabulário e a gramática da unidade. Acerte 60% para concluir.</p>' +
      '<div class="prac">' +
      '<div><span class="e">🖼️</span><b>Imagem</b>Veja e escolha a palavra</div>' +
      (canSpeak ? '<div><span class="e">🎧</span><b>Escuta</b>Ouça e toque na imagem</div>' : '') +
      '<div><span class="e">✍️</span><b>Escrita</b>Digite a palavra</div>' +
      '<div><span class="e">🧩</span><b>Montar frase</b>Coloque na ordem</div>' +
      '<div><span class="e">🔗</span><b>Pares</b>Ligue inglês e português</div>' +
      '<div><span class="e">📘</span><b>Gramática</b>Complete a frase</div></div>' +
      (best != null ? '<p class="muted">Seu melhor resultado: ' + Math.round(best * 100) + '%</p>' : '') +
      '<button class="btn dark wide" id="start">Começar prática</button></div>';
    $('#start').onclick = function () { unitSession(u); };
  }

  /* ---------- montagem das rodadas ---------- */
  function unitQuestions(u) {
    const types = ['pic', 'meaning', 'fill', canSpeak ? 'listen' : 'reverse', 'type', 'reverse'];
    const qs = shuffle(u.words).map(function (w, k) { return { t: types[k % types.length], w: w, pool: u.words }; });
    const dr = shuffle(u.grammar.drills).map(function (d) { return { t: 'drill', d: d }; });
    qs.splice(2, 0, dr[0]);
    qs.splice(5, 0, { t: 'match', words: shuffle(u.words).slice(0, 4) });
    qs.splice(8, 0, dr[1]);
    qs.push(dr[2]);
    qs.push({ t: 'build', s: pick(u.grammar.examples) });
    return qs;
  }
  function unitSession(u) {
    runSession({
      lv: u.level, qs: unitQuestions(u), onQuit: function () { go('unit', { u: u, tab: 'prac' }); },
      onEnd: function (r) {
        const p = r.right / r.total, prev = unitState(u).best || 0;
        const firstDone = p >= 0.6 && prev < 0.6;
        const gain = r.right * 10 + (firstDone ? 20 : 0);
        addXP(gain);
        S.units[u.id] = Object.assign({}, unitState(u), { best: Math.max(prev, p) }); save();
        showResult({
          lv: u.level, right: r.right, total: r.total, gain: gain, missed: r.missed,
          title: p >= 0.9 ? 'Excelente!' : p >= 0.6 ? 'Unidade concluída!' : 'Quase lá!',
          sub: p >= 0.6 ? (firstDone ? '+20 pontos de bônus por concluir a unidade.' : 'Continue assim.') : 'Faça de novo para chegar a 60% e concluir.',
          medal: p >= 0.9 ? '🏆' : p >= 0.6 ? '🎯' : '💪',
          again: function () { unitSession(u); },
          next: function () {
            const idx = UNITS.indexOf(u), nu = UNITS[idx + 1];
            if (p >= 0.6 && nu) go('unit', { u: nu }); else go('path', { level: u.level.id });
          },
          nextLabel: p >= 0.6 && UNITS[UNITS.indexOf(u) + 1] ? 'Próxima unidade →' : 'Voltar à trilha'
        });
      }
    });
  }

  /* ---------- motor de exercícios ---------- */
  let keyHandler = null;
  document.addEventListener('keydown', function (e) { if (keyHandler) keyHandler(e); });

  function runSession(cfg) {
    setSession(true); window.scrollTo(0, 0);
    let i = 0, right = 0; const missed = [], total = cfg.qs.length;

    function frame(inner, kind) {
      view.innerHTML =
        '<div class="sess" style="' + lvStyle(cfg.lv) + '"><div class="sess-top"><button class="icon-btn" id="quit" aria-label="Sair da prática">' + I.x + '</button>' +
        '<div class="bar"><i style="width:' + (i / total * 100) + '%"></i></div><span class="mono">' + (i + 1) + '/' + total + '</span></div>' +
        '<div class="q"><span class="q-kind"><i></i>' + kind + '</span>' + inner + '</div></div>';
      $('#quit').onclick = function () { keyHandler = null; hideSheet(); cfg.onQuit(); };
    }
    function answer(ok, word, title, msg) {
      const q = cfg.qs[i]; q.ok = ok;
      if (ok) right++;
      if (word) {
        if (ok) { if (cfg.review) delete S.review[word.id]; }
        else { S.review[word.id] = 1; if (missed.indexOf(word) < 0) missed.push(word); }
        save(); say(word.en);
      }
      showSheet(ok, title || (ok ? pick(['Mandou bem!', 'Perfeito!', 'Isso aí!', 'Boa!']) : 'Não foi dessa vez'), msg, function () { i++; next(); });
    }
    function next() {
      hideSheet(); keyHandler = null;
      if (i >= total) { setSession(false); return cfg.onEnd({ right: right, total: total, missed: missed, qs: cfg.qs }); }
      const q = cfg.qs[i];
      ({ pic: qPic, meaning: qMeaning, reverse: qReverse, listen: qListen, fill: qFill, type: qType, match: qMatch, build: qBuild, drill: qDrill })[q.t](q);
      window.scrollTo(0, 0);
    }
    function wireOpts(correct, onPick) {
      const opts = $$('.opt');
      opts.forEach(function (b) {
        b.onclick = function () {
          if (b.disabled) return;
          opts.forEach(function (x) { x.disabled = true; if (x.dataset.v === correct) x.classList.add('ok'); });
          const ok = b.dataset.v === correct; if (!ok) b.classList.add('no');
          onPick(ok);
        };
      });
      keyHandler = function (e) { const n = parseInt(e.key, 10); if (n >= 1 && n <= opts.length && !opts[0].disabled) opts[n - 1].click(); };
    }
    function optHTML(list, render) {
      return list.map(function (o, k) { return '<button class="opt' + (render.cls || '') + '" data-v="' + esc(o.en) + '"' + (render.aria ? ' aria-label="' + esc(o.pt) + '"' : '') + '>' + render.fn(o) + '<kbd>' + (k + 1) + '</kbd></button>'; }).join('');
    }

    function qPic(q) {
      const w = q.w, opts = shuffle([w].concat(others(w, q.pool, 3)));
      frame('<h2>Que palavra é essa?</h2><div class="q-center"><div class="blob" style="--s:160px">' + w.e + '</div></div>' +
        '<div class="opts">' + optHTML(opts, { fn: function (o) { return esc(o.en); } }) + '</div>', 'Imagem');
      wireOpts(w.en, function (ok) { answer(ok, w, null, ok ? w.e + ' ' + esc(w.en) + ' = ' + esc(w.pt) : 'Era <b>' + esc(w.en) + '</b> (' + esc(w.pt) + ').'); });
    }
    function qMeaning(q) {
      const w = q.w, opts = shuffle([w].concat(others(w, q.pool, 3)));
      frame('<h2>O que significa <em>' + esc(w.en) + '</em>?</h2>' + (canSpeak ? '<button class="say" id="hear" style="align-self:flex-start">' + I.sound + 'Ouvir</button>' : '') +
        '<div class="opts">' + optHTML(opts, { fn: function (o) { return '<span class="e">' + o.e + '</span>' + esc(o.pt); } }) + '</div>', 'Significado');
      const h = $('#hear'); if (h) h.onclick = function () { say(w.en); };
      say(w.en);
      wireOpts(w.en, function (ok) { answer(ok, w, null, ok ? esc(w.en) + ' = ' + esc(w.pt) : '<b>' + esc(w.en) + '</b> significa ' + esc(w.pt) + '.'); });
    }
    function qReverse(q) {
      const w = q.w, opts = shuffle([w].concat(others(w, q.pool, 3)));
      frame('<h2>Como se diz <em>' + esc(w.pt) + '</em> em inglês?</h2>' +
        '<div class="opts">' + optHTML(opts, { fn: function (o) { return '<span class="e">' + o.e + '</span>' + esc(o.en); } }) + '</div>', 'Tradução');
      wireOpts(w.en, function (ok) { answer(ok, w, null, ok ? esc(w.pt) + ' = ' + esc(w.en) : 'O certo é <b>' + esc(w.en) + '</b>.'); });
    }
    function qListen(q) {
      const w = q.w, opts = shuffle([w].concat(others(w, q.pool, 3)));
      frame('<h2>Ouça e toque na imagem certa</h2><div class="q-center" style="flex-direction:column;align-items:center;gap:10px"><button class="play" id="play" aria-label="Ouvir de novo">' + I.sound + '</button>' +
        '<button class="slow" id="slow">Ouvir devagar</button></div>' +
        '<div class="opts">' + optHTML(opts, { cls: ' pic', aria: true, fn: function (o) { return '<span class="e">' + o.e + '</span>'; } }) + '</div>', 'Escuta');
      $('#play').onclick = function () { say(w.en); };
      $('#slow').onclick = function () { say(w.en, 0.55); };
      setTimeout(function () { say(w.en); }, 250);
      wireOpts(w.en, function (ok) { answer(ok, w, null, w.e + ' <b>' + esc(w.en) + '</b> = ' + esc(w.pt)); });
    }
    function qFill(q) {
      const w = q.w, opts = shuffle([w].concat(others(w, q.pool, 3)));
      const sent = esc(w.ex).replace(/\{.+?\}/, '<span class="gap" id="gap">?</span>');
      frame('<h2>Complete a frase</h2><div class="sentence">' + sent + '<span class="tr">' + esc(w.exPt) + '</span></div>' +
        '<div class="opts">' + optHTML(opts, { fn: function (o) { return esc(o.en); } }) + '</div>', 'Contexto');
      wireOpts(w.en, function (ok) {
        $('#gap').textContent = w.ex.match(/\{(.+?)\}/)[1];
        answer(ok, w, null, ok ? 'Frase completa: ' + esc(plain(w.ex)) : 'A palavra certa era <b>' + esc(w.en) + '</b>.');
        setTimeout(function () { say(plain(w.ex)); }, 700);
      });
    }
    function qType(q) {
      const w = q.w;
      const hint = w.en.split('').map(function (c, k) { return c === ' ' ? '  ' : k === 0 ? c : '_'; }).join(' ');
      frame('<h2>Escreva em inglês: <em>' + esc(w.pt) + '</em></h2><div class="q-center"><div class="blob" style="--s:120px">' + w.e + '</div></div>' +
        '<p class="hint-line" aria-hidden="true">' + esc(hint) + '</p>' +
        '<form id="tf" autocomplete="off"><input class="type-in" id="typein" type="text" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="Digite aqui" aria-label="Sua resposta"></form>' +
        '<button class="btn dark wide" id="check">Verificar</button>', 'Escrita');
      const inp = $('#typein'); setTimeout(function () { try { inp.focus(); } catch (e) { } }, 50);
      function check() {
        if (inp.disabled) return;
        if (!inp.value.trim()) { inp.focus(); return; }
        inp.disabled = true; $('#check').disabled = true;
        const ok = norm(inp.value) === norm(w.en);
        inp.classList.add(ok ? 'ok' : 'no');
        answer(ok, w, null, ok ? w.e + ' ' + esc(w.en) + ' = ' + esc(w.pt) : 'Escreve-se <b>' + esc(w.en) + '</b>.');
      }
      $('#tf').onsubmit = function (e) { e.preventDefault(); check(); };
      $('#check').onclick = check;
    }
    function qMatch(q) {
      const L = shuffle(q.words), R = shuffle(q.words);
      frame('<h2>Ligue os pares</h2><div class="pairs">' + L.map(function (w, k) {
        return '<button class="pair" data-s="en" data-w="' + esc(w.id) + '">' + esc(w.en) + '</button><button class="pair" data-s="pt" data-w="' + esc(R[k].id) + '">' + R[k].e + ' ' + esc(R[k].pt) + '</button>';
      }).join('') + '</div>', 'Pares');
      let sel = null, done = 0, errs = 0;
      $$('.pair').forEach(function (b) {
        b.onclick = function () {
          if (b.classList.contains('done')) return;
          if (!sel || sel.dataset.s === b.dataset.s) {
            if (sel) sel.classList.remove('sel');
            sel = b; b.classList.add('sel');
            if (b.dataset.s === 'en') say(WORD_BY_ID[b.dataset.w].en);
            return;
          }
          if (sel.dataset.w === b.dataset.w) {
            [sel, b].forEach(function (x) { x.classList.remove('sel'); x.classList.add('done'); x.disabled = true; });
            done++;
            if (done === q.words.length) answer(errs === 0, null, errs === 0 ? 'Todos de primeira!' : 'Pares completos', errs === 0 ? 'Nenhum erro.' : errs + ' erro' + (errs > 1 ? 's' : '') + ' no caminho. Na próxima, tente sem errar.');
          } else {
            errs++; const a = sel;
            [a, b].forEach(function (x) { x.classList.add('no'); });
            setTimeout(function () { [a, b].forEach(function (x) { x.classList.remove('no', 'sel'); }); }, 420);
          }
          sel = null;
        };
      });
    }
    function qBuild(q) {
      const target = q.s[0].split(' ');
      const bank = shuffle(target.map(function (t, k) { return { t: t, k: k }; }));
      frame('<h2>Monte a frase em inglês</h2><div class="sentence" style="font-size:17px">' + esc(q.s[1]) + '</div>' +
        '<div class="build-line" id="line" aria-label="Sua frase"></div><div class="bank" id="bank">' +
        bank.map(function (b, k) { return '<button class="tok" data-k="' + k + '">' + esc(b.t) + '</button>'; }).join('') + '</div>' +
        '<button class="btn dark wide" id="check" disabled>Verificar</button>', 'Montar frase');
      const chosen = [];
      function draw() {
        $('#line').innerHTML = chosen.map(function (k, pos) { return '<button class="tok" data-pos="' + pos + '">' + esc(bank[k].t) + '</button>'; }).join('');
        $$('#bank .tok').forEach(function (b) { b.classList.toggle('used', chosen.indexOf(+b.dataset.k) >= 0); });
        $$('#line .tok').forEach(function (b) { b.onclick = function () { if ($('#check').dataset.done) return; chosen.splice(+b.dataset.pos, 1); draw(); }; });
        $('#check').disabled = chosen.length !== bank.length;
      }
      $$('#bank .tok').forEach(function (b) { b.onclick = function () { if ($('#check').dataset.done) return; const k = +b.dataset.k; if (chosen.indexOf(k) < 0) { chosen.push(k); say(bank[k].t); draw(); } }; });
      $('#check').onclick = function () {
        $('#check').dataset.done = '1'; $('#check').disabled = true;
        const built = chosen.map(function (k) { return bank[k].t; }).join(' ');
        const ok = norm(built) === norm(q.s[0]);
        $('#line').classList.add(ok ? 'ok' : 'no');
        answer(ok, null, null, ok ? esc(q.s[0]) : 'O certo é: <b>' + esc(q.s[0]) + '</b>');
        say(q.s[0]);
      };
    }
    function qDrill(q) {
      const d = q.d, correct = d[1][0], opts = shuffle(d[1]);
      frame('<h2>Escolha a opção correta</h2><div class="sentence">' + esc(d[0]).replace('___', '<span class="gap" id="gap">?</span>') + '<span class="tr" id="tr" hidden>' + esc(d[2]) + '</span></div>' +
        '<div class="opts">' + opts.map(function (o, k) { return '<button class="opt" data-v="' + esc(o) + '">' + esc(o) + '<kbd>' + (k + 1) + '</kbd></button>'; }).join('') + '</div>', 'Gramática');
      wireOpts(correct, function (ok) {
        $('#gap').textContent = correct; $('#tr').hidden = false;
        answer(ok, null, null, ok ? esc(d[2]) : 'O certo é <b>' + esc(correct) + '</b>. ' + esc(d[2]));
        say(d[0].replace('___', correct).replace(/"/g, ''));
      });
    }
    next();
  }

  /* ---------- barra de resposta ---------- */
  function showSheet(ok, title, msg, onNext) {
    const sh = $('#sheet');
    sh.className = 'sheet ' + (ok ? 'good' : 'bad');
    sh.innerHTML = '<div class="sheet-in"><div><b>' + esc(title) + '</b>' + (msg ? '<span>' + msg + '</span>' : '') + '</div><button class="btn" id="cont"><span>Continuar</span></button></div>';
    sh.hidden = false;
    const c = $('#cont'); c.onclick = onNext;
    setTimeout(function () { try { c.focus({ preventScroll: true }); } catch (e) { } }, 30);
    keyHandler = function (e) { if (e.key === 'Enter') { e.preventDefault(); onNext(); } };
  }
  function hideSheet() { const sh = $('#sheet'); if (sh) { sh.hidden = true; sh.innerHTML = ''; } }

  /* ---------- resultado ---------- */
  function showResult(r) {
    const p = r.right / r.total;
    view.innerHTML =
      '<div class="result" style="' + lvStyle(r.lv) + '"><div class="medal">' + r.medal + '</div><h1>' + esc(r.title) + '</h1><p class="muted">' + esc(r.sub) + '</p>' +
      '<div class="score"><div><b>' + Math.round(p * 100) + '%</b><span class="mono">acertos</span></div><div><b>+' + r.gain + '</b><span class="mono">pontos</span></div><div><b>' + streak() + '</b><span class="mono">sequência</span></div></div>' +
      (r.missed.length ? '<div class="miss"><p class="mono">Foram para a revisão</p>' + r.missed.map(function (w) { return '<div class="ex-row"><span class="blob" style="--s:40px">' + w.e + '</span><div><b>' + esc(w.en) + '</b><span>' + esc(w.pt) + '</span></div></div>'; }).join('') + '</div>' : '') +
      '<div class="row2"><button class="btn" id="again">Refazer</button><button class="btn dark" id="nxt">' + esc(r.nextLabel) + '</button></div></div>';
    $('#again').onclick = r.again; $('#nxt').onclick = r.next;
    $('#side-xp').textContent = S.xp;
    window.scrollTo(0, 0);
  }

  /* ---------- revisão ---------- */
  function review() {
    const ids = Object.keys(S.review).filter(function (id) { return WORD_BY_ID[id]; });
    if (!ids.length) {
      view.innerHTML = '<header class="page-h"><p class="mono">Revisão</p><h1>Tudo em dia</h1></header>' +
        '<div class="empty"><div class="blob">✅</div><h2 style="font-size:22px">Nenhuma palavra pendente</h2><p class="muted" style="max-width:44ch">Quando você errar uma palavra numa prática, ela aparece aqui para reforçar. Acerte na revisão e ela sai da lista.</p><button class="btn dark" id="tp">Ir para a trilha</button></div>';
      $('#tp').onclick = function () { go('path'); };
      return;
    }
    const words = ids.map(function (id) { return WORD_BY_ID[id]; });
    view.innerHTML = '<header class="page-h"><p class="mono">Revisão</p><h1>' + words.length + ' palavra' + (words.length > 1 ? 's' : '') + ' para reforçar</h1><p class="sub">Palavras que você errou nas práticas. Acerte para tirá-las da lista.</p></header>' +
      '<div class="word-grid">' + words.slice(0, 12).map(function (w) { return '<div class="wchip" style="' + lvStyle(w.unit.level) + '"><div class="blob">' + w.e + '</div><div><b>' + esc(w.en) + '</b><span>' + esc(w.pt) + ' · ' + w.unit.level.id + '</span></div></div>'; }).join('') + '</div>' +
      '<button class="btn dark wide" id="startrev">Começar revisão</button>';
    $('#startrev').onclick = function () {
      const sel = shuffle(words).slice(0, 10);
      const types = ['pic', 'type', 'meaning', 'reverse'];
      runSession({
        lv: sel[0].unit.level, review: true,
        qs: sel.map(function (w, k) { return { t: types[k % types.length], w: w, pool: w.unit.level.units.flatMap(function (u) { return u.words; }) }; }),
        onQuit: function () { go('review'); },
        onEnd: function (r) {
          addXP(r.right * 10);
          showResult({ lv: sel[0].unit.level, right: r.right, total: r.total, gain: r.right * 10, missed: r.missed, title: 'Revisão feita', sub: r.missed.length ? 'As que você errou continuam na lista.' : 'Lista limpa nessa rodada.', medal: '🔁', again: function () { go('review'); }, next: function () { go('home'); }, nextLabel: 'Voltar ao início' });
        }
      });
    };
  }

  /* ---------- teste de nível ---------- */
  function testIntro() {
    view.innerHTML = '<header class="page-h"><p class="mono">Teste de nível</p><h1>Por onde você deve começar?</h1><p class="sub">' + (LV.length * 2) + ' perguntas de gramática, das mais fáceis às mais difíceis. Leva uns 3 minutos e não vale pontos.</p></header>' +
      (S.level ? '<div class="tile" style="' + lvStyle(LV.find(function (l) { return l.id === S.level; })) + '"><p class="mono">Último resultado</p><div class="lv-row" style="grid-template-columns:48px 1fr"><span class="lv-chip">' + S.level + '</span><b>' + esc(LV.find(function (l) { return l.id === S.level; }).name) + '</b></div></div>' : '') +
      '<div class="tile">' + LV.map(function (l) { return '<div class="lv-row" style="' + lvStyle(l) + ';grid-template-columns:48px 1fr"><span class="lv-chip">' + l.id + '</span><span style="text-align:left;font-family:var(--body);font-size:14px">' + esc(l.name) + ' · ' + esc(l.desc) + '</span></div>'; }).join('') + '</div>' +
      '<button class="btn dark wide" id="starttest">Começar o teste</button>';
    $('#starttest').onclick = function () {
      const qs = [];
      LV.forEach(function (l) { shuffle(l.units).slice(0, 2).forEach(function (u) { const q = { t: 'drill', d: pick(u.grammar.drills), lv: l.id }; qs.push(q); }); });
      runSession({
        lv: LV[0], qs: qs, onQuit: function () { go('test'); },
        onEnd: function (r) {
          let rec = LV[LV.length - 1];
          for (let k = 0; k < LV.length; k++) {
            const got = r.qs.filter(function (q) { return q.lv === LV[k].id && q.ok; }).length;
            if (got < 2) { rec = LV[k]; break; }
          }
          S.level = rec.id; save();
          view.innerHTML = '<div class="result" style="' + lvStyle(rec) + '"><div class="medal" style="font-family:var(--display);font-weight:800;font-size:56px;color:var(--on-lv)">' + rec.id + '</div>' +
            '<h1>Comece pelo ' + rec.id + '</h1><p class="muted">' + esc(rec.name) + ': ' + esc(rec.desc) + '</p>' +
            '<div class="place-res">' + LV.map(function (l) {
              const got = r.qs.filter(function (q) { return q.lv === l.id && q.ok; }).length;
              return '<div class="lv-row" style="' + lvStyle(l) + '"><span class="lv-chip">' + l.id + '</span><div class="bar"><i style="width:' + (got / 2 * 100) + '%"></i></div><span>' + got + '/2</span></div>';
            }).join('') + '</div>' +
            '<div class="row2"><button class="btn" id="again">Refazer</button><button class="btn dark" id="nxt">Ir para o ' + rec.id + ' →</button></div></div>';
          $('#again').onclick = function () { go('test'); };
          $('#nxt').onclick = function () { go('path', { level: rec.id }); };
        }
      });
    };
  }

  /* ---------- ajustes ---------- */
  function settings() {
    view.innerHTML = '<header class="page-h"><p class="mono">Ajustes</p><h1>Do seu jeito</h1></header><div class="set-list">' +
      '<div class="set"><h3>Aparência</h3><div class="seg" id="theme"><button data-th="auto">Automático</button><button data-th="light">Claro</button><button data-th="dark">Escuro</button></div></div>' +
      (canSpeak ? '<div class="set"><h3>Velocidade da voz</h3><input type="range" id="rate" min="0.5" max="1.2" step="0.05" value="' + S.rate + '" aria-label="Velocidade da voz"><div class="tile-h"><span class="muted" id="ratev">' + S.rate.toFixed(2) + 'x</span><button class="say" id="testv">' + I.sound + 'Testar</button></div></div>'
        : '<div class="set"><h3>Áudio</h3><p class="muted">Este navegador não tem voz em inglês disponível. No Chrome ou Safari do celular o áudio funciona.</p></div>') +
      '<div class="set"><h3>Progresso</h3><p class="muted">' + S.xp + ' pontos · ' + UNITS.filter(isDone).length + ' de ' + UNITS.length + ' unidades concluídas. O progresso fica salvo só neste navegador e neste aparelho.</p>' +
      '<button class="btn danger" id="reset">Apagar meu progresso</button></div></div>';
    $$('[data-th]').forEach(function (b) {
      b.classList.toggle('on', b.dataset.th === S.theme);
      b.onclick = function () { S.theme = b.dataset.th; save(); applyTheme(); settings(); };
    });
    const r = $('#rate');
    if (r) {
      r.oninput = function () { S.rate = +r.value; $('#ratev').textContent = S.rate.toFixed(2) + 'x'; save(); };
      $('#testv').onclick = function () { say('Hello! Nice to meet you.'); };
    }
    const rs = $('#reset');
    rs.onclick = function () {
      if (!rs.dataset.armed) { rs.dataset.armed = '1'; rs.textContent = 'Toque de novo para confirmar'; return; }
      const theme = S.theme; S = Object.assign({}, DEF, { theme: theme }); save(); go('home');
    };
  }

  applyTheme();
  go('home');
})();
