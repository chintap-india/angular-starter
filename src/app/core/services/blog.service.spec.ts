import { describe, it, expect, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { BlogService } from './blog.service';

describe('BlogService', () => {
  let service: BlogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BlogService,
        { provide: PLATFORM_ID, useValue: 'server' },
      ],
    });
    service = TestBed.inject(BlogService);
  });

  it('should initialize with seeded blog posts', () => {
    expect(service.posts().length).toBeGreaterThanOrEqual(3);
    expect(service.featuredPost()).toBeTruthy();
  });

  it('should compute available categories including All', () => {
    const cats = service.categories();
    expect(cats).toContain('All');
    expect(cats).toContain('Signals');
    expect(cats).toContain('Architecture');
  });

  it('should retrieve a blog post by slug', async () => {
    const post = await service.getPostBySlug('signals-reactivity-in-angular-22');
    expect(post).toBeTruthy();
    expect(post?.title).toContain('Fine-Grained Signals Reactivity');
    expect(post?.body).toContain('Angular\'s reactivity primitives');
  });

  it('should return undefined for non-existent slug', async () => {
    const post = await service.getPostBySlug('unknown-post-slug');
    expect(post).toBeUndefined();
  });

  it('should calculate adjacent posts correctly', () => {
    const secondPost = service.posts()[1];
    const adjacent = service.getAdjacentPosts(secondPost.slug);
    expect(adjacent.prev).toBeDefined();
    expect(adjacent.next).toBeDefined();
  });

  it('should filter posts by search query and category', () => {
    const searchResults = service.filterPosts({ searchQuery: 'Signals' });
    expect(searchResults.length).toBeGreaterThan(0);
    expect(searchResults.every(p => 
      p.title.includes('Signals') || 
      p.summary.includes('Signals') || 
      p.tags.includes('Signals')
    )).toBe(true);

    const categoryResults = service.filterPosts({ category: 'Signals' });
    expect(categoryResults.every(p => p.category === 'Signals')).toBe(true);
  });
});
