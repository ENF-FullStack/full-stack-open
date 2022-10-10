import { addVote, addNewAnecdote } from './reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)

const addAnecdote = (event) => {
  event.preventDefault()
  const content = event.target.anecdote_input.value
  event.target.anecdote_input.value = ''
  dispatch(addNewAnecdote(content))
}

  const vote = (id) => {
    dispatch(addVote(id))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.sort((a,b) => b.votes - a.votes).map(anecdote =>
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
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote_input" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App