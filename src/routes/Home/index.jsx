import './Home.css'
import { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { Cards } from '../../components/Cards'
import { useWeather } from '../../hooks/useWeather'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { initialValueToWeatherApp, weatherAppKey } from '../../utils/consts'
import { useCurrentUser } from '../../hooks/useCurrentUser'

export function Home () {
  const { weathers, setWeathers } = useWeather()
  const { storedValue } = useLocalStorage(weatherAppKey, initialValueToWeatherApp)
  const { setCurrentUser } = useCurrentUser()
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (storedValue) {
      setCurrentUser(storedValue.user)
      setWeathers(storedValue.weathers)
    }
  }, [])

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  return (
    <main className='main-container'>
      <form className='form-filter '>
        <FaSearch className='icon-search' />
        <input
          placeholder='Search'
          type='search'
          className='input-to-filter'
          onChange={handleSearch}
          value={search}
        />
      </form>
      <Cards cards={weathers} search={search} />
    </main>
  )
}
