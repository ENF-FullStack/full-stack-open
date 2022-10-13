import { useDispatch, useSelector } from 'react-redux'
import { asyncVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    let anecdotes = useSelector(state => state.anecdotes)
    
    const filter = useSelector(state => state.filter).toLowerCase()
    anecdotes = anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter))

    const vote = (anecdote) => {
        dispatch(asyncVote(anecdote.id))
        dispatch(setNotification(`You voted for '${anecdote.content}'`, 5))
      }

    return (
        [...anecdotes].sort((a,b) => b.votes - a.votes).map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
              </div>
            </div>
          )
    )
}

export default AnecdoteList