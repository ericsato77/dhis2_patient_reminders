import React from "react";
import Home from "./components/Landingpage/Home";
import Enroll from "./components/EnrollPatient/Enroll";
import Register from "./components/RegisterPatient/Register";
import NavBar from "./components/NavigationBar/NavBar";
import Footer from "./components/Footer/Footer";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div className="container">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/enroll" element={<Enroll />} />
        </Routes>
      </BrowserRouter>
      <Footer className="footer" />
    </div>
  );
};

export default App;
