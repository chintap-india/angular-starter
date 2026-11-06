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
import { TaskItem, TaskPriority, TaskStatus, UpdateTaskDto } from '../../core/models/task.model';
import { MarkdownPipe } from '../../shared/pipes/markdown.pipe';
import { TaskFormDialogComponent } from './task-form-dialog.component';
import { TaskStatusDialogComponent } from './task-status-dialog.component';
import { TaskDeleteDialogComponent } from './task-delete-dialog.component';
import { TaskDetailDialogComponent } from './task-detail-dialog.component';

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
    <div class="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors duration-200">
      
      <!-- Top Sticky Action Bar & Breadcrumbs -->
      <header class="sticky top-0 z-30 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-b border-stone-200/80 dark:border-stone-800/80 px-4 sm:px-8 py-3">
        <div class="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          <!-- Left: Breadcrumbs & Back Navigation -->
          <div class="flex items-center gap-2 sm:gap-3 min-w-0">
            <a
              routerLink="/tasks"
              matTooltip="Back to Tasks Directory"
              aria-label="Back to tasks directory"
              class="w-9 h-9 rounded-full inline-flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer leading-none"
            >
              <mat-icon class="!text-lg !w-5 !h-5 leading-none flex items-center justify-center shrink-0">arrow_back</mat-icon>
            </a>

            <!-- Breadcrumb Navigation -->
            <nav class="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400 font-medium truncate" aria-label="Breadcrumb">
              <a routerLink="/" class="hover:text-stone-900 dark:hover:text-white transition">Home</a>
              <span class="text-stone-300 dark:text-stone-700">/</span>
              <a routerLink="/tasks" class="hover:text-stone-900 dark:hover:text-white transition">Tasks</a>
              <span class="text-stone-300 dark:text-stone-700">/</span>
              @if (task()) {
                <span class="font-mono font-bold text-slate-800 dark:text-slate-200 truncate">
                  #{{ task()!.id.replace('task-', '') }}
                </span>
              } @else {
                <span>Task</span>
              }
            </nav>
          </div>

          <!-- Right: Enterprise Action Icon Bar -->
          @if (task()) {
            <div class="flex items-center gap-1.5 p-1 rounded-full bg-stone-100/90 dark:bg-stone-800/90 border border-stone-200 dark:border-stone-700/80 shadow-xs">
              
              <!-- Quick Complete / Incomplete Toggle -->
              <button
                type="button"
                (click)="toggleComplete()"
                [matTooltip]="task()!.status === 'completed' ? 'Mark as Incomplete' : 'Mark as Completed'"
                aria-label="Toggle task completion"
                class="w-8 h-8 rounded-full inline-flex items-center justify-center transition cursor-pointer leading-none"
                [ngClass]="task()!.status === 'completed' 
                  ? 'text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/50' 
                  : 'text-stone-500 hover:text-emerald-600 hover:bg-white dark:hover:bg-stone-700'"
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
                class="w-8 h-8 rounded-full inline-flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-stone-700 transition cursor-pointer leading-none"
              >
                <mat-icon class="!text-lg !w-4.5 !h-4.5 leading-none flex items-center justify-center shrink-0">published_with_changes</mat-icon>
              </button>

              <!-- Edit Task Modal Trigger -->
              <button
                type="button"
                (click)="openEditDialog()"
                matTooltip="Edit Task Modal"
                aria-label="Edit task"
                class="w-8 h-8 rounded-full inline-flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-stone-700 transition cursor-pointer leading-none"
              >
                <mat-icon class="!text-lg !w-4.5 !h-4.5 leading-none flex items-center justify-center shrink-0">edit</mat-icon>
              </button>

              <!-- Quick View in Modal Trigger -->
              <button
                type="button"
                (click)="openModalView()"
                matTooltip="Open Modal Preview / Fullscreen"
                aria-label="Open modal preview"
                class="w-8 h-8 rounded-full inline-flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-stone-700 transition cursor-pointer leading-none"
              >
                <mat-icon class="!text-lg !w-4.5 !h-4.5 leading-none flex items-center justify-center shrink-0">visibility</mat-icon>
              </button>

              <!-- Copy Direct Link / Share -->
              <button
                type="button"
                (click)="copyTaskUrl()"
                matTooltip="Copy Task URL to Clipboard"
                aria-label="Share task link"
                class="w-8 h-8 rounded-full inline-flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-stone-700 transition cursor-pointer leading-none"
              >
                <mat-icon class="!text-lg !w-4.5 !h-4.5 leading-none flex items-center justify-center shrink-0">share</mat-icon>
              </button>

              <!-- Delete Task Modal Trigger -->
              <button
                type="button"
                (click)="openDeleteDialog()"
                matTooltip="Delete Task"
                aria-label="Delete task"
                class="w-8 h-8 rounded-full inline-flex items-center justify-center text-rose-500 hover:text-rose-700 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition cursor-pointer leading-none"
              >
                <mat-icon class="!text-lg !w-4.5 !h-4.5 leading-none flex items-center justify-center shrink-0">delete_outline</mat-icon>
              </button>

              <div class="w-px h-4 bg-stone-300 dark:bg-stone-700 mx-0.5"></div>

              <!-- Prev / Next Task Steppers -->
              <button
                type="button"
                (click)="navigateToAdjacentTask(-1)"
                [disabled]="!hasPrevTask()"
                matTooltip="Previous Task"
                aria-label="Previous task"
                class="w-8 h-8 rounded-full inline-flex items-center justify-center text-stone-500 hover:text-stone-900 dark:hover:text-white hover:bg-white dark:hover:bg-stone-700 disabled:opacity-30 disabled:pointer-events-none transition cursor-pointer leading-none"
              >
                <mat-icon class="!text-lg !w-4.5 !h-4.5 leading-none flex items-center justify-center shrink-0">navigate_before</mat-icon>
              </button>

              <button
                type="button"
                (click)="navigateToAdjacentTask(1)"
                [disabled]="!hasNextTask()"
                matTooltip="Next Task"
                aria-label="Next task"
                class="w-8 h-8 rounded-full inline-flex items-center justify-center text-stone-500 hover:text-stone-900 dark:hover:text-white hover:bg-white dark:hover:bg-stone-700 disabled:opacity-30 disabled:pointer-events-none transition cursor-pointer leading-none"
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

      <!-- Main Container -->
      <main class="max-w-6xl mx-auto px-4 sm:px-8 py-8">
        
        @if (task()) {
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <!-- Left 8 Columns: Task Title & Markdown Description -->
            <div class="lg:col-span-8 space-y-6">
              
              <!-- Title & Category Card -->
              <div class="p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-sm space-y-4">
                
                <div class="flex flex-wrap items-center gap-2 text-xs">
                  <span class="inline-flex items-center gap-1 font-mono font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                    #{{ task()!.id.replace('task-', '') }}
                  </span>
                  
                  <span class="inline-flex items-center gap-1 font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700">
                    <mat-icon class="!text-xs !w-3.5 !h-3.5">folder</mat-icon>
                    <span>{{ task()!.category }}</span>
                  </span>

                  <!-- Status Chip -->
                  <span
                    class="inline-flex items-center gap-1 font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full text-xs"
                    [ngClass]="{
                      'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800': task()!.status === 'completed',
                      'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800': task()!.status === 'in-progress',
                      'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700': task()!.status === 'todo'
                    }"
                  >
                    <mat-icon class="!text-xs !w-3.5 !h-3.5">
                      {{ task()!.status === 'completed' ? 'check_circle' : (task()!.status === 'in-progress' ? 'pending' : 'radio_button_unchecked') }}
                    </mat-icon>
                    <span>{{ task()!.status === 'in-progress' ? 'In Progress' : (task()!.status === 'completed' ? 'Completed' : 'To Do') }}</span>
                  </span>

                  <!-- Priority Chip -->
                  <span
                    class="inline-flex items-center gap-1 font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full text-xs"
                    [ngClass]="{
                      'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-900': task()!.priority === 'urgent',
                      'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-900': task()!.priority === 'high',
                      'bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-900': task()!.priority === 'medium',
                      'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700': task()!.priority === 'low'
                    }"
                  >
                    <mat-icon class="!text-xs !w-3.5 !h-3.5">
                      {{ task()!.priority === 'urgent' || task()!.priority === 'high' ? 'priority_high' : 'low_priority' }}
                    </mat-icon>
                    <span>Priority: {{ task()!.priority }}</span>
                  </span>
                </div>

                <h1 
                  class="text-2xl sm:text-3xl font-extrabold font-heading text-stone-900 dark:text-white leading-tight tracking-tight"
                  [class.line-through]="task()!.status === 'completed'"
                  [class.text-stone-400]="task()!.status === 'completed'"
                >
                  {{ task()!.title }}
                </h1>

                <p class="text-xs text-stone-500 dark:text-stone-400 flex flex-wrap items-center gap-4 pt-1">
                  <span class="inline-flex items-center gap-1">
                    <mat-icon class="!text-xs !w-3.5 !h-3.5">schedule</mat-icon>
                    <span>Created {{ task()!.createdAt | date:'mediumDate' }}</span>
                  </span>
                  <span class="inline-flex items-center gap-1">
                    <mat-icon class="!text-xs !w-3.5 !h-3.5">update</mat-icon>
                    <span>Updated {{ task()!.updatedAt | date:'medium' }}</span>
                  </span>
                  @if (task()!.dueDate) {
                    <span class="inline-flex items-center gap-1 text-slate-700 dark:text-slate-300 font-semibold font-mono">
                      <mat-icon class="!text-xs !w-3.5 !h-3.5 text-slate-500">calendar_today</mat-icon>
                      <span>Due: {{ task()!.dueDate }}</span>
                    </span>
                  }
                </p>

              </div>

              <!-- Markdown Specifications & Description (Helvetica Neue) -->
              <div class="p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-sm space-y-4">
                <div class="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
                  <div class="flex items-center gap-2">
                    <mat-icon class="text-slate-600 dark:text-slate-400">description</mat-icon>
                    <h2 class="text-sm font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                      Task Specifications & Notes
                    </h2>
                  </div>
                  <button
                    type="button"
                    (click)="openEditDialog()"
                    matTooltip="Edit Specifications"
                    class="w-7 h-7 rounded-full inline-flex items-center justify-center text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer leading-none"
                    aria-label="Edit specifications"
                  >
                    <mat-icon class="!text-base !w-4 !h-4 leading-none flex items-center justify-center shrink-0">edit</mat-icon>
                  </button>
                </div>

                @if (task()!.description) {
                  <div class="task-editor-font text-stone-800 dark:text-stone-200 leading-relaxed text-sm sm:text-base prose dark:prose-invert max-w-none pt-2">
                    <div [innerHTML]="task()!.description | markdown" ngSkipHydration></div>
                  </div>
                } @else {
                  <div class="p-8 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-dashed border-stone-200 dark:border-stone-700 text-center space-y-3">
                    <mat-icon class="!text-3xl !w-8 !h-8 text-stone-400">notes</mat-icon>
                    <p class="text-sm text-stone-500 dark:text-stone-400">No markdown specifications provided yet.</p>
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

            </div>

            <!-- Right 4 Columns: Metadata Sidebar & Quick Action Panels -->
            <div class="lg:col-span-4 space-y-6">
              
              <!-- Quick Actions Card (Slate Theme Pill Buttons) -->
              <div class="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-sm space-y-3">
                <h3 class="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2">
                  Task Actions
                </h3>
                
                <!-- Pill Shaped Action Buttons -->
                <button
                  type="button"
                  (click)="toggleComplete()"
                  mat-stroked-button
                  class="w-full !rounded-full !border !border-slate-300 dark:!border-slate-700 !text-slate-800 dark:!text-slate-200 !bg-white dark:!bg-slate-800 hover:!bg-slate-100 dark:hover:!bg-slate-700 !py-2 text-xs font-semibold cursor-pointer justify-start"
                >
                  <mat-icon class="!text-base !w-4 !h-4 leading-none mr-2" [ngClass]="task()!.status === 'completed' ? 'text-emerald-500' : 'text-slate-500'">
                    {{ task()!.status === 'completed' ? 'check_circle' : 'radio_button_unchecked' }}
                  </mat-icon>
                  <span>{{ task()!.status === 'completed' ? 'Mark Incomplete' : 'Mark Completed' }}</span>
                </button>

                <button
                  type="button"
                  (click)="openStatusDialog()"
                  mat-stroked-button
                  class="w-full !rounded-full !border !border-slate-300 dark:!border-slate-700 !text-slate-800 dark:!text-slate-200 !bg-white dark:!bg-slate-800 hover:!bg-slate-100 dark:hover:!bg-slate-700 !py-2 text-xs font-semibold cursor-pointer justify-start"
                >
                  <mat-icon class="!text-base !w-4 !h-4 leading-none mr-2 text-slate-500">published_with_changes</mat-icon>
                  <span>Change Status</span>
                </button>

                <button
                  type="button"
                  (click)="openEditDialog()"
                  mat-flat-button
                  class="w-full !rounded-full !bg-slate-900 dark:!bg-slate-100 !text-white dark:!text-slate-900 hover:!bg-slate-800 dark:hover:!bg-white !py-2 text-xs font-bold cursor-pointer shadow-xs justify-start"
                >
                  <mat-icon class="!text-base !w-4 !h-4 leading-none mr-2">edit</mat-icon>
                  <span>Edit Specifications</span>
                </button>

                <button
                  type="button"
                  (click)="copyTaskUrl()"
                  mat-stroked-button
                  class="w-full !rounded-full !border !border-slate-300 dark:!border-slate-700 !text-slate-800 dark:!text-slate-200 !bg-white dark:!bg-slate-800 hover:!bg-slate-100 dark:hover:!bg-slate-700 !py-2 text-xs font-semibold cursor-pointer justify-start"
                >
                  <mat-icon class="!text-base !w-4 !h-4 leading-none mr-2 text-slate-500">share</mat-icon>
                  <span>Copy Task URL</span>
                </button>

                <div class="pt-2 border-t border-stone-100 dark:border-stone-800">
                  <button
                    type="button"
                    (click)="openDeleteDialog()"
                    mat-button
                    class="w-full !rounded-full !text-rose-600 dark:!text-rose-400 hover:!bg-rose-50 dark:hover:!bg-rose-950/40 !py-2 text-xs font-semibold cursor-pointer justify-start"
                  >
                    <mat-icon class="!text-base !w-4 !h-4 leading-none mr-2 text-rose-500">delete_outline</mat-icon>
                    <span>Delete Task</span>
                  </button>
                </div>
              </div>

              <!-- Metadata Summary Card -->
              <div class="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-sm space-y-4">
                <h3 class="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                  Sprint Details
                </h3>

                <dl class="space-y-3 text-xs">
                  <div class="flex items-center justify-between pb-2 border-b border-stone-100 dark:border-stone-800">
                    <dt class="text-stone-500 dark:text-stone-400">ID</dt>
                    <dd class="font-mono font-bold text-slate-900 dark:text-white">#{{ task()!.id.replace('task-', '') }}</dd>
                  </div>
                  <div class="flex items-center justify-between pb-2 border-b border-stone-100 dark:border-stone-800">
                    <dt class="text-stone-500 dark:text-stone-400">Category</dt>
                    <dd class="font-bold text-slate-900 dark:text-white">{{ task()!.category }}</dd>
                  </div>
                  <div class="flex items-center justify-between pb-2 border-b border-stone-100 dark:border-stone-800">
                    <dt class="text-stone-500 dark:text-stone-400">Priority</dt>
                    <dd class="font-mono font-bold uppercase text-slate-900 dark:text-white">{{ task()!.priority }}</dd>
                  </div>
                  <div class="flex items-center justify-between pb-2 border-b border-stone-100 dark:border-stone-800">
                    <dt class="text-stone-500 dark:text-stone-400">Due Date</dt>
                    <dd class="font-mono text-slate-900 dark:text-white">{{ task()!.dueDate || 'Not Set' }}</dd>
                  </div>
                  <div class="flex items-center justify-between pb-2 border-b border-stone-100 dark:border-stone-800">
                    <dt class="text-stone-500 dark:text-stone-400">Route Link</dt>
                    <dd class="font-mono text-slate-500 text-[11px] truncate max-w-[140px]">/tasks/{{ task()!.id }}</dd>
                  </div>
                </dl>
              </div>

            </div>

          </div>
        } @else if (!isLoading()) {
          <!-- Empty / Not Found State -->
          <div class="p-12 sm:p-16 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 text-center max-w-xl mx-auto shadow-sm space-y-4">
            <div class="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 mx-auto">
              <mat-icon class="!text-3xl !w-8 !h-8">search_off</mat-icon>
            </div>
            <h2 class="text-xl font-bold font-heading text-stone-900 dark:text-white">
              Task Not Found
            </h2>
            <p class="text-sm text-stone-500 dark:text-stone-400">
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
              { name: `#${found.id.replace('task-', '')}`, url: `/tasks/${found.id}` },
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
        const msg = updated.status === 'completed' ? 'Task marked as completed! 🎉' : 'Task marked as active.';
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
      width: '720px',
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

  openModalView(): void {
    const current = this.task();
    if (!current) return;

    const ref = this.dialog.open(TaskDetailDialogComponent, {
      width: '760px',
      maxWidth: '95vw',
      data: { task: current },
    });

    ref.afterClosed().subscribe((res) => {
      if (!res) return;
      if (res.action === 'edit') {
        this.openEditDialog();
      } else if (res.action === 'status') {
        this.openStatusDialog();
      } else if (res.action === 'delete') {
        this.openDeleteDialog();
      }
    });
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
