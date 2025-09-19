import { DateRangePicker } from "@/components/DateRangePicker";
import { useTaskStore } from "@/store/useTaskStore";
import { dateUtils } from "@/utils/dateUtils";
import { ImageBackground } from "expo-image";
import { useNavigation } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
 
export default function AddTaskScreen() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(() => {
     return dateUtils.addTime(new Date(), 2);
  });

  const { addTask } = useTaskStore();
  const navigation = useNavigation();

  const handleAddTask = () => {
    if (!title.trim()) {
      Toast.show({ type: "error", text1: "Title is required" });
      return;
    }

    if (!dateUtils.isValidDateRange(startDate, endDate)) {
      Toast.show({ type: "error", text1: "End date must be after start date" });
      return;
    }

    const duration = dateUtils.getDurationHours(startDate, endDate);
    if (duration > 24 * 30) { 
      Toast.show({ 
        type: "error", 
        text1: "Task duration cannot exceed 30 days" 
      });
      return;
    }

    addTask({ title, description, startDate, endDate });
    Toast.show({ 
      type: "success", 
      text1: "Task added!",
      text2: `Duration: ${Math.round(duration)} hours`
    });
    navigation.goBack();
  };

  return (
    <SafeAreaView edges={['left', 'right']} className="flex-1 relative">
      <StatusBar style="dark" />
   
      <ImageBackground
        source={require("@/assets/images/bg.png")}
        style={{ flex: 1 }}
      >
        <View className="flex-row items-center px-4 py-8 mt-10 bg-transparent gap-2">
          <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeftIcon size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white font-bold text-lg">Add Task</Text>
        </View>
        <ScrollView 
          style={{ flex: 1, padding: 16, paddingTop: 6 }}
          showsVerticalScrollIndicator={false}
        >
          <TextInput
            placeholder="Task Title"
            value={title}
            onChangeText={setTitle}
            className="bg-white/90 p-3 rounded-lg mb-4 text-gray-800"
            placeholderTextColor="#666"
          />

          <TextInput
            placeholder="Description (optional)"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            className="bg-white/90 min-h-40 p-3 rounded-lg mb-4 text-gray-800"
            placeholderTextColor="#666"
          />

           <>
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
            minimumDate={new Date()}
          />

          <TouchableOpacity 
            className="bg-blue-100/90 p-3 rounded-lg mb-4"
            disabled
          >
            <Text className="text-blue-800 text-center">
              Duration: {Math.round(dateUtils.getDurationHours(startDate, endDate))} hours
            </Text>
          </TouchableOpacity>

          </>
          <TouchableOpacity
            onPress={handleAddTask}
            className="mt-4 bg-blue-500 p-4 rounded-lg shadow-lg"
          >
            <Text className="text-white text-center font-bold text-lg">
              Save Task
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}
