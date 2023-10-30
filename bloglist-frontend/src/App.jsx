import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [newTitle, setNewTitle] = useState("")
  const [newAuthor, setNewAuthor] = useState("")
  const [newUrl, setNewUrl] = useState("")

  const [notificationMsg, setNotificationMsg] = useState(null)
  const notificationTime = 2000
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setNotificationMsg(
        `Login successful`
      )
      setTimeout(() => {
        setNotificationMsg(null)
      }, notificationTime)
    } catch (exception) {
      setNotificationMsg(
        `Login failed`
      )
      setTimeout(() => {
        setNotificationMsg(null)
      }, notificationTime)
    }
  }

  const logoutUser = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
  }

  const blogsList = () => (
    <div>
      <h2>blogs</h2>
        { blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
    </div>
  )

  const addBlog = async (event) => {
    event.preventDefault()

    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }
    try {
      const createdBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(createdBlog))
      setNewTitle("")
      setNewAuthor("")
      setNewUrl("")

      setNotificationMsg(`Created ${blogObject.title} by ${blogObject.author}.`)
      setTimeout(() => {
        setNotificationMsg(null)
      }, notificationTime)

    } catch (error) {
      setNotificationMsg(`Creation failed.`)
      setTimeout(() => {
        setNotificationMsg(null)
      }, notificationTime)
    }
  }

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <label for="title">Title: </label>
      <input
        id="title"
        name="title"
        value={newTitle}
        onChange={event=>setNewTitle(event.target.value)}
      />
      <br/>
      <label for="author">Author: </label>
      <input
        id="author"
        name="author"
        value={newAuthor}
        onChange={event=>setNewAuthor(event.target.value)}
      />
      <br/>
      <label for="url">Url: </label>
      <input
        id="url"
        name="url"
        value={newUrl}
        onChange={event=>setNewUrl(event.target.value)}
      />
      <br/>
      <button type="submit">Create</button>
    </form>  
  )

  return (
    <div>
    <Notification message={notificationMsg} />

      { !user && 
        <Login 
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      }

        

      { user && 
        <div>
          <p>{user.name} logged in</p>
          <button id="logoutButton" onClick={logoutUser}>Logout</button>
          { blogForm() }
          { blogsList() }
          
        </div>
      }
    </div>
  )
}

export default App