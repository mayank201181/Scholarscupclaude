/* Scholar's Cup Dashboard — single-page app logic.
   All progress persists in localStorage. */

const STORE_KEY = 'sc-dashboard-v1';

function loadStore() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return defaultStore();
    const parsed = JSON.parse(raw);
    return { ...defaultStore(), ...parsed };
  } catch {
    return defaultStore();
  }
}
function defaultStore() {
  return {
    attempts: 0, correct: 0,
    perSubject: {},                  // { subject: { attempts, correct } }
    wrongQuestions: [],              // indices of wrong questions
    flashcards: {},                  // { id: 'known'|'learning' }
    topicsDone: {},                  // { topicId: true }
    streakDays: 0,
    lastStudied: null,               // YYYY-MM-DD
    eventDate: null
  };
}
function saveStore() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(store)); } catch {}
}
let store = loadStore();

function todayKey() {
  const d = new Date();
  const y = d.getFullYear(), m = String(d.getMonth()+1).padStart(2,'0'), day = String(d.getDate()).padStart(2,'0');
  return `${y}-${m}-${day}`;
}

function bumpStreak() {
  const today = todayKey();
  if (store.lastStudied === today) return;
  if (store.lastStudied) {
    const last = new Date(store.lastStudied + 'T00:00:00');
    const now  = new Date(today + 'T00:00:00');
    const days = Math.round((now - last) / (1000*60*60*24));
    if (days === 1) store.streakDays += 1;
    else if (days > 1) store.streakDays = 1;
  } else {
    store.streakDays = 1;
  }
  store.lastStudied = today;
  saveStore();
}

/* ====================== TAB NAVIGATION ====================== */
const tabs  = document.querySelectorAll('.tab');
const views = document.querySelectorAll('.view');
function goTo(name) {
  tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === name));
  views.forEach(v => v.classList.toggle('active', v.dataset.view === name));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
tabs.forEach(t => t.addEventListener('click', () => goTo(t.dataset.tab)));

document.querySelectorAll('[data-go]').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.go;
    goTo(target);
    if (target === 'questions' && btn.dataset.mode) {
      // pre-fill quick start
      const n = btn.dataset.mode === 'random10' ? '10' : '25';
      document.getElementById('qb-count').value = n;
      document.getElementById('qb-subject').value = 'all';
      document.getElementById('qb-difficulty').value = 'all';
      document.getElementById('qb-mode').value = 'practice';
      setTimeout(() => document.getElementById('qb-start').click(), 80);
    }
  });
});

/* ====================== EVENTS / SUBJECTS UI ====================== */
function renderEventsAndPills() {
  const el = document.getElementById('events-list');
  el.innerHTML = SC_EVENTS.map(ev => `
    <div class="event-card">
      <h3>${ev.name}</h3>
      <div class="event-meta">${ev.meta.map(m => `<span>${m}</span>`).join('')}</div>
      <p>${ev.summary}</p>
      <ul>${ev.notes.map(n => `<li>${n}</li>`).join('')}</ul>
    </div>`).join('');
  const pills = document.getElementById('subject-pills');
  pills.innerHTML = SC_SUBJECTS.map(s => `<li style="border-left:3px solid ${s.color}">${s.label}</li>`).join('');
}

/* ====================== STUDY GUIDE ====================== */
function renderStudy(filter) {
  const root = document.getElementById('study-content');
  const q = (filter || '').toLowerCase().trim();
  root.innerHTML = SC_STUDY.map(group => {
    const subj = SC_SUBJECTS.find(s => s.key === group.subject);
    const topics = group.topics.filter(t => {
      if (!q) return true;
      const hay = (t.title + ' ' + (t.body||'') + ' ' + (t.bullets||[]).join(' ') + ' ' + (t.kv||[]).flat().join(' ')).toLowerCase();
      return hay.includes(q);
    });
    if (!topics.length) return '';
    const done = topics.filter(t => store.topicsDone[t.id]).length;
    return `
      <div class="subject-block" data-key="${group.subject}">
        <div class="subject-head">
          <h2>${subj.label} <span class="chev">▸</span></h2>
          <span class="count">${done}/${topics.length} reviewed</span>
        </div>
        <div class="subject-body">
          ${topics.map(t => `
            <div class="topic">
              <h3>${t.title}
                <button class="topic-mark ${store.topicsDone[t.id] ? 'done' : ''}" data-topic="${t.id}">${store.topicsDone[t.id] ? '✓ Reviewed' : 'Mark reviewed'}</button>
              </h3>
              ${t.body ? `<p>${t.body}</p>` : ''}
              ${t.bullets ? `<ul>${t.bullets.map(b => `<li>${b}</li>`).join('')}</ul>` : ''}
              ${t.kv ? `<div class="kv">${t.kv.map(([k,v]) => `<div class="k">${k}</div><div>${v}</div>`).join('')}</div>` : ''}
            </div>`).join('')}
        </div>
      </div>`;
  }).join('') || '<p class="muted">No matches.</p>';

  root.querySelectorAll('.subject-head').forEach(h => {
    h.addEventListener('click', () => h.parentElement.classList.toggle('open'));
  });
  root.querySelectorAll('.topic-mark').forEach(b => {
    b.addEventListener('click', e => {
      e.stopPropagation();
      const id = b.dataset.topic;
      if (store.topicsDone[id]) delete store.topicsDone[id];
      else store.topicsDone[id] = true;
      saveStore();
      renderStudy(filter);
      renderDashboard();
    });
  });
  // open first by default
  const first = root.querySelector('.subject-block');
  if (first && !q) first.classList.add('open');
  // if filtering, open all
  if (q) root.querySelectorAll('.subject-block').forEach(b => b.classList.add('open'));
}
document.getElementById('study-search').addEventListener('input', e => renderStudy(e.target.value));

/* ====================== QUESTION BANK ====================== */
function populateSubjectSelects() {
  const subjOpts = SC_SUBJECTS.map(s => `<option value="${s.key}">${s.label}</option>`).join('');
  document.getElementById('qb-subject').innerHTML += subjOpts;
  document.getElementById('fc-subject').innerHTML += subjOpts;
}

function poolFor(subject, difficulty, mode) {
  if (mode === 'wrong') {
    const set = new Set(store.wrongQuestions);
    return SC_QUESTIONS.map((q, idx) => ({ ...q, idx })).filter(q => set.has(q.idx));
  }
  return SC_QUESTIONS.map((q, idx) => ({ ...q, idx })).filter(q => {
    if (subject !== 'all' && q.s !== subject) return false;
    if (difficulty !== 'all' && q.d !== difficulty) return false;
    return true;
  });
}
function updatePool() {
  const subj  = document.getElementById('qb-subject').value;
  const diff  = document.getElementById('qb-difficulty').value;
  const mode  = document.getElementById('qb-mode').value;
  const pool  = poolFor(subj, diff, mode);
  document.getElementById('qb-pool').textContent = `Pool: ${pool.length} question${pool.length === 1 ? '' : 's'}`;
}
['qb-subject','qb-difficulty','qb-mode'].forEach(id => document.getElementById(id).addEventListener('change', updatePool));

let quiz = null;

function startQuiz() {
  const subj  = document.getElementById('qb-subject').value;
  const diff  = document.getElementById('qb-difficulty').value;
  const mode  = document.getElementById('qb-mode').value;
  const count = parseInt(document.getElementById('qb-count').value, 10);
  let pool = poolFor(subj, diff, mode);
  if (!pool.length) { alert(mode === 'wrong' ? 'No wrong answers yet — try practice mode first.' : 'No questions match your filters.'); return; }
  // shuffle
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  if (count > 0 && pool.length > count) pool = pool.slice(0, count);
  quiz = { mode, idx: 0, questions: pool, answers: new Array(pool.length).fill(null) };
  document.getElementById('qb-results').classList.add('hidden');
  document.getElementById('qb-runner').classList.remove('hidden');
  renderQuestion();
}
function subjLabel(key) { return (SC_SUBJECTS.find(s => s.key === key) || {label: key}).label; }
function renderQuestion() {
  const runner = document.getElementById('qb-runner');
  const i = quiz.idx;
  const q = quiz.questions[i];
  const ans = quiz.answers[i];
  runner.innerHTML = `
    <div class="q-card">
      <div class="q-meta">
        <span class="pill">${i+1} / ${quiz.questions.length}</span>
        <span class="pill">${subjLabel(q.s)}</span>
        <span class="pill">${q.d}</span>
      </div>
      <div class="q-stem">${q.q}</div>
      <div class="q-options">
        ${q.o.map((opt, oi) => {
          let cls = 'q-option';
          if (ans !== null && quiz.mode === 'practice') {
            if (oi === q.a) cls += ' correct';
            if (ans === oi && ans !== q.a) cls += ' wrong';
            cls += ' disabled';
          } else if (ans !== null && ans === oi) {
            cls += ' correct';
          }
          return `<button class="${cls}" data-opt="${oi}"><span class="letter">${String.fromCharCode(65+oi)}.</span> <span>${opt}</span></button>`;
        }).join('')}
      </div>
      ${(ans !== null && quiz.mode === 'practice' && q.e) ? `<div class="q-explain"><b>${ans === q.a ? 'Correct.' : 'Incorrect.'}</b> ${q.e}</div>` : ''}
      <div class="q-nav">
        <button class="btn-ghost" id="q-prev" ${i === 0 ? 'disabled' : ''}>← Prev</button>
        <span class="q-progress">${ans === null ? 'Pick an answer' : (quiz.mode === 'practice' ? (ans === q.a ? '✓ Correct' : '✗ Incorrect') : 'Answer locked')}</span>
        <button class="btn-primary" id="q-next">${i === quiz.questions.length - 1 ? 'Finish' : 'Next →'}</button>
      </div>
    </div>`;
  runner.querySelectorAll('.q-option').forEach(btn => {
    btn.addEventListener('click', () => {
      if (quiz.answers[i] !== null && quiz.mode === 'practice') return;
      const oi = parseInt(btn.dataset.opt, 10);
      quiz.answers[i] = oi;
      const correct = oi === q.a;
      // bookkeeping: count each first answer once
      if (!q._counted) {
        store.attempts += 1;
        store.perSubject[q.s] = store.perSubject[q.s] || { attempts: 0, correct: 0 };
        store.perSubject[q.s].attempts += 1;
        if (correct) {
          store.correct += 1;
          store.perSubject[q.s].correct += 1;
          // remove from wrong list if present
          store.wrongQuestions = store.wrongQuestions.filter(x => x !== q.idx);
        } else {
          if (!store.wrongQuestions.includes(q.idx)) store.wrongQuestions.push(q.idx);
        }
        q._counted = true;
        bumpStreak();
        saveStore();
      }
      renderQuestion();
      renderDashboard();
    });
  });
  document.getElementById('q-prev').addEventListener('click', () => { if (quiz.idx > 0) { quiz.idx--; renderQuestion(); } });
  document.getElementById('q-next').addEventListener('click', () => {
    if (quiz.idx === quiz.questions.length - 1) finishQuiz();
    else { quiz.idx++; renderQuestion(); }
  });
}
function finishQuiz() {
  const wrong = [];
  let correct = 0;
  quiz.questions.forEach((q, i) => {
    if (quiz.answers[i] === q.a) correct++;
    else wrong.push({ q, picked: quiz.answers[i] });
  });
  const pct = quiz.questions.length === 0 ? 0 : Math.round(correct / quiz.questions.length * 100);
  const res = document.getElementById('qb-results');
  res.classList.remove('hidden');
  document.getElementById('qb-runner').classList.add('hidden');
  res.innerHTML = `
    <div class="panel">
      <h2>Quiz Complete</h2>
      <div class="results-grid">
        <div class="result-card"><div class="v">${correct}/${quiz.questions.length}</div><div class="l">Correct</div></div>
        <div class="result-card"><div class="v">${pct}%</div><div class="l">Accuracy</div></div>
        <div class="result-card"><div class="v">${wrong.length}</div><div class="l">To Review</div></div>
      </div>
      <div class="q-nav">
        <button class="btn-primary" id="q-again">Start Another</button>
        <button class="btn-ghost" id="q-wrong" ${wrong.length ? '' : 'disabled'}>Drill the ${wrong.length} I Missed</button>
      </div>
      ${wrong.length ? `
        <h3>Review</h3>
        <div class="review-list">
          ${wrong.map(w => `
            <div class="review-item">
              <div class="rq">${w.q.q}</div>
              <div class="ra ${w.picked === null ? '' : 'wrong'}">${w.picked === null ? 'No answer' : 'You picked: ' + String.fromCharCode(65 + w.picked) + '. ' + w.q.o[w.picked]}</div>
              <div class="ra correct">Correct: ${String.fromCharCode(65 + w.q.a)}. ${w.q.o[w.q.a]}</div>
              ${w.q.e ? `<div class="muted" style="margin-top:6px">${w.q.e}</div>` : ''}
            </div>`).join('')}
        </div>` : ''}
    </div>`;
  document.getElementById('q-again').addEventListener('click', () => { res.classList.add('hidden'); startQuiz(); });
  document.getElementById('q-wrong').addEventListener('click', () => {
    document.getElementById('qb-mode').value = 'wrong';
    document.getElementById('qb-count').value = '0';
    startQuiz();
  });
}
document.getElementById('qb-start').addEventListener('click', startQuiz);

/* ====================== FLASHCARDS ====================== */
let fcState = { deck: [], idx: 0 };
function fcKey(c) { return `${c.s}::${c.f}`; }
function buildDeck() {
  const subj = document.getElementById('fc-subject').value;
  const filter = document.getElementById('fc-filter').value;
  let deck = SC_FLASHCARDS.filter(c => subj === 'all' || c.s === subj);
  if (filter !== 'all') {
    deck = deck.filter(c => {
      const status = store.flashcards[fcKey(c)] || 'unseen';
      return status === filter;
    });
  }
  fcState.deck = deck;
  fcState.idx = 0;
}
function renderFlashcard() {
  const card = document.getElementById('flashcard');
  card.classList.remove('flipped');
  if (!fcState.deck.length) {
    document.getElementById('fc-front').textContent = 'No cards in this view.';
    document.getElementById('fc-back').textContent  = 'Try a different filter or shuffle the deck.';
    document.getElementById('fc-tag-front').textContent = '';
    document.getElementById('fc-tag-back').textContent  = '';
    document.getElementById('fc-progress').textContent = '0 / 0';
    return;
  }
  const c = fcState.deck[fcState.idx];
  document.getElementById('fc-front').textContent = c.f;
  document.getElementById('fc-back').textContent  = c.b;
  const status = store.flashcards[fcKey(c)] || 'unseen';
  const tag = `${subjLabel(c.s)} · ${status === 'known' ? '✓ known' : status === 'learning' ? '↻ learning' : 'unseen'}`;
  document.getElementById('fc-tag-front').textContent = tag;
  document.getElementById('fc-tag-back').textContent  = tag;
  document.getElementById('fc-progress').textContent = `${fcState.idx + 1} / ${fcState.deck.length}`;
}
function nextCard() { if (fcState.deck.length) { fcState.idx = (fcState.idx + 1) % fcState.deck.length; renderFlashcard(); } }
function prevCard() { if (fcState.deck.length) { fcState.idx = (fcState.idx - 1 + fcState.deck.length) % fcState.deck.length; renderFlashcard(); } }
function markCard(status) {
  if (!fcState.deck.length) return;
  const c = fcState.deck[fcState.idx];
  store.flashcards[fcKey(c)] = status;
  bumpStreak();
  saveStore();
  renderDashboard();
  nextCard();
}
document.getElementById('flashcard').addEventListener('click', () => document.getElementById('flashcard').classList.toggle('flipped'));
document.getElementById('fc-next').addEventListener('click', e => { e.stopPropagation(); nextCard(); });
document.getElementById('fc-prev').addEventListener('click', e => { e.stopPropagation(); prevCard(); });
document.getElementById('fc-known').addEventListener('click', e => { e.stopPropagation(); markCard('known'); });
document.getElementById('fc-learning').addEventListener('click', e => { e.stopPropagation(); markCard('learning'); });
document.getElementById('fc-shuffle').addEventListener('click', () => {
  for (let i = fcState.deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [fcState.deck[i], fcState.deck[j]] = [fcState.deck[j], fcState.deck[i]];
  }
  fcState.idx = 0;
  renderFlashcard();
});
document.getElementById('fc-reset').addEventListener('click', () => {
  if (!confirm('Reset all flashcard progress?')) return;
  store.flashcards = {};
  saveStore();
  buildDeck();
  renderFlashcard();
  renderDashboard();
});
document.getElementById('fc-subject').addEventListener('change', () => { buildDeck(); renderFlashcard(); });
document.getElementById('fc-filter').addEventListener('change', () => { buildDeck(); renderFlashcard(); });
document.addEventListener('keydown', e => {
  const active = document.querySelector('.view.active');
  if (!active || active.dataset.view !== 'flashcards') return;
  if (['INPUT','SELECT','TEXTAREA'].includes(document.activeElement.tagName)) return;
  if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); document.getElementById('flashcard').classList.toggle('flipped'); }
  else if (e.key === 'ArrowRight') nextCard();
  else if (e.key === 'ArrowLeft') prevCard();
  else if (e.key.toLowerCase() === 'k') markCard('known');
  else if (e.key.toLowerCase() === 'l') markCard('learning');
});

/* ====================== DEBATE + TACTICS ====================== */
function renderDeck(target, deck) {
  document.getElementById(target).innerHTML = deck.map(c => {
    let inner = '';
    if (c.body) inner += `<p>${c.body}</p>`;
    if (c.table) {
      inner += `<table class="role-table"><thead><tr><th>Role</th><th>Job</th></tr></thead><tbody>${c.table.map(r => `<tr><td><b>${r[0]}</b></td><td>${r[1]}</td></tr>`).join('')}</tbody></table>`;
    }
    if (c.list) {
      if (c.fmt === 'motions') inner += c.list.map(m => `<div class="motion">${m}</div>`).join('');
      else inner += `<ul>${c.list.map(li => `<li>${li}</li>`).join('')}</ul>`;
    }
    return `<div class="deck-card"><h2>${c.h}</h2>${inner}</div>`;
  }).join('');
}

/* ====================== DASHBOARD ====================== */
function renderDashboard() {
  const accuracy = store.attempts === 0 ? 0 : Math.round(store.correct / store.attempts * 100);
  document.getElementById('stat-attempts').textContent = store.attempts;
  document.getElementById('stat-correct').textContent  = store.correct;
  document.getElementById('stat-accuracy').textContent = accuracy + '%';
  const totalFC = SC_FLASHCARDS.length;
  const knownFC = Object.values(store.flashcards).filter(v => v === 'known').length;
  document.getElementById('stat-mastered').textContent = knownFC;
  document.getElementById('stat-total-fc').textContent = totalFC;
  document.getElementById('stat-streak').innerHTML     = `${store.streakDays}<span class="unit">d</span>`;
  document.getElementById('stat-last').textContent     = store.lastStudied || '—';

  // Countdown
  const dateInput = document.getElementById('event-date');
  if (store.eventDate) dateInput.value = store.eventDate;
  const cd = document.getElementById('stat-countdown');
  if (store.eventDate) {
    const t = new Date(store.eventDate + 'T00:00:00');
    const now = new Date(todayKey() + 'T00:00:00');
    const days = Math.round((t - now) / (1000*60*60*24));
    cd.textContent = days >= 0 ? days : 'past';
  } else {
    cd.textContent = '—';
  }

  // Per-subject progress
  const sp = document.getElementById('subject-progress');
  sp.innerHTML = SC_SUBJECTS.map(s => {
    const st = store.perSubject[s.key] || { attempts: 0, correct: 0 };
    const acc = st.attempts === 0 ? 0 : Math.round(st.correct / st.attempts * 100);
    return `<div class="subj-bar"><div class="subj-bar-head"><span style="border-left:3px solid ${s.color}; padding-left:8px">${s.label}</span><span>${st.attempts} attempts · ${acc}%</span></div><div class="subj-bar-track"><div class="subj-bar-fill" style="width:${acc}%"></div></div></div>`;
  }).join('');

  // Daily tip (deterministic by date)
  const seed = todayKey().split('-').join('') | 0;
  const tip = SC_TIPS[Math.abs(seed) % SC_TIPS.length];
  document.getElementById('daily-tip').textContent = tip;
}
document.getElementById('event-date').addEventListener('change', e => {
  store.eventDate = e.target.value || null;
  saveStore();
  renderDashboard();
});

/* ====================== RESET ====================== */
document.getElementById('resetProgress').addEventListener('click', () => {
  if (!confirm('Reset ALL progress — quiz scores, flashcards, topics, streak? This cannot be undone.')) return;
  store = defaultStore();
  saveStore();
  renderStudy();
  buildDeck(); renderFlashcard();
  renderDashboard();
});

/* ====================== INIT ====================== */
(function initOnce() {
  renderEventsAndPills();
  renderStudy();
  populateSubjectSelects();
  updatePool();
  buildDeck(); renderFlashcard();
  renderDeck('debate-content', SC_DEBATE);
  renderDeck('tactics-content', SC_TACTICS);
  renderDashboard();
})();
