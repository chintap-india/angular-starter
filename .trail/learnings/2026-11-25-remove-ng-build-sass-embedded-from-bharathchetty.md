---
title: Remove NG_BUILD_SASS_EMBEDDED from npm scripts
author: Bharathchetty
date: 2026-11-25
branch: main
id: l-1fb4b3b6
scope: repo
status: active
src: agent
touches:
  - ".github/workflows/ci.yml"
  - FRONTEND_APP_GUIDELINES.md
  - README.md
  - package.json
---

## Decided
Keep `package.json` scripts standard and cross-platform (`ng serve`, `ng build`, `ng test`) without prefixing `NG_BUILD_SASS_EMBEDDED=false`. Document `NG_BUILD_SASS_EMBEDDED=false` in `README.md` and `FRONTEND_APP_GUIDELINES.md` as an optional fallback for legacy operating systems (e.g. macOS Monterey/Ventura or legacy Linux).

## Tried and ruled out
Hardcoding `NG_BUILD_SASS_EMBEDDED=false` in `package.json` scripts. This broke native Windows command prompt/PowerShell (inline POSIX env assignments fail) and unnecessarily degraded Sass compilation speeds on modern Apple Silicon Macs and modern Linux distros where native `sass-embedded` works natively.

## Watch out
If a user or legacy CI container runs on macOS older than Sonoma or an outdated Linux container with an old glibc, `sass-embedded` may fail with minimum OS version errors. They can export `NG_BUILD_SASS_EMBEDDED=false` in their shell without modifying the repo.
