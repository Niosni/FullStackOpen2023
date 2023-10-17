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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}