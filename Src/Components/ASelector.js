import React, { memo, useEffect, useRef, useState } from "react";
import {
  Image,
  LayoutAnimation,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  ScrollView,
} from "react-native";
import { rspF, rspH, rspW } from "../assests/Responsive";
import colors from "../assests/Colors";
import gStyles from "../assests/Gstyles";
import fontFM from "../assests/FontFM";

const ASelector2 = ({
  Data,
  selectedItem,
  setSelectedItem,
  placeHolder = "Choose",
  extraStyles,
  errMsg = "",
}) => {
  const [openDropdown, setOpenDropdown] = useState(false);

  const scrollViewRef = useRef(null);
  const handleToggleDropDown = () => {
    LayoutAnimation.easeInEaseOut();
    setOpenDropdown(!openDropdown);
  };

  const handleSelectItem = (option) => {
    setSelectedItem(option);
    setOpenDropdown(false);
  };
  const handleScrollEndDrag = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    // console.log("=========>>>>>>first", offsetY);
    const contentSizeHeight = event.nativeEvent.contentSize.height;
    // console.log("second", contentSizeHeight);
    const scrollViewHeight = event.nativeEvent.layoutMeasurement.height;
    // console.log("third", scrollViewHeight);
    // Calculate the distance from the bottom of the content
    const distanceFromEnd = contentSizeHeight - offsetY - scrollViewHeight;
    // console.log("result", distanceFromEnd);
    // Define a threshold (e.g., 20) to determine if it's close enough to the end
    const threshold = 20;

    if (distanceFromEnd <= threshold) {
      // Check if it's close enough to the end to load more data
      const totalPages = Math.ceil(Data.length / itemsPerPage);
      if (currentPage < totalPages) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    }
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [newListItem, setNewListItem] = useState([]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const newItems = Data.slice(startIndex, endIndex);
    console.log("loaddata", newItems.length);
    setNewListItem((prevItems) => [...prevItems, ...newItems]);
  }, [currentPage, Data]);

  return (
    <>
      <ScrollView>
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
                  color: selectedItem?.label ? colors.white : colors.black,
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
              {/* <FlatList
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
                          selectedItem?.id === item?.id &&
                          styles.selectedText,
                      ]}
                    >
                      {item?.label}
                    </Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index}
              /> */}

              <ScrollView
                ref={scrollViewRef}
                onScrollEndDrag={handleScrollEndDrag}
                onScroll={handleScrollEndDrag}
                scrollEventThrottle={5}
                // onScroll={(event)=>{
                //   console.log('Scroll position:', event.nativeEvent.contentOffset.y);
                // }}
                // onScrollBeginDrag={()=>{
                //   console.log("onScrollBeginDrag")
                // }}
              >
                {newListItem?.length > 0
                  ? newListItem.map((item, index) => {
                      return (
                        <TouchableOpacity
                          // activeOpacity={0.5}
                          key={index}
                          style={styles.dropdownItem}
                          onPress={() => handleSelectItem(item)}
                        >
                          <Text
                            // numberOfLines={2}
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
                      );
                    })
                  : null}
              </ScrollView>
            </View>
          )}
        </View>
      </ScrollView>

      {errMsg && (
        <Text
          style={{
            color: colors.black,
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
const itemsPerPage = 10;
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

export default memo(ASelector2);
