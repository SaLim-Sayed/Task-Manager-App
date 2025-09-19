import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createJSONStorage, persist } from "zustand/middleware";
import { Task } from "@/types/task";

type TaskState = {
  tasks: Task[];
  addTask: (task: Omit<Task, "id" | "createdAt" | "completed">) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
};

export const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: ({ title, description, startDate, endDate }) => {
        set((state) => ({
          tasks: [
            {
              id: Date.now().toString(),
              title,
              description,
              startDate,
              endDate,
              completed: false,
              createdAt: new Date(),
            },
            ...state.tasks,
          ],
        }));
      },
      toggleTask: (id: string) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task,
              startDate: new Date(task.startDate),
              endDate: new Date(task.endDate),
              createdAt: new Date(task.createdAt),
              
               completed: !task.completed } : task
          ),
        }));
      },
      deleteTask: (id: string) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        }));
      },
    }),
    {
      name: "task-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        tasks: state.tasks.map((task) => ({
          ...task,
          startDate: task.startDate,
          endDate: task.endDate,
          createdAt: task.createdAt,
        })),
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.tasks = state.tasks.map((task: any) => ({
            ...task,
            startDate: new Date(task.startDate),
            endDate: new Date(task.endDate),
            createdAt: new Date(task.createdAt),
          }));
        }
      },
    }
  )
);