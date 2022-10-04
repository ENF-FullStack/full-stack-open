const Blog = ({ blog }) => (
  <div>
    {blog.title} by {blog.author} <br />
    Url: {blog.url} <br />
    Likes: {blog.likes}
  </div>
)

export default Blog
