import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskAuthGateComponent } from './task-auth-gate.component';
import { AuthService } from '../../core/services/auth.service';

describe('TaskAuthGateComponent', () => {
  let component: TaskAuthGateComponent;
  let fixture: ComponentFixture<TaskAuthGateComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskAuthGateComponent],
      providers: [AuthService],
    }).compileComponents();

    authService = TestBed.inject(AuthService);
    fixture = TestBed.createComponent(TaskAuthGateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should create auth gate component', () => {
    expect(component).toBeTruthy();
  });

  it('should render authentication options and transparency notice', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Protected Tasks Workspace');
    expect(compiled.textContent).toContain('Continue with Google');
    expect(compiled.textContent).toContain('Sign In with Netlify Identity');
    expect(compiled.textContent).toContain('Lead Developer');
    expect(compiled.textContent).toContain('Guest Reviewer');
    expect(compiled.textContent).toContain('Netlify Identity free tier');
  });

  it('should call authService.loginWithGoogle on Google button click', () => {
    const spy = vi.spyOn(authService, 'loginWithGoogle');
    const buttons = fixture.nativeElement.querySelectorAll('button');
    const googleBtn = Array.from(buttons).find((b: any) =>
      b.textContent.includes('Continue with Google')
    ) as HTMLButtonElement;

    expect(googleBtn).toBeTruthy();
    googleBtn.click();
    expect(spy).toHaveBeenCalled();
  });

  it('should call authService.loginAsDeveloper on Lead Developer button click', () => {
    const spy = vi.spyOn(authService, 'loginAsDeveloper');
    const buttons = fixture.nativeElement.querySelectorAll('button');
    const devBtn = Array.from(buttons).find((b: any) =>
      b.textContent.includes('Lead Developer')
    ) as HTMLButtonElement;

    expect(devBtn).toBeTruthy();
    devBtn.click();
    expect(spy).toHaveBeenCalled();
  });
});
