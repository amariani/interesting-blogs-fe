import React from "react";

const LoginForm = ({ onSubmitHandler, usernameSetter, passwordSetter }) => (
  <div>
    <h3>Log in to application</h3>
    <form onSubmit={onSubmitHandler}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={({ target }) => {
            usernameSetter(target.value);
          }}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={({ target }) => {
            passwordSetter(target.value);
          }}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
);

export default LoginForm;
