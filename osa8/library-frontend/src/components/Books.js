import { useState, useEffect } from 'react'
import { ALL_BOOKS } from './queries'
import { useLazyQuery } from '@apollo/client'

const Books = (props) => {
  const [filteredBooks, setFilteredBooks] = useState([])
  const [filter, setFilter] = useState('')
  const [getBooks, result] = useLazyQuery(ALL_BOOKS, {
    fetchPolicy: 'no-cache',
  })

  useEffect(() => {
    if (result.data) {
      setFilteredBooks(result.data.allBooks)
    } else if (filter === '') {
      setFilteredBooks(props.allBooks)
    }
  }, [filter, result, props.allBooks])

  const allGenres = new Set(props.allBooks.map((book) => book.genres).flat())

  const changeFilter = (filter) => {
    setFilter(filter)
    getBooks({ variables: { genre: filter } })
  }

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>
      {!!filter && (
        <div>
          show books in genre: <b>{filter}</b>
        </div>
      )}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {[...allGenres].map((genre) => (
        <button
          key={genre}
          onClick={() => changeFilter(genre)}
          className={genre === filter ? 'active' : ''}
        >
          {genre}
        </button>
      ))}
      <button
        onClick={() => changeFilter('')}
        className={!filter ? 'active' : ''}
      >All</button>
    </div>
  )
}

export default Books
