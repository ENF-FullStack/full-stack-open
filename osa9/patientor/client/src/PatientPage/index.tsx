/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useState, useEffect } from "react";
import axios from "axios";

import { useParams } from "react-router-dom";
import { useStateValue } from "../state";
import { apiBaseUrl } from "../constants";

import { Patient, Gender, Entry, Diagnosis } from '../types';
import { setDiagnosisList, setFetchPatient } from "../state";

import HealthRatingBar from "../components/HealthRatingBar";
import { Box, Table, TableHead, Typography, SvgIconProps, Divider } from "@material-ui/core";
import { TableCell } from "@material-ui/core";
import { TableRow } from "@material-ui/core";
import { TableBody } from "@material-ui/core";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import { HealthCheck, Hospital, OccupationHC } from "./EntryDetails";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<({ entry: Entry })> = ({ entry }) => {
  switch(entry.type) {
    case "HealthCheck": return <HealthCheck entry={entry} />;
    case "OccupationalHealthcare": return <OccupationHC entry={entry} />;
    case "Hospital": return <Hospital entry={entry} />;
    default: return assertNever(entry);
  }
};


const PatientPage = () => {
const [{ patientDetails, diagnosisList }, dispatch] = useStateValue();
const [patient, setPatient] = useState<Patient | undefined>();
const { id } = useParams<{ id: string }>();

useEffect(() => {
  axios.get<void>(`${apiBaseUrl}/ping`);

  const getPatient = async () => {
        try {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            const { data: patientData } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);

            setPatient(patientData);
            dispatch(setFetchPatient(patientData));
        } catch (error: unknown) {
          let errorMessage = 'Something went wong!';
          if(axios.isAxiosError(error) && error.response) {
            errorMessage += ' Error: ' + error.response.data.message;
          }
          console.log(errorMessage);
        }
    };

  const fetchDiagnosisList = async () => {
    try {
      const { data: diagnosisList } = await axios.get<Diagnosis[]>(
        `${apiBaseUrl}/diagnoses`
      );
      dispatch(setDiagnosisList(diagnosisList));
    } catch (error) {
      console.log(error);
    }
  };
  
  if (Object.values(diagnosisList).length === 0) {
    fetchDiagnosisList();
  }

  getPatient();
}, [dispatch, patientDetails, diagnosisList, id]);

if(!patient || !diagnosisList) { 
  return <div>Loading...</div>;
}

const genderIcon = (gender: Gender): React.ReactElement<SvgIconProps> => {
  switch(gender) {
    case 'male': return <MaleIcon />;
    case 'female': return <FemaleIcon />;
    case 'other': return <TransgenderIcon />;
    default: return <MaleIcon />;
  }
};

return (
    <div className="App">
        <Box>
        <Typography align="center" variant="h6">
          Patient
        </Typography>
      </Box>
      <Table style={{ marginBottom: "1em" }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>SSN</TableCell>
            <TableCell>Occupation</TableCell>
            <TableCell>Health Rating</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow>
              <TableCell>{patient.name} {genderIcon(patient.gender)}</TableCell>
              <TableCell>{patient.ssn}</TableCell>
              <TableCell>{patient.occupation}</TableCell>
              <TableCell>
                <HealthRatingBar showText={false} rating={1} />
              </TableCell>
            </TableRow>
        </TableBody>
        </Table>
          
          {patient ?
            <div>
              <h3>Entries</h3>
              {patient.entries?.map((entry: Entry) => (
                <React.Fragment key={entry.id}>
                  {/* <Divider /> */}
                    <EntryDetails entry={entry} />
                  <Divider />
                </React.Fragment>
              ))} 
            </div>
            : "no patient info"
            }
    </div>
);

};

export default PatientPage;