
import React, { memo, useState } from "react";
import {
  Image,
  LayoutAnimation,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { rspF, rspH, rspW } from "../assests/Responsive";
import colors from "../assests/Colors";
import gStyles from "../assests/Gstyles";
import fontFM from "../assests/FontFM";
import { FlashList } from "@shopify/flash-list";

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
    <>
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
                color: selectedItem?.label ? colors.WhiteD : colors.greyNew,
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
          <View style={[styles.flatListContainer, { height: rspH(200) }]}>
            <FlashList
              data={Data}
              estimatedItemSize={80}
              renderItem={({ item, index }) => (
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
                        selectedItem.index === index &&
                        styles.selectedText,
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) =>item.code.toString()}
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
    </>
  );
};

const styles = StyleSheet.create({
  selectorContainer: {
    alignSelf: "center",
    width: rspW(330),
    borderRadius: rspW(10),
  },
  inputContainer: {
    paddingHorizontal: rspW(14),
    height: rspH(50),
    ...gStyles.rowBetween,
    backgroundColor: colors.grey,
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
    backgroundColor: colors.greyL,
    maxHeight: rspH(400), // Ensure this height allows for scrolling
    overflow: "hidden",
  },
  dropdownItem: {
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: rspW(8),
  },
  text: {
    paddingVertical: rspH(14),
    paddingHorizontal: rspW(11),
    color: colors.white,
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

