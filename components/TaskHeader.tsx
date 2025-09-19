import { FC } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import {
  BarsArrowDownIcon,
  BarsArrowUpIcon,
} from "react-native-heroicons/outline";
import TaskSearchBar from "./ui/TaskSearchBar";

interface Props {
  query: string;
  setQuery: (val: string) => void;
  showSearch: boolean;
  setShowSearch: (val: boolean) => void;
  sort: "newest" | "oldest";
  setSort: (val: "newest" | "oldest") => void;
  filter: "all" | "completed" | "incomplete";
  setFilter: (val: "all" | "completed" | "incomplete") => void;
}

const TaskHeader: FC<Props> = ({
  query,
  setQuery,
  showSearch,
  setShowSearch,
  sort,
  setSort,
  filter,
  setFilter,
}) => {
  return (
    <View className="w-full mb-4">
       <TaskSearchBar
        query={query}
        setQuery={setQuery}
        showSearch={showSearch}
        setShowSearch={setShowSearch}
      />

       <View className="flex-row items-center justify-between mt-3">
        <View className="flex-row flex-1 justify-around">
          {(["all", "completed", "incomplete"] as const).map((item) => (
            <TouchableOpacity
              key={item}
              onPress={() => setFilter(item)}
              className={`px-4 py-2 rounded-lg ${
                filter === item ? "bg-cyan-500" : "bg-gray-700"
              }`}
            >
              <Text
                className={`font-semibold ${
                  filter === item ? "text-white" : "text-gray-300"
                }`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          onPress={() => setSort(sort === "newest" ? "oldest" : "newest")}
          className="ml-3 h-10 w-10 rounded-xl bg-cyan-500/30 items-center justify-center"
        >
          {sort === "newest" ? (
            <BarsArrowDownIcon size={20} color="white" />
          ) : (
            <BarsArrowUpIcon size={20} color="white" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TaskHeader;
