import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addVote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = {
        ...anecdoteToChange, votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote => anecdote.id !== id ? anecdote: changedAnecdote)
    },
    addAnecdote(state, action) {
      const newAnecdote = asObject(action.payload)
      return [...state, newAnecdote]
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { addVote, addAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAsyncAnecdote = (content) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(anecdotes))
  }
}

export const asyncVote = (id) => {
  return async dispatch => {
    await anecdoteService.vote(id)
    dispatch(addVote(id))
  }
}

export default anecdoteSlice.reducer