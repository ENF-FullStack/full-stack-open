const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    title: 1,
    author: 1,
    likes: 1,
  })
  response.status(200).json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique',
    })
  }

  if (!username || username.length < 3) {
    console.log('username')
    return response.status(400).json({
      error: 'username is too short or missing, minimum 3 chars',
    })
  } else if (!password || password.length < 3) {
    console.log('password')
    return response.status(400).json({
      error: 'password is too short or missing, minimum 3 chars',
    })
  } else {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      name,
      passwordHash,
    })
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  }
})

module.exports = usersRouter
