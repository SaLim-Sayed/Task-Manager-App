import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

interface DateTimePickerComponentProps {
  label: string;
  value: Date;
  onChange: (date: Date) => void;
  minimumDate?: Date;
  maximumDate?: Date;
  mode?: "date" | "time" | "datetime";
  disabled?: boolean;
}

export const DateTimePickerComponent: React.FC<DateTimePickerComponentProps> = ({
  label,
  value,
  onChange,
  minimumDate,
  maximumDate,
  mode = "datetime",
  disabled = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const formatDate = (date: Date): string => {
    if (mode === "date") {
      return date.toLocaleDateString();
    } else if (mode === "time") {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } else {
      return date.toLocaleString([], {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  };

  const handleConfirm = (selectedDate: Date) => {
    setIsVisible(false);
    onChange(selectedDate);
  };

  const handleCancel = () => {
    setIsVisible(false);
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => !disabled && setIsVisible(true)}
        disabled={disabled}
        className={`rounded-lg border px-4 py-3 mb-4 
          ${disabled ? "bg-gray-300 border-gray-400" : "bg-white/90 border-gray-200"}
        `}
      >
        <Text className="text-xs font-semibold text-gray-600 mb-1">
          {label}
        </Text>
        <Text
          className={`text-base font-medium ${
            disabled ? "text-gray-400" : "text-gray-800"
          }`}
        >
          {formatDate(value)}
        </Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isVisible}
        mode={mode === "datetime" ? "datetime" : mode}
        date={value}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        minimumDate={minimumDate}
        maximumDate={maximumDate}
      />
    </View>
  );
};
