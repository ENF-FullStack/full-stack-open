import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { ME, ALL_BOOKS } from './queries'

const Recommend = (props) => {
  const { data: meData } = useQuery(ME)

  const { data: booksData } = useQuery(ALL_BOOKS, {
    fetchPolicy: 'no-cache',
    variables: { genre: meData?.me?.favoriteGenre },
    skip: !meData?.me?.favoriteGenre,
  })

  const [recommendBooks, setRecommendBooks] = useState([])
  const [favoriteGenre, setFavoriteGenre] = useState('')

  useEffect(() => {
    if(meData) {
      setFavoriteGenre(meData?.me.favoriteGenre)
    }
  }, [ME, favoriteGenre])

  useEffect(() => {
    if(booksData) {
      setRecommendBooks(booksData)
    }
  }, [ALL_BOOKS])

  if (!props.show) {
    return null
  }

  console.log('fav: ', favoriteGenre)
  console.log('rec:', recommendBooks)

  return (
    <div>
      <h2>Recommendations</h2>
      <p>Genre: <b>{favoriteGenre}</b></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksData?.allBooks.map((b) => (
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
