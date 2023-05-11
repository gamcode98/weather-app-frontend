import { Route, Routes } from 'react-router-dom'
import { Login } from './routes/Login'
import { Home } from './routes/Home'
import { Navigation } from './routes/Navigation'
import { AddCard } from './routes/AddCard'
import { CardDetails } from './routes/CardDetails'

function App () {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
        <Route path='/weather-card/add' element={<AddCard />} />
        <Route path='/weather-card/details' element={<CardDetails />} />
      </Route>
    </Routes>
  )
}

export default App
