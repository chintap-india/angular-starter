import { InjectionToken } from '@angular/core';

export interface SiteConfig {
  version: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  baseUrl: string;
  defaultOgImage: string;
  locale: string;
  themeColor: string;
  brand: {
    logoLight: string;
    logoDark: string;
    logoAlt: string;
    favicon: string;
    ogImage: string;
  };
  author: {
    name: string;
    url: string;
    email: string;
  };
  organization: {
    name: string;
    legalName: string;
    url: string;
    logo: string;
    email: string;
    address: {
      streetAddress: string;
      addressLocality: string;
      addressRegion: string;
      postalCode: string;
      addressCountry: string;
    };
    geo: {
      latitude: number;
      longitude: number;
    };
  };
  social: {
    github: string;
    twitter?: string;
    linkedin?: string;
  };
  ai: {
    llmsTxtUrl: string;
    llmsFullTxtUrl: string;
    ardManifestUrl: string;
  };
  features: {
    seo: boolean;
    aeo: boolean;
    llmo: boolean;
    geo: boolean;
    ssr: boolean;
    darkTheme: boolean;
  };
}

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  version: '1.5.8',
  name: 'Chintap Angular Starter',
  shortName: 'Angular Starter',
  tagline: 'SEO, AEO, LLMO, GEO & SSR Ready Starter Kit',
  description:
    'Enterprise-grade Angular 22 starter kit equipped with out-of-the-box best practices for Search Engine Optimization (SEO), Answer Engine Optimization (AEO), Large Language Model Optimization (LLMO), Generative Engine Optimization (GEO), and Static Site Generation (SSG).',
  baseUrl: 'https://chintap-angular-starter.netlify.app',
  defaultOgImage: 'https://chintap-angular-starter.netlify.app/images/chintap-og.jpg',
  locale: 'en_US',
  themeColor: '#18181b',
  brand: {
    logoLight: 'images/chintap-emblem-light.svg',
    logoDark: 'images/chintap-emblem-dark.svg',
    logoAlt: 'Chintap Starter Logo',
    favicon: '/favicon.ico',
    ogImage: 'images/chintap-og.jpg',
  },
  author: {
    name: 'Bharath Chetty',
    url: 'https://github.com/001bharathchetty',
    email: 'hello@chintap.com',
  },
  organization: {
    name: 'Chintap',
    legalName: 'Chintap',
    url: 'https://chintap.com',
    logo: 'https://chintap-angular-starter.netlify.app/images/logo-light.svg',
    email: 'hello@chintap.com',
    address: {
      streetAddress: 'Docking Bay 42, Orion-Cygnus Spur, Starlight Boulevard',
      addressLocality: 'Neo-Bengaluru Outpost',
      addressRegion: 'Quadrant 4, Sol Sector',
      postalCode: 'SOL-560109-GX',
      addressCountry: 'Terra Prime, Milky Way',
    },
    geo: {
      latitude: 12.8767,
      longitude: 77.5387,
    },
  },
  social: {
    github: 'https://github.com/chintap-india/angular-starter',
    twitter: 'https://x.com/chintap',
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

export const SITE_CONFIG = new InjectionToken<SiteConfig>('SITE_CONFIG', {
  providedIn: 'root',
  factory: () => DEFAULT_SITE_CONFIG,
});
