import clsx from "clsx";
import dayjs from "dayjs";
import {
  TouchableOpacity,
  TouchableOpacityProps,
  Dimensions,
} from "react-native";

import { generateProgressPercentage } from "../utils/generate-progress-percentage";

const WEEK_DAYS = 7;

const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5;

export const DAY_MARGIN_BETWEEN = 8;
export const DAY_SIZE =
  Dimensions.get("screen").width / WEEK_DAYS - (SCREEN_HORIZONTAL_PADDING + 5);

interface HabitDayProps extends TouchableOpacityProps {
  amountHabits?: number;
  amountCompleted?: number;
  date: Date;
}

export const HabitDay = function HabitDayComponent({
  amountCompleted = 0,
  amountHabits = 0,
  date,
  ...rest
}: HabitDayProps) {
  const amountAccomplishedPercentage =
    amountHabits > 0
      ? generateProgressPercentage(amountHabits, amountCompleted)
      : 0;

  const today = dayjs().startOf("day").toDate();
  const isCurrentDay = dayjs(date).isSame(today);

  return (
    <TouchableOpacity
      className={clsx("rounded-lg border-2 m-1", {
        "border-zinc-700 bg-zinc-900": amountAccomplishedPercentage === 0,
        "border-violet-700 bg-violet-900":
          amountAccomplishedPercentage > 0 && amountAccomplishedPercentage < 20,
        "border-violet-600 bg-violet-800":
          amountAccomplishedPercentage >= 20 &&
          amountAccomplishedPercentage < 40,
        "border-violet-500 bg-violet-700":
          amountAccomplishedPercentage >= 40 &&
          amountAccomplishedPercentage < 60,
        "border-violet-500 bg-violet-600":
          amountAccomplishedPercentage >= 60 &&
          amountAccomplishedPercentage < 80,
        "border-violet-400 bg-violet-500": amountAccomplishedPercentage >= 80,
        "border-white border-4": isCurrentDay,
      })}
      style={{ width: DAY_SIZE, height: DAY_SIZE }}
      activeOpacity={0.7}
      {...rest}
    />
  );
};
