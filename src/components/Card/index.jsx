import './Card.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaEllipsisH, FaTrashAlt } from 'react-icons/fa'
import { getWeatherIconByCode } from '../../services/weatherImages'
import { getWeather } from '../../services/weathers'
import { useWeather } from '../../hooks/useWeather'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { weatherAppKey, initialValueToWeatherApp } from '../../utils/consts'

export function Card ({ card }) {
  const [weather, setWeather] = useState(card)
  const { setWeathers } = useWeather()
  const { setValue } = useLocalStorage(weatherAppKey, initialValueToWeatherApp)
  const [weatherImageContent, setWeatherImageContent] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
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
  }

  const handleDelete = ({ id }) => {
    setWeathers(previousWeathers => {
      const filteredWeathers = previousWeathers.filter(weather => weather.id !== id)
      setValue(previousValues => ({ ...previousValues, weathers: filteredWeathers }))
      return filteredWeathers
    })
  }

  const goToDetails = () => {
    navigate('/weather-card/details', { state: { weather } })
  }

  return (
    <section className='card glassmorphism'>
      <div className='top-bar'>
        <span>{weatherImageContent.momentTime}</span>
        <div className='top-bar-action'>
          <FaEllipsisH className='menu-dropdown' />
          <div className='top-bar-btn-actions'>
            <button className='btn delete' onClick={() => handleDelete({ id: weather.id })}>
              <FaTrashAlt />
            </button>
          </div>
        </div>
      </div>

      <img
        className='time'
        src={weatherImageContent.momentImage}
        alt='icon weather'
      />

      <h2 className='temperature'>
        {weather.temperature}°C
      </h2>

      <h3 className='city'>{weather.cityName}</h3>

      <div className='details'>
        <div className='detail'>
          <span className='detail-name'>Wind speed</span>
          <p className='detail-number'>
            {weather.windspeed}
            <span className='unit-of-measurement'>km</span>
          </p>
        </div>

        <div className='detail'>
          <span className='detail-name'>Longitude</span>
          <p className='detail-number'>
            {weather.longitude}
            <span className='unit-of-measurement' />
          </p>
        </div>

        <div className='detail'>
          <span className='detail-name'>Latitude</span>
          <p className='detail-number'>{weather.latitude}</p>
        </div>
      </div>

      <div className='actions'>
        <button className='btn show-more' onClick={goToDetails}>
          Show more
        </button>
      </div>
    </section>
  )
}
