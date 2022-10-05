const BlogForm = ({
  handleSubmit,
  title,
  author,
  url,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
}) => {
  return (
    <div>
      <h2>Create new blog</h2>

      <form onSubmit={handleSubmit}>
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
