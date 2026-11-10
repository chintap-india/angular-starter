import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router, NavigationEnd } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar.component';
import { DEFAULT_SITE_CONFIG, SITE_CONFIG } from '../../../core/config/site.config';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [
        provideRouter([
          { path: '', component: class {} },
          { path: 'features', component: class {} },
          { path: 'tasks', component: class {} },
          { path: 'best-practices', component: class {} },
          { path: 'about', component: class {} },
          { path: 'contact', component: class {} }
        ]),
        provideNoopAnimations(),
        { provide: SITE_CONFIG, useValue: DEFAULT_SITE_CONFIG }
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should create navbar component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render primary navigation links', () => {
    fixture.detectChanges();
    const nav = fixture.nativeElement.querySelector('nav');
    expect(nav).toBeTruthy();

    const links = Array.from(nav.querySelectorAll('a')).map((a: any) => a.getAttribute('routerLink') || a.getAttribute('href'));
    expect(links).toContain('/');
    expect(links).toContain('/features');
    expect(links).toContain('/tasks');
    expect(links).toContain('/best-practices');
    expect(links).toContain('/about');
    expect(links).toContain('/contact');
  });

  it('should toggle mobile menu open and closed', () => {
    expect(component.mobileMenuOpen()).toBe(false);
    component.toggleMobileMenu();
    expect(component.mobileMenuOpen()).toBe(true);
    component.closeMobileMenu();
    expect(component.mobileMenuOpen()).toBe(false);
  });

  it('should update currentUrl on NavigationEnd event', () => {
    expect(component.currentUrl()).toBe('/');
    (router.events as any).next(new NavigationEnd(1, '/features', '/features'));
    expect(component.currentUrl()).toBe('/features');
  });
});
