import React from "react";

const BlogForm = ({
  onSubmitHandler,
  titleSetter,
  authorSetter,
  urlSetter,
  title,
  author,
  url,
}) => (
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
            titleSetter(target.value);
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
            authorSetter(target.value);
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
            urlSetter(target.value);
          }}
        />
      </div>
      <button type="submit">Create</button>
    </form>
  </div>
);

export default BlogForm;
