import { ALL_AUTHORS } from './queries'
import { useQuery } from '@apollo/client'
import AuthorEdit from './AuthorEdit'

const Authors = (props) => {
  const authorQuery = useQuery(ALL_AUTHORS)

  if (!props.show) {
    return null
  }

  if (authorQuery.loading) {
    return <div>loading...</div>
  }

  // const authors = authorQuery.data.allAuthors || []
  const authors = authorQuery

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <AuthorEdit authors={authors.map((author) => author.name)} />
    </div>
  )
}

export default Authors
