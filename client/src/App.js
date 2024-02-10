import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import { Home } from "./pages/Home.js";
import { AddJob } from "./pages/AddJob.js";

function App() {
  return (
    <div className="App">
      <Router>
        <Link to="/">Home</Link>
        <Link to="/addJob">Add Job</Link>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addJob" element={<AddJob />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
