import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
  cancelAnimation,
  Easing,
  interpolate,
  runOnJS,
  withRepeat,
  withSequence,
} from "react-native-reanimated";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";

const Animation = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const animation = useSharedValue(0);
  const isRotating = useSharedValue(false);
  const jumpAnimation = useSharedValue(0);
  const rotate = useSharedValue(0);
  const boxSize = useSharedValue(100);
  const borderRadius = useSharedValue(10);

  const animationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${interpolate(animation.value, [0, 360], [0, 360])}deg` },
        { translateY: interpolate(jumpAnimation.value, [0, 1], [0, -100]) },
      ],
    };
  });

  const startRotation = () => {
    "worklet";
    isRotating.value = true;
    animation.value = withRepeat(
      withTiming(360, { duration: 2000, easing: Easing.linear }),
      -1,
      false
    );
  };

  const stopRotation = () => {
    "worklet";
    isRotating.value = false;
    cancelAnimation(animation);
    animation.value = 0;
  };
  const startJump = () => {
    "worklet";
    jumpAnimation.value = withSequence(
      withTiming(1, { duration: 200, easing: Easing.linear }),
      withTiming(0, { duration: 200, easing: Easing.linear })
    );
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotate.value}deg` }],
    };
  });
//   const moveUp = () => {
//     translateY.value = withSequence(
//       withTiming(-200, { duration: 500 }),
//       withTiming(0, { duration: 500 })
//     );
//     boxSize.value = withSequence(
//       withTiming(Math.max(50, boxSize.value - 20), { duration: 500 }),
//       withTiming(100, { duration: 500 })
//     );
//     borderRadius.value = withSequence(
//       withTiming(Math.min(50, borderRadius.value + 20), { duration: 500 }),
//       withTiming(10, { duration: 500 })
//     );
//   };

//   const moveDown = () => {
//     translateY.value = withSequence(
//       withTiming(200, { duration: 500 }),
//       withTiming(0, { duration: 500 })
//     );
//     boxSize.value = withSequence(
//       withTiming(Math.min(150, boxSize.value + 20), { duration: 500 }),
//       withTiming(100, { duration: 500 })
//     );
//     borderRadius.value = withSequence(
//       withTiming(Math.max(10, borderRadius.value - 20), { duration: 500 }),
//       withTiming(10, { duration: 500 })
//     );
//   };
//   const animatedStyle1 = useAnimatedStyle(() => {
//     return {
//       transform: [{ translateY: translateY.value }],
//       width: boxSize.value,
//       height: boxSize.value,
//       borderRadius: borderRadius.value,
//     };
//   });

  return (
    <GestureHandlerRootView style={styles.container}>
      <Animated.View style={[styles.box, animationStyle, animatedStyle]} />
      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            translateX.value = withSpring(translateX.value + 100);
          }}
        >
          <Text style={styles.buttonText}>Right</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            translateX.value = withSpring(translateX.value - 100);
          }}
        >
          <Text style={styles.buttonText}>Left</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            translateY.value = withSpring(translateY.value - 100);
          }}
        >
          <Text style={styles.buttonText}>Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            translateY.value = withSpring(translateY.value + 100);
          }}
        >
          <Text style={styles.buttonText}>Down</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.startButton}
        onPress={() => {
          if (!isRotating.value) {
            startRotation();
          }
        }}
      >
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.stopButton}
        onPress={() => {
          if (isRotating.value) {
            stopRotation();
          }
        }}
      >
        <Text style={styles.buttonText}>Stop</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.stopButton}
        onPress={() => {
          startJump();
        }}
      >
        <Text style={styles.buttonText}>Jump</Text>
      </TouchableOpacity>

      {/* <PanGestureHandler
        onGestureEvent={(event) => {
          translateY.value = event.translationY;

          if (event.translationY < 0) {
            boxSize.value = Math.max(50, 100 + event.translationY); // Min size 50
            borderRadius.value = Math.min(50, 10 + -event.translationY / 2); // Max radius 50
          } else {
            boxSize.value = Math.min(150, 100 + event.translationY); // Max size 150
            borderRadius.value = Math.max(10, 50 - event.translationY / 2); // Min radius 10
          }
        }}
      >
        <Animated.View style={[styles.box, animatedStyle1]} />
      </PanGestureHandler> */}
      {/* <TouchableOpacity style={styles.button} onPress={moveUp}>
        <Text style={styles.buttonText}>Top</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={moveDown}>
        <Text style={styles.buttonText}>Bottom</Text>
      </TouchableOpacity> */}
    </GestureHandlerRootView>
  );
};

export default Animation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: "orange",
  },
  controls: {
    marginTop: 20,
    alignItems: "center",
  },
  button: {
    width: 100,
    height: 30,
    borderWidth: 1,
    marginVertical: 5,
    justifyContent: "center",
  },
  buttonText: {
    color: "black",
    textAlign: "center",
  },
  rotatingBox: {
    width: 100,
    height: 100,
    backgroundColor: "orange",
    marginTop: 50,
  },
  startButton: {
    width: 100,
    height: 30,
    borderWidth: 1,
    marginTop: 20,
    justifyContent: "center",
  },
  stopButton: {
    width: 100,
    height: 30,
    borderWidth: 1,
    marginTop: 10,
    justifyContent: "center",
  },
});
