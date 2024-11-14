import React, { useState } from "react";
import Select from "react-select";
import "./Appointment.css"; // Import the CSS file

function Appointment() {
    // Sample data for appointments, this could be fetched from an API in a real-world scenario
    const sampleAppointments = [
        { id: 1, patientName: "John Doe", appointmentDate: "2024-11-20", program: "HIV Program" },
        { id: 2, patientName: "Jane Smith", appointmentDate: "2024-11-21", program: "Maternal Program" },
        { id: 3, patientName: "Sam Green", appointmentDate: "2024-11-22", program: "TB Program" },
    ];

    const [appointments, setAppointments] = useState(sampleAppointments);
    const [selectedProgram, setSelectedProgram] = useState("");

    const programOptions = [
        { value: "program1", label: "Maternal Program" },
        { value: "program2", label: "HIV Program" },
        { value: "program3", label: "TB Program" },
        { value: "program4", label: "Malaria Program" },
    ];

    // Function to handle program filter change
    function handleProgramFilterChange(selectedOption) {
        setSelectedProgram(selectedOption ? selectedOption.value : "");
    }

    // Filter appointments based on selected program
    const filteredAppointments = selectedProgram
        ? appointments.filter((appointment) => appointment.program === selectedProgram)
        : appointments;

    return (
        <div className="appointment-container">
            <h2 className="appointment-header">View Appointments</h2>

            <div className="filter-section">
                <label>Filter by Program:</label>
                <Select
                    options={programOptions}
                    value={programOptions.find((option) => option.value === selectedProgram)}
                    onChange={handleProgramFilterChange}
                    className="select-field"
                    placeholder="Select program"
                />
            </div>

            <div className="appointment-list">
                {filteredAppointments.length > 0 ? (
                    <table className="appointment-table">
                        <thead>
                            <tr>
                                <th>Patient Name</th>
                                <th>Appointment Date</th>
                                <th>Program</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAppointments.map((appointment) => (
                                <tr key={appointment.id}>
                                    <td>{appointment.patientName}</td>
                                    <td>{appointment.appointmentDate}</td>
                                    <td>{appointment.program}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No appointments found for the selected program.</p>
                )}
            </div>
        </div>
    );
}

export default Appointment;
