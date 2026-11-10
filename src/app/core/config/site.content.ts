import { InjectionToken } from '@angular/core';

export interface NavLink {
  label: string;
  path: string;
  external?: boolean;
}

export interface PillarCard {
  acronym: string;
  name: string;
  description: string;
  points: string[];
  icon: string;
  color: string;
}

export interface FaqItem {
  category?: string;
  question: string;
  answer: string;
  details?: string[];
}

export interface StackFeature {
  title: string;
  category: string;
  version: string;
  logoKey: string;
  docUrl: string;
  description: string;
  highlights: string[];
}

export interface PracticeSection {
  id: string;
  pillar: string;
  badge: string;
  title: string;
  summary: string;
  keyTakeaway: string;
  actionItems: string[];
  codeSnippet: string;
}

export interface TasksShowcasePillar {
  title: string;
  icon: string;
  description: string;
}

export interface TasksShowcaseStat {
  value: string;
  label: string;
}

export interface TasksShowcaseSection {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  route: string;
  ctaLabel: string;
  stats: TasksShowcaseStat[];
  pillars: TasksShowcasePillar[];
}

export interface SiteContent {
  brand: {
    name: string;
    prefix?: string;
    suffix?: string;
    tagline: string;
    logoAlt: string;
  };
  navigation: {
    links: NavLink[];
    cta: {
      label: string;
      action: 'contact' | 'modal';
    };
  };
  home: {
    hero: {
      badge: string;
      headlinePrefix: string;
      headlineGradient: string;
      description: string;
      terminalQuickstart: {
        label: string;
        command: string;
      };
      primaryCta: { label: string; path: string };
      secondaryCta: { label: string; path: string };
      githubCta: { label: string };
    };
    pillars: {
      eyebrow: string;
      title: string;
      items: PillarCard[];
    };
    configCard: {
      badge: string;
      title: string;
      description: string;
      linkText: string;
      linkPath: string;
    };
    faqSection: {
      eyebrow: string;
      title: string;
      description: string;
      items: FaqItem[];
    };
    bottomCta: {
      title: string;
      description: string;
      primaryButton: { label: string };
      secondaryButton: { label: string };
    };
  };
  features: {
    hero: {
      badge: string;
      title: string;
      description: string;
    };
    tasksShowcase: TasksShowcaseSection;
    items: StackFeature[];
    disclaimer: {
      title: string;
      body: string;
    };
    bottomCta: {
      title: string;
      description: string;
      primaryButton: { label: string; path: string };
      secondaryButton: { label: string };
    };
  };
  bestPractices: {
    hero: {
      badge: string;
      title: string;
      description: string;
    };
    sections: PracticeSection[];
    bottomCta: {
      title: string;
      description: string;
      primaryButton: { label: string };
      secondaryButton: { label: string };
    };
  };
  about: {
    hero: {
      badge: string;
      title: string;
      subtitle: string;
      intro: string[];
    };
    sections: Array<{
      title: string;
      paragraphs: string[];
    }>;
    bottomCta: {
      title: string;
      description: string;
      buttonText: string;
    };
  };
  contact: {
    hero: {
      title: string;
      subtitle: string;
      lead: string;
    };
    whatThinking: {
      headline: string;
      lead: string;
      sub: string;
      disclaimer: string;
    };
    guidance: {
      headline: string;
      points: string[];
      note: string;
      closing: string;
    };
    address: {
      headline: string;
      name: string;
      lines: string[];
    };
  };
  tasks: {
    hero: {
      badge: string;
      title: string;
      description: string;
    };
  };
  footer: {
    description: string;
    tagline: string;
    navTitle: string;
    machineTitle: string;
    legalTitle: string;
    copyrightNotice: string;
    disclaimer: string;
  };
}

export const DEFAULT_SITE_CONTENT: SiteContent = {
  brand: {
    name: 'chintap',
    prefix: 'chin',
    suffix: 'tap',
    tagline: 'Things. Apps. Possibilities.',
    logoAlt: 'Chintap Starter Logo',
  },
  navigation: {
    links: [
      { label: 'Home', path: '/' },
      { label: 'Features', path: '/features' },
      { label: 'Tasks', path: '/tasks' },
      { label: 'Best Practices', path: '/best-practices' },
      { label: 'About', path: '/about' },
      { label: 'Contact', path: '/contact' },
    ],
    cta: {
      label: "Let's Talk",
      action: 'modal',
    },
  },
  home: {
    hero: {
      badge: 'Angular 22 • Material 3 • Tailwind 4 • Netlify Edge',
      headlinePrefix: 'The Angular Starter Kit for the',
      headlineGradient: 'AI Search Era',
      description:
        'Stop wasting weeks configuring meta tags, prerendering, and JSON-LD schemas. Kickstart your next web application with built-in best practices for SEO, AEO, LLMO, GEO, and SSR.',
      terminalQuickstart: {
        label: 'Terminal Quickstart',
        command:
          'git clone https://github.com/chintap-india/angular-starter.git my-app && cd my-app && npm install && npm start',
      },
      primaryCta: { label: 'Best Practices Guide →', path: '/best-practices' },
      secondaryCta: { label: 'Stack & Architecture', path: '/features' },
      githubCta: { label: 'GitHub' },
    },
    pillars: {
      eyebrow: 'Five Foundational Pillars',
      title: 'Engineered for Maximum Visibility & Performance',
      items: [
        {
          acronym: 'SEO',
          name: 'Search Engine Optimization',
          icon: 'search',
          color: 'text-blue-500',
          description: 'First-page search visibility for Google & Bing web crawlers.',
          points: [
            'Dynamic title and description management',
            'Direct 1-hop 301 canonical redirects',
            'Complete OpenGraph & Twitter Cards',
            'Automatic noindex on 404 routes',
          ],
        },
        {
          acronym: 'AEO',
          name: 'Answer Engine Optimization',
          icon: 'question_answer',
          color: 'text-emerald-500',
          description: 'Optimized for Google AI Overviews, Siri, and voice search.',
          points: [
            'Schema.org FAQPage JSON-LD generation',
            'High-intent 40–60 word concise answers',
            'Semantic HTML microdata hierarchy',
            'Zero layout shifts for instant snippet extraction',
          ],
        },
        {
          acronym: 'LLMO',
          name: 'LLM Optimization',
          icon: 'psychology',
          color: 'text-purple-500',
          description: 'Machine-readable documentation for AI models and RAG agents.',
          points: [
            'Standardized /llms.txt manifest',
            'Full monolithic documentation in /llms-full.txt',
            'Agent Resource Discovery (/.well-known/ard.json)',
            'CORS-enabled plain text endpoints',
          ],
        },
        {
          acronym: 'GEO',
          name: 'Generative Engine Optimization',
          icon: 'auto_awesome',
          color: 'text-amber-500',
          description: 'High-citation authority for Perplexity, ChatGPT Search, and Gemini.',
          points: [
            'Interlinked Knowledge Graph entities (@graph)',
            'Schema.org SoftwareApplication & Organization',
            'Explicit version matrices and factual density',
            'Semantic publication and lastmod signals',
          ],
        },
        {
          acronym: 'SSR',
          name: 'Server-Side Rendering & SSG',
          icon: 'bolt',
          color: 'text-rose-500',
          description: 'Angular 22 SSG with instantaneous First Contentful Paint.',
          points: [
            'Build-time pre-rendered static HTML routes',
            'Client hydration with event replay (withEventReplay)',
            'Platform-safe services (isPlatformBrowser)',
            'Zero-server maintenance on Netlify Edge CDN',
          ],
        },
      ],
    },
    configCard: {
      badge: 'CONFIG',
      title: 'Centralized Site Config',
      description:
        'Change domain, brand, author, social links, and coordinates in a single file (site.config.ts). Everything else syncs automatically.',
      linkText: 'See how site.config.ts works →',
      linkPath: '/best-practices',
    },
    faqSection: {
      eyebrow: 'Live AEO Schema Demo & Architecture FAQ',
      title: 'Frequently Asked Questions',
      description:
        'Deep dive into our Angular 22 Signals, Tailwind 4, SSG pre-rendering, and AI optimization stack. Every question is automatically injected into Schema.org FAQPage JSON-LD for answer engines.',
      items: [
        {
          category: 'Stack Architecture',
          question: 'What technologies compose the core frontend stack of this starter?',
          answer:
            'Chintap Angular Starter is built on an enterprise-grade, modern web foundation: Angular 22 with Standalone Components and fine-grained reactive Signals, TypeScript 5.8+, Tailwind CSS 4 with native cascade layers, Angular Material 3 for accessible UI widgets, Vitest for sub-second test execution, and the Angular Application Builder (esbuild) with Static Site Generation (SSG).',
          details: [
            'Angular 22 Standalone: 100% NgModule-free with direct component imports and lazy-loaded routes.',
            'Tailwind CSS 4: Native CSS engine utilizing @import "tailwindcss" and synchronized @variant dark mode.',
            'Angular Material 3: Accessible, keyboard-friendly primitives including MatExpansionModule, MatDialogModule, and MatSnackBarModule.',
            'Build & Pre-rendering: esbuild-powered @angular/build:application pre-rendering static HTML routes at compile time.',
          ],
        },
        {
          category: 'Reactivity & Signals',
          question: 'Why does this starter leverage Angular 22 Signals & Zoneless reactivity over Zone.js?',
          answer:
            'Angular 22 Signals provide surgical, node-level reactivity that updates only the DOM elements bound to changed state, bypassing full component-tree dirty checking. Running without Zone.js strips ~35KB from the initial bundle payload, eliminates invasive monkey-patching of browser APIs (e.g., setTimeout, Promise, fetch), simplifies asynchronous debugging, and ensures predictable, sub-millisecond change detection cycles.',
          details: [
            'Targeted DOM Invalidation: Only affected template nodes re-render when a signal value changes.',
            'Zero Zone.js Overhead: Eliminates 35KB of runtime monkey-patching and reduces CPU execution time on mobile devices.',
            'Glitch-Free Computed State: computed() and effect() primitives maintain strict mathematical dependency graphs without subscription leaks.',
          ],
        },
        {
          category: 'Styling & Design Tokens',
          question: 'How do Tailwind CSS 4 and Angular Material 3 work together harmoniously?',
          answer:
            'Tailwind CSS 4 and Angular Material 3 divide responsibilities cleanly. Angular Material provides accessible, WCAG-compliant interactive widgets (accordions, dialogs, form controls, snackbars), while Tailwind CSS 4 controls layout grids, responsive typography, spacing, and design tokens via utility classes. A unified dark mode class on <html> seamlessly styles both Tailwind utilities and Material custom properties simultaneously.',
          details: [
            'Accessible Primitives + Fast Utilities: No reinventing accessible ARIA attributes or focus traps for complex dialogs and accordions.',
            'Tailwind 4 Engine: Native CSS cascade layer integration without requiring obsolete PostCSS or JavaScript configs.',
            'Synchronized Dark Mode: Seamless color transitions between stone palettes and Material theme variables via ThemeService.',
          ],
        },
        {
          category: 'SSG & Performance',
          question: 'How does the Static Site Generation (SSG) and pre-rendering pipeline function?',
          answer:
            "At build time, Angular's Application Builder spins up an internal Node.js server renderer that evaluates every static route specified in src/routes.txt (/, /features, /best-practices, /about, /contact, /tasks, /404). It outputs complete, pre-rendered semantic HTML files into dist/chintap-angular-starter/browser/. When visitors or search engine bots arrive, the CDN immediately delivers pre-rendered markup via edge caching with fast First Contentful Paint (FCP) and zero layout shifts.",
          details: [
            'Compile-Time Static Pre-rendering: Pure static HTML output for lightning-fast edge delivery.',
            'Zero Server Infrastructure: Runs on any static CDN (Netlify, Vercel, Cloudflare Pages, GitHub Pages, S3) with 0ms cold starts.',
            'Immediate AI Crawler Discovery: Googlebot, PerplexityBot, and ChatGPT crawler read all content on the first HTTP GET without executing client JS.',
          ],
        },
        {
          category: 'Hydration & UX',
          question: 'How does client-side hydration and Event Replay (withEventReplay) prevent dead clicks?',
          answer:
            "When a visitor loads a pre-rendered page, Angular paints the server-generated DOM instantly before downloading client JavaScript. Angular 22's withEventReplay() feature intercepts and records user interactions (clicks, keyboard navigation, input focus) that happen during this loading window. As soon as the client bundle finishes hydrating, the recorded events are dispatched automatically, guaranteeing no user actions are lost.",
          details: [
            'Instant Perceived Load: Users immediately read and interact with content without waiting for large script execution.',
            'Event Recording Buffer: Early clicks on accordion panels or buttons are stored in a lightweight native event queue.',
            'Lossless Event Replay: Events replay smoothly against hydrated components with zero cumulative layout shifts.',
          ],
        },
        {
          category: 'AEO & Knowledge Graph',
          question: 'How does Answer Engine Optimization (AEO) and Schema.org injection work across the stack?',
          answer:
            'The SeoService automatically compiles this FAQ dataset into Schema.org FAQPage JSON-LD and injects it into the pre-rendered HTML <head>. AI search engines like Google AI Overviews, Perplexity, and Microsoft Copilot crawl this structured schema to extract direct, authoritative answers to user queries and generate high-trust citations back to your application.',
          details: [
            'Automated Schema Generation: Dynamically produces valid @type: "FAQPage" JSON-LD from component signals.',
            'Direct Answer Structuring: Q&A pairs formatted to fit Google AI Overview extraction windows (40–60 words).',
            'Knowledge Graph Entities: Interlinked with SoftwareApplication and Organization schemas for holistic entity authority.',
          ],
        },
        {
          category: 'Testing & Reliability',
          question: 'Why Vitest for unit testing instead of Karma or Jest?',
          answer:
            "Vitest runs directly on Vite's modern native ESM engine with multi-threaded worker pools in JSDOM, eliminating the need to launch heavyweight real browser instances like Chrome via Karma. All tests execute in under 12 seconds with instant hot-module test reloading (HMR), snapshot support, and seamless mock timers for zoneless component testing.",
          details: [
            '10x Faster Execution: Instant test runs without Chromium binary launch delays or browser disconnects.',
            'Dual Test Execution: Runs natively with npx vitest run and through Angular CLI\'s official @angular/build:unit-test (npm test).',
            '100% Green Test Suite: Covers SeoService, App root component, routing lifecycle, dialog interactions, and site configuration.',
          ],
        },
        {
          category: 'Centralized Configuration',
          question: "How do I customize the entire application's branding, author, and domain?",
          answer:
            'All global branding and metadata is configured in a single file: src/app/core/config/site.config.ts and src/app/core/config/site.content.ts. Updating these configurations immediately propagates throughout meta titles, descriptions, OpenGraph social cards, XML sitemaps, robots.txt, Schema.org entities, and the machine-readable /llms.txt endpoints without manual editing across multiple files.',
          details: [
            'Single Source of Truth: Modify brand name, domain, author info, and geo coordinates once.',
            'Angular Dependency Injection: Injectable anywhere using the SITE_CONFIG and SITE_CONTENT injection tokens.',
            'Zero Hardcoded String Drift: Sitemaps, social previews, and JSON-LD schemas stay 100% in sync automatically.',
          ],
        },
      ],
    },
    bottomCta: {
      title: 'Build with the best practices from day one.',
      description:
        "Don't let your Angular application be invisible to AI answer engines and modern search algorithms. Start with Chintap Angular Starter today.",
      primaryButton: { label: 'Clone on GitHub' },
      secondaryButton: { label: 'Get in Touch' },
    },
  },
  features: {
    hero: {
      badge: 'Architectural Stack',
      title: 'Engineered for the Modern AI Web',
      description:
        'Every architectural choice in this starter kit has been benchmarked for sub-second developer velocity, rock-solid type safety, and maximum visibility across both human crawlers and AI answer engines.',
    },
    tasksShowcase: {
      badge: 'Interactive Application Showcase',
      title: 'Enterprise Tasks Management Module',
      subtitle:
        'A reference architecture demonstrating Signals reactivity, Chintap Compact Template UX, full CRUD, and high-performance client state.',
      description:
        'The Tasks module serves as a live, end-to-end blueprint for building production-grade Angular applications. It embodies enterprise UX patterns including multi-view dashboards (Table, Cards, Analytics), 7 integrated modal dialogs, desktop keyboard navigation, deep-linked detail pages, and 100% zoneless-ready Signals.',
      route: '/tasks',
      ctaLabel: 'Launch Tasks App',
      stats: [
        { value: '3', label: 'Dashboard Views' },
        { value: '15+', label: 'Keyboard Shortcuts' },
        { value: '100%', label: 'Signal-Driven' },
        { value: '7', label: 'Integrated Dialogs' },
        { value: '151', label: 'Passing Unit Tests' },
      ],
      pillars: [
        {
          title: 'Chintap Compact Template UX',
          icon: 'view_compact',
          description:
            'Two-tier sticky navigation with tucked top-bar pagination that reclaims ~64px vertical viewport space, plus active-row focus depth.',
        },
        {
          title: 'Fine-Grained Signals Core',
          icon: 'bolt',
          description:
            '100% Signal-driven state with instant local search, multi-field filtering (Category, Priority, Status), and live sprint analytics.',
        },
        {
          title: 'Desktop Keyboard Shortcuts',
          icon: 'keyboard',
          description:
            'Vim-style J/K list navigation, single-key creation (C/N), status toggling (S), instant search (/ or ⌘K), and built-in visual cheat sheet (?).',
        },
        {
          title: 'Comprehensive Dialog Suite',
          icon: 'widgets',
          description:
            'Task editor with live Markdown preview, quick status changer, sprint details breakdown, fullscreen viewer, keyboard cheat sheet, and delete confirmations.',
        },
        {
          title: 'Dedicated Task Detail Routes',
          icon: 'article',
          description:
            'Single-column deep-link pages (/tasks/:id) with action capsules, dynamic SEO & JSON-LD breadcrumbs, and prev/next steppers.',
        },
        {
          title: '1-Click Task Duplication',
          icon: 'content_copy',
          description:
            'Effortlessly clone tasks with (Copy) naming, preserved specifications, and automatic status reset to todo in backlog.',
        },
        {
          title: 'Accessible & Strict Dark Theme',
          icon: 'contrast',
          description:
            'High-contrast Slate dark palette conforming to WCAG 2.2 AA/AAA, zero all-caps label transforms, and pure CSS colored indicators.',
        },
      ],
    },
    items: [
      {
        title: 'Enterprise Tasks Management',
        category: 'Interactive Application',
        version: 'v1.5.16',
        logoKey: 'material',
        docUrl: '/tasks',
        description:
          'Production-grade sprint backlog and task management application showcasing Angular Signals, Material Design 3, real-time filtering, responsive tables, and sprint analytics.',
        highlights: [
          'Unified Table, Cards, and Sprint Analytics dashboard views',
          'Full CRUD with Markdown previews & optimistic UI updates',
          'Desktop keyboard navigation & shortcuts cheat sheet (C/N, J/K, S, D, E, /, ⌘K, ?)',
          'Fast local search, priority filtering, and pagination with 35+ seeded tasks',
          'High-contrast Slate dark theme adhering to WCAG 2.2 AA/AAA contrast standards',
        ],
      },
      {
        title: 'Angular 22 Reactive Core',
        category: 'Framework',
        version: '^22.2.0',
        logoKey: 'angular',
        docUrl: 'https://angular.dev',
        description:
          'Built entirely with standalone components, fine-grained Signals reactivity, inject() dependency injection, and modern template control flow (@if, @for, @let).',
        highlights: [
          'Zoneless-ready Signal architecture',
          'Built-in modern control flow with @let syntax',
          'Lazy-loaded standalone component routes',
          'TypeScript strict mode with zero implicit anys',
        ],
      },
      {
        title: 'Angular Material Design 3',
        category: 'UI System',
        version: '^22.2.0',
        logoKey: 'material',
        docUrl: 'https://material.angular.io',
        description:
          'Official Google Material Design 3 component suite for all interactive controls, accessible dialogues, buttons, and navigation elements.',
        highlights: [
          'Accessible WCAG 2.1 AA dialogs (MatDialog)',
          'Rich form fields and buttons (MatButton, MatFormField)',
          'Expandable accordion panels (MatExpansionModule)',
          'Material Symbols Outlined iconography',
        ],
      },
      {
        title: 'Tailwind CSS 4',
        category: 'Styling Engine',
        version: '^4.3.0',
        logoKey: 'tailwind',
        docUrl: 'https://tailwindcss.com',
        description:
          'Ultra-fast styling using Tailwind 4 native CSS imports, CSS custom properties, and seamless dark mode via custom @variant dark.',
        highlights: [
          'Native CSS theme variables and zero-config builds',
          'Custom @variant dark (&:where(.dark, .dark *)) support',
          'Fluid responsive grids and container queries',
          'Harmonious warm stone typography and design tokens',
        ],
      },
      {
        title: 'Static Site Generation (SSG)',
        category: 'Performance',
        version: '^22.2.0',
        logoKey: 'angular',
        docUrl: 'https://angular.dev/guide/ssr',
        description:
          'Pre-renders every route at build time into pure semantic HTML. Search engines and AI agents read full content without executing client JavaScript.',
        highlights: [
          'Fast First Contentful Paint (FCP) via pre-rendered HTML',
          'Client hydration with event replay (withEventReplay)',
          'Automatic routes discovery via routes.txt',
          'Zero layout shifts (CLS < 0.01)',
        ],
      },
      {
        title: 'Enterprise Security & Edge CDN',
        category: 'Infrastructure',
        version: 'Netlify Edge',
        logoKey: 'netlify',
        docUrl: 'https://docs.netlify.com',
        description:
          'Rigorous Content-Security-Policy (CSP), Strict-Transport-Security (HSTS), asset immutability caching, and zero-server maintenance.',
        highlights: [
          'Pre-configured netlify.toml and _headers',
          'Automated 301 canonical redirects (zero redirect chains)',
          'Native Netlify Forms integration without third-party servers',
          'Asset caching with max-age=31536000, immutable',
        ],
      },
      {
        title: 'Vitest Unit Testing Suite',
        category: 'Developer Experience',
        version: '^5.0.0',
        logoKey: 'vitest',
        docUrl: 'https://vitest.dev',
        description:
          'Blazing-fast ESM-native test runner pre-wired with Angular compiler and comprehensive assertions for SEO, AEO schemas, and theme reactivity.',
        highlights: [
          'Sub-2 second full test suite execution',
          'Pre-configured SEO and Schema.org unit assertions',
          'Zero Karma or Webpack configuration overhead',
          'Instant watch mode and CI/CD compatibility',
        ],
      },
    ],
    disclaimer: {
      title: 'Nominative Fair Use & Trademarks Notice',
      body:
        'Angular, Material Design, Tailwind CSS, Vitest, Netlify, and all associated logos or registered trademarks belong to their respective owners. Their reference herein is strictly for technical identification, architectural compatibility, and developer documentation under nominative fair use, and does not imply official endorsement, sponsorship, or commercial affiliation.',
    },
    bottomCta: {
      title: 'Ready to build with this architecture?',
      description:
        'Clone the starter and start building in minutes with pre-configured build scripts, tests, and deployment configs.',
      primaryButton: { label: 'View Best Practices Guide', path: '/best-practices' },
      secondaryButton: { label: 'Get Started on GitHub' },
    },
  },
  bestPractices: {
    hero: {
      badge: 'Developer Handbook',
      title: 'Best Practices for Modern Web Discovery',
      description:
        'An actionable guide to optimizing Angular applications for both human search queries and artificial intelligence answer engines. Copy these battle-tested patterns directly into your codebase.',
    },
    sections: [
      {
        id: 'seo',
        pillar: 'SEO',
        badge: 'Traditional Search',
        title: 'Search Engine Optimization (SEO) Best Practices',
        summary:
          'Traditional search engines like Google and Bing crawl HTML and rely on title hierarchies, canonical consistency, meta tags, and fast time-to-first-byte.',
        keyTakeaway:
          'Enforce a single canonical domain, eliminate redirect chains, dynamically output OpenGraph/Twitter cards, and ensure 404 pages emit noindex while removing the canonical link.',
        actionItems: [
          'Single Canonical Source: Always set rel="canonical" to the final HTTPS URL.',
          'Noindex on 404s: Prevent indexing soft-404s while removing conflicting canonical tags.',
          'Pre-rendered HTML: Ensure bots receive complete semantic DOM without executing JavaScript.',
          'Valid Sitemap: Keep sitemap.xml updated with canonical loc, lastmod, and priority.',
        ],
        codeSnippet: `// Example: Updating route metadata in Angular component
this.seo.setSeoData({
  title: 'My Feature Page',
  description: 'Clean description under 160 characters for search snippets.',
  url: '/my-feature',
  image: '/images/feature-og.jpg',
  keywords: ['angular', 'seo', 'ssg']
});`,
      },
      {
        id: 'aeo',
        pillar: 'AEO',
        badge: 'AI Overviews & Voice',
        title: 'Answer Engine Optimization (AEO) Best Practices',
        summary:
          'Answer engines (Google AI Overviews, Bing Copilot, voice assistants) prioritize direct, unambiguous answers structured around high-intent user questions.',
        keyTakeaway:
          'Structure content into explicit Question headings (h2/h3) followed immediately by a 40–60 word declarative answer. Back every FAQ with Schema.org FAQPage JSON-LD.',
        actionItems: [
          '40-60 Word Answers: Provide clear, concise answers immediately below questions.',
          'Schema.org FAQPage: Inject machine-readable Q&A pairs into JSON-LD scripts.',
          'Semantic HTML: Use <details>, <summary>, <dl>, <dt>, and <dd> elements.',
          'Zero Jargon: State direct facts first before elaborating with nuance.',
        ],
        codeSnippet: `// In your Angular component:
const faqs = [
  {
    question: 'How does Angular SSG work with AEO?',
    answer: 'Angular SSG generates static HTML at build time, ensuring AI crawlers receive complete question and answer pairs without running client JavaScript.'
  }
];

this.seo.setSeoData({
  title: 'Frequently Asked Questions',
  description: 'Answers to common questions about Angular AEO.',
  url: '/faq',
  faqs: faqs // Automatically generates Schema.org FAQPage JSON-LD!
});`,
      },
      {
        id: 'llmo',
        pillar: 'LLMO',
        badge: 'AI Crawler Ingestion',
        title: 'Large Language Model Optimization (LLMO) Best Practices',
        summary:
          'Large Language Models and Retrieval-Augmented Generation (RAG) scrapers require plain-text or Markdown representations of your application architecture and APIs.',
        keyTakeaway:
          'Provide lightweight, static Markdown files (/llms.txt, /llms-full.txt) and Agent Resource Discovery manifests (/.well-known/ard.json) served directly with HTTP 200.',
        actionItems: [
          'Adopt llms.txt standard: Maintain a clean project manifest at /llms.txt.',
          'Provide Monolithic Export: Allow RAG pipelines to read full documentation via /llms-full.txt.',
          'Allow AI Crawlers: Configure robots.txt to explicitly welcome AI user-agents.',
          'Serve with Proper CORS: Set Access-Control-Allow-Origin: * for AI documentation files.',
        ],
        codeSnippet: `# In public/robots.txt:
User-agent: *
Allow: /

Sitemap: https://yourdomain.com/sitemap.xml

# LLM Discoverability
# LLM Context: https://yourdomain.com/llms.txt
# Full Documentation: https://yourdomain.com/llms-full.txt
# Agent Resource Discovery: https://yourdomain.com/.well-known/ard.json`,
      },
      {
        id: 'geo',
        pillar: 'GEO',
        badge: 'Generative Search & Citations',
        title: 'Generative Engine Optimization (GEO) Best Practices',
        summary:
          'Generative engines (Perplexity, ChatGPT Search, Gemini) rank sources based on entity authority, verifiable statistics, citations, and knowledge graph linkages.',
        keyTakeaway:
          'Connect your site entities with interconnected Schema.org @id graphs (Organization, WebSite, WebPage, SoftwareApplication). Include version numbers and concrete facts.',
        actionItems: [
          'Unified @graph: Link WebPage to WebSite and Organization via persistent @id identifiers.',
          'Factual Density: Include exact numbers, dates, version matrices, and author attribution.',
          'Freshness Signals: Maintain clear lastmod tags and semantic publication dates.',
          'Direct Quotations: Format expert quotes with <blockquote> and cite attributes.',
        ],
        codeSnippet: `// Schema.org SoftwareApplication snippet generated by SeoService
{
  "@type": "SoftwareApplication",
  "@id": "https://yourdomain.com/#software",
  "name": "Your App Name",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "Any",
  "author": {
    "@type": "Person",
    "name": "Your Name",
    "url": "https://github.com/your-username"
  }
}`,
      },
      {
        id: 'ssr',
        pillar: 'SSR/SSG',
        badge: 'Performance & Crawlability',
        title: 'Server-Side Rendering & Hydration Best Practices',
        summary:
          'Angular 22 SSG prerenders routes at build time, yielding instant First Contentful Paint and eliminating JavaScript execution requirements for web spiders.',
        keyTakeaway:
          'Combine @angular/build:application with event replay client hydration. Guard browser-specific APIs (window, localStorage) with isPlatformBrowser.',
        actionItems: [
          'Event Replay: Use provideClientHydration(withEventReplay()) in app.config.ts.',
          'Platform Guards: Never access window or document in constructor without isPlatformBrowser.',
          'Static 404 Route: Pre-render /404 to index.html and generate a static 404.html.',
          'Immutable Assets: Serve bundled JS/CSS with Cache-Control: max-age=31536000, immutable.',
        ],
        codeSnippet: `// In app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withInMemoryScrolling({
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled'
    })),
    provideClientHydration(withEventReplay()), // Hydration with event replay
    provideAnimationsAsync()
  ]
};`,
      },
    ],
    bottomCta: {
      title: 'Need help with your Angular architecture?',
      description:
        'Reach out to collaborate or ask questions about our stack, performance tuning, and AI discoverability pipeline.',
      primaryButton: { label: 'Explore the Code on GitHub' },
      secondaryButton: { label: 'Contact Us' },
    },
  },
  about: {
    hero: {
      badge: 'About the Project',
      title: 'About Chintap Starter.',
      subtitle: 'Curious by nature. Built for modern builders.',
      intro: [
        'Some people see something and wonder how it works. Others see how it works and wonder how it could be better.',
        "Chintap Angular Starter was created to give web developers an uncompromising starting point: one that doesn't force a choice between rapid developer velocity and modern discovery.",
        "We're interested in ideas, in making things, and in discovering possibilities that aren't always obvious at first.",
      ],
    },
    sections: [
      {
        title: 'No single box to fit into.',
        paragraphs: [
          "The modern web doesn't neatly separate static pages from dynamic applications. Nor do interesting problems arrive labelled with the technology needed to solve them.",
          'An application might need instant SSG speed for search discovery, surgical Signals reactivity for interactive dashboards, and rich machine-readable metadata for generative AI models.',
          'We want this starter to provide the room to explore these different directions without losing sight of what matters: building things that are fast, accessible, and worth the effort.',
        ],
      },
      {
        title: 'Curious enough to explore. Practical enough to make.',
        paragraphs: [
          "Curiosity is a good place to start. It isn't the whole journey.",
          "Ideas need questions, experiments, decisions, and a willingness to learn along the way. That is why this template includes end-to-end tooling: from Vitest test runners to Schema.org generators and Netlify deployment pipelines.",
          'We believe in exploring possibilities while staying grounded in the problem we are trying to solve.',
        ],
      },
      {
        title: 'A work in progress, by design.',
        paragraphs: [
          'Web technologies evolve rapidly. What was best practice two years ago is obsolete today.',
          'This repository tracks the forefront of Angular and modern web standards — standalone signals, esbuild, native Tailwind 4, and LLM discoverability.',
          "There's plenty left to explore. That's precisely the point.",
        ],
      },
    ],
    bottomCta: {
      title: 'What about your ideas?',
      description:
        'You might have something well defined, or you might only have the beginning of a thought. Either is a good place to start.',
      buttonText: "Let's Talk",
    },
  },
  contact: {
    hero: {
      title: "Let's talk.",
      subtitle: 'Every interesting project starts somewhere.',
      lead:
        "Maybe you have an idea you've been turning over in your head. Maybe there's a problem you'd like to solve, something you'd like to build, or a possibility you're curious about.",
    },
    whatThinking: {
      headline: 'What are you thinking about?',
      lead:
        "It could be a web app, a starter kit customization, a partnership, or an inquiry.",
      sub: "We're happy to hear about it.",
      disclaimer:
        'Use the form to get in touch directly. We review every note personally and typically respond within 1–2 business days.',
    },
    guidance: {
      headline: 'A few things that help',
      points: [
        'What are you thinking about building?',
        'What problem are you trying to solve, or what would you like to make possible?',
        'Where are you in the process — just exploring, planning something, or ready to get started?',
      ],
      note: "Share as much or as little as you like. There's no need to have all the answers.",
      closing: "Let's see where the conversation leads.",
    },
    address: {
      headline: 'Office address',
      name: 'Chintap,',
      lines: [
        'Docking Bay 42, Orion-Cygnus Spur,',
        'Starlight Boulevard, Neo-Bengaluru Outpost,',
        'Quadrant 4, Sol Sector,',
        'Terra Prime, Milky Way - SOL-560109-GX.',
      ],
    },
  },
  tasks: {
    hero: {
      badge: 'Project Checklist',
      title: 'Project Tasks',
      description:
        'Track setup milestones, manage project notes with markdown, and keep your workflow organized.',
    },
  },
  footer: {
    description:
      'Enterprise-grade Angular 22 starter kit equipped with out-of-the-box best practices for SEO, AEO, LLMO, GEO, and SSR/SSG pre-rendering.',
    tagline: 'SEO, AEO, LLMO, GEO & SSR Ready Starter Kit',
    navTitle: 'Navigation',
    machineTitle: 'AI & Machine Readable',
    legalTitle: 'Legal',
    copyrightNotice: 'Open-source starter kit.',
    disclaimer:
      'All trademarks, logos, and brand names referenced belong to their respective owners and are used strictly for technical identification and documentation purposes under nominative fair use.',
  },
};

export const SITE_CONTENT = new InjectionToken<SiteContent>('SITE_CONTENT', {
  providedIn: 'root',
  factory: () => DEFAULT_SITE_CONTENT,
});
