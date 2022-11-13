import loginService from '../services/login'
import blogService from '../services/blogs'

import { setLoggedUser } from '../reducers/loggedUserReducer'
import { logUser } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import { setNotification, setStyle } from '../reducers/notificationReducer'

const LoginForm = () => {
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const username = event.target.username.value
      const password = event.target.password.value

      const user = await loginService.login({
        username,
        password,
      })

      // window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setLoggedUser(user))
      dispatch(logUser(user))

      event.target.username.value = ''
      event.target.password.value = ''
    } catch (exception) {
      dispatch(setStyle('error'))
      dispatch(setNotification('wrong credentials', 5))
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input id="username" type="text" name="Username" />
        </div>
        <div>
          password
          <input id="password" type="password" name="Password" />
        </div>
        <button id="login-button" type="submit">
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
