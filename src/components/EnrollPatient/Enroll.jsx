import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Input, NoticeBox, Button } from "@dhis2/ui";
import { enrollPatient } from "./Api";
import "./Enroll.css";
import { useDataQuery } from "@dhis2/app-runtime";

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
            orgUnit: "PMa2VCrupOd",
            fields: ["id", "displayName"],
            paging: false,
        },
    },
});

const patientsQuery = (orgUnitId) => ({
    patients: {
        resource: "trackedEntityInstances",
        params: {
            ou: "PMa2VCrupOd",
            trackedEntityType: "nEenWmSyUEp",
            fields: ["trackedEntityInstance", "attributes"],
            paging: false
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
        useDataQuery(patientsQuery(formData.orgUnit), { lazy: true });

    console.log(patientsData);


    const orgUnitsList = mapToOptions(orgUnitsData?.orgUnits?.organisationUnits);
    const programsList = mapToOptions(programsData?.programs?.programs);
    const patientsList =
        patientsData?.patients?.trackedEntityInstances?.map((patient) => {
            const firstName = patient.attributes.find((attr) => attr.attribute === "w75KJ2mc4zz")?.value;
            const lastName = patient.attributes.find((attr) => attr.attribute === "zDhUuAYrxNC")?.value;
            return {
                value: patient.trackedEntityInstance,
                label: `${firstName || ""} ${lastName || ""}`.trim(),
            };
        }) || [];

    const [selectedPatientDetails, setSelectedPatientDetails] = useState(null);


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

        if (fieldName === "patientId" && selectedOption) {
            const patientDetails = patientsData?.patients?.trackedEntityInstances?.find(
                (patient) => patient.trackedEntityInstance === selectedOption.value
            );

            if (patientDetails) {
                const details = {
                    id: patientDetails.trackedEntityInstance,
                    firstName: patientDetails.attributes.find((attr) => attr.attribute === "w75KJ2mc4zz").value,
                    lastName: patientDetails.attributes.find((attr) => attr.attribute === "zDhUuAYrxNC").value,
                    phone: patientDetails.attributes.find((attr) => attr.attribute === "P2cwLGskgxn").value, // Example attribute for phone
                };
                setSelectedPatientDetails(details);
            }
        }
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
                program: "qQIsC9hO2Gj",
                orgUnit: "rEk35avS8i1",
                trackedEntityInstance: patientId,
                enrollmentDate,
            };

            const response = await enrollPatient(enrollmentData);
            console.log(response)

            if (response) {
                setStatus({ success: true, error: "", loading: false });
                var formdata = new FormData();
                formdata.append("api_key", "Ph4i9BVUxXknLl6hjUf2");
                formdata.append("password", "Zione@062000");
                formdata.append("text", `Hello ${selectedPatientDetails.firstName} ${selectedPatientDetails.lastName}, you have been enrolled to group4 health program`);
                formdata.append("numbers", selectedPatientDetails.phone);
                formdata.append("from", "WGIT");

                var requestOptions = {
                    method: 'POST',
                    body: formdata,
                    redirect: 'follow'
                };

                fetch("https://corsproxy.io/?https://telcomw.com/api-v2/send", requestOptions)
                    .then(response => response.text())
                    .then(result => console.log(result))
                    .catch(error => console.log('error', error));
            } else {
                setStatus({ success: false, error: ERROR_MESSAGES.UNEXPECTED_RESPONSE, loading: false });
            }
        } catch (error) {
            const errorMessage =
                error.response?.status === 409
                    ? ERROR_MESSAGES.PATIENT_ALREADY_ENROLLED
                    : "Enrollment failed: Please try again.";
            setStatus({
                success: false,
                error: errorMessage,
                loading: false,
            });
        }
    };

    return (
        <form onSubmit={(e) => e.preventDefault()} className="form-container">
            <h2 className="form-header">Patient Enrollment</h2>

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

            {status.success && (
                <NoticeBox title="Success" success>
                    Patient enrolled successfully!
                </NoticeBox>
            )}
        </form>
    );
};

export default Enroll;