# 5 Pillars of Discovery (Best Practices) Page Content

- **Route:** `/best-practices`
- **Page Title:** `5 Pillars of Discovery | Best Practices — Chintap Angular Starter`
- **Meta Description:** `Comprehensive guide to modern web discovery: Technical SEO, Answer Engine Optimization (AEO), LLM Optimization (LLMO), Generative Engine Optimization (GEO), and SSG.`
- **Component:** `src/app/pages/best-practices/best-practices-page.component.ts`

---

## Overview

The Best Practices page details the **5 Foundational Pillars of Modern Discovery**, providing copyable code snippets, configuration patterns, and architectural explanations for each pillar.

---

## The 5 Pillars

### 1. SEO (Search Engine Optimization)
- **Purpose**: Maximize crawlability and ranking on traditional web search engines (Google, Bing).
- **Implementation**:
  - Programmatic meta tag management via `SeoService`.
  - OpenGraph cards (`og:title`, `og:image`, `og:description`).
  - Dynamic canonical links (`<link rel="canonical">`).
  - Strict 404 canonical strip and `noindex` headers.
  - Valid XML Sitemap (`/sitemap.xml`) and `robots.txt`.

### 2. AEO (Answer Engine Optimization)
- **Purpose**: Surface direct answers in AI Overviews, Perplexity, and voice search.
- **Implementation**:
  - Schema.org `@graph` JSON-LD generation (`FAQPage`, `Question`, `Answer`).
  - Concise definition lists and 40–60 word answer summaries.
  - Interactive accordion synchronized directly with structured data.

### 3. LLMO (Large Language Model Optimization)
- **Purpose**: Provide structured context for AI agents, scrapers, and RAG pipelines.
- **Implementation**:
  - `/llms.txt`: Standardized summary following [llmstxt.org](https://llmstxt.org).
  - `/llms-full.txt`: Deep architectural reference for LLM context windows.
  - `/.well-known/ard.json`: Agent Resource Discovery manifest for autonomous agents.

### 4. GEO (Generative Engine Optimization)
- **Purpose**: Authoritative entity knowledge graph modeling for generative citations.
- **Implementation**:
  - Rich `Organization`, `WebSite`, and `SoftwareApplication` Schema.org schemas.
  - Explicit geographic coordinates (`geo.latitude`, `geo.longitude`).
  - Clear authorship attribution, physical address, and canonical source references.

### 5. SSR / SSG (Server-Side Rendering & Static Site Generation)
- **Purpose**: Eliminate cumulative layout shift and deliver fast First Contentful Paint via pre-rendered HTML.
- **Implementation**:
  - Application Builder (`@angular/build:application`) prerendering.
  - Prerender list defined in `src/routes.txt` (7 static routes).
  - Safe browser vs server hydration guards with `isPlatformBrowser`.
