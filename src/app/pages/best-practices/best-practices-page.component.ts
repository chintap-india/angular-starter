import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { SeoService } from '../../core/services/seo.service';
import { SITE_CONFIG } from '../../core/config/site.config';
import { SITE_CONTENT, PracticeSection } from '../../core/config/site.content';
import { ContactModalService } from '../../core/services/contact-modal.service';

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
  private readonly contactModal = inject(ContactModalService);
  readonly siteConfig = inject(SITE_CONFIG);
  readonly content = inject(SITE_CONTENT);

  copiedId: string | null = null;

  get sections(): PracticeSection[] {
    return this.content.bestPractices.sections;
  }

  copyCode(id: string, code: string): void {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(code);
      this.copiedId = id;
      setTimeout(() => {
        this.copiedId = null;
      }, 2000);
    }
  }

  openContactModal(): void {
    this.contactModal.open({ intent: 'starter-kit', source: 'best-practices' });
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
