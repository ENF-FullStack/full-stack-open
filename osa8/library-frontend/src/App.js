import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Notify from './components/Notify'
import Recommend from './components/Recommend'
import { useApolloClient } from '@apollo/client'

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  return (
    <div>
      <div>
        <Notify errorMessage={errorMessage} />
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && (
          <button onClick={() => setPage('recommend')}>recommend</button>
        )}
        {token && <button onClick={() => logout()}>logout</button>}
        {!token && <button onClick={() => setPage('login')}>login</button>}
      </div>

      <Notify message={errorMessage} />

      <Authors show={page === 'authors'} />
      <Books show={page === 'books'} />

      <Recommend show={page === 'recommend'} />

      <NewBook show={page === 'add'} />

      {page === 'login' && (
        <LoginForm
          show={page === 'login'}
          setToken={setToken}
          setPage={setPage}
          setError={notify}
        />
      )}
    </div>
  )
}

export default App
