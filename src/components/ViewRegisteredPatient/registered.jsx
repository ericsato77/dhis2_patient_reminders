import React, { useState } from "react";
import { useDataQuery } from "@dhis2/app-runtime";
import "./Retrieve.css"; // Optional styling

// DHIS2 query to fetch registered patients
const fetchPatientsQuery = {
  patients: {
    resource: "trackedEntityInstances.json", // Adjust resource path as per DHIS2 API
    params: {
      ou: "YOUR_ORG_UNIT_ID", // Replace with a valid organization unit ID
      fields: "id,name", // Fetch required fields
      paging: false, // Fetch all records without pagination
    },
  },
};

const Retrieve = () => {
  const [patients, setPatients] = useState([]);
  const { loading, error, data, refetch } = useDataQuery(fetchPatientsQuery);

  React.useEffect(() => {
    if (data?.patients?.trackedEntityInstances) {
      setPatients(data.patients.trackedEntityInstances);
    }
  }, [data]);

  if (loading) {
    return <p>Loading patients...</p>;
  }

  if (error) {
    return <p>Error fetching patients: {error.message}</p>;
  }

  return (
    <div className="retrieve-data">
      <h2>Registered Patients</h2>
      {patients.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Date of Birth</th>
              <th>Phone</th>
              <th>Gender</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => {
              const firstName = patient.attributes.find(
                (attr) => attr.attribute === "firstName"
              )?.value;
              const lastName = patient.attributes.find(
                (attr) => attr.attribute === "lastName"
              )?.value;
              const dob = patient.attributes.find(
                (attr) => attr.attribute === "dob"
              )?.value;
              const phone = patient.attributes.find(
                (attr) => attr.attribute === "phone"
              )?.value;
              const gender = patient.attributes.find(
                (attr) => attr.attribute === "gender"
              )?.value;

              return (
                <tr key={patient.trackedEntityInstance}>
                  <td>{firstName}</td>
                  <td>{lastName}</td>
                  <td>{dob}</td>
                  <td>{phone}</td>
                  <td>{gender}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>No patients registered yet.</p>
      )}
      <button onClick={refetch}>Refresh Data</button>
    </div>
  );
};

export default Retrieve;
