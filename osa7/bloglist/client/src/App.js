/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from 'react'

import Notification from './components/Notification'
// import LoginForm from './components/LoginForm'
// import Togglable from './components/Togglable'
import BlogList from './components/BlogList'
import Main from './components/Main'
import UserList from './components/UserList'

import { Routes, Route, Link } from 'react-router-dom'

import blogService from './services/blogs'
// import loginService from './services/login'

import { useDispatch, useSelector } from 'react-redux'
import { fetchBlogs, createBlog } from './reducers/blogReducer'
// import { setNotification, setStyle } from './reducers/notificationReducer'

import { emptyUser, logUser } from './reducers/userReducer'
import { fetchAllUsers } from './reducers/usersReducer'
import { setLoggedUser } from './reducers/loggedUserReducer'

const App = () => {
  const dispatch = useDispatch()

  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const blogs = useSelector((state) => state.blogs)
  const users = useSelector((state) => state.users)
  const user = useSelector((state) => state.user)

  let blogArray = [...blogs]
  let sortedBlogs = blogArray.sort((a, b) => {
    return b.likes - a.likes
  })

  // let userArray = [...users]

  useEffect(() => {
    dispatch(fetchBlogs())
    dispatch(fetchAllUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setLoggedUser(user))
      dispatch(logUser(user))
      blogService.setToken(user.token)
      // console.log('useEffect name: ', user.name)
      // console.log('useEffect token: ', user.token)
    }
  }, [])

  // const handleLogin = async (ev) => {
  //   ev.preventDefault()

  //   try {
  //     const user = await loginService.login({
  //       username,
  //       password,
  //     })

  //     // window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
  //     blogService.setToken(user.token)
  //     dispatch(setLoggedUser(user))
  //     dispatch(logUser(user))

  //     setUserName('')
  //     setPassword('')
  //   } catch (exception) {
  //     dispatch(setStyle('error'))
  //     dispatch(setNotification('wrong credentials', 5))
  //   }
  // }

  //! logout does not clear user or token
  const handleLogout = async (ev) => {
    ev.preventDefault()
    window.localStorage.removeItem('loggedBlogUser')

    dispatch(emptyUser(user))
    blogService.setToken('')
    dispatch(setLoggedUser(null))
    console.log('logout user: ', user.name)
    console.log('logout token: ', user.token)
  }

  // const blogFormRef = useRef()

  // TODO refactor login

  // if (user === null) {
  //   return (
  //     <div>
  //       <Notification />
  //       <Togglable buttonLabel="login">
  //         <LoginForm
  //           username={username}
  //           password={password}
  //           handleUsernameChange={({ target }) => setUserName(target.value)}
  //           handlePasswordChange={({ target }) => setPassword(target.value)}
  //           handleSubmit={handleLogin}
  //         />
  //       </Togglable>
  //     </div>
  //   )
  // }

  return (
    <div>
      <h1>Blog app</h1>
      <Notification />

      {user && (
        <div>
          <p>
            {user.name} has logged in
            <button onClick={handleLogout}>Logout</button>
          </p>
        </div>
      )}
      <Link to="/">
        <h2>Blogs</h2>
      </Link>
      <Link to="/users">
        <h2>Users</h2>
      </Link>

      <Routes>
        <Route path="/blogs/:id" element={<BlogList />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/" element={<Main />} />
      </Routes>
    </div>
  )
}

export default App
