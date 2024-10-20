import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View, ImageBackground, Text } from 'react-native';

const Test = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <ImageBackground
        source={require('../Pic/img3.jpg')}
        style={styles.imageBackground}
      >
        <View style={styles.content}>
          <Text style={styles.text}>Your content goes here</Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 24,
  },
});

export default Test;
