import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { TaskItem, TaskPriority, TaskStatus, CreateTaskDto, UpdateTaskDto } from '../../core/models/task.model';
import { MarkdownPipe } from '../../shared/pipes/markdown.pipe';

export interface TaskDialogData {
  mode: 'create' | 'edit';
  task?: TaskItem;
}

@Component({
  selector: 'app-task-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatChipsModule,
    MarkdownPipe,
  ],
  templateUrl: './task-form-dialog.component.html',
})
export class TaskFormDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<TaskFormDialogComponent>);
  readonly data: TaskDialogData = inject(MAT_DIALOG_DATA);

  readonly isEdit = this.data.mode === 'edit';
  readonly isFullscreen = signal<boolean>(false);
  readonly isPropertiesExpanded = signal<boolean>(false);
  readonly editorTab = signal<'write' | 'preview'>('write');

  readonly categories = ['Setup', 'Branding', 'Content', 'Verification', 'DevOps', 'General', 'Architecture', 'Security', 'Performance'];
  readonly priorities: { value: TaskPriority; label: string; dotColor: string }[] = [
    { value: 'low', label: 'Low', dotColor: 'bg-stone-400' },
    { value: 'medium', label: 'Medium', dotColor: 'bg-blue-500' },
    { value: 'high', label: 'High', dotColor: 'bg-amber-500' },
    { value: 'urgent', label: 'Urgent', dotColor: 'bg-rose-500' },
  ];
  readonly statuses: { value: TaskStatus; label: string; icon: string }[] = [
    { value: 'todo', label: 'To Do', icon: 'radio_button_unchecked' },
    { value: 'in-progress', label: 'In Progress', icon: 'pending' },
    { value: 'completed', label: 'Completed', icon: 'check_circle' },
  ];

  readonly taskForm = new FormGroup({
    title: new FormControl(this.data.task?.title || '', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(120)],
    }),
    category: new FormControl(this.data.task?.category || 'General', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    priority: new FormControl<TaskPriority>(this.data.task?.priority || 'medium', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    status: new FormControl<TaskStatus>(this.data.task?.status || 'todo', {
      nonNullable: true,
    }),
    dueDate: new FormControl(this.data.task?.dueDate || ''),
    description: new FormControl(this.data.task?.description || '', {
      nonNullable: true,
    }),
  });

  get titleControl() {
    return this.taskForm.controls.title;
  }

  toggleFullscreen(): void {
    const next = !this.isFullscreen();
    this.isFullscreen.set(next);
    if (next) {
      this.dialogRef.updateSize('100vw', '100vh');
      this.dialogRef.addPanelClass('full-screen-dialog-panel');
    } else {
      this.dialogRef.updateSize('680px', 'auto');
      this.dialogRef.removePanelClass('full-screen-dialog-panel');
    }
  }

  toggleProperties(): void {
    this.isPropertiesExpanded.update((v) => !v);
  }

  insertMarkdown(prefix: string, suffix: string = ''): void {
    const descControl = this.taskForm.controls.description;
    const current = descControl.value;
    descControl.setValue(current ? current + '\n' + prefix + 'text' + suffix : prefix + 'text' + suffix);
  }

  onPaste(event: ClipboardEvent, textarea: HTMLTextAreaElement): void {
    const pastedText = event.clipboardData?.getData('text') || '';
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    // Gracefully format selected text into Markdown link if a valid URL is pasted
    if (start !== end && /^https?:\/\/\S+$/i.test(pastedText.trim())) {
      event.preventDefault();
      const current = textarea.value;
      const selected = current.substring(start, end);
      const replacement = `[${selected}](${pastedText.trim()})`;
      const updated = current.substring(0, start) + replacement + current.substring(end);
      this.taskForm.controls.description.setValue(updated);
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + replacement.length;
      });
    }
  }

  save(): void {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    const val = this.taskForm.getRawValue();
    if (this.isEdit) {
      const updateDto: UpdateTaskDto = {
        title: val.title,
        category: val.category,
        priority: val.priority,
        status: val.status,
        dueDate: val.dueDate || undefined,
        description: val.description,
      };
      this.dialogRef.close({ action: 'save', dto: updateDto });
    } else {
      const createDto: CreateTaskDto = {
        title: val.title,
        category: val.category,
        priority: val.priority,
        status: val.status,
        dueDate: val.dueDate || undefined,
        description: val.description,
      };
      this.dialogRef.close({ action: 'save', dto: createDto });
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
