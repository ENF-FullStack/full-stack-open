import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)
  const id = useParams().id
  const list = blogs.filter((blog) => blog.user.id === id)
  return (
    <div>
      <h2>blogs by user</h2>
      <ul>
        {list.map((blog) => (
          <li key={blog.id}>
            {blog.title} by {blog.author}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BlogList
