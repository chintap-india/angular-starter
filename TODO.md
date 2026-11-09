# Project TODOs & Upcoming Tasks

This document tracks upcoming developer tasks, maintenance errands, and migration steps for the **Chintap Angular Starter Kit**.

---

## Completed Tasks

### 1. Final Repository Migration to `chintap-india/angular-starter` (Completed: v1.2.0)
- **Target Repository URL**: [`https://github.com/chintap-india/angular-starter`](https://github.com/chintap-india/angular-starter)
- **Status**: Completed. All references, open-source metadata, clone commands, and tags migrated to the official `chintap-india` organization.
- **Git Execution Commands**:
  ```bash
  # Option A: Switch origin to the new repository and push main branch + tags
  git remote set-url origin https://github.com/chintap-india/angular-starter.git
  git push -u origin main
  git push origin --tags

  # Option B: Add a dedicated remote (if maintaining mirrors)
  git remote add chintap-india https://github.com/chintap-india/angular-starter.git
  git push -u chintap-india main
  ```
- **Codebase References to Update Atomically**:
  - [`package.json`](package.json): Update repository URL.
  - [`src/app/core/config/site.config.ts`](src/app/core/config/site.config.ts): Update `social.github` to `https://github.com/chintap-india/angular-starter`.
  - [`src/app/core/config/site.content.ts`](src/app/core/config/site.content.ts): Update CLI quickstart `git clone` snippet.
  - [`README.md`](README.md): Update clone URLs, badge links, and contribution links.
  - [`CONTRIBUTING.md`](CONTRIBUTING.md): Update fork and upstream clone instructions.

---

## Upcoming Infrastructure & Domain Setup

### 2. Custom Domain DNS Configuration
- **Current Live URL**: [`https://chintap-angular-starter.netlify.app/`](https://chintap-angular-starter.netlify.app/)
- **Final Target URL**: `https://chintap-angular-starter.chintap.com`
- **Action Items**:
  - Configure CNAME or DNS records on `chintap.com` domain registrar.
  - Add custom domain in Netlify dashboard (zero-cost free tier).
  - Update `baseUrl` in [`site.config.ts`](src/app/core/config/site.config.ts) once DNS propagates.
  - Verify automatic Let's Encrypt SSL certificate provisioning on Netlify.

---

## Ongoing Governance & Policies

### 3. Free-Tier Infrastructure Governance
- Prioritize zero-cost static hosting features (static CDN edge, basic forms within provider limits, free SSL).
- Avoid paid add-ons, subscriptions, or credit-card locked dependencies.
- Retain lightweight mock/local auth simulation for the Tasks module.
