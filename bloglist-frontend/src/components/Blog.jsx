import { useState } from 'react'
import PropTypes from 'prop-types'

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
      <div className="unstyled-button" onClick={handleClick}>
        <div className="blog">
          <strong>{blog.title}</strong> by <i>{blog.author}</i>
          <div>
            <a href={blog.url}>{blog.url}</a>
            <br/>
            <>Likes: {blog.likes}</>
            <button
              className="like-button"
              onClick={(event) => {
                event.stopPropagation()
                handleLike(blog)}
              }>
          Like!
            </button>
            {blog.user.name}
            { user.username === blog.user.username &&
          <button
            className="remove-button"
            onClick={(event) => {
              event.stopPropagation()
              handleRemove(blog)
            }}>
            Remove
          </button>
            }
          </div>
        </div>
      </div>
    </>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog