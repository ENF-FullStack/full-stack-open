/* eslint-disable no-unused-vars */
import LoginForm from './LoginForm'
import BlogForm from './BlogForm'
import Blog from './Blog'
import Togglable from './Togglable'

import { fetchBlogs, createBlog } from '../reducers/blogReducer'

import { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification, setStyle } from '../reducers/notificationReducer'

// TODO refactor App>Main>LoginForm/BlogForm/Blog

const Main = () => {
  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)

  const blogFormRef = useRef()

  const addBlog = async (blogObject) => {
    const dispatch = useDispatch()
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

  return (
    <>
      {user === null ? (
        <LoginForm />
      ) : (
        <div>
          <Togglable
            id="addblog-button"
            buttonLabel="new blog"
            ref={blogFormRef}
          >
            <BlogForm createBlog={addBlog} />
          </Togglable>
          {[...blogs]
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog key={blog.id} blog={blog} user={user} />
            ))}
        </div>
      )}
    </>
  )
}

export default Main
