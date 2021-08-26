import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const onSubmitHandler = (evt) => {
    evt.preventDefault()
    createBlog({ title, author, url })
  }

  return (
    <div>
      <h3>Create new</h3>
      <form onSubmit={onSubmitHandler}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={({ target }) => {
              setTitle(target.value)
            }}
          />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            name="author"
            value={author}
            onChange={({ target }) => {
              setAuthor(target.value)
            }}
          />
        </div>
        <div>
          <label htmlFor="url">URL:</label>
          <input
            type="text"
            name="url"
            value={url}
            onChange={({ target }) => {
              setUrl(target.value)
            }}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default BlogForm
