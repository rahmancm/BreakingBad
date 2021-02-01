import React, { useState, useEffect } from "react";
import axios from "axios";
import BreakingBad from "./Components/BreakingBad";
import logo from "./images/logo.png";
import bg from "./images/1xtKO9d.jpg";

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
    window.location.href = "/";
  };

  // login the user
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { username, password };
    // send the username and password to the server
    const response = await axios.post("http://localhost:3003/user", user);
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
          Log Out
        </button>
        <h3 className="username">Hi {user.username} !</h3>
      </div>
    );
  }

  // if there's no user, show the login form
  return (
    <div className="center m-5 logmain">
      <img className="center" src={logo} alt="logo" />
      <div className="backgroundbg">
        <img src={bg} alt="background" />
      </div>

      <form onSubmit={handleSubmit} className="loginform ">
        <label htmlFor="username">User name: </label>

        <input
          className="credentials"
          type="text"
          value={username}
          placeholder="Enter username"
          onChange={({ target }) => setUsername(target.value)}
        />
        <div>
          <label htmlFor="password">Password: </label>

          <input
            className="credentials"
            type="text"
            value={password}
            placeholder="Enter password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button className="btn btn-danger ml-5 pl-5" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default App;
