import { useState, useEffect } from 'react'
import { useApolloClient, useSubscription } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Notify from './components/Notify'
import Recommend from './components/Recommend'

import { ALL_BOOKS, BOOK_ADDED } from './components/queries'

export const updateCache = (cache, query, addedBook) => {
  const uniqByTitle = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }
  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByTitle(allBooks.concat(addedBook)),
    }
  })
}

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  // const result = useQuery(ALL_BOOKS)

  useEffect(() => {
    const fetchToken = localStorage.getItem('library-user-token', token)
    if (fetchToken) setToken(fetchToken)
  }, [token])

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

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded
      notify(`${addedBook.title} put to library`)
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
    },
  })

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <div>
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
