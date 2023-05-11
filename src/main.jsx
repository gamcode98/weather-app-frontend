import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './contexts/UserContext.jsx'
import './index.css'
import { WeatherProvider } from './contexts/WeatherContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <WeatherProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </WeatherProvider>
    </UserProvider>
  </React.StrictMode>
)
