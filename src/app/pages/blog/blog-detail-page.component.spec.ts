import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, ActivatedRoute, convertToParamMap } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { BlogDetailPageComponent } from './blog-detail-page.component';
import { BlogService } from '../../core/services/blog.service';
import { SeoService } from '../../core/services/seo.service';

describe('BlogDetailPageComponent', () => {
  let component: BlogDetailPageComponent;
  let fixture: ComponentFixture<BlogDetailPageComponent>;
  let seoService: SeoService;
  let paramMap$: BehaviorSubject<any>;

  beforeEach(async () => {
    paramMap$ = new BehaviorSubject(
      convertToParamMap({ slug: 'signals-reactivity-in-angular-22' })
    );

    await TestBed.configureTestingModule({
      imports: [BlogDetailPageComponent],
      providers: [
        provideRouter([]),
        BlogService,
        SeoService,
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: paramMap$.asObservable(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BlogDetailPageComponent);
    component = fixture.componentInstance;
    seoService = TestBed.inject(SeoService);
    vi.spyOn(seoService, 'setSeoData');
    fixture.detectChanges();
  });

  it('should create blog detail page component', () => {
    expect(component).toBeTruthy();
  });

  it('should load post by slug and set SEO metadata', async () => {
    // Wait for async loadPost to finish
    await fixture.whenStable();
    fixture.detectChanges();

    expect(component.post()).toBeTruthy();
    expect(component.post()?.slug).toBe('signals-reactivity-in-angular-22');
    expect(seoService.setSeoData).toHaveBeenCalledWith(
      expect.objectContaining({
        title: expect.stringContaining('Fine-Grained Signals Reactivity'),
        type: 'article',
      })
    );
  });

  it('should render 404 state when slug is not found', async () => {
    paramMap$.next(convertToParamMap({ slug: 'non-existent-article' }));
    await fixture.whenStable();
    fixture.detectChanges();

    expect(component.post()).toBeNull();
    expect(seoService.setSeoData).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Article Not Found',
      })
    );
  });
});
