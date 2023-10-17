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

module.exports = {
  dummy,
  totalLikes
}