import React, { useState } from 'react';
import './Appointment.css';

function AppointmentTable() {
    const [appointments, setAppointments] = useState([
        { firstName: '', lastName: '', programEnrolled: '', appointmentType: '' },
    ]);

    const handleInputChange = (index, field, value) => {
        const updatedAppointments = appointments.map((appointment, i) =>
            i === index ? { ...appointment, [field]: value } : appointment
        );
        setAppointments(updatedAppointments);
    };

    const handleAddAppointment = () => {
        setAppointments([
            ...appointments,
            { firstName: '', lastName: '', programEnrolled: '', appointmentType: '' },
        ]);
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
                        <th>Action</th>
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
                                <button
                                    className="send-sms-button"
                                    onClick={handleAddAppointment}
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
}

export default AppointmentTable;
