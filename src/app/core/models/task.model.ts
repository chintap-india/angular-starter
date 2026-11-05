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
