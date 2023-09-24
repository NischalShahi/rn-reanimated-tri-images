# RNReAnimatedTriImages

`RNReAnimatedTriImages` is a React Native component that provides a visually appealing way to display and animate three sets of images in a circular fashion with fading transitions. It utilizes the `react-native-reanimated` library for smooth animations and transitions.

## Installation

Before installing `RNReAnimatedTriImages`, make sure you have `react-native-reanimated` version 3 or higher installed in your React Native project. If not, you can install it with the following commands:

```bash
npm install react-native-reanimated@^3.0.0 rn-reanimated-tri-images
# or
yarn add react-native-reanimated@^3.0.0 rn-reanimated-tri-images

```

https://github.com/NischalShahi/rn-reanimated-tri-images/assets/37703654/edd82aaa-60e9-4cd8-80f6-e7f4d1ca33b1

| Props    | Required | Default | Description                                                                                                                                                                                                                                                                                           |
| -------- | -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| images   | true     |         | This should be an array containing 3 arrays with equal number of images url links. Eg: [ [examplephotos.com/1/sample1.jpg,examplephotos.com/1/sample2.jpg], [examplephotos.com/1/sample3.jpg, examplephotos.com/1/sample4.jpg ], [examplephotos.com/1/sample5.jpg, examplephotos.com/1/sample6.jpg] ] |
| interval | false    | 3000    | Interval of animation in ms.                                                                                                                                                                                                                                                                          |
| loop     | false    | true    | Set if the animation happens on loop or only once.                                                                                                                                                                                                                                                    |
