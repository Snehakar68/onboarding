// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   Modal,
//   TextInput,
//   Alert,
//   ScrollView,
// } from "react-native";
// import { useDispatch, useSelector } from "react-redux";
// import FormMultiSelector from "../Components/FormMultiSelector";
// import Hobbies from "../Components/Hobbies";
// import { updateUser, deleteUser } from "../Redux/StateSlice";
// import { useNavigation } from "@react-navigation/native";

// const UserDetails = ({ route }) => {
//   const { user: initialUser, isAdmin } = route.params || {};
//   const dispatch = useDispatch();
//   const navigation = useNavigation();

//   // Local state for user details
//   const [user, setUser] = useState(initialUser);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [editableUser, setEditableUser] = useState(initialUser);


//   // Open edit modal and set editableUser state
//   const handleEdit = () => {
//     setEditableUser(user);
//     setIsModalVisible(true);
//   };

//   const handleSave = () => {
//     dispatch(
//       updateUser({ email: editableUser.email, updatedUser: editableUser })
//     );
//     setIsModalVisible(false);
//     setUser(editableUser); // Update local user state after saving
//     console.log("Updated User:==>> ", editableUser);
//   };

//   useEffect(() => {
//     setUser(editableUser); // This will update the UI after changes
//   }, [editableUser]);

  
//   const handleDelete = () => {
//     console.log("Deleting user with email:", user.email);
//     Alert.alert("Delete User", "Are you sure you want to delete this user?", [
//       { text: "Cancel", style: "cancel" },
//       {
//         text: "Delete",
//         onPress: () => {
//           dispatch(deleteUser(user.email));
//           navigation.goBack(); // Navigate back to the home screen after deletion
//         },
//       },
//     ]);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>User Details</Text>
//       <ScrollView horizontal style={styles.ImageBox}>
//         {user.profileImages && user.profileImages.length > 0 ? (
//           user.profileImages.map((uri, index) => (
//             <Image key={index} source={{ uri }} style={styles.image} />
//           ))
//         ) : (
//           <Text style={{ color: "red" }}>No profile images available</Text>
//         )}
//       </ScrollView>
//       <Text style={styles.label}>Name: {user.name}</Text>
//       <Text style={styles.label}>Mobile: {user.mobile}</Text>
//       <Text style={styles.label}>Email: {user.email}</Text>
//       <Text style={styles.label}>Password: {user.password}</Text>
//       <Text style={styles.label}>Date of Birth: {user.dob}</Text>
//       <Text style={styles.label}>Gender: {user.gender}</Text>
//       <Text style={styles.label}>Role: {user.role}</Text>
//       <Text style={styles.label}>Hobbies: {user.preference.join(", ")}</Text>
//       <Text style={styles.label}>Country: {user.selectedData.label}</Text>
//       {isAdmin && (
//         <View>
//           <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
//             <Text style={styles.buttonText}>Edit</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
//             <Text style={styles.buttonText}>Delete</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//       <Modal
//         visible={isModalVisible}
//         animationType="slide"
//         transparent={true}
//         onRequestClose={() => setIsModalVisible(false)}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Edit Profile</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Name"
//               placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
//               value={editableUser.name}
//               onChangeText={(text) =>
//                 setEditableUser({ ...editableUser, name: text })
//               }
//             />
//             <TextInput
//               style={styles.input}
//               placeholder="Mobile"
//               placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
//               value={editableUser.mobile}
//               onChangeText={(text) =>
//                 setEditableUser({ ...editableUser, mobile: text })
//               }
//             />
//             <TextInput
//               style={styles.input}
//               placeholder="Email"
//               placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
//               value={editableUser.email}
//               onChangeText={(text) =>
//                 setEditableUser({ ...editableUser, email: text })
//               }
//             />
//             <TextInput
//               style={styles.input}
//               placeholder="Password"
//               placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
//               value={editableUser.password}
//               onChangeText={(text) =>
//                 setEditableUser({ ...editableUser, password: text })
//               }
//             />
//             <TextInput
//               style={styles.input}
//               placeholder="Date of Birth"
//               placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
//               value={editableUser.dob}
//               onChangeText={(text) =>
//                 setEditableUser({ ...editableUser, dob: text })
//               }
//             />
//             <TextInput
//               style={styles.input}
//               placeholder="Gender"
//               placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
//               value={editableUser.gender}
//               onChangeText={(text) =>
//                 setEditableUser({ ...editableUser, gender: text })
//               }
//             />
//             {/* <FormMultiSelector
//               style={{ marginTop: 10 }}
//               selected_list={editableUser.preference}
//               setselected_list={(list) => {
//                 setEditableUser({ ...editableUser, preference: list });
//               }}
//               search={true}
//               setSelectedEntry={(list) => {
//                 setEditableUser({ ...editableUser, preference: list });
//               }}
//               title="Preference"
//               placeholder="Select...."
//               width="100%"
//               list={Hobbies}
//             /> */}
//             <FormMultiSelector
//               style={{ marginTop: 10 }}
//               selected_list={editableUser.preference.map(
//                 (hobby) => Hobbies.find((h) => h.label === hobby)?.label
//               )}
//               setselected_list={(list) => {
//                 setEditableUser({ ...editableUser, preference: list });
//               }}
//               search={true}
//               setSelectedEntry={(list) => {
//                 setEditableUser({ ...editableUser, preference: list });
//               }}
//               title="Preference"
//               placeholder="Select...."
//               width="100%"
//               list={Hobbies}
//             />
//             <View style={styles.modalButtonContainer}>
//               <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
//                 <Text style={styles.buttonText}>Save</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={styles.cancelButton}
//                 onPress={() => setIsModalVisible(false)}
//               >
//                 <Text style={styles.buttonText}>Cancel</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// export default UserDetails;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginBottom: 20,
//     padding: 20,
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 10,
//     backgroundColor: "#fff",
//     width: "90%",
//     alignSelf: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//     textAlign: "center",
//     color: "blue",
//   },
//   ImageBox: {
//     flexDirection: "row",
//   },
//   image: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     // alignSelf: "center",
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 18,
//     color: "#555",
//     marginVertical: 4,
//     fontWeight: "600",
//   },
//   editButton: {
//     backgroundColor: "#4CAF50",
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//   },
//   deleteButton: {
//     backgroundColor: "#f44336",
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//   },
//   modalContent: {
//     width: "80%",
//     backgroundColor: "white",
//     padding: 20,
//     borderRadius: 10,
//   },
//   modalTitle: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ddd",
//     padding: 10,
//     marginBottom: 10,
//     borderRadius: 5,
//     width: "100%",
//     color: "black",
//   },
//   modalButtonContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 10,
//   },
//   saveButton: {
//     backgroundColor: "#4CAF50",
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//   },
//   cancelButton: {
//     backgroundColor: "#f44336",
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//   },
// });

// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   Modal,
//   TextInput,
//   Alert,
//   ScrollView,
// } from "react-native";
// import { useDispatch } from "react-redux";
// import FormMultiSelector from "../Components/FormMultiSelector";
// import Hobbies from "../Components/Hobbies";
// import { updateUser, deleteUser } from "../Redux/StateSlice";
// import { useNavigation } from "@react-navigation/native";

// const UserDetails = ({ route }) => {
//   const { user: initialUser, isAdmin } = route.params || {};
//   const dispatch = useDispatch();
//   const navigation = useNavigation();

//   // Local state for user details
//   const [user, setUser] = useState(initialUser);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [editableUser, setEditableUser] = useState(initialUser);
  
//   // Initialize imagePosition based on initialUser
//   const [imagePosition, setImagePosition] = useState(initialUser.imgPosition || {});

//   useEffect(() => {
//     setUser(editableUser);
//   }, [editableUser]);

//   // Open edit modal and set editableUser state
//   const handleEdit = () => {
//     setEditableUser(user);
//     setImagePosition(user.imgPosition || null); // Set imagePosition when editing
//     setIsModalVisible(true);
//   };

//   console.log(user.imgPosition,imagePosition,"image position:::s",user.imgSeq)
//   // Save edited user details and imagePosition
//   function swapUsingObject(arr, swapObj) {
//     console.log("Array before swap:::", arr);
    
//     let newArr = [...arr]; // Create a copy of the original array
    
//     if (swapObj) {
//         for (let key in swapObj) {
//             let index1 = parseInt(key); // Convert the key to an integer (first index)
//             let index2 = swapObj[key];  // Get the value from the object (second index)
            
//             console.log(`Swapping index ${index1} with index ${index2}`);
            
//             // Ensure the indices are valid
//             if (index1 >= 0 && index1 < arr.length && index2 >= 0 && index2 < arr.length) {
//                 // Perform the swap in the new array
//                 let temp = newArr[index1];
//                 newArr[index1] = newArr[index2];
//                 newArr[index2] = temp;
                
//                 console.log(`Array after swapping index ${index1} and ${index2}::`, newArr);
//             } else {
//                 console.log(`Invalid indices: ${index1}, ${index2}`);
//             }
//         }
//     }
    
//     console.log("Final array after swap::", newArr);
//     return newArr;
// }


//   const handleSave = () => {
//     const updatedUser = { ...editableUser, imgPosition: imagePosition };
//     dispatch(updateUser({ email: editableUser.email, updatedUser }));
//     setIsModalVisible(false);
//     setUser(updatedUser); // Update local user state after saving
//     console.log("Updated User:==>> ", updatedUser);
//   };

//   // Handle user deletion
//   const handleDelete = () => {
//     Alert.alert("Delete User", "Are you sure you want to delete this user?", [
//       { text: "Cancel", style: "cancel" },
//       {
//         text: "Delete",
//         onPress: () => {
//           dispatch(deleteUser(user.email));
//           navigation.goBack(); // Navigate back to the home screen after deletion
//         },
//       },
//     ]);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>User Details</Text>
//       <ScrollView horizontal style={styles.ImageBox}>
//         {user.profileImages && user.profileImages.length > 0 ? (
//           swapUsingObject(user.profileImages,user?.imgSeq).map((uri, index) => (
//             <Image key={index} source={{ uri }} style={styles.image} />
//           ))
//         ) : (
//           <Text style={{ color: "red" }}>No profile images available</Text>
//         )}
//       </ScrollView>
//       <Text style={styles.label}>Name: {user.name}</Text>
//       <Text style={styles.label}>Mobile: {user.mobile}</Text>
//       <Text style={styles.label}>Email: {user.email}</Text>
//       <Text style={styles.label}>Password: {user.password}</Text>
//       <Text style={styles.label}>Date of Birth: {user.dob}</Text>
//       <Text style={styles.label}>Gender: {user.gender}</Text>
//       <Text style={styles.label}>Role: {user.role}</Text>
//       <Text style={styles.label}>Hobbies: {user.preference.join(", ")}</Text>
//       <Text style={styles.label}>Country: {user.selectedData?.label}</Text>
//       {isAdmin && (
//         <View>
//           <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
//             <Text style={styles.buttonText}>Edit</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
//             <Text style={styles.buttonText}>Delete</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//       <Modal
//         visible={isModalVisible}
//         animationType="slide"
//         transparent={true}
//         onRequestClose={() => setIsModalVisible(false)}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Edit Profile</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Name"
//               placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
//               value={editableUser.name}
//               onChangeText={(text) =>
//                 setEditableUser({ ...editableUser, name: text })
//               }
//             />
//             <TextInput
//               style={styles.input}
//               placeholder="Mobile"
//               placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
//               value={editableUser.mobile}
//               onChangeText={(text) =>
//                 setEditableUser({ ...editableUser, mobile: text })
//               }
//             />
//             <TextInput
//               style={styles.input}
//               placeholder="Email"
//               placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
//               value={editableUser.email}
//               onChangeText={(text) =>
//                 setEditableUser({ ...editableUser, email: text })
//               }
//             />
//             <TextInput
//               style={styles.input}
//               placeholder="Password"
//               placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
//               value={editableUser.password}
//               onChangeText={(text) =>
//                 setEditableUser({ ...editableUser, password: text })
//               }
//             />
//             <TextInput
//               style={styles.input}
//               placeholder="Date of Birth"
//               placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
//               value={editableUser.dob}
//               onChangeText={(text) =>
//                 setEditableUser({ ...editableUser, dob: text })
//               }
//             />
//             <TextInput
//               style={styles.input}
//               placeholder="Gender"
//               placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
//               value={editableUser.gender}
//               onChangeText={(text) =>
//                 setEditableUser({ ...editableUser, gender: text })
//               }
//             />
//             <FormMultiSelector
//               style={{ marginTop: 10 }}
//               selected_list={editableUser.preference.map(
//                 (hobby) => Hobbies.find((h) => h.label === hobby)?.label
//               )}
//               setselected_list={(list) => {
//                 setEditableUser({ ...editableUser, preference: list });
//               }}
//               search={true}
//               title="Preference"
//               placeholder="Select...."
//               width="100%"
//               list={Hobbies}
//             />
//             {/* You can add functionality to update imagePosition here if needed */}
//             <View style={styles.modalButtonContainer}>
//               <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
//                 <Text style={styles.buttonText}>Save</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={styles.cancelButton}
//                 onPress={() => setIsModalVisible(false)}
//               >
//                 <Text style={styles.buttonText}>Cancel</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//     container: {
//     flex: 1,
//     marginBottom: 20,
//     padding: 20,
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 10,
//     backgroundColor: "#fff",
//     width: "90%",
//     alignSelf: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//     textAlign: "center",
//     color: "blue",
//   },
//   ImageBox: {
//     flexDirection: "row",
//   },
//   image: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     // alignSelf: "center",
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 18,
//     color: "#555",
//     marginVertical: 4,
//     fontWeight: "600",
//   },
//   editButton: {
//     backgroundColor: "#4CAF50",
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//   },
//   deleteButton: {
//     backgroundColor: "#f44336",
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//   },
//   modalContent: {
//     width: "80%",
//     backgroundColor: "white",
//     padding: 20,
//     borderRadius: 10,
//   },
//   modalTitle: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ddd",
//     padding: 10,
//     marginBottom: 10,
//     borderRadius: 5,
//     width: "100%",
//     color: "black",
//   },
//   modalButtonContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 10,
//   },
//   saveButton: {
//     backgroundColor: "#4CAF50",
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//   },
//   cancelButton: {
//     backgroundColor: "#f44336",
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//   },
// });

// export default UserDetails;

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import { useDispatch } from "react-redux";
import FormMultiSelector from "../Components/FormMultiSelector";
import Hobbies from "../Components/Hobbies";
import { updateUser, deleteUser } from "../Redux/StateSlice";
import { useNavigation } from "@react-navigation/native";

const UserDetails = ({ route }) => {
  const { user: initialUser, isAdmin } = route.params || {};
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // Local state for user details
  const [user, setUser] = useState(initialUser);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editableUser, setEditableUser] = useState(initialUser);
  
  // Initialize imagePosition based on initialUser
  const [imagePosition, setImagePosition] = useState(initialUser.imgPosition || {});

  useEffect(() => {
    setUser(editableUser);
  }, [editableUser]);

  // Open edit modal and set editableUser state
  const handleEdit = () => {
    setEditableUser(user);
    setImagePosition(user.imgPosition || null); // Set imagePosition when editing
    setIsModalVisible(true);
  };

  console.log(user.imgPosition, imagePosition, "image position:::", user.imgSeq);

  // Updated swapUsingObject function
  function swapUsingObject(arr, swapObj) {
    console.log("Array before swap:::", arr);

    let newArr = [...arr]; // Create a copy of the original array

    if (swapObj) {
      for (let key in swapObj) {
        let index1 = parseInt(key); // Convert the key to an integer (first index)
        let index2 = swapObj[key];  // Get the value from the object (second index)

        console.log(`Swapping index ${index1} with index ${index2}`);

        // Ensure the indices are valid
        if (index1 >= 0 && index1 < newArr.length && index2 >= 0 && index2 < newArr.length) {
          // Perform the swap in the new array immutably
          [newArr[index1], newArr[index2]] = [newArr[index2], newArr[index1]];

          console.log(`Array after swapping index ${index1} and ${index2}::`, newArr);
        } else {
          console.log(`Invalid indices: ${index1}, ${index2}`);
        }
      }
    }

    console.log("Final array after swap::", newArr);
    return newArr;
  }

  // Save edited user details and imagePosition
  const handleSave = () => {
    // Swap images based on imgSeq and update the user's profile images
    const swappedImages = swapUsingObject(editableUser.profileImages, editableUser?.imgSeq);
    
    const updatedUser = { 
      ...editableUser, 
      profileImages: swappedImages, 
      imgPosition: imagePosition 
    };
    
    dispatch(updateUser({ email: editableUser.email, updatedUser }));
    setIsModalVisible(false);
    setUser(updatedUser); // Update local user state after saving
    console.log("Updated User:==>> ", updatedUser);
  };

  // Handle user deletion
  const handleDelete = () => {
    Alert.alert("Delete User", "Are you sure you want to delete this user?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: () => {
          dispatch(deleteUser(user.email));
          navigation.goBack(); // Navigate back to the home screen after deletion
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Details</Text>
      <ScrollView horizontal style={styles.ImageBox}>
        {user.profileImages && user.profileImages.length > 0 ? (
          swapUsingObject(user.profileImages, user?.imgSeq).map((uri, index) => (
            <Image key={index} source={{ uri }} style={styles.image} />
          ))
        ) : (
          <Text style={{ color: "red" }}>No profile images available</Text>
        )}
      </ScrollView>
      <Text style={styles.label}>Name: {user.name}</Text>
      <Text style={styles.label}>Mobile: {user.mobile}</Text>
      <Text style={styles.label}>Email: {user.email}</Text>
      <Text style={styles.label}>Password: {user.password}</Text>
      <Text style={styles.label}>Date of Birth: {user.dob}</Text>
      <Text style={styles.label}>Gender: {user.gender}</Text>
      <Text style={styles.label}>Role: {user.role}</Text>
      <Text style={styles.label}>Hobbies: {user.preference.join(", ")}</Text>
      <Text style={styles.label}>Country: {user.selectedData?.label}</Text>
      {isAdmin && (
        <View>
          <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Profile</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
              value={editableUser.name}
              onChangeText={(text) =>
                setEditableUser({ ...editableUser, name: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Mobile"
              placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
              value={editableUser.mobile}
              onChangeText={(text) =>
                setEditableUser({ ...editableUser, mobile: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
              value={editableUser.email}
              onChangeText={(text) =>
                setEditableUser({ ...editableUser, email: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
              value={editableUser.password}
              onChangeText={(text) =>
                setEditableUser({ ...editableUser, password: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Date of Birth"
              placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
              value={editableUser.dob}
              onChangeText={(text) =>
                setEditableUser({ ...editableUser, dob: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Gender"
              placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
              value={editableUser.gender}
              onChangeText={(text) =>
                setEditableUser({ ...editableUser, gender: text })
              }
            />
            <FormMultiSelector
              style={{ marginTop: 10 }}
              selected_list={editableUser.preference.map(
                (hobby) => Hobbies.find((h) => h.label === hobby)?.label
              )}
              setselected_list={(list) => {
                setEditableUser({ ...editableUser, preference: list });
              }}
              search={true}
              title="Preference"
              placeholder="Select...."
              width="100%"
              list={Hobbies}
            />
            {/* You can add functionality to update imagePosition here if needed */}
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Add styles as needed
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color:"black"
  },
  ImageBox: {
    flexDirection: "row",
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 10,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color:"black"
  },
  editButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
        borderWidth: 1,
        borderColor: "#ddd",
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        width: "100%",
        color: "black",
      },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  saveButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: "grey",
    padding: 10,
    borderRadius: 5,
  },
});

export default UserDetails;
