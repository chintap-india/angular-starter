import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { isHydrationAvailable, appConfig } from './app.config';

describe('appConfig & isHydrationAvailable', () => {
  let createdElements: HTMLElement[] = [];

  afterEach(() => {
    createdElements.forEach((el) => el.remove());
    createdElements = [];
  });

  it('should return false in browser when neither ng-state nor [ngh] is present', () => {
    // In typical test environment without SSR markers
    expect(isHydrationAvailable()).toBe(false);
  });

  it('should return true when ng-state element exists in document', () => {
    const script = document.createElement('script');
    script.id = 'ng-state';
    document.body.appendChild(script);
    createdElements.push(script);

    expect(isHydrationAvailable()).toBe(true);
  });

  it('should return true when [ngh] attribute exists in document', () => {
    const el = document.createElement('div');
    el.setAttribute('ngh', '0');
    document.body.appendChild(el);
    createdElements.push(el);

    expect(isHydrationAvailable()).toBe(true);
  });

  it('should provide application config with routing and animations', () => {
    expect(appConfig).toBeDefined();
    expect(appConfig.providers).toBeDefined();
    expect(appConfig.providers.length).toBeGreaterThan(0);
  });
});
