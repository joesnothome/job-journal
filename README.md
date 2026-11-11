# Job Journal

A local-first project checklist, time tracker and photo journal. No account, backend, analytics or remote photo uploads. Apple-style blue interface with System / Light / Dark appearance.

## Deploy to Cloudflare Pages

Connect this GitHub repository in Cloudflare Pages, then use:

- Production branch: `main`
- Framework preset: None
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: repository root (leave blank)
- Node.js: 22 or later

Enable automatic production deployments for `main`. Pushing to GitHub then triggers Cloudflare's build. This repository does not contain Cloudflare credentials and cannot create that account-level connection itself.

## Develop and verify

No package dependencies or install step are needed.

```sh
npm test
npm run build
```

Serve `dist` with a static HTTP server. Browser storage and service workers need HTTPS or localhost; do not open `index.html` as a file URL.

## Features

- Multiple named projects, optional descriptions, editable tasks and notes.
- One-time Getting started project with three instructional tasks. Created only when a fresh database is first initialized; completing/deleting tasks does not recreate them. User projects are empty initially. No real user project data is included.
- Start / Pause / Finish / Resume; one running timer across all projects. Timers use timestamps and survive refresh, sleep and app closure. Leaving a task running counts time until paused. Adjust time for forgotten timers.
- Finished tasks remain visible with time. Reset time and deletion require confirmation.
- Before / During / After photos, multiple per category, captions, camera and picker controls. Images resized to a maximum 1600px edge and compressed to JPEG; originals are not modified. Direct camera captures are not guaranteed to save to the device's photo library.
- Project report with all tasks, status, time, notes and photos. Export report opens the browser print dialog; use Save as PDF or the platform print/share workflow. This is not a direct PDF download.
- Download/restore complete JSON backups, including photos. Backup snapshots pause timers in the exported copy without interrupting live timers. Restore validates the file and requires confirmation before replacing existing data.
- IndexedDB persistence, serialized writes, cross-tab refresh and Web Locks where supported.
- Home Screen manifest, app icons and offline service worker. Open once online before offline use. Build-generated cache versions prevent stale files on future releases; close all open app windows and reopen to activate a waiting update.

## Storage limitations

Projects and photos belong to this origin on this browser/device. Clearing website data, device loss or browser storage eviction can erase them. Private browsing is not suitable for persistent projects. Home Screen and normal browser storage may differ. Back up regularly. Nothing syncs automatically between devices. Backups are unencrypted and may contain private notes and photos.

## Future iOS app

The app is dependency-free ES modules. `src/model.js` owns timer/domain logic, `src/storage.js` owns persistence, and `src/photos.js` owns image processing. UI and exports are in `src/app.js`. These seams let a future Capacitor shell reuse the app and substitute native storage, camera and sharing adapters. A future native app needs explicit backup import/migration; it does not automatically inherit Safari's database. Native packaging, Xcode signing, device tests and App Store submission are not part of this web release.

## Verification

Automated tests cover accumulated time, cross-project timer switching, serialized running timers, reset behavior, backup validation and long-duration formatting. Desktop Chromium browser checks covered project/task creation, notes, light/dark modes, persisted task completion, a photo attachment, and backup download. Physical iPhone Home Screen/offline behavior, camera capture and print-to-PDF still need device checks.
