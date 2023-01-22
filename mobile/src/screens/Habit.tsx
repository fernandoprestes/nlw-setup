import { View, Text, ScrollView, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import dayjs from "dayjs";
import { BackButton } from "../components/BackButton";
import { ProgressBar } from "../components/ProgressBar";
import { CheckBox } from "../components/CheckBox";
import { useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import { api } from "../lib/axios";
import { generateProgressPercentage } from "../utils/generate-progress-percentage";
import { HabitsEmpty } from "../components/HabitsEmpty";
import clsx from "clsx";

interface HabitParams {
  date: string;
}

interface Habits {
  possibleHabits: { id: string; title: string }[];
  completed: string[];
}

export const Habit = function HabitPage() {
  const route = useRoute();
  const { date } = route.params as HabitParams;

  const [loading, setLoading] = useState(true);
  const [habits, setHabits] = useState<Habits | null>(null);
  const [completedHabits, setCompletedHabits] = useState<string[]>([]);

  const parsedDate = dayjs(date);
  const dayOfWeek = parsedDate.format("dddd");
  const dayAndMonth = parsedDate.format("DD/MM");

  const isDateInPast = parsedDate.endOf("day").isBefore(new Date());

  const habitsProgress = habits?.possibleHabits.length
    ? generateProgressPercentage(
        habits.possibleHabits.length,
        completedHabits.length
      )
    : 0;

  async function fetchHabits() {
    try {
      setLoading(true);
      const response = await api.get("day", { params: { date } });
      setHabits(response.data);
      setCompletedHabits(response.data.completedHabits);
    } catch (error) {
      console.log(error);
      Alert.alert("Ops", "Não foi possível carregar as info dos hábitos!");
    } finally {
      setLoading(false);
    }
  }

  async function handleToggleHabit(habitId: string) {
    try {
      await api.patch(`habits/${habitId}/toggle`);
      if (completedHabits.includes(habitId)) {
        setCompletedHabits((state) =>
          state.filter((habit) => habit !== habitId)
        );
      } else {
        setCompletedHabits((state) => [...state, habitId]);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Ops", "Não foi passível atualizar o status do hábito");
    }
  }

  useEffect(() => {
    fetchHabits();
  }, []);

  if (loading) {
    return <Loading />;
  }

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
        <ProgressBar progress={habitsProgress} />
        <View className={clsx("mt-6", { "opacity-50": isDateInPast })}>
          {habits?.possibleHabits ? (
            habits.possibleHabits.map((habit) => (
              <CheckBox
                key={habit.id}
                title={habit.title}
                checked={completedHabits.includes(habit.id)}
                onPress={() => handleToggleHabit(habit.id)}
                disabled={isDateInPast}
              />
            ))
          ) : (
            <HabitsEmpty />
          )}
        </View>

        {isDateInPast && (
          <Text className="text-white mt-10 text-center">
            Você não pode atualizar um habito de uma data passada!
          </Text>
        )}
      </ScrollView>
    </View>
  );
};
