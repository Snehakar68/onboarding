import { Dimensions, Platform } from "react-native";
import { initialWindowMetrics } from "react-native-safe-area-context";
import { moderateScale, scale } from "react-native-size-matters";

const insets = initialWindowMetrics?.insets;

const { width, height } = Dimensions.get("screen");

const safe_top = insets?.top;
const safe_bottom = insets?.bottom;

const scrn_width = width;
const scrn_height = height;

// f_hight = figma screen height
const f_height = 844;
const f_width = 390;

const fl_per = 1.2;

const act_hg = scrn_height - (safe_bottom + safe_top);

// In React Native, the font's letter spacing behaves differently on each platform.
// We should double-check on every platform after adding letter spacing.

// const rspF = val => {
//   let res = (val / f_height) * act_hg * 1.12;
//   return res;
// };

let perF = Platform.OS == "android" ? 0.965 : 0.975;

const rspF = (val) => {
  let res = (val / f_height) * scrn_height * perF;
  // let res = moderateScale(val)
  return res;
};

// const rspF = (val) => {
//   // let res = (val / (f_height / f_width)) * (scrn_height / scrn_width);
//   let res = moderateScale(val);
//   // let res = RFValue(val,800) * 1.1

//   return res;
// };
const rspFL = (val) => {
  let res = (val / f_height) * scrn_height * fl_per;
  return res;
};

const rspH = (val) => {
  let res = (val / f_height) * scrn_height;
  return res;
};

let rmTop = Platform.OS == "ios" ? insets?.bottom : insets?.top;

const rspHA = (val) => {
  let res = (val / f_height) * scrn_height - rmTop;
  return res;
};

const rspW = (val) => {
  let res = (val / f_width) * scrn_width;
  return res;
};

export {
  scrn_width,
  scrn_height,
  act_hg,
  rspH,
  rspHA,
  rspW,
  rspF,
  rspFL,
  safe_top,
  safe_bottom,
};
