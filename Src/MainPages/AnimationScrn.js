import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const AnimationScrn = () => {
    const navigation=useNavigation()
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity
        style={{
          width: 200,
          height: 50,
          backgroundColor: "orange",
          justifyContent: "center",
          borderRadius: 50,
          marginVertical: 30,
        }}
        onPress={() => navigation.navigate("MultipleAnim")}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
         Swap Animation
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          width: 200,
          height: 50,
          backgroundColor: "orange",
          justifyContent: "center",
          borderRadius: 50,
          marginVertical: 30,
        }}
        onPress={() => navigation.navigate("Slidding")}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
            Sliding Animation
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AnimationScrn;

const styles = StyleSheet.create({});
