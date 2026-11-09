import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface ContactMessagePayload {
  name: string;
  email: string;
  message: string;
  intent?: string;
  organization?: string;
  source?: string;
}

export interface ContactSubmissionRecord extends ContactMessagePayload {
  id: string;
  timestamp: string;
  status: 'delivered' | 'saved_locally';
  error?: string;
}

export interface SubmissionResult {
  success: boolean;
  status: 'delivered' | 'saved_locally';
  record: ContactSubmissionRecord;
  mailtoUrl: string;
  errorMessage?: string;
}

const STORAGE_KEY = 'chintap_contact_submissions';
const DEFAULT_RECIPIENT = 'hello@chintap.com';

@Injectable({ providedIn: 'root' })
export class ContactSubmissionService {
  private readonly platformId = inject(PLATFORM_ID);

  /**
   * Generates a unique submission identifier.
   */
  private generateId(): string {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    return 'sub_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
  }

  /**
   * Reads all locally persisted contact submissions.
   */
  getSubmissions(): ContactSubmissionRecord[] {
    if (!isPlatformBrowser(this.platformId) || typeof localStorage === 'undefined') {
      return [];
    }
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  /**
   * Persists or updates a submission record in localStorage.
   */
  private saveRecord(record: ContactSubmissionRecord): void {
    if (!isPlatformBrowser(this.platformId) || typeof localStorage === 'undefined') {
      return;
    }
    try {
      const list = this.getSubmissions();
      const existingIdx = list.findIndex((item) => item.id === record.id);
      if (existingIdx >= 0) {
        list[existingIdx] = record;
      } else {
        list.unshift(record);
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list.slice(0, 50)));
    } catch (err) {
      console.warn('Failed to save contact submission to localStorage:', err);
    }
  }

  /**
   * Generates a pre-filled direct mailto URL fallback with user's note.
   */
  generateMailto(payload: ContactMessagePayload): string {
    const subjectPrefix = payload.intent ? `[${payload.intent.toUpperCase()}] ` : '';
    const subject = encodeURIComponent(`${subjectPrefix}Inquiry from ${payload.name}`);
    const bodyLines = [
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      payload.organization ? `Organization: ${payload.organization}` : '',
      payload.intent ? `Intent: ${payload.intent}` : '',
      payload.source ? `Source: ${payload.source}` : '',
      '',
      'Message:',
      payload.message
    ].filter((line) => line !== undefined);

    const body = encodeURIComponent(bodyLines.join('\n'));
    return `mailto:${DEFAULT_RECIPIENT}?subject=${subject}&body=${body}`;
  }

  /**
   * Submits the contact note via Netlify Forms with guaranteed local persistence and fallback.
   */
  async submit(payload: ContactMessagePayload, source?: string): Promise<SubmissionResult> {
    const finalPayload: ContactMessagePayload = {
      ...payload,
      source: source || payload.source || 'contact-modal'
    };
    const record: ContactSubmissionRecord = {
      ...finalPayload,
      id: this.generateId(),
      timestamp: new Date().toISOString(),
      status: 'saved_locally'
    };

    // 1. Immediately persist locally so note is never lost
    this.saveRecord(record);

    const mailtoUrl = this.generateMailto(finalPayload);

    // 2. Prepare payload for Netlify build-time form endpoint
    const body = new URLSearchParams();
    body.append('form-name', 'contact');
    body.append('bot-field', '');
    body.append('intent', payload.intent || 'problem');
    body.append('name', payload.name);
    body.append('email', payload.email);
    body.append('organization', payload.organization || '');
    body.append('message', payload.message);

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString()
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      record.status = 'delivered';
      delete record.error;
      this.saveRecord(record);

      return {
        success: true,
        status: 'delivered',
        record,
        mailtoUrl
      };
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      record.error = errorMsg;
      this.saveRecord(record);

      return {
        success: false,
        status: 'saved_locally',
        record,
        mailtoUrl,
        errorMessage: errorMsg
      };
    }
  }
}
