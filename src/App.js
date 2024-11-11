import React from "react";
import Home from "./components/Landingpage/Home";
import Enroll from "./components/EnrollPatient/Enroll";
import Appointment from "./components/ViewAppointments/Appointment";
import EnrolledPatients from "./components/ViewEnrolledPatients/EnrolledPatients";
import NavBar from "./components/NavigationBar/NavBar";
import Footer from "./components/Footer/Footer";
import  "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom";
const App = () => {
  return (
    <div className="container">
      <BrowserRouter>
      <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route
            path="/enroll"
            element={<EnrolledPatients></EnrolledPatients>}
          ></Route>
          <Route path="/" element={<Home></Home>}></Route>
          
        </Routes>
      </BrowserRouter>
      <Footer></Footer>
    </div>
  );
};

export default App;
