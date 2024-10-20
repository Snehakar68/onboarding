import { StyleSheet, Text, View } from "react-native";
import React ,{useState}from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CInputCont from "../Components/CInputCont";
import FormCountrySelector from "../Components/FormCountrySelector";
import FormMultiSelector from "../Components/FormMultiSelector";
import { Countries } from "../Components/UpdatedCountries";

const FullScrSelector = () => {
    const [dataId, setdataId] = useState("code");
    const [blr_value, setblr_value] = useState(null);
    const [selected_list, setselected_list] = useState([]);
    const [preference, setpreference] = useState([]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          backgroundColor: "purple",
          alignItems: "center",
          justifyContent:"center"
        }}
      >
        <CInputCont
          title="  Country Selector"
          width={350}
          children={
            <View style={{ top: -15 }}>
              <FormCountrySelector
                width={80}
                selectedId={dataId}
                setSelectedId={setdataId}
                selectedValue={dataId}
                blr_value={blr_value}
                setblr_value={setblr_value}
              />
            </View>
          }
        />
        <View style={{ top: 40 }}>
          <CInputCont
            title="full Screen  Multi Selector"
            width={350}
            children={
              <View style={{ bottom: 60 }}>
                <FormMultiSelector
                  selected_list={selected_list}
                  setselected_list={setselected_list}
                  search={true}
                  setSelectedEntry={setpreference}
                  selectedId={dataId}
                  setSelectedId={setdataId}
                  blr_value={blr_value}
                  setblr_value={setblr_value}
                  title="Preference"
                  placeholder={"Select...."}
                  width={300}
                  list={Countries}
                  selectedValue={preference[1]}
                />
              </View>
            }
          />
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default FullScrSelector;

const styles = StyleSheet.create({});
