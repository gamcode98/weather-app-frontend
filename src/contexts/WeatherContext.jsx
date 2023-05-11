import { createContext, useState } from 'react'

export const WeatherContext = createContext()

export const WeatherProvider = ({ children }) => {
  const [weathers, setWeathers] = useState([])

  return (
    <WeatherContext.Provider value={{
      weathers,
      setWeathers
    }}
    >
      {children}
    </WeatherContext.Provider>
  )
}
