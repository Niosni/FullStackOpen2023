import { useState } from "react"

const Blog = ({ blog, handleLike, handleRemove, user }) => {
  const [expandedView, setExpandedView] = useState(true)

  const handleClick = (event) => {
    setExpandedView(!expandedView)
  }


  if (!expandedView) {
    return (
      <button className="unstyled-button" onClick={handleClick}>
        <div className="blog">
          <strong>{blog.title}</strong> by <i>{blog.author}</i>
        </div>
      </button>
  )}

  return (
    <>
    <button className="unstyled-button" onClick={handleClick}>
      <div className="blog">
        <strong>{blog.title}</strong> by <i>{blog.author}</i>
        <div>
         <a href={blog.url}>{blog.url}</a>
         <br/>
         <>Likes: {blog.likes}</>
         <button className="like-button" onClick={() => handleLike(blog)}>Like!</button>
         {blog.user.name}
         { user.username === blog.user.username && 
         <button className="remove-button" onClick={() => handleRemove(blog)}>Remove</button>
         }
        </div>
      </div>
    </button>
    </>
  )
}



export default Blog