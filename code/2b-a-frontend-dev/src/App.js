import './App.css';
import React from "react";
import Navbar from "./components/Navbar/Navbar";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Home from "./pages";
import Edit from "./pages/Edit";
import View from "./pages/View"

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/view" element={<View />} />
      </Routes>
    </Router>
  );
}

export default App;
