import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import fontFm from '../assests/FontFM';
import {rspF, rspFL, rspH, rspW} from '../assests/Responsive';
import colors from '../assests/Colors';
import gStyles from '../assests/Gstyles';
 
const CInputCont = ({title = '', children, width = 328}) => {
  return (
    <View style={{...styles.cont, width: rspW(width)}}>
      <View style={styles.titleCont}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      {children}
    </View>
  );
};
 
export default CInputCont;
 
const styles = StyleSheet.create({
  cont: {
    // height: rspH(63),
    ...gStyles.col_sb,
    // alignItems: 'flex-start',
    marginBottom: rspH(4),
    // backgroundColor:'yellow',
  },
  titleCont: {
    marginBottom: rspH(3),
    alignSelf: "center",
    // paddingHorizontal: 10,
  },
  titleText: {
    fontFamily: fontFm.medium,
    fontSize: rspF(20),
    lineHeight: rspFL(50),
    color: colors.black,
  },
});
 