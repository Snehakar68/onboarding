// AdminProfile.js
import React  ,{useState}from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";

const AdminProfile = ({ route }) => {
  const { adminData } = route.params;
  console.log("admindata",adminData)

  const [imagePosition, setImagePosition] = useState(adminData.imgPosition || {})

  function swapUsingObject(arr,swapObj){
    let newArr=[...arr]

    if(swapObj){
      for(let key in swapObj){
        let index1=parseInt(key)
        let index2=swapObj[key]

        if(index1 >=0 && index1<newArr.length && index2 >=0 && index2 < newArr.length){
          [newArr[index1], newArr[index2]] = [newArr[index2], newArr[index1]];
          console.log(`Array after swapping index ${index1} and ${index2}::`, newArr);

        }else{
          console.log(`Invalid indices: ${index1}, ${index2}`);

        }
      }
    }
    console.log("Final array after swap::", newArr);
    return newArr
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Profile</Text>
      <ScrollView horizontal style={styles.ImageBox}>
      {adminData.profileImages && adminData.profileImages.length > 0 ? (
        swapUsingObject(adminData.profileImages,adminData?.imgSeq).map((uri, index) => (
          <Image key={index} source={{uri}} style={styles.image} />
        ))
      ) : (
        <Text style={{ color: "red" }}>No profile images available</Text>
      )}
      </ScrollView>
      <Text style={styles.label}>Name: {adminData.name}</Text>
      <Text style={styles.label}>Email: {adminData.email}</Text>
      <Text style={styles.label}>Role: {adminData.role}</Text>
      <Text style={styles.label}>gender: {adminData.gender}</Text>
      <Text style={styles.label}>Password: {adminData.password}</Text>
      <Text style={styles.label}>Date of Birth: {adminData.dob}</Text>
      <Text style={styles.label}>Gender: {adminData.gender}</Text>
      <Text style={styles.label}>
        Hobbies: {adminData.preference.join(", ")}
      </Text>
      <Text style={styles.label}>Country: {adminData.selectedData.label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color:"black"
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    color: "#555",
    marginVertical: 4,
  },
  ImageBox: {
    flexDirection: "row",
  },
});

export default AdminProfile;
