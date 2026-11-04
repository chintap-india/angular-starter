import { Injectable, signal, effect, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  
  // Theme state: true = dark, false = light
  readonly isDark = signal<boolean>(false);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem('chintap-theme');
      if (saved) {
        this.isDark.set(saved === 'dark');
      } else {
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.isDark.set(prefersDark);
      }

      this.applyTheme(this.isDark());

      // Reactive effect to update DOM and storage
      effect(() => {
        const dark = this.isDark();
        this.applyTheme(dark);
      });
    }
  }

  toggleTheme(): void {
    this.isDark.update(d => !d);
  }

  private applyTheme(dark: boolean): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark');
      localStorage.setItem('chintap-theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('chintap-theme', 'light');
    }
  }
}
