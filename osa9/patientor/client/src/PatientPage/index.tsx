/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import HealthRatingBar from "../components/HealthRatingBar";

import { Patient } from '../types';

import { Box, Table, TableHead, Typography } from "@material-ui/core";
import { TableCell } from "@material-ui/core";
import { TableRow } from "@material-ui/core";
import { TableBody } from "@material-ui/core";

const PatientPage = () => {
const [{patients}, dispatch] = useStateValue();
const [patient, setPatient] = useState<Patient | undefined>();
const { id } = useParams<{ id: string }>();

useEffect(() => {
    const getPatient = async () => {
        try {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            const { data: patientData } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
            dispatch({ type: 'FETCH_PATIENT', payload: patientData });
            setPatient(patientData);
        } catch (error: unknown) {
          let errorMessage = 'Something went wong!';
          if(axios.isAxiosError(error) && error.response) {
            errorMessage += ' Error: ' + error.response.data.message;
          }
          console.log(errorMessage);
        }
      };
}, [dispatch, id, patients]);

if(!patients) return <div>Loading...</div>;

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
            <TableCell>Gender</TableCell>
            <TableCell>Occupation</TableCell>
            <TableCell>Health Rating</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow>
              <TableCell>{patient.name}</TableCell>
              <TableCell>{patient.gender}</TableCell>
              <TableCell>{patient.occupation}</TableCell>
              <TableCell>
                <HealthRatingBar showText={false} rating={1} />
              </TableCell>
              {/* <TableCell>No patient</TableCell> */}
            </TableRow>
        </TableBody>
      </Table>
    </div>
);

};

export default PatientPage;