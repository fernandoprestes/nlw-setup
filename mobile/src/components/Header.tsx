import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";

import LogoImg from "../assets/logo.svg";

export const Header = function HeaderComponent() {
  return (
    <View className="w-full flex-row items-center justify-between">
      <LogoImg />
      <TouchableOpacity
        activeOpacity={0.7}
        className="flex-row h-11 px-4 border border-violet-500 rounded-lg items-center"
      >
        <Feather name="plus" color={colors.violet[500]} size={20} />
        <Text className="text-white font-semibold text-base">Novo</Text>
      </TouchableOpacity>
    </View>
  );
};