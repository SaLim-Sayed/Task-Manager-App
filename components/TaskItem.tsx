import React from "react";
import { Text, TouchableOpacity, View, Switch } from "react-native";
import { Task } from "@/types/task";
import { CalendarIcon, TrashIcon } from "react-native-heroicons/outline";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  return (
    <View
      className={`rounded-xl p-4 mb-3 shadow backdrop-blur-sm
        ${task.completed
          ? "border-green-500 bg-green-600/20"
          : "border-gray-300 bg-black/20"}
      `}
    >
       <View className="flex-row justify-between items-start mb-2">
        <View className="flex-1 pr-3">
          {task?.title ? (
            <Text
              className={`text-lg font-semibold mb-1 ${
                task.completed ? "line-through text-gray-400" : "text-white"
              }`}
              numberOfLines={1}
            >
              {task.title}
            </Text>
          ) : null}

          {task?.description ? (
            <Text className="text-sm text-gray-200" numberOfLines={2}>
              {task.description}
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

       <View className="mt-3 flex-row justify-between items-end">
         <View className="flex-col space-y-1">
          {task?.createdAt && (
            <View className="flex-row items-center gap-1">
              <CalendarIcon size={16} color="white" />
              <Text className="text-xs text-white">
                Added: {task.createdAt.toLocaleString()}
              </Text>
            </View>
          )}

          {task?.startDate && (
            <View className="flex-row items-center gap-1">
              <CalendarIcon size={16} color="white" />
              <Text className="text-xs text-white">
                Start: {task.startDate.toLocaleString()}
              </Text>
            </View>
          )}

          {task?.endDate && (
            <View className="flex-row items-center gap-1">
              <CalendarIcon size={16} color="white" />
              <Text className="text-xs text-white">
                End: {task.endDate.toLocaleString()}
              </Text>
            </View>
          )}
        </View>

        <TouchableOpacity
          onPress={() => onDelete(task.id)}
          className="bg-red-700 px-3 py-1 rounded-lg"
        >
          <TrashIcon size={18} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
