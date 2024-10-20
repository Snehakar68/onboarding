import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { getOrder, getPosition, MARGIN } from '../assests/Utils'
import Animated, { useAnimatedGestureHandler, useAnimatedReaction, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { PanGestureHandler } from 'react-native-gesture-handler'

const Draggable = ({Positions,id,children}) => {
    const Position=getPosition(Positions.value[id])
    const translateX=useSharedValue(Position.x)
    const translateY=useSharedValue(Position.y)

    const isGestureActive = useSharedValue(false)
    useAnimatedReaction(
        () => Positions.value[id],
        newOrder => {
          const newPostions = getPosition(newOrder);
          translateX.value = withTiming(newPostions.x);
          translateY.value = withTiming(newPostions.y);
        },
      );
      const panGesture=useAnimatedGestureHandler({
        onStart:(event,context)=>{
          context.StartX=translateX.value
          context.StartY=translateY.value
          isGestureActive.value=true
        },
        onActive:(event,context)=>{
          translateX.value=context.StartX + event.translationX
          translateY.value=context.StartY + event.translationY

          const oldOrder=Positions.value[id]
          const newOrder=getOrder(translateX.value,translateY.value)

          if(oldOrder !== newOrder){
            const IdToSwap=Object.keys(Positions.value).find(
              key => Positions.value[key] === newOrder,
            )
            if(IdToSwap){
              const newPostions = JSON.parse(JSON.stringify(Positions.value));
              newPostions[id] = newOrder;
              newPostions[IdToSwap] = oldOrder;
              Positions.value = newPostions;
            }
          }
          
        },
        onEnd:(event,context)=>{
          const destination=getPosition(Positions.value[id])

          translateX.value=withTiming(destination.x)
          translateY.value=withTiming(destination.y)
        },
        onFinish:()=>{
          isGestureActive.value=false
        }
      })
      const animatedStyle = useAnimatedStyle(() => {
        const zIndex = isGestureActive.value ? 1000 : 1;
        const scale = isGestureActive.value ? 1.1 : 1;
        return {
          position: 'absolute',
          margin: MARGIN* 2,
          zIndex,
          transform: [
            {translateX: translateX.value},
            {translateY: translateY.value},
            {scale},
          ],
        };
      });
      
  return (
     <Animated.View style={animatedStyle}>
      <PanGestureHandler onGestureEvent={panGesture}>
        <Animated.View>{children}</Animated.View>
      </PanGestureHandler>
    </Animated.View>
  )
}

export default Draggable

const styles = StyleSheet.create({})