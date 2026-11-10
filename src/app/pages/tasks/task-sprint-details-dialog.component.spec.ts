import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskSprintDetailsDialogComponent } from './task-sprint-details-dialog.component';
import { TaskItem } from '../../core/models/task.model';

describe('TaskSprintDetailsDialogComponent', () => {
  let component: TaskSprintDetailsDialogComponent;
  let fixture: ComponentFixture<TaskSprintDetailsDialogComponent>;

  const mockDialogRef = {
    close: vi.fn(),
  };

  const mockSnackBar = {
    open: vi.fn(),
  };

  const sampleTask: TaskItem = {
    id: 'task-34',
    title: 'Add Prometheus Exporter for SSR Request Latency',
    description: '### Scope\nSample task description',
    category: 'DevOps',
    status: 'todo',
    priority: 'medium',
    dueDate: '2026-12-12',
    createdAt: '2026-11-07T10:00:00.000Z',
    updatedAt: '2026-11-07T12:00:00.000Z',
  };

  beforeEach(async () => {
    vi.clearAllMocks();

    await TestBed.configureTestingModule({
      imports: [TaskSprintDetailsDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: { task: sampleTask } },
        { provide: MatSnackBar, useValue: mockSnackBar },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskSprintDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }, 30000);

  it('should create sprint details dialog component', () => {
    expect(component).toBeTruthy();
  });

  it('should render task ID, category, and priority details in template', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('#34');
    expect(compiled.textContent).toContain('DevOps');
    expect(compiled.textContent).toContain('Medium');
    expect(compiled.textContent).toContain('Dec 12, 2026');
  });

  it('should close dialog when close() is invoked', () => {
    component.close();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('should trigger edit action on dialogRef when triggerEdit() is invoked', () => {
    component.triggerEdit();
    expect(mockDialogRef.close).toHaveBeenCalledWith({ action: 'edit' });
  });

  it('should copy link to clipboard and show snackbar', () => {
    const writeTextSpy = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: { writeText: writeTextSpy },
    });

    component.copyLink();
    expect(writeTextSpy).toHaveBeenCalledWith(expect.stringContaining('/tasks/task-34'));
  });
});
