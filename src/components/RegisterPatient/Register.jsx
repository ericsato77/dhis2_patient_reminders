import React, { useState, useEffect } from "react";
import { useDataQuery } from "@dhis2/app-runtime";
import { registerPatient } from "./api";
import "./Register.css";
import { Button, NoticeBox, CircularLoader } from "@dhis2/ui";

// DHIS2 query to fetch organization units
const orgUnitQuery = {
  organisationUnits: {
    resource: "organisationUnits.json", // Endpoint to fetch org units
    params: {
      level: 2, // Fetch organization units at level 2
      fields: "id,name", // Retrieve ID and name fields
      paging: false, // Fetch all units without pagination
    },
  },
};

const Register = () => {
  const initialFormData = {
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    phone: "",
    location: "",
    orgUnit: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [orgUnits, setOrgUnits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [enrollmentSuccess, setEnrollmentSuccess] = useState(false);

  const { loading: orgLoading, error, data } = useDataQuery(orgUnitQuery);

  useEffect(() => {
    const loadOrgUnits = () => {
      if (data?.organisationUnits?.organisationUnits) {
        setOrgUnits(data.organisationUnits.organisationUnits);
      }
    };
    loadOrgUnits();
  }, [data]);

  const handleChange = ({ target: { name, value } }) =>
    setFormData((prev) => ({ ...prev, [name]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setEnrollmentSuccess(false);

    try {
      const response = await registerPatient(formData);
      if (response.status === "OK") setEnrollmentSuccess(true);
    } catch (err) {
      console.error("Error registering patient:", err);
      alert("Error registering patient");
    } finally {
      setLoading(false);
    }
  };

  if (orgLoading) {
    return (
      <div className="loader">
        <CircularLoader /> <p>Loading organization units, please wait...</p>
      </div>
    );
  }

  if (error) return <div>Failure to fetch organization units</div>;

  return (
    <div className="register-form">
      <h2>Register Patient</h2>
      <form onSubmit={handleSubmit}>
        {enrollmentSuccess && (
          <NoticeBox title="Success" success>
            Patient Registered Successfully!
          </NoticeBox>
        )}
        {[{ type: "text", name: "firstName", placeholder: "First Name" },
          { type: "text", name: "lastName", placeholder: "Last Name" },
          { type: "date", name: "dob", placeholder: "Date of Birth" },
          { type: "tel", name: "phone", placeholder: "Phone Number" },
          { type: "text", name: "location", placeholder: "Location" }]
          .map((field) => (
            <input
              key={field.name}
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              onChange={handleChange}
              required={field.name !== "location"}
            />
          ))}
        <select name="gender" onChange={handleChange} required>
          <option value="">Select Gender</option>
          {["Male", "Female", "Other"].map((gender) => (
            <option key={gender} value={gender}>
              {gender}
            </option>
          ))}
        </select>
        <select name="orgUnit" onChange={handleChange} required>
          <option value="">Select Organization Unit</option>
          {orgUnits.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>

        <div className="buttons-container">
          <Button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </Button>
          <Button type="reset" secondary onClick={() => setFormData(initialFormData)}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Register;
