# BSDA2001 — Deep Learning and Generative AI Notes

A Vue 3 study-notes website built with Vue CLI. It contains an introduction and separate pages for Weeks 1–4. The original lesson text, examples, links, tables, and page layouts have been carried over into Vue components.

## Run locally

```sh
npm install
npm run serve
```

Create a production build with `npm run build`; Vue CLI writes it to `dist/`. MathJax is loaded from a CDN for equations, so an internet connection is needed to render mathematical notation.

## Deploy

The app uses Vue Router history URLs (`/`, `/week1`, …). Configure the web host to serve `index.html` for unknown paths so direct links and refreshes on weekly pages work. For GitHub Pages, use a deployment setup that provides SPA route fallback or switch to hash routing.

## Course source notes

The pages have been expanded using the uploaded lecture slide and live-coding archives. They explain and extend the supplied materials rather than transcribing them word-for-word. The Week 4 practice questions are additional revision questions, not claimed to be official graded-assignment questions. See `SOURCE_INVENTORY.md` for the materials used.
