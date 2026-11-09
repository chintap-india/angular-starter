import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { routes } from './app.routes';

/**
 * Determines whether Angular client hydration should be active.
 * - On the server (SSG prerender): Always true, serializing state & ngh annotations.
 * - In the browser: True only if the server response provided serialized hydration data
 *   (ng-state element or [ngh] attributes).
 *   This avoids NG0505 errors during client-only development (e.g. `ng serve` with ssr: false).
 */
export function isHydrationAvailable(): boolean {
  if (typeof document === 'undefined') {
    return true;
  }
  return !!document.getElementById('ng-state') || !!document.querySelector('[ngh]');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      })
    ),
    ...(isHydrationAvailable() ? [provideClientHydration(withEventReplay())] : []),
    provideAnimationsAsync(),
  ],
};
