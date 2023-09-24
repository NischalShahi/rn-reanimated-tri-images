"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeScale = void 0;
const react_native_reanimated_1 = require("react-native-reanimated");
const changeScale = (toValue) => (0, react_native_reanimated_1.withTiming)(toValue, {
    duration: 500,
    easing: react_native_reanimated_1.Easing.linear,
});
exports.changeScale = changeScale;
