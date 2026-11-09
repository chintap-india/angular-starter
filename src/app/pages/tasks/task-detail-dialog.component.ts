import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { TaskItem, formatTaskId } from '../../core/models/task.model';
import { MarkdownPipe } from '../../shared/pipes/markdown.pipe';

export interface TaskDetailDialogData {
  task: TaskItem;
}

@Component({
  selector: 'app-task-detail-dialog',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MarkdownPipe,
  ],
  template: `
    <div
      class="flex flex-col w-full h-full bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-all duration-200 overflow-hidden"
      [ngClass]="{
        'fixed inset-0 z-50 w-screen h-screen rounded-none': isFullscreen(),
        'w-full h-auto max-h-[90vh]': !isFullscreen()
      }"
    >
      <!-- Dialog Header Bar (Sleek, Compact, Zero Wasted Space) -->
      <div class="px-4 sm:px-6 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2 sm:gap-4 bg-slate-50/70 dark:bg-slate-800/40 shrink-0">
        <div class="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <div class="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-800 dark:text-slate-200 shrink-0">
            <mat-icon class="!text-base !w-4 !h-4">article</mat-icon>
          </div>
          <div class="min-w-0">
            <div class="flex items-center gap-1.5 sm:gap-2">
              <span class="font-mono text-[11px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400">
                {{ formatTaskId(data.task.id) }}
              </span>
              <span class="text-slate-300 dark:text-slate-600">&bull;</span>
              <span class="text-[11px] sm:text-xs font-medium text-slate-600 dark:text-slate-300 truncate">
                {{ data.task.category }}
              </span>
            </div>
            <h2 class="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate max-w-[150px] xs:max-w-xs sm:max-w-md lg:max-w-lg m-0 leading-tight">
              {{ data.task.title }}
            </h2>
          </div>
        </div>

        <!-- Action Icon Buttons: Edit, Change Status, Delete | Open Page, Fullscreen & Close -->
        <div class="inline-flex items-center gap-1 shrink-0">
          <!-- Edit Task Icon Button -->
          <button
            type="button"
            (click)="triggerEdit()"
            matTooltip="Edit Task"
            aria-label="Edit Task"
            class="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 inline-flex items-center justify-center transition cursor-pointer shadow-2xs leading-none shrink-0"
          >
            <mat-icon class="!text-sm !w-3.5 !h-3.5 sm:!text-base sm:!w-4 sm:!h-4 leading-none flex items-center justify-center shrink-0">edit</mat-icon>
          </button>

          <!-- Change Status Icon Button -->
          <button
            type="button"
            (click)="triggerStatusChange()"
            matTooltip="Change Status"
            aria-label="Change Status"
            class="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 inline-flex items-center justify-center transition cursor-pointer shadow-2xs leading-none shrink-0"
          >
            <mat-icon class="!text-sm !w-3.5 !h-3.5 sm:!text-base sm:!w-4 sm:!h-4 text-slate-600 dark:text-slate-400 leading-none flex items-center justify-center shrink-0">published_with_changes</mat-icon>
          </button>

          <!-- Delete Task Icon Button -->
          <button
            type="button"
            (click)="triggerDelete()"
            matTooltip="Delete Task"
            aria-label="Delete Task"
            class="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white dark:bg-slate-800 text-rose-600 dark:text-rose-400 border border-slate-200 dark:border-slate-700 hover:bg-rose-50 dark:hover:bg-rose-950/50 inline-flex items-center justify-center transition cursor-pointer shadow-2xs leading-none shrink-0"
          >
            <mat-icon class="!text-sm !w-3.5 !h-3.5 sm:!text-base sm:!w-4 sm:!h-4 text-rose-600 dark:text-rose-400 leading-none flex items-center justify-center shrink-0">delete_outline</mat-icon>
          </button>

          <div class="h-3.5 w-px bg-slate-300 dark:bg-slate-700 mx-0.5"></div>

          <!-- Open Dedicated Task Page -->
          <a
            [routerLink]="['/tasks', data.task.id]"
            (click)="close()"
            matTooltip="Open Dedicated Task Page (/tasks/:id)"
            class="w-7 h-7 sm:w-8 sm:h-8 rounded-lg inline-flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer leading-none shrink-0"
            aria-label="Open dedicated task page"
          >
            <mat-icon class="!text-base !w-4 !h-4 leading-none flex items-center justify-center shrink-0">open_in_new</mat-icon>
          </a>

          <!-- Fullscreen Toggle -->
          <button
            type="button"
            (click)="toggleFullscreen()"
            [matTooltip]="isFullscreen() ? 'Exit Full Screen' : 'View Full Screen'"
            class="w-7 h-7 sm:w-8 sm:h-8 rounded-lg inline-flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer leading-none shrink-0"
            aria-label="Toggle full screen"
          >
            <mat-icon class="!text-base !w-4 !h-4 leading-none flex items-center justify-center shrink-0">{{ isFullscreen() ? 'fullscreen_exit' : 'fullscreen' }}</mat-icon>
          </button>

          <!-- Close Modal -->
          <button
            type="button"
            (click)="close()"
            matTooltip="Close"
            class="w-7 h-7 sm:w-8 sm:h-8 rounded-lg inline-flex items-center justify-center text-slate-400 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer leading-none shrink-0"
            aria-label="Close dialog"
          >
            <mat-icon class="!text-base !w-4 !h-4 leading-none flex items-center justify-center shrink-0">close</mat-icon>
          </button>
        </div>
      </div>

      <!-- Dialog Scrollable Body -->
      <div class="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        
        <!-- Metadata Badges Strip (Zero Redundant Label Prefixes) -->
        <div class="flex flex-wrap items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
          <!-- Status Badge -->
          <span
            class="inline-flex items-center gap-1.5 text-xs font-sans font-medium px-2.5 py-0.5 rounded-full"
            [ngClass]="{
              'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800/80': data.task.status === 'completed',
              'bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-200 border border-amber-200 dark:border-amber-800/80': data.task.status === 'in-progress',
              'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700': data.task.status === 'todo'
            }"
          >
            <mat-icon class="!text-xs !w-3 !h-3">
              {{ data.task.status === 'completed' ? 'check' : (data.task.status === 'in-progress' ? 'pending' : 'radio_button_unchecked') }}
            </mat-icon>
            <span>{{ data.task.status === 'in-progress' ? 'In Progress' : (data.task.status === 'completed' ? 'Completed' : 'To Do') }}</span>
          </span>

          <!-- Priority Badge -->
          <span
            class="inline-flex items-center gap-1 text-xs font-sans font-medium px-2.5 py-0.5 rounded-full"
            [ngClass]="{
              'bg-rose-100 dark:bg-rose-950/70 text-rose-800 dark:text-rose-200 border border-rose-200 dark:border-rose-800/80': data.task.priority === 'urgent',
              'bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-200 border border-amber-200 dark:border-amber-800/80': data.task.priority === 'high',
              'bg-sky-100 dark:bg-sky-950/70 text-sky-800 dark:text-sky-200 border border-sky-200 dark:border-sky-800/80': data.task.priority === 'medium',
              'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700': data.task.priority === 'low'
            }"
          >
            <mat-icon class="!text-xs !w-3 !h-3">
              {{ data.task.priority === 'urgent' || data.task.priority === 'high' ? 'priority_high' : 'low_priority' }}
            </mat-icon>
            <span class="capitalize">{{ data.task.priority }}</span>
          </span>

          <!-- Due Date -->
          @if (data.task.dueDate) {
            <span class="inline-flex items-center gap-1 text-xs font-mono px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              <mat-icon class="!text-xs !w-3 !h-3 text-slate-400">calendar_today</mat-icon>
              <span>{{ data.task.dueDate }}</span>
            </span>
          }

          <!-- Updated Date -->
          <span class="inline-flex items-center gap-1 text-xs font-mono px-2.5 py-0.5 rounded-full bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 border border-slate-200/60 dark:border-slate-700/60 ml-auto">
            <mat-icon class="!text-xs !w-3 !h-3 text-slate-400">update</mat-icon>
            <span>{{ data.task.updatedAt | date:'mediumDate' }}</span>
          </span>
        </div>

        <!-- Markdown Description Content (Zero label clutter) -->
        <div>
          @if (data.task.description) {
            <div class="task-editor-font p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-slate-200 leading-relaxed prose dark:prose-invert max-w-none">
              <div [innerHTML]="data.task.description | markdown" ngSkipHydration></div>
            </div>
          } @else {
            <div class="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-dashed border-slate-200 dark:border-slate-700 text-center text-sm text-slate-400 dark:text-slate-400">
              No detailed markdown description provided for this task.
            </div>
          }
        </div>

      </div>
    </div>
  `,
})
export class TaskDetailDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<TaskDetailDialogComponent>);
  readonly data: TaskDetailDialogData = inject(MAT_DIALOG_DATA);
  protected readonly formatTaskId = formatTaskId;

  readonly isFullscreen = signal<boolean>(false);

  toggleFullscreen(): void {
    const next = !this.isFullscreen();
    this.isFullscreen.set(next);
    if (next) {
      this.dialogRef.updateSize('100vw', '100vh');
      this.dialogRef.addPanelClass('full-screen-dialog-panel');
    } else {
      this.dialogRef.updateSize('760px', 'auto');
      this.dialogRef.removePanelClass('full-screen-dialog-panel');
    }
  }

  triggerEdit(): void {
    this.dialogRef.close({ action: 'edit', task: this.data.task });
  }

  triggerStatusChange(): void {
    this.dialogRef.close({ action: 'status', task: this.data.task });
  }

  triggerDelete(): void {
    this.dialogRef.close({ action: 'delete', task: this.data.task });
  }

  close(): void {
    this.dialogRef.close();
  }
}
