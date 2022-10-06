import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, user, setBlogs, sortBlogs }) => {
  const [showDetails, setShowDetails] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

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
    blog.likes = likes + 1
    const response = await blogService.addLike(blog)
    setLikes(response.likes)
    const blogs = await blogService.getAll()
    // setBlogs(blogs)
    sortBlogs(blogs)
  }

  const handleRemove = async () => {
    const token = user.token
    const id = blog.id

    const checkRemove = window.confirm(`Confirm to remove ${blog.title}`)
    if (checkRemove) {
      const response = await blogService.removeBlog({ token, id })
      console.log(response)
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
  }

  const RemoveButton = () => {
    if (blog.user.username === user.username) {
      return (
        <button id="removebutton" onClick={handleRemove}>
          Remove
        </button>
      )
    }
  }

  if (showDetails === false) {
    return (
      <div style={blogStyle}>
        <div className="blog">
          {blog.title} by {blog.author}
          <button id="show" onClick={toggleDetails}>
            View
          </button>
        </div>
      </div>
    )
  } else {
    return (
      <div style={blogStyle}>
        <div className="blog">
          {blog.title} by {blog.author}
          <button id="hide" onClick={toggleDetails}>
            Hide
          </button>
        </div>
        <div className="blog">{blog.url}</div>
        <div className="blog">
          Likes: {blog.likes}
          <button id="likebutton" onClick={handleLike}>
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
