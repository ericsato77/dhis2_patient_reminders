import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Appointment.css";

const AppointmentTable = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const api = axios.create({
    baseURL: "https://data.research.dhis2.org/in5320/api/",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + btoa("admin:district"),
    },
  });

  const fetchPatientDetails = async () => {
    try {
      const response = await api.get(
        "/trackedEntityInstances?paging=false&fields=trackedEntityInstance,attributes"
      );
      const patientData = response.data.trackedEntityInstances.map((patient) => ({
        firstName: patient.attributes.find((attr) => attr.attribute === "w75KJ2mc4zz")?.value || "--",
        lastName: patient.attributes.find((attr) => attr.attribute === "zDhUuAYrxNC")?.value || "--",
        programEnrolled: patient.attributes.find((attr) => attr.attribute === "program")?.value || "--",
        appointmentType: "",
        schedule: "",
      }));
      setAppointments(patientData);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching patient data:", err);
      setError("Failed to fetch patient details. Please try again later.");
      setLoading(false);
    }
  };

  const handleInputChange = (index, field, value) => {
    const updatedAppointments = appointments.map((appointment, i) =>
      i === index ? { ...appointment, [field]: value } : appointment
    );
    setAppointments(updatedAppointments);
  };
  const handleSendSMS = (index) => {
    const appointment = appointments[index];
    if (!appointment.appointmentType || !appointment.schedule) {
      alert("Please select an appointment type and schedule before sending.");
      return;
    }

    alert(
      `SMS sent successfully to ${appointment.firstName} ${appointment.lastName} for a ${appointment.appointmentType} appointment on ${appointment.schedule}.`
    );
  };

  useEffect(() => {
    fetchPatientDetails();
  }, []);

  if (loading) {
    return <div className="loader">Loading patient details...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="table-container">
      <h2>Schedule Appointments</h2>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Program Enrolled</th>
            <th>Appointment Type</th>
            <th>Schedule</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment, index) => (
            <tr key={index}>
              <td>{appointment.firstName}</td>
              <td>{appointment.lastName}</td>
              <td>{appointment.programEnrolled}</td>
              <td>
                <select
                  value={appointment.appointmentType}
                  onChange={(e) =>
                    handleInputChange(index, "appointmentType", e.target.value)
                  }
                >
                  <option value="">Select Type</option>
                  <option value="Checkup">Checkup</option>
                  <option value="Consultation">Consultation</option>
                  <option value="Follow Up">Follow Up</option>
                </select>
              </td>
              <td>
                <input
                  type="date"
                  value={appointment.schedule}
                  onChange={(e) =>
                    handleInputChange(index, "schedule", e.target.value)
                  }
                />
              </td>
              <td>
                <button
                  className="send-sms-button"
                  onClick={() => handleSendSMS(index)}
                >
                  Send SMS
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentTable;
