import { useState } from 'react'
import { UPDATE_AUTHOR, ALL_AUTHORS } from './queries'
import { useMutation } from '@apollo/client'
import Notify from './Notify'

const AuthorEdit = ({ authors }) => {

  const [selectedAuthor, setSelectedAuthor] = useState(authors[0])
  const [errorMessage, setErrorMessage] = useState(null)
  const [born, setBorn] = useState('')

  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    // eslint-disable-next-line no-undef
    onError: (error) => setErrorMessage(error.message)
  })

  const submit = (ev) => {
    ev.preventDefault()

    updateAuthor({ variables: { name: selectedAuthor, setBornTo: parseInt(born) } })

    setSelectedAuthor('')
    setBorn('')
  }

  // eslint-disable-next-line no-unused-vars
  const notify = (message) => {
    setErrorMessage(message)
    // eslint-disable-next-line no-undef
    setTimeout(() => {
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
          <select value={selectedAuthor || ''} onChange={(option) => setSelectedAuthor(authors[option.target.selectedIndex])}>
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
            onChange={({ target }) => setBorn(parseInt(target.value))}
          />
        </div>
        <button type="submit">Update author</button>
      </form>
    </div>
  )
}

export default AuthorEdit
