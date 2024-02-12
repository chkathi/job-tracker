import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Home } from "./pages/Home.js";
import { AddJob } from "./pages/AddJob.js";
import { NavBar } from "./NavBar.js";
import Registration from "./pages/Registration.js";
import Login from "./pages/Login.js";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addJob" element={<AddJob />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
