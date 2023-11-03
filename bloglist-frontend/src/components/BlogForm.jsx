import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ addBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const createBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }
    addBlog(blogObject)
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <form onSubmit={createBlog}>
      <label>Title: </label>
      <input
        id="title"
        name="title"
        value={newTitle}
        onChange={event => setNewTitle(event.target.value)}
      />
      <br/>
      <label>Author: </label>
      <input
        id="author"
        name="author"
        value={newAuthor}
        onChange={event => setNewAuthor(event.target.value)}
      />
      <br/>
      <label>Url: </label>
      <input
        id="url"
        name="url"
        value={newUrl}
        onChange={event => setNewUrl(event.target.value)}
      />
      <br/>
      <button type="submit">Create</button>
    </form>
  )
}

BlogForm.propTypes = { addBlog: PropTypes.func.isRequired }

export default BlogForm