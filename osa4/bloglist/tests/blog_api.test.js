const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
  // const blogObjects = helper.initialBlogs
  //   .map(blog => new Blog(blog))
  // const promiseArray = blogObjects.map(blog => blog.save())
  // await Promise.all(promiseArray)
})

const api = supertest(app)

describe('Blog API test', () => {
  test('Task 4.8: GET right amount of JSON format blogs', async () => {
    const response = await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('Task 4.9: All blogs have field "id"', async () => {
    const response = await api.get('/api/blogs')
    response.body.map(blog => expect(blog.id).toBeDefined())
  })

  test('Task 4.10: A valid blog can be added', async () => {
    const newBlog = {
      title: '3rd',
      author: '3rd Author',
      url: 'www2asd',
      likes: 123
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length +1)

    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).toContain(newBlog.title)
  })

  test('Task 4.11: Adding a blog with no likes property results in likes set to 0', async () => {
    const blogWithoutLikes = {
      title: 'Likeless Title',
      author: 'Likeless Author',
      url: 'mandatory_url'
    }
    await api
      .post('/api/blogs')
      .send(blogWithoutLikes)
      .expect(201)
    const blogsAtEnd = await helper.blogsInDb()
    const zeroLikeBlog = blogsAtEnd.find(blog => blog.title === blogWithoutLikes.title)
    expect(zeroLikeBlog.likes).toEqual(0)
  })

  test('Task 4.12: POST blogs without title or url result in status 400', async () => {
    const blogWithoutTitle = {
      author: 'Titleless',
      url: 'Titleless',
    }
    const blogWithoutUrl = {
      title: 'Urlless',
      author: 'Urlless',
    }

    await api
      .post('/api/blogs')
      .send(blogWithoutTitle)
      .expect(400)
    await api
      .post('/api/blogs')
      .send(blogWithoutUrl)
      .expect(400)

  })

  test('Task 4.13: a note can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]


    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(blog => blog.title)

    expect(titles).not.toContain(blogToDelete.title)
  })

  test('Task 4.14: PUT change existing blog content', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ likes: blogToUpdate.likes+1 })
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[0].likes).toEqual(blogToUpdate.likes+1)
  })

  test('A specific blog is in the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map(blog => blog.title)

    expect(titles).toContain('Second Title')
  })



  test('An invalid blog can\'t be added', async () => {
    const newBlog =   {
      likes: 123
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific blog can be viewed', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToView = blogsAtStart[0]


    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(resultBlog.body).toEqual(blogToView)
  })



  afterAll(async () => {
    await mongoose.connection.close()
  })

})
