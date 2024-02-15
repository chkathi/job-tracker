import "./App.css";

import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Home } from "./pages/Home.js";
import { AddJob } from "./pages/AddJob.js";
import Registration from "./pages/Registration.js";
import Login from "./pages/Login.js";
import axios from "axios";
import { AuthContext } from "./Helper/AuthContext.js";

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  // // if there is still a token when page is rerendered
  // // do not show login and reg because user is logined
  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []); // only run once when reloaded page

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({
      username: "",
      id: 0,
      status: false,
    });
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="navbar">
            <Link to="/">Home</Link>
            <Link to="/addJob">Add Job</Link>
            {!authState.status ? (
              <>
                <Link to="/login">Login</Link>
                <Link to="/registration">Registration</Link>
              </>
            ) : (
              <button onClick={logout}>Log Out</button>
            )}

            <h1>{authState.username}</h1>
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/addJob" element={<AddJob />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
