import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Welcome from "./Src/Screens/Welcome";
import SignUp from "./Src/Screens/SignUp";
import Login from "./Src/Screens/Login";
import Home from "./Src/Screens/Home";
import Logout from "./Src/Screens/Logout";
import Box from "./Src/Components/Box";
import ImgLoader from "./Src/Components/ImgLoader";
import UserDetails from "./Src/Screens/UserDetails";
import AdminProfile from "./Src/Screens/AdminProfile";
import { Provider } from "react-redux";
import { persistor, store } from "./Src/Redux/Store";
import { PersistGate } from "redux-persist/integration/react";

export const USER_DB_KEY = "users";
export const LOGGED_IN_KEY = "userDetails";

const Stack = createNativeStackNavigator();

const App = () => {
  // console.log('Redux store:', Store);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName={"Welcome"}
              screenOptions={{
                statusBarColor: "orange",
                statusBarStyle: "light",
                navigationBarColor: "orange",
              }}
            >
              <Stack.Screen
                name="Welcome"
                component={Welcome}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="SignUp"
                component={SignUp}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="Logout"
                component={Logout}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="ImgLoader" component={ImgLoader} />
              <Stack.Screen
                name="UserDetails"
                component={UserDetails}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="AdminProfile"
                component={AdminProfile}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({});
