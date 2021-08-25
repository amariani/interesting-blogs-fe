import React, { useState } from "react";

const Blog = ({ blog, incrementLike, remove }) => {
  const [visible, setVisible] = useState(false);

  const blogItemWrapperStyles = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const removeBtnStyles = {
    padding: "4px 8px",
    background: "red",
    border: "none",
    fontSize: 16,
    color: "white",
    cursor: "pointer",
    marginBottom: 5,
  };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const increaseLikeHandler = () => {
    incrementLike();
  };

  const removeBlogHandler = () => {
    const removeConfirmed = window.confirm(
      `Remove ${blog.title} by ${blog.author}`
    );
    if (!removeConfirmed) return false;
    remove();
  };

  return (
    <div style={blogItemWrapperStyles}>
      <span>
        {blog.title} {blog.author}{" "}
        <button onClick={toggleVisibility}>{visible ? "hide" : "view"}</button>
        {visible ? (
          <>
            <p>{blog.url}</p>
            <p>
              Likes: {blog.likes}{" "}
              <button onClick={increaseLikeHandler}>like</button>
            </p>
            <p>{blog.user.name}</p>
            <button onClick={removeBlogHandler} style={removeBtnStyles}>
              Remove
            </button>
          </>
        ) : null}
      </span>
    </div>
  );
};

export default Blog;
