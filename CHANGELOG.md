# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project strictly adheres to [Semantic Versioning 2.0.0](https://semver.org/spec/v2.0.0.html).

---

## 📌 Semantic Versioning Policy

Given a version number `MAJOR.MINOR.PATCH`, increment the:
- **`MAJOR`** version when making incompatible API changes or breaking architectural redesigns that require code refactoring.
- **`MINOR`** version when adding functionality in a backward-compatible manner (e.g., new pages, new CRUD modules, new pipes, or new configuration schemas).
- **`PATCH`** version when making backward-compatible bug fixes, UI/UX polish, styling corrections, or documentation updates.

## [1.2.0] - 2026-11-06

### Changed
- **Official Open-Source Organization Release**:
  - Migrated repository to official organization: [`https://github.com/chintap-india/angular-starter`](https://github.com/chintap-india/angular-starter).
  - Enhanced `package.json` with complete open-source manifest metadata (`repository`, `homepage`, `bugs`, `keywords`, `author`).
  - Added `@id: "${this.siteConfig.baseUrl}/#software"` and guaranteed root `@context: "https://schema.org"` in `SeoService.generateSoftwareAppSchema()` and `updateCustomStructuredData()`.
  - Synchronized `public/_headers` with CORS headers (`Access-Control-Allow-Origin: *`) for `/llms.txt`, `/llms-full.txt`, and `/.well-known/ard.json`.
  - Updated all clone and documentation commands across `README.md`, `site.content.ts`, and `CONTRIBUTING.md`.

## [1.1.6] - 2026-11-06

### Fixed
- **Hero Badge Pill Icon Vertical Centering**:
  - Resolved vertical misalignment of `<mat-icon>` glyphs inside uppercase tracking badge pills across Features, Best Practices, Tasks, and Home FAQ sections.
  - Added global `.hero-badge-pill` rule with `display: inline-flex; align-items: center; line-height: 1;` and optical cap-height centering `transform: translateY(-1px)`.
  - Wrapped pill label strings in `<span class="leading-none">`.

## [1.1.5] - 2026-11-05

### Removed
- **Legacy Agency Content Purge**:
  - Removed all obsolete agency-specific content, models, and JSON files (`what-we-do`, `how-we-work`, `explorations`, `building-teams`, `partners`, `customers`, `academy`).
  - Retained clean Starter Kit architectural pages (`/`, `/features`, `/best-practices`, `/tasks`, `/404`) plus permitted `/about` and `/contact`.
  - Updated `ContentService.PageKey` and `nextPathsMap` navigation flows.

## [1.1.4] - 2026-11-05

### Added
- **Open-Source Repository Health & GitHub Assets**:
  - Added official `LICENSE` (MIT License) with full attribution.
  - Added GitHub Actions Continuous Integration pipeline (`.github/workflows/ci.yml`) running Vitest unit tests and SSG builds on push/PR.
  - Added GitHub community health files: `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, and `SECURITY.md`.
  - Added GitHub issue templates (`bug_report.md`, `feature_request.md`), PR template (`pull_request_template.md`), and Dependabot configuration (`dependabot.yml`).
  - Added canonical content markdown files: `content/features.md`, `content/best-practices.md`, and `content/tasks.md`.
  - Added Live Demo badge pointing to `https://chintap-angular-starter.netlify.app/` in `README.md`.

### Fixed
- **Official Tech Stack Vector Marks**:
  - Replaced hand-drawn vector approximations with official, untouched brand assets directly from source registries.
  - Upgraded Angular logo to official Angular 22 gradient mark (`#E40035` to `#6C00F5`).
  - Upgraded Material Design to official Google Material Design mark with Material 3 `#6750A4` / `#D0BCFF` adaptive tokens.
  - Upgraded Tailwind CSS to official cyan gradient wave mark.
  - Upgraded Vitest to official green/cyan vector mark from the Vitest core repository.
  - Upgraded Netlify to official `#05BDBA` / `#014847` geometric mark.
  - Removed corrupt 404 placeholder file `angular-shield.svg`.

### Changed
- **Unified Branding - Dropped "Studio" Qualification**:
  - Dropped "Studio" qualification across all brand touchpoints in favor of pure **Chintap** branding.
  - Updated constellation satellite node `abt-c4` in `YouAreHereDialogComponent` from `04 Chintap Studio` to `04 Chintap`.
  - Updated `content/about.md` page title and description to remove studio references.
  - Refined partner collaboration description in `ContentService` to refer to independent builders and creators.
  - Updated `FRONTEND_APP_GUIDELINES.md`, `build-brand-assets.sh`, and SVG canvas comments to ensure 100% brand consistency.

## [1.1.3] - 2026-11-05

### Fixed
- **You Are Here Dialog Synchronized with Real Site Contents**:
  - Replaced legacy constellation nodes with the 6 authentic starter kit pages: Home (`/`), Features (`/features`), Best Practices (`/best-practices`), Tasks (`/tasks`), About (`/about`), and Contact (`/contact`).
  - Added 4 detailed child satellite nodes per page reflecting real page topics, tools, and best practices.
  - Symmetrically calibrated elliptical orbital geometry centered at $(450, 350)$ with outer radii $rx=300, ry=200$ (mobile $rx=240, ry=160$) eliminating label collisions.
  - Enhanced active route detection so that all routes (including `/best-practices` and `/tasks`) trigger the active beacon glow and "YOU ARE HERE" badge.
- **Relational Network Graphs Synchronized**:
  - Updated `NetworkGraphComponent` across Home, About, Contact, and added dedicated SVG diagrams for Features, Best Practices, and Tasks modes.
  - Replaced dead links with live, valid routes (`/features`, `/best-practices`, `/tasks`, `/about`, `/contact`).
  - Updated `NODE_DETAILS` and `GRAPH_METADATA_MAP` with modern Angular 22, 5 Pillars, and clean architecture explanations.
  - Expanded unit test suite to 102/102 passing tests.

## [1.1.2] - 2026-11-05

### Fixed
- **Favicon Padding & Canvas Visibility**:
  - Removed 42% excessive horizontal whitespace and 10% vertical dead space from `public/favicon.svg` by tightly cropping the vector viewport to `viewBox="190 30 620 940"`.
  - Maximized visual prominence in browser tabs (16x16, 32x32, 48x48) while preserving zero distortion and exact aspect ratio of the brand gesture.
  - Retained native `@media (prefers-color-scheme: dark)` theme adaptation in `favicon.svg` for white hand in dark mode and dark hand in light mode.
  - Regenerated multi-resolution `public/favicon.ico` (16x16, 32x32, 48x48 RGBA) and high-contrast `public/favicon.png` (64x64) with subtle contrast layer for clarity across both light and dark operating system tab bars.
  - Updated `public/apple-touch-icon.png` (180x180) and `public/images/apple-touch-icon-dark.png` to fill ~80% of canvas with safe-zone margins for iOS squircle rounding.
  - Synchronized `public/images/chintap-emblem-light.svg`, `chintap-emblem-dark.svg`, and `chintap-emblem.svg` with tight viewBoxes for enhanced clarity in header and footer logos.

---

## [1.1.1] - 2026-11-05

### Changed
- **Production URL Alignment**: Configured official production domain `https://chintap-angular-starter.netlify.app` across `site.config.ts`, `sitemap.xml`, `robots.txt`, `.well-known/ard.json`, `llms.txt`, and root `index.html`.
- **Netlify Edge Headers**: Added `Content-Type: text/plain; charset=utf-8` and CORS headers for `/llms.txt` and `/llms-full.txt` in `netlify.toml`.
- **Netlify Identity CSP**: Added `https://identity.netlify.com` to `script-src` and `connect-src` directives in `netlify.toml` for seamless auth widget compatibility.
- **Sitemap Coverage**: Added `/tasks` canonical entry to `sitemap.xml`.

---

## [1.1.0] - 2026-11-05

### Added
- **Tasks & Project Management Module (`/tasks`)**:
  - Full CRUD operations with pre-seeded onboarding setup tasks.
  - Angular 22 **Typed Reactive Forms** (`FormGroup`) with granular validation error feedback.
  - Standalone **`MarkdownPipe`** with XSS sanitization supporting headings, checklists (`- [x]`), inline code, fenced code blocks, blockquotes, and external links.
  - Dual-mode **Write / Live Preview** task description editor.
  - **`MockTaskApiService`** simulating asynchronous network latency with SSR-safe `localStorage` browser persistence.
  - **`AuthService`** with Netlify Identity hooks and instant Lead Developer vs. Guest role switching.
- **Zero-Hardcoding Content Architecture**:
  - Created `src/app/core/config/site.content.ts` with `SITE_CONTENT` injection token, completely decoupling all page headlines, hero badges, FAQ lists, and legal disclaimers from HTML templates.
- **Rebranding & Customization Handbook**:
  - Published [`CUSTOMIZATION_GUIDE.md`](CUSTOMIZATION_GUIDE.md) providing a clear 3-step rebrand workflow (Domain & Metadata, Content & Copy, Artwork Replacement) with zero HTML editing required.
- **Official 1:1 Vector Marks**:
  - Added pixel-perfect, 1:1 square SVGs for Angular, Tailwind CSS, Material Design, Vitest, Netlify, and TypeScript in `public/images/tech/`.
  - Added drop-in generic branding files `logo-light.svg`, `logo-dark.svg`, and `og-preview.jpg` in `public/images/`.
- **Trademark Notices & Legal Disclaimers**:
  - Added Nominative Fair Use disclaimers in the footer and `/features` page for all third-party marks.
- **Expanded Automated Test Suite**:
  - Grew unit test coverage from 75 tests to 101 tests across 15 suites (100% green).
- **Static Pre-Rendering (SSG)**:
  - Added `/tasks` to `src/routes.txt`, expanding statically pre-rendered routes from 6 to 7.

### Changed
- **Minimal Navigation**: Simplified top navbar to `Home`, `Features`, `Best Practices`, `About`, `Contact`, keeping technical jargon out of the primary menu.
- **Dynamic Versioning**: Added `version` property to `SiteConfig` (`1.1.0`), dynamically bound to the footer badge and Schema.org `SoftwareApplication` JSON-LD schema (`softwareVersion`).
- **Card Hover Effects**: Unified consistent hover lift (`card-hover`) across all cards throughout the application.

### Fixed
- **Logo Aspect-Ratio Distortion**: Eliminated logo squishing and letterboxing by enforcing uniform 1:1 square coordinates and `aspect-square object-contain` CSS.
- **FAQ Header Layout**: Resolved text-wrapping clipping in Angular Material expansion panel headers on smaller screens by transitioning category badges into vertical eyebrows.

---

## [1.0.0] - 2026-11-04

### Added
- **Initial Release of Chintap Angular Starter Kit**:
  - Angular 22 standalone architecture with reactive Signals, zoneless change detection, and inject-based DI.
  - Out-of-the-box implementation of the 5 Pillars of Discovery:
    - **SEO**: Dynamic `<title>`, OpenGraph cards, Twitter cards, dynamic canonical link resolution, strict 404 `noindex`.
    - **AEO**: Schema.org `@graph` injection, automated `FAQPage` JSON-LD generation for Google AI Overviews and Perplexity.
    - **LLMO**: Standardized `/llms.txt`, `/llms-full.txt`, and Agent Resource Discovery manifest (`/.well-known/ard.json`).
    - **GEO**: Schema.org `SoftwareApplication` and `Organization` with geographical coordinates and postal address.
    - **SSR / SSG**: Compile-time static site pre-rendering via `@angular/build:application` for 6 canonical routes.
  - Angular Material 3 and Tailwind CSS 4 styling engine with dark theme `@variant dark` support.
  - Zero-config Netlify deployment (`netlify.toml`) with security headers and clean routing.
