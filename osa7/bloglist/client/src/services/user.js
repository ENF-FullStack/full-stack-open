import axios from 'axios'
const baseUrl = '/api/users'

let token = null

const getUsers = async () => {
  const response = await axios.get(baseUrl)
  // console.log('alldata: ', response)
  return response.data
}

const setUser = (user) => {
  window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
  token = user.token
  return user
}

const getUser = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
  if (loggedUserJSON) {
    console.log('loggedUserJSON == true')
    const user = JSON.parse(loggedUserJSON)
    token = user.token
    return user
  }
  return null
}

const clearUser = () => {
  window.localStorage.removeItem('loggedBlogUser')
  //   localStorage.clear()
  token = null
}

const getToken = () => token

export default { getUsers, setUser, getUser, clearUser, getToken }
