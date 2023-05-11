const SERVER_URL = 'https://weather-app-psi-jade.vercel.app/images'

export const getWeatherIconByCode = ({ code }) => {
  return fetch(`${SERVER_URL}/${code}`)
    .then(response => response.json())
    .then(data => { return data })
}

export const getAllWeatherIcons = () => {
  return fetch(SERVER_URL)
    .then(response => response.json())
    .then(data => { return data })
}
