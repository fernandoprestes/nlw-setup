import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withDelay,
} from "react-native-reanimated";

interface ProgressBarProps {
  progress?: number;
}

export const ProgressBar = function ProgressBarComponent({
  progress = 0,
}: ProgressBarProps) {
  const sharedProgress = useSharedValue(progress);

  const style = useAnimatedStyle(() => {
    return {
      width: `${sharedProgress.value}%`,
    };
  });

  useEffect(() => {
    sharedProgress.value = withDelay(100, withTiming(progress));
  }, [progress]);

  return (
    <View className="w-full h-3 rounded-xl bg-slate-700 mt-4">
      <Animated.View className="h-3 rounded-xl bg-violet-600" style={style} />
    </View>
  );
};
