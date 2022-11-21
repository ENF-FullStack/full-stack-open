import { useQuery } from '@apollo/client'
import { ME, ALL_BOOKS } from './queries'

const Recommend = (props) => {

  const user = useQuery(ME)
  const books = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }

  if (user.loading || books.loading) return <div>Loading...</div>

  const userGenre = user.data.me.favoriteGenre
  const recBooks = books.data.allBooks.filter((book) => book.genres.includes(userGenre))


  return (
    <div>
      <h2>Recommendations</h2>
      <p>
        books in your favorite genre <b>{userGenre}</b>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {recBooks.map((b) => (
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
