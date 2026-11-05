import { Injectable, inject, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, of, delay, tap, throwError } from 'rxjs';
import { TaskItem, CreateTaskDto, UpdateTaskDto } from '../models/task.model';

const STORAGE_KEY = 'chintap_tasks_crud_v1';

const INITIAL_TASKS: TaskItem[] = [
  {
    id: 'task-1',
    title: 'Configure site.config.ts with your domain & brand',
    description: `### Step 1: Branding & Metadata
Open \`src/app/core/config/site.config.ts\` and update:
* **name**: Your product or company name
* **baseUrl**: Your live HTTPS domain
* **author**: Your name & GitHub handle
* **organization**: Address & geo coordinates for Knowledge Graph

\`\`\`typescript
export const DEFAULT_SITE_CONFIG: SiteConfig = {
  name: 'My Custom App',
  baseUrl: 'https://mycustomapp.com',
  // ...
};
\`\`\`
`,
    priority: 'urgent',
    status: 'completed',
    category: 'Setup',
    dueDate: '2026-11-10',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'task-2',
    title: 'Replace logo-light.svg and logo-dark.svg in public/images/',
    description: `### Step 2: Drop in Your Brand Logos
Drop your brand artwork into \`public/images/\`:
* \`logo-light.svg\`: Crisp vector icon for light theme navigation
* \`logo-dark.svg\`: Crisp vector icon for dark theme navigation
* \`og-preview.jpg\`: 1200x630 OpenGraph card for social shares

> **Tip**: SVG logos automatically scale without blurring on high-DPI Retina screens.
`,
    priority: 'high',
    status: 'in-progress',
    category: 'Branding',
    dueDate: '2026-11-12',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
  {
    id: 'task-3',
    title: 'Customize page copy in site.content.ts',
    description: `### Step 3: Edit Your Content
All page copy is decoupled into \`src/app/core/config/site.content.ts\`.

- [x] Home hero headline & tagline
- [ ] 5 Feature Pillars
- [ ] FAQ Q&A list for Schema.org FAQPage
- [ ] Contact details & address
`,
    priority: 'high',
    status: 'todo',
    category: 'Content',
    dueDate: '2026-11-14',
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
  {
    id: 'task-4',
    title: 'Run production build and test Schema.org Rich Results',
    description: `### Step 4: Verification & Deployment
Run the production build:
\`\`\`bash
npm run build
\`\`\`
Check that all static HTML routes are pre-rendered into \`dist/\`. Then test your URL with [Google Rich Results Test](https://search.google.com/test/rich-results) to verify **FAQPage** and **SoftwareApplication** JSON-LD schemas.
`,
    priority: 'medium',
    status: 'todo',
    category: 'Verification',
    dueDate: '2026-11-18',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

@Injectable({
  providedIn: 'root',
})
export class MockTaskApiService {
  private readonly platformId = inject(PLATFORM_ID);
  private tasks: TaskItem[] = [];

  readonly tasksSignal = signal<TaskItem[]>([]);
  readonly loadingSignal = signal<boolean>(false);

  constructor() {
    this.tasks = this.loadFromStorage();
    this.tasksSignal.set(this.tasks);
  }

  private loadFromStorage(): TaskItem[] {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
          }
        }
      } catch (err) {
        console.warn('Could not read tasks from localStorage, using defaults:', err);
      }
    }
    return [...INITIAL_TASKS];
  }

  private saveToStorage(items: TaskItem[]): void {
    this.tasks = items;
    this.tasksSignal.set([...items]);
    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      } catch (err) {
        console.warn('Could not save tasks to localStorage:', err);
      }
    }
  }

  getTasks(): Observable<TaskItem[]> {
    this.loadingSignal.set(true);
    return of([...this.tasks]).pipe(
      delay(150),
      tap((items) => {
        this.tasksSignal.set(items);
        this.loadingSignal.set(false);
      })
    );
  }

  getTask(id: string): Observable<TaskItem | undefined> {
    const task = this.tasks.find((t) => t.id === id);
    return of(task ? { ...task } : undefined).pipe(delay(100));
  }

  createTask(dto: CreateTaskDto): Observable<TaskItem> {
    this.loadingSignal.set(true);
    const newTask: TaskItem = {
      id: 'task-' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
      title: dto.title.trim(),
      description: dto.description || '',
      priority: dto.priority || 'medium',
      status: dto.status || 'todo',
      category: dto.category?.trim() || 'General',
      dueDate: dto.dueDate,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updated = [newTask, ...this.tasks];
    this.saveToStorage(updated);

    return of(newTask).pipe(
      delay(200),
      tap(() => this.loadingSignal.set(false))
    );
  }

  updateTask(id: string, dto: UpdateTaskDto): Observable<TaskItem> {
    this.loadingSignal.set(true);
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index === -1) {
      this.loadingSignal.set(false);
      return throwError(() => new Error(`Task with id ${id} not found.`));
    }

    const existing = this.tasks[index];
    const updatedTask: TaskItem = {
      ...existing,
      ...dto,
      title: dto.title !== undefined ? dto.title.trim() : existing.title,
      category: dto.category !== undefined ? dto.category.trim() : existing.category,
      updatedAt: new Date().toISOString(),
    };

    const updatedList = [...this.tasks];
    updatedList[index] = updatedTask;
    this.saveToStorage(updatedList);

    return of(updatedTask).pipe(
      delay(150),
      tap(() => this.loadingSignal.set(false))
    );
  }

  deleteTask(id: string): Observable<boolean> {
    this.loadingSignal.set(true);
    const filtered = this.tasks.filter((t) => t.id !== id);
    this.saveToStorage(filtered);

    return of(true).pipe(
      delay(150),
      tap(() => this.loadingSignal.set(false))
    );
  }

  toggleComplete(id: string): Observable<TaskItem> {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) {
      return throwError(() => new Error(`Task with id ${id} not found.`));
    }

    const newStatus = task.status === 'completed' ? 'todo' : 'completed';
    return this.updateTask(id, { status: newStatus });
  }

  resetToDefaults(): Observable<TaskItem[]> {
    this.saveToStorage([...INITIAL_TASKS]);
    return of([...INITIAL_TASKS]).pipe(delay(100));
  }
}
