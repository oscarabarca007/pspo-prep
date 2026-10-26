/* PSPO Prep — single-page app (vanilla JS, no build step) */
(() => {
  'use strict';

  const SYL = window.SYLLABUS;
  const TOPICS = SYL.topics;
  const QUESTIONS = window.QUESTIONS || [];
  const QMAP = Object.fromEntries(QUESTIONS.map(q => [q.id, q]));
  const TOPIC = Object.fromEntries(TOPICS.map(t => [t.id, t]));
  const EXAM = SYL.exam;
  const STORE = 'pspo-prep.v1';

  // ---------- Icons (Material Symbols paths, 24px grid) ----------
  const ICONS = {
    home: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
    book: 'M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z',
    edit: 'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z',
    timer: 'M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61 1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42A8.962 8.962 0 0 0 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9 9-4.03 9-9c0-2.12-.74-4.07-1.97-5.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z',
    check: 'M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z',
    close: 'M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z',
    back: 'M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z',
    forward: 'M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z',
    flag: 'M14.4 6 14 4H5v17h2v-7h5.6l.4 2h7V6z',
    replay: 'M17.65 6.35A7.958 7.958 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z',
    light: 'M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 0 0 0-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z',
    dark: 'M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z',
    auto: 'M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zM12 18V6c3.31 0 6 2.69 6 6s-2.69 6-6 6z',
    lightbulb: 'M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z',
    cancel: 'M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z',
    checkCircle: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
    grid: 'M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z',
    history: 'M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0 0 13 21a9 9 0 0 0 0-18zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z',
    delete: 'M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z',
    open: 'M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z',
    chevron: 'M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z',
    groups: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z',
    loop: 'M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8A5.87 5.87 0 0 1 6 12c0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z',
    layers: 'M11.99 18.54 4.62 12.81 3 14.07l9 7 9-7-1.63-1.27-7.38 5.74zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16z',
    person: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z',
    list: 'M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z',
    trending: 'M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z',
    calendar: 'M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z',
    school: 'M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3 1 9l11 6 9-4.91V17h2V9L12 3z',
    play: 'M8 5v14l11-7z',
    download: 'M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z',
    upload: 'M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z',
    copy: 'M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z',
    info: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z',
  };
  const icon = (name, cls = '') => `<svg class="icon ${cls}" viewBox="0 0 24 24" aria-hidden="true"><path d="${ICONS[name] || ''}"/></svg>`;

  // ---------- Utilities ----------
  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const shuffle = arr => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const sameSet = (a, b) => a.length === b.length && a.every(x => b.includes(x));
  const pct = (n, d) => d ? Math.round((n / d) * 100) : 0;
  const plural = (n, w) => `${n} ${w}${n === 1 ? '' : 's'}`;
  const fmtClock = ms => { const s = Math.max(0, Math.ceil(ms / 1000)); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; };
  const fmtDuration = sec => { const m = Math.floor(sec / 60), s = sec % 60; return m ? `${m} min ${s} s` : `${s} s`; };
  const fmtDate = t => new Date(t).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  const typeHint = q => q.type === 'multi' ? `Select ${q.answer.length}` : q.type === 'tf' ? 'True or false' : 'Select one';

  // ---------- State (localStorage) ----------
  const defaults = () => ({
    answers: {},      // qid -> { n, c, last, t }
    studied: {},      // topicId -> timestamp
    exams: [],        // { t, correct, total, pct, passed, dur }
    theme: 'system',
    prefs: { topics: TOPICS.map(t => t.id), count: 20, source: 'all', explainAlways: true },
    session: null,    // active practice/exam
    lastResult: null,
  });
  const state = (() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORE));
      const d = defaults();
      return saved ? { ...d, ...saved, prefs: { ...d.prefs, ...(saved.prefs || {}) } } : d;
    } catch { return defaults(); }
  })();
  const save = () => { try { localStorage.setItem(STORE, JSON.stringify(state)); } catch { /* storage full or blocked */ } };

  function recordAnswer(id, ok) {
    const a = state.answers[id] || { n: 0, c: 0 };
    state.answers[id] = { n: a.n + 1, c: a.c + (ok ? 1 : 0), last: ok, t: Date.now() };
  }

  function topicStats(topicId) {
    const qs = QUESTIONS.filter(q => !topicId || q.topic === topicId);
    const seen = qs.filter(q => state.answers[q.id]);
    const right = seen.filter(q => state.answers[q.id].last);
    return { total: qs.length, seen: seen.length, right: right.length, acc: pct(right.length, seen.length), coverage: pct(seen.length, qs.length) };
  }
  const mistakeIds = () => QUESTIONS.filter(q => state.answers[q.id] && state.answers[q.id].last === false).map(q => q.id);

  // ---------- UI helpers ----------
  const main = $('#main');
  let timerHandle = null;
  let deferredInstall = null;

  function snackbar(msg, action, onAction) {
    const el = $('#snackbar');
    el.innerHTML = `<span class="msg">${esc(msg)}</span>${action ? `<button class="btn text">${esc(action)}</button>` : ''}`;
    if (action) $('button', el).onclick = () => { el.classList.remove('show'); onAction(); };
    el.classList.add('show');
    clearTimeout(snackbar.t);
    snackbar.t = setTimeout(() => el.classList.remove('show'), action ? 8000 : 3500);
  }

  function openDialog(html, onClose) {
    const d = $('#dialog');
    d.innerHTML = html;
    d.returnValue = '';
    d.onclose = () => onClose && onClose(d.returnValue);
    d.showModal();
    return d;
  }

  function confirmDialog({ title, text, ok = 'OK', cancel = 'Cancel', danger = false }) {
    return new Promise(resolve => {
      openDialog(`<form method="dialog" class="dialog-body">
        <h2 class="headline-small">${esc(title)}</h2>
        <p class="body-medium muted">${text}</p>
        <div class="dialog-actions">
          ${cancel ? `<button class="btn text" value="cancel">${esc(cancel)}</button>` : ''}
          <button class="btn ${danger ? 'danger' : 'filled'}" value="ok">${esc(ok)}</button>
        </div></form>`, v => resolve(v === 'ok'));
    });
  }

  function applyTheme() {
    const root = document.documentElement;
    if (state.theme === 'system') root.removeAttribute('data-theme'); else root.dataset.theme = state.theme;
    const btn = $('#themeBtn');
    const next = { system: 'auto', light: 'light', dark: 'dark' }[state.theme];
    btn.innerHTML = icon(next);
    btn.title = `Theme: ${state.theme}`;
    requestAnimationFrame(() => {
      const bg = getComputedStyle(document.body).backgroundColor;
      $('meta[name="theme-color"]').setAttribute('content', bg);
    });
  }

  const ring = (value, label, color = 'var(--md-primary)') =>
    `<div class="ring" style="--p:${value};--c:${color}" role="img" aria-label="${esc(label)} ${value}%"><div><div class="headline-small">${value}%</div><div class="body-small muted">${esc(label)}</div></div></div>`;

  const bar = (value, cls = '') => `<div class="progress ${cls}" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${value}"><span style="width:${value}%"></span></div>`;

  // ---------- Router ----------
  function route() {
    clearInterval(timerHandle);
    const parts = location.hash.replace(/^#\/?/, '').split('/');
    const view = parts[0] || 'home';
    let nav = view;
    switch (view) {
      case 'syllabus': parts[1] ? renderTopic(parts[1]) : renderSyllabus(); break;
      case 'practice': renderPracticeSetup(); break;
      case 'exam': renderExamHome(); break;
      case 'quiz':
        nav = state.session ? state.session.mode : 'home';
        renderQuiz(); break;
      case 'results':
        nav = state.lastResult ? state.lastResult.mode : 'home';
        renderResults(); break;
      default: nav = 'home'; renderHome();
    }
    $$('#nav a').forEach(a => a.classList.toggle('active', a.dataset.nav === nav));
    $$('#nav a').forEach(a => a.toggleAttribute('aria-current', a.dataset.nav === nav));
    window.scrollTo(0, 0);
    main.focus({ preventScroll: true });
  }
  const go = hash => { if (location.hash === hash) route(); else location.hash = hash; };

  // ---------- Home ----------
  function renderHome() {
    const all = topicStats();
    const mistakes = mistakeIds().length;
    const lastExams = state.exams.slice(-5).reverse();
    const best = state.exams.reduce((m, e) => Math.max(m, e.pct), 0);
    const studiedCount = Object.keys(state.studied).length;
    const s = state.session;
    const readiness = all.seen ? all.acc : 0;
    const readyMsg = !all.seen ? 'Start with the syllabus, then practice by topic.'
      : readiness >= 90 && all.coverage >= 80 ? 'You look ready. Confirm with a few full exam simulations scoring 90%+.'
      : readiness >= 85 ? 'Close to passing level. Keep practicing your weakest topics.'
      : 'Keep going — review explanations for every mistake.';

    main.innerHTML = `
      <div class="stack">
        <section class="card primary lg">
          <div class="row" style="gap:24px;align-items:center">
            ${ring(readiness, 'accuracy', 'var(--md-primary)')}
            <div class="stack-sm" style="flex:1;min-width:200px">
              <h1 class="headline-medium">Professional Scrum Product Owner I</h1>
              <p class="body-medium">${esc(readyMsg)}</p>
              <div class="row">
                <span class="badge-chip">${all.seen}/${all.total} answered</span>
                <span class="badge-chip">${studiedCount}/${TOPICS.length} topics studied</span>
                ${best ? `<span class="badge-chip ${best >= EXAM.pass ? 'success' : ''}">Best exam ${best}%</span>` : ''}
              </div>
            </div>
          </div>
        </section>

        ${s ? `<a class="card tertiary action-card" href="#/quiz">
          <span class="avatar tertiary">${icon('play')}</span>
          <span class="stack-sm" style="gap:2px;flex:1">
            <span class="title-medium">Resume ${s.mode === 'exam' ? 'exam simulation' : 'practice'}</span>
            <span class="body-medium">Question ${s.idx + 1} of ${s.ids.length}${s.mode === 'exam' ? ` · ${fmtClock(s.endsAt - Date.now())} left` : ''}</span>
          </span>${icon('chevron')}</a>` : ''}

        <div class="grid-2">
          <a class="card action-card" href="#/syllabus">
            <span class="avatar">${icon('school')}</span>
            <span class="stack-sm" style="gap:2px"><span class="title-medium">Study syllabus</span>
            <span class="body-medium muted">${TOPICS.length} topics with key concepts and exam traps</span></span></a>
          <a class="card action-card" href="#/practice">
            <span class="avatar secondary">${icon('edit')}</span>
            <span class="stack-sm" style="gap:2px"><span class="title-medium">Practice</span>
            <span class="body-medium muted">Instant feedback and explanations, by topic</span></span></a>
          <a class="card action-card" href="#/exam">
            <span class="avatar tertiary">${icon('timer')}</span>
            <span class="stack-sm" style="gap:2px"><span class="title-medium">Exam simulation</span>
            <span class="body-medium muted">${EXAM.questions} questions · ${EXAM.minutes} minutes · ${EXAM.pass}% to pass</span></span></a>
          <button class="card action-card" data-action="practice-mistakes" ${mistakes ? '' : 'disabled'}>
            <span class="avatar error">${icon('replay')}</span>
            <span class="stack-sm" style="gap:2px"><span class="title-medium">Review mistakes</span>
            <span class="body-medium muted">${mistakes ? `${plural(mistakes, 'question')} to retry` : 'No mistakes yet'}</span></span></button>
        </div>

        <h2 class="title-medium section-title">Mastery by topic</h2>
        <div class="list">
          ${TOPICS.map(t => {
            const st = topicStats(t.id);
            return `<a class="list-item" href="#/syllabus/${t.id}">
              <span class="lead ${state.studied[t.id] ? 'done' : ''}">${icon(state.studied[t.id] ? 'check' : t.icon)}</span>
              <span class="content">
                <span class="row between"><span class="title-small">${esc(t.title)}</span>
                <span class="body-small muted">${st.seen ? `${st.acc}% · ` : ''}${st.seen}/${st.total}</span></span>
                ${bar(st.seen ? st.acc : 0, st.seen ? (st.acc >= EXAM.pass ? 'success' : st.acc < 60 ? 'error' : '') : '')}
              </span></a>`;
          }).join('')}
        </div>
        <p class="body-small muted" style="margin:0 4px">Bars show accuracy on the latest attempt of each question you have answered in that topic.</p>

        ${lastExams.length ? `<h2 class="title-medium section-title">Recent exam simulations</h2>
        <div class="list">${lastExams.map(e => `
          <div class="list-item">
            <span class="lead ${e.passed ? 'done' : ''}">${icon(e.passed ? 'check' : 'close')}</span>
            <span class="content"><span class="title-small">${e.pct}% · ${e.correct}/${e.total}</span>
            <span class="body-small muted">${fmtDate(e.t)} · ${fmtDuration(e.dur)}</span></span>
            <span class="badge-chip ${e.passed ? 'success' : 'error'}">${e.passed ? 'Pass' : 'Below 85%'}</span>
          </div>`).join('')}</div>` : ''}

        <h2 class="title-medium section-title">Sync between devices</h2>
        <section class="card stack">
          <p class="body-medium muted">Progress is saved only on this device. Export it here and import it on your other device. Imports are merged: the most recent answer to each question wins and exam histories are combined.</p>
          <div class="row">
            <button class="btn tonal" data-action="export">${icon('upload')}Export progress</button>
            <button class="btn outlined" data-action="import">${icon('download')}Import progress</button>
          </div>
        </section>

        <div class="row" style="justify-content:center;margin-top:16px">
          <button class="btn text" data-action="reset">${icon('delete')}Reset progress</button>
        </div>
        <p class="body-small muted footer-note">Independent study aid. Not affiliated with or endorsed by Scrum.org. Questions are original and written to match the style and difficulty of the PSPO I assessment.</p>
      </div>`;
  }

  // ---------- Syllabus ----------
  function renderSyllabus() {
    main.innerHTML = `
      <div class="stack">
        <div class="page-head"><h1 class="headline-medium">Study syllabus</h1></div>

        <section class="card primary lg stack">
          <div class="stack-sm">
            <h2 class="title-large">About the PSPO I assessment</h2>
            <p class="body-medium">${EXAM.summary}</p>
          </div>
          <div class="facts">
            ${EXAM.facts.map(f => `<div class="fact"><div class="title-medium">${esc(f.value)}</div><div class="body-small muted">${esc(f.label)}</div></div>`).join('')}
          </div>
          <p class="body-small">${EXAM.note}</p>
        </section>

        <h2 class="title-medium section-title">Topics</h2>
        <div class="list">
          ${TOPICS.map((t, i) => {
            const st = topicStats(t.id);
            return `<a class="list-item" href="#/syllabus/${t.id}">
              <span class="lead ${state.studied[t.id] ? 'done' : ''}">${icon(state.studied[t.id] ? 'check' : t.icon)}</span>
              <span class="content"><span class="title-small">${i + 1}. ${esc(t.title)}</span>
              <span class="body-small muted">${esc(t.summary)}</span>
              <span class="body-small muted">${st.total} questions${st.seen ? ` · ${st.acc}% correct` : ''}</span></span>
              <span class="trail">${icon('chevron')}</span></a>`;
          }).join('')}
        </div>

        <h2 class="title-medium section-title">Suggested study plan</h2>
        <section class="card">
          <ol class="timeline">
            ${SYL.plan.map((p, i) => `<li><span class="dot">${i + 1}</span><div class="stack-sm" style="gap:2px;padding-top:4px">
              <span class="title-small">${esc(p.title)}</span><span class="body-medium muted">${p.text}</span></div></li>`).join('')}
          </ol>
        </section>

        <h2 class="title-medium section-title">Official resources</h2>
        <div class="list">
          ${SYL.resources.map(r => `<a class="list-item" href="${esc(r.url)}" target="_blank" rel="noopener">
            <span class="lead">${icon('open')}</span>
            <span class="content"><span class="title-small">${esc(r.title)}</span><span class="body-small muted">${esc(r.text)}</span></span></a>`).join('')}
        </div>
      </div>`;
  }

  function renderTopic(id) {
    const t = TOPIC[id];
    if (!t) return go('#/syllabus');
    const idx = TOPICS.indexOf(t);
    const st = topicStats(id);
    const prev = TOPICS[idx - 1], next = TOPICS[idx + 1];
    main.innerHTML = `
      <div class="stack">
        <div class="page-head">
          <a class="icon-btn" href="#/syllabus" aria-label="Back to syllabus">${icon('back')}</a>
          <span class="body-medium muted">Topic ${idx + 1} of ${TOPICS.length}</span>
        </div>
        <section class="card primary lg stack-sm">
          <div class="row">${icon(t.icon, 'lg')}<h1 class="headline-small">${esc(t.title)}</h1></div>
          <p class="body-large">${esc(t.summary)}</p>
          <div class="row"><span class="badge-chip">${st.total} questions</span>
            ${st.seen ? `<span class="badge-chip">${st.acc}% correct</span>` : ''}
            ${state.studied[id] ? `<span class="badge-chip success">${icon('check', 'sm')}Studied</span>` : ''}</div>
        </section>

        <section class="card stack-sm">
          <h2 class="title-medium">Learning objectives</h2>
          <div class="prose"><ul>${t.objectives.map(o => `<li>${o}</li>`).join('')}</ul></div>
        </section>

        ${t.sections.map(s => `<section class="card prose">
          <h3>${esc(s.h)}</h3>${s.html}</section>`).join('')}

        <section class="card warning stack-sm">
          <div class="row">${icon('lightbulb')}<h2 class="title-medium">Exam traps to watch for</h2></div>
          <div class="prose"><ul>${t.tips.map(o => `<li>${o}</li>`).join('')}</ul></div>
        </section>

        <section class="card outlined stack-sm">
          <h2 class="title-small">Read more</h2>
          <div class="chips">${t.refs.map(r => `<a class="chip" href="${esc(r.url)}" target="_blank" rel="noopener">${icon('open')}${esc(r.label)}</a>`).join('')}</div>
        </section>

        <div class="row" style="justify-content:flex-end">
          <button class="btn outlined" data-action="toggle-studied" data-topic="${id}">${icon(state.studied[id] ? 'close' : 'check')}${state.studied[id] ? 'Mark as not studied' : 'Mark as studied'}</button>
          <button class="btn filled" data-action="practice-topic" data-topic="${id}">${icon('edit')}Practice this topic</button>
        </div>

        <div class="row between" style="margin-top:8px">
          ${prev ? `<a class="btn text" href="#/syllabus/${prev.id}">${icon('back')}${esc(prev.title)}</a>` : '<span></span>'}
          ${next ? `<a class="btn text" href="#/syllabus/${next.id}">${esc(next.title)}<svg class="icon" style="margin:0 -8px 0 0;width:18px;height:18px" viewBox="0 0 24 24"><path d="${ICONS.forward}"/></svg></a>` : ''}
        </div>
      </div>`;
  }

  // ---------- Practice setup ----------
  function practicePool() {
    const p = state.prefs;
    let pool = QUESTIONS.filter(q => p.topics.includes(q.topic));
    if (p.source === 'unseen') pool = pool.filter(q => !state.answers[q.id]);
    if (p.source === 'mistakes') pool = pool.filter(q => state.answers[q.id] && state.answers[q.id].last === false);
    return pool;
  }

  function renderPracticeSetup() {
    const p = state.prefs;
    const pool = practicePool();
    const n = p.count === 0 ? pool.length : Math.min(p.count, pool.length);
    const seg = (name, items) => `<div class="segmented" role="group">${items.map(([v, l]) =>
      `<button type="button" data-action="pref" data-pref="${name}" data-value="${v}" aria-pressed="${String(p[name]) === String(v)}">${String(p[name]) === String(v) ? icon('check') : ''}${l}</button>`).join('')}</div>`;

    main.innerHTML = `
      <div class="stack">
        <div class="page-head"><h1 class="headline-medium">Practice</h1></div>
        <p class="body-medium muted" style="margin:0 4px">Answer at your own pace. After each answer you get the correct option and an explanation of why.</p>

        <section class="card stack">
          <div class="row between"><h2 class="title-medium">Topics</h2>
            <button class="btn text small" data-action="toggle-all-topics">${p.topics.length === TOPICS.length ? 'Clear all' : 'Select all'}</button></div>
          <div class="chips">
            ${TOPICS.map(t => {
              const on = p.topics.includes(t.id);
              return `<button class="chip" data-action="toggle-topic" data-topic="${t.id}" aria-pressed="${on}">${on ? icon('check') : ''}${esc(t.short)}</button>`;
            }).join('')}
          </div>
        </section>

        <section class="card stack">
          <h2 class="title-medium">Questions</h2>
          ${seg('source', [['all', 'All'], ['unseen', 'Unanswered'], ['mistakes', 'Mistakes']])}
          ${seg('count', [[10, '10'], [20, '20'], [40, '40'], [0, 'All']])}
          <label class="switch-row">
            <span class="stack-sm" style="gap:0"><span class="body-large">Explain correct answers too</span>
            <span class="body-small muted">Wrong answers are always explained</span></span>
            <span class="switch"><input type="checkbox" data-action="explain-always" ${p.explainAlways ? 'checked' : ''}><span class="track"></span><span class="thumb"></span></span>
          </label>
        </section>

        <div class="fab-row">
          <button class="btn filled block" data-action="start-practice" ${n ? '' : 'disabled'}>${icon('play')}${n ? `Start ${plural(n, 'question')}` : 'No questions match these filters'}</button>
        </div>
      </div>`;
  }

  // ---------- Sessions ----------
  function newSession(mode, ids) {
    const order = {};
    ids.forEach(id => {
      const q = QMAP[id];
      const idxs = q.options.map((_, i) => i);
      order[id] = q.type === 'tf' ? idxs : shuffle(idxs);
    });
    const s = { mode, ids, idx: 0, picks: {}, checked: {}, flags: {}, order, startedAt: Date.now() };
    if (mode === 'exam') s.endsAt = Date.now() + EXAM.minutes * 60 * 1000;
    state.session = s;
    save();
    go('#/quiz');
  }

  async function guardActiveSession() {
    if (!state.session) return true;
    const kind = state.session.mode === 'exam' ? 'exam simulation' : 'practice session';
    return confirmDialog({ title: `Discard current ${kind}?`, text: `You have an unfinished ${kind}. Starting a new one will discard it.`, ok: 'Discard', danger: true });
  }

  async function startPractice(ids) {
    if (!ids.length) return snackbar('No questions match these filters.');
    if (!(await guardActiveSession())) return;
    newSession('practice', ids);
  }

  // ---------- Quiz ----------
  function renderQuiz() {
    const s = state.session;
    if (!s) return go('#/');
    if (s.mode === 'exam' && Date.now() >= s.endsAt) return finishSession(true);
    const id = s.ids[s.idx];
    const q = QMAP[id];
    const t = TOPIC[q.topic];
    const picks = s.picks[id] || [];
    const isExam = s.mode === 'exam';
    const checked = !isExam && s.checked[id];
    const ok = checked && sameSet(picks, q.answer);
    const inputType = q.type === 'multi' ? 'checkbox' : 'radio';
    const answeredCount = s.ids.filter(x => (s.picks[x] || []).length).length;
    const progress = isExam ? pct(answeredCount, s.ids.length) : pct(s.idx + (checked ? 1 : 0), s.ids.length);

    const optionsHtml = s.order[id].map((oi, n) => {
      const isPicked = picks.includes(oi);
      const isAnswer = q.answer.includes(oi);
      let cls = '', stateIcon = '';
      if (checked) {
        if (isAnswer) { cls = 'is-correct'; stateIcon = icon('checkCircle', 'state-icon'); }
        else if (isPicked) { cls = 'is-wrong'; stateIcon = icon('cancel', 'state-icon'); }
      }
      return `<label class="option ${cls}">
        <input type="${inputType}" name="opt" value="${oi}" ${isPicked ? 'checked' : ''} ${checked ? 'disabled' : ''}>
        <span class="mark ${inputType === 'radio' ? 'radio' : 'check'}"></span>
        <span class="text body-large"><span class="sr-letter muted">${String.fromCharCode(65 + n)}.</span> ${esc(q.options[oi])}</span>
        ${stateIcon}
      </label>`;
    }).join('');

    const showExplanation = checked && (!ok || state.prefs.explainAlways);
    const feedback = checked ? `
      <section class="card ${ok ? 'success' : 'error'} feedback" id="feedback">
        <div class="head">${icon(ok ? 'checkCircle' : 'cancel')}<h2 class="title-medium">${ok ? 'Correct' : 'Not quite'}</h2></div>
        ${!ok ? `<p class="body-medium"><strong>Correct answer:</strong> ${q.answer.map(a => esc(q.options[a])).join(' · ')}</p>` : ''}
        ${showExplanation ? `<p class="body-medium explanation">${esc(q.explanation)}</p>
        <p class="body-small ref">${icon('book', 'sm')}${esc(q.ref)}</p>` : ''}
      </section>` : '';

    const last = s.idx === s.ids.length - 1;
    const footer = isExam ? `
      <div class="row between fab-row card" style="padding:8px">
        <button class="btn text" data-action="prev" ${s.idx === 0 ? 'disabled' : ''}>${icon('back')}Back</button>
        <button class="btn tonal" data-action="overview">${icon('grid')}${answeredCount}/${s.ids.length}</button>
        ${last ? `<button class="btn filled" data-action="submit-exam">Submit</button>`
               : `<button class="btn filled" data-action="next">Next</button>`}
      </div>` : `
      <div>
        ${checked ? `<button class="btn filled block" data-action="next">${last ? 'See results' : 'Next question'}</button>`
                  : `<button class="btn filled block" data-action="check" id="checkBtn" ${picks.length ? '' : 'disabled'}>Check answer</button>`}
      </div>`;

    main.innerHTML = `
      <div class="stack">
        <div class="quiz-head">
          <button class="icon-btn" data-action="quit" aria-label="${isExam ? 'Exit exam' : 'End practice'}" title="${isExam ? 'Exit exam' : 'End practice'}">${icon('close')}</button>
          <span class="title-medium">${isExam ? 'Exam' : 'Practice'} · ${s.idx + 1}/${s.ids.length}</span>
          <span class="spacer"></span>
          ${isExam ? `<button class="icon-btn ${s.flags[id] ? 'selected' : ''}" data-action="flag" aria-pressed="${!!s.flags[id]}" aria-label="Flag for review" title="Flag for review">${icon('flag')}</button>
            <span class="badge-chip timer" id="timer">${icon('timer', 'sm')}<span>${fmtClock(s.endsAt - Date.now())}</span></span>` : ''}
        </div>
        ${bar(progress)}

        <section class="card stack" aria-labelledby="qtext">
          <div class="row"><span class="badge-chip primary">${esc(t.short)}</span><span class="body-small muted">${typeHint(q)}</span></div>
          <p class="question-text" id="qtext">${esc(q.q)}</p>
          <fieldset class="options ${checked ? 'locked' : ''}" aria-labelledby="qtext">${optionsHtml}</fieldset>
        </section>
        ${feedback}
        ${footer}
      </div>`;

    $$('input[name="opt"]', main).forEach(inp => inp.addEventListener('change', onPick));
    if (checked) $('[data-action="next"]', main).scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    if (isExam) timerHandle = setInterval(tickTimer, 1000);
  }

  function onPick() {
    const s = state.session;
    const id = s.ids[s.idx];
    s.picks[id] = $$('input[name="opt"]:checked', main).map(i => Number(i.value));
    save();
    const btn = $('#checkBtn');
    if (btn) btn.disabled = !s.picks[id].length;
    if (s.mode === 'exam') {
      const answered = s.ids.filter(x => (s.picks[x] || []).length).length;
      const ov = $('[data-action="overview"]', main);
      if (ov) ov.innerHTML = `${icon('grid')}${answered}/${s.ids.length}`;
      $('.progress > span', main).style.width = pct(answered, s.ids.length) + '%';
    }
  }

  function tickTimer() {
    const s = state.session;
    if (!s || s.mode !== 'exam') return clearInterval(timerHandle);
    const left = s.endsAt - Date.now();
    const el = $('#timer');
    if (el) { el.lastElementChild.textContent = fmtClock(left); el.classList.toggle('low', left < 5 * 60 * 1000); }
    if (left <= 0) { clearInterval(timerHandle); finishSession(true); }
  }

  function showOverview() {
    const s = state.session;
    const unanswered = s.ids.filter(x => !(s.picks[x] || []).length).length;
    const flagged = s.ids.filter(x => s.flags[x]).length;
    openDialog(`<form method="dialog" class="dialog-body">
      <h2 class="headline-small">Exam overview</h2>
      <p class="body-medium muted">${s.ids.length - unanswered} answered · ${unanswered} unanswered · ${flagged} flagged</p>
      <div class="legend body-small muted">
        <span><i style="background:var(--md-secondary-container)"></i>Answered</span>
        <span><i style="background:var(--md-error);border-radius:50%"></i>Flagged</span>
        <span><i style="outline:2px solid var(--md-primary)"></i>Current</span>
      </div>
      <div class="qgrid">${s.ids.map((x, i) => `<button value="${i}" class="${(s.picks[x] || []).length ? 'answered' : ''} ${s.flags[x] ? 'flagged' : ''} ${i === s.idx ? 'current' : ''}">${i + 1}</button>`).join('')}</div>
      <div class="dialog-actions">
        <button class="btn text" value="close">Close</button>
        <button class="btn filled" value="submit">Submit exam</button>
      </div></form>`, v => {
      if (v === 'submit') submitExam();
      else if (v !== '' && v !== 'close' && !isNaN(Number(v))) { s.idx = Number(v); save(); renderQuiz(); }
    });
  }

  async function submitExam() {
    const s = state.session;
    const unanswered = s.ids.filter(x => !(s.picks[x] || []).length).length;
    const flagged = s.ids.filter(x => s.flags[x]).length;
    const extra = [unanswered ? `${plural(unanswered, 'question')} unanswered` : '', flagged ? `${flagged} flagged` : ''].filter(Boolean).join(' and ');
    const ok = await confirmDialog({
      title: 'Submit exam?',
      text: extra ? `You still have ${extra}. Unanswered questions count as incorrect.` : 'You have answered every question. You will see your score and explanations next.',
      ok: 'Submit',
    });
    if (ok) finishSession(false);
  }

  function finishSession(timedOut) {
    clearInterval(timerHandle);
    const s = state.session;
    if (!s) return go('#/');
    const isExam = s.mode === 'exam';
    const ids = isExam ? s.ids : s.ids.filter(id => s.checked[id]);
    const byTopic = {};
    let correct = 0;
    ids.forEach(id => {
      const q = QMAP[id];
      const ok = sameSet(s.picks[id] || [], q.answer);
      if (ok) correct++;
      if (isExam) recordAnswer(id, ok);
      const bt = byTopic[q.topic] || (byTopic[q.topic] = { c: 0, n: 0 });
      bt.n++; if (ok) bt.c++;
    });
    const dur = Math.round(((isExam ? Math.min(Date.now(), s.endsAt) : Date.now()) - s.startedAt) / 1000);
    const result = {
      mode: s.mode, ids, picks: s.picks, order: s.order, correct, total: ids.length,
      pct: pct(correct, ids.length), passed: pct(correct, ids.length) >= EXAM.pass, byTopic, dur, timedOut, t: Date.now(),
    };
    if (isExam) state.exams.push({ t: result.t, correct, total: ids.length, pct: result.pct, passed: result.passed, dur });
    state.lastResult = result;
    state.session = null;
    save();
    if (timedOut) snackbar("Time's up — your exam was submitted automatically.");
    go('#/results');
  }

  // ---------- Results ----------
  let reviewFilter = 'wrong';
  function renderResults() {
    const r = state.lastResult;
    if (!r) return go('#/');
    const isExam = r.mode === 'exam';
    const wrong = r.ids.filter(id => !sameSet(r.picks[id] || [], QMAP[id].answer));
    if (!wrong.length) reviewFilter = 'all';
    const list = reviewFilter === 'wrong' ? wrong : r.ids;
    const color = r.passed ? 'var(--md-success)' : 'var(--md-error)';

    main.innerHTML = `
      <div class="stack">
        <div class="page-head"><h1 class="headline-medium">${isExam ? 'Exam results' : 'Practice results'}</h1></div>
        ${!r.total ? `<section class="card empty">${icon('info')}<p class="body-large">No answered questions in this session.</p></section>` : `
        <section class="card lg ${isExam ? (r.passed ? 'success' : 'error') : 'primary'}">
          <div class="row" style="gap:24px">
            ${ring(r.pct, 'score', isExam ? color : 'var(--md-primary)')}
            <div class="stack-sm" style="flex:1;min-width:200px">
              <h2 class="headline-small">${isExam ? (r.passed ? 'Passed!' : 'Not yet — keep practicing') : `${r.correct} of ${r.total} correct`}</h2>
              <p class="body-medium">${isExam ? `${r.correct} of ${r.total} correct. Passing score is ${EXAM.pass}% (${Math.ceil(r.total * EXAM.pass / 100)} correct).` : (r.pct >= EXAM.pass ? 'Above the passing threshold. Nice work.' : `The real exam requires ${EXAM.pass}%. Read the explanations below.`)}</p>
              <p class="body-small">Time: ${fmtDuration(r.dur)}${r.timedOut ? ' (time limit reached)' : ''}</p>
            </div>
          </div>
        </section>

        <h2 class="title-medium section-title">By topic</h2>
        <div class="list">
          ${TOPICS.filter(t => r.byTopic[t.id]).map(t => {
            const b = r.byTopic[t.id]; const p = pct(b.c, b.n);
            return `<div class="list-item"><span class="content">
              <span class="row between"><span class="title-small">${esc(t.title)}</span><span class="body-small muted">${b.c}/${b.n} · ${p}%</span></span>
              ${bar(p, p >= EXAM.pass ? 'success' : p < 60 ? 'error' : '')}</span></div>`;
          }).join('')}
        </div>

        <div class="row between" style="margin-top:8px">
          <h2 class="title-medium" style="margin:0 4px">Review answers</h2>
          <div class="chips">
            <button class="chip" data-action="review-filter" data-value="wrong" aria-pressed="${reviewFilter === 'wrong'}">${reviewFilter === 'wrong' ? icon('check') : ''}Incorrect (${wrong.length})</button>
            <button class="chip" data-action="review-filter" data-value="all" aria-pressed="${reviewFilter === 'all'}">${reviewFilter === 'all' ? icon('check') : ''}All (${r.ids.length})</button>
          </div>
        </div>
        <div class="stack-sm">
          ${list.length ? list.map(id => reviewItem(r, id, r.ids.indexOf(id) + 1)).join('') : `<div class="card empty">${icon('checkCircle')}<p class="body-large">No incorrect answers. Excellent!</p></div>`}
        </div>`}

        <div class="row" style="justify-content:flex-end;margin-top:8px">
          <a class="btn outlined" href="#/">Home</a>
          ${wrong.length ? `<button class="btn tonal" data-action="retry-wrong">${icon('replay')}Retry incorrect</button>` : ''}
          <a class="btn filled" href="#/${isExam ? 'exam' : 'practice'}">${isExam ? 'New exam' : 'Practice more'}</a>
        </div>
      </div>`;
  }

  function reviewItem(r, id, num) {
    const q = QMAP[id];
    const picks = r.picks[id] || [];
    const ok = sameSet(picks, q.answer);
    const order = (r.order && r.order[id]) || q.options.map((_, i) => i);
    return `<details class="review" ${!ok && reviewFilter === 'wrong' ? 'open' : ''}>
      <summary>
        <span class="${ok ? 'ok-text' : 'bad-text'}">${icon(ok ? 'checkCircle' : 'cancel')}</span>
        <span class="stack-sm" style="gap:2px;flex:1"><span class="body-small muted">Q${num} · ${esc(TOPIC[q.topic].short)}${!picks.length ? ' · unanswered' : ''}</span>
        <span class="body-large">${esc(q.q)}</span></span>
      </summary>
      <div class="body">
        <div class="stack-sm">
          ${order.map(oi => {
            const isA = q.answer.includes(oi), isP = picks.includes(oi);
            const cls = isA ? 'correct' : isP ? 'wrong' : '';
            return `<div class="review-option ${cls}">${isA ? icon('checkCircle') : isP ? icon('cancel') : '<span class="placeholder"></span>'}
              <span class="body-medium">${esc(q.options[oi])}${isP ? ' <strong>(your answer)</strong>' : ''}</span></div>`;
          }).join('')}
        </div>
        <div class="card filled stack-sm">
          <div class="row">${icon('lightbulb', 'sm')}<span class="title-small">Explanation</span></div>
          <p class="body-medium explanation">${esc(q.explanation)}</p>
          <p class="body-small muted ref">${icon('book', 'sm')}${esc(q.ref)}</p>
        </div>
      </div>
    </details>`;
  }

  // ---------- Exam home ----------
  function renderExamHome() {
    const s = state.session;
    const hist = state.exams.slice().reverse();
    const passes = state.exams.filter(e => e.passed).length;
    const avg = state.exams.length ? Math.round(state.exams.reduce((a, e) => a + e.pct, 0) / state.exams.length) : 0;
    main.innerHTML = `
      <div class="stack">
        <div class="page-head"><h1 class="headline-medium">Exam simulation</h1></div>
        <section class="card primary lg stack">
          <p class="body-large">Mirrors the real PSPO I format: questions are drawn at random from all topics, the clock keeps running, and you only see explanations after you submit.</p>
          <div class="facts">
            <div class="fact"><div class="title-medium">${EXAM.questions}</div><div class="body-small muted">questions</div></div>
            <div class="fact"><div class="title-medium">${EXAM.minutes} min</div><div class="body-small muted">time limit</div></div>
            <div class="fact"><div class="title-medium">${EXAM.pass}%</div><div class="body-small muted">to pass (${Math.ceil(EXAM.questions * EXAM.pass / 100)} correct)</div></div>
            <div class="fact"><div class="title-medium">${QUESTIONS.length}</div><div class="body-small muted">question bank</div></div>
          </div>
          <ul class="body-medium" style="margin:0;padding-left:20px">
            <li>Use <strong>Back/Next</strong> to move freely and the flag to mark questions to revisit.</li>
            <li>The grid button shows which questions are answered or flagged.</li>
            <li>When time runs out the exam is submitted automatically.</li>
          </ul>
          <div class="row" style="justify-content:flex-end">
            ${s && s.mode === 'exam'
              ? `<a class="btn filled" href="#/quiz">${icon('play')}Resume exam (${fmtClock(s.endsAt - Date.now())} left)</a>`
              : `<button class="btn filled" data-action="start-exam">${icon('play')}Start exam</button>`}
          </div>
        </section>

        ${hist.length ? `
        <div class="grid-4">
          <div class="card stat"><span class="value">${hist.length}</span><span class="body-small muted">attempts</span></div>
          <div class="card stat"><span class="value">${avg}%</span><span class="body-small muted">average score</span></div>
          <div class="card stat"><span class="value">${passes}</span><span class="body-small muted">passed (≥${EXAM.pass}%)</span></div>
        </div>
        <h2 class="title-medium section-title">History</h2>
        <div class="list">${hist.map(e => `
          <div class="list-item">
            <span class="lead ${e.passed ? 'done' : ''}">${icon(e.passed ? 'check' : 'close')}</span>
            <span class="content"><span class="title-small">${e.pct}% · ${e.correct}/${e.total}</span>
            <span class="body-small muted">${fmtDate(e.t)} · ${fmtDuration(e.dur)}</span></span>
            <span class="badge-chip ${e.passed ? 'success' : 'error'}">${e.passed ? 'Pass' : 'Fail'}</span>
          </div>`).join('')}</div>` : `
        <section class="card outlined stack-sm">
          <div class="row">${icon('info')}<h2 class="title-medium">Tip</h2></div>
          <p class="body-medium muted">Most candidates who pass consistently score 90%+ on simulations before booking the real assessment. Practice by topic first, then take full simulations.</p>
        </section>`}
      </div>`;
  }

  // ---------- Sync (export / import) ----------
  const CODE_PREFIX = 'PSPO1:';
  const exportPayload = () => ({ app: 'pspo-prep', v: 1, t: Date.now(), answers: state.answers, studied: state.studied, exams: state.exams });
  const encodeCode = obj => CODE_PREFIX + btoa(unescape(encodeURIComponent(JSON.stringify(obj))));

  function decodeBackup(text) {
    const raw = text.trim();
    const json = raw.startsWith(CODE_PREFIX) ? decodeURIComponent(escape(atob(raw.slice(CODE_PREFIX.length).replace(/\s/g, '')))) : raw;
    const d = JSON.parse(json);
    if (!d || d.app !== 'pspo-prep' || typeof d.answers !== 'object') throw new Error('Not a PSPO Prep backup');
    return d;
  }

  function mergeProgress(d) {
    let updated = 0, added = 0;
    for (const [id, a] of Object.entries(d.answers || {})) {
      if (!QMAP[id] || !a || typeof a.n !== 'number' || typeof a.t !== 'number') continue;
      const cur = state.answers[id];
      if (!cur || a.t > (cur.t || 0)) { state.answers[id] = { n: a.n, c: a.c || 0, last: !!a.last, t: a.t }; updated++; }
    }
    for (const [id, t] of Object.entries(d.studied || {})) if (TOPIC[id] && !state.studied[id]) state.studied[id] = t;
    const have = new Set(state.exams.map(e => e.t));
    for (const e of d.exams || []) {
      if (e && typeof e.t === 'number' && typeof e.pct === 'number' && !have.has(e.t)) { state.exams.push(e); have.add(e.t); added++; }
    }
    state.exams.sort((a, b) => a.t - b.t);
    save();
    return { updated, added };
  }

  function showExport() {
    const answered = Object.keys(state.answers).length;
    openDialog(`<form method="dialog" class="dialog-body">
      <h2 class="headline-small">Export progress</h2>
      <p class="body-medium muted">${plural(answered, 'answered question')}, ${plural(state.exams.length, 'exam')} and ${plural(Object.keys(state.studied).length, 'studied topic')}. Save the file or copy the code, then choose <strong>Import progress</strong> on your other device.</p>
      <textarea class="code-box" id="exportCode" readonly aria-label="Backup code">${esc(encodeCode(exportPayload()))}</textarea>
      <div class="dialog-actions">
        <button class="btn text" value="close">Close</button>
        <button class="btn outlined" type="button" data-action="export-file">${icon('download')}Save file</button>
        <button class="btn filled" type="button" data-action="export-copy">${icon('copy')}Copy code</button>
      </div></form>`);
  }

  async function exportCopy() {
    const box = $('#exportCode');
    try { await navigator.clipboard.writeText(box.value); }
    catch { box.select(); document.execCommand('copy'); }
    snackbar('Code copied. Paste it into Import progress on your other device.');
  }

  async function exportFile() {
    const name = `pspo-prep-progress-${new Date().toISOString().slice(0, 10)}.json`;
    const blob = new Blob([JSON.stringify(exportPayload())], { type: 'application/json' });
    const file = new File([blob], name, { type: 'application/json' });
    if (matchMedia('(pointer: coarse)').matches && navigator.canShare && navigator.canShare({ files: [file] })) {
      try { await navigator.share({ files: [file], title: 'PSPO Prep progress' }); return; }
      catch (e) { if (e.name === 'AbortError') return; }
    }
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    snackbar(`Saved ${name}`);
  }

  function showImport() {
    openDialog(`<form method="dialog" class="dialog-body">
      <h2 class="headline-small">Import progress</h2>
      <p class="body-medium muted">Choose a backup file or paste a code from your other device. It is merged with the progress on this device.</p>
      <label class="btn outlined" style="align-self:flex-start">${icon('upload')}Choose file
        <input type="file" id="importFile" accept=".json,application/json,text/plain" hidden></label>
      <textarea class="code-box" id="importText" placeholder="…or paste the code here" aria-label="Backup code"></textarea>
      <p class="body-small bad-text" id="importError" hidden></p>
      <div class="dialog-actions">
        <button class="btn text" value="cancel">Cancel</button>
        <button class="btn filled" type="button" data-action="import-apply">Import</button>
      </div></form>`);
  }

  function applyImport(text) {
    const err = $('#importError');
    let d;
    try { d = decodeBackup(text); }
    catch {
      err.textContent = 'That doesn’t look like a PSPO Prep backup. Check that the whole code was copied.';
      err.hidden = false;
      return;
    }
    const { updated, added } = mergeProgress(d);
    $('#dialog').close();
    route();
    snackbar(`Imported: ${plural(updated, 'answer')} updated, ${plural(added, 'exam')} added.`);
  }

  // ---------- Actions ----------
  const actions = {
    export: showExport,
    'export-copy': exportCopy,
    'export-file': exportFile,
    import: showImport,
    'import-apply': () => applyImport($('#importText').value),
    'practice-mistakes': () => { const ids = shuffle(mistakeIds()); startPractice(ids); },
    'practice-topic': el => startPractice(shuffle(QUESTIONS.filter(q => q.topic === el.dataset.topic).map(q => q.id))),
    'toggle-studied': el => {
      const id = el.dataset.topic;
      if (state.studied[id]) delete state.studied[id]; else state.studied[id] = Date.now();
      save(); renderTopic(id);
      snackbar(state.studied[id] ? 'Marked as studied' : 'Marked as not studied');
    },
    'toggle-topic': el => {
      const p = state.prefs, id = el.dataset.topic;
      p.topics = p.topics.includes(id) ? p.topics.filter(x => x !== id) : [...p.topics, id];
      save(); renderPracticeSetup();
    },
    'toggle-all-topics': () => {
      const p = state.prefs;
      p.topics = p.topics.length === TOPICS.length ? [] : TOPICS.map(t => t.id);
      save(); renderPracticeSetup();
    },
    pref: el => {
      const k = el.dataset.pref;
      state.prefs[k] = k === 'count' ? Number(el.dataset.value) : el.dataset.value;
      save(); renderPracticeSetup();
    },
    'start-practice': () => {
      const pool = shuffle(practicePool()).map(q => q.id);
      const n = state.prefs.count === 0 ? pool.length : state.prefs.count;
      startPractice(pool.slice(0, n));
    },
    'start-exam': async () => {
      if (!(await guardActiveSession())) return;
      newSession('exam', shuffle(QUESTIONS.map(q => q.id)).slice(0, EXAM.questions));
    },
    check: () => {
      const s = state.session, id = s.ids[s.idx];
      const picks = s.picks[id] || [];
      if (!picks.length) return;
      s.checked[id] = true;
      recordAnswer(id, sameSet(picks, QMAP[id].answer));
      save(); renderQuiz();
    },
    next: () => {
      const s = state.session;
      if (s.idx < s.ids.length - 1) { s.idx++; save(); renderQuiz(); window.scrollTo(0, 0); }
      else if (s.mode === 'practice') finishSession(false);
    },
    prev: () => { const s = state.session; if (s.idx > 0) { s.idx--; save(); renderQuiz(); window.scrollTo(0, 0); } },
    flag: () => { const s = state.session, id = s.ids[s.idx]; s.flags[id] = !s.flags[id]; save(); renderQuiz(); },
    overview: showOverview,
    'submit-exam': submitExam,
    quit: async () => {
      const s = state.session;
      if (s.mode === 'exam') {
        const ok = await confirmDialog({ title: 'Leave the exam?', text: 'Your exam is saved and the timer keeps running. You can resume it from Home or the Exam tab.', ok: 'Leave', cancel: 'Stay' });
        if (ok) go('#/exam');
      } else {
        const done = s.ids.filter(id => s.checked[id]).length;
        if (!done) { state.session = null; save(); return go('#/practice'); }
        const ok = await confirmDialog({ title: 'End practice?', text: `You have answered ${plural(done, 'question')}. See your results now?`, ok: 'End and see results', cancel: 'Keep going' });
        if (ok) finishSession(false);
      }
    },
    'review-filter': el => { reviewFilter = el.dataset.value; renderResults(); },
    'retry-wrong': () => {
      const r = state.lastResult;
      startPractice(shuffle(r.ids.filter(id => !sameSet(r.picks[id] || [], QMAP[id].answer))));
    },
    reset: async () => {
      const ok = await confirmDialog({ title: 'Reset all progress?', text: 'This deletes your answers, studied topics and exam history on this device. This cannot be undone.', ok: 'Reset', danger: true });
      if (!ok) return;
      const theme = state.theme;
      Object.assign(state, defaults(), { theme });
      save(); renderHome(); snackbar('Progress reset');
    },
  };

  document.addEventListener('click', e => {
    const el = e.target.closest('[data-action]');
    if (!el || el.tagName === 'INPUT') return;
    const fn = actions[el.dataset.action];
    if (fn) { e.preventDefault(); fn(el); }
  });
  document.addEventListener('change', e => {
    if (e.target.matches('[data-action="explain-always"]')) { state.prefs.explainAlways = e.target.checked; save(); }
    if (e.target.id === 'importFile' && e.target.files[0]) e.target.files[0].text().then(applyImport);
  });
  document.addEventListener('keydown', e => {
    if (!location.hash.startsWith('#/quiz') || !state.session || $('#dialog').open) return;
    if (e.target.closest('input, textarea') && e.key !== 'Enter') return;
    const s = state.session;
    const id = s.ids[s.idx];
    const k = e.key.toLowerCase();
    if (/^[a-h1-8]$/.test(k)) {
      const n = /\d/.test(k) ? Number(k) - 1 : k.charCodeAt(0) - 97;
      const inp = $$('input[name="opt"]', main)[n];
      if (inp && !inp.disabled) { inp.checked = inp.type === 'radio' ? true : !inp.checked; onPick(); }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (s.mode === 'practice') actions[s.checked[id] ? 'next' : 'check']();
      else if (s.idx < s.ids.length - 1) actions.next();
    } else if (s.mode === 'exam' && e.key === 'ArrowRight') actions.next();
    else if (s.mode === 'exam' && e.key === 'ArrowLeft') actions.prev();
  });

  $('#themeBtn').addEventListener('click', () => {
    state.theme = { system: 'light', light: 'dark', dark: 'system' }[state.theme];
    save(); applyTheme();
    snackbar(`Theme: ${state.theme === 'system' ? 'follow device' : state.theme}`);
  });

  window.addEventListener('scroll', () => $('.top-app-bar').classList.toggle('scrolled', window.scrollY > 4), { passive: true });
  window.addEventListener('hashchange', route);

  // ---------- PWA ----------
  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    deferredInstall = e;
    $('#installBtn').hidden = false;
  });
  $('#installBtn').addEventListener('click', async () => {
    if (!deferredInstall) return;
    deferredInstall.prompt();
    await deferredInstall.userChoice;
    deferredInstall = null;
    $('#installBtn').hidden = true;
  });
  window.addEventListener('appinstalled', () => { $('#installBtn').hidden = true; snackbar('PSPO Prep installed'); });

  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js').then(reg => {
        reg.addEventListener('updatefound', () => {
          const sw = reg.installing;
          sw && sw.addEventListener('statechange', () => {
            if (sw.state === 'installed' && navigator.serviceWorker.controller) {
              snackbar('A new version is available.', 'Reload', () => location.reload());
            }
          });
        });
      }).catch(() => { /* offline support unavailable */ });
    });
  }

  // Render nav icons and start
  $$('#nav [data-icon]').forEach(el => { el.innerHTML = icon(el.dataset.icon); });
  applyTheme();
  route();
})();
