import axios from 'axios'
const baseUrl = '/api/users'

// let token = null

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const setUser = (user) => {
  window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
  // token = user.token
  return user
}

// const getToken = () => token

const userService = { getAll, setUser }

export default userService
