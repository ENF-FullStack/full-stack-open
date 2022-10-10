import { asObject } from './reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'
import { getByTestId } from '@testing-library/react'

const App = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)

const addAnecdote = (ev) => {
  ev.preventDefault()
  const content = ev.target.anecdote.value
  ev.target.anecdote.value = ''
  dispatch({ type: 'ADDANEC', data: {
    content: content
  }})
}

  const vote = (id) => {
    dispatch({ type: 'ADDVOTE', data: {
      id: id
    } }) 
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addAnecdote} >
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App