import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Logout from "./Logout";
import { debounce } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { setUserData, userDataSelector } from "../Redux/StateSlice";
import { initialUserSelector } from "../Redux/LoiginSlice";
import { USER_DB_KEY } from "../../App";

const Home = ({ route }) => {
  const { isAdmin } = route.params || {};
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const initialUser = useSelector(initialUserSelector);
  console.log("initialUser", initialUser);
  const userData = useSelector(userDataSelector);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = JSON.parse(await AsyncStorage.getItem(USER_DB_KEY)) || [];

        if (isAdmin) {
          // Admin: show all users except their own
          const filteredUsers = users.filter(
            (user) => user.email !== initialUser.email
          );
          dispatch(setUserData(filteredUsers));
        } else if (initialUser && initialUser.email) {
          // Normal User: show only their own profile
          const currentUser = users.find(
            (user) => user.email === initialUser.email
          );
          if (currentUser) {
            dispatch(setUserData([currentUser]));
          } else {
            Alert.alert("Error", "No user data found");
          }
        } else {
          Alert.alert("Error", "No user data available");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        Alert.alert("Error", "There was an error fetching your information");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, isAdmin, initialUser]);

  const handlePress = (user) => {
    if (isAdmin) {
      navigation.navigate("UserDetails", {
        user,
        isAdmin: true,
      });
    } else {
      navigation.navigate("UserDetails", {
        user,
        isAdmin: false,
      });
    }
  };

  const handleProfilePress = useCallback(
    debounce(() => {
      if (initialUser) {
        navigation.navigate("AdminProfile", { adminData: initialUser});
      }
    }, 300),
    [initialUser, navigation]
  );

  const initialprofileImage =
    initialUser.profileImages && initialUser.profileImages.length > 0
      ? initialUser.profileImages[0]
      : null;
      
  const renderUserItem = ({ item }) => {
    console.log("Profile Image URI:", item.profileImage); // Debugging: Log the profile image URI
    console.log("items", item);

    const profileImage =
      item.profileImages && item.profileImages.length > 0
        ? item.profileImages[0]
        : null;
    return (
      <TouchableOpacity
        style={styles.userContainer}
        onPress={() => handlePress(item)}
      >
        <View style={styles.userRow}>
          <Image
            source={
              profileImage ? { uri: profileImage } : require("../Pic/img3.jpg")
            }
            style={styles.image}
            onError={() => console.log("Error loading image:", profileImage)}
          />
          <View style={styles.userInfo}>
            <Text style={styles.title}>Name: {item.name}</Text>
            <Text style={styles.label}>Email: {item.email}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {isAdmin && initialUser && (
        <TouchableOpacity
          style={styles.profileButton}
          onPress={handleProfilePress}
          activeOpacity={0.9}
        >
          <Image
            source={
              initialprofileImage
                ? { uri: initialprofileImage }
                : require("../Pic/img3.jpg")
            }
            style={styles.profileImage}
            onError={() =>
              console.log(
                "Error loading admin profile image:",
                initialprofileImage
              )
            }
          />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>User List</Text>
      {loading ? (
        <Text style={styles.label}>Loading...</Text>
      ) : (
        <FlatList
          data={userData}
          keyExtractor={(item) => item.email.toString()}
          renderItem={renderUserItem}
          contentContainerStyle={styles.listContainer}
        />
      )}
      <View style={{ marginVertical: 20 }}>
        <Logout />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  profileButton: {
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "black",
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: "red",
  },
  listContainer: {
    paddingBottom: 20,
  },
  userContainer: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    backgroundColor: "#ccc", // Add a background color for when the image is loading or missing
  },
  userInfo: {
    flex: 1,
  },
});

export default Home;

// import React, { useEffect, useState, useCallback } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   Alert,
//   TouchableOpacity,
//   Image,
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useNavigation } from "@react-navigation/native";
// import Logout from "./Logout";
// import { debounce } from "lodash";
// import { useDispatch, useSelector } from "react-redux";
// import { setUserData, userDataSelector } from "../Redux/StateSlice";
// import { initialUserSelector } from "../Redux/LoiginSlice";
// import { USER_DB_KEY } from "../../App";

// const Home = ({ route }) => {
//   const { isAdmin } = route.params || {};
//   const [loading, setLoading] = useState(true);
//   const navigation = useNavigation();
//   const dispatch = useDispatch();
//   const initialUser = useSelector(initialUserSelector);
//   const userData = useSelector(userDataSelector);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const users = JSON.parse(await AsyncStorage.getItem(USER_DB_KEY)) || [];

//         if (isAdmin) {
//           // Admin: show all users except their own
//           const filteredUsers = users.filter((user) => user.email !== initialUser.email);
//           dispatch(setUserData(filteredUsers));
//         } else if (initialUser && initialUser.email) {
//           // Normal User: show only their own profile
//           const currentUser = users.find((user) => user.email === initialUser.email);
//           if (currentUser) {
//             dispatch(setUserData([currentUser]));

//           } else {
//             Alert.alert("Error", "No user data found");
//           }
//         } else {
//           Alert.alert("Error", "No user data available");
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         Alert.alert("Error", "There was an error fetching your information");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [dispatch, isAdmin, initialUser]);

//   const handlePress = (user) => {
//     if (isAdmin) {
//       navigation.navigate("UserDetails", {
//         user,
//         isAdmin: true,
//       });
//     }else{
//       navigation.navigate("UserDetails",{
//         user,
//         isAdmin:false
//       })
//     }
//   };

//   const handleProfilePress = useCallback(
//     debounce(() => {
//       if (initialUser) {
//         navigation.navigate("AdminProfile", { adminData: initialUser });
//       }
//     }, 300),
//     [initialUser, navigation]
//   );

//   const renderUserItem = ({ item }) => (
//     <TouchableOpacity
//       style={styles.userContainer}
//       onPress={() => handlePress(item)}
//     >
//       <View style={styles.userRow}>

//         <Image source={{ uri: item.profileImage }} style={styles.image} />
//         <View style={styles.userInfo}>
//           <Text style={styles.title}>Name: {item.name}</Text>
//           <Text style={styles.label}>Email: {item.email}</Text>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       {isAdmin && initialUser && (
//         <TouchableOpacity
//           style={styles.profileButton}
//           onPress={handleProfilePress}
//           activeOpacity={0.9}
//         >
//           <Image
//             source={{ uri: initialUser.profileImage }}
//             style={styles.profileImage}
//           />
//         </TouchableOpacity>
//       )}
//       <Text style={styles.title}>User List</Text>
//       {loading ? (
//         <Text style={styles.label}>Loading...</Text>
//       ) : (
//         <FlatList
//           data={userData}
//           keyExtractor={(item) => item.email.toString()}
//           renderItem={renderUserItem}
//           contentContainerStyle={styles.listContainer}
//         />
//       )}
//       <View style={{ marginVertical: 20 }}>
//         <Logout />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#fff",
//   },
//   profileButton: {
//     alignSelf: "flex-end",
//     marginBottom: 10,
//   },
//   profileImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//     color:"black"
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 10,
//     color:"red"
//   },
//   listContainer: {
//     paddingBottom: 20,
//   },
//   userContainer: {
//     marginBottom: 15,
//     padding: 15,
//     backgroundColor: "#f9f9f9",
//     borderRadius: 10,
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   userRow: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   image: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     marginRight: 15,
//   },
//   userInfo: {
//     flex: 1,
//   },
// });

// export default Home;
