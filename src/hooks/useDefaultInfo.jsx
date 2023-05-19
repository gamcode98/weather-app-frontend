import { useEffect, useRef } from 'react'
import { initialValueToWeatherApp, weatherAppKey } from '../utils/consts'
import { useCurrentUser } from './useCurrentUser'
import { useLocalStorage } from './useLocalStorage'
import { useWeather } from './useWeather'

export function useDefaultInfo () {
  const { weathers, setWeathers } = useWeather()
  const { storedValue } = useLocalStorage(weatherAppKey, initialValueToWeatherApp)
  const { setCurrentUser } = useCurrentUser()
  const originalWeathers = useRef(weathers)

  useEffect(() => {
    if (storedValue) {
      setCurrentUser(storedValue.user)
      setWeathers(storedValue.weathers)
      originalWeathers.current = storedValue.weathers
    }
  }, [])

  return {
    weathers,
    originalWeathers
  }
}
