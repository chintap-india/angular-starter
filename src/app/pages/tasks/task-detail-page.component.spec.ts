import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, ActivatedRoute, Router } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { TaskDetailPageComponent } from './task-detail-page.component';
import { MockTaskApiService } from '../../core/services/mock-task-api.service';
import { SeoService } from '../../core/services/seo.service';
import { TaskItem, formatTaskId } from '../../core/models/task.model';

describe('TaskDetailPageComponent', { timeout: 45000 }, () => {
  let component: TaskDetailPageComponent;
  let fixture: ComponentFixture<TaskDetailPageComponent>;
  let taskApi: MockTaskApiService;
  let seoService: SeoService;
  let router: Router;

  const sampleTask: TaskItem = {
    id: 'task-1',
    title: 'Configure site.config.ts with your domain & brand',
    description: '### Step 1: Branding',
    priority: 'urgent',
    status: 'completed',
    category: 'Setup',
    dueDate: '2026-11-10',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const sampleTask2: TaskItem = {
    id: 'task-2',
    title: 'Second Task',
    description: 'Description 2',
    priority: 'high',
    status: 'todo',
    category: 'Branding',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  beforeEach(async () => {
    vi.clearAllMocks();

    await TestBed.configureTestingModule({
      imports: [TaskDetailPageComponent],
      providers: [
        provideRouter([
          { path: 'tasks/:taskId', component: TaskDetailPageComponent },
          { path: 'tasks', component: TaskDetailPageComponent },
        ]),
        provideNoopAnimations(),
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(new Map([['taskId', 'task-1']])),
          },
        },
      ],
    }).compileComponents();

    taskApi = TestBed.inject(MockTaskApiService);
    seoService = TestBed.inject(SeoService);
    router = TestBed.inject(Router);

    vi.spyOn(taskApi, 'getTask').mockReturnValue(of(sampleTask));
    vi.spyOn(taskApi, 'toggleComplete').mockReturnValue(of({ ...sampleTask, status: 'todo' }));
    vi.spyOn(taskApi, 'updateTask').mockReturnValue(of(sampleTask));
    vi.spyOn(taskApi, 'createTask').mockReturnValue(of({ ...sampleTask, id: 'task-3', title: 'New Task' }));
    vi.spyOn(taskApi, 'deleteTask').mockReturnValue(of(true));
    vi.spyOn(seoService, 'setSeoData');

    // Force tasks signal to have tasks for adjacent navigation
    taskApi.tasksSignal.set([sampleTask, sampleTask2]);

    fixture = TestBed.createComponent(TaskDetailPageComponent);
    component = fixture.componentInstance;

    // Spy on the component's own injected dialog and snackBar instances
    vi.spyOn((component as any).dialog, 'open').mockReturnValue({
      afterClosed: () => of(null),
    } as any);
    vi.spyOn((component as any).snackBar, 'open');

    fixture.detectChanges();
  }, 30000);

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should create task detail page component', () => {
    expect(component).toBeTruthy();
  });

  it('should load task data and set SEO metadata on initialization', () => {
    expect(taskApi.getTask).toHaveBeenCalledWith('task-1');
    expect(component.task()).toEqual(sampleTask);
    expect(seoService.setSeoData).toHaveBeenCalledWith(
      expect.objectContaining({
        title: expect.stringContaining(sampleTask.title),
        url: '/tasks/task-1',
      })
    );
  });

  it('should toggle task completion state', () => {
    component.toggleComplete();
    expect(taskApi.toggleComplete).toHaveBeenCalledWith('task-1');
    expect((component as any).snackBar.open).toHaveBeenCalledWith(
      `Task ${formatTaskId(sampleTask.id)} ("${sampleTask.title}") marked as active.`,
      'Dismiss',
      expect.objectContaining({ duration: 3500, verticalPosition: 'bottom' })
    );
  });

  it('should compute previous and next task availability', () => {
    expect(component.hasPrevTask()).toBe(false);
    expect(component.hasNextTask()).toBe(true);
  });

  it('should navigate to adjacent task', () => {
    const navigateSpy = vi.spyOn(router, 'navigate');
    component.navigateToAdjacentTask(1);
    expect(navigateSpy).toHaveBeenCalledWith(['/tasks', 'task-2']);
  });

  it('should copy task URL to clipboard', () => {
    const writeTextSpy = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextSpy,
      },
    });

    component.copyTaskUrl();
    expect(writeTextSpy).toHaveBeenCalled();
  });

  it('should open edit, status, and sprint details dialogs', () => {
    component.openEditDialog();
    expect((component as any).dialog.open).toHaveBeenCalled();

    component.openStatusDialog();
    expect((component as any).dialog.open).toHaveBeenCalled();

    component.openSprintDetailsDialog();
    expect((component as any).dialog.open).toHaveBeenCalled();

    component.openModalView();
    expect((component as any).dialog.open).toHaveBeenCalled();
  });

  it('should open create dialog and navigate to newly created task on save', () => {
    const navigateSpy = vi.spyOn(router, 'navigate');
    const createdTask: TaskItem = { ...sampleTask, id: 'task-new', title: 'Newly Created Task' };
    vi.spyOn(taskApi, 'createTask').mockReturnValue(of(createdTask));
    vi.spyOn((component as any).dialog, 'open').mockReturnValue({
      afterClosed: () => of({ action: 'save', dto: { title: 'Newly Created Task' } }),
    } as any);

    component.openCreateDialog();
    expect((component as any).dialog.open).toHaveBeenCalled();
    expect(taskApi.createTask).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['/tasks', 'task-new']);
    expect((component as any).snackBar.open).toHaveBeenCalledWith(
      `Task ${formatTaskId(createdTask.id)} ("${createdTask.title}") created successfully!`,
      'Dismiss',
      expect.objectContaining({ duration: 3500, verticalPosition: 'bottom' })
    );
  });

  it('should open duplicate dialog prefilled with copy and navigate on save', () => {
    const navigateSpy = vi.spyOn(router, 'navigate');
    const duplicatedTask: TaskItem = { ...sampleTask, id: 'task-copy', title: `${sampleTask.title} (Copy)` };
    vi.spyOn(taskApi, 'createTask').mockReturnValue(of(duplicatedTask));
    vi.spyOn((component as any).dialog, 'open').mockReturnValue({
      afterClosed: () => of({ action: 'save', dto: { title: `${sampleTask.title} (Copy)` } }),
    } as any);

    component.openDuplicateDialog();
    expect((component as any).dialog.open).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        data: expect.objectContaining({
          mode: 'duplicate',
          task: expect.objectContaining({
            title: `${sampleTask.title} (Copy)`,
            status: 'todo',
          }),
        }),
      })
    );
    expect(taskApi.createTask).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['/tasks', 'task-copy']);
    expect((component as any).snackBar.open).toHaveBeenCalledWith(
      `Task ${formatTaskId(duplicatedTask.id)} ("${duplicatedTask.title}") duplicated successfully!`,
      'Dismiss',
      expect.objectContaining({ duration: 3500, verticalPosition: 'bottom' })
    );
  });

  it('should render clean single-column layout without redundant sidebar task actions card', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).not.toContain('Task Actions');
    expect(compiled.querySelector('h1')?.textContent).toContain(sampleTask.title);
  });

  it('should align sticky header and main content container with max-w-7xl navbar layout', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const headerContainer = compiled.querySelector('header > div');
    const mainContainer = compiled.querySelector('main');

    expect(headerContainer?.classList.contains('max-w-7xl')).toBe(true);
    expect(headerContainer?.classList.contains('px-4')).toBe(true);
    expect(headerContainer?.classList.contains('sm:px-6')).toBe(true);
    expect(headerContainer?.classList.contains('lg:px-8')).toBe(true);

    expect(mainContainer?.classList.contains('max-w-7xl')).toBe(true);
    expect(mainContainer?.classList.contains('px-4')).toBe(true);
    expect(mainContainer?.classList.contains('sm:px-6')).toBe(true);
    expect(mainContainer?.classList.contains('lg:px-8')).toBe(true);
  });

  it('should render clean not found state without sprint backlog phrase when task is missing', () => {
    component.task.set(null);
    component.isLoading.set(false);
    component.requestedTaskId.set('nonexistent-id');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Task Not Found');
    expect(compiled.textContent).toContain('The task you requested (#nonexistent-id) does not exist or may have been deleted.');
    expect(compiled.textContent).not.toContain('from your sprint backlog');
  });

  it('should filter search results when typing into detail search bar', () => {
    component.onSearchChange('Branding');
    expect(component.isSearchOpen()).toBe(true);
    expect(component.searchResults().length).toBeGreaterThan(0);
    expect(component.searchResults().some((t) => t.category === 'Branding')).toBe(true);

    component.onSearchChange('');
    expect(component.isSearchOpen()).toBe(false);
    expect(component.searchResults().length).toBe(0);
  });

  it('should compute task-specific activity history and render author info', () => {
    const activities = component.taskActivities();
    expect(Array.isArray(activities)).toBe(true);

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Activity History & Audit Trail');
  });
});

