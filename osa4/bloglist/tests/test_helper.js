const Blog = require('../models/blog')

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

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}