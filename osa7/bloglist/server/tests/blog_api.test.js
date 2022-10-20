const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')

const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlog)

  // const blogObjects = helper.initialBlog.map((blog) => new Blog(blog))
  // const promiseArray = blogObjects.map((blog) => blog.save())
  // await Promise.all(promiseArray)
})

describe('initially some saved blog items', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blog entries are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlog.length)
  })

  test('specific blog entry is in returned blog items', async () => {
    const response = await api.get('/api/blogs')

    const title = response.body.map((r) => r.title)

    expect(title).toContain('Go To Statement Considered Harmful')
  })

  test('correct amount of blog entries', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(2)
  })
})

describe('tests focusing on one blog item', () => {
  test('the first blog is named React patterns', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].title).toBe('React patterns')
  })

  test('unique identifier id exists', async () => {
    const response = await api.get('/api/blogs')
    console.log('arvo:', response.body[0].id)
    expect(response.body[0].id).toBeDefined()
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
})

describe('adding new blog items', () => {
  test('adding new blog item to db', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const newUser = {
      username: 'jotervon',
      name: 'Joonas Tervonen',
      password: 'test',
    }

    await api.post('/api/users').send(newUser).expect(201)

    const user = {
      username: 'jotervon',
      password: 'test',
    }

    const checkUser = await api.post('/api/login').send(user)

    let token = checkUser.body.token
    token = `Bearer ${token}`
    console.log(token)

    const newBlog = {
      title: 'looking for work',
      author: 'Joonas Tervonen',
      url: 'http://mongo.db',
      likes: 10,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1)

    const contents = blogsAtEnd.map((r) => r.title)
    expect(contents).toContain(newBlog.title)
  })

  test('blog post with no likes > set to 0', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const newUser = {
      username: 'jotervon',
      name: 'Joonas Tervonen',
      password: 'test',
    }

    await api.post('/api/users').send(newUser).expect(201)

    const user = {
      username: 'jotervon',
      password: 'test',
    }

    const checkUser = await api.post('/api/login').send(user)

    let token = checkUser.body.token
    token = `Bearer ${token}`
    console.log(token)

    const newBlog = {
      title: 'looking for work',
      author: 'Joonas Tervonen',
      url: 'http://mongo.db',
    }

    await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1)

    const blog = await Blog.find(newBlog)
    expect(blog[0].likes).toBe(0)
  })

  test('blog without url refused', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const newUser = {
      username: 'jotervon',
      name: 'Joonas Tervonen',
      password: 'test',
    }

    await api.post('/api/users').send(newUser).expect(201)

    const user = {
      username: 'jotervon',
      password: 'test',
    }

    const checkUser = await api.post('/api/login').send(user)

    let token = checkUser.body.token
    token = `Bearer ${token}`
    console.log(token)

    const newBlog = {
      title: 'Ahm missing url',
      author: 'VP',
      likes: 12,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
  })

  test('blog without title refused', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const newUser = {
      username: 'jotervon',
      name: 'Joonas Tervonen',
      password: 'test',
    }

    await api.post('/api/users').send(newUser).expect(201)

    const user = {
      username: 'jotervon',
      password: 'test',
    }

    const checkUser = await api.post('/api/login').send(user)

    let token = checkUser.body.token
    token = `Bearer ${token}`
    console.log(token)

    const newBlog = {
      author: 'VP',
      url: 'http://notitle.io',
      likes: 12,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
  })
})

describe('deleting blog item', () => {
  test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlog.length - 1)

    const contents = blogsAtEnd.map((r) => r.title)
    expect(contents).not.toContain(blogToDelete.title)
  })
})

test('blog can be updated', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]
  const newBlog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 8,
  }

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).not.toEqual(blogsAtStart)
})

// NOTE: User section

describe('initially only one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('user creation succeeds with new username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'vptervon',
      name: 'VP Tervonen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map((u) => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('user creation fails /w proper statuscodes and messages if not unique', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('username and password need to exist and be over 3 characters long', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'fo0',
      name: 'Foobar',
      password: 'fff',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect([
      'username is too short or missing, minimum 3 chars',
      'password is too short or missing, minimum 3 chars',
    ]).toContain(result.body.error)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
