import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
  TextInput,
} from "react-native";
// import countries_with_ph_no from "../../data/countries_with_ph_no";

import colors from "../assests/Colors";
import fontFamily from "../assests/FontFM";
import { rspF, rspH, rspW } from "../assests/Responsive";
// import FormComponentsWrapper from "../wrappers/formComponentsWrappers/FormComponentsWrapper";
// import FormComponentsWrapperHeader from "../wrappers/formComponentsWrappers/FormComponentsWrapperHeader";
// import SearchCountryInput from "./SearchCountryInput";
import truncateStr from "../assests/Truncate";
import { Countries } from "./UpdatedCountries";

const Item = ({ item, onPress, textColor, selectedValue = "" }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item]}>
    {/* Country Name */}
    <Text style={[styles.itm_title, { color: textColor }]} numberOfLines={1}>
      {item.label.length > 20 ? truncateStr(item.label, 20) : item.label}
    </Text>
    {/* Phone Code */}
    <Text
      style={[styles.itm_title, { color: textColor }]}
    >{`+${item.phone}`}</Text>
  </TouchableOpacity>
);

const FormCountrySelector = ({
  width,
  selectedId,
  setSelectedId,
  selectedValue = "",
  blr_value = null,
  setblr_value = null,
}) => {
  const [datalist, setdatalist] = useState([]);
  const [filterdatalist, setfilterdatalist] = useState([]);
  const [search_country, setsearch_country] = useState("");
  const [code_press, setcode_press] = useState(false);
  const [min_phn_no, setmin_phn_no] = useState(null);
  const [max_phn_no, setmax_phn_no] = useState(null);
  const [selected_ph_code, setselected_ph_code] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");

  useLayoutEffect(() => {
    setdatalist(Countries);
  }, []);

  const renderItem = ({ item }) => {
    const color = item.code === selectedId ? colors.black : colors.black;
    // console.log("data==>", selectedId);
    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedId(item.phone);
          setcode_press(!code_press);
          // setsearch_country("");
        }}
        textColor={color}
      />
    );
  };
  // useEffect(() => {
  //   if (selectedId !== "") {
  //     // Find the selected country based on selectedId
  //     const selected_country = Countries.find((v) => v.phone === selectedId);
  //     console.log("Selected country:", selected_country);

  //     // Check if selected_country is defined before using it
  //     if (selected_country) {
  //       let min_ph_no =
  //         typeof selected_country.phoneLength !== "number"
  //           ? selected_country.phoneLength[0]
  //           : selected_country.phoneLength;

  //       let max_ph_no =
  //         typeof selected_country.phoneLength !== "number"
  //           ? selected_country.phoneLength[
  //               selected_country.phoneLength.length - 1
  //             ]
  //           : selected_country.phoneLength;

  //       setmin_phn_no(min_ph_no);
  //       setmax_phn_no(max_ph_no);
  //       setselected_ph_code(selected_country);
  //     }
  //   }
  // }, [selectedId]);

  return (
    <>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          style={[
            styles.searchContainer,
            {
              justifyContent: selectedValue ? "space-between" : "center",
              // flexDirection:"row",
              paddingHorizontal: 10,
              height: rspH(48),
              width: width,
              backgroundColor: selectedId != "" ? "#fff" : "#DCDCDC33",
              position: "relative",
              // change border color if item selected
              borderColor: selectedId == "" ? colors.grey : colors.blue,
            },
          ]}
          onPress={() => {
            setcode_press(!code_press);
            //   setblr_value(true);
          }}
        >
          {/* Code Placehoder if number not selected */}
          {/* <View style={{ top: rspH(0.6), zIndex: 2 }}>
          {selectedValue && <Text style={{ ...styles.inp_title }}>Code</Text>}
          {selectedValue ? (
            <Text style={{ ...styles.inp_title }}>{selectedValue}</Text>
          ) : (
            <Text style={{ ...styles.inp_title }}>Code</Text>
          )}
          </View> */}

          <View
            style={{
              zIndex: 1,
              height: "100%",
              paddingTop: rspH(selectedValue ? 1.4 : 0),
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Show Country Code here */}
            <Text
              style={{
                ...styles.txt,
                color: selectedValue ? colors.blue : colors.black,
              }}
            >
              {selectedValue ? "+" + selectedValue : null}
            </Text>
          </View>
        </TouchableOpacity>

        {/* <TextInput
          placeholder="Enter your Phone Number"
          placeholderTextColor={colors.blue}
          keyboardType="numeric"
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
         
          style={{
            backgroundColor: "white",
            color: colors.blue,
            marginHorizontal: 10,
            width: 200,
            padding: 9,
            borderRadius: 10,
            fontSize: 15,
          }}
        /> */}
      </View>
      {phoneNumber.length < min_phn_no || phoneNumber.length > max_phn_no ? (
        <Text style={{ color: "red" }}>
          Phone number should be between {min_phn_no} and {max_phn_no} digits.
        </Text>
      ) : null}
      {/* Modal to open country list with code */}
      <Modal animationType="slide" transparent={false} visible={code_press}>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar
            statusBarColor="#fff"
            barStyle="light-content"
            containerStyle={{
              paddingTop: rspH(3.7),
            }}
          />

          <Text style={{ color: "black", textAlign: "center", fontSize: 20 }}>
            Counrty Code
          </Text>
          <View style={{ alignSelf: "center" }}>
            <View
              style={{
                // height: rspH(Platform.OS == "ios" ? 59.6 : 64),
                height: rspH(Platform.OS == "ios" ? 59.6 : 800),
                width: rspW(Platform.OS == "ios" ? 59.6 : 300),
              }}
            >
              {/* To render all countries */}
              <FlatList
                data={search_country ? filterdatalist : datalist}
                renderItem={renderItem}
                keyExtractor={(item) => item.code}
                extraData={selectedId}
              />
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    alignItems: "flex-start",
    borderWidth: 1,
    backgroundColor: "#DCDCDC33", // 0.2 opacity added,
    borderRadius: rspW(7.3),
    paddingVertical: rspH(0.89),
  },
  txtCont: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  txt: {
    color: colors.black,
    fontSize: rspF(17),
    textAlign: "center",
    fontFamily: fontFamily.regular,
    lineHeight: rspF(20),
    paddingVertical: 0,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: rspW(5.1),
    justifyContent: "space-between",
    height: rspH(50),
    marginBottom: rspH(1.4),
    backgroundColor: colors.lightBlue,
    borderRadius: rspW(8.3),
    width: rspW(300),
  },
  itm_title: {
    fontSize: rspF(15),
    // fontFamily: fontFamily.medium,
    lineHeight: rspF(20),
    color: colors.black,
  },

  inp_title: {
    color: colors.blue,
    fontSize: 15,
    // fontFamily: fontFamily.regular,
    lineHeight: 15,
  },
});

export default FormCountrySelector;
