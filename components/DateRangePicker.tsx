import React from "react";
import { View, Text, Alert } from "react-native";
import { DateTimePickerComponent } from "./ui/DateTimePickerComponent";
 
interface DateRangePickerProps {
  startDate: Date;
  endDate: Date;
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: Date) => void;
  minimumDate?: Date;
  maximumDate?: Date;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  minimumDate = new Date(),
  maximumDate,
}) => {
  const handleStartDateChange = (date: Date) => {
    if (date >= endDate) {
      const newEndDate = new Date(date.getTime() + 60 * 60 * 1000);
      onEndDateChange(newEndDate);
    }
    onStartDateChange(date);
  };

  const handleEndDateChange = (date: Date) => {
    if (date <= startDate) {
      Alert.alert("Invalid Date", "End date must be after start date", [
        { text: "OK" },
      ]);
      return;
    }
    onEndDateChange(date);
  };

  return (
    <View className="my-2">
      <DateTimePickerComponent
        label="From"
        value={startDate}
        onChange={handleStartDateChange}
        minimumDate={minimumDate}
        maximumDate={maximumDate}
        mode="datetime"
      />

      <View className="items-center my-2">
        <Text className="text-sm italic text-gray-600">to</Text>
      </View>

      <DateTimePickerComponent
        label="To"
        value={endDate}
        onChange={handleEndDateChange}
        minimumDate={startDate}
        maximumDate={maximumDate}
        mode="datetime"
      />
    </View>
  );
};
