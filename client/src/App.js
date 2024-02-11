import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Home } from "./pages/Home.js";
import { AddJob } from "./pages/AddJob.js";
import { NavBar } from "./NavBar.js";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addJob" element={<AddJob />} />
          {/* <Route path="*" element={<Home />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
