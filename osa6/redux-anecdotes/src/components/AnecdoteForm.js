import { connect } from 'react-redux'
import { createAsyncAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

    const addOneAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdoteInput.value
        event.target.anecdoteInput.value = ''
        props.createAsyncAnecdote(content)
        props.setNotification(`You created anecdote '${content}'`, 5)
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

const mapDispatchToProps = (dispatch) => {
  return {
    createAsyncAnecdote: (value) => {
      dispatch(createAsyncAnecdote(value))
    },
    setNotification: (content, time) => {
      dispatch(setNotification(content, time))
    }
  }
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)