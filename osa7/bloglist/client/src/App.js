import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

// import blogService from './services/blogs'
import loginService from './services/login'

import { useDispatch, useSelector } from 'react-redux'
import { fetchBlogs, createBlog } from './reducers/blogReducer'
import { setNotification, setStyle } from './reducers/notificationReducer'
import { emptyUser, fetchUser, logUser } from './reducers/userReducer'
import { fetchAllUsers } from './reducers/usersReducer'

const App = () => {
  const dispatch = useDispatch()

  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)

  let blogArray = [...blogs]
  let sortedBlogs = blogArray.sort((a, b) => {
    return b.likes - a.likes
  })
  console.log('blogs:', sortedBlogs)

  let userArray = [...users]
  console.log('users: ', userArray)

  useEffect(() => {
    dispatch(fetchBlogs())
    dispatch(fetchAllUsers())
  }, [dispatch])

  useEffect(() => {
    const checkUser = dispatch(fetchUser())
    if (checkUser !== null && checkUser.username === user.username) {
      console.log('not null user')
      dispatch(logUser(user))
    }
  }, [])

  const handleLogin = async (ev) => {
    ev.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      dispatch(logUser(user))

      setUserName('')
      setPassword('')
    } catch (exception) {
      dispatch(setStyle('error'))
      dispatch(setNotification('wrong credentials', 5))
    }
  }

  const handleLogout = () => {
    dispatch(emptyUser())
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      dispatch(createBlog(blogObject))
      dispatch(setStyle('task'))
      dispatch(
        setNotification(
          `New blog: ${blogObject.title} by ${blogObject.author}`,
          5
        )
      )
    } catch (exception) {
      dispatch(setStyle('error'))
      dispatch(setNotification(`${exception.error}`, 5))
    }
  }
  const blogFormRef = useRef()

  if (user === null) {
    return (
      <div>
        <Notification />
        <Togglable buttonLabel="login">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUserName(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      </div>
    )
  }

  return (
    <div>
      <h1>Blog app</h1>
      <Notification />
      <div>
        <p>
          {user.name} has logged in
          <button onClick={handleLogout}>Logout</button>
        </p>
        <Togglable id="addblog-button" buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm createBlog={addBlog} />
        </Togglable>
      </div>
      <h2>Users</h2>
      <table id="list-blogs">
        <tr>
          <td />
          <td>
            <strong>blogs created</strong>
          </td>
        </tr>
        {userArray.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </table>
      <h2>Blogs</h2>
      <ul id="list-blogs">
        {sortedBlogs.map((blog) => (
          <Blog key={blog.id} user={user} blog={blog} />
        ))}
      </ul>
    </div>
  )
}

export default App
