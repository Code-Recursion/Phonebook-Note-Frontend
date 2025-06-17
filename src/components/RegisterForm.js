import React, { useState } from "react";
import "./LoginForm.css";

const RegisterForm = ({ handleRegister, toggleForm }) => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    handleRegister({
      username,
      name,
      password,
    });
    setUsername("");
    setName("");
    setPassword("");
  };

  return (
    <div className="login-form">
      <h2>Register</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <p className="toggle-form">
        Already have an account?{" "}
        <button onClick={toggleForm}>Login here</button>
      </p>
    </div>
  );
};

export default RegisterForm;
