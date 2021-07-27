import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const AppTitle = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}> Weather App</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 25,
    color: '#ffffff',
    fontWeight: '400',
  },
})

export default AppTitle
