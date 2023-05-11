import { useContext } from 'react'
import { WeatherContext } from '../contexts/WeatherContext'

export const useWeather = () => useContext(WeatherContext)
