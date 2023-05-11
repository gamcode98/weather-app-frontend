const SERVER_URL = 'https://api.open-meteo.com/v1/forecast?'

export const getWeather = ({ latitude, longitude }) => {
  return fetch(`${SERVER_URL}current_weather=true&latitude=${latitude}&longitude=${longitude}&timezone=America/Argentina/Jujuy`)
    .then(response => response.json())
    .then(data => { return data })
}

export const getDetailsWeather = ({ latitude, longitude }) => {
  return fetch(`${SERVER_URL}latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum&current_weather=true&timezone=America/Argentina/Jujuy`)
    .then(response => response.json())
    .then(data => { return data })
}
