import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { ContactSubmissionService, ContactMessagePayload } from './contact-submission.service';

describe('ContactSubmissionService', () => {
  let service: ContactSubmissionService;
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
        ContactSubmissionService,
        { provide: PLATFORM_ID, useValue: 'browser' },
      ],
    });

    service = TestBed.inject(ContactSubmissionService);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should initialize and return empty submissions initially', () => {
    expect(service.getSubmissions()).toEqual([]);
  });

  it('should generate mailto URL with formatted subject and body', () => {
    const payload: ContactMessagePayload = {
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      intent: 'general',
      organization: 'Babbage Engines',
      message: 'Hello world from test'
    };

    const mailto = service.generateMailto(payload);
    expect(mailto).toContain('mailto:hello@chintap.com?subject=');
    expect(mailto).toContain(encodeURIComponent('[GENERAL] Inquiry from Ada Lovelace'));
    expect(mailto).toContain(encodeURIComponent('Message:\nHello world from test'));
  });

  it('should submit successfully to Netlify and mark record as delivered', async () => {
    const fetchSpy = vi.fn().mockResolvedValue({ ok: true, status: 200 });
    vi.stubGlobal('fetch', fetchSpy);

    const payload: ContactMessagePayload = {
      name: 'Grace Hopper',
      email: 'grace@example.com',
      message: 'Testing delivery flow'
    };

    const result = await service.submit(payload, 'unit-test');

    expect(result.success).toBe(true);
    expect(result.status).toBe('delivered');
    expect(result.record.name).toBe('Grace Hopper');
    expect(result.record.status).toBe('delivered');
    expect(result.record.source).toBe('unit-test');

    const saved = service.getSubmissions();
    expect(saved.length).toBe(1);
    expect(saved[0].id).toBe(result.record.id);
    expect(saved[0].status).toBe('delivered');
  });

  it('should fallback to saved_locally when network/fetch fails, preserving the note', async () => {
    const fetchSpy = vi.fn().mockRejectedValue(new Error('Network connection failed'));
    vi.stubGlobal('fetch', fetchSpy);

    const payload: ContactMessagePayload = {
      name: 'Alan Turing',
      email: 'alan@example.com',
      message: 'Network offline simulation'
    };

    const result = await service.submit(payload, 'offline-test');

    expect(result.success).toBe(false);
    expect(result.status).toBe('saved_locally');
    expect(result.errorMessage).toContain('Network connection failed');
    expect(result.mailtoUrl).toContain('mailto:hello@chintap.com');

    // Verify record was still saved in localStorage
    const saved = service.getSubmissions();
    expect(saved.length).toBe(1);
    expect(saved[0].name).toBe('Alan Turing');
    expect(saved[0].status).toBe('saved_locally');
    expect(saved[0].error).toContain('Network connection failed');
  });
});
