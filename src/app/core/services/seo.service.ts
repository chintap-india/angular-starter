import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { SITE_CONFIG, SiteConfig, DEFAULT_SITE_CONFIG } from '../config/site.config';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category?: string;
  details?: string[];
}

export interface SeoConfig {
  title: string;
  description: string;
  url?: string;
  image?: string;
  imageAlt?: string;
  type?: 'website' | 'article' | 'profile';
  robots?: string;
  keywords?: string[];
  breadcrumbs?: BreadcrumbItem[];
  faqs?: FaqItem[];
  customSchema?: Record<string, unknown>;
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);
  private readonly document = inject(DOCUMENT);
  readonly siteConfig: SiteConfig = inject(SITE_CONFIG, { optional: true }) || DEFAULT_SITE_CONFIG;

  get defaultOgImage(): string {
    return this.siteConfig.defaultOgImage;
  }

  get siteBaseUrl(): string {
    return this.siteConfig.baseUrl;
  }

  /**
   * Format page title following best-practice SEO conventions:
   * - Homepage: "Brand — Tagline"
   * - Subpages: "Page Title — Brand"
   * - Prevents duplicate brand mentions.
   */
  formatTitle(title: string, url?: string): string {
    const trimmed = (title || '').trim();
    const brand = this.siteConfig.shortName || this.siteConfig.name;
    
    if (!trimmed) {
      return `${brand} — ${this.siteConfig.tagline}`;
    }
    
    // Prevent duplicate brand name
    if (
      trimmed.toLowerCase().includes(brand.toLowerCase()) ||
      trimmed.toLowerCase().includes(this.siteConfig.name.toLowerCase()) ||
      trimmed.toLowerCase().includes('chintap')
    ) {
      return trimmed;
    }
    
    // Homepage or root URL formats as "Brand — Tagline"
    if (
      url === '/' ||
      url === '' ||
      trimmed === this.siteConfig.tagline ||
      trimmed === 'Things. Apps. Possibilities.'
    ) {
      return `${brand} — ${trimmed}`;
    }
    
    // Inner pages format as "Page Title — Brand"
    return `${trimmed} — ${brand}`;
  }

  /**
   * Apply full SEO, AEO, and GEO metadata:
   * 1. Standard HTML meta tags (title, description, robots, keywords)
   * 2. Canonical URL enforcement
   * 3. OpenGraph tags for WhatsApp, LinkedIn, Facebook, Slack
   * 4. Twitter / X Cards
   * 5. Schema.org JSON-LD Structured Data Graph (WebPage, Breadcrumbs, FAQPage)
   */
  setSeoData(config: SeoConfig): void {
    const fullTitle = this.formatTitle(config.title, config.url);
    this.titleService.setTitle(fullTitle);

    const description = config.description;
    const baseUrl = this.siteBaseUrl;

    const resolvedUrl = config.url
      ? (config.url.startsWith('http')
          ? config.url
          : `${baseUrl}${config.url.startsWith('/') ? '' : '/'}${config.url}`)
      : baseUrl;

    const resolvedImage = config.image
      ? (config.image.startsWith('http')
          ? config.image
          : `${baseUrl}${config.image.startsWith('/') ? '' : '/'}${config.image}`)
      : this.defaultOgImage;

    // 1. Standard HTML meta
    this.metaService.updateTag({ name: 'description', content: description });
    if (config.keywords && config.keywords.length > 0) {
      this.metaService.updateTag({ name: 'keywords', content: config.keywords.join(', ') });
    }

    // Robots meta tag (supports noindex, follow on 404 and preview pages)
    const robotsContent =
      config.robots || 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
    this.metaService.updateTag({ name: 'robots', content: robotsContent });

    // 2. OpenGraph
    const ogType = config.type || 'website';
    this.metaService.updateTag({ property: 'og:type', content: ogType });
    this.metaService.updateTag({ property: 'og:site_name', content: this.siteConfig.name });
    this.metaService.updateTag({ property: 'og:locale', content: this.siteConfig.locale });
    this.metaService.updateTag({ property: 'og:title', content: fullTitle });
    this.metaService.updateTag({ property: 'og:description', content: description });
    this.metaService.updateTag({ property: 'og:url', content: resolvedUrl });
    this.metaService.updateTag({ property: 'og:image', content: resolvedImage });
    this.metaService.updateTag({ property: 'og:image:secure_url', content: resolvedImage });
    this.metaService.updateTag({ property: 'og:image:type', content: 'image/jpeg' });
    this.metaService.updateTag({ property: 'og:image:width', content: '1200' });
    this.metaService.updateTag({ property: 'og:image:height', content: '630' });
    this.metaService.updateTag({ property: 'og:image:alt', content: config.imageAlt || fullTitle });

    // 3. Twitter / X Cards
    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    if (this.siteConfig.social.twitter) {
      this.metaService.updateTag({ name: 'twitter:site', content: this.siteConfig.social.twitter });
    }
    this.metaService.updateTag({ name: 'twitter:title', content: fullTitle });
    this.metaService.updateTag({ name: 'twitter:description', content: description });
    this.metaService.updateTag({ name: 'twitter:url', content: resolvedUrl });
    this.metaService.updateTag({ name: 'twitter:image', content: resolvedImage });
    this.metaService.updateTag({ name: 'twitter:image:alt', content: config.imageAlt || fullTitle });

    // 4. Canonical link (omit on noindex pages to prevent canonical conflict)
    if (config.robots?.includes('noindex')) {
      this.removeCanonicalLink();
    } else {
      this.updateCanonicalLink(resolvedUrl);
    }

    // 5. Structured Data (JSON-LD)
    if (config.customSchema) {
      this.updateCustomStructuredData(config.customSchema);
    } else {
      this.updateStructuredDataGraph(resolvedUrl, fullTitle, description, config);
    }
  }

  /**
   * Generates Schema.org FAQPage for Answer Engine Optimization (AEO).
   * Directly consumed by Google AI Overviews, Bing Copilot, and voice assistants.
   */
  generateFaqSchema(faqs: FaqItem[]): Record<string, unknown> {
    return {
      '@type': 'FAQPage',
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    };
  }

  /**
   * Generates Schema.org SoftwareApplication for Generative Engine Optimization (GEO).
   */
  generateSoftwareAppSchema(extra?: Record<string, unknown>): Record<string, unknown> {
    return {
      '@type': 'SoftwareApplication',
      name: this.siteConfig.name,
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Any',
      description: this.siteConfig.description,
      url: this.siteConfig.baseUrl,
      softwareVersion: this.siteConfig.version,
      author: {
        '@type': 'Person',
        name: this.siteConfig.author.name,
        url: this.siteConfig.author.url,
      },
      offers: {
        '@type': 'Offer',
        price: '0.00',
        priceCurrency: 'USD',
      },
      ...extra,
    };
  }

  private updateCanonicalLink(url: string): void {
    try {
      if (this.document && this.document.head) {
        let link: HTMLLinkElement | null = this.document.querySelector('link[rel="canonical"]');
        if (!link) {
          link = this.document.createElement('link');
          link.setAttribute('rel', 'canonical');
          this.document.head.appendChild(link);
        }
        link.setAttribute('href', url);
      }
    } catch {
      // Graceful fallback for non-DOM SSR environments
    }
  }

  private removeCanonicalLink(): void {
    try {
      if (this.document && this.document.head) {
        const link: HTMLLinkElement | null = this.document.querySelector('link[rel="canonical"]');
        if (link) {
          link.remove();
        }
      }
    } catch {
      // Graceful fallback for non-DOM SSR environments
    }
  }

  private updateCustomStructuredData(schema: Record<string, unknown>): void {
    try {
      if (!this.document || !this.document.head) return;

      let script: HTMLScriptElement | null = this.document.getElementById('route-schema') as HTMLScriptElement;
      if (!script) {
        script = this.document.createElement('script');
        script.id = 'route-schema';
        script.type = 'application/ld+json';
        this.document.head.appendChild(script);
      }

      script.textContent = JSON.stringify(schema, null, 2);
    } catch {
      // Graceful SSR fallback
    }
  }

  private updateStructuredDataGraph(
    resolvedUrl: string,
    title: string,
    description: string,
    config: SeoConfig
  ): void {
    try {
      if (!this.document || !this.document.head) return;

      let script: HTMLScriptElement | null = this.document.getElementById('route-schema') as HTMLScriptElement;
      if (!script) {
        script = this.document.createElement('script');
        script.id = 'route-schema';
        script.type = 'application/ld+json';
        this.document.head.appendChild(script);
      }

      const isRoot = !config.url || config.url === '/' || config.url === '';
      const graph: Record<string, unknown>[] = [];

      // 1. WebPage Node
      const webPageNode: Record<string, unknown> = {
        '@type': 'WebPage',
        '@id': `${resolvedUrl}#webpage`,
        url: resolvedUrl,
        name: title,
        description: description,
        isPartOf: {
          '@id': `${this.siteBaseUrl}/#website`,
        },
      };

      // 2. Breadcrumbs (if provided or derived)
      if (config.breadcrumbs && config.breadcrumbs.length > 0) {
        webPageNode['breadcrumb'] = {
          '@type': 'BreadcrumbList',
          itemListElement: config.breadcrumbs.map((bc, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: bc.name,
            item: bc.url.startsWith('http') ? bc.url : `${this.siteBaseUrl}${bc.url.startsWith('/') ? '' : '/'}${bc.url}`,
          })),
        };
      } else if (!isRoot && config.url) {
        const pathSegment = config.url.replace(/^\//, '').split('/')[0];
        const pageName = pathSegment
          .split('-')
          .map(w => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' ');

        webPageNode['breadcrumb'] = {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: `${this.siteBaseUrl}/`,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: pageName,
              item: resolvedUrl,
            },
          ],
        };
      }

      graph.push(webPageNode);

      // 3. AEO: FAQPage node if FAQs provided
      if (config.faqs && config.faqs.length > 0) {
        graph.push(this.generateFaqSchema(config.faqs));
      }

      const unifiedSchema: Record<string, unknown> = {
        '@context': 'https://schema.org',
        '@graph': graph,
      };

      script.textContent = JSON.stringify(unifiedSchema, null, 2);
    } catch {
      // Graceful SSR fallback
    }
  }
}
