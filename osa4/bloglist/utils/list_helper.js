const lodash = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  let totalLikes = 0
  if (blogs.length === 0){
    return 0
  }
  blogs.forEach(blog => {
    totalLikes += blog.likes
  })
  return totalLikes
}

const favoriteBlog = (blogs) => {
  if (Object.keys(blogs).length === 0) {
    return null
  }
  let newBlog = {
    title: blogs[0].title,
    author: blogs[0].author,
    likes: blogs[0].likes
  }
  if (blogs.length === 1){
    return newBlog
  } else {
    blogs.forEach(blog => {
      if(blog.likes > newBlog.likes) {
        newBlog = {
          title: blog.title,
          author: blog.author,
          likes: blog.likes
        }
      }
    })
    return newBlog
  }
}

const mostBlogs = (blogs) => {
  const authorsBlogsCounts = lodash.countBy(blogs, (blog) => {
    return blog.author
  })
  const values = Object.values(authorsBlogsCounts)
  const maxValue = Math.max(...values)
  const maxIndex = values.findIndex(value => value === maxValue)
  let mostAuthor = NaN
  Object.keys(authorsBlogsCounts).forEach( (key, index) => {
    if (index === maxIndex) {
      mostAuthor = {
        author: key,
        blogs: maxValue
      }
    }
  })

  return mostAuthor
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return NaN
  }
  let authorLikes = blogs.reduce((obj, { author, likes }) => {
    obj[author] = obj[author] || 0
    obj[author] += likes
    return obj
  },{})

  let mostLikes = Object.keys(authorLikes).sort((a,b) => authorLikes[b] - authorLikes[a])[0]
  const popularAuthor = {
    author: mostLikes,
    likes: authorLikes[mostLikes]
  }
  return popularAuthor
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}