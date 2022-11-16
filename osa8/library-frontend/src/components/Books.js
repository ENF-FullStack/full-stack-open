import { useState, useEffect } from 'react'
import { ALL_BOOKS } from './queries'
import { useLazyQuery } from '@apollo/client'

const Books = (props) => {
  // const [books, setbooks] = useState([])
  // const [genres, setGenres] = useState([])
  // const [selected, setSelected] = useState('')
  const [filteredBooks, setFilteredBooks] = useState([])
  const [filter, setFilter] = useState('')
  // const bookQuery = useQuery(ALL_BOOKS)
  const [getBooks, result] = useLazyQuery(ALL_BOOKS, {
    fetchPolicy: 'no-cache',
  })

  useEffect(() => {
    if (result.data) {
      // const allBooks = result.data.allBooks
      // setbooks(allBooks)

      // let genres = ['All']
      // allBooks.forEach((book) => {
      //   book.genres.forEach((genre) => {
      //     if (genres.indexOf(genre) === -1) {
      //       genres.push(genre)
      //     }
      //   })
      // })
      // setSelected('All')
      // setGenres(genres)
      setFilteredBooks(result.data.allBooks)
    } else if (filter === '') {
      setFilteredBooks(props.allBooks)
    }
  }, [filter, result, props.allBooks])

  const allGenres = new Set(props.allBooks.map((book) => book.genres).flat())

  const changeFilter = (filter) => {
    setFilter(filter)
    getBooks({ variable: { genre: filter } })
  }

  // useEffect(() => {
  //   if (selected === 'All') {
  //     setFilteredBooks(books)
  //   } else {
  //     setFilteredBooks(
  //       books.filter((book) => book.genres.indexOf(selected) !== -1)
  //     )
  //   }
  // }, [genres, books])

  if (!props.show) {
    return null
  }

  // console.log(filteredBooks)
  // console.log(genres)

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
      {/* <div>
        {genres.length > 0 &&
          genres.map((genre) => (
            <button onClick={() => setSelected(genre)} key={genre}>
              {genre}
            </button>
          ))}
      </div> */}
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
      ></button>
    </div>
  )
}

export default Books
