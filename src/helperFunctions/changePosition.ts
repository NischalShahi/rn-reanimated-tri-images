import { withSpring } from "react-native-reanimated";

export const changePosition = (x: number, y: number) =>
  withSpring(
    {
      x,
      y
    },
    {
      damping: 11,
      stiffness: 50,
      overshootClamping: false,
    },
  );