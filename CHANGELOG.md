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
