import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState, useLayoutEffect, useContext } from "react";
import { rspF, rspFL, rspH, rspW } from "../assests/Responsive";
import colors from "../assests/Colors.js";
import fontFm from "../assests/FontFM.js";
import Icon, { Icons } from "../assests/Icons.js";
//   import gStyles from '../assests/Gstyles.js';

const CInput = ({
  style,
  width = 320,
  value = "",
  onChangeText = () => {},
  placeholder = "",
  disabled = false,
  textAlign = "left",
  keyboardType = "default",
  secureTextEntry = false,
  maxLength = 50,
  textContentType = "name",
  a_allow = true,
  n_allow = true,
  s_allow = true,
  borderRadius = 10,
  mrgBtm = 15,
  err = false,
  iconname = "user",
  rightTxt = "",
}) => {
  const inpt_ref = useRef();

  const [visible, setvisible] = useState(false);

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        inpt_ref.current?.focus();
      }}
      style={{
        ...styles.input_cont,
        flexDirection: "row",
        marginBottom: rspH(mrgBtm),
        width: rspW(width),
        backgroundColor: colors?.white,
        borderColor: colors?.grayGreen,
        borderRadius: rspW(borderRadius),
        alignItems: "center",
        justifyContent: "flex-start",
        ...style
      }}   >
      {iconname && (
        <View
          style={{
            width: rspW(30),
            flexDirection: "row",
            // backgroundColor:'red',
            justifyContent: "center",
          }}
        >
          <Icon
            type={Icons.FontAwesome}
            solid
            name={iconname}
            color={colors.black}
            size={rspH(20)}
            // style={{marginRight: rspW(10)}}
          />
        </View>
      )}

      <TextInput
        textContentType={textContentType}
        ref={inpt_ref}
        value={value}
        editable={!disabled}
        maxLength={maxLength}
        keyboardType={keyboardType}
        secureTextEntry={visible && secureTextEntry}
        onChangeText={(text) => {
          // Get last character type
          let last = text.charAt(text.length - 1);
          let as_code = last.charCodeAt();

          // Add validation to disallow symbols or character or numbers
          let symbol_con =
            (as_code > 32 && as_code < 48) ||
            (as_code > 57 && as_code < 65) ||
            (as_code > 90 && as_code < 97) ||
            (as_code > 122 && as_code <= 126);

          let number_con = as_code > 47 && as_code < 58;

          let alphabet_con =
            (as_code > 64 && as_code < 91) || (as_code > 96 && as_code < 123);

          let symb = s_allow ? true : !symbol_con;
          let numb = n_allow ? true : !number_con;
          let alph = a_allow ? true : !alphabet_con;

          let cond_lis = [symb, numb, alph].every((v) => v == true);

          if (cond_lis) {
            onChangeText(text);
          }
        }}
        placeholder={placeholder}
        placeholderTextColor={colors?.black}
        style={{
          ...styles.inp_txt,

          paddingTop: !a_allow && !s_allow ? rspH(5) : 0,
          textAlign: textAlign,
          color: colors?.black,
        }}
      />

      {rightTxt && (
        <View>
          <Text
            style={{
              color: colors.primary,
              fontFamily: fontFm.medium,
              fontSize: rspF(14),
              paddingHorizontal: rspW(5),
            }}
          >
            {rightTxt}
          </Text>
        </View>
      )}

      {secureTextEntry && (
        <TouchableOpacity
          onPress={() => {
            setvisible(!visible);
          }}
        >
          <Icon
            type={Icons.Ionicons}
            solid
            name={visible ? "eye" : "eye-off"}
            size={rspH(20)}
            color={colors.black}
          />
        </TouchableOpacity>
      )}

      {err  && (
        <Icon
          type={Icons.Ionicons}
          solid
          name={"warning"}
          size={rspH(20)}
          color={colors.red} 
        />
      )}
    </TouchableOpacity>
  );
};

export default CInput;

const styles = StyleSheet.create({
  input_cont: {
    paddingHorizontal: rspW(12),
    // borderRadius: rspW(4),
    borderWidth: rspW(1),
    height: rspH(56),
    justifyContent: "center",
  },
  inp_txt: {
    fontFamily: fontFm.regular,
    fontSize: rspF(16),
    paddingVertical: 0,
    color: colors.primary,
    lineHeight: rspFL(16),
    flex: 1,
  },

  input: {
    color: colors.black,
    fontSize: rspF(2.02),
    fontFamily: fontFm.regular,
    lineHeight: rspF(2.2),
    paddingVertical: 0,
  },
});
