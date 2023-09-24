import React, { useEffect, useMemo, useState } from "react";
import { View, useWindowDimensions } from "react-native";
import Animated, {
  Easing,
  useSharedValue,
  withSpring,
  withTiming,
  useDerivedValue,
  interpolate,
  Extrapolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { FadingRoundImages } from "./FadingRoundImages";
import { changeScale } from "./helperFunctions/changeScale";
import { changePosition } from "./helperFunctions/changePosition";




  const changeZIndexValue = (toValue: number) =>
  withTiming(toValue, {
    duration: 100,
    easing: Easing.linear,
  });


  


  type AnimatedTriImagesProps = {
    images:string[][];
    loop?: boolean;
    interval?: number;
  }

  const validateImages = (images: string[][]) => {
  if (images.length !== 3) {
    throw new Error("Must have exactly 3 sub-arrays");
  }
  
  const firstSubArrayLength = images[0].length;
  
  if(!images.every(subArray => subArray.length === firstSubArrayLength)){
    throw new Error("All sub-arrays of images must have the same length");
  }
}



export const RNReAnimatedTriImages:React.FC<AnimatedTriImagesProps> = ({images, loop=true, interval=3000}:{images:string[][];loop?:boolean;interval?:number}) => {
  const { height, width } = useWindowDimensions();

  const [step,setStep] =useState(0);

  validateImages(images)

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (step < images[0].length - 1) {
        setStep(step + 1);
      } else if(loop) {
        setStep(0); 
      }
    }, interval);

    return () => {
      clearInterval(intervalId);
    };
  }, [step]);

  const isSmallDevice = () => height < 680;

  const containerWidth = width;
  const containerHeight = height * 0.55;
  const Imagewidth = width * 0.33;
  const imageHeight = width * 0.47;

  const POSITIONS = [
    useSharedValue({ x: containerWidth * 0.17, y: 0 }),
    useSharedValue({ x: containerWidth * 0.34, y: 0 }),
    useSharedValue({ x: containerWidth * 0.16, y: 0 }),
  ];

  const ZINDICES = [
    useSharedValue(0),
    useSharedValue(0),
    useSharedValue(0),
  ]

  const scales = [useSharedValue(1), useSharedValue(1), useSharedValue(1)];

  const animatedScales = scales.map((scale) => {
    return useDerivedValue(() => {
      return interpolate(scale.value, [0, 4], [0.5, 2], Extrapolate.CLAMP);
    });
  });

  const changeZIndex = useMemo(() => [
    () => {
      ZINDICES[0].value = changeZIndexValue(2);
      ZINDICES[1].value = changeZIndexValue(3);
      ZINDICES[2].value = changeZIndexValue(1);
    },
    () => {
      ZINDICES[0].value = changeZIndexValue(1);
      ZINDICES[1].value = changeZIndexValue(3);
      ZINDICES[2].value = changeZIndexValue(2);
    },
    () => {
      ZINDICES[0].value = changeZIndexValue(3);
      ZINDICES[1].value = changeZIndexValue(2);
      ZINDICES[2].value = changeZIndexValue(1);
    },
    () => {
      ZINDICES[0].value = changeZIndexValue(1);
      ZINDICES[1].value = changeZIndexValue(3);
      ZINDICES[2].value = changeZIndexValue(2);
    }
  ],[])

  const animationSteps = useMemo(
    () => [
      () => {
        POSITIONS[0].value = changePosition(
          containerWidth * 0.09,
          containerHeight * 0.1
        );
        scales[0].value = changeScale(isSmallDevice() ? 1.6 : 1.8);

        POSITIONS[1].value = changePosition(
          containerWidth * 0.33,
          containerHeight * 0.32
        );
        scales[1].value = changeScale(isSmallDevice() ? 1.8 : 1);

        POSITIONS[2].value = changePosition(containerWidth * 0.5, 0);
        scales[2].value = changeScale(isSmallDevice() ? 2.2 : 2.5);
      },
      () => {
        POSITIONS[0].value = changePosition(
          containerWidth * 0.54,
          height * 0.09
        );
        scales[0].value = changeScale(isSmallDevice() ? 1.6 : 1.8);
        POSITIONS[1].value = changePosition(
          containerWidth * 0.25,
          height * 0.18
        );
        scales[1].value = changeScale(isSmallDevice() ? 1.3 : 1.5);
        POSITIONS[2].value = changePosition(containerWidth * 0.16, 0);
        scales[2].value = changeScale(isSmallDevice() ? 2 : 2.3);
      },
      () => {
        POSITIONS[0].value = changePosition(width * 0.28, height * 0.18);
        scales[0].value = changeScale(isSmallDevice() ? 1.5 : 1.6);
        POSITIONS[1].value = changePosition(width * 0.16, 0);
        scales[1].value = changeScale(isSmallDevice() ? 2.3 : 2.6);
        POSITIONS[2].value = changePosition(width * 0.5, height * 0.05);
        scales[2].value = changeScale(isSmallDevice() ? 1.5 : 1.9);
      },
      () => {
        POSITIONS[0].value = changePosition(width * 0.45, height * 0.08);
        scales[0].value = changeScale(isSmallDevice() ? 2.3 : 2.6);
        POSITIONS[1].value = changePosition(width * 0.19, height * 0.2);
        scales[1].value = changeScale(isSmallDevice() ? 1.4 : 1.6);
        POSITIONS[2].value = changePosition(width * 0.08, 0);
        scales[2].value = changeScale(isSmallDevice() ? 1.8 : 2);
      },
    ],
    [],
  );

 useEffect(() => {
  if (step < images[0].length) {
    const index = step % 4; 
    changeZIndex[index]();
    animationSteps[index]();
  }
}, [step]);

  const animatedStyles = [
    useAnimatedStyle(() => ({
      width: Imagewidth,
      height: imageHeight,
      position: "absolute",
      left: POSITIONS[0].value.x,
      top: POSITIONS[0].value.y,
      transform: [{ scale: animatedScales[0].value }],
      zIndex: ZINDICES[0].value,
    })),
    useAnimatedStyle(() => ({
      width: Imagewidth,
      height: imageHeight,
      position: "absolute",
      top: POSITIONS[1].value.y,
      left: POSITIONS[1].value.x,
      zIndex: ZINDICES[1].value,
      transform: [{ scale: animatedScales[1].value }],
    })),
    useAnimatedStyle(() => ({
      width: Imagewidth,
      height: imageHeight,
      position: "absolute",
      left: POSITIONS[2].value.x,
      top: POSITIONS[2].value.y,
      zIndex:  ZINDICES[2].value,
      transform: [{ scale: animatedScales[2].value }],
    })),
  ];

  return (
    <View
    style={{
        position:"relative",
        width:containerWidth,
        height:containerHeight,
        marginTop: "15%"
    }}>
      <>
        <Animated.View style={animatedStyles[0]}>
          <FadingRoundImages
            images={images[0]}
            activeIndex={step}
          />
        </Animated.View>
        <Animated.View style={animatedStyles[1]}>
          <FadingRoundImages
            images={images[1]}
            activeIndex={step}
          />
        </Animated.View>
        <Animated.View style={animatedStyles[2]}>
          <FadingRoundImages
            images={images[2]}
            activeIndex={step}
          />
        </Animated.View>
      </>
    </View>
  );
};
