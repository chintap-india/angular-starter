import '@angular/compiler';
import { describe, it, expect, beforeEach } from 'vitest';
import { Injector, runInInjectionContext } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { SeoService } from './seo.service';
import { SITE_CONFIG, DEFAULT_SITE_CONFIG } from '../config/site.config';

describe('SeoService', () => {
  let service: SeoService;
  let currentTitle = '';
  let metaTags: Record<string, string> = {};
  let canonicalHref = '';
  let scriptContent = '';

  beforeEach(() => {
    currentTitle = '';
    metaTags = {};
    canonicalHref = '';
    scriptContent = '';

    const mockTitle = {
      getTitle: () => currentTitle,
      setTitle: (t: string) => {
        currentTitle = t;
      },
    };

    const mockMeta = {
      updateTag: (tag: { name?: string; property?: string; content: string }) => {
        const key = tag.property || tag.name || '';
        metaTags[key] = tag.content;
      },
    };

    const mockDocument = {
      querySelector: (selector: string) => {
        if (selector === 'link[rel="canonical"]') {
          return canonicalHref
            ? {
                setAttribute: (_: string, val: string) => {
                  canonicalHref = val;
                },
                remove: () => {
                  canonicalHref = '';
                },
              }
            : null;
        }
        return null;
      },
      getElementById: (id: string) => {
        if (id === 'route-schema' && scriptContent) {
          return {
            id: 'route-schema',
            type: 'application/ld+json',
            set textContent(val: string) {
              scriptContent = val;
            },
            get textContent() {
              return scriptContent;
            },
          };
        }
        return null;
      },
      createElement: () => ({
        setAttribute: (_: string, val: string) => {
          canonicalHref = val;
        },
        remove: () => {
          canonicalHref = '';
        },
        id: '',
        type: '',
        set textContent(val: string) {
          scriptContent = val;
        },
        get textContent() {
          return scriptContent;
        },
      }),
      head: {
        appendChild: () => {},
      },
    };

    const injector = Injector.create({
      providers: [
        { provide: Title, useValue: mockTitle },
        { provide: Meta, useValue: mockMeta },
        { provide: DOCUMENT, useValue: mockDocument },
        { provide: SITE_CONFIG, useValue: DEFAULT_SITE_CONFIG },
      ],
    });

    service = runInInjectionContext(injector, () => new SeoService());
  });

  describe('formatTitle', () => {
    it('should format homepage title correctly', () => {
      expect(service.formatTitle('Things. Apps. Possibilities.', '/')).toBe(
        'Angular Starter — Things. Apps. Possibilities.'
      );
    });

    it('should format inner page titles correctly without duplicating brand', () => {
      expect(service.formatTitle('About', '/about')).toBe('About — Angular Starter');
      expect(service.formatTitle('Features', '/features')).toBe('Features — Angular Starter');
      expect(service.formatTitle('Best Practices', '/best-practices')).toBe('Best Practices — Angular Starter');
      expect(service.formatTitle("Let's Talk", '/contact')).toBe("Let's Talk — Angular Starter");
    });

    it('should not duplicate brand name if already present in title', () => {
      expect(service.formatTitle('About Chintap', '/about')).toBe('About Chintap');
      expect(service.formatTitle('Angular Starter — High Performance', '/features')).toBe(
        'Angular Starter — High Performance'
      );
    });
  });

  describe('setSeoData', () => {
    it('should update title and meta tags with complete social preview info and canonical URL', () => {
      service.setSeoData({
        title: 'Features',
        description: 'Explore Angular 22 Signals, Material 3, Tailwind 4, and SSG features.',
        url: '/features',
      });

      expect(currentTitle).toBe('Features — Angular Starter');
      expect(metaTags['description']).toBe(
        'Explore Angular 22 Signals, Material 3, Tailwind 4, and SSG features.'
      );
      expect(metaTags['og:title']).toBe('Features — Angular Starter');
      expect(metaTags['og:description']).toBe(
        'Explore Angular 22 Signals, Material 3, Tailwind 4, and SSG features.'
      );
      expect(metaTags['og:url']).toBe('https://angular-starter.chintap.com/features');
      expect(metaTags['og:image']).toBe(
        'https://angular-starter.chintap.com/images/chintap-og.jpg'
      );
      expect(metaTags['twitter:title']).toBe('Features — Angular Starter');
      expect(metaTags['twitter:card']).toBe('summary_large_image');
      expect(canonicalHref).toBe('https://angular-starter.chintap.com/features');
    });

    it('should correctly configure social tags for root homepage', () => {
      service.setSeoData({
        title: 'SEO, AEO, LLMO, GEO & SSR Ready Starter Kit',
        description: 'Starter kit for Angular 22.',
        url: '/',
      });

      expect(currentTitle).toBe('Angular Starter — SEO, AEO, LLMO, GEO & SSR Ready Starter Kit');
      expect(metaTags['og:url']).toBe('https://angular-starter.chintap.com/');
      expect(canonicalHref).toBe('https://angular-starter.chintap.com/');
    });

    it('should set robots meta tag and remove canonical href on noindex pages like 404', () => {
      // First set normal canonical
      service.setSeoData({
        title: 'About',
        description: 'Test page',
        url: '/about',
      });
      expect(canonicalHref).toBe('https://angular-starter.chintap.com/about');
      expect(metaTags['robots']).toContain('index, follow');

      // Now set 404 with noindex, follow
      service.setSeoData({
        title: 'Page Not Found (404)',
        description: 'Not found',
        url: '/404',
        robots: 'noindex, follow',
      });

      expect(metaTags['robots']).toBe('noindex, follow');
      expect(canonicalHref).toBe('');
    });
  });

  describe('AEO & GEO Schema Generation', () => {
    it('should generate valid FAQPage schema for Answer Engine Optimization (AEO)', () => {
      const faqs = [
        {
          question: 'What is AEO in Angular?',
          answer: 'AEO structures content and JSON-LD FAQPage schemas so AI answer engines can directly cite answers.',
        },
      ];

      const schema = service.generateFaqSchema(faqs) as {
        '@type': string;
        mainEntity: Array<{ '@type': string; name: string; acceptedAnswer: { text: string } }>;
      };

      expect(schema['@type']).toBe('FAQPage');
      expect(schema.mainEntity.length).toBe(1);
      expect(schema.mainEntity[0].name).toBe('What is AEO in Angular?');
      expect(schema.mainEntity[0].acceptedAnswer.text).toContain('AEO structures content');
    });

    it('should generate valid SoftwareApplication schema for Generative Engine Optimization (GEO)', () => {
      const appSchema = service.generateSoftwareAppSchema({ version: '1.0.0' }) as {
        '@type': string;
        name: string;
        applicationCategory: string;
        version: string;
      };

      expect(appSchema['@type']).toBe('SoftwareApplication');
      expect(appSchema.name).toBe('Chintap Angular Starter');
      expect(appSchema.applicationCategory).toBe('DeveloperApplication');
      expect(appSchema.version).toBe('1.0.0');
      expect((appSchema as any).softwareVersion).toBe('1.1.0');
    });
  });
});
