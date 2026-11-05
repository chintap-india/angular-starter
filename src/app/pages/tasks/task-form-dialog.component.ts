import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
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
    MatChipsModule,
    MarkdownPipe,
  ],
  templateUrl: './task-form-dialog.component.html',
})
export class TaskFormDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<TaskFormDialogComponent>);
  readonly data: TaskDialogData = inject(MAT_DIALOG_DATA);

  readonly isEdit = this.data.mode === 'edit';
  readonly editorTab = signal<'write' | 'preview'>('write');

  readonly categories = ['Setup', 'Branding', 'Content', 'Verification', 'DevOps', 'General'];
  readonly priorities: { value: TaskPriority; label: string; color: string }[] = [
    { value: 'low', label: 'Low', color: 'text-stone-500' },
    { value: 'medium', label: 'Medium', color: 'text-blue-500' },
    { value: 'high', label: 'High', color: 'text-amber-500' },
    { value: 'urgent', label: 'Urgent', color: 'text-rose-500' },
  ];
  readonly statuses: { value: TaskStatus; label: string }[] = [
    { value: 'todo', label: 'To Do' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
  ];

  // Modern Angular 22 Typed Reactive Form
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

  insertMarkdown(prefix: string, suffix: string = ''): void {
    const descControl = this.taskForm.controls.description;
    const current = descControl.value;
    descControl.setValue(current + '\n' + prefix + 'text' + suffix);
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
