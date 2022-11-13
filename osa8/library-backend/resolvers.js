const { UserInputError, AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/User')

require('dotenv').config()

const JWT_SECRET = process.env.SECRET_KEY

const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments(),
    me: (root, args, { currentUser }) => currentUser,

    // allAuthors: () => Author.find({}),
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
      console.log(user)
      if (!user || args.password !== 'dummy') {
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

module.exports = resolvers
