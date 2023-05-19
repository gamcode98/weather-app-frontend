import { useEffect, useState } from 'react'
import { getAllWeatherIcons } from '../services/weatherImages'
import { getDetailsWeather } from '../services/weathers'
import { parseDate } from '../utils/parseDate'
import { useLocalStorage } from './useLocalStorage'
import { initialValueToWeatherApp, weatherAppKey } from '../utils/consts'
import { useCurrentUser } from './useCurrentUser'

export function useDetailWeather ({ weather }) {
  const [weatherInformation, setWeatherInformation] = useState(weather)
  const [currentInfo, setCurrentInfo] = useState({})
  const [todayData, setTodayData] = useState([])
  const [nextDaysData, setNextDaysData] = useState([])
  const { storedValue } = useLocalStorage(weatherAppKey, initialValueToWeatherApp)
  const { setCurrentUser } = useCurrentUser()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setCurrentUser(storedValue.user)
    getInfoToShow(weather)
  }, [])

  const getInfoToShow = (value) => {
    setIsLoading(true)

    getAllWeatherIcons()
      .then((icons) => {
        const getImage = (code, time = 7) => {
          const found = icons.find((item) => item.code === code)
          if (+time > 19 || +time < 7) return found.night.path
          return found.day.path
        }

        const getImageDescription = (code) => {
          const found = icons.find((item) => item.code === code)
          return found.description[0]
        }

        getDetailsWeather({ latitude: weather.latitude, longitude: weather.longitude })
          .then((data) => {
            setWeatherInformation({ ...data, cityName: value.cityName })

            const foundIndex = data.hourly.time.findIndex(
              (item) => item === data.current_weather.time
            )

            const time = new Date(data.current_weather.time)

            setCurrentInfo({
              time: time.toDateString(),
              relativeHumidity: data.hourly.relativehumidity_2m[foundIndex],
              apparentTemperature: data.hourly.apparent_temperature[foundIndex],
              description: getImageDescription(
                data.current_weather.weathercode
              ),
              weatherImage: getImage(
                data.current_weather.weathercode,
                data.current_weather.time.slice(11, 13)
              )
            })

            const timeFiltered = data.hourly.time.filter(item => {
              return item.slice(0, 10) === data.current_weather.time.slice(0, 10)
            })

            const todayWeather = timeFiltered.map((item, index) => ({
              time: data.hourly.time[index].slice(11),
              temperature: data.hourly.temperature_2m[index],
              weatherImage: getImage(
                data.hourly.weathercode[index],
                data.hourly.time[index].slice(11, 13)
              )
            }))

            setTodayData(todayWeather)

            const forecastNextDays = data.daily.time.map((item, index) => ({
              time: parseDate(data.daily.time[index]),
              weatherImage: getImage(data.daily.weathercode[index]),
              temperatureMax: data.daily.temperature_2m_max[index],
              temperatureMin: data.daily.temperature_2m_min[index],
              description: getImageDescription(data.daily.weathercode[index])
            }))

            setNextDaysData(forecastNextDays)
          })
          .catch((error) => console.log(error))
          .finally(() => setIsLoading(false))
      })
      .catch((error) => console.log(error))
  }

  return {
    weatherInformation,
    currentInfo,
    todayData,
    nextDaysData,
    isLoading
  }
}
