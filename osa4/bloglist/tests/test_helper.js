const Blog = require('../models/blog')
const User = require('../models/user')
const mongoose = require('mongoose')


const testUser = {
  username: 'root',
  password: 'sekret'
}

const testUser2 = {
  username: 'niosni',
  password: 'salasana'
}

const initialBlogs = [
  {
    title: 'NewTittle',
    author: 'auts',
    url: 'www',
    likes: 11
  },
  {
    title: 'Second Title',
    author: 'Author',
    url: 'www2',
    likes: 2
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const getLoginDetails = async () => {
  return ([testUser, testUser2])
}
module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb, getLoginDetails
}