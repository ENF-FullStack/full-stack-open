import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (ev) => {
    setTitle(ev.target.value)
  }

  const handleAuthorChange = (ev) => {
    setAuthor(ev.target.value)
  }

  const handleUrlChange = (ev) => {
    setUrl(ev.target.value)
  }

  const addBlog = (ev) => {
    ev.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
    })

    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create new blog</h2>

      <form onSubmit={addBlog}>
        <div>
          Title:
          <input
            id="title-input"
            value={title}
            name="title"
            onChange={handleTitleChange}
            placeholder="title here 123"
          />
        </div>
        <div>
          Author:
          <input
            id="author-input"
            value={author}
            name="author"
            onChange={handleAuthorChange}
            placeholder="author here 456"
          />
        </div>
        <div>
          Url:
          <input
            id="url-input"
            value={url}
            name="url"
            onChange={handleUrlChange}
            placeholder="url here 789"
          />
        </div>
        <button type="submit">Add blog</button>
      </form>
    </div>
  )
}

export default BlogForm
