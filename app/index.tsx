import { ImageBackground } from "expo-image";
import { useNavigation } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import TaskHeader from "@/components/TaskHeader";
import { TaskItem } from "@/components/TaskItem";
import { FloatingAddButton } from "@/components/ui/FloatingAddButton";
import { useTaskFilters } from "@/hooks/useTaskFilters";
import { useTaskStore } from "@/store/useTaskStore";
import { TaskFilter, TaskSort } from "@/types/task";
import { showDeleteConfirmation, showTaskUpdatedToast } from "@/utils/taskUtils";

export default function HomeScreen() {
  const { tasks, toggleTask, deleteTask } = useTaskStore();
  const navigation = useNavigation<any>();
  
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<TaskFilter>("all");
  const [sort, setSort] = useState<TaskSort>("newest");

  const filteredTasks = useTaskFilters(tasks, search, filter, sort);

  const handleToggleTask = (id: string) => {
    toggleTask(id);
    showTaskUpdatedToast();
  };

  const handleDeleteTask = (id: string) => {
    showDeleteConfirmation(() => deleteTask(id));
  };

  const handleAddTask = () => {
    navigation.navigate("addTask/index");
  };

  return (
    <SafeAreaView edges={['left', 'right']} className="flex-1 relative">
      <StatusBar style="dark" />
      <ImageBackground
        source={require("@/assets/images/bg.png")}
        style={{ flex: 1, padding: 16, paddingTop: 60 }}
      >
        <TaskHeader
          filter={filter}
          setFilter={setFilter}
          query={search}
          setQuery={setSearch}
          showSearch={showSearch}
          setShowSearch={setShowSearch}
          sort={sort}
          setSort={setSort}
        />

        <FlatList
          data={filteredTasks || []}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 100 }}
          renderItem={({ item }) => (
            <TaskItem
              task={item}
              onToggle={handleToggleTask}
              onDelete={handleDeleteTask}
            />
          )}
        />

        <FloatingAddButton onPress={handleAddTask} />
      </ImageBackground>

    </SafeAreaView>
  );
}