import React, { useState, useEffect } from "react";
import Select from "react-select"; // Use react-select for consistent styling
import { Input, NoticeBox, Button } from "@dhis2/ui";
import { enrollPatient } from "./Api";
import "./Enroll.css";
import { useDataQuery } from "@dhis2/app-runtime";

const orgUnitId = "DFyu9VGpodC";
const programid = "qQIsC9hO2Gj";

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
            ou: orgUnitId,
            trackedEntityType: "nEenWmSyUEp",
            fields: ["trackedEntityInstance", "attributes"],
            pageSize: 50,
        },
    },
});

const Enroll = () => {
    const [formData, setFormData] = useState({
        orgUnit: "",
        programEnrolled: "",
        patientId: "",
        enrollmentDate: new Date().toISOString().split("T")[0],
    });

    const [enrollmentSuccess, setEnrollmentSuccess] = useState(false);
    const [enrollmentError, setEnrollmentError] = useState("");
    const [loading, setLoading] = useState(false);

    const { loading: loadingOrgUnits, data: orgUnitsData } =
        useDataQuery(orgUnitsQuery);
    const {
        loading: loadingPrograms,
        data: programsData,
        refetch: refetchPrograms,
    } = useDataQuery(programsQuery(formData.orgUnit), { lazy: true });
    const {
        loading: loadingPatients,
        data: patientsData,
        refetch: refetchPatients,
    } = useDataQuery(patientsQuery(orgUnitId), { lazy: true });

    const orgUnitsList =
        orgUnitsData?.orgUnits?.organisationUnits.map((ou) => ({
            value: ou.id,
            label: ou.displayName,
        })) || [];
    const programsList =
        programsData?.programs?.programs.map((program) => ({
            value: program.id,
            label: program.displayName,
        })) || [];
    const patientsList =
        patientsData?.patients?.trackedEntityInstances.map((patient) => ({
            value: patient.trackedEntityInstance,
            label:
                patient.attributes.find((attr) => attr.attribute === "w75KJ2mc4zz")
                    ?.value +
                " " +
                patient.attributes.find((attr) => attr.attribute === "zDhUuAYrxNC")
                    ?.value,
        })) || [];

    useEffect(() => {
        if (formData.orgUnit) {
            refetchPrograms();
            refetchPatients();
        }
    }, [formData.orgUnit]);

    const handleSelectChange = (selectedOption, fieldName) => {
        setFormData((prev) => ({
            ...prev,
            [fieldName]: selectedOption ? selectedOption.value : "",
        }));
    };

    const handleEnroll = async () => {
        if (!formData.orgUnit || !formData.programEnrolled || !formData.patientId) {
            setEnrollmentError("Please fill all fields before enrolling.");
            return;
        }

        setEnrollmentError("");
        setEnrollmentSuccess(false);
        setLoading(true);

        try {
            const enrollmentData = {
                program: programid,
                orgUnit: orgUnitId,
                trackedEntityInstance: formData.patientId,
                enrollmentDate: formData.enrollmentDate,
            };

            const response = await enrollPatient(enrollmentData);
            if (response.status === "OK") {
                setEnrollmentSuccess(true);
            } else {
                setEnrollmentError("Enrollment failed: Unexpected response.");
            }
        } catch (error) {
            setEnrollmentError(
                "Enrollment failed: Please ensure the patient isn't already enrolled."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={(e) => e.preventDefault()} className="form-container">
            <h2 className="form-header">Patient Enrollment</h2>

            <div className="form-group">
                <label>Organization Unit:</label>
                <Select
                    options={orgUnitsList}
                    value={orgUnitsList.find(
                        (option) => option.value === formData.orgUnit
                    )}
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
                    value={programsList.find(
                        (option) => option.value === formData.programEnrolled
                    )}
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
                    value={patientsList.find(
                        (option) => option.value === formData.patientId
                    )}
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
                disabled={loading}
            >
                {loading ? "Enrolling..." : "Enroll Patient"}
            </button>

            {enrollmentError && (
                <NoticeBox title="Error" error>
                    {enrollmentError}
                </NoticeBox>
            )}

            {enrollmentSuccess && (
                <NoticeBox title="Success" success>
                    Patient enrolled successfully!
                </NoticeBox>
            )}
        </form>
    );
};

export default Enroll;
