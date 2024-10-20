import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { MARGIN, SIZE } from '../assests/Utils';
const BoxImage = ({count, onBoxPress, uri, imageCount,onImageRemove}) => {
  // console.log('count', count);

  const backgroundColor = '#43a9d8';

  // console.log(count, imageCount,'const and image count');
  return (
    <TouchableOpacity
      disabled={count > imageCount}
      onPress={onBoxPress}
      style={[
        styles.container,
        {
          backgroundColor:
            count == 'n' ? 'transparent' : 'rgba(155, 155, 155,0.2)',
        },
      ]}>
        {
          uri !== '' && (
            <Text
            onPress={onImageRemove}
          style={[
            styles.text2,
            {backgroundColor: 'red',right:0,top:0},
          ]}>
          X
        </Text>
          )
        }
      { uri === '' ? count !=='n' && (
        <Text
          style={[
            styles.text,
            {backgroundColor: (imageCount) == count ? '#43a9d8' : 'gray'},
          ]}>
          +
        </Text>
      ) : (
        <Image source={{uri: uri}} style={{width: '100%', height: '100%'}} />
      )}
    </TouchableOpacity>
  );
};

export default BoxImage;

const styles = StyleSheet.create({
  container: {
    width: SIZE - MARGIN,
    height: SIZE - MARGIN,
    margin: MARGIN,
    borderRadius: 8,
    backgroundColor: 'rgba(155, 155, 155,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    borderRadius: 100,
    width: 40,
    height: 40,
    padding: 5,
    textAlign: 'center',
    backgroundColor: 'rgba(153, 170, 187,2)',
  },
  text2: {
    fontSize: 16,
    position: 'absolute',
    right:0,
    top:0,
    fontWeight: 'bold',
    color: '#ffffff',
    borderRadius: 100,
    width: 25,
    height: 25,
    zIndex: 1,
    textAlign:'center',
    textAlignVertical:'center',
    justifyContent:'center',
    alignItems:'center'
  },
});


