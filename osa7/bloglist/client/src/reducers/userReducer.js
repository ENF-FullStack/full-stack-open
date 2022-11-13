import { createSlice } from '@reduxjs/toolkit'
// import blogService from '../services/blogs'
import userService from '../services/user'

const userSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUser(state, action) {
      console.log('setUser: ', action.payload)
      return action.payload
    },
    // getUser(state, action) {
    //   console.log('getUser: ', action.payload)
    //   return action.payload
    // },
    removeUser(state, action) {
      console.log('removeUser: ', action.payload)
      return null
    },
  },
})

export const { setUser, getUser, removeUser } = userSlice.actions

export const logUser = (content) => {
  return async (dispatch) => {
    const user = await userService.setUser(content)
    // if (user) await blogService.setToken(user.token)
    // else blogService.setToken(null)
    dispatch(setUser(user))
  }
}

// export const fetchUser = (content) => {
//   return async (dispatch) => {
//     console.log('content: ', content)
//     const user = await userService.getUser(content)
//     dispatch(getUser(user))
// if (!user === null) {
//   await blogService.setToken(user.token)
//   dispatch(getUser(user))
// }
//   }
// }

export const emptyUser = (content) => {
  return async (dispatch) => {
    // const user = await userService.clearUser(content)
    window.localStorage.removeItem('loggedBlogUser')
    dispatch(removeUser(content))
  }
}

export default userSlice.reducer
