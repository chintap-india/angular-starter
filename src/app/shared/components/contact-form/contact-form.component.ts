import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  ViewChild,
  signal,
  inject,
  PLATFORM_ID
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContactDialogData } from '../../../features/modals/contact-dialog/contact-dialog.component';
import { ContactSubmissionService } from '../../../core/services/contact-submission.service';

interface SpeechRecognitionResultItem {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionResultItemAlternative {
  [index: number]: SpeechRecognitionResultItem;
  length: number;
  isFinal: boolean;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  [index: number]: SpeechRecognitionResultItemAlternative;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message?: string;
}

interface SpeechRecognitionInstance extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onstart: ((this: SpeechRecognitionInstance, ev: Event) => void) | null;
  onend: ((this: SpeechRecognitionInstance, ev: Event) => void) | null;
  onerror: ((this: SpeechRecognitionInstance, ev: SpeechRecognitionErrorEvent) => void) | null;
  onresult: ((this: SpeechRecognitionInstance, ev: SpeechRecognitionEvent) => void) | null;
}

export type SpeechTargetField = 'name' | 'email' | 'message';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './contact-form.component.html'
})
export class ContactFormComponent implements OnInit, OnDestroy {
  @Input() initialData?: ContactDialogData | null;
  @Input() isModal = false;

  @Output() formSubmitted = new EventEmitter<void>();
  @Output() formCancelled = new EventEmitter<void>();

  private readonly fb = inject(FormBuilder);
  private readonly snackBar = inject(MatSnackBar);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly submissionService = inject(ContactSubmissionService);

  @ViewChild('formDirective') formDirective?: FormGroupDirective;

  isSubmitting = false;
  readonly fallbackMailto = signal<string | null>(null);

  // Speech Recognition
  readonly isSpeechSupported = signal<boolean>(false);
  readonly isListening = signal<boolean>(false);
  readonly speechLocale = signal<string>('en-US');
  readonly activeSpeechField = signal<SpeechTargetField | null>(null);
  readonly speechError = signal<string | null>(null);
  readonly interimTranscript = signal<string>('');

  private recognition?: SpeechRecognitionInstance;
  private accumulatedTranscript = '';
  private baseMessageText = '';

  readonly contactForm: FormGroup = this.fb.group({
    intent: ['problem'],
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    organization: [''],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  ngOnInit(): void {
    if (this.initialData) {
      this.applyInitialData(this.initialData);
    }
    this.initSpeechRecognition();
  }

  private applyInitialData(data: ContactDialogData): void {
    const rawIntent = (data.intent || '').toLowerCase();
    let intentVal = 'problem';
    if (rawIntent === 'starter-kit' || rawIntent === 'starter') {
      intentVal = 'starter-kit';
    } else if (rawIntent === 'general' || rawIntent === 'hello') {
      intentVal = 'general';
    } else if (rawIntent === 'cohort' || rawIntent === 'academy') {
      intentVal = 'academy';
    } else if (rawIntent === 'issue' || rawIntent === 'broken-link') {
      intentVal = 'issue';
    } else if (['problem', 'idea', 'connected', 'collaboration'].includes(rawIntent)) {
      intentVal = rawIntent;
    }

    let messageVal = data.message || '';
    if (!messageVal && intentVal === 'academy') {
      messageVal =
        'Hi Chintap team, I would like to inquire about the upcoming Full-Stack & Mobile App Development Cohort (curriculum, schedule, and admissions).';
    }

    this.contactForm.patchValue({
      intent: intentVal,
      name: data.name || this.contactForm.get('name')?.value || '',
      email: data.email || this.contactForm.get('email')?.value || '',
      organization: data.organization || this.contactForm.get('organization')?.value || '',
      message: messageVal || this.contactForm.get('message')?.value || ''
    });
  }

  getMessagePlaceholder(): string {
    const intent = this.contactForm.get('intent')?.value;
    if (intent === 'starter-kit') {
      return 'Describe your questions about the starter kit, architectural components, or custom setup...';
    }
    if (intent === 'academy') {
      return 'Share your background, what you hope to build, or any questions about the cohort curriculum, schedule, or admissions...';
    }
    if (intent === 'issue') {
      return 'Please describe the broken link or issue you encountered, and on which page...';
    }
    if (intent === 'general') {
      return 'Say hello, share feedback, or start a general conversation...';
    }
    return 'Share as much or as little context as you like...';
  }

  async onSubmit(formDirective?: FormGroupDirective): Promise<void> {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    if (this.isSubmitting) return;

    this.isSubmitting = true;
    this.fallbackMailto.set(null);

    const formVal = this.contactForm.value;
    const result = await this.submissionService.submit({
      name: formVal.name,
      email: formVal.email,
      message: formVal.message,
      intent: formVal.intent,
      organization: formVal.organization,
      source: this.initialData?.source || (this.isModal ? 'modal' : 'page')
    });

    this.isSubmitting = false;

    if (result.success) {
      this.resetForm(formDirective);
      this.snackBar.open(
        'Thank you for reaching out! We received your note and will be in touch shortly.',
        'Dismiss',
        {
          duration: 6500,
          panelClass: ['bg-stone-900', 'text-white'],
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        }
      );
      this.formSubmitted.emit();
    } else {
      this.fallbackMailto.set(result.mailtoUrl);
      const snackRef = this.snackBar.open(
        'Note saved locally. Server transmission was not acknowledged.',
        'Send via Email',
        {
          duration: 9000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        }
      );
      snackRef.onAction().subscribe(() => {
        if (typeof window !== 'undefined') {
          window.open(result.mailtoUrl, '_blank');
        }
      });
    }
  }

  clearFallback(): void {
    this.fallbackMailto.set(null);
  }

  isListeningFor(field: SpeechTargetField): boolean {
    return this.isListening() && this.activeSpeechField() === field;
  }

  toggleSpeechRecognition(field: SpeechTargetField = 'message', event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (!this.recognition || !this.isSpeechSupported()) return;

    if (this.isListening()) {
      const currentTarget = this.activeSpeechField();
      this.stopSpeechRecognition();
      if (currentTarget !== field) {
        setTimeout(() => {
          this.startSpeechRecognition(field);
        }, 120);
      }
    } else {
      this.startSpeechRecognition(field);
    }
  }

  startSpeechRecognition(field: SpeechTargetField = 'message'): void {
    if (!this.recognition) return;
    this.speechError.set(null);
    this.activeSpeechField.set(field);
    this.accumulatedTranscript = '';
    this.baseMessageText = this.contactForm.get(field)?.value?.trim() || '';
    try {
      this.recognition.start();
    } catch (err) {
      console.warn('Speech recognition start error:', err);
    }
  }

  stopSpeechRecognition(): void {
    if (!this.recognition) return;
    try {
      this.recognition.stop();
    } catch {
      // Safe fallback
    }
    this.isListening.set(false);
    this.activeSpeechField.set(null);
    this.interimTranscript.set('');
  }

  detectPreferredLocale(): string {
    if (typeof window === 'undefined') return 'en-US';

    const userLangs =
      typeof navigator !== 'undefined' && navigator.languages && navigator.languages.length > 0
        ? Array.from(navigator.languages)
        : [(typeof navigator !== 'undefined' ? navigator.language : '') || ''];

    let timeZone = '';
    try {
      timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    } catch {
      // Safe fallback
    }

    const isIndiaTimezone = /Asia\/(Kolkata|Calcutta)/i.test(timeZone);
    const hasIndianLocale = userLangs.some((lang) => {
      const l = (lang || '').toLowerCase();
      return (
        l === 'en-in' ||
        l.endsWith('-in') ||
        ['hi', 'ta', 'te', 'kn', 'ml', 'mr', 'bn', 'gu', 'pa', 'or'].some(
          (code) => l === code || l.startsWith(`${code}-`)
        )
      );
    });

    if (isIndiaTimezone || hasIndianLocale) {
      return 'en-IN';
    }

    const primary = (
      userLangs[0] ||
      (typeof navigator !== 'undefined' ? navigator.language : '') ||
      ''
    ).toLowerCase();
    if (primary.startsWith('en-gb')) return 'en-GB';
    if (primary.startsWith('en-au')) return 'en-AU';
    if (primary.startsWith('en-ca')) return 'en-CA';
    if (primary.startsWith('en-nz')) return 'en-NZ';
    if (primary.startsWith('en-ie')) return 'en-IE';
    if (primary.startsWith('en')) return 'en-US';

    return 'en-US';
  }

  toggleSpeechLocale(): void {
    const current = this.speechLocale();
    const next = current === 'en-IN' ? 'en-US' : 'en-IN';
    this.speechLocale.set(next);
    if (this.recognition) {
      this.recognition.lang = next;
    }
  }

  formatSpeechForField(field: SpeechTargetField, transcript: string, baseText: string): string {
    const raw = transcript.trim();
    if (!raw) return baseText || '';

    if (field === 'name') {
      let clean = raw.replace(/\b([a-zA-Z])\.(?=\s|$)/g, '$1');
      clean = clean.replace(/\b([a-zA-Z])(?:\s+([a-zA-Z]))+(?!\w)/g, (match) =>
        match.replace(/\s+/g, '')
      );
      const titleCased = clean.replace(/\b\w+/g, (word) =>
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      );
      return baseText ? `${baseText} ${titleCased}` : titleCased;
    }

    if (field === 'email') {
      let email = raw.toLowerCase();

      email = email.replace(/\b(gee\s*mail|g\s*mail|google\s*mail)\b/g, 'gmail');
      email = email.replace(/\b(hot\s*mail)\b/g, 'hotmail');
      email = email.replace(/\b(out\s*look)\b/g, 'outlook');
      email = email.replace(/\b(ya\s*hoo)\b/g, 'yahoo');
      email = email.replace(/\b(proto\s*mail|proton\s*mail)\b/g, 'protonmail');
      email = email.replace(/\bdot\s+co\s+dot\s+in\b/g, '.co.in');
      email = email.replace(/\bdot\s+com\b/g, '.com');
      email = email.replace(/\bdot\s+in\b/g, '.in');
      email = email.replace(/\bdot\s+org\b/g, '.org');
      email = email.replace(/\bdot\s+net\b/g, '.net');
      email = email.replace(/\bdot\s+io\b/g, '.io');

      email = email.replace(/\b(at\s+the\s+rate\s+of|at\s+the\s+rate|at)\b/g, '@');
      email = email.replace(/\b(dot|point)\b/g, '.');
      email = email.replace(/\b(underscore)\b/g, '_');
      email = email.replace(/\b(dash|hyphen)\b/g, '-');

      email = email.replace(/\btriple\s+zero\b/g, '000');
      email = email.replace(/\bdouble\s+zero\b/g, '00');
      email = email.replace(/\btriple\s+one\b/g, '111');
      email = email.replace(/\bdouble\s+one\b/g, '11');
      email = email.replace(/\btriple\s+two\b/g, '222');
      email = email.replace(/\bdouble\s+two\b/g, '22');
      email = email.replace(/\btriple\s+three\b/g, '333');
      email = email.replace(/\bdouble\s+three\b/g, '33');
      email = email.replace(/\btriple\s+four\b/g, '444');
      email = email.replace(/\bdouble\s+four\b/g, '44');
      email = email.replace(/\btriple\s+five\b/g, '555');
      email = email.replace(/\bdouble\s+five\b/g, '55');
      email = email.replace(/\btriple\s+six\b/g, '666');
      email = email.replace(/\bdouble\s+six\b/g, '66');
      email = email.replace(/\btriple\s+seven\b/g, '777');
      email = email.replace(/\bdouble\s+seven\b/g, '77');
      email = email.replace(/\btriple\s+eight\b/g, '888');
      email = email.replace(/\bdouble\s+eight\b/g, '88');
      email = email.replace(/\btriple\s+nine\b/g, '999');
      email = email.replace(/\bdouble\s+nine\b/g, '99');

      const wordToDigit: Record<string, string> = {
        zero: '0',
        oh: '0',
        one: '1',
        two: '2',
        three: '3',
        four: '4',
        five: '5',
        six: '6',
        seven: '7',
        eight: '8',
        nine: '9'
      };
      email = email.replace(
        /\b(zero|oh|one|two|three|four|five|six|seven|eight|nine)\b/g,
        (match) => wordToDigit[match] || match
      );

      email = email.replace(/\s+/g, '');
      return baseText ? `${baseText}${email}` : email;
    }

    return baseText ? `${baseText} ${raw}` : raw;
  }

  dismissSpeechError(): void {
    this.speechError.set(null);
  }

  ngOnDestroy(): void {
    if (this.recognition && this.isListening()) {
      try {
        this.recognition.abort();
      } catch {
        // Safe no-op on destroy
      }
    }
  }

  private initSpeechRecognition(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const win =
      typeof window !== 'undefined'
        ? (window as unknown as {
            SpeechRecognition?: { new (): SpeechRecognitionInstance };
            webkitSpeechRecognition?: { new (): SpeechRecognitionInstance };
          })
        : {};

    const RecognitionClass = win.SpeechRecognition || win.webkitSpeechRecognition;
    if (!RecognitionClass) {
      this.isSpeechSupported.set(false);
      return;
    }

    try {
      this.recognition = new RecognitionClass();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      const initialLocale = this.detectPreferredLocale();
      this.speechLocale.set(initialLocale);
      this.recognition.lang = initialLocale;

      this.recognition.onstart = () => {
        this.isListening.set(true);
        this.speechError.set(null);
      };

      this.recognition.onresult = (event: SpeechRecognitionEvent) => {
        let finalChunk = '';
        let interimChunk = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const res = event.results[i];
          if (res.isFinal) {
            finalChunk += res[0].transcript;
          } else {
            interimChunk += res[0].transcript;
          }
        }

        if (finalChunk) {
          this.accumulatedTranscript += (this.accumulatedTranscript ? ' ' : '') + finalChunk.trim();
          const targetField = this.activeSpeechField() || 'message';
          const formatted = this.formatSpeechForField(
            targetField,
            this.accumulatedTranscript,
            this.baseMessageText
          );
          this.contactForm.get(targetField)?.setValue(formatted);
          this.contactForm.get(targetField)?.markAsDirty();
          this.contactForm.get(targetField)?.markAsTouched();
        }

        this.interimTranscript.set(interimChunk.trim());
      };

      this.recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        const errType = event.error;
        if (errType === 'not-allowed' || errType === 'service-not-allowed') {
          this.speechError.set('Microphone access was denied. You can continue typing manually.');
          this.snackBar.open('Microphone access unavailable or denied.', 'Dismiss', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        } else if (errType === 'audio-capture') {
          this.speechError.set('No microphone was detected on this device.');
        } else if (errType === 'network') {
          this.speechError.set('Speech recognition requires an active network connection.');
        }
        this.isListening.set(false);
        this.activeSpeechField.set(null);
        this.interimTranscript.set('');
      };

      this.recognition.onend = () => {
        this.isListening.set(false);
        this.activeSpeechField.set(null);
        this.interimTranscript.set('');
      };

      this.isSpeechSupported.set(true);
    } catch (e) {
      console.warn('SpeechRecognition initialization error:', e);
      this.isSpeechSupported.set(false);
    }
  }

  private resetForm(directive?: FormGroupDirective): void {
    if (this.isListening()) {
      this.stopSpeechRecognition();
    }
    this.accumulatedTranscript = '';
    this.baseMessageText = '';
    this.activeSpeechField.set(null);
    this.interimTranscript.set('');
    this.speechError.set(null);
    this.fallbackMailto.set(null);

    const activeDirective = directive || this.formDirective;
    if (activeDirective) {
      activeDirective.resetForm({ intent: 'problem' });
    } else {
      this.contactForm.reset({ intent: 'problem' });
    }
    this.contactForm.markAsPristine();
    this.contactForm.markAsUntouched();
  }
}
