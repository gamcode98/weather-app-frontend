import { useEffect, useState } from 'react'
import { getWeatherIconByCode } from '../services/weatherImages'
import { getWeather } from '../services/weathers'

export function useWeatherCard ({ card }) {
  const [weather, setWeather] = useState(card)
  const [weatherImageContent, setWeatherImageContent] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    if (!weather.temperature) {
      getWeather({ latitude: weather.latitude, longitude: weather.longitude })
        .then((response) => {
          const { temperature, weathercode, windspeed, time } = response.current_weather
          setWeather({ ...weather, temperature, weathercode, windspeed, time })
          configWeatherImageContent({ time, code: weathercode })
        })
        .catch((error) => console.log(error))
      return
    }

    const time = weather.time.slice(11, 13)
    configWeatherImageContent({ time, code: weather.weathercode })
  }, [])

  const configWeatherImageContent = ({ time, code }) => {
    getWeatherIconByCode({ code })
      .then((response) => {
        if (+time > 19 || +time < 7) {
          setWeatherImageContent({
            momentTime: 'Night',
            momentImage: response.night.path
          })
        } else {
          setWeatherImageContent({
            momentTime: 'Day',
            momentImage: response.day.path
          })
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false))
  }

  return {
    weather,
    weatherImageContent,
    isLoading
  }
}
