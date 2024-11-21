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
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    phone: "",
    location: "",
    orgUnit: "",
  });

  const [orgUnits, setOrgUnits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [enrollmentSuccess, setEnrollmentSuccess] = useState(false);

  const { loading: orgLoading, error, data } = useDataQuery(orgUnitQuery);

  useEffect(() => {
    if (data && Array.isArray(data.organisationUnits.organisationUnits)) {
      setOrgUnits(data.organisationUnits.organisationUnits); // Save fetched organization units
    }
  }, [data]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await registerPatient(formData); // API call to register patient
      if (response.status === "OK") {
        setEnrollmentSuccess(true);
      }
    } catch (error) {
      console.error("Error registering patient:", error);
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

  if (error) return <div>Error fetching organization units</div>;

  return (
    <div className="register-form">
      <h2>Register Patient</h2>
      <form onSubmit={handleSubmit}>
        {/* Input for first name */}
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          onChange={handleChange}
          required
        />

        {/* Input for last name */}
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          onChange={handleChange}
          required
        />

        {/* Input for date of birth */}
        <input
          type="date"
          name="dob"
          placeholder="Date of Birth"
          onChange={handleChange}
          required
        />

        {/* Dropdown for gender selection */}
        <select name="gender" onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        {/* Input for phone number */}
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          onChange={handleChange}
          required
        />

        {/* Input for location */}
        <input
          type="text"
          name="location"
          placeholder="Location"
          onChange={handleChange}
        />

        {/* Dropdown for organization unit */}
        <select name="orgUnit" onChange={handleChange} required>
          <option value="">Select Organization Unit</option>
          {orgUnits.map((unit) => (
            <option key={unit.id} value={unit.id}>
              {unit.name}
            </option>
          ))}
        </select>

        {/* Submit button */}
        <Button type="submit" disabled={loading} loading={loading}>
          {loading ? "Registering..." : "Register"}
        </Button>

        {/* Reset button */}
        <Button type="reset" secondary>
          Cancel
        </Button>

        {/* Success notification */}
        {enrollmentSuccess && (
          <NoticeBox title="Success" success>
            Patient Registered Successfully!
          </NoticeBox>
        )}
      </form>
    </div>
  );
};

export default Register;
