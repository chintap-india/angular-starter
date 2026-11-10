import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { AuthService, UserProfile } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let mockStorage: Record<string, string> = {};

  beforeEach(() => {
    mockStorage = {};
    vi.stubGlobal('localStorage', {
      getItem: (key: string) => mockStorage[key] || null,
      setItem: (key: string, val: string) => {
        mockStorage[key] = val;
      },
      removeItem: (key: string) => {
        delete mockStorage[key];
      },
      clear: () => {
        mockStorage = {};
      },
    });

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: PLATFORM_ID, useValue: 'browser' },
      ],
    });

    service = TestBed.inject(AuthService);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should initialize with default lead developer profile', () => {
    const user = service.currentUser();
    expect(user).toBeTruthy();
    expect(user?.name).toBe('Lead Developer');
    expect(user?.role).toBe('developer');
    expect(service.isAuthenticated()).toBe(true);
  });

  it('should switch role to guest reviewer', () => {
    service.loginAsGuest();
    const user = service.currentUser();
    expect(user?.role).toBe('guest');
    expect(user?.name).toBe('Guest Reviewer');
    expect(service.isAuthenticated()).toBe(true);
  });

  it('should switch role back to lead developer', () => {
    service.loginAsGuest();
    expect(service.currentUser()?.role).toBe('guest');

    service.loginAsDeveloper();
    expect(service.currentUser()?.role).toBe('developer');
    expect(service.currentUser()?.name).toBe('Lead Developer');
  });

  it('should login with a custom user profile and persist to storage', () => {
    service.loginWithCustomUser('Custom Engineer', 'engineer@company.com', 'developer');
    expect(service.currentUser()?.name).toBe('Custom Engineer');
    expect(service.currentUser()?.email).toBe('engineer@company.com');
    expect(mockStorage['chintap_auth_profile_v1']).toContain('engineer@company.com');
  });

  it('should clear user profile on logout', () => {
    service.logout();
    expect(service.currentUser()).toBeNull();
    expect(service.isAuthenticated()).toBe(false);
    expect(mockStorage['chintap_auth_profile_v1']).toBeUndefined();
  });

  it('should trigger Google OAuth via Netlify Identity or fallback', () => {
    const mockNetlify = {
      open: vi.fn(),
    };
    (window as any).netlifyIdentity = mockNetlify;

    service.loginWithGoogle();
    expect(mockNetlify.open).toHaveBeenCalledWith('login');

    delete (window as any).netlifyIdentity;
  });

  it('should fallback to mock Google user when Netlify Identity widget is absent', () => {
    delete (window as any).netlifyIdentity;
    service.logout();
    service.loginWithGoogle();
    expect(service.currentUser()?.provider).toBe('google');
    expect(service.currentUser()?.email).toContain('gmail.com');
  });
});
