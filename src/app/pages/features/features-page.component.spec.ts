import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { FeaturesPageComponent } from './features-page.component';
import { SeoService } from '../../core/services/seo.service';
import { DEFAULT_SITE_CONFIG, SITE_CONFIG } from '../../core/config/site.config';
import { DEFAULT_SITE_CONTENT, SITE_CONTENT } from '../../core/config/site.content';

describe('FeaturesPageComponent', () => {
  let component: FeaturesPageComponent;
  let fixture: ComponentFixture<FeaturesPageComponent>;
  let seoService: SeoService;

  beforeEach(async () => {
    vi.clearAllMocks();

    await TestBed.configureTestingModule({
      imports: [FeaturesPageComponent],
      providers: [
        provideRouter([
          { path: 'tasks', component: class {} },
          { path: 'best-practices', component: class {} },
        ]),
        provideNoopAnimations(),
        { provide: SITE_CONFIG, useValue: DEFAULT_SITE_CONFIG },
        { provide: SITE_CONTENT, useValue: DEFAULT_SITE_CONTENT },
      ],
    }).compileComponents();

    seoService = TestBed.inject(SeoService);
    vi.spyOn(seoService, 'setSeoData');

    fixture = TestBed.createComponent(FeaturesPageComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should create features page component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should set SEO metadata and schema on initialization', () => {
    fixture.detectChanges();
    expect(seoService.setSeoData).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Features & Architecture',
        url: '/features',
      })
    );
  });

  it('should render the Tasks Module architecture showcase section', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const showcaseSection = compiled.querySelector('#tasks-showcase-title');
    expect(showcaseSection).toBeTruthy();
    expect(showcaseSection?.textContent).toContain('Enterprise Tasks Management Module');

    const tasksLink = compiled.querySelector('a[href="/tasks"]') || compiled.querySelector('a[routerlink="/tasks"]');
    expect(compiled.textContent).toContain('Launch Tasks App');
    expect(compiled.textContent).toContain('Chintap Compact Template UX');
    expect(compiled.textContent).toContain('Fine-Grained Signals Core');
  });

  it('should render the architectural feature stack cards', () => {
    fixture.detectChanges();
    expect(component.features.length).toBeGreaterThan(0);
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Angular 22 Reactive Core');
    expect(compiled.textContent).toContain('Angular Material Design 3');
  });
});
