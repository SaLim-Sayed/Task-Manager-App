export type Task = {
    id: string;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    completed: boolean;
    createdAt: Date;
  };
  
  export type TaskFilter = "all" | "completed" | "incomplete";
  export type TaskSort = "newest" | "oldest";
  