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
      question: 'What is the purpose of this Angular starter kit?',
      answer:
        'Chintap Angular Starter provides developers with a production-ready Angular 22 template equipped with out-of-the-box best practices for SEO, AEO, LLMO, GEO, and SSR/SSG. It eliminates boilerplate and ensures your app ranks in both traditional search engines and AI generative engines.',
    },
    {
      question: 'How does AEO (Answer Engine Optimization) work in this starter kit?',
      answer:
        'AEO optimizes content so AI answer engines (Google AI Overviews, Bing Copilot, voice assistants) can extract direct answers. The starter kit structures content into clear Q&A pairs and automatically injects Schema.org FAQPage JSON-LD into the pre-rendered HTML DOM.',
    },
    {
      question: 'What is LLMO and why is /llms.txt included?',
      answer:
        'LLMO (Large Language Model Optimization) provides machine-readable representations of your application. The /llms.txt and /llms-full.txt files adhere to the official llmstxt.org specification, allowing AI crawlers and RAG pipelines to read full documentation without executing JavaScript.',
    },
    {
      question: 'How do I customize the starter kit for my own project?',
      answer:
        'All global parameters (brand name, description, canonical domain, social handles, author, address, geo-coordinates) are centralized in src/app/core/config/site.config.ts. Updating this single file propagates throughout SEO tags, JSON-LD graphs, sitemaps, and machine-readable manifests.',
    },
    {
      question: 'How does SSG pre-rendering improve performance and SEO?',
      answer:
        'Angular 22 SSG pre-renders all routes into pure static semantic HTML at build time. When web crawlers or users request a page, they receive fully rendered content with sub-100ms First Contentful Paint, while client hydration seamlessly attaches event listeners.',
    },
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
