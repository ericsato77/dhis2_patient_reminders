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

    function handleSubmit(event) {
        event.preventDefault();
        console.log('Form data:', formData);
        alert('Form submitted!');
    }

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h2 className="form-header">Patient Enrollment</h2>

            {renderFormInput("Fullname:", "fullName", formData.fullName, handleInputChange)}
            {renderFormInput("Patient Id:", "patientId", formData.patientId, handleInputChange)}
            {renderFormInput("Date of birth:", "dob", formData.dob, handleInputChange, "date")}
            {renderFormSelect("Gender:", "gender", genderOptions, formData.gender, handleSelectChange)}
            {renderFormInput("Phone number:", "phoneNumber", formData.phoneNumber, handleInputChange, "tel")}
            {renderFormInput("Email:", "email", formData.email, handleInputChange, "email")}
            {renderFormSelect("Language preference:", "preferredLanguage", languageOptions, formData.preferredLanguage, handleSelectChange)}
            {renderFormSelect("Program enrolled:", "programEnrolled", programOptions, formData.programEnrolled, handleSelectChange)}

            <button type="submit" className="submit-button">Enroll</button>
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
