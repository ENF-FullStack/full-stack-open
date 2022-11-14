/* eslint-disable no-unused-vars */
import LoginForm from './LoginForm'
import BlogForm from './BlogForm'
import Blog from './Blog'
import Togglable from './Togglable'

import { useRef } from 'react'
import { useSelector } from 'react-redux'

// TODO refactor App>Main>LoginForm
// TODO refactor App>Main>BlogForm>Blog

const Main = () => {
  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)

  const blogFormRef = useRef()

  // console.log('user check: ', user)
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
            <BlogForm />
          </Togglable>
          <br />
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
