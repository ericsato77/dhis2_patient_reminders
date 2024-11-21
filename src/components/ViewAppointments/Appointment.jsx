import React from 'react';
import './Appointment.css'

function Appointments() {
    // Sample data for appointments
    const sampleAppointments = [
        {
            patientId: 1,
            patientName: "Wiseman",
            program: "Malaria",
            preferredLanguage: "Chichewa",
            reminder: "SMS",
            schedule: "Weekly",
            status: "Active"
        },
        {
            patientId: 2,
            patientName: "Jane Doe",
            program: "HIV",
            preferredLanguage: "English",
            reminder: "Email",
            schedule: "Monthly",
            status: "Inactive"
        },
    ];

    return (
        <div>
            <h2>View Appointments</h2>
            <table>
                <thead>
                    <tr>
                        <th>Patient ID</th>
                        <th>Program</th>
                        <th>Preferred Language</th>
                        <th>Reminder</th>
                        <th>Schedule</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {sampleAppointments.map((appointment) => (
                        <tr>
                            <td>{appointment.patientId}</td>
                            <td>{appointment.program}</td>
                            <td>{appointment.preferredLanguage}</td>
                            <td>{appointment.reminder}</td>
                            <td>{appointment.schedule}</td>
                            <td>{appointment.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Appointments;
