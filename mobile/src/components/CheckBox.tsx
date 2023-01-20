import {
  View,
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";

interface CheckBoxProps extends TouchableOpacityProps {
  title: string;
  checked?: boolean;
}

export const CheckBox = function CheckBoxComponent({
  title,
  checked = false,
  ...rest
}: CheckBoxProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="flex-row mb-2 items-center gap-3"
      {...rest}
    >
      {checked ? (
        <View className="h-8 w-8 bg-green-500 rounded-lg items-center justify-center">
          <Feather name="check" size={20} color={colors.white} />
        </View>
      ) : (
        <View className="h-8 w-8 bg-zinc-900 rounded-lg items-center justify-center"></View>
      )}
      <Text className="text-white">{title}</Text>
    </TouchableOpacity>
  );
};
