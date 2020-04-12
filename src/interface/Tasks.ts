export interface Task {
    id?: string;
    userId?: string;
    name: string;
    created: string;
    end?: string;
    isDone: number;
    priority: string;
    projectId?: number;
  }
  