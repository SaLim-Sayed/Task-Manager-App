import { FC, useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity } from "react-native";

interface Props {
  visible: boolean;
  onClose: () => void;
  onAddTask: (title: string, description: string) => void;
}

const AddTaskModal: FC<Props> = ({ visible, onClose, onAddTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAdd = () => {
    if (!title.trim()) return;
    onAddTask(title, description);
    setTitle("");
    setDescription("");
    onClose();
  };

  return (
    <Modal transparent visible={visible} animationType="slide">
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white w-[90%] rounded-xl p-4">
          <Text className="text-xl font-bold mb-4 text-center">Add Task</Text>

          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Task title"
            className="border border-gray-300 rounded-lg px-3 py-2 mb-3"
          />
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Task description"
            multiline
            numberOfLines={4}
            className="border border-gray-300 h-24 rounded-lg px-3 py-2 mb-4"
          />

          <TouchableOpacity
            onPress={handleAdd}
            className="bg-cyan-500  rounded-lg py-2 mb-2"
          >
            <Text className="text-white text-center font-semibold">Add Task</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onClose}
            className="bg-red-500/30 rounded-lg py-2"
          >
            <Text className="text-white text-center font-semibold">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AddTaskModal;
