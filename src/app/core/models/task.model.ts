export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TaskStatus = 'todo' | 'in-progress' | 'completed';

export interface TaskAuthor {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role?: 'developer' | 'guest' | 'admin';
  provider?: 'netlify' | 'google' | 'local';
}

export type TaskActivityAction =
  | 'created'
  | 'status_changed'
  | 'updated'
  | 'duplicated'
  | 'completed'
  | 'reopened'
  | 'deleted';

export interface TaskActivityItem {
  id: string;
  taskId: string;
  taskTitle: string;
  action: TaskActivityAction;
  details: string;
  previousValue?: string;
  newValue?: string;
  performedBy: TaskAuthor;
  timestamp: string;
}

export interface TaskItem {
  id: string;
  title: string;
  description: string; // Markdown formatted
  priority: TaskPriority;
  status: TaskStatus;
  category: string;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  createdBy?: TaskAuthor;
  assignedTo?: TaskAuthor;
}

export interface CreateTaskDto {
  title: string;
  description?: string;
  priority?: TaskPriority;
  status?: TaskStatus;
  category?: string;
  dueDate?: string;
  createdBy?: TaskAuthor;
  assignedTo?: TaskAuthor;
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  priority?: TaskPriority;
  status?: TaskStatus;
  category?: string;
  dueDate?: string;
  assignedTo?: TaskAuthor;
}

export interface TaskQueryParams {
  pageIndex?: number;
  pageSize?: number;
  search?: string;
  status?: TaskStatus | 'all';
  priority?: TaskPriority | 'all';
  sortField?: keyof TaskItem | 'title' | 'priority' | 'status' | 'category' | 'dueDate' | 'updatedAt';
  sortDirection?: 'asc' | 'desc';
}

export interface TaskPageResult {
  items: TaskItem[];
  totalCount: number;
  pageIndex: number;
  pageSize: number;
  totalPages: number;
}

export function formatTaskId(id: string | undefined | null): string {
  if (!id) return '';
  const match = id.match(/\d+$/);
  if (match) {
    return `#${parseInt(match[0], 10)}`;
  }
  return `#${id.replace('task-', '')}`;
}
