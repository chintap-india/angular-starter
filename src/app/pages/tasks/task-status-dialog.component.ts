import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TaskItem, TaskStatus, formatTaskId } from '../../core/models/task.model';

export interface TaskStatusDialogData {
  task: TaskItem;
}

@Component({
  selector: 'app-task-status-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <div class="p-6 w-full h-full bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <!-- Header -->
      <div class="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700/80">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-800 dark:text-slate-200">
            <mat-icon class="!text-lg !w-4.5 !h-4.5">published_with_changes</mat-icon>
          </div>
          <div>
            <h2 class="text-base font-bold text-slate-900 dark:text-white leading-tight">
              Update Status
            </h2>
            <p class="text-[11px] text-slate-500 dark:text-slate-300">
              {{ formatTaskId(data.task.id) }} &bull; {{ data.task.title | slice:0:36 }}...
            </p>
          </div>
        </div>
        <button
          type="button"
          (click)="cancel()"
          class="w-7 h-7 rounded-lg inline-flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer leading-none"
          aria-label="Close"
        >
          <mat-icon class="!text-base !w-4 !h-4 leading-none flex items-center justify-center shrink-0">close</mat-icon>
        </button>
      </div>

      <!-- Status Selection Cards -->
      <div class="mt-4 space-y-2.5" role="radiogroup" aria-label="Select task status">
        @for (option of statusOptions; track option.value) {
          <div
            role="radio"
            tabindex="0"
            [attr.aria-checked]="selectedStatus() === option.value"
            (click)="selectedStatus.set(option.value)"
            (keydown.enter)="selectedStatus.set(option.value)"
            (keydown.space)="$event.preventDefault(); selectedStatus.set(option.value)"
            class="flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all duration-150 focus:outline-hidden focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-100"
            [ngClass]="{
              'border-slate-900 bg-slate-50 dark:border-slate-100 dark:bg-slate-800/90 ring-1 ring-slate-900 dark:ring-slate-100': selectedStatus() === option.value,
              'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-slate-50/40 dark:bg-slate-800/40': selectedStatus() !== option.value
            }"
          >
            <div class="flex items-center gap-3">
              <div
                class="w-7 h-7 rounded-lg flex items-center justify-center"
                [ngClass]="option.iconBg"
              >
                <mat-icon class="!text-base !w-4 !h-4" [ngClass]="option.iconColor" aria-hidden="true">
                  {{ option.icon }}
                </mat-icon>
              </div>
              <div>
                <div class="text-xs font-bold text-slate-900 dark:text-slate-100">
                  {{ option.label }}
                </div>
                <div class="text-[11px] text-slate-500 dark:text-slate-300">
                  {{ option.description }}
                </div>
              </div>
            </div>

            <!-- Radio indicator -->
            <div
              aria-hidden="true"
              class="w-4 h-4 rounded-full border flex items-center justify-center"
              [ngClass]="selectedStatus() === option.value ? 'border-slate-900 bg-slate-900 dark:border-slate-100 dark:bg-slate-100' : 'border-slate-300 dark:border-slate-600'"
            >
              @if (selectedStatus() === option.value) {
                <div class="w-1.5 h-1.5 rounded-full bg-white dark:bg-slate-900"></div>
              }
            </div>
          </div>
        }
      </div>

      <!-- Footer Buttons (Slate Theme Pill Buttons) -->
      <div class="mt-5 pt-3 border-t border-slate-100 dark:border-slate-700/80 flex items-center justify-end gap-2.5">
        <button
          type="button"
          mat-button
          (click)="cancel()"
          class="!border !border-slate-300 dark:!border-slate-700 !text-slate-700 dark:!text-slate-300 !bg-white dark:!bg-slate-800 hover:!bg-slate-100 dark:hover:!bg-slate-700 !rounded-full text-xs font-semibold cursor-pointer !px-5 !py-1.5"
        >
          Cancel
        </button>
        <button
          type="button"
          mat-flat-button
          (click)="confirm()"
          class="!bg-slate-900 hover:!bg-slate-800 dark:!bg-slate-100 dark:hover:!bg-white !text-white dark:!text-slate-900 !rounded-full text-xs font-bold inline-flex items-center justify-center gap-1.5 cursor-pointer shadow-xs !px-5 !py-1.5 leading-none"
        >
          <mat-icon class="!text-base !w-4 !h-4 leading-none flex items-center justify-center shrink-0">check</mat-icon>
          <span class="leading-none">Update Status</span>
        </button>
      </div>
    </div>
  `,
})
export class TaskStatusDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<TaskStatusDialogComponent>);
  readonly data: TaskStatusDialogData = inject(MAT_DIALOG_DATA);
  protected readonly formatTaskId = formatTaskId;

  readonly selectedStatus = signal<TaskStatus>(this.data.task.status);

  readonly statusOptions = [
    {
      value: 'todo' as TaskStatus,
      label: 'To Do',
      description: 'Backlog item ready to be picked up',
      icon: 'radio_button_unchecked',
      iconColor: 'text-slate-600 dark:text-slate-300',
      iconBg: 'bg-slate-100 dark:bg-slate-800',
    },
    {
      value: 'in-progress' as TaskStatus,
      label: 'In Progress',
      description: 'Actively being developed or reviewed',
      icon: 'pending',
      iconColor: 'text-amber-700 dark:text-amber-200',
      iconBg: 'bg-amber-100 dark:bg-amber-950/70',
    },
    {
      value: 'completed' as TaskStatus,
      label: 'Completed',
      description: 'Done, verified and merged into branch',
      icon: 'check_circle',
      iconColor: 'text-emerald-700 dark:text-emerald-200',
      iconBg: 'bg-emerald-100 dark:bg-emerald-950/70',
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
