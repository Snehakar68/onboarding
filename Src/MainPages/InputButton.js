import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import CInputCont from "../Components/CInputCont";
import CInput from "../Components/Clnput";
import ErrorInfoTxt from "../Components/ErrorInfoTxt";
import BtnComp from "../Components/BtnComp";
import { Colors } from "react-native/Libraries/NewAppScreen";

const InputButton = () => {
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");

  const validation = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumberCase = /[0-9]/.test(password);
    const hasSpecialChar = /[@#%&*]/.test(password);

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
  const login_err = (txt) => {
    const validText = validation(txt);
    setErrorText(validText);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "purple",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CInputCont
        title=" INPUT BOX"
        width={200}
        children={
          <View style={{ top: -20 }}>
            <CInput
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                login_err(text);
              }}
              secureTextEntry={true}
              placeholder="Enter your Password"
              iconname="lock"
              err={errorText}
            />
            {errorText ? <ErrorInfoTxt title={errorText} /> : null}
          </View>
        }
      />
      <CInputCont
        title="Button component"
        children={
          <BtnComp
            title="CLICK ME"
            onPress={() => {
              login_err(password);
            }}
            extraStyleTxt={{ color: Colors.black }}
            extraStyle={{ width: 200, top: -15 }}
            disabled={password === "" || errorText !== ""}
            outlined={true}
          />
        }
      />
    </View>
  );
};

export default InputButton;

const styles = StyleSheet.create({});
