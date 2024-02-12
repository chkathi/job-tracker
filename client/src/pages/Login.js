import React, { useState } from "react";
import axios from "axios";

import "../App.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    const data = { username: username, password: password };

    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else sessionStorage.setItem("accessToken", response.data);
    });
  };

  return (
    <div className="loginContainer">
      <label>UserName: </label>
      <input type="text" onChange={(e) => setUsername(e.target.value)} />

      <label>Password: </label>
      <input type="password" onChange={(e) => setPassword(e.target.value)} />

      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;
