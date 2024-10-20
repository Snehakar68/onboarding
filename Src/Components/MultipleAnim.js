import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSharedValue } from 'react-native-reanimated'
import Draggable from './Draggable'
import Box from './Box'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
 
const array=new Array(9).fill('').map((_,i)=>i)
const MultipleAnim = () => {
    const Positions=useSharedValue(
        Object.assign({}, ...array.map(item=>({[item]:item})))
    )
  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView style={styles.container}>
        <SafeAreaView style={styles.container}>
          <View style={styles.wrapper}>
          <Text style={{ color: "white",fontWeight:"600",fontSize:20 }}>Swapping Animation</Text>
           {array.map(item=>(
            <Draggable key={item} Positions={Positions} id={item}>
              <Box count={item} key={item}/>
            </Draggable>
           ))

           }
          </View>
        </SafeAreaView>
      </GestureHandlerRootView>
    </SafeAreaView>
  )
}

export default MultipleAnim

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
      },
      wrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 16,
      },
})