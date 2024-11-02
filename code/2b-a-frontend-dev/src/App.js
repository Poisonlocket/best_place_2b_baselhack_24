import './App.css';
import React from "react";
import Navbar from "./components/Navbar";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Home from "./pages";
import Edit from "./pages/Edit";
import View from "./pages/View";
import Test from "./pages/Test";
import OurFooter from './components/Footerbar';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/view" element={<View />} />
        <Route path="/test" element={<Test />} />
      </Routes>
      <OurFooter />
    </Router>
  );
}

export default App;
