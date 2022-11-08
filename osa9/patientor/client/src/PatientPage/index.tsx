/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { setFetchPatient, useStateValue } from "../state";
import HealthRatingBar from "../components/HealthRatingBar";
import { Patient, Gender, Entry, Diagnosis } from '../types';
import { Box, Table, TableHead, Typography, SvgIconProps } from "@material-ui/core";
import { TableCell } from "@material-ui/core";
import { TableRow } from "@material-ui/core";
import { TableBody } from "@material-ui/core";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

const PatientPage = () => {
const [{patients}, dispatch] = useStateValue();
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
    getPatient();
}, [dispatch, patients, id]);

if(!patients || !patient) { 
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
          Patientor
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
              {/* <TableCell>No patient</TableCell> */}
            </TableRow>
            {patient.entries.length > 0 && (
            <TableRow>
            {patient.entries.map((entry: Entry) => {
              return (
                <TableCell key={entry.id}>
                  <p>
                    <b>{entry.date}</b>: <i>{entry.description}</i>
                  </p>
                  <ul>
                    {entry.diagnosisCodes && entry.diagnosisCodes.map(
                      (diagnosisCode: Diagnosis['code']) => (
                        <li key={diagnosisCode}>{diagnosisCode}</li>
                      )
                    )}
                  </ul>
                </TableCell>
              );
            })}
            </TableRow>
            )}
        </TableBody>
      </Table>
    </div>
);

};

export default PatientPage;