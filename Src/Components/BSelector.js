import React, { memo, useState } from "react";
import {
  Image,
  LayoutAnimation,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { rspF, rspH, rspW } from "../assests/Responsive";
import colors from "../assests/Colors";
import gStyles from "../assests/Gstyles";
import fontFM from "../assests/FontFM";
import { FlatList, GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";

const BSelector = ({
  Data,
  selectedItem,
  setSelectedItem,
  placeHolder = "Choose",
  extraStyles,
  errMsg = "",
}) => {
  const [openDropdown, setOpenDropdown] = useState(false);
 

  const handleToggleDropDown = () => {
    LayoutAnimation.easeInEaseOut();
    setOpenDropdown(!openDropdown);
  };

  const handleSelectItem = (option) => {
    setSelectedItem(option);
    setOpenDropdown(false);
  };

  return (
    <GestureHandlerRootView>
    <ScrollView horizontal>
      <View
        style={[
          styles.selectorContainer,
          { height: openDropdown ? "auto" : rspH(52) },
          extraStyles,
        ]}
      >
        <Pressable
          onPress={handleToggleDropDown}
          style={[
            styles.inputContainer,
            {
              borderColor: errMsg
                ? colors.red
                : openDropdown
                ? colors.Primary
                : colors.black,
              borderWidth: rspW(1),
            },
          ]}
        >
          <Text
            numberOfLines={1}
            style={[
              styles.textInput,

              {
                color: selectedItem?.label ? colors.black : colors.grey,
              },
            ]}
          >
            {selectedItem ? selectedItem?.label : placeHolder}
          </Text>

          <Image
            style={styles.dropdownIcon}
            source={
              openDropdown
                ? require("../Pic/up.png")
                : require("../Pic/down.png")
            }
          />
        </Pressable>
        {openDropdown && (
          <View style={[styles.flatListContainer]}>
            <FlatList
              data={Data}
              initialNumToRender={4}
              ListEmptyComponent={() => {
                return (
                  <View
                    style={{
                      ...gStyles.colCenter,
                      marginTop: rspH(12),
                      height: rspH(40),
                    }}
                  >
                    <Text style={[styles.text]}>{"No Data Found"}</Text>
                  </View>
                );
              }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => {
                    handleSelectItem(item);
                    LayoutAnimation.easeInEaseOut();
                  }}
                >
                  <Text
                    style={[
                      styles.text,
                      selectedItem &&
                        selectedItem?.code === item?.code.toString() &&
                        styles.selectedText,
                    ]}
                  >
                    {item?.label}
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => item.code.toString()}
            />
          </View>
        )}
      </View>

      {errMsg && (
        <Text
          style={{
            color: colors.red,
            fontFamily: fontFM.regular,
            marginTop: rspH(7),
            width: "100%",
          }}
        >
          {errMsg}
        </Text>
      )}
    </ScrollView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  selectorContainer: {
    alignSelf: "center",
    width: rspW(320),
    borderRadius: rspW(10),
  },
  inputContainer: {
    paddingHorizontal: rspW(14),
    height: rspH(60),
    ...gStyles.rowBetween,
    backgroundColor: colors.white,
    borderRadius: rspW(10),
  },
  textInput: {
    fontSize: rspF(14),
    fontFamily: fontFM.regular,
    lineHeight: rspW(20),
    flex: 1,
  },
  dropdownIcon: {
    width: rspH(24),
    height: rspH(24),
  },
  flatListContainer: {
    borderWidth: rspW(1),
    borderColor: colors.Primary,
    marginTop: rspH(10),
    borderRadius: rspW(10),
    backgroundColor: colors.white,
    maxHeight: rspH(400), // Ensure this height allows for scrolling
    overflow: "scroll",
  },
  dropdownItem: {
    // height: rspH(50),
    // justifyContent: "center",
    // paddingLeft: rspW(19),
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: rspW(8),
  },
  text: {
    paddingVertical: rspH(14),
    paddingHorizontal: rspW(11),
    color: colors.black,
    fontSize: rspF(14),
    lineHeight: rspF(20),
    textAlign: "left",
    borderRadius: rspW(8),
  },
  selectedText: {
    backgroundColor: colors.black,
    color: colors.Primary,
  },
});

export default memo(BSelector);
