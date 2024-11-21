import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  return (
    <nav className="navbar">

      <NavLink to="/Register" activeClassName="active-link" className="nav-link Register">
        Register Patient
      </NavLink>

      <NavLink to="/enroll" activeClassName="active-link" className="nav-link enroll">
        Enroll Patient
      </NavLink>
      
      <NavLink to="/view-enrolled" activeClassName="active-link" className="nav-link enrolled">
        View Enrolled Patients
      </NavLink>
      
      <NavLink to="/view-appointments" activeClassName="active-link" className="nav-link appointments">
        View Appointments
      </NavLink>
      
    </nav>
    
    
  );
}


export default NavBar;