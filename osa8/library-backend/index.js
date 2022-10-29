/* eslint-disable no-undef */
const {
  ApolloServer,
  UserInputError,
  AuthenticationError,
  gql,
} = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/User')

const JWT_SECRET = process.env.SECRET_KEY

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
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

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book

    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`

const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments(),
    me: (root, args, { currentUser }) => currentUser,

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
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('error in authentication!')
      }

      let author = await Author.findOne({ name: args.author })

      if (!author) {
        author = new Author({
          name: args.author,
          id: uuid(),
        })

        try {
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }

      let book = new Book({
        ...args,
        author: author.id,
        id: uuid(),
      })

      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      book = await book.populate('author')
      return book
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('error in authentication!')
      }

      if (!args.name) {
        throw new UserInputError('missing name field!', {
          invalidArgs: args,
        })
      }

      const author = await Author.findOne({ name: args.name })
      if (!author) return null

      author.born = args.setBornTo
      return author.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })
    },
    createUser: async (root, args) => {
      if (!args.username || !args.favoriteGenre) {
        throw new UserInputError('missing username and/or favoriteGenre!', {
          invalidArgs: args,
        })
      }

      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      })

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })
    },
    login: async (root, args) => {
      if (!args.username || !args.password) {
        throw new UserInputError('missing username and/or password!', {
          invalidArgs: args,
        })
      }
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== 'dummypassword') {
        throw new UserInputError('invalid user credentials!')
      }

      const userToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userToken, JWT_SECRET) }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findOne({
        username: decodedToken.username,
      })
      return { currentUser }
    }
  },
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
