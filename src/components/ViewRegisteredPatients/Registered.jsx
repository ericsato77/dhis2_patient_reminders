import React, { useState } from "react";
import "./Registered.css";

const Registered = (registeredPatients) => {
  return (
    <div className="patient-list">
      <h2>Registered Patients</h2>
      {registeredPatients.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Date of Birth</th>
              <th>Gender</th>
              <th>Phone</th>
              <th>Location</th>
              <th>Organization Unit</th>
            </tr>
          </thead>
          <tbody>
            {registeredPatients.map((patient, index) => (
              <tr key={index}>
                <td>{patient.firstName}</td>
                <td>{patient.lastName}</td>
                <td>{patient.dob}</td>
                <td>{patient.gender}</td>
                <td>{patient.phone}</td>
                <td>{patient.location || "N/A"}</td>
                <td>{patient.orgUnit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No patients registered yet.</p>
      )}
    </div>
  );
};

export default Registered;
