import {
  LayoutAnimation,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { rspF, rspH, rspW } from "../assests/Responsive";
import colors from "../assests/Colors";
import gStyles from "../assests/Gstyles";
import fontFM from "../assests/FontFM";
import FastImage from "react-native-fast-image";
import { moderateScale } from "react-native-size-matters";
import { CloseIc, LeftBack, SearchIc } from "../assests/CLS";

const filterData = (dataList, text, properties) => {
  return dataList.filter((v) =>
    properties.some((prop) => {
      let aprop = v[prop];
      if (String(prop).startsWith("add")) {
        let prp_arr = prop.split("_");
        aprop = prp_arr[1] + v[prp_arr[2]];
      } else if (String(prop).startsWith("rep@")) {
        let prp_arr = prop.split("_");
        aprop = v[prp_arr[2]].replace(prp_arr[1], "");
      }

      const stringValue = String(aprop).toLowerCase();
      const searchText = String(text.trim()).toLowerCase();
      
      return stringValue.startsWith(searchText);
    })
  );
};

const Searcher = ({
  search,
  setsearch,
  datalist = [],
  setvisible = () => {},
  setfilterdatalist = () => {},
  searchkeys = [],
  extraStyle = {},
}) => {
  const [placeholder, setplaceholder] = useState("Search Here ...");

  return (
    <View style={{ ...styles.topCont, ...extraStyle }}>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          LayoutAnimation.linear();
          setvisible(false);
        }}
        style={styles.backCont}
      >
        <FastImage
          source={LeftBack}
          style={styles.backIc}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <View style={styles.searchCont}>
        <View style={styles.searchIcCont}>
          <FastImage source={SearchIc} style={styles.searchIc} />
        </View>
        <View style={styles.searchTxtCont}>
          <TextInput
            value={search}
            onChangeText={(text) => {
              setsearch(text);
              setfilterdatalist(filterData(datalist, text, searchkeys));
            }}
            placeholderTextColor={colors.black}
            placeholder={placeholder}
            onFocus={() => {
              setplaceholder("");
            }}
            onBlur={() => {
              setplaceholder("Search Here ...");
            }}
            style={styles.searchInpTxt}
          />
        </View>
        <View style={styles.closeIcCont}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              setfilterdatalist(filterData(datalist, "", searchkeys));
              setsearch("");
            }}
            style={styles.closeIcSCont}
          >
            <FastImage source={CloseIc} style={styles.closeIc} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Searcher;

const styles = StyleSheet.create({
  mainCont: {
    flex: 1,
  },
  topCont: {
    height: rspH(44),
    width: "100%",
    marginTop: rspH(20),

    ...gStyles.rowBetween,
  },
  backCont: { height: "100%", ...gStyles.rowCenterStart, width: "10%" },
  backIc: {
    height: rspH(24),
    width: rspW(18),
  },
  searchCont: {
    height: "100%",
    width: "90%",
    backgroundColor: colors.blackGrey,
    borderRadius: moderateScale(12),
    ...gStyles.rowBetween,
  },
  searchTxtCont: {
    width: "75%",
    height: "100%",
    ...gStyles.colCenter,
  },
  searchInpTxt: {
    color: colors.red,
    height: "100%",
    paddingVertical: 0,
    marginTop: rspH(1),
    width: "100%",
    fontSize: rspF(16),
    fontFamily: fontFM.medium,
    lineHeight: rspF(12),
   
    borderRadius:10
  },
  searchIcCont: {
    width: "15%",
    height: "100%",
    ...gStyles.colCenter,
  },
  searchIc: {
    height: rspH(24),
    width: rspH(24),
  },
  closeIcCont: {
    width: "10%",
    height: "100%",
    ...gStyles.row_ac,
  },
  closeIcSCont: {
    height: rspH(24),
    width: rspH(24),
    ...gStyles.colCenter,
  },
  closeIc: {
    height: rspH(10),
    width: rspH(10),
  },
  fListCont: {
    flex: 1,
    marginTop: rspH(30),
    backgroundColor: "red",
  },

  fLisItem: {
    height: rspH(52),
    width: "100%",
    ...gStyles.row_ac,
  },
  fLisItemImg: {
    width: rspW(52),
    height: "100%",
    borderRadius: rspW(26),
    marginRight: rspW(12),
  },
  fLisItemTxtCont: {
    justifyContent: "center",
    height: "100%",
    flex: 1,
  },
  topTxtCont: {
    ...gStyles.rowBetween,
    flex: 1,
  },
  fLisItemTxt: {
    fontFamily: fontFM.medium,
    fontSize: rspF(18),
    lineHeight: rspF(18),
    color: colors.white,
    marginBottom: rspH(8),
  },
  fLisItemTxtTm: {
    fontFamily: fontFM.regular,
    fontSize: rspF(12),
    lineHeight: rspF(12),
    color: colors.greyNew,
  },
  fLisItemStTxt: {
    fontFamily: fontFM.regular,
    fontSize: rspF(12),
    lineHeight: rspF(12),
    color: colors.greySh,
  },
  itemSepS: {
    height: rspH(2),
    marginVertical: rspH(10),
    backgroundColor: colors.greyL,
  },
});
