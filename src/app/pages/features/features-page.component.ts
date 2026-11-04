import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { SeoService } from '../../core/services/seo.service';
import { SITE_CONFIG } from '../../core/config/site.config';

interface StackFeature {
  title: string;
  category: string;
  version: string;
  icon: string;
  description: string;
  highlights: string[];
}

@Component({
  selector: 'app-features-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
  ],
  templateUrl: './features-page.component.html',
})
export class FeaturesPageComponent implements OnInit {
  private readonly seo = inject(SeoService);
  readonly siteConfig = inject(SITE_CONFIG);

  readonly features: StackFeature[] = [
    {
      title: 'Angular 22 Reactive Core',
      category: 'Framework',
      version: '^22.2.0',
      icon: 'bolt',
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
      icon: 'palette',
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
      icon: 'brush',
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
      icon: 'speed',
      description:
        'Pre-renders every route at build time into pure semantic HTML. Search engines and AI agents read full content without executing client JavaScript.',
      highlights: [
        'Sub-100ms First Contentful Paint (FCP)',
        'Client hydration with event replay (withEventReplay)',
        'Automatic routes discovery via routes.txt',
        'Zero layout shifts (CLS < 0.01)',
      ],
    },
    {
      title: 'Enterprise Security & Edge CDN',
      category: 'Infrastructure',
      version: 'Netlify Edge',
      icon: 'security',
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
      icon: 'verified',
      description:
        'Blazing-fast ESM-native test runner pre-wired with Angular compiler and comprehensive assertions for SEO, AEO schemas, and theme reactivity.',
      highlights: [
        'Sub-2 second full test suite execution',
        'Pre-configured SEO and Schema.org unit assertions',
        'Zero Karma or Webpack configuration overhead',
        'Instant watch mode and CI/CD compatibility',
      ],
    },
  ];

  ngOnInit(): void {
    this.seo.setSeoData({
      title: 'Features & Architecture',
      description:
        'Explore the full architectural stack of Chintap Angular Starter: Angular 22 Signals, Material 3, Tailwind 4, SSG pre-rendering, and Netlify Edge.',
      url: '/features',
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Features', url: '/features' },
      ],
      customSchema: this.seo.generateSoftwareAppSchema({
        name: `${this.siteConfig.name} - Features`,
        featureList: this.features.map(f => `${f.title}: ${f.description}`),
      }),
    });
  }
}
