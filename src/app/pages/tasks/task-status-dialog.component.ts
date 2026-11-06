import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TaskItem, TaskStatus } from '../../core/models/task.model';

export interface TaskStatusDialogData {
  task: TaskItem;
}

@Component({
  selector: 'app-task-status-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <div class="p-6 max-w-md w-full bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xl">
      <!-- Header -->
      <div class="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <mat-icon class="!text-lg !w-4.5 !h-4.5">published_with_changes</mat-icon>
          </div>
          <div>
            <h2 class="text-base font-bold text-stone-900 dark:text-white leading-tight">
              Update Status
            </h2>
            <p class="text-[11px] text-stone-500 dark:text-stone-400">
              #{{ data.task.id.replace('task-', '') }} &bull; {{ data.task.title | slice:0:36 }}...
            </p>
          </div>
        </div>
        <button
          type="button"
          (click)="cancel()"
          class="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 p-1 rounded-lg transition cursor-pointer"
          aria-label="Close"
        >
          <mat-icon class="!text-lg !w-4 !h-4">close</mat-icon>
        </button>
      </div>

      <!-- Status Selection Cards -->
      <div class="mt-4 space-y-2.5">
        @for (option of statusOptions; track option.value) {
          <div
            (click)="selectedStatus.set(option.value)"
            class="flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all duration-150"
            [ngClass]="{
              'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 ring-1 ring-emerald-500': selectedStatus() === option.value,
              'border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 bg-stone-50/40 dark:bg-stone-800/40': selectedStatus() !== option.value
            }"
          >
            <div class="flex items-center gap-3">
              <div
                class="w-7 h-7 rounded-lg flex items-center justify-center"
                [ngClass]="option.iconBg"
              >
                <mat-icon class="!text-base !w-4 !h-4" [ngClass]="option.iconColor">
                  {{ option.icon }}
                </mat-icon>
              </div>
              <div>
                <div class="text-xs font-bold text-stone-900 dark:text-stone-100">
                  {{ option.label }}
                </div>
                <div class="text-[11px] text-stone-500 dark:text-stone-400">
                  {{ option.description }}
                </div>
              </div>
            </div>

            <!-- Radio indicator -->
            <div
              class="w-4 h-4 rounded-full border flex items-center justify-center"
              [ngClass]="selectedStatus() === option.value ? 'border-emerald-600 bg-emerald-600' : 'border-stone-300 dark:border-stone-600'"
            >
              @if (selectedStatus() === option.value) {
                <div class="w-1.5 h-1.5 rounded-full bg-white"></div>
              }
            </div>
          </div>
        }
      </div>

      <!-- Footer Buttons -->
      <div class="mt-5 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-end gap-2.5">
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
          class="!bg-emerald-600 hover:!bg-emerald-500 !text-white !rounded-xl text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
        >
          <mat-icon class="!text-base !w-4 !h-4">check</mat-icon>
          <span>Update Status</span>
        </button>
      </div>
    </div>
  `,
})
export class TaskStatusDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<TaskStatusDialogComponent>);
  readonly data: TaskStatusDialogData = inject(MAT_DIALOG_DATA);

  readonly selectedStatus = signal<TaskStatus>(this.data.task.status);

  readonly statusOptions = [
    {
      value: 'todo' as TaskStatus,
      label: 'To Do',
      description: 'Backlog item ready to be picked up',
      icon: 'radio_button_unchecked',
      iconColor: 'text-stone-600 dark:text-stone-400',
      iconBg: 'bg-stone-100 dark:bg-stone-800',
    },
    {
      value: 'in-progress' as TaskStatus,
      label: 'In Progress',
      description: 'Actively being developed or reviewed',
      icon: 'pending',
      iconColor: 'text-amber-600 dark:text-amber-400',
      iconBg: 'bg-amber-100 dark:bg-amber-950/60',
    },
    {
      value: 'completed' as TaskStatus,
      label: 'Completed',
      description: 'Done, verified and merged into branch',
      icon: 'check_circle',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      iconBg: 'bg-emerald-100 dark:bg-emerald-950/60',
    },
  ];

  confirm(): void {
    this.dialogRef.close({
      action: 'update',
      status: this.selectedStatus(),
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
