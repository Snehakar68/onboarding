import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { MARGIN, SIZE } from '../assests/Utils';




const Box = ({count}) => {
  // console.log("count",count)
  
  const backgroundColor = '#43a9d8'

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <Text style={styles.text}>{count+1}</Text>
    </View>
  );
};

export default Box;

const styles = StyleSheet.create({
  container: {
    width: SIZE- MARGIN,
    height: SIZE - MARGIN,
    margin: MARGIN,
    borderRadius: 8,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    top:30
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#cde9e4',
  },
});
