import { useState, useEffect, useRef, Children } from 'react'
import Blog from './components/Blog'
import Blogform from './components/BlogForm'
import Login from './components/Login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const [notificationMsg, setNotificationMsg] = useState(null)
  const notificationTime = 2000

  const loginRef = useRef()
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(sortBlogs(blogs))
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

  const sortBlogs = (blogsList) => {
    const sortedBlogs = blogsList.sort((a,b) => b.likes - a.likes)
    return(sortedBlogs)
  }

  const handleLogin = async (userObj) => {
    try {
      const user = await loginService.login(userObj)

      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      loginRef.current.toggleVisibility()
      setNotificationMsg(
        'Login successful'
      )
      setTimeout(() => {
        setNotificationMsg(null)
      }, notificationTime)
    } catch (exception) {
      setNotificationMsg(
        'Login failed'
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

  const handleLike = async (blog) => {
    const newBlog = {
      ...blog,
      'likes':blog.likes +1
    }

    await blogService.update(blog.id, newBlog)
    const index = blogs.findIndex(b => b.id === blog.id)
    let newArray = blogs.concat()
    newArray[index] = newBlog
    setBlogs(newArray)
    setBlogs(sortBlogs(newArray))
  }

  const BlogsList = () => {
    return (
      <div>
        <h2>blogs</h2>
        { blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            handleLike={handleLike}
            handleRemove={handleRemove}
            user={user}
          />
        )}
      </div>
    )
  }

  const addBlog = async (blogObject) => {
    try {
      const createdBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(createdBlog))
      blogFormRef.current.toggleVisibility()
      setNotificationMsg(`Created ${blogObject.title} by ${blogObject.author}.`)
      setTimeout(() => {
        setNotificationMsg(null)
      }, notificationTime)

    } catch (error) {
      setNotificationMsg('Creation failed.')
      setTimeout(() => {
        setNotificationMsg(null)
      }, notificationTime)
    }
  }

  const handleRemove = async (blogObject) => {
    if (window.confirm(`Do you really want to remove ${blogObject.title} by ${blogObject.author}`)) {
      if (user.username === blogObject.user.username) {
        const response = await blogService.remove(blogObject.id)
        const updatedBlogs = blogs.filter(blog => blog.id !== blogObject.id)
        setBlogs(updatedBlogs)
      }
    }
  }

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <h1>Bloglist app</h1>
        <Notification message={notificationMsg} />
      </div>

      { !user &&
      <Togglable buttonLabel="Login" ref={loginRef}>
        <Login login={handleLogin} />
      </Togglable>
      }

      { user &&
        <div>
          <p>{user.name} logged in</p>
          <button className="logoutButton" onClick={logoutUser}>Logout</button>
          <Togglable buttonLabel='Add blog' ref={blogFormRef}>
            <Blogform addBlog={addBlog}/>
          </Togglable>
          <BlogsList/>

        </div>
      }

    </div>
  )
}

export default App