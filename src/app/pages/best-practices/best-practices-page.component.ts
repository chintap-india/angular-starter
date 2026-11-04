import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { SeoService } from '../../core/services/seo.service';
import { SITE_CONFIG } from '../../core/config/site.config';

interface PracticeSection {
  id: string;
  pillar: string;
  title: string;
  badge: string;
  summary: string;
  keyTakeaway: string;
  actionItems: string[];
  codeSnippet: string;
}

@Component({
  selector: 'app-best-practices-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
  ],
  templateUrl: './best-practices-page.component.html',
})
export class BestPracticesPageComponent implements OnInit {
  private readonly seo = inject(SeoService);
  readonly siteConfig = inject(SITE_CONFIG);

  copiedId: string | null = null;

  readonly sections: PracticeSection[] = [
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
  ];

  copyCode(id: string, code: string): void {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(code);
      this.copiedId = id;
      setTimeout(() => {
        this.copiedId = null;
      }, 2000);
    }
  }

  ngOnInit(): void {
    this.seo.setSeoData({
      title: 'SEO, AEO, LLMO, GEO & SSR Best Practices Guide',
      description:
        'Comprehensive developer guide and engineering standards for building search-optimized and AI-discoverable Angular 22 applications.',
      url: '/best-practices',
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Best Practices', url: '/best-practices' },
      ],
    });
  }
}
