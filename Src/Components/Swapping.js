import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const DraggableBox = ({ id, position, swapPositions,color }) => {
  const translateX = useSharedValue(position.x);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
    },
    onActive: (event, ctx) => {
      translateX.value = ctx.startX + event.translationX;
    },
    onEnd: () => {
      runOnJS(swapPositions)(id, translateX.value);
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  useEffect(() => {
    translateX.value = withSpring(position.x);
  }, [position]);

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[styles.box,{backgroundColor:color}, animatedStyle]} />
    </PanGestureHandler>
  );
};

const Swapping = () => {
  const [positions, setPositions] = useState([
    { id: 1, x: 0,color:'blue' },
    { id: 2, x: width -120,color:'orange' },
  ]);

  const swapPositions = (id, x) => {
    const boxIndex = positions.findIndex((box) => box.id === id);
    const otherBoxIndex = positions.findIndex((box) => box.id !== id);
    const otherBox = positions[otherBoxIndex];

    const isOverlapping = Math.abs(x - otherBox.x) < 100;

    if (isOverlapping) {
      const newPositions = positions.map((box) =>
        box.id === id
          ? { ...box, x: otherBox.x }
          : { ...box, x: positions[boxIndex].x }
      );
      setPositions(newPositions);
    } else {
      setPositions((prev) =>
        prev.map((box) =>
          box.id === id ? { ...box, x: positions[boxIndex].x } : box
        )
      );
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
    <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%',borderWidth:1,height:200,alignItems:"center"}}>
      {positions.map((box) => (
        <DraggableBox
          key={box.id}
          id={box.id}
          position={box}
          color={box.color}
          swapPositions={swapPositions}
        />
      ))}
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor:"white"
    
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
    margin: 10,
    position: 'absolute',
  },
});

export default Swapping;