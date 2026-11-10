import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { BlogPageComponent } from './blog-page.component';
import { BlogService } from '../../core/services/blog.service';
import { SeoService } from '../../core/services/seo.service';

describe('BlogPageComponent', () => {
  let component: BlogPageComponent;
  let fixture: ComponentFixture<BlogPageComponent>;
  let seoService: SeoService;
  let blogService: BlogService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogPageComponent],
      providers: [
        provideRouter([]),
        BlogService,
        SeoService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BlogPageComponent);
    component = fixture.componentInstance;
    seoService = TestBed.inject(SeoService);
    blogService = TestBed.inject(BlogService);
    vi.spyOn(seoService, 'setSeoData');
    fixture.detectChanges();
  });

  it('should create blog page component', () => {
    expect(component).toBeTruthy();
  });

  it('should set SEO metadata on initialization', () => {
    expect(seoService.setSeoData).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Engineering & Architecture Blog',
        url: '/blog',
      })
    );
  });

  it('should display posts and compute categories', () => {
    expect(component.categories().length).toBeGreaterThan(1);
    expect(component.filteredPosts().length).toBeGreaterThanOrEqual(3);
  });

  it('should filter posts when category changes', () => {
    component.setCategory('Signals');
    fixture.detectChanges();
    expect(component.filteredPosts().every(p => p.category === 'Signals')).toBe(true);
  });

  it('should filter posts by search query', () => {
    component.searchQuery.set('Signals');
    fixture.detectChanges();
    expect(component.filteredPosts().length).toBeGreaterThan(0);
    expect(component.isSearchingOrFiltered()).toBe(true);
  });

  it('should reset filters on clearFilters()', () => {
    component.setCategory('Signals');
    component.searchQuery.set('Reactivity');
    expect(component.isSearchingOrFiltered()).toBe(true);

    component.clearFilters();
    expect(component.selectedCategory()).toBe('All');
    expect(component.searchQuery()).toBe('');
    expect(component.isSearchingOrFiltered()).toBe(false);
  });
});
