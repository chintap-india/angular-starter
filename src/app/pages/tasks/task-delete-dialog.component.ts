import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TaskItem } from '../../core/models/task.model';

export interface TaskDeleteDialogData {
  task: TaskItem;
}

@Component({
  selector: 'app-task-delete-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <div class="p-6 max-w-md w-full bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xl">
      <div class="flex items-start gap-4">
        <div class="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 flex items-center justify-center text-rose-600 dark:text-rose-400 shrink-0">
          <mat-icon class="!text-xl !w-5 !h-5">delete_forever</mat-icon>
        </div>
        <div class="flex-1">
          <h2 class="text-lg font-bold text-stone-900 dark:text-white leading-tight">
            Delete Task
          </h2>
          <p class="text-xs text-stone-500 dark:text-stone-400 mt-1">
            Are you sure you want to permanently delete this task?
          </p>
        </div>
      </div>

      <div class="mt-4 p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700/60">
        <div class="text-xs font-mono font-semibold text-stone-400 dark:text-stone-500 uppercase">
          #{{ data.task.id.replace('task-', '') }}
        </div>
        <div class="text-sm font-semibold text-stone-800 dark:text-stone-200 mt-0.5 line-clamp-2">
          {{ data.task.title }}
        </div>
      </div>

      <div class="mt-6 flex items-center justify-end gap-3">
        <button
          type="button"
          mat-button
          (click)="cancel()"
          class="!text-stone-600 dark:!text-stone-300 !rounded-xl text-xs font-semibold cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="button"
          mat-flat-button
          (click)="confirm()"
          class="!bg-rose-600 hover:!bg-rose-500 !text-white !rounded-xl text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
        >
          <mat-icon class="!text-base !w-4 !h-4">delete</mat-icon>
          <span>Delete Task</span>
        </button>
      </div>
    </div>
  `,
})
export class TaskDeleteDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<TaskDeleteDialogComponent>);
  readonly data: TaskDeleteDialogData = inject(MAT_DIALOG_DATA);

  confirm(): void {
    this.dialogRef.close(true);
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}
