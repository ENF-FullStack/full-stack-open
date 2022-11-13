/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Notification from './components/Notification'
import BlogList from './components/BlogList'
import Main from './components/Main'
import UserList from './components/UserList'
import blogService from './services/blogs'

import { fetchBlogs } from './reducers/blogReducer'
import { fetchAllUsers } from './reducers/usersReducer'
import { emptyUser, logUser } from './reducers/userReducer'
import { setLoggedUser } from './reducers/loggedUserReducer'

const App = () => {
  const dispatch = useDispatch()

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

  const handleLogout = async (ev) => {
    ev.preventDefault()
    window.localStorage.removeItem('loggedBlogUser')

    dispatch(emptyUser(user))
    blogService.setToken('')
    dispatch(setLoggedUser(null))
    console.log('logout user: ', user.name)
    console.log('logout token: ', user.token)
  }

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
