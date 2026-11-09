import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ContactModalService } from '../../../core/services/contact-modal.service';
import { LegalDialogComponent } from '../../../features/modals/legal-dialog/legal-dialog.component';
import { ContentService } from '../../../core/services/content.service';
import { SITE_CONFIG } from '../../../core/config/site.config';
import { SITE_CONTENT } from '../../../core/config/site.content';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  readonly contentService = inject(ContentService);
  readonly siteConfig = inject(SITE_CONFIG);
  readonly content = inject(SITE_CONTENT);
  private readonly dialog = inject(MatDialog);
  private readonly contactModal = inject(ContactModalService);
  readonly currentYear = new Date().getFullYear();

  openContactDialog(): void {
    this.contactModal.open({ intent: 'general', source: 'footer' });
  }

  openLegal(type: 'privacy' | 'terms'): void {
    const legalData = type === 'privacy'
      ? this.contentService.legal.privacy
      : this.contentService.legal.terms;

    this.dialog.open(LegalDialogComponent, {
      data: legalData,
      width: '100%',
      maxWidth: '680px',
      maxHeight: '90dvh',
      autoFocus: 'first-tabbable'
    });
  }

  async openYouAreHere(): Promise<void> {
    const { YouAreHereDialogComponent } = await import(
      '../../../features/modals/you-are-here-dialog/you-are-here-dialog.component'
    );
    this.dialog.open(YouAreHereDialogComponent, {
      panelClass: ['you-are-here-modal-panel'],
      width: '95vw',
      maxWidth: '920px',
      maxHeight: '92dvh',
      autoFocus: 'first-tabbable'
    });
  }
}
