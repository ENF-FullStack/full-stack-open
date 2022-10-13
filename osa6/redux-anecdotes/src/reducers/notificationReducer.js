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
        hideNotification(state, action) { return null }
    }

})

export const { showNotification, hideNotification } = notificationSlice.actions

export const setNotification = (show, time) => {
    return dispatch => {
        dispatch(showNotification(show))
        clearTimeout(timeoutNow)
        timeoutNow = setTimeout(() => {
            dispatch(hideNotification())
        }, time*1000)
    }
}

export default notificationSlice.reducer