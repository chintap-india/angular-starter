import { Component, inject, signal, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { ScrollStrategyOptions } from '@angular/cdk/overlay';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { ContentService } from '../../../core/services/content.service';
import { ThemeService } from '../../../core/services/theme.service';
import { AuthService } from '../../../core/services/auth.service';
import { ContactModalService } from '../../../core/services/contact-modal.service';
import { SITE_CONFIG } from '../../../core/config/site.config';
import { SITE_CONTENT } from '../../../core/config/site.content';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule,
    MatDividerModule,
  ],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  readonly contentService = inject(ContentService);
  readonly themeService = inject(ThemeService);
  readonly authService = inject(AuthService);
  readonly siteConfig = inject(SITE_CONFIG);
  readonly content = inject(SITE_CONTENT);
  private readonly contactModal = inject(ContactModalService);
  private readonly dialog = inject(MatDialog);
  private readonly scrollStrategies = inject(ScrollStrategyOptions);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  readonly mobileMenuOpen = signal<boolean>(false);
  readonly currentUrl = signal<string>(this.router.url || '');

  constructor() {
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(e => {
      this.currentUrl.set(e.urlAfterRedirects || e.url);
    });
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update(v => !v);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  openContactDialog(): void {
    this.contactModal.open({
      intent: 'general',
      source: 'navbar'
    });
  }

  async openYouAreHere(): Promise<void> {
    const triggerEl = (typeof document !== 'undefined' ? document.activeElement : null) as HTMLElement | null;
    const { YouAreHereDialogComponent } = await import(
      '../../../features/modals/you-are-here-dialog/you-are-here-dialog.component'
    );
    const dialogRef = this.dialog.open(YouAreHereDialogComponent, {
      panelClass: ['graph-modal-panel', 'you-are-here-panel'],
      width: '96vw',
      maxWidth: '1040px',
      maxHeight: '94dvh',
      autoFocus: 'first-tabbable',
      restoreFocus: false,
      scrollStrategy: this.scrollStrategies.noop()
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result?.navigated && triggerEl && typeof triggerEl.focus === 'function') {
        triggerEl.focus({ preventScroll: true });
      }
    });
  }
}

