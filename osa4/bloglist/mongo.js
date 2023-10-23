const mongoose = require('mongoose')
const Blog = require('./models/blog')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://niklasniemela:${password}@cluster0.8ybidbt.mongodb.net/testbloglistApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const blog = new Blog({
  title: 'NewTittle2',
  author: 'auts2',
  url: 'www2',
  likes: 2
})

blog.save()

Blog.find({}).then(result => {
  result.forEach(blog => {
    console.log(blog)
  })
  mongoose.connection.close()
})