import React, { useEffect } from "react"
import {View} from "react-native"
import Home from "./components/Home"

import {setLocalNotification} from './utils/helper'

export default function App() {

  useEffect(() => {
    setLocalNotification()
  }, [])
  
  return (
    <View style={{flex: 1}}>
      <Home />
    </View>
  )
}
