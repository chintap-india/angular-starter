import { Injectable, inject, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, of, delay, tap, throwError } from 'rxjs';
import {
  TaskItem,
  TaskPriority,
  TaskStatus,
  CreateTaskDto,
  UpdateTaskDto,
  TaskQueryParams,
  TaskPageResult,
} from '../models/task.model';

const STORAGE_KEY = 'chintap_tasks_crud_v2';

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
  {
    id: 'task-5',
    title: 'Migrate repository remote to chintap-india/angular-starter',
    description: `### Final Repository Migration
Migrate the starter kit to its permanent home under the **chintap-india** organization:
* **Target Repository**: \`https://github.com/chintap-india/angular-starter\`
* **Remote Command**:
\`\`\`bash
git remote set-url origin https://github.com/chintap-india/angular-starter.git
git push -u origin main
\`\`\`
* **Config Updates**:
Update repository references in \`package.json\`, \`site.config.ts\`, \`site.content.ts\`, \`README.md\`, and \`CONTRIBUTING.md\`.
`,
    priority: 'high',
    status: 'todo',
    category: 'Deployment',
    dueDate: '2026-11-06',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'task-6',
    title: 'Implement OpenTelemetry Distributed Tracing in SSR Hydration',
    description: `### Step 6: SSR Observability
Instrument distributed trace spans across Vite SSR and browser hydration cycles to track microtask completion and optimize page stabilization.`,
    priority: 'high',
    status: 'in-progress',
    category: 'DevOps',
    dueDate: '2026-11-15',
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
  {
    id: 'task-7',
    title: 'Conduct WCAG 2.2 Level AA Contrast and Screen Reader Audit',
    description: `### Step 7: Accessibility Verification
Audit all high-contrast Slate components, ARIA landmark dialogs, and keyboard focus states to ensure 100% WCAG compliance.`,
    priority: 'urgent',
    status: 'todo',
    category: 'Compliance',
    dueDate: '2026-11-16',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'task-8',
    title: 'Configure Multi-Zone GeoDNS Routing for Sub-50ms Edge Delivery',
    description: `### Step 8: Global Edge Distribution
Establish latency-based anycast routing and edge server caching for static starter kit assets.`,
    priority: 'medium',
    status: 'todo',
    category: 'Architecture',
    dueDate: '2026-11-17',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'task-9',
    title: 'Audit Third-Party NPM Dependencies for Critical Vulnerabilities',
    description: `### Step 9: Automated Security Screening
Audit supply chain lockfiles and enforce automated security vulnerability screening in CI pipelines.`,
    priority: 'urgent',
    status: 'completed',
    category: 'Security',
    dueDate: '2026-11-08',
    createdAt: new Date(Date.now() - 86400000 * 6).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: 'task-10',
    title: 'Optimize Largest Contentful Paint (LCP) Hero Asset WebP Pipelines',
    description: `### Step 10: Core Web Vitals Optimization
Deliver preloaded responsive WebP vectors and inline SVG brand assets to guarantee sub-1.2s LCP scores across mobile and desktop.`,
    priority: 'high',
    status: 'completed',
    category: 'Performance',
    dueDate: '2026-11-09',
    createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
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
            const sanitized: TaskItem[] = parsed
              .filter((item): item is Partial<TaskItem> => !!item && typeof item === 'object')
              .map((item) => ({
                id: item.id ? String(item.id) : 'task-' + Math.random().toString(36).substring(2, 9),
                title: item.title ? String(item.title).trim() : 'Untitled Task',
                description: item.description != null ? String(item.description) : '',
                priority: (['low', 'medium', 'high', 'urgent'].includes(item.priority as string)
                  ? item.priority
                  : 'medium') as TaskPriority,
                status: (['todo', 'in-progress', 'completed'].includes(item.status as string)
                  ? item.status
                  : 'todo') as TaskStatus,
                category: item.category ? String(item.category).trim() : 'General',
                dueDate: item.dueDate ? String(item.dueDate) : undefined,
                createdAt: item.createdAt || new Date().toISOString(),
                updatedAt: item.updatedAt || new Date().toISOString(),
              }));

            if (sanitized.length > 0) {
              return sanitized;
            }
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
    if (!isPlatformBrowser(this.platformId)) {
      this.tasksSignal.set(this.tasks);
      this.loadingSignal.set(false);
      return of([...this.tasks]);
    }
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
    const rawId = String(id || '').trim();
    const task = this.tasks.find(
      (t) =>
        t.id === rawId ||
        t.id === `task-${rawId}` ||
        t.id.replace('task-', '') === rawId
    );
    return of(task ? { ...task } : undefined).pipe(delay(100));
  }

  private getNextTaskId(): string {
    const numbers = this.tasks
      .map((t) => {
        const idStr = String(t.id || '').replace('task-', '');
        const n = parseInt(idStr, 10);
        return isNaN(n) ? 0 : n;
      })
      .filter((n) => n > 0);
    const nextNum = numbers.length > 0 ? Math.max(...numbers) + 1 : 1;
    return `task-${nextNum}`;
  }

  createTask(dto: CreateTaskDto): Observable<TaskItem> {
    const newTask: TaskItem = {
      id: this.getNextTaskId(),
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
    this.loadingSignal.set(false);

    return of(newTask);
  }

  updateTask(id: string, dto: UpdateTaskDto): Observable<TaskItem> {
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
    this.loadingSignal.set(false);

    return of(updatedTask);
  }

  deleteTask(id: string): Observable<boolean> {
    const filtered = this.tasks.filter((t) => t.id !== id);
    this.saveToStorage(filtered);
    this.loadingSignal.set(false);

    return of(true);
  }

  toggleComplete(id: string): Observable<TaskItem> {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) {
      return throwError(() => new Error(`Task with id ${id} not found.`));
    }

    const newStatus = task.status === 'completed' ? 'todo' : 'completed';
    return this.updateTask(id, { status: newStatus });
  }

  getTasksPaged(params?: TaskQueryParams): Observable<TaskPageResult> {
    const pageIndex = params?.pageIndex ?? 0;
    const pageSize = params?.pageSize ?? 10;
    const search = params?.search?.trim().toLowerCase() || '';
    const status = params?.status || 'all';
    const priority = params?.priority || 'all';
    const sortField = params?.sortField || 'updatedAt';
    const sortDirection = params?.sortDirection || 'desc';

    // 1. Filter
    let filtered = this.tasks.filter((t) => {
      const matchesSearch =
        !search ||
        (t.title?.toLowerCase().includes(search) ?? false) ||
        (t.description?.toLowerCase().includes(search) ?? false) ||
        (t.category?.toLowerCase().includes(search) ?? false);

      const matchesStatus = status === 'all' || t.status === status;
      const matchesPriority = priority === 'all' || t.priority === priority;

      return matchesSearch && matchesStatus && matchesPriority;
    });

    // 2. Sort
    filtered = [...filtered].sort((a, b) => {
      const aVal = (a as any)[sortField] ?? '';
      const bVal = (b as any)[sortField] ?? '';
      const comp = String(aVal).localeCompare(String(bVal));
      return sortDirection === 'asc' ? comp : -comp;
    });

    const totalCount = filtered.length;
    const totalPages = Math.ceil(totalCount / pageSize);
    const start = pageIndex * pageSize;
    const items = filtered.slice(start, start + pageSize);

    const result: TaskPageResult = {
      items,
      totalCount,
      pageIndex,
      pageSize,
      totalPages,
    };

    if (!isPlatformBrowser(this.platformId)) {
      return of(result);
    }

    return of(result).pipe(delay(120));
  }

  seedEnterpriseTasks(count = 35): Observable<TaskItem[]> {
    this.loadingSignal.set(true);
    const categories = ['Architecture', 'Security', 'DevOps', 'Performance', 'UI/UX', 'Testing', 'Compliance'];
    const priorities: TaskPriority[] = ['urgent', 'high', 'medium', 'low'];
    const statuses: TaskStatus[] = ['todo', 'in-progress', 'completed'];

    const enterpriseBlueprints = [
      { title: 'Implement OpenTelemetry Distributed Tracing in SSR Hydration', category: 'DevOps', priority: 'high' as TaskPriority },
      { title: 'Conduct WCAG 2.2 Level AA Contrast and Screen Reader Audit', category: 'Compliance', priority: 'urgent' as TaskPriority },
      { title: 'Configure Redis In-Memory Cache Tier for Micro-Frontend State', category: 'Architecture', priority: 'medium' as TaskPriority },
      { title: 'Enforce Content Security Policy (CSP) Headers with Nonce Tokens', category: 'Security', priority: 'urgent' as TaskPriority },
      { title: 'Optimize Largest Contentful Paint (LCP) Hero Asset WebP Pipelines', category: 'Performance', priority: 'high' as TaskPriority },
      { title: 'Setup GitHub Actions Matrix CI for Linux ARM64 and AMD64 Runners', category: 'DevOps', priority: 'medium' as TaskPriority },
      { title: 'Refactor Reactive Form Validation to Signal-Based Computed Controls', category: 'UI/UX', priority: 'medium' as TaskPriority },
      { title: 'Implement Circuit Breaker Pattern for Edge REST Gateways', category: 'Architecture', priority: 'high' as TaskPriority },
      { title: 'Setup Automated Vitest Snapshot Regression Coverage in Pre-Commit', category: 'Testing', priority: 'low' as TaskPriority },
      { title: 'Add Prometheus Exporter for SSR Request Latency and Memory Heap', category: 'DevOps', priority: 'medium' as TaskPriority },
      { title: 'Audit Third-Party NPM Dependencies for CVE Critical Vulnerabilities', category: 'Security', priority: 'urgent' as TaskPriority },
      { title: 'Configure Multi-Zone GeoDNS Routing for Sub-50ms Global Edge Delivery', category: 'Architecture', priority: 'high' as TaskPriority },
    ];

    const generated: TaskItem[] = [];
    const now = Date.now();

    for (let i = 0; i < count; i++) {
      const blueprint = enterpriseBlueprints[i % enterpriseBlueprints.length];
      const seq = i + 1;
      const createdDate = new Date(now - (count - i) * 3600000 * 8).toISOString();
      const dueDate = new Date(now + (i + 2) * 86400000).toISOString().split('T')[0];

      generated.push({
        id: `task-ent-${seq.toString().padStart(3, '0')}`,
        title: `${blueprint.title} (#${seq})`,
        description: `### Enterprise Scope Item ${seq}\nAutomated enterprise sprint task targeting **${blueprint.category}**.\n\n* Milestone priority: \`${blueprint.priority}\`\n* Target completion: ${dueDate}\n* Verification: Automated CI gating and PR checklist signoff.`,
        priority: blueprint.priority,
        status: statuses[i % statuses.length],
        category: blueprint.category,
        dueDate,
        createdAt: createdDate,
        updatedAt: createdDate,
      });
    }

    const merged = [...generated, ...this.tasks];
    this.saveToStorage(merged);

    return of(merged).pipe(
      delay(200),
      tap(() => this.loadingSignal.set(false))
    );
  }

  resetToDefaults(): Observable<TaskItem[]> {
    this.saveToStorage([...INITIAL_TASKS]);
    return of([...INITIAL_TASKS]).pipe(delay(100));
  }
}
