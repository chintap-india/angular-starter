import { Injectable, inject, PLATFORM_ID, signal, computed } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BlogPost, BlogFilter } from '../models/blog.model';

const SEEDED_BLOG_POSTS: BlogPost[] = [
  {
    slug: 'signals-reactivity-in-angular-22',
    title: 'Fine-Grained Signals Reactivity in Modern Angular Architecture',
    date: '2026-11-08T10:00:00Z',
    author: 'Alex Rivers',
    authorRole: 'Principal Frontend Architect',
    authorAvatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=alex.rivers',
    category: 'Signals',
    tags: ['Angular', 'Signals', 'Reactivity', 'Architecture'],
    summary: 'Explore how fine-grained Angular Signals deliver deterministic state management, eliminate zoneless change detection bottlenecks, and maximize runtime performance.',
    coverImage: 'images/chintap-og.jpg',
    featured: true,
    readingTimeMinutes: 2,
    body: `Angular's reactivity primitives have transformed how frontends manage runtime state. By replacing broad zone-based tick cycles with fine-grained dependency tracking, **Signals** give developers direct, glitch-free control over DOM updates.

## Why Signals Transform UI Architecture

Traditional change detection in Angular relied on Zone.js monkey-patching browser microtasks. Whenever any asynchronous event fired—a mouse click, a timer, or an HTTP response—Angular walked the entire component tree from top to bottom.

Signals invert this paradigm completely:

- **Push-Pull Reactivity**: State writes push notifications to a dependency graph, while computations pull values lazily on demand.
- **Micro-Targeted Updates**: When a specific signal updates, only the DOM node bound to that exact signal updates—leaving the rest of the component tree untouched.
- **Glitch-Free Guarantee**: Computed values are evaluated once per computation cycle, preventing intermediate stale reads.

\`\`\`typescript
// Example: Fine-grained computed task metrics
readonly tasks = signal<TaskItem[]>(initialTasks);
readonly completedTasks = computed(() => 
  this.tasks().filter(t => t.status === 'completed')
);
readonly completionRate = computed(() => {
  const total = this.tasks().length;
  return total > 0 ? Math.round((this.completedTasks().length / total) * 100) : 0;
});
\`\`\`

## Best Practices for Enterprise Signal Stores

When structuring large enterprise modules, keep signals clean and predictable:

1. **Keep Signals Synchronous**: Avoid side-effects inside \`computed()\` functions. Use \`computed\` strictly for pure derivation.
2. **Use \`linkedSignal()\` for Dependent Local State**: When form fields or reset mechanisms need to mirror upstream props without messy \`ngOnChanges\`, \`linkedSignal()\` provides an elegant reactive link.
3. **Signal Inputs and Queries**: Prefer \`input()\`, \`output()\`, and \`viewChild()\` over decorator syntax to maintain end-to-end reactivity from parents to child components.

> "Signals allow your applications to scale gracefully from simple interactive forms to heavy data tables with tens of thousands of cells without sacrificing rendering frame rates."`
  },
  {
    slug: 'mastering-ssg-and-sub-second-fcp',
    title: 'Mastering Static Site Generation (SSG) for Sub-Second First Contentful Paint',
    date: '2026-11-05T14:30:00Z',
    author: 'Elena Rostova',
    authorRole: 'Performance & SSR Specialist',
    authorAvatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=elena.rostova',
    category: 'SEO & Performance',
    tags: ['SSG', 'Performance', 'Core Web Vitals', 'FCP', 'Angular'],
    summary: 'Discover how pre-rendering every route into semantic HTML at build time guarantees sub-second First Contentful Paint (FCP) and near-zero Cumulative Layout Shift (CLS).',
    coverImage: 'images/chintap-og.jpg',
    featured: false,
    readingTimeMinutes: 2,
    body: `In modern web development, performance isn't just a metric—it directly determines search rankings, user retention, and conversion rates. When web crawlers and users visit a website, the fastest experience is always pure, pre-rendered semantic HTML.

## The Dual-Layer Architecture: Build-Time SSG + Client Hydration

Angular's Application Builder (\`@angular/build:application\`) bridges the gap between static content delivery and dynamic single-page applications:

1. **Pre-Rendering at Compile Time**: During \`ng build\`, Angular launches headless Node rendering workers to execute your application against a list of known routes defined in \`src/routes.txt\`.
2. **Instant Edge Delivery**: The resulting static \`.html\` files are pushed directly to CDN edge servers (such as Netlify Edge). When a browser makes an HTTP request, the edge serves raw HTML with zero cold-start delay.
3. **Event Replay Hydration**: With \`withEventReplay()\`, any button clicks, inputs, or gestures that occur while JavaScript bundles are downloading are automatically captured and replayed once the client runtime hydrates.

\`\`\`typescript
// app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
  ],
};
\`\`\`

## Key Metrics Achieved

- **Sub-Second First Contentful Paint (FCP)**: The browser parses HTML immediately without waiting for client-side bundle compilation.
- **Zero Cumulative Layout Shift (CLS < 0.01)**: Fonts, navigation bars, and grid structures are positioned in the static HTML markup, preventing content jumps.
- **AI Agent Readability**: LLM scrapers, Perplexity bots, and search engine spiders read semantic content directly from the raw HTTP stream without needing to execute JavaScript.`
  },
  {
    slug: 'seo-and-aeo-in-the-ai-search-era',
    title: 'Engineering for Answer Engine Optimization (AEO) in the AI Search Era',
    date: '2026-11-01T09:15:00Z',
    author: 'Marcus Chen',
    authorRole: 'Director of Search & Knowledge Engineering',
    authorAvatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=marcus.chen',
    category: 'Architecture',
    tags: ['AEO', 'SEO', 'JSON-LD', 'AI Agents', 'Schema.org'],
    summary: 'How to structure web applications with Schema.org JSON-LD graphs, machine-readable ARD manifests, and llms.txt to dominate both traditional Google Search and AI Overview citations.',
    coverImage: 'images/chintap-og.jpg',
    featured: false,
    readingTimeMinutes: 2,
    body: `Search is undergoing its most profound transformation in twenty-five years. While traditional Search Engine Optimization (SEO) focused on keyword density, backlink equity, and page metadata, the emergence of generative answer engines—like Google AI Overviews, Perplexity, and Claude/ChatGPT Search—demands a new standard: **Answer Engine Optimization (AEO)** and **Generative Engine Optimization (GEO)**.

## How AI Answer Engines Ingest Content

Unlike traditional web crawlers that index strings of keywords, AI answer engines extract entities and relationships into knowledge graphs. To be cited as the authoritative source in an AI summary, your application must provide:

1. **Structured Entity Representation**: Use Schema.org \`@graph\` JSON-LD to declare organizations, software applications, authors, and FAQ answers.
2. **Standardized AI Entrypoints**:
   - \`/llms.txt\`: A concise markdown summary per the [llmstxt.org](https://llmstxt.org) standard.
   - \`/llms-full.txt\`: A deep-dive architectural document loaded by RAG ingestion pipelines.
   - \`/.well-known/ard.json\`: An Agent Resource Discovery manifest specifying machine capabilities and API endpoints.

\`\`\`json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Engineering for Answer Engine Optimization (AEO)",
  "datePublished": "2026-11-01T09:15:00Z",
  "author": {
    "@type": "Person",
    "name": "Marcus Chen"
  }
}
\`\`\`

## The Three Pillars of Modern Web Visibility

- **Traditional SEO**: Dynamic \`<title>\`, meta descriptions, canonical headers, and XML sitemaps.
- **Answer Engine Optimization (AEO)**: Direct question-answer pairs that feed directly into generative summaries.
- **Autonomous Agent Discovery (LLMO/GEO)**: Clean, token-efficient text feeds that agents can parse without paying the performance penalty of browser rendering engines.`
  }
];

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private readonly platformId = inject(PLATFORM_ID);

  readonly posts = signal<BlogPost[]>(SEEDED_BLOG_POSTS);
  readonly loading = signal<boolean>(false);
  readonly error = signal<string | null>(null);

  readonly categories = computed(() => {
    const list = this.posts();
    const unique = new Set(list.map(p => p.category));
    return ['All', ...Array.from(unique)];
  });

  readonly featuredPost = computed(() => {
    return this.posts().find(p => p.featured) || this.posts()[0] || null;
  });

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.fetchManifest();
    }
  }

  private async fetchManifest(): Promise<void> {
    try {
      this.loading.set(true);
      const res = await fetch('/content/blog/posts.json');
      if (res.ok) {
        const remotePosts: BlogPost[] = await res.json();
        if (Array.isArray(remotePosts) && remotePosts.length > 0) {
          // Merge with any local full bodies if available
          const merged = remotePosts.map(remote => {
            const local = this.posts().find(p => p.slug === remote.slug);
            return local?.body ? { ...remote, body: local.body } : remote;
          });
          this.posts.set(merged);
        }
      }
    } catch {
      // Gracefully fall back to pre-seeded posts
    } finally {
      this.loading.set(false);
    }
  }

  async getPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const existing = this.posts().find(p => p.slug === slug);
    if (existing?.body) {
      return existing;
    }

    if (isPlatformBrowser(this.platformId)) {
      try {
        const res = await fetch(`/content/blog/${slug}.json`);
        if (res.ok) {
          const detail: BlogPost = await res.json();
          this.posts.update(list => {
            const idx = list.findIndex(p => p.slug === slug);
            if (idx >= 0) {
              const copy = [...list];
              copy[idx] = detail;
              return copy;
            }
            return [...list, detail];
          });
          return detail;
        }
      } catch {
        // Fall back to existing
      }
    }

    return existing;
  }

  getAdjacentPosts(slug: string): { prev?: BlogPost; next?: BlogPost } {
    const list = this.posts();
    const idx = list.findIndex(p => p.slug === slug);
    if (idx === -1) return {};

    return {
      prev: idx > 0 ? list[idx - 1] : undefined,
      next: idx < list.length - 1 ? list[idx + 1] : undefined,
    };
  }

  filterPosts(filter: BlogFilter): BlogPost[] {
    return this.posts().filter(post => {
      if (filter.category && filter.category !== 'All' && post.category !== filter.category) {
        return false;
      }
      if (filter.tag && !post.tags.includes(filter.tag)) {
        return false;
      }
      if (filter.searchQuery) {
        const q = filter.searchQuery.toLowerCase().trim();
        const matchesTitle = post.title.toLowerCase().includes(q);
        const matchesSummary = post.summary.toLowerCase().includes(q);
        const matchesAuthor = post.author.toLowerCase().includes(q);
        const matchesTag = post.tags.some(t => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesSummary && !matchesAuthor && !matchesTag) {
          return false;
        }
      }
      return true;
    });
  }
}
