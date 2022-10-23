/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'

let timeoutNow

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    showNotification(state = '', action) {
      console.log(action.payload)
      const content = action.payload
      return content
    },
    hideNotification(state, action) {
      return null
    },
    showStyle(state, action) {
      const content = action.payload
      return content
    },
  },
})

export const { showNotification, hideNotification, showStyle } =
  notificationSlice.actions

export const setNotification = (show, time) => {
  return (dispatch) => {
    dispatch(showNotification(show))
    clearTimeout(timeoutNow)
    timeoutNow = setTimeout(() => {
      dispatch(hideNotification())
    }, time * 1000)
  }
}

export const setStyle = (content) => {
  return async (dispatch) => {
    dispatch(showStyle(content))
  }
}

export default notificationSlice.reducer
