import { StyleSheet, Text, View, Alert } from "react-native";
import React, { useEffect } from "react";
import { CommonActions, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LOGGED_IN_KEY } from "../../App";

const Welcome = () => {
  const navigation = useNavigation();

  const getLoginState = async () => {
    try {
      const userData = await AsyncStorage.getItem(LOGGED_IN_KEY);

      if (userData) {
        let user;
        try {
          user = JSON.parse(userData);
        } catch (parseError) {
          console.error("Error parsing login state:", parseError);
          await AsyncStorage.removeItem(LOGGED_IN_KEY);
          Alert.alert("Error", "Login data corrupted. Please log in again.");
          navigation.navigate("Login");
          return;
        }

        if (user?.email) {
          console.log("User logged in:", user);
          
          setTimeout(() => {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  {
                    name: "Home",
                    params: { 
                      isAdmin: user.role === "admin",
                      userData: user,
                    },
                  },
                ],
              })
            );
          }, 3000); // Adjust the timeout if necessary
        } else {
          Alert.alert("User not found", "Please log in again.");
          navigation.navigate("Login");
        }
      } else {
        navigation.navigate("Login");
      }
    } catch (error) {
      console.error("Error fetching login state:", error);
      Alert.alert("Error", "Failed to fetch login state. Please try again.");
      navigation.navigate("Login");
    }
  };

  useEffect(() => {
    getLoginState();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome</Text>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 20,
  },
});
