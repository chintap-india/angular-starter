import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { TasksPageComponent } from './tasks-page.component';
import { MockTaskApiService } from '../../core/services/mock-task-api.service';
import { AuthService } from '../../core/services/auth.service';
import { SeoService } from '../../core/services/seo.service';
import { SITE_CONFIG, DEFAULT_SITE_CONFIG } from '../../core/config/site.config';
import { SITE_CONTENT, DEFAULT_SITE_CONTENT } from '../../core/config/site.content';
import { TaskItem } from '../../core/models/task.model';

describe('TasksPageComponent', () => {
  let component: TasksPageComponent;
  let fixture: ComponentFixture<TasksPageComponent>;
  let taskApi: MockTaskApiService;
  let seoService: SeoService;
  let authService: AuthService;

  beforeEach(async () => {
    vi.clearAllMocks();

    await TestBed.configureTestingModule({
      imports: [TasksPageComponent],
      providers: [
        provideRouter([]),
        provideNoopAnimations(),
        { provide: SITE_CONFIG, useValue: DEFAULT_SITE_CONFIG },
        { provide: SITE_CONTENT, useValue: DEFAULT_SITE_CONTENT },
      ],
    }).compileComponents();

    taskApi = TestBed.inject(MockTaskApiService);
    seoService = TestBed.inject(SeoService);
    authService = TestBed.inject(AuthService);
    vi.spyOn(seoService, 'setSeoData');

    fixture = TestBed.createComponent(TasksPageComponent);
    component = fixture.componentInstance;

    // Spy on the component's own injected dialog and snackBar instances
    vi.spyOn((component as any).dialog, 'open').mockReturnValue({
      afterClosed: () => of(null),
    } as any);
    vi.spyOn((component as any).snackBar, 'open');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should create tasks page component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  }, 15000);

  it('should set SEO metadata on initialization', () => {
    fixture.detectChanges();
    expect(seoService.setSeoData).toHaveBeenCalledWith(
      expect.objectContaining({
        title: expect.stringContaining('Tasks'),
        url: '/tasks',
      })
    );
  });

  it('should compute completion statistics accurately', () => {
    fixture.detectChanges();
    const stats = component.stats();
    expect(stats.total).toBeGreaterThan(0);
    expect(stats.completed).toBeGreaterThanOrEqual(0);
    expect(stats.percentage).toBeGreaterThanOrEqual(0);
    expect(stats.percentage).toBeLessThanOrEqual(100);
  });

  it('should filter tasks by search query', () => {
    fixture.detectChanges();
    component.searchQuery.set('site.config');
    const filtered = component.filteredTasks();
    expect(filtered.length).toBeGreaterThan(0);
    expect(
      filtered.every(
        (t) =>
          t.title.toLowerCase().includes('site.config') ||
          t.description.toLowerCase().includes('site.config')
      )
    ).toBe(true);
  }, 15000);

  it('should filter tasks by status and priority', () => {
    fixture.detectChanges();
    component.selectedStatus.set('completed');
    const completedTasks = component.filteredTasks();
    expect(completedTasks.every((t) => t.status === 'completed')).toBe(true);

    component.selectedStatus.set('all');
    component.selectedPriority.set('urgent');
    const urgentTasks = component.filteredTasks();
    expect(urgentTasks.every((t) => t.priority === 'urgent')).toBe(true);
  }, 15000);

  it('should open task creation dialog when requested', () => {
    fixture.detectChanges();
    component.openCreateDialog();
    expect((component as any).dialog.open).toHaveBeenCalled();
  }, 15000);

  it('should toggle auth role between developer and guest', () => {
    fixture.detectChanges();
    component.toggleAuthMode();
    expect(authService.currentUser()?.role).toBe('guest');
    expect((component as any).snackBar.open).toHaveBeenCalledWith(
      'Switched session to Guest mode',
      'Dismiss',
      { duration: 2500 }
    );

    component.toggleAuthMode();
    expect(authService.currentUser()?.role).toBe('developer');
    expect((component as any).snackBar.open).toHaveBeenCalledWith(
      'Logged in as Lead Developer',
      'Dismiss',
      { duration: 2500 }
    );
  });

  it('should toggle task completion', () => {
    fixture.detectChanges();
    const task: TaskItem = {
      id: 'task-test',
      title: 'Sample Test Task',
      description: 'Demo',
      priority: 'medium',
      status: 'todo',
      category: 'Test',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    vi.spyOn(taskApi, 'toggleComplete').mockReturnValue(
      of({ ...task, status: 'completed' })
    );

    component.toggleComplete(task);
    expect(taskApi.toggleComplete).toHaveBeenCalledWith(task.id);
    expect((component as any).snackBar.open).toHaveBeenCalledWith(
      'Task marked as completed! 🎉',
      'Dismiss',
      expect.objectContaining({ duration: 2500, verticalPosition: 'bottom' })
    );
  });

  it('should default to table view mode and allow switching to cards view', () => {
    fixture.detectChanges();
    expect(component.viewMode()).toBe('table');
    expect(component.activeTab()).toBe('directory');

    component.viewMode.set('cards');
    expect(component.viewMode()).toBe('cards');

    component.activeTab.set('metrics');
    expect(component.activeTab()).toBe('metrics');
  });

  it('should paginate tasks and update pageIndex/pageSize on page events', () => {
    fixture.detectChanges();
    expect(component.pageIndex()).toBe(0);
    expect(component.pageSize()).toBe(10);

    component.onPageChange({ pageIndex: 1, pageSize: 5, length: 15 });
    expect(component.pageIndex()).toBe(1);
    expect(component.pageSize()).toBe(5);
  });

  it('should update sortField and sortDirection on table sort change', () => {
    fixture.detectChanges();
    component.onSortChange({ active: 'title', direction: 'asc' });
    expect(component.sortField()).toBe('title');
    expect(component.sortDirection()).toBe('asc');
    expect(component.pageIndex()).toBe(0);

    component.onSortChange({ active: '', direction: '' });
    expect(component.sortField()).toBe('updatedAt');
    expect(component.sortDirection()).toBe('desc');
  });

  it('should open task detail dialog when requested', () => {
    fixture.detectChanges();
    const task: TaskItem = {
      id: 'task-test-detail',
      title: 'Detail Task',
      description: 'Specs',
      priority: 'high',
      status: 'in-progress',
      category: 'Design',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    component.openDetailDialog(task);
    expect((component as any).dialog.open).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        data: expect.objectContaining({ task }),
      })
    );
  });

  it('should open status change dialog and delete dialog', () => {
    fixture.detectChanges();
    const task: TaskItem = {
      id: 'task-test-status',
      title: 'Status Task',
      description: 'Specs',
      priority: 'medium',
      status: 'todo',
      category: 'Dev',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    component.openStatusDialog(task);
    expect((component as any).dialog.open).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        data: expect.objectContaining({ task }),
      })
    );

    component.openDeleteDialog(task);
    expect((component as any).dialog.open).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        data: expect.objectContaining({ task }),
      })
    );
  });

  it('should compute hasActiveFilters and reset filters', () => {
    fixture.detectChanges();
    expect(component.hasActiveFilters()).toBe(false);

    component.searchQuery.set('Angular');
    expect(component.hasActiveFilters()).toBe(true);

    component.resetFilters();
    expect(component.searchQuery()).toBe('');
    expect(component.selectedStatus()).toBe('all');
    expect(component.selectedPriority()).toBe('all');
    expect(component.hasActiveFilters()).toBe(false);
  });
});

