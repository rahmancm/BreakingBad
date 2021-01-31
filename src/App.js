import React, { useState, useEffect } from "react";
import axios from "axios";
import BreakingBad from "./Components/BreakingBad";
import logo from "./images/logo.png";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  // logout the user
  const handleLogout = () => {
    setUser({});
    setUsername("");
    setPassword("");
    localStorage.clear();
  };

  // login the user
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { username, password };
    // send the username and password to the server
    const response = await axios.post(
      "http://blogservice.herokuapp.com/api/login",
      user
    );
    // set the state of the user
    setUser(response.data);
    // store the user in localStorage
    localStorage.setItem("user", JSON.stringify(response.data));
  };

  // if there's a user show the message below
  if (user) {
    return (
      <div>
        <BreakingBad />
        <button
          className="logout btn btn-warning border-radius-1"
          onClick={handleLogout}
        >
          Log out
        </button>
      </div>
    );
  }

  // if there's no user, show the login form
  return (
    <div className="center m-5">
      <img className="center" src={logo} alt="logo" />
      <form onSubmit={handleSubmit} className="loginform ">
        <label htmlFor="username">User name: </label>
        <br />
        <input
          type="text"
          value={username}
          placeholder="Enter username"
          onChange={({ target }) => setUsername(target.value)}
        />
        <div>
          <label htmlFor="password">Password: </label>
          <br />
          <input
            type="text"
            value={password}
            placeholder="Enter password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button className="btn btn-danger center" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default App;
