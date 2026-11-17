---
title: Strict semantic versioning on all feature additions and changes
author: Bharathchetty
date: 2026-11-17
branch: main
id: l-6d5a6791
scope: repo
status: active
src: agent
touches:
  - ".github/workflows/ci.yml"
  - CHANGELOG.md
  - README.md
  - package.json
  - src/app/core/config/site.config.ts
  - src/app/core/config/site.content.ts
---

## Decided
- Strictly adhere to Semantic Versioning (SemVer 2.0.0) across the codebase.
- When new features, capabilities, or integrations are added, bump the MINOR version (or PATCH for fixes).
- Synchronize version bumps across package.json, src/app/core/config/site.config.ts, src/app/core/config/site.content.ts, README.md badge, and CHANGELOG.md.

## Tried and ruled out
- Keeping version numbers static when adding features or configurations: causes untracked feature drift.

## Watch out
- Ensure package.json and site.config.ts versions remain strictly identical.
- Always document the added or changed features in CHANGELOG.md under Keep a Changelog format.
