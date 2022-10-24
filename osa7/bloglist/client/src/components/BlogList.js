import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)
  const id = useParams().id
  console.log(blogs)
  const list = blogs.filter((blog) => blog.user.id === id)
  console.log(list)
  return (
    <div>
      <h2>Blogs by </h2>
      {list.map((blog) => (
        <p key={blog.id}>
          {blog.title} by {blog.author}
        </p>
      ))}
    </div>
  )
}

export default BlogList
