/* Topic Quizzes — WSC 2026 "Are We There Yet?" guiding sections.
   25-question quizzes per topic. Every new quiz serves questions you have
   not seen before, until the whole bank is exhausted; then the oldest
   questions recycle. Seen-question history persists in localStorage. */

const TQ_KEY = 'sc-topics-v1';

function tqLoad() {
  try {
    const raw = localStorage.getItem(TQ_KEY);
    if (!raw) return { used: {}, stats: {} };
    const p = JSON.parse(raw);
    return { used: p.used || {}, stats: p.stats || {} };
  } catch { return { used: {}, stats: {} }; }
}
function tqSave() { try { localStorage.setItem(TQ_KEY, JSON.stringify(tq)); } catch {} }
let tq = tqLoad();

const TQ_QUIZ_SIZE = 25;

const TQ_SUBJ_COLORS = {
  'Science & Tech': '#6c9bd2',
  'Social Studies': '#f4b942',
  'Art & Music': '#c084fc',
  'Lit & Media': '#4ade80',
  'Special Area': '#fb7185',
  'History': '#fbbf24'
};

function tqBank(tid) { return (window.SC_TOPIC_QUESTIONS && SC_TOPIC_QUESTIONS[tid]) || []; }
function tqTopic(tid) { return SC_TOPICS.find(t => t.id === tid); }

function tqShuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/* Pick a fresh set: unseen questions first; recycle oldest-seen only when
   the bank runs out. Returns { questions, recycled, bankExhausted }. */
function tqFreshSet(tid, n) {
  const bank = tqBank(tid);
  const used = tq.used[tid] || [];
  const usedSet = new Set(used);
  const unseen = tqShuffle(bank.filter(q => !usedSet.has(q.id)));
  const picked = unseen.slice(0, n);
  let recycled = 0;
  if (picked.length < n && used.length) {
    const byId = new Map(bank.map(q => [q.id, q]));
    for (const qid of used) {
      if (picked.length >= n) break;
      const q = byId.get(qid);
      if (q) { picked.push(q); recycled++; }
    }
  }
  const pickedIds = new Set(picked.map(q => q.id));
  tq.used[tid] = used.filter(id => !pickedIds.has(id)).concat(picked.map(q => q.id));
  tqSave();
  return { questions: tqShuffle(picked.slice()), recycled, bankExhausted: unseen.length <= n };
}

/* ====================== TOPICS HOME (GRID) ====================== */
function tqStatsFor(tid) {
  const s = tq.stats[tid] || { quizzes: 0, best: null, last: null };
  const bank = tqBank(tid);
  const seen = new Set(tq.used[tid] || []);
  let unseen = 0;
  bank.forEach(q => { if (!seen.has(q.id)) unseen++; });
  return { ...s, total: bank.length, unseen };
}

function tqPills(subjects) {
  return `<div class="tq-pills">${subjects.map(s =>
    `<span class="tq-pill" style="border-color:${TQ_SUBJ_COLORS[s] || 'var(--border)'}">${s}</span>`).join('')}</div>`;
}

function renderTopicsHome() {
  const root = document.getElementById('topics-home');
  root.innerHTML = `<div class="tq-grid">` + SC_TOPICS.map(t => {
    const st = tqStatsFor(t.id);
    const pct = st.total ? Math.round((st.total - st.unseen) / st.total * 100) : 0;
    return `
      <div class="tq-card" data-topic="${t.id}">
        <div class="tq-order">${t.order}</div>
        <h3>${t.title}</h3>
        <p class="tq-blurb">${t.blurb}</p>
        ${tqPills(t.subjects)}
        <div class="tq-stats">
          <span>${st.total} questions</span>
          <span>${st.quizzes} quiz${st.quizzes === 1 ? '' : 'zes'} taken</span>
          ${st.best !== null ? `<span>best ${st.best}%</span>` : ''}
        </div>
        <div class="subj-bar-track" title="${st.total - st.unseen} of ${st.total} questions seen">
          <div class="subj-bar-fill" style="width:${pct}%"></div>
        </div>
      </div>`;
  }).join('') + `</div>`;
  root.querySelectorAll('.tq-card').forEach(c =>
    c.addEventListener('click', () => openTopic(c.dataset.topic)));
}

/* ====================== TOPIC DETAIL ====================== */
let tqCurrentTopic = null;

function tqShow(id) {
  ['topics-home', 'topic-detail', 'tq-runner', 'tq-results'].forEach(x =>
    document.getElementById(x).classList.toggle('hidden', x !== id));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function openTopic(tid) {
  tqCurrentTopic = tid;
  const t = tqTopic(tid);
  const st = tqStatsFor(tid);
  const el = document.getElementById('topic-detail');
  el.innerHTML = `
    <button class="btn-ghost" id="tq-back-home">← All topics</button>
    <div class="panel tq-detail-head">
      <div class="tq-order big">${t.order}</div>
      <div>
        <h1>${t.title}</h1>
        <p class="lead">${t.angle}</p>
        ${tqPills(t.subjects)}
        <div class="tq-stats" style="margin-top:10px">
          <span>${st.total} questions in bank</span>
          <span>${st.unseen} you haven't seen</span>
          <span>${st.quizzes} quizzes taken</span>
          ${st.best !== null ? `<span>best score ${st.best}%</span>` : ''}
        </div>
      </div>
    </div>
    <div class="q-nav" style="justify-content:flex-start">
      <button class="btn-primary" id="tq-start">Start ${Math.min(TQ_QUIZ_SIZE, st.total)}-Question Quiz</button>
      <button class="btn-ghost" id="tq-notes-toggle">Study Notes</button>
    </div>
    <div id="tq-notes" class="hidden">
      <div class="callout">${t.summary}</div>
      ${t.notes.map(n => `
        <div class="topic">
          <h3>${n.subtopic}</h3>
          <p><em>${n.idea}</em></p>
          <ul>${n.points.map(p => `<li>${p}</li>`).join('')}</ul>
          ${n.examples.length ? `<p class="muted">Examples: ${n.examples.join(' · ')}</p>` : ''}
          ${n.debate.length ? `<p class="muted">Debate angles: ${n.debate.join(' — ')}</p>` : ''}
        </div>`).join('')}
    </div>`;
  tqShow('topic-detail');
  document.getElementById('tq-back-home').addEventListener('click', () => { renderTopicsHome(); tqShow('topics-home'); });
  document.getElementById('tq-start').addEventListener('click', () => startTopicQuiz(tid));
  document.getElementById('tq-notes-toggle').addEventListener('click', () =>
    document.getElementById('tq-notes').classList.toggle('hidden'));
}

/* ====================== TOPIC QUIZ RUNNER ====================== */
let tquiz = null;

function startTopicQuiz(tid) {
  const bank = tqBank(tid);
  if (!bank.length) { alert('This topic\'s question bank has not loaded. Try refreshing the page.'); return; }
  const { questions, recycled } = tqFreshSet(tid, TQ_QUIZ_SIZE);
  tquiz = { tid, questions, answers: new Array(questions.length).fill(null), idx: 0, recycled, counted: {} };
  tqShow('tq-runner');
  renderTopicQuestion();
}

function renderTopicQuestion() {
  const runner = document.getElementById('tq-runner');
  const t = tqTopic(tquiz.tid);
  const i = tquiz.idx;
  const q = tquiz.questions[i];
  const ans = tquiz.answers[i];
  runner.innerHTML = `
    ${tquiz.recycled && i === 0 ? `<div class="callout">You've seen almost every question in this topic — nice work! ${tquiz.recycled} of these ${tquiz.questions.length} are repeats of your oldest questions; the rest are fresh.</div>` : ''}
    <div class="q-card">
      <div class="q-meta">
        <span class="pill">${t.title}</span>
        <span class="pill">${i + 1} / ${tquiz.questions.length}</span>
        <span class="pill">${typeof subjLabel === 'function' ? subjLabel(q.s) : q.s}</span>
        <span class="pill">${q.d}</span>
      </div>
      <div class="q-stem">${q.q}</div>
      <div class="q-options">
        ${q.o.map((opt, oi) => {
          let cls = 'q-option';
          if (ans !== null) {
            if (oi === q.a) cls += ' correct';
            if (ans === oi && ans !== q.a) cls += ' wrong';
            cls += ' disabled';
          }
          return `<button class="${cls}" data-opt="${oi}"><span class="letter">${String.fromCharCode(65 + oi)}.</span> <span>${opt}</span></button>`;
        }).join('')}
      </div>
      ${(ans !== null && q.e) ? `<div class="q-explain"><b>${ans === q.a ? 'Correct.' : 'Incorrect.'}</b> ${q.e}</div>` : ''}
      <div class="q-nav">
        <button class="btn-ghost" id="tq-prev" ${i === 0 ? 'disabled' : ''}>← Prev</button>
        <span class="q-progress">${ans === null ? 'Pick an answer' : (ans === q.a ? '✓ Correct' : '✗ Incorrect')}</span>
        <button class="btn-primary" id="tq-next">${i === tquiz.questions.length - 1 ? 'Finish' : 'Next →'}</button>
      </div>
    </div>
    <div class="q-nav" style="justify-content:center">
      <button class="btn-ghost" id="tq-quit">Quit quiz</button>
    </div>`;
  runner.querySelectorAll('.q-option').forEach(btn => {
    btn.addEventListener('click', () => {
      if (tquiz.answers[i] !== null) return;
      const oi = parseInt(btn.dataset.opt, 10);
      tquiz.answers[i] = oi;
      const correct = oi === q.a;
      if (!tquiz.counted[q.id]) {
        tquiz.counted[q.id] = true;
        // Feed the main dashboard stats (defined in app.js).
        if (typeof store !== 'undefined') {
          store.attempts += 1;
          store.perSubject[q.s] = store.perSubject[q.s] || { attempts: 0, correct: 0 };
          store.perSubject[q.s].attempts += 1;
          if (correct) { store.correct += 1; store.perSubject[q.s].correct += 1; }
          if (typeof bumpStreak === 'function') bumpStreak();
          if (typeof saveStore === 'function') saveStore();
          if (typeof renderDashboard === 'function') renderDashboard();
        }
      }
      renderTopicQuestion();
    });
  });
  document.getElementById('tq-prev').addEventListener('click', () => { if (tquiz.idx > 0) { tquiz.idx--; renderTopicQuestion(); } });
  document.getElementById('tq-next').addEventListener('click', () => {
    if (tquiz.idx === tquiz.questions.length - 1) finishTopicQuiz();
    else { tquiz.idx++; renderTopicQuestion(); }
  });
  document.getElementById('tq-quit').addEventListener('click', () => {
    if (confirm('Quit this quiz? Your answered questions still count as seen.')) openTopic(tquiz.tid);
  });
}

function finishTopicQuiz() {
  const wrong = [];
  let correct = 0;
  tquiz.questions.forEach((q, i) => {
    if (tquiz.answers[i] === q.a) correct++;
    else wrong.push({ q, picked: tquiz.answers[i] });
  });
  const pct = tquiz.questions.length ? Math.round(correct / tquiz.questions.length * 100) : 0;
  const st = tq.stats[tquiz.tid] || { quizzes: 0, best: null, last: null };
  st.quizzes += 1;
  st.last = pct;
  if (st.best === null || pct > st.best) st.best = pct;
  tq.stats[tquiz.tid] = st;
  tqSave();

  const t = tqTopic(tquiz.tid);
  const after = tqStatsFor(tquiz.tid);
  const res = document.getElementById('tq-results');
  tqShow('tq-results');
  res.innerHTML = `
    <div class="panel">
      <h2>${t.title} — Quiz Complete</h2>
      <div class="results-grid">
        <div class="result-card"><div class="v">${correct}/${tquiz.questions.length}</div><div class="l">Correct</div></div>
        <div class="result-card"><div class="v">${pct}%</div><div class="l">Score</div></div>
        <div class="result-card"><div class="v">${after.unseen}</div><div class="l">Unseen questions left</div></div>
      </div>
      ${after.unseen === 0 ? `<div class="callout">You have now seen every question in this topic. New quizzes will recycle your oldest questions — still great for revision.</div>` : ''}
      <div class="q-nav" style="justify-content:flex-start; flex-wrap:wrap">
        <button class="btn-primary" id="tq-again">New Quiz on This Topic — Fresh Questions</button>
        <button class="btn-ghost" id="tq-to-topic">Back to Topic</button>
        <button class="btn-ghost" id="tq-to-home">All Topics</button>
      </div>
      ${wrong.length ? `
        <h3>Review the ${wrong.length} you missed</h3>
        <div class="review-list">
          ${wrong.map(w => `
            <div class="review-item">
              <div class="rq">${w.q.q}</div>
              <div class="ra ${w.picked === null ? '' : 'wrong'}">${w.picked === null ? 'No answer' : 'You picked: ' + String.fromCharCode(65 + w.picked) + '. ' + w.q.o[w.picked]}</div>
              <div class="ra correct">Correct: ${String.fromCharCode(65 + w.q.a)}. ${w.q.o[w.q.a]}</div>
              ${w.q.e ? `<div class="muted" style="margin-top:6px">${w.q.e}</div>` : ''}
            </div>`).join('')}
        </div>` : '<p class="muted" style="margin-top:14px">Perfect run. Alpaca-level performance.</p>'}
    </div>`;
  document.getElementById('tq-again').addEventListener('click', () => startTopicQuiz(tquiz.tid));
  document.getElementById('tq-to-topic').addEventListener('click', () => openTopic(tquiz.tid));
  document.getElementById('tq-to-home').addEventListener('click', () => { renderTopicsHome(); tqShow('topics-home'); });
}

/* ====================== INIT ====================== */
(function initTopics() {
  renderTopicsHome();
  document.querySelectorAll('[data-go="topics"]').forEach(btn =>
    btn.addEventListener('click', () => { renderTopicsHome(); tqShow('topics-home'); }));
})();
