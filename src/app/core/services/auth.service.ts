import { Injectable, inject, PLATFORM_ID, signal, computed } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'developer' | 'guest' | 'admin';
  avatarUrl?: string;
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
    // Default local developer session for starter kit preview
    return {
      id: 'dev-1',
      name: 'Developer User',
      email: 'dev@chintap.local',
      role: 'developer',
      avatarUrl: 'images/tech/angular.svg',
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
    const profile: UserProfile = {
      id: netlifyUser.id,
      name: netlifyUser.user_metadata?.full_name || netlifyUser.email.split('@')[0],
      email: netlifyUser.email,
      role: 'developer',
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

  loginAsDeveloper(): void {
    const devUser: UserProfile = {
      id: 'dev-' + Date.now().toString(36),
      name: 'Lead Developer',
      email: 'builder@chintap.dev',
      role: 'developer',
      avatarUrl: 'images/tech/angular.svg',
    };
    this.saveUser(devUser);
  }

  loginAsGuest(): void {
    const guestUser: UserProfile = {
      id: 'guest-' + Date.now().toString(36),
      name: 'Guest Reviewer',
      email: 'guest@chintap.local',
      role: 'guest',
    };
    this.saveUser(guestUser);
  }

  openNetlifyModal(): void {
    if (typeof window !== 'undefined' && window.netlifyIdentity) {
      window.netlifyIdentity.open();
    } else {
      // Mock toggle if Netlify Identity script is not actively loaded
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
      window.netlifyIdentity.logout();
    }
  }
}
