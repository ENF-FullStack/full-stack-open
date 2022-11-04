import patientData from '../../data/patients';
import { Patient, PatientNS, NewPatient } from '../types';
import uuid = require('uuid');

const getPatients = (): Patient[] => {
    return patientData;
};

const getPatientsNS = (): PatientNS[] => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation}) => ({ id, name, dateOfBirth, gender, occupation }));
};

const addPatient = (patient: NewPatient): Patient => {
    const uuidv4: string = uuid.v4();
    const newPatient: Patient = {
        id: uuidv4,
        ...patient
    };
    patientData.push(newPatient);
    return newPatient;
};

export default { getPatients, getPatientsNS, addPatient };