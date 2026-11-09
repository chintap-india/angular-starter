import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, ActivatedRoute, Router } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { TaskDetailPageComponent } from './task-detail-page.component';
import { MockTaskApiService } from '../../core/services/mock-task-api.service';
import { SeoService } from '../../core/services/seo.service';
import { TaskItem } from '../../core/models/task.model';

describe('TaskDetailPageComponent', () => {
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
  });

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
      'Task marked as active.',
      'Dismiss',
      expect.any(Object)
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

  it('should render clean single-column layout without redundant sidebar task actions card', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).not.toContain('Task Actions');
    expect(compiled.querySelector('h1')?.textContent).toContain(sampleTask.title);
  });
});
