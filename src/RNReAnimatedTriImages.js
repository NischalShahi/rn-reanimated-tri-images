"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RNReAnimatedTriImages = void 0;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
const FadingRoundImages_1 = require("./FadingRoundImages");
const changeScale_1 = require("./helperFunctions/changeScale");
const changePosition_1 = require("./helperFunctions/changePosition");
const changeZIndexValue = (toValue) => (0, react_native_reanimated_1.withTiming)(toValue, {
    duration: 100,
    easing: react_native_reanimated_1.Easing.linear,
});
const validateImages = (images) => {
    if (images.length !== 3) {
        throw new Error("Must have exactly 3 sub-arrays");
    }
    const firstSubArrayLength = images[0].length;
    if (!images.every(subArray => subArray.length === firstSubArrayLength)) {
        throw new Error("All sub-arrays of images must have the same length");
    }
};
const RNReAnimatedTriImages = ({ images, loop = true, interval = 3000 }) => {
    const { height, width } = (0, react_native_1.useWindowDimensions)();
    const [step, setStep] = (0, react_1.useState)(0);
    validateImages(images);
    (0, react_1.useEffect)(() => {
        const intervalId = setInterval(() => {
            if (step < images[0].length - 1) {
                setStep(step + 1);
            }
            else if (loop) {
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
        (0, react_native_reanimated_1.useSharedValue)({ x: containerWidth * 0.17, y: 0 }),
        (0, react_native_reanimated_1.useSharedValue)({ x: containerWidth * 0.34, y: 0 }),
        (0, react_native_reanimated_1.useSharedValue)({ x: containerWidth * 0.16, y: 0 }),
    ];
    const ZINDICES = [
        (0, react_native_reanimated_1.useSharedValue)(0),
        (0, react_native_reanimated_1.useSharedValue)(0),
        (0, react_native_reanimated_1.useSharedValue)(0),
    ];
    const scales = [(0, react_native_reanimated_1.useSharedValue)(1), (0, react_native_reanimated_1.useSharedValue)(1), (0, react_native_reanimated_1.useSharedValue)(1)];
    const animatedScales = scales.map((scale) => {
        return (0, react_native_reanimated_1.useDerivedValue)(() => {
            return (0, react_native_reanimated_1.interpolate)(scale.value, [0, 4], [0.5, 2], react_native_reanimated_1.Extrapolate.CLAMP);
        });
    });
    const changeZIndex = (0, react_1.useMemo)(() => [
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
    ], []);
    const animationSteps = (0, react_1.useMemo)(() => [
        () => {
            POSITIONS[0].value = (0, changePosition_1.changePosition)(containerWidth * 0.09, containerHeight * 0.1);
            scales[0].value = (0, changeScale_1.changeScale)(isSmallDevice() ? 1.6 : 1.8);
            POSITIONS[1].value = (0, changePosition_1.changePosition)(containerWidth * 0.33, containerHeight * 0.32);
            scales[1].value = (0, changeScale_1.changeScale)(isSmallDevice() ? 1.8 : 1);
            POSITIONS[2].value = (0, changePosition_1.changePosition)(containerWidth * 0.5, 0);
            scales[2].value = (0, changeScale_1.changeScale)(isSmallDevice() ? 2.2 : 2.5);
        },
        () => {
            POSITIONS[0].value = (0, changePosition_1.changePosition)(containerWidth * 0.54, height * 0.09);
            scales[0].value = (0, changeScale_1.changeScale)(isSmallDevice() ? 1.6 : 1.8);
            POSITIONS[1].value = (0, changePosition_1.changePosition)(containerWidth * 0.25, height * 0.18);
            scales[1].value = (0, changeScale_1.changeScale)(isSmallDevice() ? 1.3 : 1.5);
            POSITIONS[2].value = (0, changePosition_1.changePosition)(containerWidth * 0.16, 0);
            scales[2].value = (0, changeScale_1.changeScale)(isSmallDevice() ? 2 : 2.3);
        },
        () => {
            POSITIONS[0].value = (0, changePosition_1.changePosition)(width * 0.28, height * 0.18);
            scales[0].value = (0, changeScale_1.changeScale)(isSmallDevice() ? 1.5 : 1.6);
            POSITIONS[1].value = (0, changePosition_1.changePosition)(width * 0.16, 0);
            scales[1].value = (0, changeScale_1.changeScale)(isSmallDevice() ? 2.3 : 2.6);
            POSITIONS[2].value = (0, changePosition_1.changePosition)(width * 0.5, height * 0.05);
            scales[2].value = (0, changeScale_1.changeScale)(isSmallDevice() ? 1.5 : 1.9);
        },
        () => {
            POSITIONS[0].value = (0, changePosition_1.changePosition)(width * 0.45, height * 0.08);
            scales[0].value = (0, changeScale_1.changeScale)(isSmallDevice() ? 2.3 : 2.6);
            POSITIONS[1].value = (0, changePosition_1.changePosition)(width * 0.19, height * 0.2);
            scales[1].value = (0, changeScale_1.changeScale)(isSmallDevice() ? 1.4 : 1.6);
            POSITIONS[2].value = (0, changePosition_1.changePosition)(width * 0.08, 0);
            scales[2].value = (0, changeScale_1.changeScale)(isSmallDevice() ? 1.8 : 2);
        },
    ], []);
    (0, react_1.useEffect)(() => {
        if (step < images[0].length) {
            const index = step % 4;
            changeZIndex[index]();
            animationSteps[index]();
        }
    }, [step]);
    const animatedStyles = [
        (0, react_native_reanimated_1.useAnimatedStyle)(() => ({
            width: Imagewidth,
            height: imageHeight,
            position: "absolute",
            left: POSITIONS[0].value.x,
            top: POSITIONS[0].value.y,
            transform: [{ scale: animatedScales[0].value }],
            zIndex: ZINDICES[0].value,
        })),
        (0, react_native_reanimated_1.useAnimatedStyle)(() => ({
            width: Imagewidth,
            height: imageHeight,
            position: "absolute",
            top: POSITIONS[1].value.y,
            left: POSITIONS[1].value.x,
            zIndex: ZINDICES[1].value,
            transform: [{ scale: animatedScales[1].value }],
        })),
        (0, react_native_reanimated_1.useAnimatedStyle)(() => ({
            width: Imagewidth,
            height: imageHeight,
            position: "absolute",
            left: POSITIONS[2].value.x,
            top: POSITIONS[2].value.y,
            zIndex: ZINDICES[2].value,
            transform: [{ scale: animatedScales[2].value }],
        })),
    ];
    return (<react_native_1.View style={{
            position: "relative",
            width: containerWidth,
            height: containerHeight,
            marginTop: "15%"
        }}>
      <>
        <react_native_reanimated_1.default.View style={animatedStyles[0]}>
          <FadingRoundImages_1.FadingRoundImages images={images[0]} activeIndex={step}/>
        </react_native_reanimated_1.default.View>
        <react_native_reanimated_1.default.View style={animatedStyles[1]}>
          <FadingRoundImages_1.FadingRoundImages images={images[1]} activeIndex={step}/>
        </react_native_reanimated_1.default.View>
        <react_native_reanimated_1.default.View style={animatedStyles[2]}>
          <FadingRoundImages_1.FadingRoundImages images={images[2]} activeIndex={step}/>
        </react_native_reanimated_1.default.View>
      </>
    </react_native_1.View>);
};
exports.RNReAnimatedTriImages = RNReAnimatedTriImages;
