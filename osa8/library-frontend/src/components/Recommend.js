// import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ME, ALL_BOOKS } from './queries'

const Recommend = (props) => {
  // const [favBooks, result] = useLazyQuery(FAV_BOOKS)
  // const [me, setMe] = useState(null)
  // const [myBooks, setMyBooks] = useState([])
  const { data: meData } = useQuery(ME)

  const { data: booksData } = useQuery(ALL_BOOKS, {
    variables: { genre: meData?.me?.favoriteGenre },
    skip: !meData?.me?.favoriteGenre,
  })

  // useQuery(ME, {
  //   onCompleted: ({ me }) => {
  //     setMe(me)
  //     if (me.favoriteGenre !== null)
  //       favBooks({ variables: { genre: me.favoriteGenre } })
  //   },
  // })

  // useEffect(() => {
  //   if (result.data) setMyBooks(result.data.allBooks)
  // }, [result])

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
          {data.map((b) => {
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
