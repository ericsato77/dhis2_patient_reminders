import React, { useState } from 'react';
import Select from 'react-select';
import './Enroll.css'; // Import the CSS file

function Enroll() {
    const [formData, setFormData] = useState({
        fullName: '',
        patientId: '',
        dob: '',
        gender: '',
        phoneNumber: '',
        email: '',
        preferredLanguage: '',
        programEnrolled: '',
    });

    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const genderOptions = [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'other', label: 'Other' },
    ];

    const languageOptions = [
        { value: 'en', label: 'English' },
        { value: 'fr', label: 'Chichewa' },
    ];

    const programOptions = [
        { value: 'program1', label: 'Maternal Program' },
        { value: 'program2', label: 'HIV Program' },
        { value: 'program3', label: 'TB Program' },
        { value: 'program4', label: 'Malaria Program' },
    ];

    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    }

    function handleSelectChange(selectedOption, fieldName) {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [fieldName]: selectedOption ? selectedOption.value : '',
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setError(null);
        setSuccessMessage(null);

        const apiUrl = process.env.REACT_APP_DHIS2_URL;
        const username = process.env.REACT_APP_DHIS2_USERNAME;
        const password = process.env.REACT_APP_DHIS2_PASSWORD;

        const enrollmentData = {
            trackedEntityType: 'nEenWmSyUEp', // Example tracked entity type ID
            orgUnit: 'DiszpKrYNg8', // Example organization unit ID
            attributes: [
                { attribute: 'sB1IHYu2xQT', value: formData.fullName },
                { attribute: 'fctSQp5nAYl', value: formData.dob },
                { attribute: 'cejWyOfXge6', value: formData.phoneNumber },
                { attribute: 'oindugucx72', value: formData.email },
                { attribute: 'qZZf8vD8d8W', value: formData.gender },
                { attribute: 'czpFPnwPz6E', value: formData.preferredLanguage },
            ],
            enrollments: [
                {
                    orgUnit: 'DiszpKrYNg8',
                    program: formData.programEnrolled,
                    enrollmentDate: new Date().toISOString().split('T')[0],
                },
            ],
        };

        try {
            const response = await fetch(`${apiUrl}/api/trackedEntityInstances`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Basic ${btoa(`${username}:${password}`)}`,
                },
                body: JSON.stringify(enrollmentData),
            });

            if (response.ok) {
                setSuccessMessage('Patient enrolled successfully!');
                setFormData({
                    fullName: '',
                    patientId: '',
                    dob: '',
                    gender: '',
                    phoneNumber: '',
                    email: '',
                    preferredLanguage: '',
                    programEnrolled: '',
                });
            } else {
                const errorData = await response.json();
                setError(`Error: ${errorData.message || 'An error occurred while enrolling the patient.'}`);
            }
        } catch (error) {
            setError('An unexpected error occurred. Please try again.');
        }
    }

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h2 className="form-header">Patient Enrollment</h2>

            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}

            {renderFormInput("Fullname:", "fullName", formData.fullName, handleInputChange)}
            {renderFormInput("Patient Id:", "patientId", formData.patientId, handleInputChange)}
            {renderFormInput("Date of birth:", "dob", formData.dob, handleInputChange, "date")}
            {renderFormSelect("Gender:", "gender", genderOptions, formData.gender, handleSelectChange)}
            {renderFormInput("Phone number:", "phoneNumber", formData.phoneNumber, handleInputChange, "tel")}
            {renderFormInput("Email:", "email", formData.email, handleInputChange, "email")}
            {renderFormSelect("Language preference:", "preferredLanguage", languageOptions, formData.preferredLanguage, handleSelectChange)}
            {renderFormSelect("Program enrolled:", "programEnrolled", programOptions, formData.programEnrolled, handleSelectChange)}

            <button type="submit" className="submit-button">ENROLL</button>
        </form>
    );
}

function renderFormInput(label, name, value, onChange, type = "text") {
    return (
        <div className="form-group">
            <label>{label}</label>
            <input 
                type={type} 
                name={name} 
                value={value} 
                onChange={onChange} 
                required 
                className="input-field" 
            />
        </div>
    );
}

function renderFormSelect(label, name, options, value, onChange) {
    return (
        <div className="form-group">
            <label>{label}</label>
            <Select
                options={options}
                value={options.find(option => option.value === value)}
                onChange={(option) => onChange(option, name)}
                className="select-field"
                placeholder={`Select ${label.toLowerCase()}`}
            />
        </div>
    );
}

export default Enroll;
