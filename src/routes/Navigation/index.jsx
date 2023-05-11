import './Navigation.css'
import { Link, Outlet } from 'react-router-dom'
import { useState } from 'react'
import { FaPlus, FaAlignJustify, FaUserMinus, FaUserPlus } from 'react-icons/fa'
import { BiHome } from 'react-icons/bi'
import { useCurrentUser } from '../../hooks/useCurrentUser'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { initialValueToWeatherApp, weatherAppKey } from '../../utils/consts'

export function Navigation () {
  const [toggleMenu, setToggleMenu] = useState(false)
  const { currentUser, setCurrentUser } = useCurrentUser()
  const { setValue } = useLocalStorage(weatherAppKey, initialValueToWeatherApp)

  const handleSignOut = () => {
    setCurrentUser(null)
    setValue(initialValueToWeatherApp)
  }

  const handleToggle = () => {
    setToggleMenu(!toggleMenu)
  }

  window.addEventListener('resize', () => setToggleMenu(false))
  window.addEventListener('scroll', () => setToggleMenu(false))

  return (
    <>
      <header className='header heavy-glassmorphism'>
        <div className='header-menu'>
          <Link to='/'>
            <img src='asd' alt='logo' className='logo' />
          </Link>
          <div className='header-btns'>
            <button className='btn-icon' onClick={handleToggle}>
              <FaAlignJustify />
            </button>
          </div>
        </div>

        <nav
          className={`${
            toggleMenu
              ? 'nav-menu heavy-glassmorphism-menu isActive'
              : 'nav-menu heavy-glassmorphism-menu'
          }`}
        >
          <ul className='nav-items'>
            <li className='nav-item'>
              <Link className='nav-link' to='/'>
                <BiHome />
                <span className='nav-link-text'>Home</span>
              </Link>
            </li>

            {currentUser?.username && (
              <li className='nav-item'>
                <Link className='nav-link add-more' to='/weather-card/add'>
                  <FaPlus />
                  <span className='nav-link-text'>Create</span>
                </Link>
              </li>
            )}

            <li className='nav-item'>
              {currentUser?.username
                ? (
                  <Link className='nav-link' to='login' onClick={handleSignOut}>
                    <FaUserMinus />
                    <span className='nav-link-text'>Logout</span>
                  </Link>
                  )
                : (
                  <Link className='nav-link' to='login'>
                    <FaUserPlus />
                    <span className='nav-link-text'>Login</span>
                  </Link>
                  )}
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </>
  )
}
