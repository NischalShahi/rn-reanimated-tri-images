import { Easing, withTiming } from 'react-native-reanimated';

export const changeScale = (toValue: number) =>
  withTiming(toValue, {
    duration: 500,
    easing: Easing.linear,
  });