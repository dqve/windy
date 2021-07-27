import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { AntDesign, Entypo } from '@expo/vector-icons'

const SearchBar = ({ enteredValue, numberInputHandler, Locate, submit }) => {
  return (
    <View style={styles.container}>
      <View style={styles.item1}>
        <AntDesign name='search1' size={20} />
      </View>
      <View style={styles.item}>
        <TextInput
          style={styles.input}
          placeholder='Enter City'
          autoCapitalize='none'
          value={enteredValue}
          onChangeText={numberInputHandler}
          onSubmitEditing={submit}
        />
      </View>
      <View style={styles.item1}>
        <Entypo name='location' size={20} onPress={Locate} />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  input: {
    fontSize: 17,
    color: '#c5c5c5',
    paddingLeft: 10,
  },
  container: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    marginVertical: 10,
    marginHorizontal: 25,
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    flex: 1,
    maxWidth: '85%',
  },
  item1: {},
})

export default SearchBar
