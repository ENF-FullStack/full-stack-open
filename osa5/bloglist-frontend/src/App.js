import { useState, useEffect } from 'react'

import blogService from './services/blogs'
import loginService from './services/login'

import Blog from './components/Blog'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
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

  const handleLogin = async (ev) => {
    ev.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      blogService.setToken(user.token)

      setUser(user)
      setUserName('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

    console.log('logging in with', username, password)
  }

  const handleAuthorChange = (ev) => {
    setAuthor(ev.target.value)
  }

  const handleTitleChange = (ev) => {
    setTitle(ev.target.value)
  }

  const handleUrlChange = (ev) => {
    setUrl(ev.target.value)
  }

  const addBlog = (ev) => {
    ev.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url,
    }

    blogService.create(blogObject).then((returnBlogs) => {
      setBlogs(blogs.concat(returnBlogs))
      setAuthor('')
      setTitle('')
      setUrl('')
    })
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUserName(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  )

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        Title:
        <input
          id="title"
          value={title}
          name="title"
          onChange={handleTitleChange}
        />
      </div>
      <div>
        Author:
        <input
          id="author"
          value={author}
          name="author"
          onChange={handleAuthorChange}
        />
      </div>
      <div>
        Url:
        <input id="url" value={url} name="url" onChange={handleUrlChange} />
      </div>
      <button type="submit">Add blog</button>
    </form>
  )

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={errorMessage} />

      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} has logged in</p> {blogForm()}
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
