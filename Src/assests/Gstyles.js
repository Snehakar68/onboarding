import { StyleSheet } from "react-native";
import { rspH, rspW, scrn_height, scrn_width } from "../assests/Responsive";
import colors from "../assests/Colors";
import fontFM from "../assests/FontFM";
 
const gStyles = StyleSheet.create({
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowEvenly: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  rowBetweenStart: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  rowBetweenEnd: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  row_center: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
 
  rowCenterStart: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  rowCenterEnd: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  Tdir: {
    alignItems: "center",
    justifyContent: "center",
  },
  col_center: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  img_style_logo: {
    height: 40,
    width: 40,
    resizeMode: "contain",
    alignSelf: "center",
  },
 
  colBetween: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  colCenter: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  colCenterStart: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  colStartCenter: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  colStartBetween: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  colCenterEnd: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  globalHW: {
    height: rspH(852),
    width: rspW(393),
  },
  fullScrn: {
    height: scrn_height,
    width: scrn_width,
  },
  row_center: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  row_left: {
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexDirection: "row",
  },
  row_ac: {
    alignItems: "center",
    flexDirection: "row",
  },
  row_sb: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  row_sb_left: {
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexDirection: "row",
  },
  row_ar: {
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
  gBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
  },
  col_center: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  col_left: {
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "column",
  },
  col_sb: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
  },
  col_sb_left: {
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexDirection: "column",
  },
  blackBoxShadow: {
    shadowColor: "#000",
    elevation: 10,
  },
  errTxt: {
    color: colors.red,
    fontFamily: fontFM.regular,
    marginTop: rspH(7),
    width: "100%",
  },
});
 
export default gStyles;
 