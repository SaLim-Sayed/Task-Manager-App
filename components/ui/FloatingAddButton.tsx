import React from "react";
import { TouchableOpacity } from "react-native";
import { PlusIcon } from "react-native-heroicons/outline";

interface FloatingAddButtonProps {
  onPress: () => void;
}

export const FloatingAddButton: React.FC<FloatingAddButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="absolute bottom-8 right-6 h-14 w-14 bg-blue-500 rounded-full items-center justify-center shadow-lg"
    >
      <PlusIcon size={28} color="white" />
    </TouchableOpacity>
  );
};