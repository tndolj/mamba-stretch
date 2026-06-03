# 🐍 Mamba Stretch Routine

A Kobe-inspired mobility web app: a **dynamic warm-up** that builds from gentle to explosive, and a **static cooldown** for recovery. Single-file, zero-dependency, installable as a PWA, works offline.

## Features

- **Two routines** — dynamic pre-workout warm-up (10 moves) and static post-workout cooldown (7 stretches).
- **Tap-to-check progress** — per-move checklist with sticky progress meters; auto-resets each calendar day.
- **Per-card hold timers** — 30s countdown on cooldown stretches with audio + haptic cues.
- **Guided session player** — hands-free, full-screen flow with a timer ring, left/right side switching, 3-2-1 get-ready countdowns, and keyboard controls (`Space` play/pause, `←`/`→` skip, `Esc` exit).
- **Screen wake lock** — keeps the display on during a guided session.
- **PWA** — installable, offline-capable via service worker, custom mamba app icon.
- **Local persistence** — progress saved to `localStorage`, no backend.
- **Accessible** — `aria-checked` checkboxes, modal focus trap, reduced-motion support.

## Stack

Plain HTML + CSS + vanilla JS in a single `index.html`. No build step, no framework, no dependencies. Fonts: Google Fonts (Anton + Archivo).

## Run locally

It's a static file — open it or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

A static server (not `file://`) is needed for the service worker to register.

## Files

| File | Purpose |
|------|---------|
| `index.html` | The entire app — markup, styles, logic |
| `sw.js` | Service worker — offline caching (bump `CACHE` on asset changes) |
| `manifest.webmanifest` | PWA manifest |
| `icon.svg` | Source app icon (mamba mark) |
| `icon-192.png`, `icon-512.png` | PWA icons (any + maskable) |
| `apple-touch-icon.png` | iOS home-screen icon |
| `vercel.json` | Clean URLs config |

## Deploy

Static — deploys anywhere. Configured for [Vercel](https://vercel.com): import the repo, framework preset **Other**, no build command, output dir = root. Auto-deploys on push to `main` (HTTPS required for PWA install + service worker).

## Updating icons / assets

After changing any precached asset, bump the cache version in `sw.js` (`mamba-vN`) so installed clients refetch instead of serving stale files.

---

> *"Stretch. You better stretch."* — The Black Mamba

General guidance, not medical advice. Ease off anything that causes sharp pain.
