import React, { useState, useEffect, memo } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Alert,
} from "react-native";
import colors from "../assests/Colors";
import { rspF, rspH, rspW, scrn_height } from "../assests/Responsive";
import { Countries } from "./UpdatedCountries";
import Searcher from "./Searcher";
import Hobbies from "./Hobbies";

const Item = ({ item, onPress, selected_lis2 }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...styles.item,
        backgroundColor:
          selected_lis2.indexOf(item.label) > -1
            ? `${colors.blue}46` // for opacity
            : colors.white,
      }}
    >
      <Text numberOfLines={1} style={styles.title}>
        {item.label}
      </Text> 
       
      <Text numberOfLines={1} style={styles.subtitle}>
        {item.phone}
      </Text>
    </TouchableOpacity>
  );
};

const FormMultiSelector = ({
  search = true,
  style,
  title,
  width,
  blr_value = null,
  setblr_value = null,
  placeholder,
  // list = Countries, // Default to Countries array
  list=Hobbies,
  selected_list,
  setselected_list,
}) => {
  const [selected_lis2, setselected_lis2] = useState([]);
  console.log("selected_lis2>>>>", selected_lis2);
  const [code_press, setcode_press] = useState(false);
  // const [filterdatalist, setfilterdatalist] = useState(Countries);
  const [filterdatalist, setfilterdatalist] = useState(Hobbies);
  const [names, setnames] = useState("");
  const [search_value,setSearch_value]=useState("")
  useEffect(() => {
    if (selected_list.length > 0) {
      let slist = list      
        .filter((g) => selected_list.includes(g.label))
        .map((v) => v.label);
      console.log("selected list", selected_list);
      console.log("]==>>>>>",slist)
      if (slist.length > 0) {
        let truncatedNames = slist.slice(0, 3).join(", ");
        console.log("names",truncatedNames)
        if (slist.length > 3) {
          truncatedNames += "...";
        }
        setnames(truncatedNames);
      } else {
        setnames("");
      }
    }
    console.log("<><><>",names)
  }, [selected_list, list]);

  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        selected_lis2={selected_lis2}
        onPress={() => {
          let updatedList = [...selected_lis2];
          console.log("update==>>",updatedList)
          const index = updatedList.indexOf(item.code);
          if (index > -1) {
            updatedList.splice(index, 1);
          } else {
            if (selected_lis2.length < 10) {
              updatedList.push(item.label);
            }
          }
          setselected_lis2(updatedList);
        }}
      />
    );
  };

  return (
    <>
      <TouchableOpacity
        style={[
          styles.searchContainer,
          {
            width: width,
            height: 50,
            borderColor:
              blr_value && selected_list.length === 0
                ? colors.error
                : selected_list.length !== 0
                ? colors.blue
                : colors.red,
            backgroundColor:
              selected_list.length !== 0 ? "white" : colors.lightBlue,
          },
          style
        ]}
        onPress={() => {
          setcode_press(true);
          setselected_lis2([]);
          if (setblr_value) {
            setblr_value(true);
          }
        }}
      >
        <View style={styles.inp_title_cont}>
          <Text style={{ color: colors.blue, fontSize: 15 }} numberOfLines={1}>
            {/* {selected_list.length > 0 ? names : placeholder} */}
            {selected_list.length > 0 ? names : placeholder}

          </Text>
        </View>
      </TouchableOpacity>

      <Modal animationType="slide" transparent={false} visible={code_press}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{title}</Text>
            <TouchableOpacity onPress={() => setcode_press(false)}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </View>
          {search ? (
            <Searcher
              search={search_value}
              setsearch={setSearch_value}
              datalist={list}
              setfilterdatalist={setfilterdatalist}
              searchkeys={["label"]}
              extraStyle={{marginTop:5,bottom:5,width:450,right:60,borderWidth:1}}
            />
          ) : (
            <View style={styles.emptysearchContainer} />
          )}
          <View style={{ flex: 1 }}>
            <FlatList
              data={search_value ? filterdatalist : list}
              renderItem={renderItem}
              keyExtractor={(item) => item.code}
            />
          </View>
          <View style={styles.footer}>
            <Text style={styles.selectionInfo}>
              {`Please select up to 10 ${title.toLowerCase()} from the list above`}
            </Text>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor:
                    selected_lis2.length === 0 ? colors.grey : colors.blue,
                },
              ]}
              onPress={() => {
                setcode_press(false);
                setselected_list(selected_lis2);
              }}
              disabled={selected_lis2.length === 0}
            >
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
    borderWidth: 1,
    backgroundColor: "#DCDCDC33",
    paddingHorizontal: rspW(4),
    borderRadius: rspW(10),
    marginTop: 50,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: rspW(10),
    paddingVertical: rspH(10),
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
  },
  title: {
    fontSize: rspF(15),
    lineHeight: rspF(20),
    color: colors.black,
  },
  subtitle: {
    fontSize: rspF(13),
    lineHeight: rspF(20),
    color: colors.black,
  },
  inp_title_cont: {
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: rspW(4),
    borderBottomWidth: 1,
    borderBottomColor: colors.grey,
  },
  headerTitle: {
    fontSize: rspF(20),
    fontWeight: "bold",
    color: "black",
  },
  closeButton: {
    fontSize: rspF(15),
    color: colors.red,
    fontWeight: "700",
  },
  footer: {
    alignItems: "center",
    padding: rspW(4),
  },
  selectionInfo: {
    fontSize: rspF(20),
    color: colors.black,
    marginBottom: rspH(1),
  },
  button: {
    width: "100%",
    height: rspH(48),
    borderRadius: rspW(2.5),
    justifyContent: "center",
    alignItems: "center",
    marginTop: rspH(20),
  },
  buttonText: {
    fontSize: rspF(16),
    color: colors.white,
  },
  emptysearchContainer: {
    height: rspH(40),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: rspW(4),
    borderRadius: rspW(2.5),
    marginBottom: rspH(3.9),
    
  },
});

export default memo(FormMultiSelector);

