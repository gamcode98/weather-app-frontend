import './Card.css'
import { useNavigate } from 'react-router-dom'
import { FaEllipsisH, FaTrashAlt } from 'react-icons/fa'
import { useWeather } from '../../hooks/useWeather'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { weatherAppKey, initialValueToWeatherApp } from '../../utils/consts'
import { useWeatherCard } from '../../hooks/useWeatherCard'

export function Card ({ card }) {
  const { weather, weatherImageContent, isLoading } = useWeatherCard({ card })
  const { setWeathers } = useWeather()
  const { setValue } = useLocalStorage(weatherAppKey, initialValueToWeatherApp)

  const navigate = useNavigate()

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

      {
        isLoading
          ? (
            <div className='loader'>
              <div className='wrapper'>
                <div className='img' />
              </div>
            </div>
            )
          : (
            <img
              className='time'
              src={weatherImageContent.momentImage}
              alt='icon weather'
            />
            )
      }

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
          View detailed forecast
        </button>
      </div>
    </section>
  )
}
