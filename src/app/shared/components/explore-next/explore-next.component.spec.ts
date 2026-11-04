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
    expect(paths[0].title).toBe('What we do');
    expect(paths[1].title).toBe('How we work');
    expect(paths[2].title).toBe('Explorations');
  });

  it('should return tailored paths for what-we-do page', () => {
    const paths = contentService.getNextPaths('what-we-do');
    expect(paths.length).toBe(3);
    expect(paths[0].title).toBe('How we work');
    expect(paths[1].title).toBe('Explorations');
    expect(paths[2].title).toBe('Partners');
  });

  it('should return valid router links with accessible labels for how-we-work', () => {
    const paths = contentService.getNextPaths('how-we-work');
    expect(paths.length).toBe(3);
    expect(paths[0].url).toBe('/building-teams');
    expect(paths[1].url).toBe('/what-we-do');
    expect(paths[2].url).toBe('/explorations');
  });
});
