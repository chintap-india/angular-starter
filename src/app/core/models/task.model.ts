export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TaskStatus = 'todo' | 'in-progress' | 'completed';

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
}

export interface CreateTaskDto {
  title: string;
  description?: string;
  priority?: TaskPriority;
  status?: TaskStatus;
  category?: string;
  dueDate?: string;
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  priority?: TaskPriority;
  status?: TaskStatus;
  category?: string;
  dueDate?: string;
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
