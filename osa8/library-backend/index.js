/* eslint-disable no-undef */
const { ApolloServer, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
require('dotenv').config()

const Author = require('./models/Author')
const Book = require('./models/Book')

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int!
  }

  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
  }

  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`

const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments(),
    allAuthors: async () => {
      const authors = await Author.find({})
      const books = await Book.find({}).populate('author')

      return authors.map((author) => {
        const bookCount = books.reduce(
          (a, book) => (book.author.name === author.name ? a + 1 : a),
          0
        )
        return {
          name: author.name,
          id: author._id,
          born: author.born,
          bookCount,
        }
      })
    },
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) return Book.find({}).populate('author')

      let books = await Book.find({}).populate('author')
      if (args.author)
        books = books.filter((book) => book.author.name === args.author)
      if (args.genre)
        books = books.filter(
          (book) =>
            book.genres.findIndex((genre) => genre === args.genre) !== -1
        )
      return books
    },
  },

  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author })

      if (!author) {
        author = new Author({
          name: args.author,
          id: uuid(),
        })
        await author.save()
      }

      let book = new Book({
        ...args,
        author: author.id,
        id: uuid(),
      })
      await book.save()
      book = await book.populate('author')
      return book
    },
    editAuthor: (root, args) => {
      const author = authors.find((p) => p.name === args.name)
      if (!author) return null

      const updatedAuthor = { ...author, name: args.name, born: args.setBornTo }
      authors = authors.map((p) => (p.name === args.name ? updatedAuthor : p))
      return updatedAuthor
    },
  },

  // Author: {
  //   bookCount: (root) => {
  //     return books.filter((book) => book.author === root.name).length
  //   },
  // },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
