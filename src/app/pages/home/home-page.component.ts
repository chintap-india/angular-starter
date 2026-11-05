import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { SeoService, FaqItem } from '../../core/services/seo.service';
import { ThemeService } from '../../core/services/theme.service';
import { SITE_CONFIG } from '../../core/config/site.config';
import { ContactModalService } from '../../core/services/contact-modal.service';

interface PillarCard {
  acronym: string;
  name: string;
  description: string;
  points: string[];
  icon: string;
  color: string;
}

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatChipsModule,
  ],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent implements OnInit {
  readonly themeService = inject(ThemeService);
  readonly siteConfig = inject(SITE_CONFIG);
  private readonly seo = inject(SeoService);
  private readonly contactModal = inject(ContactModalService);

  copiedQuickstart = false;

  readonly pillars: PillarCard[] = [
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
  ];

  readonly faqs: FaqItem[] = [
    {
      category: 'Stack Architecture',
      question: 'What technologies compose the core frontend stack of this starter?',
      answer:
        'Chintap Angular Starter is built on an enterprise-grade, modern web foundation: Angular 22 with Standalone Components and fine-grained reactive Signals, TypeScript 5.8+, Tailwind CSS 4 with native cascade layers, Angular Material 3 for accessible UI widgets, Vitest for sub-second test execution, and the Angular Application Builder (esbuild) with Static Site Generation (SSG).',
      details: [
        'Angular 22 Standalone: 100% NgModule-free with direct component imports and lazy-loaded routes.',
        'Tailwind CSS 4: Native CSS engine utilizing @import "tailwindcss" and synchronized @variant dark mode.',
        'Angular Material 3: Accessible, keyboard-friendly primitives including MatExpansionModule, MatDialogModule, and MatSnackBarModule.',
        'Build & Pre-rendering: esbuild-powered @angular/build:application pre-rendering 6 static HTML routes at compile time.'
      ]
    },
    {
      category: 'Reactivity & Signals',
      question: 'Why does this starter leverage Angular 22 Signals & Zoneless reactivity over Zone.js?',
      answer:
        'Angular 22 Signals provide surgical, node-level reactivity that updates only the DOM elements bound to changed state, bypassing full component-tree dirty checking. Running without Zone.js strips ~35KB from the initial bundle payload, eliminates invasive monkey-patching of browser APIs (e.g., setTimeout, Promise, fetch), simplifies asynchronous debugging, and ensures predictable, sub-millisecond change detection cycles.',
      details: [
        'Targeted DOM Invalidation: Only affected template nodes re-render when a signal value changes.',
        'Zero Zone.js Overhead: Eliminates 35KB of runtime monkey-patching and reduces CPU execution time on mobile devices.',
        'Glitch-Free Computed State: computed() and effect() primitives maintain strict mathematical dependency graphs without subscription leaks.'
      ]
    },
    {
      category: 'Styling & Design Tokens',
      question: 'How do Tailwind CSS 4 and Angular Material 3 work together harmoniously?',
      answer:
        'Tailwind CSS 4 and Angular Material 3 divide responsibilities cleanly. Angular Material provides accessible, WCAG-compliant interactive widgets (accordions, dialogs, form controls, snackbars), while Tailwind CSS 4 controls layout grids, responsive typography, spacing, and design tokens via utility classes. A unified dark mode class on <html> seamlessly styles both Tailwind utilities and Material custom properties simultaneously.',
      details: [
        'Accessible Primitives + Fast Utilities: No reinventing accessible ARIA attributes or focus traps for complex dialogs and accordions.',
        'Tailwind 4 Engine: Native CSS cascade layer integration without requiring obsolete PostCSS or JavaScript configs.',
        'Synchronized Dark Mode: Seamless color transitions between stone palettes and Material theme variables via ThemeService.'
      ]
    },
    {
      category: 'SSG & Performance',
      question: 'How does the Static Site Generation (SSG) and pre-rendering pipeline function?',
      answer:
        'At build time, Angular\'s Application Builder spins up an internal Node.js server renderer that evaluates every static route specified in src/routes.txt (/, /features, /best-practices, /about, /contact, /404). It outputs complete, pre-rendered semantic HTML files into dist/chintap-angular-starter/browser/. When visitors or search engine bots arrive, the CDN immediately delivers fully rendered markup with sub-100ms First Contentful Paint (FCP).',
      details: [
        'Compile-Time Static Pre-rendering: Pure static HTML output for lightning-fast edge delivery.',
        'Zero Server Infrastructure: Runs on any static CDN (Netlify, Vercel, Cloudflare Pages, GitHub Pages, S3) with 0ms cold starts.',
        'Immediate AI Crawler Discovery: Googlebot, PerplexityBot, and ChatGPT crawler read all content on the first HTTP GET without executing client JS.'
      ]
    },
    {
      category: 'Hydration & UX',
      question: 'How does client-side hydration and Event Replay (withEventReplay) prevent dead clicks?',
      answer:
        'When a visitor loads a pre-rendered page, Angular paints the server-generated DOM instantly before downloading client JavaScript. Angular 22\'s withEventReplay() feature intercepts and records user interactions (clicks, keyboard navigation, input focus) that happen during this loading window. As soon as the client bundle finishes hydrating, the recorded events are dispatched automatically, guaranteeing no user actions are lost.',
      details: [
        'Instant Perceived Load: Users immediately read and interact with content without waiting for large script execution.',
        'Event Recording Buffer: Early clicks on accordion panels or buttons are stored in a lightweight native event queue.',
        'Lossless Event Replay: Events replay smoothly against hydrated components with zero cumulative layout shifts.'
      ]
    },
    {
      category: 'AEO & Knowledge Graph',
      question: 'How does Answer Engine Optimization (AEO) and Schema.org injection work across the stack?',
      answer:
        'The SeoService automatically compiles this FAQ dataset into Schema.org FAQPage JSON-LD and injects it into the pre-rendered HTML <head>. AI search engines like Google AI Overviews, Perplexity, and Microsoft Copilot crawl this structured schema to extract direct, authoritative answers to user queries and generate high-trust citations back to your application.',
      details: [
        'Automated Schema Generation: Dynamically produces valid @type: "FAQPage" JSON-LD from component signals.',
        'Direct Answer Structuring: Q&A pairs formatted to fit Google AI Overview extraction windows (40–60 words).',
        'Knowledge Graph Entities: Interlinked with SoftwareApplication and Organization schemas for holistic entity authority.'
      ]
    },
    {
      category: 'Testing & Reliability',
      question: 'Why Vitest for unit testing instead of Karma or Jest?',
      answer:
        'Vitest runs directly on Vite\'s modern native ESM engine with multi-threaded worker pools in JSDOM, eliminating the need to launch heavyweight real browser instances like Chrome via Karma. All 75 tests across 12 suites execute in under 12 seconds with instant hot-module test reloading (HMR), snapshot support, and seamless mock timers for zoneless component testing.',
      details: [
        '10x Faster Execution: Instant test runs without Chromium binary launch delays or browser disconnects.',
        'Dual Test Execution: Runs natively with npx vitest run and through Angular CLI\'s official @angular/build:unit-test (npm test).',
        '100% Green Test Suite: Covers SeoService, App root component, routing lifecycle, dialog interactions, and site configuration.'
      ]
    },
    {
      category: 'Centralized Configuration',
      question: 'How do I customize the entire application\'s branding, author, and domain?',
      answer:
        'All global branding and metadata is configured in a single file: src/app/core/config/site.config.ts. Updating this configuration immediately propagates throughout meta titles, descriptions, OpenGraph social cards, XML sitemaps, robots.txt, Schema.org entities, and the machine-readable /llms.txt endpoints without manual editing across multiple files.',
      details: [
        'Single Source of Truth: Modify brand name, domain, author info, and geo coordinates once.',
        'Angular Dependency Injection: Injectable anywhere using the SITE_CONFIG injection token.',
        'Zero Hardcoded String Drift: Sitemaps, social previews, and JSON-LD schemas stay 100% in sync automatically.'
      ]
    }
  ];

  quickstartCommand = 'git clone https://github.com/001bharathchetty/chintap-angular-starter.git my-app && cd my-app && npm install && npm start';

  copyQuickstart(): void {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(this.quickstartCommand);
      this.copiedQuickstart = true;
      setTimeout(() => {
        this.copiedQuickstart = false;
      }, 2000);
    }
  }

  openContactModal(): void {
    this.contactModal.open({ intent: 'starter-kit', source: 'home' });
  }

  ngOnInit(): void {
    this.seo.setSeoData({
      title: 'SEO, AEO, LLMO, GEO & SSR Ready Starter Kit',
      description:
        'Enterprise-grade Angular 22 starter template with out-of-the-box best practices for SEO, AEO, LLMO, GEO, and SSR pre-rendering.',
      url: '/',
      faqs: this.faqs,
    });
  }
}
