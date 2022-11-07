import express from 'express';
import patientService from '../services/patients';
// import { Patient } from '../types';
import { parsePatient } from '../utils';

const router = express.Router(); 

router.get('/', (_req, res) => {
    res.send(patientService.getPatientsNS());
});

router.post('/', (req, res) => {
    try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatient = parsePatient(req.body);
    const addPatient = patientService.addPatient(newPatient);
    res.send(addPatient);
} catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error: undefined';
    res.status(400).send(errorMessage);
}
});

export default router;