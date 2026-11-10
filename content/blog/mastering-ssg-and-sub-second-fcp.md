---
title: "Mastering Static Site Generation (SSG) for Sub-Second First Contentful Paint"
slug: "mastering-ssg-and-sub-second-fcp"
date: "2026-11-05T14:30:00Z"
author: "Elena Rostova"
authorRole: "Performance & SSR Specialist"
authorAvatarUrl: "https://api.dicebear.com/7.x/bottts/svg?seed=elena.rostova"
category: "SEO & Performance"
tags: ["SSG", "Performance", "Core Web Vitals", "FCP", "Angular"]
summary: "Discover how pre-rendering every route into semantic HTML at build time guarantees sub-second First Contentful Paint (FCP) and near-zero Cumulative Layout Shift (CLS)."
coverImage: "images/chintap-og.jpg"
featured: false
---

In modern web development, performance isn't just a metric—it directly determines search rankings, user retention, and conversion rates. When web crawlers and users visit a website, the fastest experience is always pure, pre-rendered semantic HTML.

## The Dual-Layer Architecture: Build-Time SSG + Client Hydration

Angular's Application Builder (`@angular/build:application`) bridges the gap between static content delivery and dynamic single-page applications:

1. **Pre-Rendering at Compile Time**: During `ng build`, Angular launches headless Node rendering workers to execute your application against a list of known routes defined in `src/routes.txt`.
2. **Instant Edge Delivery**: The resulting static `.html` files are pushed directly to CDN edge servers (such as Netlify Edge). When a browser makes an HTTP request, the edge serves raw HTML with zero cold-start delay.
3. **Event Replay Hydration**: With `withEventReplay()`, any button clicks, inputs, or gestures that occur while JavaScript bundles are downloading are automatically captured and replayed once the client runtime hydrates.

```typescript
// app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
  ],
};
```

## Key Metrics Achieved

- **Sub-Second First Contentful Paint (FCP)**: The browser parses HTML immediately without waiting for client-side bundle compilation.
- **Zero Cumulative Layout Shift (CLS < 0.01)**: Fonts, navigation bars, and grid structures are positioned in the static HTML markup, preventing content jumps.
- **AI Agent Readability**: LLM scrapers, Perplexity bots, and search engine spiders read semantic content directly from the raw HTTP stream without needing to execute JavaScript.
