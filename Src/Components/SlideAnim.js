import React, { useEffect } from "react";
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSharedValue } from "react-native-reanimated";

import Box from "./Box";

import Draggable2 from "./Draggable2";

const arr = new Array(9).fill("").map((_, i) => i);

const SlideAnim = () => {
  const positions = useSharedValue(
    Object.assign({}, ...arr.map((item) => ({ [item]: item })))
  );

  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView style={styles.container}>
        <SafeAreaView style={styles.container}>
          <View style={styles.wrapper}>
            <Text style={{ color: "white", fontWeight: "600", fontSize: 20 }}>
              Slidding Animation
            </Text>
            {arr.map((item) => (
              <Draggable2 key={item} positions={positions} id={item}>
                <Box key={item} count={item} />
              </Draggable2>
            ))}
          </View>
        </SafeAreaView>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default SlideAnim;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  wrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 16,
  },
});
