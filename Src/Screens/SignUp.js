import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  SafeAreaView,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FormCountrySelector from "../Components/FormCountrySelector";
import CInput from "../Components/Clnput";
import ErrorInfoTxt from "../Components/ErrorInfoTxt";
import { Countries } from "../Components/UpdatedCountries";
import Icon from "react-native-vector-icons/Fontisto";
import DateTimePickerC2 from "../Components/DateTimePickerC2";
import moment from "moment";
import SearchSelector2 from "../Components/SearchSelector2";
import FormMultiSelector from "../Components/FormMultiSelector";
import Hobbies from "../Components/Hobbies";
import { USER_DB_KEY } from "../../App";

const SignUp = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  console.log("first", isAdmin);
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameErr, setNameErr] = useState(false);
  const [mobileErr, setMobileErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [dataId, setDataId] = useState("code");
  const [blr_value, setblr_value] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [FilterData, setFilterData] = useState(Countries);
  const [selectedData, setSelectedData] = useState(null);
  const [SearchItem, setSearchItem] = useState("");
  const [dob, setDob] = useState(new Date());
  console.log(dob);
  const [dobErr, setDobErr] = useState(false);
  const [gender, setGender] = useState("");
  const [genderErr, setGenderErr] = useState(false);
  console.log("=>>>>", genderErr);
  const [selected_list, setselected_list] = useState([]);
  const [preference, setpreference] = useState([]);
  const [min_phn_no, setmin_phn_no] = useState(null);
  const [max_phn_no, setmax_phn_no] = useState(null);
  const [selected_ph_code, setselected_ph_code] = useState(null);
  const [multiCountErr, setMultiCountErr] = useState(false);
  const [eligibility, setEligibility] = useState(false);
  // Function to calculate age based on DOB
  const calculateAge = (dob) => {
    const today = new Date();
    const birthdate = new Date(dob);
    let age = today.getFullYear() - birthdate.getFullYear();
    const monthDifference = today.getMonth() - birthdate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthdate.getDate())
    ) {
      age--; // Adjust age if the birthday hasn't occurred yet this year
    }

    return age;
  };

  const handleDateSet = (date) => {
    setDob(date);
    setDobErr(""); // Clear the error message when a valid date is set
  };

  // Function to validate DOB and check eligibility
  const DobEligibility = (dob) => {
    if (!dob) {
      return "Date of birth is required"; // Message for empty DOB
    }

    const age = calculateAge(dob);

    if (age < 18) {
      return "You must be at least 18 years old to sign up"; // Message for underage users
    }

    return ""; // Return an empty string if no error
  };

  const validate = () => {
    let isValid = true;

    // Validate Name
    if (name === "") {
      setNameErr(true);
      isValid = false;
    } else {
      setNameErr(false);
    }

    // Validate Mobile
    if (mobile === "") {
      setMobileErr(true);
      isValid = false;
    } else {
      setMobileErr(false);
    }

    // Validate Email
    if (email === "") {
      setEmailErr(true);
      isValid = false;
    } else {
      setEmailErr(false);
    }

    // Validate Password
    const PasswordError = validation(password);
    if (PasswordError !== "") {
      setErrorText(PasswordError);
      isValid = false;
    } else {
      setErrorText("");
    }

    // Validate Gender
    if (gender === "") {
      setGenderErr(true);
      isValid = false;
    } else {
      setGenderErr(false);
    }

    // Validate DOB
    const DobError = DobEligibility(dob);
    if (DobError) {
      setDobErr(true); // Highlight DOB field as error
      setEligibility(DobError);
      isValid = false;
    } else {
      setDobErr(false); // Clear DOB error state
      setEligibility("");
    }

    return isValid;
  };

  useEffect(() => {
    if (dataId !== "") {
      // Find the selected country based on selectedId
      const selected_country = Countries.find((v) => v.phone === dataId);
      console.log("Selected country:", selected_country);

      // Check if selected_country is defined before using it
      if (selected_country) {
        let min_ph_no =
          typeof selected_country.phoneLength !== "number"
            ? selected_country.phoneLength[0]
            : selected_country.phoneLength;

        let max_ph_no =
          typeof selected_country.phoneLength !== "number"
            ? selected_country.phoneLength[
                selected_country.phoneLength.length - 1
              ]
            : selected_country.phoneLength;

        setmin_phn_no(min_ph_no);
        setmax_phn_no(max_ph_no);
        setselected_ph_code(selected_country);
      }
    }
  }, [dataId]);
  const validation = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumberCase = /[0-9]/.test(password);
    const hasSpecialChar = /[@#%&*]/.test(password);
    // if(errorText === ""){
    //   return `please enter your password`;
    // }
    if (password.length < minLength) {
      return `Password must be at least ${minLength} characters long.`;
    }
    if (!hasUpperCase) {
      return `Password must contain at least one uppercase letter.`;
    }
    if (!hasLowerCase) {
      return `Password must contain at least one lowercase letter.`;
    }
    if (!hasNumberCase) {
      return `Password must contain at least one number.`;
    }
    if (!hasSpecialChar) {
      return `Password must contain at least one special character.`;
    }
    return "";
  };

  const loginErr = (txt) => {
    const validText = validation(txt);
    setErrorText(validText);
  };

  const handleSearchitem = (filter) => {
    setFilterData(filter);
  };

  const hasErr = () => {
    return !selectedData;
  };

  const handleGenderChange = (selectedGender) => {
    setGender(selectedGender);
    setGenderErr(false); // Reset the error when a gender is selected
  };

  function RadioButton(props) {
    return (
      <TouchableOpacity
        onPress={props.onPress}
        style={[
          {
            height: 24,
            width: 24,
            borderRadius: 12,
            borderWidth: 2,
            borderColor: "#000",
            alignItems: "center",
            justifyContent: "center",
          },
          props.style,
        ]}
      >
        {props.selected ? (
          <View
            style={{
              height: 12,
              width: 12,
              borderRadius: 6,
              backgroundColor: "#000",
            }}
          />
        ) : null}
      </TouchableOpacity>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Sign Up</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            paddingHorizontal: 20,
            marginTop: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <RadioButton
              onPress={() => setIsAdmin(!isAdmin)}
              selected={isAdmin}
            />
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "black",
                marginStart: 10,
              }}
            >
              Admin
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <RadioButton
              onPress={() => setIsAdmin(!isAdmin)}
              selected={!isAdmin}
            />
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "black",
                marginStart: 10,
              }}
            >
              User
            </Text>
          </View>
        </View>
        <TextInput
          placeholder="Enter your name"
          placeholderTextColor={"black"}
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        {nameErr && (
          <Text style={styles.errorText}>Please enter your name</Text>
        )}

        <View style={styles.rowContainer}>
          <FormCountrySelector
            width={70}
            selectedId={dataId}
            setSelectedId={setDataId}
            selectedValue={dataId}
            blr_value={blr_value}
            setblr_value={setblr_value}
          />
          <TextInput
            placeholder="Enter your Mobile number"
            placeholderTextColor={"black"}
            value={mobile}
            // maxLength={10}
            onChangeText={setMobile}
            keyboardType="numeric"
            style={styles.inputnum}
          />

          {mobile.length < min_phn_no ||
          mobile.length > max_phn_no ||
          mobileErr ? (
            <Text style={{ color: "red", top: 33, right: 300, width: 400 }}>
              Phone number should be between {min_phn_no} and {max_phn_no}{" "}
              digits.
            </Text>
          ) : null}
        </View>
        <TextInput
          placeholder="Enter your Email id"
          keyboardType="email-address"
          placeholderTextColor={"black"}
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        {emailErr && (
          <Text style={styles.errorText}>Please enter your email</Text>
        )}

        <CInput
          style={{ with: "100%" }}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            loginErr(text);
          }}
          secureTextEntry={true}
          placeholder="Enter your Password"
          iconname="lock"
          err={errorText}
        />
        {errorText ? <ErrorInfoTxt title={errorText} /> : null}

        <DateTimePickerC2
         value={dob}
         setvalue={setDob}
         dtErr={dobErr}
         onDateSet={handleDateSet}
         mode="date"

        />

        {dobErr && (
          <Text style={{ color: "red", marginTop: 8 }}>
            {eligibility} {/* Display the eligibility error message */}
          </Text>
        )}

        <View style={styles.buttonContainer}>
          <Text style={styles.label}>Select Gender:</Text>
          <View style={styles.genderButtonContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                gender === "Male" && styles.selectedButton, // Highlight the selected button
              ]}
              onPress={() => handleGenderChange("Male")} // Handle gender change to Male
            >
              <Icon name="male" size={20} color={"white"} />
              <Text style={styles.buttonText}>Male</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                gender === "Female" && styles.selectedButton, // Highlight the selected button
              ]}
              onPress={() => handleGenderChange("Female")} // Handle gender change to Female
            >
              <Icon name="female" size={20} color={"white"} />
              <Text style={styles.buttonText}>Female</Text>
            </TouchableOpacity>
          </View>
        </View>
        {genderErr ? ( // Display the error message if genderErr is true
          <Text style={{ color: "red", marginTop: 16 }}>
            Please enter your gender here
          </Text>
        ) : null}

        <View style={{ width: "100%", paddingHorizontal: 20, marginTop: 20 }}>
          {/* <Text style={{color:'black',fontWeight:'600',fontSize:16}}>Hobies</Text> */}

          <FormMultiSelector
            style={{ marginTop: 10 }}
            selected_list={selected_list}
            
            setselected_list={setselected_list}
            search={true}
            setSelectedEntry={setpreference}
            selectedId={dataId}
            setSelectedId={setDataId}
            blr_value={blr_value}
            setblr_value={setblr_value}
            title="Preference"
            til
            placeholder={"Select hobbies"}
            width={"100%"}
            list={Hobbies}
            selectedValue={preference[1]}
          />
        </View>
        {selected_list.length === 0 ? (
          <Text style={{ color: "red" }}>please select your hobbies</Text>
        ) : null}

        <SearchSelector2
          Data={FilterData}
          search={SearchItem}
          setsearch={setSearchItem}
          selectedItem={selectedData}
          setSelectedItem={setSelectedData}
          onSearchTxt={handleSearchitem}
          searchkeys={["label"]}
          hasErr={hasErr()}
        />
        {hasErr() && (
          <Text style={{ color: "red" }}>Please select any item</Text>
        )}
        <Text
          style={{ color: "#4682b4", fontSize: 23, right: 80 }}
          onPress={() => {
            if (validate()) {
              const dobString = dob.toISOString();
              navigation.navigate("ImgLoader", {
                isAdmin,
                name,
                email,
                mobile,
                password,
                dobString,
                selected_list,
                gender,
                selectedData,
              });
            }
          }}
        >
          Continue.....
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange",
    justifyContent: "center",
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "orange",
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  title: {
    color: "black",
    fontSize: 30,
    marginBottom: 20,
  },
  input: {
    width: "90%",
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 15,
    marginVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "white",
    color: "black",
  },
  inputnum: {
    // flex: 1,
    width: "78%",

    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 15,
    paddingHorizontal: 10,
    backgroundColor: "white",
    color: "black",
  },
  errorText: {
    color: "red",
  },
  error: {
    color: "red",
  },
  btn: {
    width: "50%",
    height: 40,
    // borderWidth: 1,
    borderRadius: 50,
    justifyContent: "center",
    backgroundColor: "brown",
    marginVertical: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  link: {
    color: "black",
    textDecorationLine: "underline",
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    color: "black",
  },
  buttonContainer: {
    flexDirection: "row",
    top: 20,
    alignItems: "center",
    width: "90%",
  },
  genderButtonContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 5,
    marginStart: 5,
  },
  button: {
    padding: 10,
    marginHorizontal: 8,
    flexDirection: "row",
  },
  selectedButton: {
    backgroundColor: "rgba(1,1,1,0.2)",
    borderRadius: 30,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    marginBottom: 10,
  },
});
