import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ContentService } from '../../core/services/content.service';
import { ThemeService } from '../../core/services/theme.service';
import { SeoService } from '../../core/services/seo.service';
import { ContactModalService } from '../../core/services/contact-modal.service';
import { NetworkGraphComponent } from '../../shared/components/network-graph/network-graph.component';
import { ExploreNextComponent } from '../../shared/components/explore-next/explore-next.component';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    NetworkGraphComponent,
    ExploreNextComponent
  ],
  templateUrl: './about-page.component.html'
})
export class AboutPageComponent implements OnInit {
  readonly content = inject(ContentService);
  readonly themeService = inject(ThemeService);
  private readonly seo = inject(SeoService);
  private readonly contactModal = inject(ContactModalService);

  openContactModal(intent: string = 'general'): void {
    this.contactModal.open({
      intent,
      source: 'about'
    });
  }

  ngOnInit(): void {
    this.seo.setSeoData({
      title: 'About Chintap | Curious by Nature — Things. Apps. Possibilities.',
      description: 'Chintap is an independent venture exploring ideas, building products, and discovering possibilities across the physical and digital worlds.',
      url: '/about'
    });
  }
}
