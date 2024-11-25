import React, { useState } from 'react';
import './Appointment.css';

function AppointmentTable() {
    // Dynamically create empty rows
    const [appointments, setAppointments] = useState(
        Array(7).fill({ firstName: '', lastName: '', programEnrolled: '', appointmentType: '', reminder: '' })
    );

    const handleInputChange = (index, field, value) => {
        // Update only the specific row and field
        const updatedAppointments = appointments.map((appointment, i) =>
            i === index ? { ...appointment, [field]: value } : appointment
        );
        setAppointments(updatedAppointments);
    };

    return (
        <div className="table-container">
            <h2>Appointments</h2>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Program Enrolled</th>
                        <th>Appointment Type</th>
                        <th>Reminder</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appointment, index) => (
                        <tr key={index}>
                            <td>{appointment.firstName || '-'}</td>
                            <td>{appointment.lastName || '-'}</td>
                            <td>{appointment.programEnrolled || '-'}</td>
                            <td>
                                <select
                                    value={appointment.appointmentType}
                                    onChange={(e) =>
                                        handleInputChange(index, 'appointmentType', e.target.value)
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
                                    value={appointment.reminder}
                                    onChange={(e) =>
                                        handleInputChange(index, 'reminder', e.target.value)
                                    }
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AppointmentTable;
