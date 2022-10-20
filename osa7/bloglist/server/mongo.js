const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.scofuju.mongodb.net/bloglist?retryWrites=true&w=majority`

mongoose.connect(url)

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

const Blog = mongoose.model('Blog', blogSchema)

const blog = new Blog({
  title: 'Blog 1',
  author: 'Dan Simmons',
  url: 'http://carrioncomfort.com',
  likes: 501,
})

blog.save().then((result) => {
  console.log('blog saved!')
  mongoose.connection.close()
})
