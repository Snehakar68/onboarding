import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const HomeScreen = () => {
    const navigation=useNavigation()
  return (
    <View style={{flex:1,backgroundColor:"white",alignItems:"center",justifyContent:"center"}}>
     <TouchableOpacity style={{width:200,height:50,backgroundColor:"orange",justifyContent:"center",borderRadius:50,marginVertical:30}} onPress={()=>navigation.navigate("Input")}>
        <Text style={{color:"white",textAlign:"center"}}>Input & button</Text>
     </TouchableOpacity>
     <TouchableOpacity style={{width:200,height:50,backgroundColor:"orange",justifyContent:"center",borderRadius:50,marginVertical:30}} onPress={()=>navigation.navigate("AnimScreen")}>
        <Text style={{color:"white",textAlign:"center"}}>Selectors</Text>
     </TouchableOpacity>
     <TouchableOpacity style={{width:200,height:50,backgroundColor:"orange",justifyContent:"center",borderRadius:50,marginVertical:30}} onPress={()=>navigation.navigate("DateTime")}>
        <Text style={{color:"white",textAlign:"center"}}>Date/Time picker</Text>
     </TouchableOpacity>
     <TouchableOpacity style={{width:200,height:50,backgroundColor:"orange",justifyContent:"center",borderRadius:50,marginVertical:30}} onPress={()=>navigation.navigate("AnimationScrn")}>
        <Text style={{color:"white",textAlign:"center"}}>Animations</Text>
     </TouchableOpacity>
     <TouchableOpacity style={{width:200,height:50,backgroundColor:"orange",justifyContent:"center",borderRadius:50,marginVertical:30}} onPress={()=>navigation.navigate("ImgLoader")}>
        <Text style={{color:"white",textAlign:"center"}}>Image Loader</Text>
     </TouchableOpacity>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})