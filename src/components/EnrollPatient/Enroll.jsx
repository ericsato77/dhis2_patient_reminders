import React, { useState } from 'react';
import Select from 'react-select';
import './Enroll.css'; // Import the CSS file

function Enroll() {
    const [formData, setFormData] = useState({
        orgUnit: '',
        programEnrolled: '',
        patientId: '',
    });

    const orgUnitOptions = [
        { value: 'unit1', label: 'Org Unit 1' },
        { value: 'unit2', label: 'Org Unit 2' },
        { value: 'unit3', label: 'Org Unit 3' },
    ];

    const programOptions = [
        { value: 'program1', label: 'Maternal Program' },
        { value: 'program2', label: 'HIV Program' },
        { value: 'program3', label: 'TB Program' },
        { value: 'program4', label: 'Malaria Program' },
    ];

    const patientOptions = [
        { value: 'patient1', label: 'Patient 1' },
        { value: 'patient2', label: 'Patient 2' },
        { value: 'patient3', label: 'Patient 3' },
    ];

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

            <div className="form-group">
                <label>Organization Unit:</label>
                <Select
                    options={orgUnitOptions}
                    value={orgUnitOptions.find(option => option.value === formData.orgUnit)}
                    onChange={(option) => handleSelectChange(option, 'orgUnit')}
                    className="select-field"
                    placeholder="Select organization unit"
                />
            </div>

            <div className="form-group">
                <label>Program:</label>
                <Select
                    options={programOptions}
                    value={programOptions.find(option => option.value === formData.programEnrolled)}
                    onChange={(option) => handleSelectChange(option, 'programEnrolled')}
                    className="select-field"
                    placeholder="Select program"
                />
            </div>

            <div className="form-group">
                <label>Patient:</label>
                <Select
                    options={patientOptions}
                    value={patientOptions.find(option => option.value === formData.patientId)}
                    onChange={(option) => handleSelectChange(option, 'patientId')}
                    className="select-field"
                    placeholder="Select patient"
                />
            </div>

            <button type="submit" className="submit-button">Enroll</button>
        </form>
    );
}

export default Enroll;
