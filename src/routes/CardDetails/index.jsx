import './CardDetails.css'
import { FaWind, FaTint, FaThermometerThreeQuarters } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { useDetailWeather } from '../../hooks/useDetailWeather'

export function CardDetails () {
  const location = useLocation()
  const { weather } = location.state
  const {
    currentInfo,
    nextDaysData,
    todayData,
    weatherInformation,
    isLoading
  } = useDetailWeather({ weather })

  return (
    <section className='weather-card-detail'>
      <div className='left'>
        {isLoading
          ? (
            <>
              <div className='skeleton city-name' />
              <div className='current-weather empty glassmorphism'>
                <span className='current-date empty skeleton' />
                <span className='current-weather-description empty skeleton' />
                <h2 className='current-temperature empty skeleton' />
              </div>
              <div className='weather-img empty skeleton glassmorphism' />
            </>
            )
          : (
            <>
              <h4 className='city-name'>{weatherInformation.cityName}</h4>
              <div className='current-weather glassmorphism'>
                <span className='current-date'>{currentInfo.time}</span>
                <p className='current-weather-description'>
                  {currentInfo.description}
                </p>
                <h2 className='current-temperature'>
                  {weatherInformation?.current_weather?.temperature}°C
                </h2>
              </div>
              <img
                className='weather-img'
                src={currentInfo.weatherImage}
                alt='icon weather'
              />
            </>
            )}
      </div>

      <div className='right'>
        <div className='extra-variables glassmorphism'>
          <div className='variable-detail'>
            <FaWind className='variable-detail-icon' />
            <span className='variable-data-number'>
              {weatherInformation?.current_weather &&
                weatherInformation?.current_weather.windspeed}
              {weatherInformation?.windspeed && weatherInformation?.windspeed}
              km/h
            </span>
            <span className='variable-data-name'>Wind</span>
          </div>
          <div className='variable-detail'>
            <FaTint className='variable-detail-icon' />
            <span className='variable-data-number'>
              {currentInfo.relativeHumidity}%
            </span>
            <span className='variable-data-name'>Humidity</span>
          </div>
          <div className='variable-detail'>
            <FaThermometerThreeQuarters className='variable-detail-icon' />
            <span className='variable-data-number'>
              {currentInfo.apparentTemperature}°C
            </span>
            <span className='variable-data-name'>Feels like</span>
          </div>
        </div>

        <div className='forecast-for-today'>
          <h4 className='forecast-today'>Today</h4>
          <motion.div className='forecast-per-hour slider-container'>
            <motion.div
              className='slider'
              drag='x'
              dragConstraints={{ right: 0, left: -1500 }}
            >
              {todayData.map((item, index) => (
                <motion.div
                  className='forecast-mini-card item glassmorphism'
                  key={index}
                >
                  <span className='forecast-temperature'>
                    {item.temperature}°C
                  </span>

                  <img
                    src={item.weatherImage}
                    alt=''
                    className='forecast-img'
                  />

                  <span className='forecast-hour'>{item.time}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <div className='forecast-for-next-days '>
          <h4 className='forecast-next-days'>Next 7 Days</h4>
          <div className='forecast-for-next-days-container glassmorphism'>
            {nextDaysData.map((item, index) => (
              <div className='forecast-for-next-day-item' key={index}>
                <span className='day-of-week'>{item.time}</span>
                <div className='time-container'>
                  <img src={item.weatherImage} alt='' className='time-img' />
                  <span className='time-description'>{item.description}</span>
                </div>
                <span className='time-date'>
                  {item.temperatureMax}/{item.temperatureMin}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
