const { UserInputError, AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/User')

require('dotenv').config()

const JWT_SECRET = process.env.SECRET_KEY

const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments(),
    me: (root, args, context) => {
      console.log('user @ me', context.currentUser)
      return context.curren
    },

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
      if (!args.author && !args.genre)
        return Book.find({}).populate('author', {
          name: 1,
          id: 1,
          born: 1,
          bookCount: 1,
        })

      let books = await Book.find({}).populate('author', {
        name: 1,
        id: 1,
        born: 1,
        bookCount: 1,
      })
      const author = await Author.findOne({ name: args.author })
      args.author &&
        (books = books.filter((book) => book.author.name === author.name))
      args.genre &&
        (books = books.filter((book) => book.genres.includes(args.genre)))
      return books
    },
  },

  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('error in authentication!')
      }

      const bookExists = await Book.findOne({ title: args.title })
      if (bookExists) {
        throw new UserInputError('Book title must be unique!', {
          invalidArgs: args,
        })
      }

      let newBook
      let author

      try {
        author = await Author.findOne({ name: args.author })

        if (!author) {
          author = new Author({
            name: args.author,
          })
        }

        newBook = new Book({
          ...args,
          author
        })

        await newBook.save()
        // author.books = author.books.concat(savedBook._id)
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      //   book = await book.populate('author')
      pubsub.publish('BOOK_ADDED', { bookAdded: newBook })
      console.log(newBook)
      return newBook
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

      try {
        return await author.save()
      } catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    createUser: async (root, args) => {
      if (!args.username || !args.favouriteGenre) {
        throw new UserInputError('missing username and/or favouriteGenre!', {
          invalidArgs: args,
        })
      }

      const user = new User({
        username: args.username,
        favouriteGenre: args.favouriteGenre,
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
      console.log('user @ login', user)
      if (!user || args.password !== 'dummy') {
        throw new UserInputError('invalid user credentials!')
      }

      const userToken = {
        username: user.username,
        id: user._id,
      }

      // console.log('token obj', userToken)
      // console.log('token @ login', { value: jwt.sign(userToken, JWT_SECRET) })

      return { value: jwt.sign(userToken, JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: { subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']) },
  },
}

module.exports = resolvers
