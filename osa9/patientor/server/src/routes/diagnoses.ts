import express from 'express';
import diagnoseService from '../services/diagnoses';

const router = express.Router(); 

router.get('/', (_req, res) => {
    // const diagnoses = diagnoseService.getDiagnoses();
    res.send(diagnoseService.getDiagnoses());
});

router.post('/', (_req, res) => {
    res.send('Saving a diagnoses');
});

export default router;