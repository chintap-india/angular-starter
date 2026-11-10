import { Component, inject, OnInit, signal, computed, effect } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MockTaskApiService } from '../../core/services/mock-task-api.service';
import { SeoService } from '../../core/services/seo.service';
import { TaskItem, TaskPriority, TaskStatus, CreateTaskDto, UpdateTaskDto, formatTaskId } from '../../core/models/task.model';
import { MarkdownPipe } from '../../shared/pipes/markdown.pipe';
import { TaskFormDialogComponent } from './task-form-dialog.component';
import { TaskStatusDialogComponent } from './task-status-dialog.component';
import { TaskDeleteDialogComponent } from './task-delete-dialog.component';
import { TaskDetailDialogComponent } from './task-detail-dialog.component';
import { TaskSprintDetailsDialogComponent } from './task-sprint-details-dialog.component';

@Component({
  selector: 'app-task-detail-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MarkdownPipe,
  ],
  template: `
    <div class="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      
      <!-- Top Sticky Action Bar & Breadcrumbs -->
      <header class="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4">
          
          <!-- Left: Breadcrumbs & Back Navigation -->
          <div class="flex items-center gap-2 sm:gap-3 min-w-0">
            <a
              routerLink="/tasks"
              matTooltip="Back to Tasks Directory"
              aria-label="Back to tasks directory"
              class="w-9 h-9 rounded-full inline-flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer leading-none shrink-0"
            >
              <mat-icon class="!text-lg !w-5 !h-5 leading-none flex items-center justify-center shrink-0">arrow_back</mat-icon>
            </a>

            <!-- Breadcrumb Navigation -->
            <nav class="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-300 font-medium truncate" aria-label="Breadcrumb">
              <a routerLink="/" class="hover:text-slate-900 dark:hover:text-white transition">Home</a>
              <span class="text-slate-300 dark:text-slate-600">/</span>
              <a routerLink="/tasks" class="hover:text-slate-900 dark:hover:text-white transition">Tasks</a>
              <span class="text-slate-300 dark:text-slate-600">/</span>
              @if (task()) {
                <span class="font-mono font-bold text-slate-800 dark:text-slate-200 truncate">
                  {{ formatTaskId(task()!.id) }}
                </span>
              } @else {
                <span>Task</span>
              }
            </nav>
          </div>

          <!-- Right: Enterprise Action Icon Bar -->
          @if (task()) {
            <div class="flex items-center justify-end gap-1.5 p-1 rounded-full bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 shadow-xs self-end sm:self-auto overflow-x-auto max-w-full">
              
              <!-- Quick Complete / Incomplete Toggle -->
              <button
                type="button"
                (click)="toggleComplete()"
                [matTooltip]="task()!.status === 'completed' ? 'Mark as Incomplete' : 'Mark as Completed'"
                aria-label="Toggle task completion"
                class="w-8 h-8 rounded-full inline-flex items-center justify-center transition cursor-pointer leading-none"
                [ngClass]="task()!.status === 'completed' 
                  ? 'text-emerald-600 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/50' 
                  : 'text-slate-500 dark:text-slate-300 hover:text-emerald-600 hover:bg-white dark:hover:bg-slate-700'"
              >
                <mat-icon class="!text-lg !w-4.5 !h-4.5 leading-none flex items-center justify-center shrink-0">
                  {{ task()!.status === 'completed' ? 'check_circle' : 'radio_button_unchecked' }}
                </mat-icon>
              </button>

              <!-- Change Status Modal Trigger -->
              <button
                type="button"
                (click)="openStatusDialog()"
                matTooltip="Change Status Modal"
                aria-label="Change status"
                class="w-8 h-8 rounded-full inline-flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700 transition cursor-pointer leading-none"
              >
                <mat-icon class="!text-lg !w-4.5 !h-4.5 leading-none flex items-center justify-center shrink-0">published_with_changes</mat-icon>
              </button>

              <!-- Edit Task Modal Trigger -->
              <button
                type="button"
                (click)="openEditDialog()"
                matTooltip="Edit Task Modal"
                aria-label="Edit task"
                class="w-8 h-8 rounded-full inline-flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700 transition cursor-pointer leading-none"
              >
                <mat-icon class="!text-lg !w-4.5 !h-4.5 leading-none flex items-center justify-center shrink-0">edit</mat-icon>
              </button>

              <!-- Duplicate Task Modal Trigger -->
              <button
                type="button"
                (click)="openDuplicateDialog()"
                matTooltip="Duplicate Task"
                aria-label="Duplicate task"
                class="w-8 h-8 rounded-full inline-flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700 transition cursor-pointer leading-none"
              >
                <mat-icon class="!text-lg !w-4.5 !h-4.5 leading-none flex items-center justify-center shrink-0">content_copy</mat-icon>
              </button>

              <!-- Create New Task Trigger -->
              <button
                type="button"
                (click)="openCreateDialog()"
                matTooltip="Create New Task"
                aria-label="Create new task"
                class="w-8 h-8 rounded-full inline-flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700 transition cursor-pointer leading-none"
              >
                <mat-icon class="!text-lg !w-4.5 !h-4.5 leading-none flex items-center justify-center shrink-0">add_task</mat-icon>
              </button>

              <!-- Sprint Details Modal Trigger -->
              <button
                type="button"
                (click)="openSprintDetailsDialog()"
                matTooltip="Sprint Details (Modal)"
                aria-label="Sprint details"
                class="w-8 h-8 rounded-full inline-flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700 transition cursor-pointer leading-none"
              >
                <mat-icon class="!text-lg !w-4.5 !h-4.5 leading-none flex items-center justify-center shrink-0">info</mat-icon>
              </button>

              <!-- Copy Direct Link / Share -->
              <button
                type="button"
                (click)="copyTaskUrl()"
                matTooltip="Copy Task URL to Clipboard"
                aria-label="Share task link"
                class="w-8 h-8 rounded-full inline-flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700 transition cursor-pointer leading-none"
              >
                <mat-icon class="!text-lg !w-4.5 !h-4.5 leading-none flex items-center justify-center shrink-0">share</mat-icon>
              </button>

              <!-- Delete Task Modal Trigger -->
              <button
                type="button"
                (click)="openDeleteDialog()"
                matTooltip="Delete Task"
                aria-label="Delete task"
                class="w-8 h-8 rounded-full inline-flex items-center justify-center text-rose-500 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition cursor-pointer leading-none"
              >
                <mat-icon class="!text-lg !w-4.5 !h-4.5 leading-none flex items-center justify-center shrink-0">delete_outline</mat-icon>
              </button>

              <div class="w-px h-4 bg-slate-300 dark:bg-slate-700 mx-0.5"></div>

              <!-- Prev / Next Task Steppers -->
              <button
                type="button"
                (click)="navigateToAdjacentTask(-1)"
                [disabled]="!hasPrevTask()"
                matTooltip="Previous Task"
                aria-label="Previous task"
                class="w-8 h-8 rounded-full inline-flex items-center justify-center text-slate-500 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none transition cursor-pointer leading-none"
              >
                <mat-icon class="!text-lg !w-4.5 !h-4.5 leading-none flex items-center justify-center shrink-0">navigate_before</mat-icon>
              </button>

              <button
                type="button"
                (click)="navigateToAdjacentTask(1)"
                [disabled]="!hasNextTask()"
                matTooltip="Next Task"
                aria-label="Next task"
                class="w-8 h-8 rounded-full inline-flex items-center justify-center text-slate-500 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none transition cursor-pointer leading-none"
              >
                <mat-icon class="!text-lg !w-4.5 !h-4.5 leading-none flex items-center justify-center shrink-0">navigate_next</mat-icon>
              </button>

            </div>
          }
        </div>
      </header>

      <!-- Loading Bar -->
      @if (isLoading()) {
        <mat-progress-bar mode="indeterminate" class="!h-0.5"></mat-progress-bar>
      }

      <!-- Main Container: Aligned to Navbar Width (max-w-7xl) -->
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        
        @if (task()) {
          <!-- Title & Category Card -->
          <div class="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4">
            
            <div class="flex flex-wrap items-center gap-2 text-xs">
              <span class="inline-flex items-center gap-1 font-mono font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                {{ formatTaskId(task()!.id) }}
              </span>
              
              <span class="inline-flex items-center gap-1 font-sans font-medium px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                <mat-icon class="!text-xs !w-3.5 !h-3.5 text-slate-500 dark:text-slate-400">folder</mat-icon>
                <span>{{ task()!.category }}</span>
              </span>

              <!-- Status Chip (Clickable to open status modal) -->
              <button
                type="button"
                (click)="openStatusDialog()"
                matTooltip="Click to change status (Modal)"
                class="inline-flex items-center gap-1 font-sans font-medium px-2.5 py-1 rounded-full text-xs cursor-pointer hover:ring-2 hover:ring-emerald-500/40 transition leading-none"
                [ngClass]="{
                  'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/80': task()!.status === 'completed',
                  'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/80': task()!.status === 'in-progress',
                  'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700': task()!.status === 'todo'
                }"
              >
                <mat-icon class="!text-xs !w-3.5 !h-3.5">
                  {{ task()!.status === 'completed' ? 'check_circle' : (task()!.status === 'in-progress' ? 'pending' : 'radio_button_unchecked') }}
                </mat-icon>
                <span>{{ task()!.status === 'in-progress' ? 'In Progress' : (task()!.status === 'completed' ? 'Completed' : 'To Do') }}</span>
                <mat-icon class="!text-[10px] !w-2.5 !h-2.5 opacity-60 ml-0.5">expand_more</mat-icon>
              </button>

              <!-- Priority Chip -->
              <span
                class="inline-flex items-center gap-1 font-sans font-medium px-2.5 py-1 rounded-full text-xs"
                [ngClass]="{
                  'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800/80': task()!.priority === 'urgent',
                  'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/80': task()!.priority === 'high',
                  'bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800/80': task()!.priority === 'medium',
                  'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700': task()!.priority === 'low'
                }"
              >
                <mat-icon class="!text-xs !w-3.5 !h-3.5">
                  {{ task()!.priority === 'urgent' || task()!.priority === 'high' ? 'priority_high' : 'low_priority' }}
                </mat-icon>
                  <span>Priority: {{ task()!.priority | titlecase }}</span>
              </span>

              <!-- Sprint Details Modal Trigger -->
              <button
                type="button"
                (click)="openSprintDetailsDialog()"
                matTooltip="View full sprint details & metadata (Modal)"
                aria-label="Sprint Details"
                class="inline-flex items-center gap-1 font-sans font-medium px-2.5 py-1 rounded-full text-xs text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition cursor-pointer leading-none"
              >
                <mat-icon class="!text-xs !w-3.5 !h-3.5 text-slate-500 dark:text-slate-400">info</mat-icon>
                <span>Sprint Details</span>
              </button>
            </div>

            <h1 
              class="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white leading-snug tracking-tight"
            >
              {{ task()!.title }}
            </h1>

            <p class="text-xs text-slate-500 dark:text-slate-300 flex flex-wrap items-center gap-4 pt-1">
              <span class="inline-flex items-center gap-1">
                <mat-icon class="!text-xs !w-3.5 !h-3.5">schedule</mat-icon>
                <span>Created {{ task()!.createdAt | date:'mediumDate' }}</span>
              </span>
              <span class="inline-flex items-center gap-1">
                <mat-icon class="!text-xs !w-3.5 !h-3.5">update</mat-icon>
                <span>Updated {{ task()!.updatedAt | date:'medium' }}</span>
              </span>
              @if (task()!.dueDate) {
                <span class="inline-flex items-center gap-1 text-slate-700 dark:text-slate-200 font-semibold font-mono">
                  <mat-icon class="!text-xs !w-3.5 !h-3.5 text-slate-500 dark:text-slate-400">calendar_today</mat-icon>
                  <span>Due: {{ task()!.dueDate }}</span>
                </span>
              }
            </p>

          </div>

          <!-- Description Section (Helvetica Neue) -->
          <div class="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4">
            <div class="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700/80">
              <div class="flex items-center gap-2">
                <mat-icon class="text-slate-600 dark:text-slate-400">description</mat-icon>
                <h2 class="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  Description
                </h2>
              </div>
              <button
                type="button"
                (click)="openEditDialog()"
                matTooltip="Edit Description"
                class="w-7 h-7 rounded-full inline-flex items-center justify-center text-slate-400 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer leading-none"
                aria-label="Edit description"
              >
                <mat-icon class="!text-base !w-4 !h-4 leading-none flex items-center justify-center shrink-0">edit</mat-icon>
              </button>
            </div>

            @if (task()!.description) {
              <div class="task-editor-font text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base prose dark:prose-invert max-w-none pt-2">
                <div [innerHTML]="task()!.description | markdown" ngSkipHydration></div>
              </div>
            } @else {
              <div class="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-dashed border-slate-200 dark:border-slate-700 text-center space-y-3">
                <mat-icon class="!text-3xl !w-8 !h-8 text-slate-400 dark:text-slate-400">notes</mat-icon>
                <p class="text-sm text-slate-500 dark:text-slate-300">No description provided yet.</p>
                <button
                  type="button"
                  (click)="openEditDialog()"
                  mat-flat-button
                  class="!rounded-full !bg-slate-900 dark:!bg-slate-100 !text-white dark:!text-slate-900 !px-5 !py-1.5 text-xs font-semibold"
                >
                  Add Description
                </button>
              </div>
            }
          </div>
        } @else if (!isLoading()) {
          <!-- Empty / Not Found State -->
          <div class="p-12 sm:p-16 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 text-center max-w-xl mx-auto shadow-sm space-y-4">
            <div class="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 mx-auto">
              <mat-icon class="!text-3xl !w-8 !h-8">search_off</mat-icon>
            </div>
            <h2 class="text-xl font-bold font-heading text-slate-900 dark:text-white">
              Task Not Found
            </h2>
            <p class="text-sm text-slate-500 dark:text-slate-300">
              The task you requested (#{{ requestedTaskId() }}) does not exist or may have been deleted from your sprint backlog.
            </p>
            <div class="pt-4 flex items-center justify-center gap-3">
              <a
                routerLink="/tasks"
                mat-flat-button
                class="!rounded-full !bg-slate-900 dark:!bg-slate-100 !text-white dark:!text-slate-900 hover:!bg-slate-800 dark:hover:!bg-white !px-6 !py-2 text-xs font-bold shadow-xs"
              >
                Back to Tasks Directory
              </a>
              <button
                type="button"
                (click)="openCreateDialog()"
                mat-stroked-button
                class="!rounded-full !border-slate-300 dark:!border-slate-700 !text-slate-700 dark:text-slate-300 hover:!bg-slate-100 dark:hover:!bg-slate-800 !px-6 !py-2 text-xs font-bold shadow-xs cursor-pointer inline-flex items-center gap-1.5"
              >
                <mat-icon class="!text-base !w-4 !h-4 leading-none">add_task</mat-icon>
                <span>Create Task</span>
              </button>
            </div>
          </div>
        }

      </main>

    </div>
  `,
})
export class TaskDetailPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly taskApi = inject(MockTaskApiService);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);
  private readonly seo = inject(SeoService);

  readonly task = signal<TaskItem | null>(null);
  readonly isLoading = signal<boolean>(true);
  readonly requestedTaskId = signal<string>('');
  protected readonly formatTaskId = formatTaskId;

  private readonly allTasks = this.taskApi.tasksSignal;

  readonly currentIndex = computed(() => {
    const current = this.task();
    if (!current) return -1;
    return this.allTasks().findIndex((t) => t.id === current.id);
  });

  readonly hasPrevTask = computed(() => this.currentIndex() > 0);
  readonly hasNextTask = computed(() => {
    const idx = this.currentIndex();
    return idx >= 0 && idx < this.allTasks().length - 1;
  });

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('taskId');
      if (id) {
        this.requestedTaskId.set(id);
        this.loadTask(id);
      }
    });
  }

  loadTask(id: string): void {
    this.isLoading.set(true);
    this.taskApi.getTask(id).subscribe({
      next: (found) => {
        this.isLoading.set(false);
        if (found) {
          this.task.set(found);
          this.seo.setSeoData({
            title: `${found.title} | Task Details`,
            description: found.description?.slice(0, 160) || `Sprint task details for ${found.title}`,
            url: `/tasks/${found.id}`,
            breadcrumbs: [
              { name: 'Home', url: '/' },
              { name: 'Tasks', url: '/tasks' },
              { name: formatTaskId(found.id), url: `/tasks/${found.id}` },
            ],
          });
        } else {
          this.task.set(null);
        }
      },
      error: () => {
        this.isLoading.set(false);
        this.task.set(null);
      },
    });
  }

  toggleComplete(): void {
    const current = this.task();
    if (!current) return;

    this.taskApi.toggleComplete(current.id).subscribe({
      next: (updated) => {
        this.task.set(updated);
        const msg = updated.status === 'completed' ? 'Task marked as completed.' : 'Task marked as active.';
        this.snackBar.open(msg, 'Dismiss', { duration: 2500, verticalPosition: 'bottom' });
      },
    });
  }

  openStatusDialog(): void {
    const current = this.task();
    if (!current) return;

    const ref = this.dialog.open(TaskStatusDialogComponent, {
      width: '460px',
      maxWidth: '95vw',
      data: { task: current },
    });

    ref.afterClosed().subscribe((res) => {
      if (res && res.action === 'update') {
        this.taskApi.updateTask(current.id, { status: res.status }).subscribe({
          next: (updated) => {
            this.task.set(updated);
            this.snackBar.open('Status updated successfully!', 'Dismiss', { duration: 2500 });
          },
        });
      }
    });
  }

  openEditDialog(): void {
    const current = this.task();
    if (!current) return;

    const ref = this.dialog.open(TaskFormDialogComponent, {
      width: '680px',
      maxWidth: '95vw',
      data: { mode: 'edit', task: current },
    });

    ref.afterClosed().subscribe((res) => {
      if (res && res.action === 'save') {
        this.taskApi.updateTask(current.id, res.dto as UpdateTaskDto).subscribe({
          next: (updated) => {
            this.task.set(updated);
            this.snackBar.open('Task specifications updated!', 'Dismiss', { duration: 2500 });
          },
        });
      }
    });
  }

  openCreateDialog(): void {
    const ref = this.dialog.open(TaskFormDialogComponent, {
      width: '680px',
      maxWidth: '95vw',
      data: { mode: 'create' },
    });

    ref.afterClosed().subscribe((res) => {
      if (res && res.action === 'save') {
        this.taskApi.createTask(res.dto as CreateTaskDto).subscribe({
          next: (created) => {
            this.snackBar.open('Task created successfully!', 'Dismiss', { duration: 2500 });
            this.router.navigate(['/tasks', created.id]);
          },
        });
      }
    });
  }

  openDuplicateDialog(): void {
    const current = this.task();
    if (!current) return;

    const ref = this.dialog.open(TaskFormDialogComponent, {
      width: '680px',
      maxWidth: '95vw',
      data: {
        mode: 'duplicate',
        task: {
          ...current,
          id: '',
          title: `${current.title} (Copy)`,
          status: 'todo',
        },
      },
    });

    ref.afterClosed().subscribe((res) => {
      if (res && res.action === 'save') {
        this.taskApi.createTask(res.dto as CreateTaskDto).subscribe({
          next: (created) => {
            this.snackBar.open('Task duplicated successfully!', 'Dismiss', { duration: 2500 });
            this.router.navigate(['/tasks', created.id]);
          },
        });
      }
    });
  }

  openSprintDetailsDialog(): void {
    const current = this.task();
    if (!current) return;

    const ref = this.dialog.open(TaskSprintDetailsDialogComponent, {
      width: '520px',
      maxWidth: '95vw',
      data: { task: current },
    });

    ref.afterClosed().subscribe((res) => {
      if (res && res.action === 'edit') {
        this.openEditDialog();
      }
    });
  }

  openModalView(): void {
    // Retained for backward compatibility: opens sprint details dialog
    this.openSprintDetailsDialog();
  }

  openDeleteDialog(): void {
    const current = this.task();
    if (!current) return;

    const ref = this.dialog.open(TaskDeleteDialogComponent, {
      width: '460px',
      maxWidth: '95vw',
      data: { task: current },
    });

    ref.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.taskApi.deleteTask(current.id).subscribe({
          next: () => {
            this.snackBar.open(`Task "${current.title}" deleted.`, 'Dismiss', { duration: 3000 });
            this.router.navigate(['/tasks']);
          },
        });
      }
    });
  }

  copyTaskUrl(): void {
    if (typeof window !== 'undefined') {
      const url = window.location.href;
      navigator.clipboard?.writeText(url).then(() => {
        this.snackBar.open('Task URL copied to clipboard!', 'Dismiss', { duration: 2500 });
      });
    }
  }

  navigateToAdjacentTask(delta: number): void {
    const idx = this.currentIndex();
    const tasks = this.allTasks();
    const target = tasks[idx + delta];
    if (target) {
      this.router.navigate(['/tasks', target.id]);
    }
  }
}
