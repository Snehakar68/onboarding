import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";

const UpDownAnim = () => {
  const translateY = useSharedValue(0);
  const boxSize = useSharedValue(100);
  const borderRadius = useSharedValue(10);

  const moveUp = () => {
    translateY.value = withSequence(
      withTiming(-200, { duration: 500 }),
      withTiming(0, { duration: 500 })
    );
    boxSize.value = withSequence(
      withTiming(Math.max(50, boxSize.value - 20), { duration: 500 }),
      withTiming(100, { duration: 500 })
    );
    borderRadius.value = withSequence(
      withTiming(Math.min(50, borderRadius.value + 20), { duration: 500 }),
      withTiming(10, { duration: 500 })
    );
  };

  const moveDown = () => {
    translateY.value = withSequence(
      withTiming(200, { duration: 500 }),
      withTiming(0, { duration: 500 })
    );
    boxSize.value = withSequence(
      withTiming(Math.min(150, boxSize.value + 20), { duration: 500 }),
      withTiming(100, { duration: 500 })
    );
    borderRadius.value = withSequence(
      withTiming(Math.max(10, borderRadius.value - 20), { duration: 500 }),
      withTiming(10, { duration: 500 })
    );
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
      width: boxSize.value,
      height: boxSize.value,
      borderRadius: borderRadius.value,
    };
  });

  return (
    <GestureHandlerRootView style={styles.container}>
      <PanGestureHandler
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
        <Animated.View style={[styles.box, animatedStyle]} />
      </PanGestureHandler>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={moveUp}
        >
          <Text style={styles.buttonText}>UP</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={moveDown}
        >
          <Text style={styles.buttonText}>Down</Text>
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    backgroundColor: "tomato",
  },
  buttonContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 50,
  },
  button: {
    width: 100,
    height: 40,
    backgroundColor: "orange",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});

export default UpDownAnim;
