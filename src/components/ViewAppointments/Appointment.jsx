import React, { useState } from 'react';
import './Appointment.css'; // Ensure CSS has the updated compact styling.

function AppointmentTable() {
    const [appointments, setAppointments] = useState(
        Array(7).fill({
            firstName: '',
            lastName: '',
            programEnrolled: '',
            appointmentType: '',
            reminder: '',
        })
    );

    const handleInputChange = (index, field, value) => {
        const updatedAppointments = [...appointments];
        updatedAppointments[index][field] = value;
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
                            <td>
                                <input
                                    type="text"
                                    value={appointment.firstName}
                                    onChange={(e) =>
                                        handleInputChange(index, 'firstName', e.target.value)
                                    }
                                    placeholder="Enter First Name"
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={appointment.lastName}
                                    onChange={(e) =>
                                        handleInputChange(index, 'lastName', e.target.value)
                                    }
                                    placeholder="Enter Last Name"
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={appointment.programEnrolled}
                                    onChange={(e) =>
                                        handleInputChange(index, 'programEnrolled', e.target.value)
                                    }
                                    placeholder="Enter Program"
                                />
                            </td>
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
