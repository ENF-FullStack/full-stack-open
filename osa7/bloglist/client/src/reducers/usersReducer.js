import userService from '../services/user'

const usersReducer = (state = [], action) => {
  switch (action.type) {
  case 'FETCH_USERS':
    return action.data
  default:
    return state
  }
}

export const fetchAllUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch({
      type: 'FETCH_USERS',
      data: users,
    })
  }
}

export default usersReducer
