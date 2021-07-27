import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { useEffect, useState } from 'react'
import {
  ImageBackground,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ScrollView,
} from 'react-native'
import SearchBar from './components/SearchBar'
import AppTitle from './components/AppTitle'
import isEmpty from './util/isEmpty'
import * as Location from 'expo-location'
import Result from './components/Results'
import AnimatedLoader from 'react-native-animated-loader'

export default function App() {
  const [location, setLocation] = useState(null)
  const [error, setError] = useState(false)
  const [enteredValue, setEnteredValue] = useState('')
  const [weatherInfo, setweatherInfo] = useState('')
  const [Loading, setLoading] = useState(true)

  const resetInputHanler = () => {
    setEnteredValue('')
  }

  const numberInputHandler = (e) => {
    setEnteredValue(e.replace(/[a-z][A-Z]/g, ''))
  }

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied')
      return
    }
    let location = await Location.getCurrentPositionAsync({})
    return location
  }

  const locationHandler = () => {
    const APIkey = 'd95871f1a7071f934f865d3ed115c78b'

    if (location) {
      const weather = `https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${APIkey}`
      const forecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${APIkey}`
      Locate(weather, forecast)
      setLoading(false)
    }
  }

  useEffect(() => {
    ;(async () => {
      let location = await getLocation()
      const APIkey = 'd95871f1a7071f934f865d3ed115c78b'
      const weather = `https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${APIkey}`
      const forecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${APIkey}`

      if (location) Locate(weather, forecast)
      setLocation(location)
      setLoading(false)
    })()
  }, [])

  const searchSubmit = () => {
    const APIkey = 'd95871f1a7071f934f865d3ed115c78b'

    const weather = `https://api.openweathermap.org/data/2.5/weather?q=${enteredValue}&APPID=${APIkey}&units=metric`
    const forecast = `https://api.openweathermap.org/data/2.5/forecast?q=${enteredValue}&APPID=${APIkey}&units=metric`
    Locate(weather, forecast)
  }

  const Locate = (weather, forecast) => {
    Promise.all([fetch(weather), fetch(forecast)])
      .then(([res1, res2]) => {
        if (res1.ok && res2.ok) {
          return Promise.all([res1.json(), res2.json()])
        } else {
          Alert.alert('Location Not Found', 'Enter another Location.', [
            { text: 'Okay', style: 'destructive', onPress: resetInputHanler },
          ])
          throw Error(res1.statusText, res2.statusText)
        }
      })
      .then(([data1, data2]) => {
        const months = [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'Nocvember',
          'December',
        ]
        const days = [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ]
        const currentDate = new Date()
        const date = `${days[currentDate.getDay()]} ${currentDate.getDate()} ${
          months[currentDate.getMonth()]
        }`
        const sunset = new Date(data1.sys.sunset * 1000)
          .toLocaleTimeString()
          .slice(0, 5)
        const sunrise = new Date(data1.sys.sunrise * 1000)
          .toLocaleTimeString()
          .slice(0, 5)

        const weatherInfo = {
          city: data1.name,
          country: data1.sys.country,
          date,
          description: data1.weather[0].description,
          main: data1.weather[0].main,
          temp: data1.main.temp,
          highestTemp: data1.main.temp_max,
          lowestTemp: data1.main.temp_min,
          sunrise,
          sunset,
          clouds: data1.clouds.all,
          humidity: data1.main.humidity,
          wind: data1.wind.speed,
          forecast: data2.list,
        }

        setweatherInfo(weatherInfo)
        setError(false)
        setLoading(false)
      })

      .catch((error) => {
        console.log(error)
        setweatherInfo(null)
        setError(true)
        setLoading(false)
      })
  }

  let result = null
  if (weatherInfo) {
    result = <Result weather={weatherInfo} />
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss()
      }}
    >
      <View style={styles.container}>
        <ImageBackground
          source={require('./assets/2850815.jpg')}
          style={styles.image}
        >
          <View style={styles.innerContainer}>
            <AnimatedLoader
              visible={Loading}
              overlayColor='rgba(255,255,255,0.75)'
              source={require('./assets/10652-loading-cycle-color-transparent-background.json')}
              animationStyle={styles.lottie}
              speed={2}
            />

            <AppTitle />
            <SearchBar
              enteredValue={enteredValue}
              numberInputHandler={numberInputHandler}
              Locate={locationHandler}
              submit={searchSubmit}
            />
            <ScrollView>{result}</ScrollView>
          </View>
          <StatusBar style='auto' />
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  innerContainer: {
    flex: 1,
    marginTop: 50,
  },
  lottie: {
    width: 100,
    height: 100,
  },
})
