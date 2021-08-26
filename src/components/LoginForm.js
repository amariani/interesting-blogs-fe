import React, { useState } from 'react'

const LoginForm = ({ loginUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = (evt) => {
    evt.preventDefault()
    loginUser({ username, password })
  }

  return (
    <div>
      <h3>Log in to application</h3>
      <form onSubmit={onSubmitHandler}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            placeholder="Username"
            onChange={({ target }) => {
              setUsername(target.value)
            }}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={({ target }) => {
              setPassword(target.value)
            }}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginForm
