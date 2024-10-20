import React, { useState } from "react";
import { Alert, Text, View, ScrollView, TouchableOpacity } from "react-native";
import colors from "../assests/Colors";
import CInputCont from "../Components/CInputCont";
import BtnComp from "../Components/BtnComp";
import CInput from "../Components/Clnput";
import ErrorInfoTxt from "../Components/ErrorInfoTxt";
import ASelector from "../Components/ASelector";
import { DataList } from "./Src/Components/DataList";
import { Countries } from "../Components/UpdatedCountries";
import BSelector from "../Components/BSelector";
import CSelector from "../Components/CSelector";
import {
  GestureHandlerRootView,
  ScrollView as GestureHandlerScrollView,
} from "react-native-gesture-handler";
import SearchSelector2 from "../Components/SearchSelector2";
import Searcher from "../Components/Searcher";
import FormCountrySelector from "../Components/FormCountrySelector";
import FormMultiSelector from "../Components/FormMultiSelector";
import DateTimePickerC2 from "../Components/DateTimePickerC2";
import moment from "moment";

const Main = () => {
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const [selectedData, setSelectedData] = useState(null);
  const [AselectedData, setASelectedData] = useState(null);
  const [SearchItem, setSearchItem] = useState("");
  const [FilterData, setFilterData] = useState(Countries);
  const [dataId, setdataId] = useState("code");
  const [blr_value, setblr_value] = useState(null);
  const [preference_list, setPreference_list] = useState("");
  const [selected_list, setselected_list] = useState([]);
  const [preference, setpreference] = useState([]);
  const [EventStartDate, setEventStartDate] = useState(new Date());
  console.log("start", EventStartDate);
  const [EventEndDate, setEventEndDate] = useState(new Date());
  console.log("end", EventEndDate);

  const [eventStarteDtSet, seteventStarteDtSet] = useState(false);
  // const minDate = new Date(null, 5, 26);
  // console.log("min", minDate);

  // const maxDate = new Date(new Date().setDate(new Date().getDate() + 7));
  // const maxDate = new Date(2006,11,31)
  // console.log("max", maxDate);

  const today = new Date();
  // const maxDate = new Date(
  //   today.getFullYear() - 18,
  //   new Date().getMonth(),
  //   new Date().getDate()
  // );
  // console.log("maxDate", maxDate);

  // const maxDate2 = new Date();
  // maxDate2.setFullYear(today.getFullYear() - 18);
  // console.log("maxDate2", maxDate2);

  // const maxDate1 = new Date().setFullYear(today.getFullYear() - 18);
  const maxdate = new Date(new Date().setFullYear(today.getFullYear() - 18));

  // console.log("maxDate1", new Date(maxDate1));

  // const maxDate = new Date(2024, 6, 10);
  const currentTime = new Date();
  const miniTime = new Date(currentTime.getTime() - 2 * 60 * 60 * 1000);
  // console.log("miniTime",miniTime)
  const maxTime = new Date(currentTime.getTime() + 2 * 60 * 60 * 1000);
  // console.log("maxTime",maxTime)

  const validation = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumberCase = /[0-9]/.test(password);
    const hasSpecialChar = /[@#%&*]/.test(password);

    if (password.length < minLength) {
      return `Password must be at least ${minLength} characters long.`;
    }
    if (!hasUpperCase) {
      return `Password must contain at least one uppercase letter.`;
    }
    if (!hasLowerCase) {
      return `Password must contain at least one lowercase letter.`;
    }
    if (!hasNumberCase) {
      return `Password must contain at least one number.`;
    }
    if (!hasSpecialChar) {
      return `Password must contain at least one special character.`;
    }
    return "";
  };

  const login_err = (txt) => {
    const validText = validation(txt);
    setErrorText(validText);
  };

  const hasErr = () => {
    return !selectedData; // Returns true if selectedData is falsy, otherwise false
  };

  const handleSearchitem = (filter) => {
    setFilterData(filter);
    // setVisible(true)
  };
  const SelectionError = () => {
    return !AselectedData;
  };
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          backgroundColor: "purple",
          alignItems: "center",
          
        }}
      >
        <GestureHandlerScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingVertical: 20,
            alignItems: "center",
            justifyContent:"center"
          }}
        >
          <CInputCont
            title=" Selector"
            width={350}
            children={
              <GestureHandlerScrollView style={{ top: -40 }}>
                <BSelector
                  Data={Countries}
                  selectedItem={AselectedData}
                  setSelectedItem={setASelectedData}
                  placeHolder={"choose"}
                  errMsg={SelectionError()}
                  extraStyles={{ marginTop: 20 }}
                />
                {SelectionError() && (
                  <Text style={{ color: "red", fontSize: 15 }}>
                    Please select an item
                  </Text>
                )}
              </GestureHandlerScrollView>
            }
          />

          <CInputCont
            title="Search Selector"
            width={350}
            children={
              <GestureHandlerScrollView style={{ top: -20 }}>
                <SearchSelector2
                  Data={FilterData}
                  search={SearchItem}
                  setsearch={setSearchItem}
                  selectedItem={selectedData}
                  setSelectedItem={setSelectedData}
                  onSearchTxt={handleSearchitem}
                  searchkeys={["label"]}
                  hasErr={hasErr()}
                />
                {hasErr() && (
                  <Text style={{ color: "red" }}>Please select any item</Text>
                )}
              </GestureHandlerScrollView>
            }
          />
        </GestureHandlerScrollView>
      </View>
    </GestureHandlerRootView>
  );
};

export default Main;
