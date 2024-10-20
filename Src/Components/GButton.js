import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { memo } from "react";
import { rspF, rspH, rspW } from "../assests/Responsive";
import colors from "../assests/Colors";
import gStyles from "../assests/Gstyles";
import { moderateScale } from "react-native-size-matters";
import fontFM from "../assests/FontFM";
 
const GButton = ({
  title = "",
  onPress = () => {},
  extraStyle = {},
  extraStyleTxt = {},
  disabled = false,
  outlined = false,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={{
        backgroundColor: disabled
          ? colors.greyf
          : outlined
          ? colors.SocialI
          : colors.Primary,
        borderWidth: outlined ? rspW(1) : 0,
 
        ...styles.btnCont,
        ...extraStyle,
      }}
      onPress={onPress}
    >
      <Text style={{ ...styles.btnTxt, ...extraStyleTxt }}>{title}</Text>
    </TouchableOpacity>
  );
};
 
export default memo(GButton);
 
const styles = StyleSheet.create({
  btnCont: {
    width: rspW(120),
    height: rspH(40),
    borderRadius: moderateScale(10),
    borderColor: colors.Primary,
    ...gStyles.colCenter,
  },
  btnTxt: {
    color: colors.white,
    fontSize: rspF(14),
    lineHeight: rspF(20),
    fontFamily: fontFM.bold,
  },
});
 
 