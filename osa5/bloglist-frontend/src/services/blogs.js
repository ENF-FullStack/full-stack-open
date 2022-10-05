import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const addLike = async (blog) => {
  const id = blog.id
  const newLike = blog.likes
  const response = await axios.put(`${baseUrl}/${id}`, { likes: newLike })
  return response.data
}

// const update = (id, newObject) => {
//   const request = axios.put(`${baseUrl}/${id}`, newObject)
//   return request.then((response) => response.data)
// }

const removeBlog = async (blog) => {
  const id = blog.id
  const token = `bearer ${blog.token}`
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAll, create, setToken, addLike, removeBlog }
