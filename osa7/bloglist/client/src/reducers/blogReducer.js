import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      console.log('setBlogs: ', action.payload)
      return action.payload
    },
    appendBlog(state, action) {
      console.log('appendBlog: ', action.payload)
      state.push(action.payload)
    },
    appendLike(state, action) {
      console.log('appendLike: ', action.payload)
      return state.map((blog) =>
        action.payload.id !== blog.id
          ? blog
          : { ...blog, likes: blog.likes + 1 }
      )
    },
  },
})

export const { setBlogs, appendBlog, appendLike, updateBlog } =
  blogSlice.actions

export const fetchBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlog(newBlog))
  }
}

export const likeBlog = (content) => {
  return async (dispatch) => {
    const newLikes = await blogService.addLike(content)
    content = { ...content, likes: newLikes }
    dispatch(appendLike(content))
  }
}

export const deleteBlog = (content) => {
  return async (dispatch) => {
    const removedBlog = await blogService.removeBlog(content)
    console.log(removedBlog)
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export default blogSlice.reducer
