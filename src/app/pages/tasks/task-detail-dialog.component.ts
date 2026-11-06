import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TaskItem } from '../../core/models/task.model';
import { MarkdownPipe } from '../../shared/pipes/markdown.pipe';

export interface TaskDetailDialogData {
  task: TaskItem;
}

@Component({
  selector: 'app-task-detail-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MarkdownPipe,
  ],
  template: `
    <div
      class="flex flex-col bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 transition-all duration-200 overflow-hidden"
      [ngClass]="{
        'fixed inset-0 z-50 w-screen h-screen rounded-none': isFullscreen(),
        'w-full max-w-3xl rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl max-h-[90vh]': !isFullscreen()
      }"
    >
      <!-- Dialog Header Bar -->
      <div class="px-6 py-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between gap-4 bg-stone-50/70 dark:bg-stone-800/40 shrink-0">
        <div class="flex items-center gap-3 min-w-0">
          <div class="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-800 dark:text-slate-200 shrink-0">
            <mat-icon class="!text-lg !w-5 !h-5">article</mat-icon>
          </div>
          <div class="min-w-0">
            <div class="flex items-center gap-2">
              <span class="font-mono text-xs font-bold text-stone-400 dark:text-stone-500 uppercase">
                #{{ data.task.id.replace('task-', '') }}
              </span>
              <span class="text-stone-300 dark:text-stone-700">&bull;</span>
              <span class="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                {{ data.task.category }}
              </span>
            </div>
            <h2 class="text-lg font-bold text-stone-900 dark:text-white truncate max-w-md sm:max-w-xl">
              {{ data.task.title }}
            </h2>
          </div>
        </div>

        <!-- Window Actions: Fullscreen & Close -->
        <div class="inline-flex items-center gap-1 shrink-0">
          <button
            type="button"
            (click)="toggleFullscreen()"
            [matTooltip]="isFullscreen() ? 'Exit Full Screen' : 'View Full Screen'"
            class="w-8 h-8 rounded-lg inline-flex items-center justify-center text-stone-500 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800 transition cursor-pointer leading-none"
            aria-label="Toggle full screen"
          >
            <mat-icon class="!text-lg !w-4.5 !h-4.5 leading-none flex items-center justify-center shrink-0">{{ isFullscreen() ? 'fullscreen_exit' : 'fullscreen' }}</mat-icon>
          </button>
          <button
            type="button"
            (click)="close()"
            matTooltip="Close"
            class="w-8 h-8 rounded-lg inline-flex items-center justify-center text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition cursor-pointer leading-none"
            aria-label="Close dialog"
          >
            <mat-icon class="!text-lg !w-4.5 !h-4.5 leading-none flex items-center justify-center shrink-0">close</mat-icon>
          </button>
        </div>
      </div>

      <!-- Dialog Scrollable Body -->
      <div class="flex-1 overflow-y-auto p-6 space-y-6">
        
        <!-- Metadata Badges Strip -->
        <div class="flex flex-wrap items-center gap-2.5 pb-4 border-b border-stone-100 dark:border-stone-800">
          <!-- Status Badge -->
          <span
            class="inline-flex items-center gap-1.5 text-xs font-mono uppercase px-3 py-1 rounded-lg font-bold"
            [ngClass]="{
              'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800': data.task.status === 'completed',
              'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800': data.task.status === 'in-progress',
              'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-700': data.task.status === 'todo'
            }"
          >
            <mat-icon class="!text-xs !w-3.5 !h-3.5">
              {{ data.task.status === 'completed' ? 'check' : (data.task.status === 'in-progress' ? 'pending' : 'radio_button_unchecked') }}
            </mat-icon>
            <span>Status: {{ data.task.status === 'in-progress' ? 'In Progress' : (data.task.status === 'completed' ? 'Completed' : 'To Do') }}</span>
          </span>

          <!-- Priority Badge -->
          <span
            class="inline-flex items-center gap-1.5 text-xs font-mono uppercase px-3 py-1 rounded-lg font-bold"
            [ngClass]="{
              'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-900': data.task.priority === 'urgent',
              'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-900': data.task.priority === 'high',
              'bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-900': data.task.priority === 'medium',
              'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-700': data.task.priority === 'low'
            }"
          >
            <mat-icon class="!text-xs !w-3.5 !h-3.5">
              {{ data.task.priority === 'urgent' || data.task.priority === 'high' ? 'priority_high' : 'low_priority' }}
            </mat-icon>
            <span>Priority: {{ data.task.priority }}</span>
          </span>

          <!-- Due Date -->
          @if (data.task.dueDate) {
            <span class="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700">
              <mat-icon class="!text-xs !w-3.5 !h-3.5">calendar_today</mat-icon>
              <span>Due: {{ data.task.dueDate }}</span>
            </span>
          }

          <!-- Updated Date -->
          <span class="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-lg bg-stone-50 dark:bg-stone-800/50 text-stone-500 dark:text-stone-400 border border-stone-200/60 dark:border-stone-700/60 ml-auto">
            <mat-icon class="!text-xs !w-3.5 !h-3.5">update</mat-icon>
            <span>Updated: {{ data.task.updatedAt | date:'mediumDate' }}</span>
          </span>
        </div>

        <!-- Markdown Description Section -->
        <div>
          <h3 class="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-3">
            Description & Specifications
          </h3>
          @if (data.task.description) {
            <div class="p-5 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-800 text-sm text-stone-800 dark:text-stone-200 leading-relaxed font-sans prose dark:prose-invert max-w-none">
              <div [innerHTML]="data.task.description | markdown" ngSkipHydration></div>
            </div>
          } @else {
            <div class="p-8 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-dashed border-stone-200 dark:border-stone-700 text-center text-sm text-stone-400">
              No detailed markdown description provided for this task.
            </div>
          }
        </div>

      </div>

      <!-- Dialog Footer Action Bar -->
      <div class="px-6 py-4 border-t border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-3 bg-stone-50/70 dark:bg-stone-800/40 shrink-0">
        <!-- Destructive Action -->
        <button
          type="button"
          mat-button
          (click)="triggerDelete()"
          class="!text-rose-600 hover:!bg-rose-50 dark:hover:!bg-rose-950/40 !rounded-xl text-xs font-semibold inline-flex items-center justify-center gap-1.5 cursor-pointer leading-none !px-3 !py-1.5"
        >
          <mat-icon class="!text-base !w-4 !h-4 leading-none flex items-center justify-center shrink-0">delete_outline</mat-icon>
          <span class="leading-none">Delete Task</span>
        </button>

        <!-- Primary Action Group (Slate Theme) -->
        <div class="inline-flex items-center gap-2.5">
          <!-- Change Status Modal Trigger (Secondary) -->
          <button
            type="button"
            mat-stroked-button
            (click)="triggerStatusChange()"
            class="!border !border-slate-300 dark:!border-slate-700 !text-slate-700 dark:!text-slate-300 !bg-white dark:!bg-slate-800 hover:!bg-slate-100 dark:hover:!bg-slate-700 !rounded-xl text-xs font-semibold inline-flex items-center justify-center gap-1.5 cursor-pointer leading-none !px-3.5 !py-1.5"
          >
            <mat-icon class="!text-base !w-4 !h-4 text-slate-600 dark:text-slate-400 leading-none flex items-center justify-center shrink-0">published_with_changes</mat-icon>
            <span class="leading-none">Change Status</span>
          </button>

          <!-- Edit Modal Trigger (Primary) -->
          <button
            type="button"
            mat-flat-button
            (click)="triggerEdit()"
            class="!bg-slate-900 hover:!bg-slate-800 dark:!bg-slate-100 dark:hover:!bg-white !text-white dark:!text-slate-900 !rounded-xl text-xs font-bold inline-flex items-center justify-center gap-1.5 cursor-pointer shadow-xs leading-none !px-4 !py-1.5"
          >
            <mat-icon class="!text-base !w-4 !h-4 leading-none flex items-center justify-center shrink-0">edit</mat-icon>
            <span class="leading-none">Edit Task</span>
          </button>
        </div>
      </div>
    </div>
  `,
})
export class TaskDetailDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<TaskDetailDialogComponent>);
  readonly data: TaskDetailDialogData = inject(MAT_DIALOG_DATA);

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
