import { describe, it, expect, beforeEach } from 'vitest';
import '@angular/compiler';
import { ExploreNextComponent } from './explore-next.component';
import { ContentService } from '../../../core/services/content.service';

describe('ExploreNextComponent', () => {
  let contentService: ContentService;

  beforeEach(() => {
    contentService = new ContentService();
  });

  it('should have default inputs in sentence case', () => {
    const comp = Object.create(ExploreNextComponent.prototype);
    comp.page = 'home';
    comp.variant = 'contained';
    comp.eyebrow = 'Where to next?';
    comp.heading = 'Continue exploring';
    expect(comp.eyebrow).toBe('Where to next?');
    expect(comp.heading).toBe('Continue exploring');
  });

  it('should return 3 default paths for home page', () => {
    const paths = contentService.getNextPaths('home');
    expect(paths.length).toBe(3);
    expect(paths[0].title).toBe('Features & Stack');
    expect(paths[1].title).toBe('5 Discovery Pillars');
    expect(paths[2].title).toBe('Tasks Management');
  });

  it('should return tailored paths for features page', () => {
    const paths = contentService.getNextPaths('features');
    expect(paths.length).toBe(3);
    expect(paths[0].url).toBe('/best-practices');
    expect(paths[1].url).toBe('/tasks');
    expect(paths[2].url).toBe('/about');
  });

  it('should return valid router links with accessible labels for about page', () => {
    const paths = contentService.getNextPaths('about');
    expect(paths.length).toBe(3);
    expect(paths[0].url).toBe('/features');
    expect(paths[1].url).toBe('/best-practices');
    expect(paths[2].url).toBe('/contact');
  });
});
