import React, { useState } from 'react';
import Select from 'react';

const Enroll = () => {
    const [form, setForm] = useState({
        fullName: '',
        patientId: '',
        dob: '',
        gender: '',
        phoneNumber: '',
        email: '',
        preferredLanguage: '',
        programEnrolled: '',
    });

    const genderOptions = [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'other', label: 'Other' },
    ];

    const languageOptions = [
        { value: 'en', label: 'English' },
        { value: 'fr', label: 'French' },
        { value: 'es', label: 'Spanish' },
    ];

    const programOptions = [
        { value: 'program1', label: 'Program 1' },
        { value: 'program2', label: 'Program 2' },
        { value: 'program3', label: 'Program 3' },
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSelectChange = (selectedOption, { name }) => {
        setForm({ ...form, [name]: selectedOption ? selectedOption.value : '' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data:', form);
        alert('Form submitted!');
    };

    return (
        <form onSubmit={handleSubmit} style={formStyle}>
            <h2 style={headerStyle}>Patient Enrollment</h2>

            <div style={formGroup}>
                <label>Fullname:</label>
                <input type="text" name="fullName" value={form.fullName} onChange={handleInputChange} required />
            </div>

            <div style={formGroup}>
                <label>Patient Id:</label>
                <input type="text" name="patientId" value={form.patientId} onChange={handleInputChange} required />
            </div>

            <div style={formGroup}>
                <label>Date of birth:</label>
                <input type="date" name="dob" value={form.dob} onChange={handleInputChange} required />
            </div>

            <div style={formGroup}>
                <label>Gender:</label>
                <Select
                    options={genderOptions}
                    name="gender"
                    onChange={(option) => handleSelectChange(option, { name: 'gender' })}
                    placeholder="Select gender"
                />
            </div>

            <div style={formGroup}>
                <label>Phone number:</label>
                <input type="tel" name="phoneNumber" value={form.phoneNumber} onChange={handleInputChange} />
            </div>

            <div style={formGroup}>
                <label>Email:</label>
                <input type="email" name="email" value={form.email} onChange={handleInputChange} />
            </div>

            <div style={formGroup}>
                <label>Language preference:</label>
                <Select
                    options={languageOptions}
                    name="preferredLanguage"
                    onChange={(option) => handleSelectChange(option, { name: 'preferredLanguage' })}
                    placeholder="Select language"
                />
            </div>

            <div style={formGroup}>
                <label>Program enrolled:</label>
                <Select
                    options={programOptions}
                    name="programEnrolled"
                    onChange={(option) => handleSelectChange(option, { name: 'programEnrolled' })}
                    placeholder="Select program"
                />
            </div>

            <button type="submit" style={buttonStyle}>Enroll</button>
        </form>
    );
};

export default Enroll