import { useState, useEffect } from 'react'
import { UPDATE_AUTHOR, ALL_AUTHORS } from './queries'
import { useMutation } from '@apollo/client'
import Notify from './Notify'

const AuthorEdit = ({ authors }) => {
  const [updateAuthor, result] = useMutation(UPDATE_AUTHOR, {
    onError: (error) => {
      const message =
        error.graphQLErrors.length > 0
          ? error.graphQLErrors[0].message
          : 'Update author birthyear'
      notify(message)
    },
    update: (cache, response) => {
      const dataAuthors = cache.readQuery({ query: ALL_AUTHORS })
      const editAuthor = response.data.editAuthor
      cache.writeQuery({
        query: ALL_AUTHORS,
        data: {
          allAuthors: dataAuthors.allAuthors.map((author) =>
            author.name === editAuthor.name ? editAuthor : author
          ),
        },
      })
    },
  })

  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const submit = (ev) => {
    ev.preventDefault()
    updateAuthor({ variables: { name, setBornTo: parseInt(born) } })

    setName('')
    setBorn('')
  }

  useEffect(() => {
    if (result.data === null) {
      Notify('No author found!')
    }
  }, [result.data])

  const notify = (message) => {
    setErrorMessage(message)
    // eslint-disable-next-line no-undef
    setTimeOut(() => {
      setErrorMessage(null)
    }, 5000)
  }

  return (
    <div>
      <h2>set birthyear</h2>
      <Notify errorMessage={errorMessage} />
      <form onSubmit={submit}>
        <div>
          name
          <select value={name} onChange={({ target }) => setName(target.value)}>
            {authors.map((name, index) => (
              <option key={index} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default AuthorEdit
