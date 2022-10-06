import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationStyle, setNotificationStyle] = useState(null)
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  // const [refresh, setRefresh] = useState('')

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll()
      sortBlogs(blogs)
      setBlogs(blogs)
    }
    fetchBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const sortBlogs = (blogs) => {
    blogs.sort((a, b) => {
      return b.likes - a.likes
    })
    setBlogs(blogs)
  }

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
      setNotificationStyle('error')
      setNotificationMessage('wrong credentials')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      setNotificationStyle('task')
      setNotificationMessage(
        `New blog: ${blogObject.title} by ${blogObject.author}`
      )
      setTimeout(() => setNotificationMessage(null), 5000)
    } catch (exception) {
      setNotificationStyle('error')
      setNotificationMessage(`${exception.error}`)
    }
  }
  const blogFormRef = useRef()

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={notificationMessage} style={notificationStyle} />

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
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
        </div>
      )}
      <h2>Blogs</h2>
      <ul>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            user={user}
            blog={blog}
            setBlogs={setBlogs}
            sortBlogs={sortBlogs}
          />
        ))}
      </ul>
    </div>
  )
}

export default App
