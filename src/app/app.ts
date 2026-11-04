import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ContentService } from './core/services/content.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  readonly contentService = inject(ContentService);
  private readonly router = inject(Router);
  readonly isNavigating = signal(false);
  private navTimer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.navTimer) {
          clearTimeout(this.navTimer);
          this.navTimer = null;
        }
        this.isNavigating.set(true);
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        // Guarantee the spinner is rendered smoothly for at least 250ms so page transitions provide clear feedback
        this.navTimer = setTimeout(() => {
          this.isNavigating.set(false);
          this.navTimer = null;
        }, 250);
      }
    });
  }
}
