import { useQuery } from '@apollo/client'
import { ME, ALL_BOOKS } from './queries'

const Recommend = (props) => {
  const { data: meData } = useQuery(ME)

  const { data: booksData } = useQuery(ALL_BOOKS, {
    fetchPolicy: 'no-cache',
    variables: { genre: meData?.me?.favoriteGenre },
    skip: !meData?.me?.favoriteGenre,
  })
  console.log('booksData: ', booksData)
  console.log(booksData?.allBooks)

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <p>{meData.me.favoriteGenre}</p>
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
