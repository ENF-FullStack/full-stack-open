import { useState, useEffect } from 'react'
import { ALL_BOOKS } from './queries'
import { useQuery } from '@apollo/client'

const Books = (props) => {
  const [books, setbooks] = useState([])
  const [filteredBooks, setFilteredBooks] = useState([])
  const [genres, setGenres] = useState([])
  const [selected, setSelected] = useState('')
  const bookQuery = useQuery(ALL_BOOKS)

  useEffect(() => {
    if (bookQuery.data) {
      const allBooks = bookQuery.data.allBooks
      setbooks(allBooks)

      let genres = ['All']
      allBooks.forEach((book) => {
        book.genres.forEach((genre) => {
          if (genres.indexOf(genre) === -1) {
            genres.push(genre)
          }
        })
      })
      setSelected('All')
      setGenres(genres)
    }
  }, [bookQuery])

  useEffect(() => {
    if (selected === 'All') {
      setFilteredBooks(books)
    } else {
      setFilteredBooks(
        books.filter((book) => book.genres.indexOf(selected) !== -1)
      )
    }
  }, [books, selected])

  if (!props.show) {
    return null
  }

  if (bookQuery.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>books</h2>
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
      <div>
        {genres.length > 0 &&
          genres.map((genre) => (
            <button onClick={() => setSelected(genre)} key={genre}>
              {genre}
            </button>
          ))}
      </div>
    </div>
  )
}

export default Books
