// HoldingBtn.js
import React from 'react';
import { View, TextInput, Picker, Button, StyleSheet } from 'react-native';

const HoldingBtn = ({
  setName,
  setMobile,
  setEmail,
  setPassword,
  setDob,
  setGender,
  setSelected_list,
  setIsAdmin,
}) => {
  return (
    <View style={styles.container}>
      {/* Other input fields */}
      <TextInput placeholder="Name" onChangeText={setName} />
      <TextInput placeholder="Mobile" onChangeText={setMobile} />
      <TextInput placeholder="Email" onChangeText={setEmail} />
      <TextInput placeholder="Password" onChangeText={setPassword} secureTextEntry />
      {/* <Picker selectedValue={gender} onValueChange={setGender}>
        <Picker.Item label="Male" value="male" />
        <Picker.Item label="Female" value="female" />
      </Picker> */}
      {/* Add other input fields and their state setters */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

export default HoldingBtn;
