import { FC } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { MagnifyingGlassIcon, XMarkIcon } from "react-native-heroicons/outline";

interface Props {
    query: string;
    setQuery: (val: string) => void;
    showSearch: boolean;
    setShowSearch: (val: boolean) => void;
}

const TaskSearchBar: FC<Props> = ({ query, setQuery, showSearch, setShowSearch }) => {
    return (
        <View className=" mb-4 flex-row items-center">
            <View
                style={{
                    borderRadius: 50,
                    borderWidth: showSearch ? 1 : 0,
                    borderColor: showSearch ? "#d1d5db" : "transparent",
                }}
                className="flex-row items-center flex-1  rounded-full bg-black/20 backdrop-blur-sm  "
            >
                <TextInput
                    value={query}
                    onChangeText={setQuery}
                    placeholderTextColor="#ccc"
                    placeholder="Search tasks..."
                    className="text-white pl-6 h-12 flex-1 text-base"
                    autoFocus={showSearch}
                />

                <TouchableOpacity
                    onPress={() => {
                        if (query) {
                            setQuery("");
                        } else {
                            setShowSearch(!showSearch);
                        }
                    }}
                    className="h-14 w-14 rounded-full items-center justify-center bg-cyan-500/30"
                >
                    {query ? (
                        <XMarkIcon size={20} color="white" />
                    ) : (
                        <MagnifyingGlassIcon size={20} color="white" />
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default TaskSearchBar;
