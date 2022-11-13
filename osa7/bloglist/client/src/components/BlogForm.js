import { useDispatch } from 'react-redux'
import { createBlog, fetchBlogs } from '../reducers/blogReducer'
import { setNotification, setStyle } from '../reducers/notificationReducer'

const BlogForm = () => {
  const dispatch = useDispatch()

  const addBlog = async (event) => {
    event.preventDefault()
    try {
      await dispatch(
        createBlog({
          title: event.target.title.value,
          author: event.target.author.value,
          url: event.target.url.value,
        })
      )
      dispatch(fetchBlogs)
      dispatch(setStyle('task'))
      dispatch(
        setNotification(
          `New blog: ${event.target.title.value} by ${event.target.author.value}`,
          5
        )
      )
    } catch (exception) {
      dispatch(setStyle('error'))
      dispatch(setNotification(`${exception.error}`, 5))
    }

    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
  }

  return (
    <div>
      <h2>Create new blog</h2>

      <form onSubmit={addBlog}>
        <div>
          Title:
          <input id="title-input" name="title" placeholder="title here 123" />
        </div>
        <div>
          Author:
          <input
            id="author-input"
            name="author"
            placeholder="author here 456"
          />
        </div>
        <div>
          Url:
          <input id="url-input" name="url" placeholder="url here 789" />
        </div>
        <button id="saveblog-button" type="submit">
          Add blog
        </button>
      </form>
    </div>
  )
}

export default BlogForm
