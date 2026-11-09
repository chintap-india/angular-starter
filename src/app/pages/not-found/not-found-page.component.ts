import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContentService } from '../../core/services/content.service';
import { SeoService } from '../../core/services/seo.service';
import { ContactSubmissionService } from '../../core/services/contact-submission.service';
import { ExploreNextComponent } from '../../shared/components/explore-next/explore-next.component';
import { DinoGameComponent } from '../../shared/components/dino-game/dino-game.component';

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    ExploreNextComponent,
    DinoGameComponent
  ],
  templateUrl: './not-found-page.component.html'
})
export class NotFoundPageComponent implements OnInit {
  @ViewChild(DinoGameComponent) dinoGame?: DinoGameComponent;

  readonly content = inject(ContentService);
  private readonly seo = inject(SeoService);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);
  private readonly contactSubmission = inject(ContactSubmissionService);

  readonly attemptedPath = signal<string>('/unknown');
  readonly isReporting = signal<boolean>(false);
  readonly reported = signal<boolean>(false);
  readonly activeCardView = signal<'game'>('game');

  setCardView(view: string = 'game'): void {
    // Retained for backwards compatibility
    this.activeCardView.set('game');
  }

  playGame(): void {
    if (this.dinoGame) {
      if (this.dinoGame.gameState() === 'idle') {
        this.dinoGame.startGame();
      } else if (this.dinoGame.gameState() === 'gameover') {
        this.dinoGame.restartGame();
      } else if (this.dinoGame.gameState() === 'paused') {
        this.dinoGame.togglePause();
      } else {
        this.dinoGame.jump();
      }
    }
    if (typeof document !== 'undefined') {
      const stage = document.getElementById('chinosaur-stage');
      stage?.scrollIntoView?.({ behavior: 'smooth', block: 'nearest' });
    }
  }

  ngOnInit(): void {
    let path = this.router.url;
    if ((!path || path === '/' || path === '/404') && typeof window !== 'undefined' && window.location?.pathname) {
      path = window.location.pathname;
    }
    this.attemptedPath.set(path || '/unknown');

    this.seo.setSeoData({
      title: 'Page Not Found (404) | Chintap',
      description: "We couldn't find the page you were looking for. The link might be broken, or the page may have moved.",
      url: '/404',
      robots: 'noindex, follow'
    });
  }

  get contactQueryParams(): Record<string, string> {
    return {
      intent: 'issue',
      route: this.attemptedPath(),
      email: 'hello@chintap.com',
      message: `Reporting broken or missing route: ${this.attemptedPath()}`
    };
  }

  async reportQuickly(): Promise<void> {
    if (this.isReporting() || this.reported()) return;

    this.isReporting.set(true);

    const referrer = typeof document !== 'undefined' ? document.referrer || 'Direct' : 'Unknown';
    const payload = {
      name: 'Chintap Visitor (404 Report)',
      email: 'hello@chintap.com',
      organization: '404 Auto-Report',
      intent: 'issue',
      message: `Automatic 404 report for missing route: ${this.attemptedPath()} | Referrer: ${referrer}`
    };

    try {
      const result = await this.contactSubmission.submit(payload, '404-page');
      this.reported.set(true);
      const msg = result.status === 'delivered'
        ? `Report received for ${this.attemptedPath()}! Thank you for letting us know.`
        : `Report saved locally for ${this.attemptedPath()}. Thank you!`;
      this.snackBar.open(msg, 'Dismiss', {
        duration: 6000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    } catch (err) {
      console.warn('404 report error:', err);
      this.reported.set(true);
      this.snackBar.open(
        `Report noted for ${this.attemptedPath()}. Thank you!`,
        'Dismiss',
        {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        }
      );
    } finally {
      this.isReporting.set(false);
    }
  }
}
