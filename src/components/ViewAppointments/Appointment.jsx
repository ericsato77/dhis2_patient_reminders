import React, { useState, useEffect } from 'react';
import './Appointment.css';
import axios from 'axios';

function AppointmentTable() {
    const [appointments, setAppointments] = useState([
        { firstName: '', lastName: '', programEnrolled: '', appointmentType: '', schedule: '' },
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
            { firstName: '', lastName: '', programEnrolled: '', appointmentType: '', schedule: '' },
        ]);
    };

    useEffect(() => {
        const api = axios.create({
            baseURL: 'https://data.research.dhis2.org/in5320/api/',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Basic ' + btoa('admin:district'),
            },
        });

        const fetchPatientDetails = async () => {
            try {
                const response = await api.get(
                    '/trackedEntityInstances?paging=false&fields=trackedEntityInstance,attributes'
                );
                const patientData = response.data.trackedEntityInstances;

                const updatedAppointments = patientData.map((patient) => {
                    const firstName = patient.attributes.find(attr => attr.attribute === 'w75KJ2mc4zz')?.value;
                    const lastName = patient.attributes.find(attr => attr.attribute === 'zDhUuAYrxNC')?.value;
                    const programEnrolled = patient.attributes.find(attr => attr.attribute === 'program')?.value;

                    return {
                        firstName: firstName || '',
                        lastName: lastName || '',
                        programEnrolled: programEnrolled || '',
                        appointmentType: '',
                        schedule: '',
                    };
                });
                setAppointments(updatedAppointments);
            } catch (error) {
                console.error('Error fetching patient data:', error);
            }
        };

        fetchPatientDetails();
    }, []);

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
                                    value={appointment.schedule}
                                    onChange={(e) =>
                                        handleInputChange(index, 'schedule', e.target.value)
                                    }
                                    className="input-field"
                                />
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
