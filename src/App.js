import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import NotificationMesage from "./components/NotificationMesage";
import blogService from "./services/blogs";
import loginService from "./services/login";
import "./App.css";
import BlogForm from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notificationType, setNotificationType] = useState(null);
  const [notificationMessage, setMotificationMessage] = useState(null);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogAuthor, setBlogAuthor] = useState("");
  const [blogUrl, setBlogUrl] = useState("");

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  // Notification Message cleanup
  const cleanNotification = () => {
    setTimeout(() => {
      setMotificationMessage(null);
    }, 5000);
  };

  const onLoginFormSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const loggedUser = await loginService.login({ username, password });
      setUser(loggedUser);
      window.localStorage.setItem(
        "loggedBlogAppUser",
        JSON.stringify(loggedUser)
      );
      blogService.setToken(loggedUser.token);
      setNotificationType("success");
      setMotificationMessage(`User ${loggedUser.name} logged in successfully`);
    } catch (error) {
      setNotificationType("error");
      setMotificationMessage(`Wrong Credentials`);
    }
    cleanNotification();
  };

  const onLogoutClick = () => {
    loginService.logout();
    setUser(null);
  };

  const onBlogCreate = async (evt) => {
    evt.preventDefault();
    try {
      const response = await blogService.create({
        title: blogTitle,
        author: blogAuthor,
        url: blogUrl,
      });
      setBlogs((prevBlogs) => {
        return [...prevBlogs, response];
      });
      setBlogTitle("");
      setBlogUrl("");
      setBlogAuthor("");
      setNotificationType("success");
      setMotificationMessage(
        `A new blog ${response.title} was added successfully`
      );
    } catch (error) {
      setNotificationType("error");
      setMotificationMessage(`Blog entry could not be created.`);
    }
    cleanNotification();
  };

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

          <BlogForm
            onSubmitHandler={onBlogCreate}
            titleSetter={(val) => setBlogTitle(val)}
            urlSetter={(val) => setBlogUrl(val)}
            authorSetter={(val) => setBlogAuthor(val)}
            title={blogTitle}
            url={blogUrl}
            author={blogAuthor}
          />

          <br />
          <hr />

          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      ) : (
        <LoginForm
          onSubmitHandler={onLoginFormSubmit}
          usernameSetter={(val) => setUsername(val)}
          passwordSetter={(val) => setPassword(val)}
        />
      )}
    </div>
  );
};

export default App;
