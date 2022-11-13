import { useDispatch, useSelector } from 'react-redux'
import { fetchAllUsers } from '../reducers/usersReducer'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const UserList = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)

  useEffect(() => {
    dispatch(fetchAllUsers)
  }, [dispatch])

  return (
    <div>
      <table id="list-blogs">
        <thead>
          <tr>
            <td />
            <td>
              <strong>blogs created</strong>
            </td>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr key={user.id}>
                <td>
                  <Link to={`/blogs/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserList
