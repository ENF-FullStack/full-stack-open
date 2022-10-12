import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addOneAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdoteInput.value
        event.target.anecdoteInput.value = ''
        const savedAnecdote = await anecdoteService.createNew(content)
        dispatch(addAnecdote(content))
        dispatch(setNotification(`You created anecdote '${content}'`, 5))
      }
      return (
        <div>
            <h3>Create new anecdote</h3>
        <form onSubmit={addOneAnecdote}>
        <div><input name="anecdoteInput" /></div>
        <button type="submit">create</button>
      </form>
      </div>
      )
}

export default AnecdoteForm