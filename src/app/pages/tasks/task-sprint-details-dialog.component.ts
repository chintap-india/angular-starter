import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskItem, formatTaskId } from '../../core/models/task.model';

export interface TaskSprintDetailsDialogData {
  task: TaskItem;
}

@Component({
  selector: 'app-task-sprint-details-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  template: `
    <div class="p-6 sm:p-7 w-full h-full bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <!-- Header -->
      <div class="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700/80">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-800 dark:text-slate-200">
            <mat-icon class="!text-lg !w-4.5 !h-4.5">info</mat-icon>
          </div>
          <div>
            <h2 class="text-base font-bold text-slate-900 dark:text-white leading-tight">
              Sprint Details
            </h2>
            <p class="text-[11px] text-slate-500 dark:text-slate-300">
              {{ formatTaskId(data.task.id) }} &bull; {{ data.task.category }}
            </p>
          </div>
        </div>
        <button
          type="button"
          (click)="close()"
          class="w-7 h-7 rounded-lg inline-flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer leading-none"
          aria-label="Close"
        >
          <mat-icon class="!text-base !w-4 !h-4 leading-none flex items-center justify-center shrink-0">close</mat-icon>
        </button>
      </div>

      <!-- Details List -->
      <div class="mt-4 space-y-3 text-xs">
        <div class="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800/80">
          <span class="text-slate-500 dark:text-slate-400 font-medium">Task ID</span>
          <span class="font-mono font-bold text-slate-900 dark:text-white">{{ formatTaskId(data.task.id) }}</span>
        </div>

        <div class="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800/80">
          <span class="text-slate-500 dark:text-slate-400 font-medium">Category</span>
          <span class="font-semibold text-slate-900 dark:text-white">{{ data.task.category }}</span>
        </div>

        <div class="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800/80">
          <span class="text-slate-500 dark:text-slate-400 font-medium">Status</span>
          <span
            class="inline-flex items-center gap-1 font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md text-[11px]"
            [ngClass]="{
              'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800/80': data.task.status === 'completed',
              'bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-200 border border-amber-200 dark:border-amber-800/80': data.task.status === 'in-progress',
              'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700': data.task.status === 'todo'
            }"
          >
            <mat-icon class="!text-xs !w-3 !h-3">
              {{ data.task.status === 'completed' ? 'check_circle' : (data.task.status === 'in-progress' ? 'pending' : 'radio_button_unchecked') }}
            </mat-icon>
            <span>{{ data.task.status === 'in-progress' ? 'In Progress' : (data.task.status === 'completed' ? 'Completed' : 'To Do') }}</span>
          </span>
        </div>

        <div class="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800/80">
          <span class="text-slate-500 dark:text-slate-400 font-medium">Priority</span>
          <span
            class="inline-flex items-center gap-1 font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md text-[11px]"
            [ngClass]="{
              'bg-rose-100 dark:bg-rose-950/70 text-rose-800 dark:text-rose-200 border border-rose-200 dark:border-rose-800/80': data.task.priority === 'urgent',
              'bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-200 border border-amber-200 dark:border-amber-800/80': data.task.priority === 'high',
              'bg-sky-100 dark:bg-sky-950/70 text-sky-800 dark:text-sky-200 border border-sky-200 dark:border-sky-800/80': data.task.priority === 'medium',
              'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700': data.task.priority === 'low'
            }"
          >
            <span>{{ data.task.priority }}</span>
          </span>
        </div>

        <div class="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800/80">
          <span class="text-slate-500 dark:text-slate-400 font-medium">Due Date</span>
          <span class="font-mono font-medium text-slate-800 dark:text-slate-200">
            {{ data.task.dueDate ? data.task.dueDate : 'Not specified' }}
          </span>
        </div>

        <div class="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800/80">
          <span class="text-slate-500 dark:text-slate-400 font-medium">Created</span>
          <span class="text-slate-700 dark:text-slate-300">
            {{ data.task.createdAt | date:'medium' }}
          </span>
        </div>

        <div class="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800/80">
          <span class="text-slate-500 dark:text-slate-400 font-medium">Last Updated</span>
          <span class="text-slate-700 dark:text-slate-300">
            {{ data.task.updatedAt | date:'medium' }}
          </span>
        </div>

        <div class="flex items-center justify-between py-2">
          <span class="text-slate-500 dark:text-slate-400 font-medium">Route Path</span>
          <div class="flex items-center gap-1.5">
            <span class="font-mono text-slate-500 dark:text-slate-400 text-[11px]">/tasks/{{ data.task.id }}</span>
            <button
              type="button"
              (click)="copyLink()"
              matTooltip="Copy URL"
              class="w-6 h-6 rounded inline-flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
              aria-label="Copy route URL"
            >
              <mat-icon class="!text-xs !w-3.5 !h-3.5">content_copy</mat-icon>
            </button>
          </div>
        </div>
      </div>

      <!-- Footer Buttons -->
      <div class="mt-6 pt-3 border-t border-slate-100 dark:border-slate-700/80 flex items-center justify-end gap-2">
        <button
          type="button"
          mat-button
          (click)="close()"
          class="!border !border-slate-300 dark:!border-slate-700 !text-slate-700 dark:!text-slate-300 !bg-white dark:!bg-slate-800 hover:!bg-slate-100 dark:hover:!bg-slate-700 !rounded-full text-xs font-semibold cursor-pointer !px-4 !py-1.5"
        >
          Close
        </button>
        <button
          type="button"
          mat-flat-button
          (click)="triggerEdit()"
          class="!bg-slate-900 hover:!bg-slate-800 dark:!bg-slate-100 dark:hover:!bg-white !text-white dark:!text-slate-900 !rounded-full text-xs font-bold inline-flex items-center justify-center gap-1.5 cursor-pointer shadow-xs !px-4 !py-1.5 leading-none"
        >
          <mat-icon class="!text-sm !w-3.5 !h-3.5 leading-none flex items-center justify-center shrink-0">edit</mat-icon>
          <span>Edit Task</span>
        </button>
      </div>
    </div>
  `,
})
export class TaskSprintDetailsDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<TaskSprintDetailsDialogComponent>);
  readonly data: TaskSprintDetailsDialogData = inject(MAT_DIALOG_DATA);
  private readonly snackBar = inject(MatSnackBar);
  protected readonly formatTaskId = formatTaskId;

  close(): void {
    this.dialogRef.close();
  }

  triggerEdit(): void {
    this.dialogRef.close({ action: 'edit' });
  }

  copyLink(): void {
    if (typeof window !== 'undefined') {
      const url = `${window.location.origin}/tasks/${this.data.task.id}`;
      navigator.clipboard?.writeText(url).then(() => {
        this.snackBar.open('Task link copied to clipboard!', 'Dismiss', { duration: 2500 });
      });
    }
  }
}
