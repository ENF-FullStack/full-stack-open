import { useState } from 'react'

const Blog = ({ blog, user }) => {
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

  if (showDetails === false) {
    return (
      <div style={blogStyle}>
        <div>
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
        <div>
          {blog.title} by {blog.author}
          <button id="hide" onClick={toggleDetails}>
            Hide
          </button>
        </div>
        <div>{blog.url}</div>
        <div>
          Likes: {blog.likes}
          <button id="likebutton">Like</button>
        </div>
        <div>{user.name}</div>
      </div>
    )
  }
}

export default Blog
