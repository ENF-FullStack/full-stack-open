import express from 'express';
import patientService from '../services/patients';
import { Patient } from '../types';

const router = express.Router(); 

router.get('/', (_req, res) => {
    res.send(patientService.getPatientsNS());
});

router.post('/', (req, res) => {
    const { name, dateOfBirth, ssn, gender, occupation } = req.body as Patient;
    const newPatient = patientService.addPatient({name, dateOfBirth, ssn, gender, occupation});
    res.send(newPatient);
});

export default router;