import { Alert } from "react-native";
import Toast from "react-native-toast-message";

export const showDeleteConfirmation = (
  onConfirm: () => void
) => {
  Alert.alert(
    "Confirm Deletion",
    "Are you sure you want to delete this task?",
    [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          onConfirm();
          Toast.show({ type: "error", text1: "Task deleted" });
        },
      },
    ]
  );
};

export const showTaskUpdatedToast = () => {
    Toast.show({ type: "info", text1: "Task updated" });
  };