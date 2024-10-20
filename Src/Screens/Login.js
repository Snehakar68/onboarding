import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { CommonActions, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux"; // Import useDispatch
import { LOGGED_IN_KEY, USER_DB_KEY } from "../../App"; // Assuming these constants are correctly defined
import { setLogin } from "../Redux/LoiginSlice";

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch(); // Initialize dispatch
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const validate = () => {
    let isValid = true;

    if (!email.trim()) {
      setEmailError(true);
      isValid = false;
    } else {
      setEmailError(false);
    }

    if (!password.trim()) {
      setPasswordError(true);
      isValid = false;
    } else {
      setPasswordError(false);
    }

    return isValid;
  };

  const handleLogin = async () => {
    try {
      const users = JSON.parse(await AsyncStorage.getItem(USER_DB_KEY)) || [];
      const userDetails = users.find(
        (user) => user.email === email && user.password === password
      );

      if (userDetails) {
        await AsyncStorage.setItem(LOGGED_IN_KEY, JSON.stringify(userDetails));
        
        dispatch(setLogin({
          loginState: true,
          userData: userDetails,
          isAdmin: userDetails.role === "admin", // Set isAdmin based on user role
          initialUser: userDetails,
        }));

        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: "Home",
                params: { 
                  isAdmin: userDetails.role === "admin",
                  userData: userDetails // Ensure this data is passed
                },
              },
            ],
          })
        );
      } else {
        Alert.alert(
          "Invalid Credentials",
          "Please check your email and password."
        );
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      Alert.alert("Error", "Failed to fetch users. Please try again later.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={[styles.input, emailError && styles.inputError]}
        placeholder="Enter your Email"
        placeholderTextColor="black"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      {emailError && (
        <Text style={styles.errorText}>Please enter your email</Text>
      )}

      <TextInput
        style={[styles.input, passwordError && styles.inputError]}
        placeholder="Enter your password"
        placeholderTextColor="black"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      {passwordError && (
        <Text style={styles.errorText}>Please enter your password</Text>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={() => validate() && handleLogin()}
      >
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("SignUp")}
        style={styles.signupButton}
      >
        <Text style={styles.signupText}>Create an Account Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "black",
    fontSize: 30,
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 50,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    fontSize: 16,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  button: {
    width: "50%",
    height: 50,
    backgroundColor: "brown",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  signupButton: {
    marginTop: 20,
  },
  signupText: {
    textDecorationLine: "underline",
    color: "black",
    fontSize: 16,
  },
});
