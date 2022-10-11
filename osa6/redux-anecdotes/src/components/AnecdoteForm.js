import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote_input.value
        event.target.anecdote_input.value = ''
        dispatch(createAnecdote(content))
      }
      return (
        <div>
            <h3>Create new anecdote</h3>
        <form onSubmit={addAnecdote}>
        <div><input name="anecdote_input" /></div>
        <button type="submit">create</button>
      </form>
      </div>
      )
}

export default AnecdoteForm