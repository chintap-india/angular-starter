import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { SeoService } from '../../core/services/seo.service';
import { SITE_CONFIG } from '../../core/config/site.config';
import { SITE_CONTENT, StackFeature } from '../../core/config/site.content';
import { TechLogoComponent } from '../../shared/components/tech-logo/tech-logo.component';

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
    TechLogoComponent,
  ],
  templateUrl: './features-page.component.html',
})
export class FeaturesPageComponent implements OnInit {
  private readonly seo = inject(SeoService);
  readonly siteConfig = inject(SITE_CONFIG);
  readonly content = inject(SITE_CONTENT);

  get features(): StackFeature[] {
    return this.content.features.items;
  }

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
        featureList: this.features.map((f) => `${f.title}: ${f.description}`),
      }),
    });
  }
}
