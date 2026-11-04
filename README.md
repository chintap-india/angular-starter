# Chintap Angular Starter Kit

> **Production-grade Angular 22 starter kit with out-of-the-box best practices for SEO, AEO, LLMO, GEO, and SSR/SSG.**

[![Angular](https://img.shields.io/badge/Angular-22-dd0031.svg?style=flat&logo=angular)](https://angular.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8%2B-blue.svg?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38bdf8.svg?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![Material 3](https://img.shields.io/badge/Material_Design-M3-7c3aed.svg?style=flat&logo=google)](https://material.angular.io/)
[![SSG Prerender](https://img.shields.io/badge/SSG-Prerender_6_Routes-10b981.svg?style=flat)](https://angular.dev/guide/ssr)
[![Tests](https://img.shields.io/badge/Tests-75%2F75_Passing-brightgreen.svg?style=flat&logo=vitest)](https://vitest.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Chintap Angular Starter** is a developer template for building modern, high-performance web applications that excel not just in traditional search engines, but in the emerging AI search and generative answer landscape.

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
git clone https://github.com/001bharathchetty/chintap-angular-starter.git my-app
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
# Run unit test suite (75 tests across 12 suites)
npm test

# Or run tests directly with Vitest
npm run test:run
```

### 4. Build for Production (SSG)

```bash
# Compile and pre-render all static routes
npm run build
```
The output is written to `dist/chintap-angular-starter/browser/` with all pre-rendered HTML files (`index.html`, `features/index.html`, `best-practices/index.html`, `about/index.html`, `contact/index.html`, `404.html`), ready for static hosting.

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
  author: {
    name: 'Your Name',
    url: 'https://github.com/yourhandle',
    email: 'hello@mycoolapp.com',
  },
  organization: {
    name: 'My Organization',
    legalName: 'My Organization Inc.',
    url: 'https://mycoolapp.com',
    logo: 'https://mycoolapp.com/images/logo.png',
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

### Injecting in Any Component or Service

```typescript
import { Component, inject } from '@angular/core';
import { SITE_CONFIG } from '../../core/config/site.config';

@Component({ ... })
export class MyFeatureComponent {
  readonly siteConfig = inject(SITE_CONFIG);
}
```

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
- **Vitest & Angular Unit Testing**: Lightning-fast unit tests with 100% pass guarantee.
- **Netlify Ready**: Zero-config deployment with `netlify.toml` pre-configured for clean URLs and header security.

---

## 📁 Directory Structure

```
chintap-angular-starter/
├── public/
│   ├── .well-known/ard.json          # Agent Resource Discovery manifest
│   ├── llms.txt                      # LLM-readable summary
│   ├── llms-full.txt                 # Detailed LLM architectural guide
│   ├── robots.txt                    # Search & AI crawler directives
│   └── sitemap.xml                   # XML sitemap
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── config/site.config.ts # Centralized branding & config
│   │   │   ├── services/
│   │   │   │   ├── seo.service.ts    # SEO/AEO/GEO schema injection engine
│   │   │   │   └── theme.service.ts  # Light/Dark mode reactive signal
│   │   ├── pages/
│   │   │   ├── home/                 # Starter hero, 5-Pillar matrix & FAQ
│   │   │   ├── features/             # Tech stack & architectural overview
│   │   │   ├── best-practices/       # Developer handbook with copyable code
│   │   │   ├── about/                # About page
│   │   │   ├── contact/              # Interactive contact form
│   │   │   └── not-found/            # Accessible 404 with dinosaur Easter egg
│   │   ├── shared/components/        # Navbar, Footer, Graph components
│   │   └── app.routes.ts             # Route definitions & pre-render list
│   ├── routes.txt                    # Routes to statically pre-render at build
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

---

## 📄 License

MIT License. Free to use for personal, commercial, and open-source projects.
