import React, { useState,useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Draggable from "../Components/Draggable1";
import Box from "../Components/BoxImage";
import { pickImage } from "../assests/PickImage";
import Hobbies from "./Hobbies";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { LOGGED_IN_KEY, USER_DB_KEY } from "../../App";
import { useSharedValue } from "react-native-reanimated";

const arr = new Array(9).fill("").map((_, i) => i);

const ImgLoader = ({ route }) => {
  const {
    name,
    email,
    mobile,
    password,
    dobString,
    isAdmin,
    gender,
    selectedData,
    selected_list,
  } = route.params || {};

  const dobDate = new Date(dobString);
  const [imageArray, setImageArray] = useState([]);
  const [imgcount, setImgcount] = useState(0);
  const [imageErr, setImageErr] = useState(false);
  const [btnArray, setBtnArray] = useState(arr);
  const [draggableIndeces, setDraggableIndeces] = useState([]);
const [imgPosition, setImgPosition] = useState();
// const [totalImgPosition, setTotalImgPosition] = useState();

  const navigation = useNavigation();

  const handleSignup = async () => {
    try {
      if (!name || !email || !mobile || !password || !gender || !dobDate) {
        Alert.alert("Error", "All fields are required");
        return;
      }

      const users = JSON.parse(await AsyncStorage.getItem(USER_DB_KEY)) ?? [];
      const validSelectedList = Array.isArray(selected_list) ? selected_list : [];

      // Collect URIs from imageArray
      const profileImages = imageArray.map((image) => image.uri);

      const newUser = {
        name,
        mobile,
        email,
        password,
        dob: moment(dobDate).format("YYYY-MM-DD"),
        gender,
        preference: validSelectedList.map((code) => {
          const hobby = Hobbies.find((hobby) => hobby.label === code);
          return hobby ? hobby.label : "";
        }),
        role: isAdmin ? "admin" : "user",
        selectedData,
        profileImages, // Store multiple images here
        imgSeq:imgPosition ?? null
      };

      users.push(newUser); // user detail page open kro
      
      await AsyncStorage.setItem(USER_DB_KEY, JSON.stringify(users));
      await AsyncStorage.setItem(LOGGED_IN_KEY, email);

      navigation.navigate("Login");
      console.log("images",profileImages,imgPosition)

      Alert.alert("Success", "Signup Successful");
    } catch (error) {
      console.error("Signup error:", error);
      Alert.alert("Error", "There was an error saving your information");
    }
  };
 
  

  const handleBoxPress = async (index, isbtn) => {
    const newImage = await pickImage();
    const hasUri = newImage.uri !== "";

    if (hasUri) {
      setBtnArray((prev) => prev.map((val, idx) => (idx === imgcount ? "n" : val)));
      setImageArray((prev) => {
        if (isbtn || prev.length === 0) {
          return [...prev, newImage];
        }
        return prev.map((item, idx) => (idx === index ? newImage : item));
      });
      if (isbtn) setImgcount((prev) => prev + 1);
    }
  };

  const onImageRemove = (index) => {
    setImageArray((prev) => prev.filter((_, i) => i !== index));
    setImgcount((prev) => prev - 1);
    setBtnArray((prev) => {
      const newArray = [...prev];
      const lastNIndex = newArray.lastIndexOf("n");
      if (lastNIndex !== -1) {
        newArray[lastNIndex] = lastNIndex;
      }
      return newArray;
    });
  };

  const positions = useSharedValue(
    arr.reduce((acc, item, index) => ({ ...acc, [index]: index }), {})
  );

  console.log("Positions>>>>",imgPosition)
  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView style={styles.container}>
        <SafeAreaView style={styles.container}>
          <View style={styles.wrapper}>
            {imageArray.map((item, index) => (
              <Draggable
                draggableIndeces={draggableIndeces}
                key={index}
                imagCount={imgcount}
                positions={positions}
                id={index}
                imgPosition={imgPosition}
                setImgPosition={setImgPosition}
              >
                <Box
                  onBoxPress={() => handleBoxPress(index, false)}
                  key={index}
                  imageCount={imgcount}
                  count={index}
                  uri={item.uri}
                  onImageRemove={() => onImageRemove(index)}
                />
              </Draggable>
            ))}
            {btnArray.map((item, index) => (
              <Box
                onBoxPress={() => handleBoxPress(index, true)}
                key={index}
                count={item}
                uri={""}
                imageCount={imgcount}
              />
            ))}
          </View>
          {imageErr && (
            <Text
              style={{
                color: "red",
                marginTop: 10,
                textAlign: "center",
                fontSize: 16,
              }}
            >
              Please select an image
            </Text>
          )}
          <TouchableOpacity
            style={styles.signupButton}
            onPress={() => {
              if (imageArray.length === 0) {
                setImageErr(true);
              } else {
                handleSignup();
              }
            }}
          >
            <Text style={{ color: "black", fontSize: 20 }}>SignUp</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  wrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  signupButton: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "orange",
    marginTop: 20,
  },
});

export default ImgLoader;

