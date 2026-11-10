import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

interface ShortcutGroup {
  category: string;
  items: { key: string; description: string }[];
}

@Component({
  selector: 'app-task-shortcuts-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <div class="p-6 w-full max-w-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 select-none">
      
      <!-- Header -->
      <div class="flex items-center justify-between pb-4 border-b border-slate-200/80 dark:border-slate-800">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 flex items-center justify-center shadow-xs">
            <mat-icon class="!text-lg !w-5 !h-5 leading-none flex items-center justify-center">keyboard</mat-icon>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h2 class="text-base font-bold text-slate-900 dark:text-white leading-tight m-0">
                Keyboard Shortcuts
              </h2>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
                Pro Mode
              </span>
            </div>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Navigate and manage enterprise tasks with zero mouse dependency
            </p>
          </div>
        </div>

        <button
          type="button"
          (click)="dialogRef.close()"
          aria-label="Close shortcuts guide"
          class="w-7 h-7 rounded-full inline-flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
        >
          <mat-icon class="!text-base !w-4 !h-4">close</mat-icon>
        </button>
      </div>

      <!-- Shortcuts Grid -->
      <div class="py-4 space-y-4 max-h-[60vh] overflow-y-auto pr-1">
        @for (group of shortcutGroups; track group.category) {
          <div>
            <h3 class="text-xs font-mono font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase mb-2">
              {{ group.category }}
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
              @for (item of group.items; track item.key) {
                <div class="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 text-xs">
                  <span class="text-slate-700 dark:text-slate-300 font-medium truncate pr-2">
                    {{ item.description }}
                  </span>
                  <kbd class="px-2 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-mono font-bold text-[11px] shadow-2xs shrink-0">
                    {{ item.key }}
                  </kbd>
                </div>
              }
            </div>
          </div>
        }
      </div>

      <!-- Footer -->
      <div class="pt-4 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <span class="flex items-center gap-1.5">
          <span>Press</span>
          <kbd class="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-mono font-bold text-[10px]">?</kbd>
          <span>anytime to toggle this cheat sheet</span>
        </span>
        <button
          type="button"
          mat-flat-button
          (click)="dialogRef.close()"
          class="!rounded-full !bg-slate-900 dark:!bg-slate-100 !text-white dark:!text-slate-900 !px-4 !py-1 text-xs font-semibold cursor-pointer"
        >
          Got It
        </button>
      </div>

    </div>
  `
})
export class TaskShortcutsDialogComponent {
  readonly dialogRef = inject(MatDialogRef<TaskShortcutsDialogComponent>);

  readonly shortcutGroups: ShortcutGroup[] = [
    {
      category: 'Creation & Actions',
      items: [
        { key: 'C or N', description: 'Create new task' },
        { key: 'E', description: 'Edit task specifications' },
        { key: 'S', description: 'Change status modal' },
        { key: 'D', description: 'Duplicate task' },
        { key: 'X or Space', description: 'Toggle completed / active' },
        { key: 'Delete', description: 'Delete task' },
        { key: 'L', description: 'Copy task URL' }
      ]
    },
    {
      category: 'Navigation & Stepping',
      items: [
        { key: 'J or ↓', description: 'Select next task' },
        { key: 'K or ↑', description: 'Select previous task' },
        { key: '[', description: 'Previous task in detail view' },
        { key: ']', description: 'Next task in detail view' },
        { key: 'Enter', description: 'Open selected task' },
        { key: 'Esc', description: 'Back to directory / Close' }
      ]
    },
    {
      category: 'Search & Views',
      items: [
        { key: '/ or ⌘K', description: 'Focus search bar' },
        { key: 'F', description: 'Toggle filters panel' },
        { key: '1', description: 'Switch to Table view' },
        { key: '2', description: 'Switch to Cards view' },
        { key: '3', description: 'Switch to Sprint metrics' }
      ]
    }
  ];
}
