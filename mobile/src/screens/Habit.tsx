import { View, Text, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import dayjs from "dayjs";
import { BackButton } from "../components/BackButton";
import { ProgressBar } from "../components/ProgressBar";
import { CheckBox } from "../components/CheckBox";

interface HabitParams {
  date: string;
}

export const Habit = function HabitPage() {
  const route = useRoute();
  const { date } = route.params as HabitParams;

  const parsedDate = dayjs();
  const dayOfWeek = parsedDate.format("dddd");
  const dayAndMonth = parsedDate.format("DD/MM");

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />
        <Text className="mt-6 text-zinc-400 font-semibold lowercase">
          {dayOfWeek}
        </Text>
        <Text className="text-zinc-200 font-extrabold text-3xl">
          {dayAndMonth}
        </Text>
        <ProgressBar />
        <View className="mt-6">
          <CheckBox title="beber água" />
          <CheckBox title="beber água" checked={true} />
          <CheckBox title="beber água" />
        </View>
      </ScrollView>
    </View>
  );
};
