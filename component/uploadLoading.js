import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { colors } from '../assest/color'

export default function UpLoadLoading() {
  return (
    <View style = {{
      justifyContent: "center",
      alignItems: "center",
      flex:1
    }}>
        <Text>Vui lòng chờ trong giây lát</Text>
      <ActivityIndicator size="large" color={colors.loading} />
    </View>
  )
}