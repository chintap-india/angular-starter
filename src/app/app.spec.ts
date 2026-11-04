import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideRouter, Router, NavigationStart, NavigationEnd } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { App } from './app';
import { routes } from './app.routes';
import { DEFAULT_SITE_CONFIG, SITE_CONFIG } from './core/config/site.config';
import { ContentService } from './core/services/content.service';

describe('App Root Component & Starter Architecture', () => {
  let fixture: ComponentFixture<App>;
  let app: App;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter(routes),
        provideNoopAnimations(),
        { provide: SITE_CONFIG, useValue: DEFAULT_SITE_CONFIG }
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(App);
    app = fixture.componentInstance;
  });

  it('should create the App root component', () => {
    expect(app).toBeTruthy();
    expect(app.isNavigating()).toBe(false);
  });

  it('should manage isNavigating signal on router lifecycle events', () => {
    vi.useFakeTimers();
    // Initial state
    expect(app.isNavigating()).toBe(false);

    // Simulate navigation start
    (router.events as any).next(new NavigationStart(1, '/features'));
    expect(app.isNavigating()).toBe(true);

    // Simulate navigation end
    (router.events as any).next(new NavigationEnd(1, '/features', '/features'));
    expect(app.isNavigating()).toBe(true); // Should stay true during the 250ms spinner smoothing

    vi.advanceTimersByTime(260);
    expect(app.isNavigating()).toBe(false);
    vi.useRealTimers();
  });

  describe('Centralized Site Config (SITE_CONFIG)', () => {
    it('should have valid starter kit defaults configured', () => {
      expect(DEFAULT_SITE_CONFIG.name).toBe('Chintap Angular Starter');
      expect(DEFAULT_SITE_CONFIG.baseUrl).toBe('https://angular-starter.chintap.com');
      expect(DEFAULT_SITE_CONFIG.author.name).toBe('Bharath Chetty');
    });

    it('should define social and machine-readable AI metadata endpoints', () => {
      expect(DEFAULT_SITE_CONFIG.social.github).toContain('github.com');
      expect(DEFAULT_SITE_CONFIG.ai.llmsTxtUrl).toBe('/llms.txt');
      expect(DEFAULT_SITE_CONFIG.ai.llmsFullTxtUrl).toBe('/llms-full.txt');
      expect(DEFAULT_SITE_CONFIG.ai.ardManifestUrl).toBe('/.well-known/ard.json');
    });

    it('should define geographical and physical coordinates for GEO / Knowledge Graph', () => {
      expect(DEFAULT_SITE_CONFIG.organization.geo.latitude).toBeCloseTo(12.87, 1);
      expect(DEFAULT_SITE_CONFIG.organization.geo.longitude).toBeCloseTo(77.53, 1);
      expect(DEFAULT_SITE_CONFIG.organization.address.addressCountry).toBe('IN');
    });
  });

  describe('Application Routes', () => {
    it('should define core starter routes: home, features, best-practices, about, contact, 404', () => {
      const paths = routes.map(r => r.path);
      expect(paths).toContain('');
      expect(paths).toContain('features');
      expect(paths).toContain('best-practices');
      expect(paths).toContain('about');
      expect(paths).toContain('contact');
      expect(paths).toContain('404');
      expect(paths).toContain('**');
    });
  });
});
