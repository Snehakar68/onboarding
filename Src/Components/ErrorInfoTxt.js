import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { rspF, rspFL, rspH } from '../assests/Responsive'
import colors from '../assests/Colors'
import fontFm from '../assests/FontFM'
 
const ErrorInfoTxt = ({title="", isErr=true}) => {
  return (
    <View style={styles.errCont}>
      <Text style={{...styles.errTxt,color: isErr ? colors.red : colors.black, }}>{title}</Text>
    </View>
  )
}
 
export default ErrorInfoTxt
 
const styles = StyleSheet.create({
  errCont: {
    marginVertical: rspH(5),
  },
    errTxt: {
        fontSize: rspF(16),
        fontFamily: fontFm.regular,
        lineHeight: rspFL(14),
        textAlign:'center',
        
        
      },
})  