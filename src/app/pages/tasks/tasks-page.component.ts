import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MockTaskApiService } from '../../core/services/mock-task-api.service';
import { AuthService } from '../../core/services/auth.service';
import { SeoService } from '../../core/services/seo.service';
import { SITE_CONFIG } from '../../core/config/site.config';
import { SITE_CONTENT } from '../../core/config/site.content';
import { TaskItem, TaskPriority, TaskStatus, CreateTaskDto, UpdateTaskDto } from '../../core/models/task.model';
import { TaskFormDialogComponent } from './task-form-dialog.component';
import { MarkdownPipe } from '../../shared/pipes/markdown.pipe';

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

  readonly searchQuery = signal<string>('');
  readonly selectedStatus = signal<string>('all');
  readonly selectedPriority = signal<string>('all');

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

  ngOnInit(): void {
    this.seo.setSeoData({
      title: 'Tasks CRUD Module — Typed Forms & Mock API Demo',
      description:
        'Explore modern Angular 22 Reactive Form engineering, dual-mode Markdown editor/preview, and mock API persistence in the Chintap Angular Starter kit.',
      url: '/tasks',
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Tasks CRUD', url: '/tasks' },
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
          updated.status === 'completed' ? 'Task marked as completed! 🎉' : 'Task marked as active.';
        this.snackBar.open(msg, 'Dismiss', { duration: 2500, verticalPosition: 'bottom' });
      },
    });
  }

  deleteTask(task: TaskItem): void {
    if (confirm(`Are you sure you want to delete "${task.title}"?`)) {
      this.taskApi.deleteTask(task.id).subscribe({
        next: () => {
          this.snackBar.open('Task deleted.', 'Dismiss', { duration: 3000, verticalPosition: 'bottom' });
        },
      });
    }
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
