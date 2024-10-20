import { StyleSheet, Text, View } from "react-native";
import React,{useState} from "react";
import CInputCont from "../Components/CInputCont";
import DateTimePickerC2 from "../Components/DateTimePickerC2";
import moment from "moment";

const DateTime = () => {
    const [EventStartDate, setEventStartDate] = useState(new Date());
    const [eventStarteDtSet, seteventStarteDtSet] = useState(false);
    const [EventEndDate, setEventEndDate] = useState(new Date());


    const today = new Date();
    const maxdate = new Date(new Date().setFullYear(today.getFullYear() - 18));
    const currentTime = new Date();

    const miniTime = new Date(currentTime.getTime() - 2 * 60 * 60 * 1000);
    const maxTime = new Date(currentTime.getTime() + 2 * 60 * 60 * 1000);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "purple",
        alignItems: "center",
        justifyContent:"center"
      }}
    >
      <CInputCont
        title="Date Picker"
        width={300}
        children={
          <View style={{ top: -20 }}>
            <DateTimePickerC2
              setvalue={(val) => {
                let upval = new Date(
                  new Date(val).setMinutes(new Date(val).getMinutes() + 5)
                );
                if (Platform.OS === "ios") {
                  setEventStartDate(val);
                } else {
                  setEventStartDate(upval);
                }

                if (Platform.OS === "ios") {
                  if (Date.parse(val) >= Date.parse(EventEndDate)) {
                    setEventEndDate(
                      new Date(
                        new Date(val).setMinutes(new Date(val).getMinutes() + 5)
                      )
                    );
                  }
                } else {
                  if (
                    moment(upval)
                      .add(1, "minutes")
                      .isAfter(moment(EventEndDate))
                  ) {
                    setEventEndDate(
                      new Date(
                        new Date(upval).setMinutes(
                          new Date(upval).getMinutes() + 5
                        )
                      )
                    );
                  }
                }
              }}
              value={EventStartDate}
              onDateSet={() => {
                seteventStarteDtSet(true);
              }}
              dtSet={eventStarteDtSet}
              maximumDate={maxdate}
              DatePickerWidth="49.3%"
            />
          </View>
        }
      />

      <CInputCont
        title="Time Picker"
        width={350}
        children={
          <View style={{ top: -20 }}>
            <DateTimePickerC2
              mode="time"
              setvalue={(val) => {
                setEventStartDate(val);
                if (
                  moment(val).add(5, "minutes").isAfter(moment(EventEndDate))
                ) {
                  setEventEndDate(
                    new Date(
                      new Date(val).setMinutes(new Date(val).getMinutes() + 5)
                    )
                  );
                }
              }}
              minimumDate={miniTime}
              value={EventStartDate}
              maximumDate={maxTime}
              onDateSet={() => {}}
              dtSet={eventStarteDtSet}
              DatePickerWidth="49.3%"
            />
          </View>
        }
      />
    </View>
  );
};

export default DateTime;

const styles = StyleSheet.create({});
