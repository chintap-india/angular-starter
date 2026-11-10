import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, ActivatedRoute } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PLATFORM_ID } from '@angular/core';
import { ContactPageComponent } from './contact-page.component';
import { SeoService } from '../../core/services/seo.service';

describe('ContactPageComponent', () => {
  let component: ContactPageComponent;
  let fixture: ComponentFixture<ContactPageComponent>;
  let seoService: SeoService;
  const mockSnackBar = {
    open: vi.fn()
  };

  beforeEach(async () => {
    vi.clearAllMocks();

    await TestBed.configureTestingModule({
      imports: [ContactPageComponent],
      providers: [
        provideRouter([]),
        provideNoopAnimations(),
        { provide: MatSnackBar, useValue: mockSnackBar },
        { provide: PLATFORM_ID, useValue: 'browser' },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParams: {
                intent: 'starter',
                name: 'Developer',
                email: 'dev@example.com',
                message: 'Inquiring about the Angular starter kit architecture.'
              }
            }
          }
        }
      ]
    }).compileComponents();

    seoService = TestBed.inject(SeoService);
    vi.spyOn(seoService, 'setSeoData');

    fixture = TestBed.createComponent(ContactPageComponent);
    component = fixture.componentInstance;
  }, 30000);

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should create contact page component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  }, 15000);

  it('should set SEO metadata on initialization', () => {
    fixture.detectChanges();
    expect(seoService.setSeoData).toHaveBeenCalledWith(
      expect.objectContaining({
        title: expect.stringContaining("Let's Talk"),
        url: '/contact'
      })
    );
  }, 15000);

  it('should parse query parameters into initialData correctly', () => {
    fixture.detectChanges();
    expect(component.initialData.intent).toBe('starter');
    expect(component.initialData.name).toBe('Developer');
    expect(component.initialData.email).toBe('dev@example.com');
    expect(component.initialData.message).toContain('Angular starter kit');
  });

  it('should copy email address to clipboard and show snackbar', async () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock
      }
    });

    fixture.detectChanges();
    await component.copyEmail('hello@chintap.com');

    expect(writeTextMock).toHaveBeenCalledWith('hello@chintap.com');
    expect(mockSnackBar.open).toHaveBeenCalledWith(
      'Copied hello@chintap.com to clipboard',
      'Dismiss',
      expect.any(Object)
    );
  });
});
