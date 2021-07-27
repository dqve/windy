import React from 'react'
import { StyleSheet, View, Image, ScrollView } from 'react-native'
import Label from './BigLabel'
const ForcastHour = ({ temp, month, day, hour, icon }) => {
  return (
    <View style={styles.forcastCol}>
      <Label style={{ fontSize: 12, textAlign: 'center' }}>
        {month}.{day}
      </Label>
      <Label style={{ fontSize: 12, textAlign: 'center', paddingTop: 0 }}>
        {hour}:00
      </Label>
      <Image
        style={styles.icon}
        source={{
          uri: `https://openweathermap.org/img/w/${icon}.png`,
        }}
      />
      <Label style={{ fontSize: 15, textAlign: 'center', fontWeight: '400' }}>
        {temp}&#176;
      </Label>
    </View>
  )
}
const styles = StyleSheet.create({
  forcastCol: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 15,
    padding: 5,
    marginHorizontal: 3,
    flex: 1,
  },
  icon: {
    margin: 0,
    height: 50,
    width: 50,
  },
})

export default ForcastHour
