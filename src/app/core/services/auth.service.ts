import { Injectable, inject, PLATFORM_ID, signal, computed } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'developer' | 'guest' | 'admin';
  avatarUrl?: string;
  provider?: 'netlify' | 'google' | 'local';
}

declare global {
  interface Window {
    netlifyIdentity?: any;
  }
}

const AUTH_STORAGE_KEY = 'chintap_auth_profile_v1';

/**
 * AuthService — 100% Free-Tier & Local-First Authentication.
 *
 * Designed with a ZERO-SUBSCRIPTION policy:
 * - Default: Local browser state via localStorage with zero external network requests.
 * - Optional: Netlify Identity integration stays strictly within Netlify's free tier
 *   (up to 1,000 active users/month without any paid add-ons or credit cards).
 * - External OAuth: Supports Google OAuth and email/password signup via Netlify Identity.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly platformId = inject(PLATFORM_ID);

  readonly currentUser = signal<UserProfile | null>(this.getInitialUser());
  readonly isAuthenticated = computed(() => this.currentUser() !== null);
  readonly isNetlifyIdentityAvailable = signal<boolean>(false);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.initNetlifyIdentity();
    }
  }

  private getInitialUser(): UserProfile | null {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const stored = localStorage.getItem(AUTH_STORAGE_KEY);
        if (stored) {
          return JSON.parse(stored);
        }
      } catch (e) {
        console.warn('Auth profile storage read failed:', e);
      }
    }
    // Default starter developer session
    return {
      id: 'dev-1',
      name: 'Lead Developer',
      email: 'builder@chintap.dev',
      role: 'developer',
      avatarUrl: 'images/tech/angular.svg',
      provider: 'local',
    };
  }

  private initNetlifyIdentity(): void {
    if (typeof window !== 'undefined' && window.netlifyIdentity) {
      this.isNetlifyIdentityAvailable.set(true);
      window.netlifyIdentity.on('init', (user: any) => {
        if (user) {
          this.setUserFromNetlify(user);
        }
      });
      window.netlifyIdentity.on('login', (user: any) => {
        this.setUserFromNetlify(user);
        window.netlifyIdentity.close();
      });
      window.netlifyIdentity.on('logout', () => {
        this.logout();
      });
    }
  }

  private setUserFromNetlify(netlifyUser: any): void {
    const provider = netlifyUser.app_metadata?.provider || 'netlify';
    const profile: UserProfile = {
      id: netlifyUser.id,
      name: netlifyUser.user_metadata?.full_name || netlifyUser.email.split('@')[0],
      email: netlifyUser.email,
      role: 'developer',
      avatarUrl: netlifyUser.user_metadata?.avatar_url,
      provider: provider === 'google' ? 'google' : 'netlify',
    };
    this.saveUser(profile);
  }

  private saveUser(user: UserProfile | null): void {
    this.currentUser.set(user);
    if (isPlatformBrowser(this.platformId)) {
      try {
        if (user) {
          localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
        } else {
          localStorage.removeItem(AUTH_STORAGE_KEY);
        }
      } catch (e) {
        console.warn('Auth storage write failed:', e);
      }
    }
  }

  loginWithGoogle(): void {
    if (typeof window !== 'undefined' && window.netlifyIdentity) {
      // Trigger Netlify Identity modal on login tab
      window.netlifyIdentity.open('login');
    } else {
      // Offline / Localhost Google Simulation for immediate developer evaluation
      const googleUser: UserProfile = {
        id: 'google-' + Date.now().toString(36),
        name: 'Alex Developer',
        email: 'alex.developer@gmail.com',
        role: 'developer',
        avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=alex.developer',
        provider: 'google',
      };
      this.saveUser(googleUser);
    }
  }

  loginWithNetlify(): void {
    if (typeof window !== 'undefined' && window.netlifyIdentity) {
      window.netlifyIdentity.open('login');
    } else {
      this.loginAsDeveloper();
    }
  }

  loginAsDeveloper(): void {
    const devUser: UserProfile = {
      id: 'dev-' + Date.now().toString(36),
      name: 'Lead Developer',
      email: 'builder@chintap.dev',
      role: 'developer',
      avatarUrl: 'images/tech/angular.svg',
      provider: 'local',
    };
    this.saveUser(devUser);
  }

  loginAsGuest(): void {
    const guestUser: UserProfile = {
      id: 'guest-' + Date.now().toString(36),
      name: 'Guest Reviewer',
      email: 'guest@chintap.local',
      role: 'guest',
      avatarUrl: 'https://api.dicebear.com/7.x/identicon/svg?seed=guest',
      provider: 'local',
    };
    this.saveUser(guestUser);
  }

  loginWithCustomUser(name: string, email: string, role: 'developer' | 'guest' | 'admin' = 'developer'): void {
    const customUser: UserProfile = {
      id: 'usr-' + Date.now().toString(36),
      name: name.trim() || 'Team Member',
      email: email.trim() || 'user@chintap.dev',
      role,
      avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name || email)}`,
      provider: 'local',
    };
    this.saveUser(customUser);
  }

  openNetlifyModal(): void {
    if (typeof window !== 'undefined' && window.netlifyIdentity) {
      window.netlifyIdentity.open();
    } else {
      if (this.isAuthenticated()) {
        this.logout();
      } else {
        this.loginAsDeveloper();
      }
    }
  }

  logout(): void {
    this.saveUser(null);
    if (typeof window !== 'undefined' && window.netlifyIdentity) {
      try {
        window.netlifyIdentity.logout();
      } catch (e) {
        console.warn('Netlify identity logout error:', e);
      }
    }
  }
}
