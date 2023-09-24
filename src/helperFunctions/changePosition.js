"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePosition = void 0;
const react_native_reanimated_1 = require("react-native-reanimated");
const changePosition = (x, y) => (0, react_native_reanimated_1.withSpring)({
    x,
    y
}, {
    damping: 11,
    stiffness: 50,
    overshootClamping: false,
});
exports.changePosition = changePosition;
