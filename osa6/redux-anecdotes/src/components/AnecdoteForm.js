import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addOneAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdoteInput.value
        event.target.anecdoteInput.value = ''
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