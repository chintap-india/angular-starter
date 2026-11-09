import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MockTaskApiService } from '../../core/services/mock-task-api.service';
import { AuthService } from '../../core/services/auth.service';
import { SeoService } from '../../core/services/seo.service';
import { SITE_CONFIG } from '../../core/config/site.config';
import { SITE_CONTENT } from '../../core/config/site.content';
import { TaskItem, TaskPriority, TaskStatus, CreateTaskDto, UpdateTaskDto, formatTaskId } from '../../core/models/task.model';
import { TaskFormDialogComponent } from './task-form-dialog.component';
import { TaskDetailDialogComponent } from './task-detail-dialog.component';
import { TaskStatusDialogComponent } from './task-status-dialog.component';
import { TaskDeleteDialogComponent } from './task-delete-dialog.component';
import { MarkdownPipe } from '../../shared/pipes/markdown.pipe';

/**
 * TasksPageComponent - Implementation of the `chintap-compact-template` design pattern.
 *
 * `chintap-compact-template` Architecture Features:
 * - Two-Tier Navigation Toolbar:
 *   - Tier 1: Brand title badge, live count, inline quick search, view switchers, utilities, and primary CTA.
 *   - Tier 2: Segmented status filter pills, priority filter dropdown, reset filter button, and tucked pagination.
 * - Tucked Top-Bar Pagination: Rows-per-page selector + step navigation controller (first, prev, range, next, last)
 *   embedded directly into the top sub-bar to reclaim ~64px of vertical height and eliminate viewport scrolling.
 * - Row Focus Depth: Dynamic hover/focus-within styling highlighting the active row while softly dimming peripherals.
 * - Dual Layout Switching: Seamless instant toggle between sortable Material Table (`table`) and Markdown Cards (`cards`).
 * - Sprint Metrics Dashboard: Cohesive KPI cards, multi-segment priority distribution bar, workload bars, and action queue.
 */
@Component({
  selector: 'app-tasks-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatChipsModule,
    MatSnackBarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatDividerModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonToggleModule,
    MatTabsModule,
    MatMenuModule,
    MarkdownPipe,
  ],
  templateUrl: './tasks-page.component.html',
})
export class TasksPageComponent implements OnInit {
  private readonly taskApi = inject(MockTaskApiService);
  readonly authService = inject(AuthService);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);
  private readonly seo = inject(SeoService);
  readonly siteConfig = inject(SITE_CONFIG);
  readonly content = inject(SITE_CONTENT);

  readonly tasks = this.taskApi.tasksSignal;
  readonly isLoading = this.taskApi.loadingSignal;

  readonly activeTab = signal<'directory' | 'metrics'>('directory');
  readonly viewMode = signal<'table' | 'cards'>('table');

  readonly activeView = computed<'table' | 'cards' | 'metrics'>(() => {
    return this.activeTab() === 'metrics' ? 'metrics' : this.viewMode();
  });

  setView(view: 'table' | 'cards' | 'metrics'): void {
    if (view === 'metrics') {
      this.activeTab.set('metrics');
    } else {
      this.activeTab.set('directory');
      this.viewMode.set(view);
    }
  }

  readonly pageIndex = signal<number>(0);
  readonly pageSize = signal<number>(10);
  readonly sortField = signal<string>('updatedAt');
  readonly sortDirection = signal<'asc' | 'desc'>('desc');
  readonly trackByTaskId = (_index: number, task: TaskItem): string => task.id;
  protected readonly Math = Math;

  readonly displayedColumns: string[] = [
    'select',
    'id',
    'title',
    'category',
    'priority',
    'status',
    'dueDate',
    'actions',
  ];

  readonly searchQuery = signal<string>('');
  readonly selectedStatus = signal<string>('all');
  readonly selectedPriority = signal<string>('all');

  readonly isFilterPanelOpen = signal<boolean>(false);

  readonly activeFiltersCount = computed<number>(() => {
    let count = 0;
    if (this.selectedStatus() !== 'all') count++;
    if (this.selectedPriority() !== 'all') count++;
    return count;
  });

  toggleFilterPanel(): void {
    this.isFilterPanelOpen.update((open) => !open);
  }

  readonly hasActiveFilters = computed(() => {
    return !!this.searchQuery().trim() || this.selectedStatus() !== 'all' || this.selectedPriority() !== 'all';
  });

  resetFilters(): void {
    this.searchQuery.set('');
    this.selectedStatus.set('all');
    this.selectedPriority.set('all');
    this.pageIndex.set(0);
  }

  readonly filteredTasks = computed(() => {
    const list = this.tasks() || [];
    const query = this.searchQuery().toLowerCase().trim();
    const status = this.selectedStatus();
    const priority = this.selectedPriority();

    return list.filter((task) => {
      if (!task) return false;
      const title = (task.title || '').toLowerCase();
      const description = (task.description || '').toLowerCase();
      const category = (task.category || '').toLowerCase();

      const matchesQuery =
        !query ||
        title.includes(query) ||
        description.includes(query) ||
        category.includes(query);

      const matchesStatus = status === 'all' || task.status === status;
      const matchesPriority = priority === 'all' || task.priority === priority;

      return matchesQuery && matchesStatus && matchesPriority;
    });
  });

  readonly stats = computed(() => {
    const all = this.tasks() || [];
    const total = all.length;
    const completed = all.filter((t) => t?.status === 'completed').length;
    const inProgress = all.filter((t) => t?.status === 'in-progress').length;
    const todo = all.filter((t) => t?.status === 'todo').length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { total, completed, inProgress, todo, percentage };
  });

  readonly priorityStats = computed(() => {
    const all = this.tasks() || [];
    const total = all.length;
    const urgent = all.filter((t) => t?.priority === 'urgent').length;
    const high = all.filter((t) => t?.priority === 'high').length;
    const medium = all.filter((t) => t?.priority === 'medium').length;
    const low = all.filter((t) => t?.priority === 'low').length;

    const urgentPct = total > 0 ? Math.round((urgent / total) * 100) : 0;
    const highPct = total > 0 ? Math.round((high / total) * 100) : 0;
    const mediumPct = total > 0 ? Math.round((medium / total) * 100) : 0;
    const lowPct = total > 0 ? Math.max(0, 100 - urgentPct - highPct - mediumPct) : 0;

    return { urgent, high, medium, low, urgentPct, highPct, mediumPct, lowPct };
  });

  readonly categoryStats = computed(() => {
    const all = this.tasks() || [];
    const total = all.length;
    const counts: Record<string, number> = {};
    for (const t of all) {
      if (!t) continue;
      const cat = t.category || 'General';
      counts[cat] = (counts[cat] || 0) + 1;
    }

    return Object.entries(counts)
      .map(([name, count]) => ({
        name,
        count,
        percentage: total > 0 ? Math.round((count / total) * 100) : 0,
      }))
      .sort((a, b) => b.count - a.count);
  });

  readonly urgentActionQueue = computed(() => {
    const all = this.tasks() || [];
    return all
      .filter((t) => t && t.status !== 'completed' && (t.priority === 'urgent' || t.priority === 'high'))
      .slice(0, 5);
  });

  readonly sortedTasks = computed(() => {
    const list = [...this.filteredTasks()];
    const field = this.sortField();
    const dir = this.sortDirection();
    if (!field || !dir) return list;

    return list.sort((a, b) => {
      const aVal = (a as any)[field] ?? '';
      const bVal = (b as any)[field] ?? '';
      const comp = String(aVal).localeCompare(String(bVal), undefined, { numeric: true, sensitivity: 'base' });
      return dir === 'asc' ? comp : -comp;
    });
  });

  readonly pagedTasks = computed(() => {
    const sorted = this.sortedTasks();
    const start = this.pageIndex() * this.pageSize();
    return sorted.slice(start, start + this.pageSize());
  });

  readonly paginationRange = computed(() => {
    const total = this.sortedTasks().length;
    if (total === 0) {
      return { start: 0, end: 0, total: 0 };
    }
    const start = this.pageIndex() * this.pageSize() + 1;
    const end = Math.min((this.pageIndex() + 1) * this.pageSize(), total);
    return { start, end, total };
  });

  protected readonly formatTaskId = formatTaskId;

  onSortChange(sort: Sort): void {
    if (!sort.active || sort.direction === '') {
      this.sortField.set('updatedAt');
      this.sortDirection.set('desc');
    } else {
      this.sortField.set(sort.active);
      this.sortDirection.set(sort.direction as 'asc' | 'desc');
    }
    this.pageIndex.set(0);
  }

  readonly totalPages = computed(() => {
    const total = this.sortedTasks().length;
    return Math.max(1, Math.ceil(total / this.pageSize()));
  });

  readonly currentPage = computed(() => {
    return this.sortedTasks().length === 0 ? 0 : this.pageIndex() + 1;
  });

  readonly hasPrevPage = computed(() => this.pageIndex() > 0);
  readonly hasNextPage = computed(() => {
    const total = this.sortedTasks().length;
    return (this.pageIndex() + 1) * this.pageSize() < total;
  });

  goToFirstPage(): void {
    if (this.hasPrevPage()) {
      this.pageIndex.set(0);
    }
  }

  goToPrevPage(): void {
    if (this.hasPrevPage()) {
      this.pageIndex.update((p) => Math.max(0, p - 1));
    }
  }

  goToNextPage(): void {
    if (this.hasNextPage()) {
      this.pageIndex.update((p) => p + 1);
    }
  }

  goToLastPage(): void {
    if (this.hasNextPage()) {
      const total = this.sortedTasks().length;
      const last = Math.max(0, Math.ceil(total / this.pageSize()) - 1);
      this.pageIndex.set(last);
    }
  }

  onPageSizeChange(newSize: number): void {
    this.pageSize.set(newSize);
    this.pageIndex.set(0);
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
  }

  onFilterQueryChange(query: string): void {
    this.searchQuery.set(query);
    this.pageIndex.set(0);
  }

  onStatusChange(status: string): void {
    this.selectedStatus.set(status);
    this.pageIndex.set(0);
  }

  onPriorityChange(priority: string): void {
    this.selectedPriority.set(priority);
    this.pageIndex.set(0);
  }

  seedBulkDemoTasks(): void {
    this.taskApi.seedEnterpriseTasks(35).subscribe({
      next: () => {
        this.snackBar.open('Seeded 35+ realistic enterprise sprint tasks across DevOps, Security, and Architecture!', 'Dismiss', {
          duration: 3500,
          verticalPosition: 'bottom',
        });
      },
    });
  }

  ngOnInit(): void {
    this.seo.setSeoData({
      title: 'Tasks Management | Chintap Angular Starter',
      description:
        'Explore modern Angular 22 Reactive Form engineering, dual-mode Markdown editor/preview, and mock API persistence in the Chintap Angular Starter kit.',
      url: '/tasks',
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Tasks Management', url: '/tasks' },
      ],
    });

    this.taskApi.getTasks().subscribe();
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
            this.snackBar.open(`Task "${created.title}" created!`, 'Dismiss', {
              duration: 3000,
              verticalPosition: 'bottom',
            });
          },
        });
      }
    });
  }

  openEditDialog(task: TaskItem): void {
    const ref = this.dialog.open(TaskFormDialogComponent, {
      width: '680px',
      maxWidth: '95vw',
      data: { mode: 'edit', task },
    });

    ref.afterClosed().subscribe((res) => {
      if (res && res.action === 'save') {
        this.taskApi.updateTask(task.id, res.dto as UpdateTaskDto).subscribe({
          next: () => {
            this.snackBar.open('Task updated successfully!', 'Dismiss', {
              duration: 3000,
              verticalPosition: 'bottom',
            });
          },
        });
      }
    });
  }

  toggleComplete(task: TaskItem): void {
    this.taskApi.toggleComplete(task.id).subscribe({
      next: (updated) => {
        const msg =
          updated.status === 'completed' ? 'Task marked as completed.' : 'Task marked as active.';
        this.snackBar.open(msg, 'Dismiss', { duration: 2500, verticalPosition: 'bottom' });
      },
    });
  }

  openDetailDialog(task: TaskItem): void {
    const ref = this.dialog.open(TaskDetailDialogComponent, {
      width: '760px',
      maxWidth: '95vw',
      data: { task },
    });

    ref.afterClosed().subscribe((res) => {
      if (!res) return;
      if (res.action === 'edit' && res.task) {
        this.openEditDialog(res.task);
      } else if (res.action === 'status' && res.task) {
        this.openStatusDialog(res.task);
      } else if (res.action === 'delete' && res.task) {
        this.openDeleteDialog(res.task);
      }
    });
  }

  openStatusDialog(task: TaskItem): void {
    const ref = this.dialog.open(TaskStatusDialogComponent, {
      width: '460px',
      maxWidth: '95vw',
      data: { task },
    });

    ref.afterClosed().subscribe((res) => {
      if (res && res.action === 'update') {
        this.taskApi.updateTask(task.id, { status: res.status }).subscribe({
          next: () => {
            const statusLabel =
              res.status === 'in-progress'
                ? 'In Progress'
                : res.status === 'completed'
                  ? 'Completed'
                  : 'To Do';
            this.snackBar.open(`Status updated to "${statusLabel}"!`, 'Dismiss', {
              duration: 3000,
              verticalPosition: 'bottom',
            });
          },
        });
      }
    });
  }

  openDeleteDialog(task: TaskItem): void {
    const ref = this.dialog.open(TaskDeleteDialogComponent, {
      width: '460px',
      maxWidth: '95vw',
      data: { task },
    });

    ref.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.taskApi.deleteTask(task.id).subscribe({
          next: () => {
            this.snackBar.open(`Task "${task.title}" deleted.`, 'Dismiss', {
              duration: 3000,
              verticalPosition: 'bottom',
            });
          },
        });
      }
    });
  }

  deleteTask(task: TaskItem): void {
    this.openDeleteDialog(task);
  }

  resetDefaults(): void {
    this.taskApi.resetToDefaults().subscribe({
      next: () => {
        this.snackBar.open('Reset demo tasks to defaults!', 'Dismiss', {
          duration: 3000,
          verticalPosition: 'bottom',
        });
      },
    });
  }

  toggleAuthMode(): void {
    if (this.authService.currentUser()?.role === 'developer') {
      this.authService.loginAsGuest();
      this.snackBar.open('Switched session to Guest mode', 'Dismiss', { duration: 2500 });
    } else {
      this.authService.loginAsDeveloper();
      this.snackBar.open('Logged in as Lead Developer', 'Dismiss', { duration: 2500 });
    }
  }
}
