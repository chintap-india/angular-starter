import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotFoundPageComponent } from './not-found-page.component';
import { SeoService } from '../../core/services/seo.service';

describe('NotFoundPageComponent', () => {
  let component: NotFoundPageComponent;
  let fixture: ComponentFixture<NotFoundPageComponent>;
  let seoService: SeoService;
  const mockSnackBar = {
    open: vi.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotFoundPageComponent],
      providers: [
        provideRouter([]),
        { provide: MatSnackBar, useValue: mockSnackBar }
      ]
    }).compileComponents();

    seoService = TestBed.inject(SeoService);
    vi.spyOn(seoService, 'setSeoData');

    fixture = TestBed.createComponent(NotFoundPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create not-found page component', () => {
    expect(component).toBeTruthy();
  });

  it('should set SEO data on initialization', () => {
    expect(seoService.setSeoData).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Page Not Found (404) | Chintap',
        url: '/404'
      })
    );
  });

  it('should capture attempted path and build contact query parameters', () => {
    component.attemptedPath.set('/invalid-route-xyz');
    const params = component.contactQueryParams;

    expect(params['intent']).toBe('issue');
    expect(params['route']).toBe('/invalid-route-xyz');
    expect(params['email']).toBe('hello@chintap.com');
    expect(params['message']).toContain('/invalid-route-xyz');
  });

  it('should render 404 heading and attempted path in template', () => {
    component.attemptedPath.set('/broken-test-link');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('This path hasn’t taken shape.');
    expect(compiled.textContent).toContain('/broken-test-link');
  });

  it('should execute reportQuickly and trigger snackbar confirmation', async () => {
    const fetchSpy = vi.fn().mockResolvedValue({ ok: true, status: 200 });
    vi.stubGlobal('fetch', fetchSpy);

    component.attemptedPath.set('/test-404-route');
    await component.reportQuickly();

    expect(fetchSpy).toHaveBeenCalled();
    expect(component.reported()).toBe(true);
    expect(mockSnackBar.open).toHaveBeenCalledWith(
      expect.stringContaining('/test-404-route'),
      'Dismiss',
      expect.any(Object)
    );
  });

  it('should render Chin-o-saur dino game directly as primary interactive 404 stage without signal diagram', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-dino-game')).toBeTruthy();
    expect(compiled.querySelector('#chinosaur-stage')).toBeTruthy();
    expect(compiled.querySelector('svg.network-graph-svg')).toBeFalsy();
  });

  it('should delegate playGame action to start or jump the dino runner', () => {
    const startSpy = vi.fn();
    const jumpSpy = vi.fn();

    // With idle state
    component.dinoGame = {
      gameState: () => 'idle',
      startGame: startSpy,
      restartGame: vi.fn(),
      togglePause: vi.fn(),
      jump: jumpSpy
    } as any;

    component.playGame();
    expect(startSpy).toHaveBeenCalled();

    // With playing state
    component.dinoGame = {
      gameState: () => 'playing',
      startGame: startSpy,
      restartGame: vi.fn(),
      togglePause: vi.fn(),
      jump: jumpSpy
    } as any;

    component.playGame();
    expect(jumpSpy).toHaveBeenCalled();
  });

  it('should render play 404 runner CTA button in action cluster', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const playButtons = Array.from(compiled.querySelectorAll('button'));
    const runnerBtn = playButtons.find(b => b.textContent?.includes('Play 404 Runner'));
    expect(runnerBtn).toBeTruthy();
  });
});
