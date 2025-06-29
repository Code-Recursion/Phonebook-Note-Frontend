import React, { useState, useEffect } from "react";
import "./App.css";
import Note from "./notes/Note";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import loginService from "./services/loginService";
import userService from "./services/userService";
import noteService from "./services/noteService";
// import Phonebook from "./phonebook/Phonebook";

const App = () => {
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials);
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      noteService.setToken(user.token);
      setUser(user);
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleRegister = async (credentials) => {
    try {
      await userService.register(credentials);
      const user = await loginService.login({
        username: credentials.username,
        password: credentials.password,
      });
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      noteService.setToken(user.token);
      setUser(user);
    } catch (exception) {
      setErrorMessage(exception.response?.data?.error || "Registration failed");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedNoteappUser");
    setUser(null);
    noteService.setToken(null);
  };

  const toggleForm = () => {
    setShowLogin(!showLogin);
    setErrorMessage(null);
  };

  return (
    <div className="relative">
      {errorMessage && <div className="error">{errorMessage}</div>}

      {user === null ? (
        showLogin ? (
          <LoginForm handleLogin={handleLogin} toggleForm={toggleForm} />
        ) : (
          <RegisterForm
            handleRegister={handleRegister}
            toggleForm={toggleForm}
          />
        )
      ) : (
        <div>
          <div className="user-info">
            <p>{user.name} logged in</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <Note />
        </div>
      )}
      {/* <Phonebook /> */}
    </div>
  );
};

export default App;
