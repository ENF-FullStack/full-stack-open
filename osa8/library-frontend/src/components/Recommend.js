import { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ME, FAV_BOOKS } from './queries'

const Recommend = (props) => {
  const [favBooks, result] = useLazyQuery(FAV_BOOKS)
  const [me, setMe] = useState(null)
  const [myBooks, setMyBooks] = useState([])
  //   const user = useQuery(ME)

  useQuery(ME, {
    onCompleted: ({ me }) => {
      setMe(me)
      favBooks({ variables: { genre: me.favoriteGenre } })
    },
  })

  useEffect(() => {
    if (result.data) setMyBooks(result.data.allBooks)
  }, [result])

  //   useEffect(() => {
  //     if (user.data) {
  //       favBooks({ variables: { genre: user.data.me.favouriteGenre } })
  //     }
  //   }, [favBooks, user])

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <p>{me.favoriteGenre}</p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {myBooks.map((b) => {
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend
