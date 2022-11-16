import { useQuery } from '@apollo/client'
// import { useEffect, useState } from 'react'
import { ME, ALL_BOOKS } from './queries'

const Recommend = (props) => {
  // const { data: meData } = useQuery(ME)

  // const { data: booksData } = useQuery(ALL_BOOKS, {
  //   fetchPolicy: 'no-cache',
  //   variables: { genre: meData?.me?.favoriteGenre },
  //   skip: !meData?.me?.favoriteGenre,
  // })

  const user = useQuery(ME)
  const books = useQuery(ALL_BOOKS)

  // const [recommendBooks, setRecommendBooks] = useState([])
  // const [favoriteGenre, setFavoriteGenre] = useState('')

  // useEffect(() => {
  //   if (meData.me.favoriteGenre) {
  //     setFavoriteGenre(meData.me.favoriteGenre)
  //     const { data: meData } = useQuery(ME)
  //   }
  // }, [ME])

  // useEffect(() => {
  //   if (booksData.allBooks) {
  //     setRecommendBooks(booksData.allBooks)
  //   }
  // }, [ALL_BOOKS])

  if (!props.show || !user.data || !books.data) {
    return null
  }

  if (user.loading || books.loading) {
    return <div>Loading...</div>
  }

  if (user.error || books.error) {
    return <p>Something went wrong</p>
  }

  const favoriteGenre = user?.data?.me?.favoriteGenre
  const recommendBooks = books.data.allBooks.filter((b) =>
    b.genres.includes(favoriteGenre)
  )

  console.log('fav: ', favoriteGenre)
  console.log('rec:', recommendBooks)

  return (
    <div>
      <h2>Recommendations</h2>
      <p>
        books in your favorite genre <b>{favoriteGenre}</b>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {recommendBooks.map((b) => (
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
