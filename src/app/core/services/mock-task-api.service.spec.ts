import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { MockTaskApiService } from './mock-task-api.service';
import { CreateTaskDto, UpdateTaskDto } from '../models/task.model';

describe('MockTaskApiService', () => {
  let service: MockTaskApiService;
  let mockStorage: Record<string, string> = {};

  beforeEach(() => {
    mockStorage = {};
    vi.stubGlobal('localStorage', {
      getItem: (key: string) => mockStorage[key] || null,
      setItem: (key: string, val: string) => {
        mockStorage[key] = val;
      },
      removeItem: (key: string) => {
        delete mockStorage[key];
      },
      clear: () => {
        mockStorage = {};
      },
    });

    TestBed.configureTestingModule({
      providers: [
        MockTaskApiService,
        { provide: PLATFORM_ID, useValue: 'browser' },
      ],
    });

    service = TestBed.inject(MockTaskApiService);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should initialize with default tasks when storage is empty', async () => {
    const tasks = await firstValueFrom(service.getTasks());
    expect(tasks.length).toBeGreaterThan(0);
    expect(service.tasksSignal().length).toBeGreaterThan(0);
  });

  it('should fetch a single task by ID', async () => {
    const tasks = await firstValueFrom(service.getTasks());
    const firstTask = tasks[0];

    const fetched = await firstValueFrom(service.getTask(firstTask.id));
    expect(fetched).toBeDefined();
    expect(fetched?.title).toBe(firstTask.title);
  });

  it('should return undefined when task ID does not exist', async () => {
    const fetched = await firstValueFrom(service.getTask('non-existent-task-id'));
    expect(fetched).toBeUndefined();
  });

  it('should create a new task and prepend it to the list', async () => {
    const initialTasks = await firstValueFrom(service.getTasks());
    const initialCount = initialTasks.length;

    const dto: CreateTaskDto = {
      title: 'Deploy to Netlify Edge',
      description: 'Run production build and test edge latency',
      priority: 'urgent',
      category: 'DevOps',
      dueDate: '2026-11-20',
    };

    const created = await firstValueFrom(service.createTask(dto));
    expect(created.id).toBeTruthy();
    expect(created.title).toBe(dto.title);
    expect(created.priority).toBe('urgent');
    expect(created.status).toBe('todo');

    const updatedTasks = await firstValueFrom(service.getTasks());
    expect(updatedTasks.length).toBe(initialCount + 1);
    expect(updatedTasks[0].id).toBe(created.id);
  });

  it('should update an existing task', async () => {
    const tasks = await firstValueFrom(service.getTasks());
    const target = tasks[0];

    const updateDto: UpdateTaskDto = {
      title: 'Updated Title for Task',
      status: 'in-progress',
      priority: 'low',
    };

    const updated = await firstValueFrom(service.updateTask(target.id, updateDto));
    expect(updated.title).toBe('Updated Title for Task');
    expect(updated.status).toBe('in-progress');
    expect(updated.priority).toBe('low');
  });

  it('should throw an error when updating a non-existent task', async () => {
    await expect(
      firstValueFrom(service.updateTask('invalid-id', { title: 'New Title' }))
    ).rejects.toThrow('Task with id invalid-id not found.');
  });

  it('should toggle task completion status', async () => {
    const tasks = await firstValueFrom(service.getTasks());
    const target = tasks[0];
    const initialStatus = target.status;

    const toggled = await firstValueFrom(service.toggleComplete(target.id));
    const expectedStatus = initialStatus === 'completed' ? 'todo' : 'completed';
    expect(toggled.status).toBe(expectedStatus);
  });

  it('should delete a task by ID', async () => {
    const tasks = await firstValueFrom(service.getTasks());
    const initialCount = tasks.length;
    const targetId = tasks[0].id;

    const result = await firstValueFrom(service.deleteTask(targetId));
    expect(result).toBe(true);

    const remaining = await firstValueFrom(service.getTasks());
    expect(remaining.length).toBe(initialCount - 1);
    expect(remaining.find((t) => t.id === targetId)).toBeUndefined();
  });

  it('should reset tasks to initial defaults', async () => {
    await firstValueFrom(service.createTask({ title: 'Temporary Task' }));
    const resetTasks = await firstValueFrom(service.resetToDefaults());
    expect(resetTasks.length).toBe(5);
    expect(resetTasks.find((t) => t.title === 'Temporary Task')).toBeUndefined();
  });

  it('should return paginated results with page and count parameters', async () => {
    const pageResult = await firstValueFrom(
      service.getTasksPaged({ pageIndex: 0, pageSize: 2 })
    );
    expect(pageResult.items.length).toBe(2);
    expect(pageResult.totalCount).toBe(5);
    expect(pageResult.pageIndex).toBe(0);
    expect(pageResult.pageSize).toBe(2);
    expect(pageResult.totalPages).toBe(3);
  });

  it('should seed realistic enterprise backlog tasks for multi-page scale', async () => {
    const seeded = await firstValueFrom(service.seedEnterpriseTasks(20));
    expect(seeded.length).toBeGreaterThanOrEqual(25);
    expect(seeded.some((t) => t.id.startsWith('task-ent-'))).toBe(true);
  });
});
