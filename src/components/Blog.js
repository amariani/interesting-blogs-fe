import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, incrementLike, remove }) => {
  const [visible, setVisible] = useState(false)

  const blogItemWrapperStyles = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    listStyle: 'none'
  }

  const removeBtnStyles = {
    padding: '4px 8px',
    background: 'red',
    border: 'none',
    fontSize: 16,
    color: 'white',
    cursor: 'pointer',
    marginBottom: 5,
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const increaseLikeHandler = () => {
    incrementLike()
  }

  const removeBlogHandler = () => {
    const removeConfirmed = window.confirm(
      `Remove ${blog.title} by ${blog.author}`
    )
    if (!removeConfirmed) return false
    remove()
  }

  return (
    <li style={blogItemWrapperStyles}>
      <span>
        {blog.title} {blog.author}{' '}
        <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
        {visible ? (
          <>
            <p>URL: {blog.url}</p>
            <p>
              Likes: {blog.likes}{' '}
              <button className="likeBtn" onClick={increaseLikeHandler}>like</button>
            </p>
            <p>{blog.user.name}</p>
            <button className="removeBtn" onClick={removeBlogHandler} style={removeBtnStyles}>
              Remove
            </button>
          </>
        ) : null}
      </span>
    </li>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  }),
  incrementLike: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
}

export default Blog
