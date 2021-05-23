import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import {useDispatch, useSelector} from "react-redux"

import {setUser} from "../Redux/Reducer"

const Home = () => {

  const dispatch = useDispatch()
  const user = useSelector((state) => state);

  return (
     <View style={styles.container} >
       <ScrollView>
      <Text>Home</Text>
      <TouchableOpacity
              style={{ backgroundColor: "#ff5", alignItems: "center" }}
              onPress={()=> {dispatch(setUser(null)); 
  console.log(user);
}}
              
            >
              <Text style={{ color: "#000", padding: 10, fontSize: 22 }}>
                LOG OUT
              </Text>
            </TouchableOpacity>
            
  </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    height: "100%",
    color: "#000",
    backgroundColor:"#373d46"
  }
})

export default Home
