import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Input, NoticeBox, Button } from "@dhis2/ui";
import { enrollPatient } from "./Api";
import "./Enroll.css";
import { useDataQuery } from "@dhis2/app-runtime";
require('dotenv').config();
// Error messages centralized for reusability
const ERROR_MESSAGES = {
    MISSING_FIELDS: "Please fill all fields before enrolling.",
    UNEXPECTED_RESPONSE: "Enrollment failed: Unexpected response.",
    PATIENT_ALREADY_ENROLLED: "Enrollment failed: Please ensure the patient isn't already enrolled.",
};

// Queries for fetching data
const orgUnitsQuery = {
    orgUnits: {
        resource: "organisationUnits",
        params: {
            fields: ["id", "displayName"],
            paging: false,
            level: 2,
        },
    },
};

const programsQuery = (orgUnitId) => ({
    programs: {
        resource: "programs",
        params: {
            orgUnit: orgUnitId,
            fields: ["id", "displayName"],
            paging: false,
        },
    },
});

const patientsQuery = (orgUnitId) => ({
    patients: {
        resource: "trackedEntityInstances",
        params: {
            ou: "kJq2mPyFEHo",
            trackedEntityType: "nEenWmSyUEp",
            fields: ["trackedEntityInstance", "attributes"],
            pageSize: 50,
        },
    },
});

const mapToOptions = (items, labelKey = "displayName", valueKey = "id") =>
    items?.map((item) => ({
        value: item[valueKey],
        label: item[labelKey],
    })) || [];

const Enroll = () => {
    const [formData, setFormData] = useState({
        orgUnit: "",
        programEnrolled: "",
        patientId: "",
        enrollmentDate: new Date().toISOString().split("T")[0],
    });

    const [status, setStatus] = useState({
        success: false,
        error: "",
        loading: false,
    });

    const { loading: loadingOrgUnits, data: orgUnitsData } = useDataQuery(orgUnitsQuery);
    const { loading: loadingPrograms, data: programsData, refetch: refetchPrograms } =
        useDataQuery(programsQuery(formData.orgUnit), { lazy: true });
    const { loading: loadingPatients, data: patientsData, refetch: refetchPatients } =
        useDataQuery(patientsQuery("DFyu9VGpodC"), { lazy: true });

    const orgUnitsList = mapToOptions(orgUnitsData?.orgUnits?.organisationUnits);
    const programsList = mapToOptions(programsData?.programs?.programs);
    const patientsList =
        patientsData?.patients?.trackedEntityInstances.map((patient) => {
            const firstName = patient.attributes.find((attr) => attr.attribute === "w75KJ2mc4zz")?.value;
            const lastName = patient.attributes.find((attr) => attr.attribute === "zDhUuAYrxNC")?.value;
            return {
                value: patient.trackedEntityInstance,
                label: `${firstName || ""} ${lastName || ""}`.trim(),
            };
        }) || [];

    useEffect(() => {
        if (formData.orgUnit) {
            refetchPrograms();
            refetchPatients();
        }
    }, [formData.orgUnit]);

    const handleSelectChange = (selectedOption, fieldName) => {
        setFormData((prev) => ({
            ...prev,
            [fieldName]: selectedOption?.value || "",
        }));
    };

    const handleEnroll = async () => {
        const { orgUnit, programEnrolled, patientId, enrollmentDate } = formData;

        if (!orgUnit || !programEnrolled || !patientId) {
            setStatus({ success: false, error: ERROR_MESSAGES.MISSING_FIELDS, loading: false });
            return;
        }

        setStatus({ success: false, error: "", loading: true });

        try {
            const enrollmentData = {
                program: programEnrolled,
                orgUnit,
                trackedEntityInstance: patientId,
                enrollmentDate,
            };

            const response = await enrollPatient(enrollmentData);

            if (response) {
                setStatus({ success: true, error: "", loading: false });
                //sending message

                require("dotenv").config(); // Load environment variables

                const sendMessage = async (patientName, patientPhoneNumber) => {
                    if (!patientName || !patientPhoneNumber) {
                        console.error("Patient name and phone number are required.");
                        return;
                    }
                
                    // Load environment variables
                    const apiKey = process.env.REACT_APP_KEY;
                    const password = process.env.REACT_SMS_PASSWORD;
                    const senderName = process.env.REACT_SMS_SENDER;
                
                    // Validate environment variables
                    if (!apiKey || !password || !gatewayUrl || !senderName) {
                        console.error("Environment variables are missing. Check your .env file.");
                        return;
                    }
                
                    // Construct the message
                    const message = `Hello ${patientName}, you have an appointment.`;
                
                    // Prepare form data
                    const formdata = new FormData();
                    formdata.append("api_key", apiKey);
                    formdata.append("password", password);
                    formdata.append("text", message);
                    formdata.append("numbers", patientPhoneNumber); // Dynamically set phone number
                    formdata.append("from", senderName);
                
                    // Configure request options
                    const requestOptions = {
                        method: "POST",
                        body: formdata,
                        redirect: "follow",
                    };
                
                    try {
                        // Send SMS request
                        const response = await fetch(gatewayUrl, requestOptions);
                        if (response.ok) {
                            const result = await response.text();
                            console.log("Message sent successfully:", result);
                        } else {
                            console.error("Failed to send message. Status:", response.status);
                        }
                    } catch (error) {
                        console.error("Error sending message:", error);
                    }
                };
                
               
                
                sendMessage(patient.name, patient.phoneNumber);
                

sendMessage(patient.name, patient.phoneNumber);

                


            } else {
                setStatus({ success: false, error: ERROR_MESSAGES.UNEXPECTED_RESPONSE, loading: false });
            }
        } catch (error) {
            setStatus({
                success: false,
                error: ERROR_MESSAGES.PATIENT_ALREADY_ENROLLED,
                loading: false,
            });
        }
    };

    return (
        <form onSubmit={(e) => e.preventDefault()} className="form-container">
            <h2 className="form-header">Patient Enrollment</h2>

            {status.success && (
                <NoticeBox title="Success" success>
                    Patient enrolled successfully!
                </NoticeBox>
            )}

            <div className="form-group">
                <label>Organization Unit:</label>
                <Select
                    options={orgUnitsList}
                    value={orgUnitsList.find((option) => option.value === formData.orgUnit)}
                    onChange={(option) => handleSelectChange(option, "orgUnit")}
                    className="select-field"
                    placeholder="Select organization unit"
                    isLoading={loadingOrgUnits}
                />
            </div>

            <div className="form-group">
                <label>Program:</label>
                <Select
                    options={programsList}
                    value={programsList.find((option) => option.value === formData.programEnrolled)}
                    onChange={(option) => handleSelectChange(option, "programEnrolled")}
                    className="select-field"
                    placeholder="Select program"
                    isLoading={loadingPrograms}
                />
            </div>

            <div className="form-group">
                <label>Patient:</label>
                <Select
                    options={patientsList}
                    value={patientsList.find((option) => option.value === formData.patientId)}
                    onChange={(option) => handleSelectChange(option, "patientId")}
                    className="select-field"
                    placeholder="Select patient"
                    isLoading={loadingPatients}
                />
            </div>

            <div className="form-group">
                <Input
                    label="Enrollment Date"
                    type="date"
                    value={formData.enrollmentDate}
                    onChange={({ value }) =>
                        setFormData((prev) => ({ ...prev, enrollmentDate: value }))
                    }
                    className="input-field"
                />
            </div>

            <button
                onClick={handleEnroll}
                type="button"
                className="submit-button"
                disabled={status.loading}
            >
                {status.loading ? "Enrolling..." : "Enroll Patient"}
            </button>

            {status.error && (
                <NoticeBox title="Error" error>
                    {status.error}
                </NoticeBox>
            )}

           
        </form>
    );
};

export default Enroll;
