import React from 'react'
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native'
import Label from './BigLabel'
import { Ionicons, FontAwesome5 } from '@expo/vector-icons'
import Forecast from './ForcastHour'
const Results = ({ weather }) => {
  const {
    city,
    country,
    date,
    description,
    main,
    temp,
    sunset,
    sunrise,
    humidity,
    wind,
    highestTemp,
    lowestTemp,
    forecast,
  } = weather

  const forecasts = forecast.map((item) => (
    <Forecast
      key={item.dt}
      temp={Math.floor(item.main.temp * 1) / 1}
      icon={item.weather[0].icon}
      month={item.dt_txt.slice(5, 7)}
      day={item.dt_txt.slice(8, 10)}
      hour={item.dt_txt.slice(11, 13) * 1}
    />
  ))

  let weatherIcon = null

  if (main === 'Thunderstorm') {
    weatherIcon = <Ionicons name='thunderstorm' size={90} color='white' />
  } else if (main === 'Drizzle') {
    weatherIcon = <FontAwesome5 name='cloud-rain' size={90} color='white' />
  } else if (main === 'Rain') {
    weatherIcon = <Ionicons name='ios-rainy' size={125} color='white' />
  } else if (main === 'Snow') {
    weatherIcon = <Ionicons name='ios-snow-sharp' size={125} color='white' />
  } else if (main === 'Clear') {
    weatherIcon = <FontAwesome name='cloud' size={125} color='white' />
  } else if (main === 'Clouds') {
    weatherIcon = <Ionicons name='md-cloudy' size={125} color='#1F4DA3' />
  } else {
    weatherIcon = <Ionicons name='md-cloudy' size={125} color='white' />
  }

  return (
    <View style={styles.container}>
      <Label>
        {city}, {country}
      </Label>
      <Label style={styles.smallLabel}>{date}</Label>

      <View style={styles.weatherContainer}>
        <View style={styles.weather}>{weatherIcon}</View>
        <View style={styles.weather1}>
          <Label style={{ fontSize: 70, fontWeight: '500', padding: 4 }}>
            {Math.floor(temp)}&#176;
          </Label>
          <Label style={styles.smallLabel}>{description}</Label>
        </View>
      </View>

      <View style={styles.weatherData}>
        <View style={styles.rowData}>
          <View style={styles.colData}>
            <Label style={{ fontSize: 20, fontWeight: '500', padding: 4 }}>
              {Math.floor(highestTemp)}&#176;
            </Label>
            <Label style={{ fontSize: 17, fontWeight: '500', padding: 4 }}>
              Hight
            </Label>
          </View>
          <View style={styles.colData}>
            <Label style={{ fontSize: 20, fontWeight: '500', padding: 4 }}>
              {wind}mph
            </Label>
            <Label style={{ fontSize: 17, fontWeight: '500', padding: 4 }}>
              Wind
            </Label>
          </View>
          <View style={styles.colData}>
            <Label style={{ fontSize: 20, fontWeight: '500', padding: 4 }}>
              {sunrise}
            </Label>
            <Label style={{ fontSize: 17, fontWeight: '500', padding: 4 }}>
              Sunrise
            </Label>
          </View>
        </View>

        <View style={styles.rowData}>
          <View style={styles.colData}>
            <Label style={{ fontSize: 20, fontWeight: '500', padding: 4 }}>
              {Math.floor(lowestTemp)}&#176;
            </Label>
            <Label style={{ fontSize: 17, fontWeight: '500', padding: 4 }}>
              Low
            </Label>
          </View>
          <View style={styles.colData}>
            <Label style={{ fontSize: 20, fontWeight: '500', padding: 4 }}>
              {humidity}%
            </Label>
            <Label style={{ fontSize: 17, fontWeight: '500', padding: 4 }}>
              Rain
            </Label>
          </View>
          <View style={styles.colData}>
            <Label style={{ fontSize: 20, fontWeight: '500', padding: 4 }}>
              {sunset}
            </Label>
            <Label style={{ fontSize: 17, fontWeight: '500', padding: 4 }}>
              Sunset
            </Label>
          </View>
        </View>
      </View>

      <Label style={{ fontWeight: '500' }}> Forecast </Label>

      <SafeAreaView style={styles.ascontainer}>
        <ScrollView
          horizontal={true}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
        >
          <View
            style={{ flexDirection: 'row' }}
            onStartShouldSetResponder={() => true}
          >
            {forecasts}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },

  smallLabel: {
    paddingLeft: 10,
    paddingTop: 0,
    fontWeight: '400',
    textAlign: 'left',
    fontSize: 17,
  },
  weatherContainer: {
    flexDirection: 'row',
  },
  weather: {
    marginLeft: 10,
  },
  weather1: {
    flexDirection: 'column',
    marginLeft: 20,
  },
  weatherData: {
    // width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    paddingHorizontal: 10,

    // marginHorizontal: 10,
  },
  rowData: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    // padding: 10,
    paddingVertical: 7,
    paddingHorizontal: 10,
  },
  colData: {},

  //   scrowView: {
  //     flex: 1,
  //   },

  ascontainer: {
    paddingTop: StatusBar.currentHeight,
    flexDirection: 'row',
    // flex: 1,
  },
})

export default Results
