import { useMemo } from "react";
import { Task, TaskFilter, TaskSort } from "@/types/task";

export const useTaskFilters = (
  tasks: Task[],
  search: string,
  filter: TaskFilter,
  sort: TaskSort
) => {
  return useMemo(() => {
    let result = tasks.filter((task) => {
      const matchesSearch =
        task?.title?.toLowerCase().includes(search.toLowerCase()) ||
        task?.description?.toLowerCase().includes(search.toLowerCase());
      
      const matchesFilter =
        filter === "all" ||
        (filter === "completed" && task.completed) ||
        (filter === "incomplete" && !task.completed);

      return matchesSearch && matchesFilter;
    });

    return result.sort((a, b) => {
      const dateA = a?.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b?.createdAt ? new Date(b.createdAt).getTime() : 0;
      return sort === "newest" ? dateB - dateA : dateA - dateB;
    });
  }, [tasks, search, filter, sort]);
};