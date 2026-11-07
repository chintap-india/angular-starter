# Chintap Angular Starter Kit

> **Production-grade Angular 22 starter kit with out-of-the-box best practices for SEO, AEO, LLMO, GEO, and SSR/SSG.**

[![Version](https://img.shields.io/badge/version-1.5.0-10b981.svg?style=flat)](CHANGELOG.md)
[![Live Demo](https://img.shields.io/badge/Live_Demo-chintap--angular--starter.netlify.app-00dc82.svg?style=flat&logo=netlify)](https://chintap-angular-starter.netlify.app/)
[![Angular](https://img.shields.io/badge/Angular-22-dd0031.svg?style=flat&logo=angular)](https://angular.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8%2B-blue.svg?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38bdf8.svg?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![Material 3](https://img.shields.io/badge/Material_Design-M3-7c3aed.svg?style=flat&logo=google)](https://material.angular.io/)
[![SSG Prerender](https://img.shields.io/badge/SSG-Prerender_7_Routes-10b981.svg?style=flat)](https://angular.dev/guide/ssr)
[![Tests](https://img.shields.io/badge/Tests-124%2F124_Passing-brightgreen.svg?style=flat&logo=vitest)](https://vitest.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**Chintap Angular Starter** is a developer template for building modern, high-performance web applications that excel not just in traditional search engines, but in the emerging AI search and generative answer landscape.

🌐 **Live Demo:** [https://chintap-angular-starter.netlify.app](https://chintap-angular-starter.netlify.app/)

> [!TIP]
> **Rebranding with your own brand & domain?** Check out the [**🎨 Rebranding & Customization Guide**](CUSTOMIZATION_GUIDE.md) to customize brand identity, copy, logos, and deploy in 3 simple steps without touching HTML templates!

---

## 🏛️ The Five Foundational Pillars

| Pillar | Focus | What's Included Out of the Box |
|---|---|---|
| **SEO** | **Search Engine Optimization** | Dynamic `<title>`, meta descriptions, OpenGraph image cards, Twitter cards, dynamic canonical link headers, robust 404 `noindex` management, `robots.txt`, and XML sitemaps. |
| **AEO** | **Answer Engine Optimization** | Schema.org `@graph` JSON-LD generation, automated `FAQPage` schema injection for Google AI Overviews, Perplexity, and Bing Copilot, plus structured semantic content blocks. |
| **LLMO** | **Large Language Model Optimization** | Standardized `/llms.txt` and `/llms-full.txt` (conforming to [llmstxt.org](https://llmstxt.org)), Agent Resource Discovery manifest (`/.well-known/ard.json`) for autonomous AI agents, scrapers, and RAG pipelines. |
| **GEO** | **Generative Engine Optimization** | Rich `SoftwareApplication`, `Organization`, geographical coordinates (`latitude`/`longitude`), postal address, author credentials, and entity knowledge graph for LLM citation algorithms. |
| **SSR / SSG** | **Static Site Generation & Pre-rendering** | Angular 22 Application Builder (`@angular/build:application`), pre-rendering all static routes at compile time (`src/routes.txt`), sub-100ms First Contentful Paint (FCP), zero cumulative layout shifts. |

---

## 🚀 Quick Start

### 1. Clone & Install

```bash
# Clone the repository
git clone https://github.com/chintap-india/angular-starter.git my-app
cd my-app

# Install dependencies
npm install
```

### 2. Run Locally

```bash
# Start development server
npm start
```
Open [http://localhost:4200](http://localhost:4200) in your browser.

### 3. Run Unit Tests

```bash
# Run unit test suite (124 tests across 17 suites)
npm test

# Or run tests directly with Vitest
npm run test:run
```

### 4. Build for Production (SSG)

```bash
# Compile and pre-render all static routes
npm run build
```
The output is written to `dist/chintap-angular-starter/browser/` with all pre-rendered HTML files (`index.html`, `features/index.html`, `best-practices/index.html`, `tasks/index.html`, `about/index.html`, `contact/index.html`, `404.html`), ready for static hosting.

---

## ⚙️ Centralized Configuration (`site.config.ts`)

Instead of hunting through dozens of HTML files and components to change brand names, URLs, and social links, everything is governed by a single configuration file:

📁 **`src/app/core/config/site.config.ts`**

```typescript
export const DEFAULT_SITE_CONFIG: SiteConfig = {
  name: 'My Cool App',
  shortName: 'CoolApp',
  tagline: 'Supercharge Your Web Experience',
  description: 'Enterprise web app with AI-ready optimization.',
  baseUrl: 'https://mycoolapp.com',
  defaultOgImage: 'https://mycoolapp.com/images/og-preview.jpg',
  locale: 'en_US',
  themeColor: '#0f172a',
  brand: {
    logoLight: '/images/logo-light.svg',
    logoDark: '/images/logo-dark.svg',
    logoAlt: 'Brand Logo',
    favicon: '/favicon.ico',
    ogImage: '/images/og-preview.jpg',
  },
  author: {
    name: 'Your Name',
    url: 'https://github.com/yourhandle',
    email: 'hello@mycoolapp.com',
  },
  organization: {
    name: 'My Organization',
    legalName: 'My Organization Inc.',
    url: 'https://mycoolapp.com',
    logo: 'https://mycoolapp.com/images/logo-light.svg',
    email: 'contact@mycoolapp.com',
    address: {
      streetAddress: '123 Tech Lane',
      addressLocality: 'San Francisco',
      addressRegion: 'CA',
      postalCode: '94105',
      addressCountry: 'US',
    },
    geo: {
      latitude: 37.7749,
      longitude: -122.4194,
    },
  },
  social: {
    github: 'https://github.com/yourhandle/my-app',
    twitter: 'https://x.com/yourhandle',
  },
  ai: {
    llmsTxtUrl: '/llms.txt',
    llmsFullTxtUrl: '/llms-full.txt',
    ardManifestUrl: '/.well-known/ard.json',
  },
  features: {
    seo: true,
    aeo: true,
    llmo: true,
    geo: true,
    ssr: true,
    darkTheme: true,
  },
};
```

---

## 📝 Decoupled Content & Copy (`site.content.ts`)

To ensure **zero HTML hardcoding**, all UI headlines, hero badges, FAQ lists, feature matrix details, and legal disclaimers live in:

📁 **`src/app/core/config/site.content.ts`**

- **Navigation**: Customizable links and call-to-action buttons.
- **Home**: Hero badge, split headline, CTAs, 5-Pillar cards, and interactive FAQs (which automatically populate the Schema.org `FAQPage` JSON-LD schema!).
- **Features & Stack**: Official framework badges, doc links, and trademark notices.
- **Footer**: Brand columns, copyright notice, and nominative fair use disclaimers.

```typescript
import { Component, inject } from '@angular/core';
import { SITE_CONTENT } from '../../core/config/site.content';

@Component({ ... })
export class MyFeatureComponent {
  readonly content = inject(SITE_CONTENT);
}
```

---

## 📋 Built-In Tasks & Forms Module (`/tasks`)

Explore modern enterprise Angular 22 form engineering and data management at `/tasks`:
- **`chintap-compact-template`**: Enterprise compact data architecture featuring a balanced two-tier navigation toolbar, tucked top-bar pagination (rows-per-page selector + step navigation controller), row focus depth effects with peripheral dimming, sortable headers, dual Table/Cards list switching, and zero vertical viewport scrolling.
- **Typed Reactive Forms**: Type-safe `FormGroup` validation with granular error messaging.
- **Dual-Mode Markdown Editor**: Write task descriptions using GitHub-Flavored Markdown and toggle between Write and Preview modes.
- **SSR-Safe Persistence**: Automatic synchronization with `localStorage` in browser mode with safe hydration on the server.
- **Mock API Service**: `MockTaskApiService` simulates asynchronous latency and can easily be replaced with a real REST or GraphQL endpoint.
- **Netlify Identity & Local Auth**: `AuthService` supporting Netlify Identity and instantaneous Lead Developer vs. Guest role testing.

---

## 🤖 Machine-Readable AI Endpoints

This starter kit comes pre-configured with endpoints designed specifically for AI search engines, agents, and scrapers:

| File | Path | Purpose |
|---|---|---|
| **`llms.txt`** | `/llms.txt` | Concise markdown summary of the application, architecture, and primary links per the [llmstxt.org](https://llmstxt.org) standard. |
| **`llms-full.txt`** | `/llms-full.txt` | Deep-dive technical and architectural reference for RAG indexing and LLM context loading. |
| **`ard.json`** | `/.well-known/ard.json` | Agent Resource Discovery specification detailing capabilities, endpoints, and machine interfaces. |
| **`robots.txt`** | `/robots.txt` | Crawl rules referencing sitemap, `llms.txt`, and ARD manifests. |
| **`sitemap.xml`** | `/sitemap.xml` | XML sitemap covering all canonical routes with priority and change frequency indicators. |

---

## 🛠️ Tech Stack & Architecture

- **Angular 22**: Standalone components, reactive Signals, zoneless change detection, inject-based DI.
- **Application Builder (`@angular/build:application`)**: Ultra-fast esbuild bundler with static pre-rendering.
- **Angular Material 3**: Beautiful, accessible, theme-aware components (`MatExpansionModule`, `MatButtonModule`, `MatIconModule`, `MatDialogModule`, `MatSnackBarModule`).
- **Tailwind CSS 4**: Modern CSS-first engine with dark theme `@variant dark` support.
- **Angular Unit Testing**: Fast unit tests with 100% pass guarantee.
- **Netlify Ready**: Zero-config deployment with `netlify.toml` pre-configured for clean URLs and header security.

---

## 📁 Directory Structure

```
chintap-angular-starter/
├── CUSTOMIZATION_GUIDE.md            # Step-by-step 3-step rebrand handbook
├── public/
│   ├── .well-known/ard.json          # Agent Resource Discovery manifest
│   ├── images/                       # Drop-in logos (logo-light.svg, logo-dark.svg, og-preview.jpg)
│   │   └── tech/                     # 1:1 Square official stack logos (Angular, Tailwind, etc.)
│   ├── llms.txt                      # LLM-readable summary
│   ├── llms-full.txt                 # Detailed LLM architectural guide
│   ├── robots.txt                    # Search & AI crawler directives
│   └── sitemap.xml                   # XML sitemap
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── config/
│   │   │   │   ├── site.config.ts    # Centralized branding & config
│   │   │   │   └── site.content.ts   # Decoupled UI copy & page content
│   │   │   ├── models/               # Domain models & DTOs
│   │   │   └── services/
│   │   │       ├── auth.service.ts   # Netlify Identity & mock auth signals
│   │   │       ├── mock-task-api.ts  # SSR-safe tasks CRUD service
│   │   │       ├── seo.service.ts    # SEO/AEO/GEO schema injection engine
│   │   │       └── theme.service.ts  # Light/Dark mode reactive signal
│   │   ├── pages/
│   │   │   ├── home/                 # Starter hero, 5-Pillar matrix & FAQ
│   │   │   ├── features/             # Tech stack, official logos & disclaimers
│   │   │   ├── best-practices/       # Developer handbook with copyable code
│   │   │   ├── about/                # About page
│   │   │   ├── contact/              # Interactive contact form
│   │   │   ├── tasks/                # Tasks CRUD module with Markdown preview
│   │   │   └── not-found/            # Accessible 404 with dinosaur Easter egg
│   │   ├── shared/
│   │   │   ├── components/           # Navbar, Footer, TechLogo, Graph components
│   │   │   └── pipes/                # Sanitized Markdown-to-HTML parser pipe
│   │   └── app.routes.ts             # Route definitions & pre-render list
│   ├── routes.txt                    # Routes to statically pre-render at build (7 routes)
│   └── index.html                    # Root HTML with baseline JSON-LD
├── angular.json                      # Build & SSG options
├── netlify.toml                      # Netlify edge deployment configuration
├── package.json                      # Dependencies & NPM scripts
└── tsconfig.json                     # TypeScript configuration
```

---

## 🚢 Deployment

### Netlify
Push your repo to GitHub and import it on Netlify. The included `netlify.toml` handles the rest:
- **Build command**: `npm run build`
- **Publish directory**: `dist/chintap-angular-starter/browser`
- Includes custom HTTP security headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`) and SPA fallback redirects.

### Any Static Host (Vercel, Cloudflare Pages, GitHub Pages, S3)
Upload the contents of `dist/chintap-angular-starter/browser/` directly to any static file server or CDN.

### 💸 Free-Tier Friendly Architecture
This starter kit is architected for zero-cost operation on standard static web hosts (such as Netlify, Cloudflare Pages, GitHub Pages, or Vercel):
- **Pure Static Output**: Generates pre-rendered HTML/CSS/JS ready for any CDN without requiring a paid server runtime.
- **Local-First Authentication**: In-browser session state via `localStorage` by default; optional hook for third-party identity providers.
- **Client-Side Form Handling**: Contact and task forms feature native client-side validation, ready to connect to any free webhook, form endpoint, or headless backend.
- **Zero Paid Dependencies**: Requires no proprietary paid APIs, analytics trackers, or paid database subscriptions to run out of the box.

---

## 🤝 Community & Contributing

Contributions, issues, and feature requests are warmly welcome!
- 📖 [Contributing Guidelines](CONTRIBUTING.md)
- 📜 [Code of Conduct](CODE_OF_CONDUCT.md)
- 🔒 [Security Policy](SECURITY.md)
- 📋 [Changelog](CHANGELOG.md)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE). Free to use for personal, commercial, and open-source projects.
