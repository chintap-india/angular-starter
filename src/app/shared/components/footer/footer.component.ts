import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ContactDialogComponent } from '../../../features/modals/contact-dialog/contact-dialog.component';
import { LegalDialogComponent } from '../../../features/modals/legal-dialog/legal-dialog.component';
import { ContentService } from '../../../core/services/content.service';
import { SITE_CONFIG } from '../../../core/config/site.config';

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
  private readonly dialog = inject(MatDialog);
  readonly currentYear = new Date().getFullYear();

  openContactDialog(): void {
    this.dialog.open(ContactDialogComponent, {
      width: '100%',
      maxWidth: '560px',
      maxHeight: '92dvh',
      autoFocus: 'first-tabbable'
    });
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
