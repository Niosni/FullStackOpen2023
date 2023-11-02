const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response, next) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end
  }
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  const populatedBlog = await Blog
    .findById(savedBlog._id)
    .populate('user')
  response.status(201).json(populatedBlog)
})

blogsRouter.delete('/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)
  const user = request.user

  if (!user) {
    return response.status(401).json({ error: 'Blog can only be removed by the user who added it.' })
  }

  if (user.id.toString() === blog.user._id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    // Remove the blog from user field blogs aw well
    const filteredBlogs = user.blogs.filter(blogId => blogId.toString() !== request.params.id)
    const userObj = await User.findById(user.id)
    userObj.blogs = filteredBlogs
    await userObj.save()

    response.status(204).end()
  } else {
    return response.status(401).json({ error: 'Blog can only be removed by the user who added it.' })
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const { title, author, url, likes } = request.body
  console.log(title, author, url, likes, request.user.username, request.params.id)
  await Blog.findByIdAndUpdate(
    request.params.id,
    { title, author, url, likes },
    { new: true, runValidators: true, context: 'query' },
  )
  response.status(200).end()
})

module.exports = blogsRouter