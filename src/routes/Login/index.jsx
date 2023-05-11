import './Login.css'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useCurrentUser } from '../../hooks/useCurrentUser'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { initialValueToWeatherApp, weatherAppKey } from '../../utils/consts'

export function Login () {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { setCurrentUser } = useCurrentUser()
  const { storedValue, setValue } = useLocalStorage(weatherAppKey, initialValueToWeatherApp)

  const navigate = useNavigate()

  const onSubmit = (user) => {
    if (storedValue?.user?.username === user.username &&
      storedValue?.user?.password === user.password) {
      setCurrentUser({ username: storedValue.user.username })
      navigate('/')
      return
    }

    setValue({ user: { username: user.username, password: user.password }, weathers: [] })
    setCurrentUser({ username: user.username })
    navigate('/')
  }

  return (
    <section className='sesion-container'>
      <div className='box'>
        {
          [1, 2, 3, 4].map(item => (
            <div key={item} className='square' style={{ '--i': item }} />
          ))
        }

        <div className='container glassmorphism'>
          <div className='form'>
            <h2>Login Form</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='input__box'>
                <input
                  type='text'
                  placeholder='Username'
                  {...register('username', {
                    required: 'Must enter a username'
                  })}
                />
                <p className='error-msg'>{errors.username?.message}</p>
              </div>
              <div className='input__box'>
                <input
                  type='password'
                  placeholder='Password'
                  {...register('password', {
                    required: 'Must enter a password'
                  })}
                />
                <p className='error-msg'>{errors.password?.message}</p>
              </div>
              <div className='input__box'>
                <input type='submit' value='Submit' />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
