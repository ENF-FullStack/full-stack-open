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

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll()
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

    console.log('logging in with', username, password)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  const handleBlogChange = (ev) => {
    setAuthor(ev.target.value)
    setTitle(ev.target.value)
    setUrl(ev.target.value)
  }

  const addBlog = async () => {
    // ev.preventDefault()
    blogFormRef.current.toggleVisibility()

    const blogObject = {
      title: title,
      author: author,
      url: url,
    }

    try {
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      setNotificationStyle('task')
      setNotificationMessage(
        `New blog: ${blogObject.title} by ${blogObject.author}`
      )
      setTimeout(() => setNotificationMessage(null), 5000)

      setAuthor('')
      setTitle('')
      setUrl('')
    } catch (exception) {
      setNotificationStyle('error')
      setNotificationMessage(`${exception.error}`)
    }
  }

  const loginForm = () => {
    return (
      <div>
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

  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm
        handleTitleChange={({ target }) => setTitle(target.value)}
        handleAuthorChange={({ target }) => setAuthor(target.value)}
        handleUrlChange={({ target }) => setUrl(target.value)}
        title={title}
        author={author}
        url={url}
        handleSubmit={addBlog}
        handleChange={handleBlogChange}
      />
    </Togglable>
  )

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={notificationMessage} style={notificationStyle} />

      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>
            {user.name} has logged in
            <button onClick={handleLogout}>Logout</button>
          </p>{' '}
          {blogForm()}
        </div>
      )}
      <h2>Blogs</h2>
      <ul>
        {blogs.map((blog) => (
          <Blog key={blog.id} user={user} blog={blog} />
        ))}
      </ul>
    </div>
  )
}

export default App
