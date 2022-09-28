const dummy = (blogs) => {
  if (blogs.length === 0) return 1
  else return 0
}

const totalLikes = (blogs) => {
  let total = blogs.reduce((sum, like) => {
    return sum + JSON.parse(like.likes)
  }, 0)
  return total
}

const favoriteBlog = (blogs) => {
  let blogLikes = blogs.reduce((result, next) =>
    result.likes > next.likes ? result : next
  )

  delete blogLikes.__v
  delete blogLikes._id
  delete blogLikes.url

  return blogLikes
}

module.exports = { dummy, totalLikes, favoriteBlog }
