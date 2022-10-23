import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

// import store from './store'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBlogs, createBlog } from './reducers/blogReducer'
import { setNotification, setStyle } from './reducers/notificationReducer'

const App = () => {
  const dispatch = useDispatch()

  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogs = useSelector((state) => state.blogs)
  let blogArray = [...blogs]
  let sortedBlogs = blogArray.sort((a, b) => {
    return b.likes - a.likes
  })

  useEffect(() => {
    dispatch(fetchBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (ev) => {
    ev.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))

      blogService.setToken(user.token)

      setUser(user)
      setUserName('')
      setPassword('')
    } catch (exception) {
      dispatch(setStyle('error'))
      dispatch(setNotification('wrong credentials', 5))
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
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

  return (
    <div>
      <h1>Blogs</h1>
      <Notification />

      {user === null ? (
        <Togglable buttonLabel="login">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUserName(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      ) : (
        <div>
          <p>
            {user.name} has logged in
            <button onClick={handleLogout}>Logout</button>
          </p>
          <Togglable
            id="addblog-button"
            buttonLabel="new blog"
            ref={blogFormRef}
          >
            <BlogForm createBlog={addBlog} />
          </Togglable>
        </div>
      )}
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
