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
  const [authState, setAuthState] = useState(false);

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
          setAuthState(false);
        } else {
          setAuthState(true);
        }
      });
  }, []); // only run once when reloaded page

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="navbar">
            <Link to="/">Home</Link>
            <Link to="/addJob">Add Job</Link>
            {!authState && (
              <>
                <Link to="/login">Login</Link>
                <Link to="/registration">Registration</Link>
              </>
            )}
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
