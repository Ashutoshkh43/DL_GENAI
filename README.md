# BSDA2001 — Deep Learning and Generative AI Notes

A Vue 3 study-notes website built with Vue CLI. It retains the existing Week 1–4 notes and adds matching Week 5–12 pages using the supplied lecture-slide and live-coding archives. Every week has a Questions and Solutions section. Week 1 includes the supplied Graded Assignment 1 solution sheet and the 42-question mock set with worked explanations.

## Run locally

```sh
npm install
npm run serve
```

Create a production build with `npm run build`; Vue CLI writes it to `dist/`. MathJax is loaded from a CDN for equations, so an internet connection is needed to render mathematical notation.

## Deploy

The app uses Vue Router history URLs (`/`, `/week1`, …, `/week12`). Configure the web host to serve `index.html` for unknown paths so direct links and refreshes on weekly pages work. For GitHub Pages, use a deployment setup that provides SPA route fallback or switch to hash routing.

## Assessment practice and accuracy labels

- Week 1 includes the user-supplied graded assignment and mock set, with answers independently worked through for study.
- Questions in Weeks 2–12 are original practice questions written from the supplied course materials. They are **not** represented as official graded-assignment questions.
- The site links to QuizPractice and the publicly listed DL/GenAI question-paper collection for additional practice. These external questions may require sign-in and should be attempted on their source site.
- Past-paper patterns are useful for practice, but they do not guarantee the contents of future quizzes or End Term exams.
- See `SOURCE_INVENTORY.md` for a summary of the source materials mapped to the weeks.

## Important note

The supplied archives use the sequence Week 5 optimization, Week 6 GANs, Weeks 7–8 RNN/LSTM, Weeks 9–10 attention/Transformers, and Weeks 11–12 diffusion/modern GenAI. The new pages follow the topic labels and resources in those archives. Always prioritize any updated instructions from the current course team.
