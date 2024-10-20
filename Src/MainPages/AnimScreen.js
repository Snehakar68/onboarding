import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const AnimScreen = () => {
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
        onPress={() => navigation.navigate("Main")}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
         Normal Selectors
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
        onPress={() => navigation.navigate("FullScreen")}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
         Full Screen Selectors
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AnimScreen;

const styles = StyleSheet.create({});
