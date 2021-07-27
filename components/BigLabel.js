import React from 'react'
import { StyleSheet, Text } from 'react-native'

const BigLabel = (props) => {
  return (
    <Text {...props} style={{ ...styles.bigLabel, ...props.style }}>
      {props.children}
    </Text>
  )
}

const styles = StyleSheet.create({
  bigLabel: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 27,
    textAlign: 'left',
    padding: 10,
  },
})
export default BigLabel
