import { Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { CommonActions, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOGGED_IN_KEY } from '../../App';

const Logout = () => {
  const navigation = useNavigation();
  
  const handleLogout = async () => {
    // Remove the loggedInUser from AsyncStorage
    console.log('log out fn called');
    try {
      await AsyncStorage.removeItem(LOGGED_IN_KEY);
      Alert.alert('Success', 'Logged out successfully');
      navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: "Login" }] })); // navigate to "Login");
    } catch (error) {
      Alert.alert("Error", "There was an error logging out");
    }
  }

  return (
    // <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={()=>handleLogout()}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    // </View>
  );
}

export default Logout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  button: {
    // width: 80,
    // height: 30,
    borderWidth: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding:10,
  },
  buttonText: {
    color: "black",
    fontSize: 20,
    textAlign: "center",
  }
});
