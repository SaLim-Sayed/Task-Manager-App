import React from "react";
import { Text, TouchableOpacity, View, Switch } from "react-native";
import { Task } from "@/types/task";
import { TrashIcon } from "react-native-heroicons/outline";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  return (
<View
  className={`rounded-xl p-4 mb-2 shadow backdrop-blur-sm
    ${task.completed
      ? "border-green-500 bg-green-800"
      : "border-gray-300 bg-black/20"}
  `}
>      <View className="flex-row justify-between items-center">
        <View className="flex-1 pr-2">
           {task?.title ? (
            <Text
              className={`text-lg font-semibold ${
                task.completed ? "line-through text-gray-400" : "text-white"
              }`}
            >
              {task.title}
            </Text>
          ) : null}

          {task?.description ? (
            <Text className="text-white">{task.description}</Text>
          ) : null}

          {task?.createdAt ? (
            <Text className="text-white">
              Added: {task.createdAt.toLocaleString()}
            </Text>
          ) : null}

          {task?.startDate ? (
            <Text className="text-white">
              Start: {task.startDate.toLocaleString()}
            </Text>
          ) : null}

          {task?.endDate ? (
            <Text className="text-white">
              End: {task.endDate.toLocaleString()}
            </Text>
          ) : null}
        </View>

         <Switch
          value={task.completed}
          onValueChange={(value) => onToggle(task.id, value)}
          thumbColor={task.completed ? "#22c55e" : "#f4f3f4"}
          trackColor={{ false: "#767577", true: "#86efac" }}
        />
      </View>

      <TouchableOpacity
        onPress={() => onDelete(task.id)}
        className="mt-2 bg-red-700 p-1 rounded-lg self-end"
      >
        <TrashIcon size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};
