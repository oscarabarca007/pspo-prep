# PSPO Prep

An installable study app (PWA) for the Scrum.org **Professional Scrum Product Owner I (PSPO I)** certification.

**Live app:** https://oscarabarca007.github.io/pspo-prep/

## Features

- **Study syllabus** – 8 topics with learning objectives, key concepts, exam traps and links to official sources, plus a 2-week study plan.
- **124 exam-level questions** – single choice, multiple answer and true/false, written in the style of the real assessment and based on the 2020 Scrum Guide and the Evidence-Based Management Guide.
- **Practice mode** – filter by topic, unanswered or past mistakes; every wrong answer is explained.
- **Exam simulation** – 80 random questions, 60-minute timer, 85% pass mark, flag/overview grid and full review afterwards.
- **Progress tracking** – mastery per topic, mistakes bank and exam history, stored locally on the device.
- **Material Design 3** look with light/dark themes; works offline once installed.

## Install on your device

- **Android / Chrome / Edge:** open the live app and tap **Install** in the top bar (or browser menu → *Install app*).
- **iPhone / iPad (Safari):** Share → **Add to Home Screen**.

## Run locally

It is a static site with no build step. Serve the folder with any static server, for example:

```bash
npx http-server . -p 8080
```

## Project structure

```
index.html            App shell
css/app.css           Material Design 3 tokens and components
js/app.js             Router, views, quiz engine, storage
data/syllabus.js      Syllabus content and exam facts
data/questions-*.js   Question bank
sw.js                 Service worker (offline cache)
manifest.webmanifest  PWA manifest
```

When you change any file, bump `VERSION` in `sw.js` so installed apps pick up the update.

*Independent study aid. Not affiliated with or endorsed by Scrum.org.*
