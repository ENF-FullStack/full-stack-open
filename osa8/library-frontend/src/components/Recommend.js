import { useQuery, useLazyQuery } from '@apollo/client'
import { useState, useEffect } from 'react'
import { ME, ALL_BOOKS_GENRE } from './queries'

const Recommend = (props) => {
  const user = useQuery(ME)
  const [getBooks, result] = useLazyQuery(ALL_BOOKS_GENRE, {
    fetchPolicy: 'no-cache',
  })
  const [favouriteBooks, setFavouriteBooks] = useState([])

  useEffect(() => {
    if (result.data) {
      setFavouriteBooks(result.data.allBooks)
    }
  }, [setFavouriteBooks, result])

  useEffect(() => {
    if (user.data && !user.data === undefined) {
      getBooks({ variables: { genre: user.data.me.favouriteGenre } })
    }
  }, [getBooks, user])

  if (!props.show) {
    return null
  }

  if(!user.data) {
    console.log('user.data: ' ,user.data)
    return null
  } else { console.log('not null') }

  // console.log('user.data' ,user.data)
  // console.log('favbooks' ,favouriteBooks)

  return (
    <div>
      <h2>Recommendations</h2>
      <p>
        books in your favorite genre <b>{user.data.me.favouriteGenre}</b>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {favouriteBooks.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend
