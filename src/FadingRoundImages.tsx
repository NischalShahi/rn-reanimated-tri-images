import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";

const FADE_DURATION = 300;

type FadingRoundImagesProps = {
  images: string[];
  activeIndex: number;
};

const ImageComponent = ({ imageUrl, isActive }: { imageUrl: string; isActive: boolean;key: string }) => {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(isActive ? 1 : 0, {
      duration: FADE_DURATION,
      easing: Easing.inOut(Easing.ease),
    });
  }, [isActive]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
       width: "100%",
      height: "100%",
      borderRadius: 500,
      position:"absolute"
    };
  });


  return (
    <Animated.Image
      style={[animatedStyles]}
      source={{ uri: imageUrl }}
    />
  );
};

export const FadingRoundImages: React.FC<FadingRoundImagesProps> = ({
  images,
  activeIndex,
}:{
  images: string[];
  activeIndex: number;
}) => {
  return (
    <View 
    style={{
        width: "100%",
        height: "100%",
        position: "relative",
    }}>
      {images.map((imageUrl:string, index:number) => (
        <ImageComponent
          key={imageUrl + index}
          imageUrl={imageUrl}
          isActive={index === activeIndex}
        />
      ))}
    </View>
  );
};
