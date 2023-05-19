import './Home.css'
import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { Cards } from '../../components/Cards'
import { useDefaultInfo } from '../../hooks/useDefaultInfo'

export function Home () {
  const { weathers, originalWeathers } = useDefaultInfo()
  const [search, setSearch] = useState('')

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const filteredWeathers = weathers.filter(weather => {
    return weather.cityName.toLowerCase().includes(search.toLowerCase())
  })

  return (
    <main className='main-container'>
      <form className='form-filter '>
        <FaSearch className='icon-search' />
        <input
          placeholder='Search by city name'
          type='search'
          className='input-to-filter'
          onChange={handleSearch}
          value={search}
        />
      </form>
      <Cards cards={filteredWeathers} search={search} />
    </main>
  )
}
