import './AddCard.css'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { getWeather } from '../../services/weathers'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { initialValueToWeatherApp, weatherAppKey } from '../../utils/consts'
import { useWeather } from '../../hooks/useWeather'
import { useState } from 'react'
import loaderIcon from './../../assets/bars.svg'

export function AddCard () {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const { storedValue, setValue } = useLocalStorage(weatherAppKey, initialValueToWeatherApp)
  const { setWeathers } = useWeather()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      cityName: 'San salvador de jujuy',
      latitude: '-24.1995',
      longitude: '-65.3024'
    }
  })

  const onSubmit = (data) => {
    const { latitude, longitude, cityName } = data
    setIsLoading(true)
    getWeather({ latitude, longitude })
      .then((response) => {
        const { temperature, weathercode, windspeed, time } = response.current_weather

        const newWeatherCard = {
          // eslint-disable-next-line no-undef
          id: crypto.randomUUID(),
          cityName,
          latitude,
          longitude,
          temperature,
          weathercode,
          windspeed,
          time
        }

        setWeathers(previous => ([...previous, newWeatherCard]))

        const weatherToStorage = {
          id: newWeatherCard.id,
          cityName: newWeatherCard.cityName,
          latitude: newWeatherCard.latitude,
          longitude: newWeatherCard.longitude
        }

        setValue({
          user: storedValue.user,
          weathers: [...storedValue.weathers, weatherToStorage]
        })

        navigate('/')
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false))
  }

  return (
    <div className='form-container'>
      <form className='form-card' onSubmit={handleSubmit(onSubmit)}>
        <h2 className='form-title'>Add a new card</h2>

        <div className='form-group'>
          <label htmlFor='cityName' />
          <input
            type='text'
            placeholder='Enter city'
            id='cityName'
            {...register('cityName', {
              required: 'Must enter a city name'
            })}
          />
          <p className='error-msg'>{errors.cityName?.message}</p>
        </div>

        <div className='form-group'>
          <label htmlFor='latitude' />
          <input
            type='text'
            placeholder='Enter latitude'
            id='latitude'
            {...register('latitude', {
              required: 'Must enter a latitude'
            })}
          />
          <p className='error-msg'>{errors.latitude?.message}</p>
        </div>

        <div className='form-group'>
          <label htmlFor='longitude' />
          <input
            type='text'
            placeholder='Enter longitude'
            id='longitude'
            {...register('longitude', {
              required: 'Must enter a longitude'
            })}
          />
          <p className='error-msg'>{errors.longitude?.message}</p>
        </div>

        <button type='submit' className='btn-generate-new-card' disabled={isLoading}>
          {isLoading
            ? <img src={loaderIcon} className='loader-icon' />
            : 'Submit'}
        </button>
      </form>
    </div>
  )
}
