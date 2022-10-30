import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from './queries'
import Notify from './Notify'

const LoginForm = ({ setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const [login, result] = useMutation(LOGIN, {
    fetchPolicy: 'no-cache',

    // eslint-disable-next-line no-unused-vars
    // onCompleted: (data) => {
    //   setPage('add')
    // },
    onError: (error) => {
      notify(error.graphQLErrors[0].message)
    },
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
    }
  }, [result.data]) // eslint-disable-line

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const submit = async (ev) => {
    ev.preventDefault()
    login({ variables: { username, password } })

    setUsername('')
    setPassword('')
    // setPage('authors')
  }

  return (
    <div>
      <h2>Login</h2>
      <Notify errorMessage={errorMessage} />
      <form onSubmit={submit}>
        <div>
          username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
