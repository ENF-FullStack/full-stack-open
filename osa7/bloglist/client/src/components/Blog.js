import { useState } from 'react'
// import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { fetchBlogs } from '../reducers/blogReducer'

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()

  const [showDetails, setShowDetails] = useState(false)

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleLike = async () => {
    let newLike = blog.likes + 1
    blog = { ...blog, likes: newLike }
    dispatch(likeBlog(blog))
  }

  const handleRemove = async () => {
    const token = user.token
    const id = blog.id

    const checkRemove = window.confirm(`Confirm to remove ${blog.title}`)
    if (checkRemove) {
      await dispatch(deleteBlog({ token, id }))
      dispatch(fetchBlogs())
    }
  }

  const RemoveButton = () => {
    if (user !== null) {
      if (blog.user.username === user.username) {
        return (
          <button id="remove-button" onClick={handleRemove}>
            Remove
          </button>
        )
      }
    }
    return
  }

  if (showDetails === false) {
    return (
      <div style={blogStyle}>
        <div className="blog-item">
          {blog.title} by {blog.author}
          <button id="viewblog-button" onClick={toggleDetails}>
            View
          </button>
        </div>
      </div>
    )
  } else {
    return (
      <div style={blogStyle}>
        <div className="blog-item">
          {blog.title} by {blog.author}
          <button id="hide" onClick={toggleDetails}>
            Hide
          </button>
        </div>
        <div className="blog">{blog.url}</div>
        <div className="likes">
          Likes: {blog.likes}
          <button id="like-button" onClick={handleLike}>
            Like
          </button>
        </div>
        <div>{blog.user.name}</div>
        <div>
          <RemoveButton />
        </div>
      </div>
    )
  }
}

export default Blog
