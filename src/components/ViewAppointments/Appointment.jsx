import React, { useState } from 'react';

function AppointmentTable() {
    const [appointments, setAppointments] = useState([
        {
            patientId: '',
            patientName: '',
            preferredLanguage: '',
            reminder: '',
            schedule: '',
            status: '',
        },
    ]);

    const languageOptions = ['English', 'Chichewa'];
    const reminderOptions = ['SMS', 'Email', 'Call'];
    const statusOptions = ['Pending', 'Completed', 'Canceled'];

    const handleInputChange = (index, field, value) => {
        const updatedAppointments = [...appointments];
        updatedAppointments[index][field] = value;
        setAppointments(updatedAppointments);
    };

    const addRow = () => {
        setAppointments([
            ...appointments,
            {
                patientId: '',
                patientName: '',
                preferredLanguage: '',
                reminder: '',
                schedule: '',
                status: '',
            },
        ]);
    };

    const removeRow = (index) => {
        const updatedAppointments = appointments.filter((_, i) => i !== index);
        setAppointments(updatedAppointments);
    };

    return (
        <div>
            <h2>Appointments</h2>
            <table border="1" cellPadding="8">
                <thead>
                    <tr>
                        <th>Patient ID</th>
                        <th>Patient Name</th>
                        <th>Preferred Language</th>
                        <th>Reminder</th>
                        <th>Schedule</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appointment, index) => (
                        <tr key={index}>
                            <td>
                                <input
                                    type="text"
                                    value={appointment.patientId}
                                    onChange={(e) =>
                                        handleInputChange(index, 'patientId', e.target.value)
                                    }
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={appointment.patientName}
                                    onChange={(e) =>
                                        handleInputChange(index, 'patientName', e.target.value)
                                    }
                                />
                            </td>
                            <td>
                                <select
                                    value={appointment.preferredLanguage}
                                    onChange={(e) =>
                                        handleInputChange(index, 'preferredLanguage', e.target.value)
                                    }
                                >
                                    <option value="">Select Language</option>
                                    {languageOptions.map((language) => (
                                        <option key={language} value={language}>
                                            {language}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                <select
                                    value={appointment.reminder}
                                    onChange={(e) =>
                                        handleInputChange(index, 'reminder', e.target.value)
                                    }
                                >
                                    <option value="">Select Reminder</option>
                                    {reminderOptions.map((reminder) => (
                                        <option key={reminder} value={reminder}>
                                            {reminder}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                <input
                                    type="date"
                                    value={appointment.schedule}
                                    onChange={(e) =>
                                        handleInputChange(index, 'schedule', e.target.value)
                                    }
                                />
                            </td>
                            <td>
                                <select
                                    value={appointment.status}
                                    onChange={(e) =>
                                        handleInputChange(index, 'status', e.target.value)
                                    }
                                >
                                    <option value="">Select Status</option>
                                    {statusOptions.map((status) => (
                                        <option key={status} value={status}>
                                            {status}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                <button onClick={() => removeRow(index)}>Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={addRow}>Add Appointment</button>
        </div>
    );
}

export default AppointmentTable;
