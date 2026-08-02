# CLAUDE.md

Guidance for AI assistants working in this repo. Keep it current when the structure or conventions change.

## What this project is

Single-page **Scholar's Cup Prep Dashboard** — a static web app for prepping the World Scholar's Cup regional round (Thailand). It is a study tool with seven views (Dashboard, About, Study Guide, Question Bank, Flashcards, Debate, Tactics). All user progress lives in `localStorage`; there is no backend.

## Stack and how it runs

- **Pure static site.** Plain HTML + CSS + vanilla JavaScript. No bundler, no framework, no `package.json`, no dependencies, no build step.
- **External resources:** Google Fonts (Inter + Fraunces) loaded from CDN in `index.html`.
- **Run locally:** open `index.html` directly, or serve the folder with any static server, e.g. `python3 -m http.server 8000` then visit `http://localhost:8000/`.
- **No tests, no linter, no CI config.** Treat the browser as the test harness — load `index.html` and click through each tab after meaningful changes.

## File layout

```
index.html              Markup for all 7 views (only one .view is .active at a time)
css/style.css           Single stylesheet; dark theme via CSS custom properties on :root
js/data-questions.js    SC_QUESTIONS — the multiple-choice bank (~500 items)
js/data-flashcards.js   SC_FLASHCARDS — front/back study cards (~290 items)
js/data-content.js      SC_SUBJECTS, SC_EVENTS, SC_STUDY, SC_DEBATE, SC_TACTICS, SC_TIPS
js/app.js               All app logic: routing, rendering, quiz engine, flashcards, persistence
```

Scripts are loaded in this order at the bottom of `index.html`: `data-questions.js → data-flashcards.js → data-content.js → app.js`. `app.js` assumes every `SC_*` global already exists.

## Global data contracts

All data modules attach a global to `window`. `app.js` references them by bare name (e.g. `SC_QUESTIONS`). When adding entries, match the existing schema exactly — there is no runtime validation.

**Subject keys** (used as the `s` field everywhere — questions, flashcards, study groups, dashboard stats):
`science | social | art | literature | special | history`

Defined in `SC_SUBJECTS` (`js/data-content.js:2`). Each entry: `{ key, label, color }`. Adding a new subject requires updating every data file plus the dashboard rendering — prefer extending existing subjects.

**Schemas:**

| Global | Shape | Notes |
|---|---|---|
| `SC_SUBJECTS` | `{ key, label, color }` | `color` is a CSS hex used in accent bars and pills |
| `SC_QUESTIONS` | `{ s, d, q, o:[5], a, e }` | `d` = `'easy' \| 'medium' \| 'hard'`; `o` must have **exactly 5** options; `a` is the 0-based correct index; `e` is the explanation shown in practice mode |
| `SC_FLASHCARDS` | `{ s, f, b }` | `f` front, `b` back. Identity for progress is `` `${s}::${f}` `` (`js/app.js:310`) — changing `s` or `f` resets that card's known/learning state |
| `SC_STUDY` | `[{ subject, topics: [{ id, title, body?, bullets?, kv? }] }]` | `id` must be unique across all topics (used as the key in `store.topicsDone`); `kv` is an array of `[key, value]` pairs |
| `SC_EVENTS` | `{ name, summary, meta:[], notes:[] }` | Rendered on the About tab |
| `SC_DEBATE`, `SC_TACTICS` | `{ h, body?, table?, list?, fmt? }` | "Deck card" shape used by `renderDeck()`. `table` rows are `[role, job]` pairs; `fmt: 'motions'` renders each `list` item as a styled motion box |
| `SC_TIPS` | `string[]` | Dashboard picks one deterministically per day |

## App architecture (`js/app.js`)

- **Persistence:** Everything goes through a single object `store` saved to `localStorage` under key `'sc-dashboard-v1'`. Shape comes from `defaultStore()` (`js/app.js:16`). Read via `loadStore()`, write via `saveStore()`. When adding a new persisted field, also add it to `defaultStore()` — `loadStore()` merges defaults over the parsed payload so older browsers still work.
- **Routing:** Tab buttons in the topbar swap `.active` between `<section class="view">` blocks. `goTo(name)` is the only navigation primitive. Quick-start buttons use `data-go` (and optional `data-mode`) attributes to jump into a preconfigured quiz.
- **Quiz engine:** `startQuiz()` builds a `quiz = { mode, idx, questions, answers }` object held in a module-scoped `let`. `q._counted` is mutated on the in-memory question to ensure each question only updates `store.attempts` / `store.correct` / `store.wrongQuestions` once per session. Practice mode shows feedback immediately and locks the answer; Exam mode defers feedback to the results screen; Wrong mode pulls only from `store.wrongQuestions`.
- **Flashcards:** `fcState = { deck, idx }`. `buildDeck()` re-filters by subject and status whenever a control changes. Keyboard shortcuts inside the flashcards view: Space/Enter flips, Left/Right navigates, `k` marks known, `l` marks learning.
- **Streak:** `bumpStreak()` is called whenever a question is answered or a flashcard is marked. It compares `store.lastStudied` to today's `YYYY-MM-DD` and either keeps, increments, or resets the streak.
- **Initialization:** The IIFE at the bottom of `js/app.js` (around `js/app.js:461`) calls each renderer once. If you add a new view, wire its initial render there.

## Conventions when editing

- **No build step.** Edits land live on next page load. There is no transpilation, so stick to syntax that ships in evergreen browsers (the codebase already uses optional chaining, template literals, arrow functions, spread).
- **Rendering pattern.** Views are re-rendered by recomposing `innerHTML` from template literals, then re-binding event listeners on the newly created nodes. Follow this pattern — don't introduce a framework or virtual DOM. When mutating state, call the corresponding `render*()` function and `saveStore()`.
- **No globals beyond the `SC_*` data and the module-local `store`, `quiz`, `fcState`.** Don't introduce more globals.
- **Subject color comes from `SC_SUBJECTS`.** Don't hard-code per-subject colors in CSS; read from the data entry.
- **Question option count is fixed at 5.** The renderer in `js/app.js:212` assumes five options and labels them A–E. Don't add questions with fewer or more options without updating the renderer.
- **Adding study topics:** give each topic a stable, unique `id` (existing convention: short prefix like `s-`, `h-`, `lit-` followed by a slug). Changing an existing `id` orphans any user's "reviewed" mark for it.
- **Style tokens:** the dark theme is driven by CSS variables on `:root` in `css/style.css`. Prefer adding/using a token over hard-coding a hex value.

## Git workflow

- Active development branch for this task: `claude/claude-md-docs-ryhOH`. The repository instructions specify pushing only to the branch designated for the current task.
- Push with `git push -u origin <branch>` and open a draft PR after pushing if one does not already exist.
- Only repo in scope for GitHub MCP tools: `mayank201181/scholarscupclaude`.

## Common change recipes

- **Add a question:** append to `SC_QUESTIONS` in `js/data-questions.js` using the schema above. No other file needs to change.
- **Add a flashcard:** append to `SC_FLASHCARDS` in `js/data-flashcards.js`. Use a `f` that's unique within the subject if you want progress tracked independently.
- **Add a study topic:** add to the matching subject group in `SC_STUDY` in `js/data-content.js`. Pick a fresh `id`.
- **Add a dashboard stat:** add the field to `defaultStore()`, update the write path, then render it in `renderDashboard()` (`js/app.js:406`) — and add a matching `<div class="stat-card">` in `index.html`.
- **Reset behavior:** the "Reset" button in the topbar wipes `store` back to defaults; the per-section reset (e.g. flashcards) wipes only that slice. Keep these in sync if you add new persisted state.
