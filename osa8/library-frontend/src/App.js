import { useApolloClient } from '@apollo/client'
import { useState, useEffect } from 'react'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
// import Notify from './components/Notify'
// import { ALL_AUTHORS } from './components/queries'

const App = () => {
  // const result = useQuery(ALL_AUTHORS)
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const client = useApolloClient()

  useEffect(() => {
    const savedToken = localStorage.getItem('library-user-token', token)
    if (savedToken) {
      setToken(savedToken)
    }
  }, [token])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    console.log('cleared')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => logout()}>logout</button>
          </>
        ) : (
          <>
            <button onClick={() => setPage('login')}>login</button>
          </>
        )}
      </div>

      <Authors show={page === 'authors'} />
      <Books show={page === 'books'} />
      <NewBook show={page === 'add'} />

      {page === 'login' && (
        <LoginForm
          show={page === 'login'}
          setToken={setToken}
          setPage={setPage}
        />
      )}
    </div>
  )
}

export default App
