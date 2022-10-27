import React, { useState } from 'react'
import { UPDATE_AUTHOR, ALL_AUTHORS } from './queries'
import { useMutation } from '@apollo/client'

const AuthorEdit = ({ authors }) => {
  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const submit = (ev) => {
    ev.preventDefault()
    updateAuthor({ variables: { name, setBornTo: parseInt(born) } })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          name
          <input
            type="text"
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
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
