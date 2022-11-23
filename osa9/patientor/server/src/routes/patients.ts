import express from 'express';
import patientService from '../services/patients';
// import { Patient } from '../types';
import { parsePatient, parseEntry } from '../utils';

const router = express.Router(); 

router.get('/', (_req, res) => {
    res.send(patientService.getPatientsNS());
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const patient = patientService.getPatient(id);
    res.send(patient);
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

router.post('/:id/entries', (req, res) => {
    const id: string = req.params.id;
    const patient = patientService.getPatient(id);

    if (patient) {
        try {
            const newEntry = parseEntry(req.body);
            const changedPatient = patientService.addEntryToPatient(newEntry, patient);
            res.send(changedPatient);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error: undefined';
            res.status(400).send(errorMessage);
        }
    } else {
        res.status(400).send('Patient not found!');
    }
});

export default router;