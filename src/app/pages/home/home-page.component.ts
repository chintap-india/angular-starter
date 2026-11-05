import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { SeoService } from '../../core/services/seo.service';
import { ThemeService } from '../../core/services/theme.service';
import { SITE_CONFIG } from '../../core/config/site.config';
import { SITE_CONTENT, PillarCard, FaqItem } from '../../core/config/site.content';
import { ContactModalService } from '../../core/services/contact-modal.service';

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
  readonly content = inject(SITE_CONTENT);
  private readonly seo = inject(SeoService);
  private readonly contactModal = inject(ContactModalService);

  copiedQuickstart = false;

  get pillars(): PillarCard[] {
    return this.content.home.pillars.items;
  }

  get faqs(): FaqItem[] {
    return this.content.home.faqSection.items;
  }

  copyQuickstart(): void {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(this.content.home.hero.terminalQuickstart.command);
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
