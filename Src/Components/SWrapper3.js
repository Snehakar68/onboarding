import {
  ImageBackground,
  Keyboard,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";

import React, { memo, useEffect, useState } from "react";
import Colors from "../assests/Colors.js";
import { BallIndicator } from "react-native-indicators";
import {
  rspH,
  rspW,
  safe_bottom,
  safe_top,
  scrn_width,
} from "../assests/Responsive.js";
import gStyles from "../assests/Gstyles.js";

const SWrapper3 = ({
  children,
  hidden = false,
  statusBarColor = Colors.green,
  barStyle = "light-content",
  fullScreenColor,
  mainScreenColor = Colors.white,
  bottomAreaColor = Colors.black,
  padHor = 0,
  hideBottom = false,
  loading = false,
  loaderBGColor = Colors.black + "80",
  keyBoardVb = () => {},
}) => {
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        keyBoardVb(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        keyBoardVb(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <View
      style={{
        backgroundColor: fullScreenColor,
        flex: 1,
      }}
    >
      <StatusBar
        translucent={true}
        backgroundColor={statusBarColor}
        barStyle={barStyle}
      />

      <View
        style={{
          backgroundColor: mainScreenColor,
          paddingHorizontal: rspW(padHor),
          flex: 1,
        }}
      >
        {!hidden && (
          <SafeAreaView
            style={{
              width: "100%",

              height: safe_top,

              backgroundColor: statusBarColor,
            }}
          />
        )}
        {loading && (
          <View
            style={{ ...styles.loaderCont, backgroundColor: loaderBGColor }}
          >
            <BallIndicator
              color={Colors.Primary}
              style={{ width: rspH(60), height: rspH(60) }}
            />
          </View>
        )}

        {children}

        {!hideBottom && Platform.OS == "ios" && (
          <View
            style={{
              height: safe_bottom,
              width: scrn_width,
              backgroundColor: bottomAreaColor,
              position: "absolute",
              bottom: 0,
            }}
          />
        )}
      </View>
    </View>
  );
};

export default memo(SWrapper3);

const styles = StyleSheet.create({
  loaderCont: {
    position: "absolute",
    ...StyleSheet.absoluteFill,
    zIndex: 101,
    ...gStyles.colCenter,
  },
});
