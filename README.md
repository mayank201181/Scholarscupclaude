# Scholar's Cup Prep — Bangkok 2026

A study dashboard for the World Scholar's Cup Global Round in Bangkok (August 2026),
built around the official 2026 theme **"Are We There Yet?"**.

## Features

- **Topic Quizzes** — the 15 official guiding sections of the 2026 curriculum, each with
  its own bank of ~75 multiple-choice questions and study notes. Take a 25-question quiz
  on any topic; every "New Quiz" serves questions you haven't seen before (seen-question
  history is tracked per topic, and old questions only recycle once a bank is exhausted).
- **Question Bank** — 500+ general Scholar's Challenge-style questions across the six
  subjects, with practice/exam modes and wrong-answer drilling.
- **Flashcards** — spaced review with known/learning tracking.
- **Study Guide, Debate & Tactics** — exam-focused notes and event playbooks.
- **Dashboard** — streaks, accuracy per subject, countdown to the round.

All progress is stored in the browser (localStorage) — no accounts needed.

## Running locally

It's a static site — open `index.html`, or serve the folder:

```
python3 -m http.server 8000
```

## Official resources

- [World Scholar's Cup](https://www.scholarscup.org) — the official curriculum is the
  single source of truth; always cross-check with the latest Guiding Questions document.
- [WSC Beijing Alpacas](https://www.wscbeijingalpacas.com) — community study resources.
