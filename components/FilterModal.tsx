import { FC } from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";

interface Props {
  visible: boolean;
  onClose: () => void;
  filter: "all" | "completed" | "incomplete";
  setFilter: (val: "all" | "completed" | "incomplete") => void;
}

const FilterModal: FC<Props> = ({ visible, onClose, filter, setFilter }) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white w-80 rounded-xl p-4">
          <Text className="text-lg font-bold mb-4 text-center">Filter Tasks</Text>

          {["all", "completed", "incomplete"].map((item) => (
            <TouchableOpacity
              key={item}
              onPress={() => {
                setFilter(item as "all" | "completed" | "incomplete");
                onClose();
              }}
              className={`py-2 px-4 rounded-lg mb-2 ${filter === item ? "bg-blue-500" : "bg-gray-200"}`}
            >
              <Text className={`text-center font-medium ${filter === item ? "text-white" : "text-gray-800"}`}>
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            onPress={onClose}
            className="mt-2 py-2 px-4 rounded-lg bg-red-500"
          >
            <Text className="text-center text-white font-semibold">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;
