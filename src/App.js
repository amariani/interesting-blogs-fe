import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NotificationMesage from './components/NotificationMesage'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notificationType, setNotificationType] = useState(null)
  const [notificationMessage, setMotificationMessage] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  // Notification Message cleanup
  const cleanNotification = () => {
    setTimeout(() => {
      setMotificationMessage(null)
    }, 5000)
  }

  const onLoginHandler = async ({ username, password }) => {
    try {
      const loggedUser = await loginService.login({ username, password })
      setUser(loggedUser)
      window.localStorage.setItem(
        'loggedBlogAppUser',
        JSON.stringify(loggedUser)
      )
      blogService.setToken(loggedUser.token)
      setNotificationType('success')
      setMotificationMessage(`User ${loggedUser.name} logged in successfully`)
    } catch (error) {
      setNotificationType('error')
      setMotificationMessage('Wrong Credentials')
    }
    cleanNotification()
  }

  const onLogoutClick = () => {
    loginService.logout()
    setUser(null)
  }

  const onBlogCreate = async ({ title, author, url }) => {
    try {
      const response = await blogService.create({
        title,
        author,
        url,
      })
      setBlogs((prevBlogs) => {
        return [...prevBlogs, response]
      })
      setNotificationType('success')
      setMotificationMessage(
        `A new blog ${response.title} was added successfully`
      )
      blogFormRef.current.toggleVisibility()
    } catch (error) {
      setNotificationType('error')
      setMotificationMessage('Blog entry could not be created.')
    }
    cleanNotification()
  }

  const onBlogLike = async (blogInfo) => {
    try {
      const response = await blogService.like(blogInfo)

      setBlogs((prevBlogs) => {
        return prevBlogs.map((blog) => {
          if (blog.id === blogInfo.id) return response
          return blog
        })
      })
      setNotificationType('success')
      setMotificationMessage(`Blog ${response.title} was liked successfully`)
    } catch (error) {
      setNotificationType('error')
      setMotificationMessage('Blog could not be liked.')
    }
    cleanNotification()
  }

  const onBlogRemove = async (blogInfo) => {
    const allowDeletion = blogInfo.user.username === user.username
    if (!allowDeletion) {
      setNotificationType('error')
      setMotificationMessage(
        'You are not allowed to delete someone else\'s blog.'
      )
      cleanNotification()
      return
    }

    try {
      await blogService.deleteEntry(blogInfo)

      setBlogs((prevBlogs) => {
        return prevBlogs.filter((blog) => blog.id !== blogInfo.id)
      })
      setNotificationType('success')
      setMotificationMessage(
        `Blog entry ${blogInfo.title} was removed successfully.`
      )
    } catch (error) {
      setNotificationType('error')
      setMotificationMessage('Blog entry could not be removed.')
    }
    cleanNotification()
  }

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <NotificationMesage
        notificationType={notificationType}
        message={notificationMessage}
      />
      <h2>blogs</h2>
      {user ? (
        <div>
          <p>
            {user.name} logged in
            <button onClick={onLogoutClick}>Log out</button>
          </p>

          <Togglable buttonLabel="Create Blog entry" ref={blogFormRef}>
            <BlogForm
              createBlog={(newBlogContent) => onBlogCreate(newBlogContent)}
            />
          </Togglable>

          <br />
          <hr />

          {sortedBlogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              incrementLike={() => onBlogLike(blog)}
              remove={() => onBlogRemove(blog)}
            />
          ))}
        </div>
      ) : (
        <Togglable buttonLabel="Login">
          <LoginForm
            loginUser={(userCredentials) => onLoginHandler(userCredentials)}
          />
        </Togglable>
      )}
    </div>
  )
}

export default App
