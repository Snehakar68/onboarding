import React, { useState } from "react";
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
import IconSeach from "react-native-vector-icons/Feather";
import { rspF, rspH, rspW } from "../assests/Responsive";
import colors from "../assests/Colors";
import gStyles from "../assests/Gstyles";
import fontFM from "../assests/FontFM";
import FastImage from "react-native-fast-image";
import {
  FlatList,
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { CloseIc } from "../assests/CLS";

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

const SearchSelector2 = ({
  Data = [],
  search,
  setsearch,
  selectedItem,
  setSelectedItem,
  onSearchTxt = () => {},
  hasErr ,
  searchkeys = [],
  setvisible = () => {},
  extraStyle
}) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [placeholder, setplaceholder] = useState("Search Here ...");
  const [filteredData, setFilteredData] = useState(Data);

  const handleToggleDropDown = () => {
    LayoutAnimation.easeInEaseOut();
    setOpenDropdown(!openDropdown);
  };

  const handleSelectItem = (option) => {
    setSelectedItem(option);
    setOpenDropdown(false);
  };

  const handleSearch = (txt) => {
    setsearch(txt);
    if (txt.trim() === "") {
      setFilteredData(Data);
    } else {
      setFilteredData(filterData(Data, txt, searchkeys));
    }
    setOpenDropdown(true); 
  };

  return (
    <GestureHandlerRootView>
      <ScrollView horizontal>
        <View
          style={[
            styles.selectorContainer,
            { height: openDropdown ? "auto" : rspH(82) },
            extraStyle,
          ]}
        >
          <Pressable
            onPress={handleToggleDropDown}
            style={[
              styles.inputContainer,
              {
                borderColor: openDropdown
                  ? colors.green
                  : hasErr
                  ? colors.red
                  : colors.black,
                borderWidth: rspW(1),
              },
            ]}
          >
            <Text
              style={[
                styles.textInput,
                {
                  color: selectedItem ? colors.black : colors.grey,
                },
              ]}
              numberOfLines={2}
            >
              {selectedItem ? selectedItem.label : "Choose Country"}
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
            <View style={[styles.flatListContainer, { maxHeight: rspH(400) }]}>
              <View style={styles.searchContainer}>
                <View style={styles.searchIconCont}>
                  <IconSeach
                    name={"search"}
                    color={"#ADADAD"}
                    size={rspH(15)}
                  />
                </View>
                <TextInput
                  style={[styles.searchInput, { color: "black" }]}
                  placeholder={placeholder}
                  placeholderTextColor={colors.black}
                  value={search}
                  onChangeText={handleSearch}
                  onFocus={() => setplaceholder("")}
                  onBlur={() => setplaceholder("Search Here ...")}
                />
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => {
                    handleSearch("");
                  }}
                  style={styles.closeIcSCont}
                >
                  <FastImage source={CloseIc} style={styles.closeIc} />
                </TouchableOpacity>
              </View>
              {filteredData?.length > 0 && <View style={styles.septS} />}
              <FlatList
                data={filteredData}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => handleSelectItem(item)}
                  >
                    <Text
                      style={[
                        styles.text,
                        selectedItem &&
                          selectedItem.code === item.code &&
                          styles.selectedText,
                      ]}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item?.code?.toString()}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  septS: {
    width: rspH(314),
    alignSelf: "center",
    height: rspH(1),
    backgroundColor: colors.grey,
    marginBottom: rspH(4),
  },
  searchIconCont: {
    alignItems: "center",
    justifyContent: "center",
    width: "10%",
  },
  LocIconCont: {
    alignItems: "center",
    justifyContent: "center",
    width: "10%",
  },
  selectorContainer: {
    width: rspW(320),
    borderRadius: rspW(10),
    alignSelf: "center",
    top:20
  },
  inputContainer: {
    paddingHorizontal: rspW(14),
    height: rspH(50),
    ...gStyles.rowBetween,
    backgroundColor: colors.white,
    borderRadius: rspW(10),
    // bottom:90
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
  img: {
    width: rspH(15),
    height: rspH(15),
  },
  searchContainer: {
    marginTop: rspH(4),
    alignSelf: "center",
    width: "100%",
    height: rspH(40),
    flexDirection: "row",
    borderRadius: rspW(10),
    paddingHorizontal: rspW(14),
    justifyContent: "space-between",
  },
  flatListContainer: {
    borderWidth: rspW(1),
    borderColor: colors.Primary,
    marginTop: rspH(10),
    backgroundColor: colors.greyL,
    borderRadius: rspW(10),
  },
  searchInput: {
    color: colors.white,
    width: "80%",
  },
  searchInputN: {
    alignSelf: "center",
    width: rspW(300),
    borderBottomWidth: rspW(1),
    borderBottomColor: colors.greyNew,
    marginVertical: rspH(4),
  },
  dropdownItem: {
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: rspW(8),
  },
  text: {
    paddingVertical: rspH(14),
    paddingHorizontal: rspW(11),
    color: "black",
    fontSize: rspF(14),
    lineHeight: rspF(20),
    textAlign: "left",
    borderRadius: rspW(8),
  },
  selectedText: {
    backgroundColor: colors.white,
    color: colors.blue,
  },
  closeIc: {
    height: rspH(10),
    width: rspH(10),
  },
  closeIcSCont: {
    height: rspH(24),
    width: rspH(24),
    ...gStyles.colCenter,
  },
});

export default SearchSelector2;

// import React, { useState } from "react";
// import {
//   Image,
//   LayoutAnimation,
//   Pressable,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import IconSeach from "react-native-vector-icons/Feather";
// import { rspF, rspH, rspW } from "../assests/Responsive";
// import colors from "../assests/Colors";
// import gStyles from "../assests/Gstyles";
// import fontFM from "../assests/FontFM";
// import FastImage from "react-native-fast-image";
// import {
//   FlatList,
//   GestureHandlerRootView,
//   ScrollView,
// } from "react-native-gesture-handler";
// import { CloseIc } from "../assests/CLS";

// const filterData = (dataList, text, properties) => {
//   return dataList.filter((v) =>
//     properties.some((prop) => {
//       let aprop = v[prop];
//       if (String(prop).startsWith("add")) {
//         let prp_arr = prop.split("_");
//         aprop = prp_arr[1] + v[prp_arr[2]];
//       } else if (String(prop).startsWith("rep@")) {
//         let prp_arr = prop.split("_");
//         aprop = v[prp_arr[2]].replace(prp_arr[1], "");
//       }

//       const stringValue = String(aprop).toLowerCase();
//       const searchText = String(text.trim()).toLowerCase();
//       return stringValue.startsWith(searchText);
//     })
//   );
// };

// const SearchSelector2 = ({
//   Data = [],
//   search,
//   setsearch,
//   selectedItem,
//   setSelectedItem,
//   onSearchTxt = () => {},
//   hasErr,
//   searchkeys = [],
//   setvisible = () => {},
//   extraStyle
// }) => {
//   const [openDropdown, setOpenDropdown] = useState(false);
//   const [placeholder, setplaceholder] = useState("Search Here ...");
//   const [filteredData, setFilteredData] = useState(Data);

//   const handleToggleDropDown = () => {
//     LayoutAnimation.easeInEaseOut();
//     setOpenDropdown(!openDropdown);
//   };

//   const handleSelectItem = (option) => {
//     setSelectedItem(option);
//     setOpenDropdown(false);
//   };

//   const handleSearch = (txt) => {
//     setsearch(txt);
//     if (txt.trim() === "") {
//       setFilteredData(Data);
//     } else {
//       setFilteredData(filterData(Data, txt, searchkeys));
//     }
//     setOpenDropdown(true);
//   };

//   return (
//     <GestureHandlerRootView>
//       <View
//         style={[
//           styles.selectorContainer,
//           { height: openDropdown ? "auto" : rspH(52) },
//           extraStyle,
//         ]}
//       >
//         <Pressable
//           onPress={handleToggleDropDown}
//           style={[
//             styles.inputContainer,
//             {
//               borderColor: openDropdown
//                 ? colors.green
//                 : hasErr
//                 ? colors.red
//                 : colors.black,
//               borderWidth: rspW(1),
//             },
//           ]}
//         >
//           <Text
//             style={[
//               styles.textInput,
//               {
//                 color: selectedItem ? colors.black : colors.grey,
//               },
//             ]}
//             numberOfLines={2}
//           >
//             {selectedItem ? selectedItem.label : "Choose"}
//           </Text>

//           <Image
//             style={styles.dropdownIcon}
//             source={
//               openDropdown
//                 ? require("../Pic/up.png")
//                 : require("../Pic/down.png")
//             }
//           />
//         </Pressable>
//         {openDropdown && (
//           <View style={[styles.flatListContainer, { maxHeight: rspH(400) }]}>
//             <View style={styles.searchContainer}>
//               <View style={styles.searchIconCont}>
//                 <IconSeach
//                   name={"search"}
//                   color={"#ADADAD"}
//                   size={rspH(15)}
//                 />
//               </View>
//               <TextInput
//                 style={[styles.searchInput, { color: "black" }]}
//                 placeholder={placeholder}
//                 placeholderTextColor={colors.black}
//                 value={search}
//                 onChangeText={handleSearch}
//                 onFocus={() => setplaceholder("")}
//                 onBlur={() => setplaceholder("Search Here ...")}
//               />
//               <TouchableOpacity
//                 activeOpacity={0.5}
//                 onPress={() => {
//                   handleSearch("");
//                 }}
//                 style={styles.closeIcSCont}
//               >
//                 <FastImage source={CloseIc} style={styles.closeIc} />
//               </TouchableOpacity>
//             </View>
//             {filteredData?.length > 0 && <View style={styles.septS} />}
//             <FlatList
//               data={filteredData}
//               renderItem={({ item }) => (
//                 <TouchableOpacity
//                   style={styles.dropdownItem}
//                   onPress={() => handleSelectItem(item)}
//                 >
//                   <Text
//                     style={[
//                       styles.text,
//                       selectedItem &&
//                         selectedItem.code === item.code &&
//                         styles.selectedText,
//                     ]}
//                   >
//                     {item.label}
//                   </Text>
//                 </TouchableOpacity>
//               )}
//               keyExtractor={(item) => item?.code?.toString()}
//             />
//           </View>
//         )}
//       </View>
//     </GestureHandlerRootView>
//   );
// };

// const styles = StyleSheet.create({
//   septS: {
//     width: rspH(314),
//     alignSelf: "center",
//     height: rspH(1),
//     backgroundColor: colors.grey,
//     marginBottom: rspH(4),
//   },
//   searchIconCont: {
//     alignItems: "center",
//     justifyContent: "center",
//     width: rspH(24), // Adjusted width
//   },
//   selectorContainer: {
//     width: "100%",
//     borderRadius: rspW(10),
//     alignSelf: "center",
//   },
//   inputContainer: {
//     paddingHorizontal: rspW(14),
//     height: rspH(50),
//     ...gStyles.rowBetween,
//     backgroundColor: colors.white,
//     borderRadius: rspW(10),
//   },
//   textInput: {
//     fontSize: rspF(14),
//     fontFamily: fontFM.regular,
//     lineHeight: rspW(20),
//     flex: 1,
//   },
//   dropdownIcon: {
//     width: rspH(24),
//     height: rspH(24),
//   },
//   img: {
//     width: rspH(15),
//     height: rspH(15),
//   },
//   searchContainer: {
//     marginTop: rspH(4),
//     alignSelf: "center",
//     width: "100%",
//     height: rspH(40),
//     flexDirection: "row",
//     borderRadius: rspW(10),
//     paddingHorizontal: rspW(14),
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   flatListContainer: {
//     borderWidth: rspW(1),
//     borderColor: colors.Primary,
//     marginTop: rspH(10),
//     backgroundColor: colors.greyL,
//     borderRadius: rspW(10),
//   },
//   searchInput: {
//     flex: 1, // Adjusted width
//     color: colors.white,
//   },
//   searchInputN: {
//     alignSelf: "center",
//     width: rspW(300),
//     borderBottomWidth: rspW(1),
//     borderBottomColor: colors.greyNew,
//     marginVertical: rspH(4),
//   },
//   dropdownItem: {
//     justifyContent: "center",
//     width: "100%",
//     paddingHorizontal: rspW(8),
//   },
//   text: {
//     paddingVertical: rspH(14),
//     paddingHorizontal: rspW(11),
//     color: "black",
//     fontSize: rspF(14),
//     lineHeight: rspF(20),
//     textAlign: "left",
//     borderRadius: rspW(8),
//   },
//   selectedText: {
//     backgroundColor: colors.white,
//     color: colors.blue,
//   },
//   closeIc: {
//     height: rspH(10),
//     width: rspH(10),
//   },
//   closeIcSCont: {
//     height: rspH(24),
//     width: rspH(24),
//     ...gStyles.colCenter,
//   },
// });

// export default SearchSelector2;
