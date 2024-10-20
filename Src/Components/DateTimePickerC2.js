// import React, { useState, useEffect } from 'react';
// import { View, TouchableOpacity, Text, Platform, StyleSheet, TextInput } from 'react-native';
// import DatePicker from 'react-native-date-picker';
// import moment from 'moment';
// import FastImage from 'react-native-fast-image';
// import { Calender, clockIC } from '../assests/CLS';
// import colors from '../assests/Colors';
// import { rspF, rspH, rspW } from '../assests/Responsive';
// import gStyles from '../assests/Gstyles';
// import fontFM from '../assests/FontFM';

// const DateTimePickerC2 = ({
//   value,
//   setvalue,
//   maximumDate = null,
//   onDateSet = () => {},
//   dtSet = false,
//   DatePickerWidth = '90%',
//   minimumDate = null,
//   dtErr = '',
//   mode = 'date',
// }) => {
//   const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
//   const [dateSet, setdateSet] = useState(false);

//   const dateValue = value instanceof Date ? value : new Date(value);

//   const showDatePicker = () => {
//     setDatePickerVisibility(true);
//   };

//   const hideDatePicker = () => {
//     setDatePickerVisibility(false);
//   };

//   const handleConfirm = (date) => {
//     setvalue(date);
//     setdateSet(true);
//     onDateSet(date);
//     hideDatePicker();
//   };

//   useEffect(() => {
//     setdateSet(dtSet);
//   }, [dtSet]);

//   return (
//     <View style={{ width: DatePickerWidth }}>
//       <TouchableOpacity
//         style={{
//           ...styles.btnCont,
//           borderWidth: rspW(1),
//           borderColor: dtErr ? colors.red : colors.black,
//         }}
//         activeOpacity={0.5}
//         onPress={showDatePicker}
//       >
       
//         <FastImage style={styles.imagestyle} source={mode === 'date' ? Calender : clockIC} />
//         <Text style={{ ...styles.dateTxt, color: dateSet ? colors.black : colors.grey }}>
         
//           {mode === 'date'
//             ? dateSet
//               ? moment(value).format('DD/MM/YY')
//               : 'DOB'
//             : dateSet
//             ? moment(value).format('HH:mm')
//             : 'HH:mm'}
//         </Text>
//       </TouchableOpacity>
//       {
//         dtErr && <Text style={{color:"red"}}>
//           {dtErr}
//         </Text>
//        }
//       <DatePicker
//         modal
//         theme="light"
//         mode={mode}
//         dividerColor={colors.lightgrey}
//         minimumDate={minimumDate}
//         maximumDate={maximumDate}
//         open={isDatePickerVisible}
//         date={dateValue}
//         onConfirm={handleConfirm}
//         onCancel={hideDatePicker}
//       />
//     </View>
//   );
// };

// export default React.memo(DateTimePickerC2);

// const styles = StyleSheet.create({
//   btnCont: {
//     height: rspH(52),
//     borderRadius: rspW(10),
//     paddingHorizontal: rspW(14),
//     backgroundColor: colors.white,
//     ...gStyles.rowCenterStart,
//   },
//   dateTxt: {
//     fontFamily: fontFM.regular,
//     fontSize: rspF(14),
//     lineHeight: rspF(20),
//   },
//   imagestyle: {
//     width: rspH(15),
//     height: rspH(15),
//     marginRight: rspH(16),
//     backgroundColor:"black"
    
//   },
// });

// import React, { useState, useEffect } from 'react';
// import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
// import DatePicker from 'react-native-date-picker';
// import moment from 'moment';
// import FastImage from 'react-native-fast-image';
// import { Calender, clockIC } from '../assests/CLS';
// import colors from '../assests/Colors';
// import { rspF, rspH, rspW } from '../assests/Responsive';
// import gStyles from '../assests/Gstyles';
// import fontFM from '../assests/FontFM';

// const DateTimePickerC2 = ({
//   value,
//   setvalue,
//   maximumDate = null,
//   onDateSet = () => {},
//   dtSet = false,
//   DatePickerWidth = '90%',
//   minimumDate = null,
//   dtErr = '',
//   mode = 'date',
// }) => {
//   const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
//   const [dateSet, setdateSet] = useState(false);

//   const dateValue = value instanceof Date ? value : new Date(value);

//   const showDatePicker = () => {
//     setDatePickerVisibility(true);
//   };

//   const hideDatePicker = () => {
//     setDatePickerVisibility(false);
//   };

//   const handleConfirm = (date) => {
//     setvalue(date);
//     setdateSet(true);
//     onDateSet(date);
//     hideDatePicker();
//   };

//   useEffect(() => {
//     setdateSet(dtSet);
//   }, [dtSet]);

//   return (
//     <View style={{ width: DatePickerWidth }}>
//       <TouchableOpacity
//         style={{
//           ...styles.btnCont,
//           borderWidth: rspW(1),
//           borderColor: dtErr ? colors.red : colors.black,
//         }}
//         activeOpacity={0.5}
//         onPress={showDatePicker}
//       >
//         <FastImage style={styles.imagestyle} source={mode === 'date' ? Calender : clockIC} />
//         <Text style={{ ...styles.dateTxt, color: dateSet ? colors.black : colors.grey }}>
//           {mode === 'date'
//             ? dateSet
//               ? moment(value).format('DD/MM/YY')
//               : 'DOB'
//             : dateSet
//             ? moment(value).format('HH:mm')
//             : 'HH:mm'}
//         </Text>
//       </TouchableOpacity>
//       {dtErr ? (
//         <Text style={{ color: colors.red, marginTop: 8 }}>
//           {dtErr}
//         </Text>
//       ) : null}
//       <DatePicker
//         modal
//         theme="light"
//         mode={mode}
//         dividerColor={colors.lightgrey}
//         minimumDate={minimumDate}
//         maximumDate={maximumDate}
//         open={isDatePickerVisible}
//         date={dateValue}
//         onConfirm={handleConfirm}
//         onCancel={hideDatePicker}
//       />
//     </View>
//   );
// };

// export default React.memo(DateTimePickerC2);

// const styles = StyleSheet.create({
//   btnCont: {
//     height: rspH(52),
//     borderRadius: rspW(10),
//     paddingHorizontal: rspW(14),
//     backgroundColor: colors.white,
//     ...gStyles.rowCenterStart,
//   },
//   dateTxt: {
//     fontFamily: fontFM.regular,
//     fontSize: rspF(14),
//     lineHeight: rspF(20),
//   },
//   imagestyle: {
//     width: rspH(15),
//     height: rspH(15),
//     marginRight: rspH(16),
//     backgroundColor: 'black',
//   },
// });

import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import { Calender, clockIC } from '../assests/CLS';
import colors from '../assests/Colors';
import { rspF, rspH, rspW } from '../assests/Responsive';
import gStyles from '../assests/Gstyles';
import fontFM from '../assests/FontFM';

const DateTimePickerC2 = ({
  value,
  setvalue,
  onDateSet = () => {},
  dtSet = false,
  DatePickerWidth = '90%',
  dtErr = '',
  mode = 'date',
}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dateSet, setdateSet] = useState(false);
  
  // Calculate the maximum date for DOB (today - 18 years)
  const maximumDate = moment().subtract(18, 'years').toDate();
  
  const dateValue = value instanceof Date ? value : new Date(value);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setvalue(date);
    setdateSet(true);
    onDateSet(date);
    hideDatePicker();
  };

  useEffect(() => {
    setdateSet(dtSet);
  }, [dtSet]);

  return (
    <View style={{ width: DatePickerWidth }}>
      <TouchableOpacity
        style={{
          ...styles.btnCont,
          borderWidth: rspW(1),
          borderColor: dtErr ? colors.red : colors.black,
        }}
        activeOpacity={0.5}
        onPress={showDatePicker}
      >
        <FastImage style={styles.imagestyle} source={mode === 'date' ? Calender : clockIC} />
        <Text style={{ ...styles.dateTxt, color: dateSet ? colors.black : colors.grey }}>
          {mode === 'date'
            ? dateSet
              ? moment(value).format('DD/MM/YY')
              : 'DOB'
            : dateSet
            ? moment(value).format('HH:mm')
            : 'HH:mm'}
        </Text>
      </TouchableOpacity>
      {dtErr ? (
        <Text style={{ color: colors.red, marginTop: 8 }}>
          {dtErr}
        </Text>
      ) : null}
      <DatePicker
        modal
        theme="light"
        mode={mode}
        dividerColor={colors.lightgrey}
        maximumDate={maximumDate} // Set maximum date to 18 years ago
        open={isDatePickerVisible}
        date={dateValue}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default React.memo(DateTimePickerC2);

const styles = StyleSheet.create({
  btnCont: {
    height: rspH(52),
    borderRadius: rspW(10),
    paddingHorizontal: rspW(14),
    backgroundColor: colors.white,
    ...gStyles.rowCenterStart,
  },
  dateTxt: {
    fontFamily: fontFM.regular,
    fontSize: rspF(14),
    lineHeight: rspF(20),
  },
  imagestyle: {
    width: rspH(15),
    height: rspH(15),
    marginRight: rspH(16),
    backgroundColor: 'black',
  },
});
