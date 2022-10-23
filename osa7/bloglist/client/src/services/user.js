let token = null

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

export default { setUser, getUser, clearUser, getToken }
