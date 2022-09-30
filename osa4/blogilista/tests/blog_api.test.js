const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlog)

  // const blogObjects = helper.initialBlog.map((blog) => new Blog(blog))
  // const promiseArray = blogObjects.map((blog) => blog.save())
  // await Promise.all(promiseArray)
})

test('all blog entries are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlog.length)
})

test('specific blog entry is in array', async () => {
  const response = await api.get('/api/blogs')

  const title = response.body.map((r) => r.title)

  expect(title).toContain('Go To Statement Considered Harmful')
})

test('correct amount of blog entries', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(2)
})

test('the first blog is named React patterns', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].title).toBe('React patterns')
})

test('unique identifier id exists', async () => {
  const response = await api.get('/api/blogs')
  console.log('arvo:', response.body[0].id)
  expect(response.body[0].id).toBeDefined()
})

test('adding new blog item to db', async () => {
  const newBlog = {
    title: 'post to mongo db',
    author: 'VP',
    url: 'http://mongo.db',
    likes: 11,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlog.length + 1)

  const contents = blogsAtEnd.map((r) => r.title)
  expect(contents).toContain('post to mongo db')
})

test('a specific blog item can be viewed', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToView = blogsAtStart[0]

  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const processedBlogToView = JSON.parse(JSON.stringify(blogToView))
  expect(resultBlog.body).toEqual(processedBlogToView)
})

test('a note can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlog.length - 1)

  const contents = blogsAtEnd.map((r) => r.title)
  expect(contents).not.toContain(blogToDelete.title)
})

test('blog post with no likes > set to 0', async () => {
  const newBlog = {
    title: 'post to mongo db',
    author: 'VP',
    url: 'http://mongo.db',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlog.length + 1)

  const contents = blogsAtEnd.map((r) => r.likes)
  expect(contents).toContain(0)
})

test('blog without title and url refused', async () => {
  const newBlog = {
    author: 'VP',
    likes: 12,
  }

  await api.post('/api/blogs').send(newBlog).expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlog.length)
})

afterAll(() => {
  mongoose.connection.close()
})
