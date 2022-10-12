import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import anecdoteService from './services/anecdotes'

import reducer, { setAnecdotes } from './reducers/anecdoteReducer'
import store from './store'
import anecdotes from './services/anecdotes'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
