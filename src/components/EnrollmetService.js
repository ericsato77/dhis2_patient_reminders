import axios from 'axios';

const dhis2Instance = process.env.REACT_APP_DHIS2_URL;
const auth = btoa(`${process.env.REACT_APP_DHIS2_USERNAME}:${process.env.REACT_APP_DHIS2_PASSWORD}`);

export const enrollPatient = async (data) => {
  const payload = {
    trackedEntityType: 'your-tracked-entity-id',
    orgUnit: 'your-org-unit-id',
    attributes: [
      { attribute: 'attribute-id-for-fullName', value: data.fullName },
      { attribute: 'attribute-id-for-patientId', value: data.patientId },
      { attribute: 'attribute-id-for-dateOfBirth', value: data.dateOfBirth },
      { attribute: 'attribute-id-for-gender', value: data.gender },
      { attribute: 'attribute-id-for-phoneNumber', value: data.phoneNumber },
      { attribute: 'attribute-id-for-email', value: data.email },
      { attribute: 'attribute-id-for-languagePreference', value: data.languagePreference },
      { attribute: 'attribute-id-for-programEnrolled', value: data.programEnrolled },
    ],
  };

  const response = await axios.post(`${dhis2Instance}/api/trackedEntityInstances`, payload, {
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};
