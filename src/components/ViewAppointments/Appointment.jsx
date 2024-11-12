import React from 'react';

function Appointment() {
  return (
    <div className="appointments-container">
      <div className="header">
       
      </div>

      <h2>Appointments</h2>

      <table className="appointments-table">
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Appointment Date & Time</th>
            <th>Reminder Status</th>
            <th>Type of Appointment</th>
            <th>Location</th>
            <th>Contact Information</th>
            <th>Notes</th>
            <th>Health Worker Assigned</th>
          </tr>
        </thead>
        
      </table>
    </div>
  );
}

export default Appointment;
