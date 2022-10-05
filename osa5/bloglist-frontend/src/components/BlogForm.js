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
            id="title"
            value={title}
            name="title"
            onChange={handleTitleChange}
          />
        </div>
        <div>
          Author:
          <input
            id="author"
            value={author}
            name="author"
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          Url:
          <input id="url" value={url} name="url" onChange={handleUrlChange} />
        </div>
        <button type="submit">Add blog</button>
      </form>
    </div>
  )
}

export default BlogForm
